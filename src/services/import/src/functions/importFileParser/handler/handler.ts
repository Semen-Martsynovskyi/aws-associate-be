import * as AWS from "aws-sdk";
import { S3Event } from "aws-lambda";
import csvParser from "csv-parser";
import stripBom from "strip-bom-stream";

const importFileParser = async (event: S3Event) => {
  const s3 = new AWS.S3({ region: process.env.REGION });
  const sqs = new AWS.SQS({ region: process.env.REGION });
  console.log({ event });

  for (const record of event.Records) {
    const bucketName = record.s3.bucket.name;
    const srcKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, " ")); // S3 keyname decoding
    const s3Stream = s3
      .getObject({
        Bucket: bucketName,
        Key: srcKey,
      })
      .createReadStream();

    const products = [];
    s3Stream
      .pipe(stripBom())
      .pipe(
        csvParser({
          separator: ";",
          mapValues: ({ header, index, value }) =>
            header === "count" || header === "price" ? Number(value) : value,
        })
      )
      .on("data", async (data) => {
        console.log({ data });
        products.push(data as never);
        await sqs
          .sendMessage({
            QueueUrl: process.env.SQS_CATALOG_ITEMS_URL!,
            MessageBody: JSON.stringify(data),
          })
          .promise();
      })
      .on("end", () => {
        console.log(products);
      });

    await streamFinished(s3Stream);

    const targetKey = srcKey.replace("uploaded/", "parsed/");

    // Copy the file to the 'parsed' folder
    await s3
      .copyObject({
        Bucket: bucketName,
        CopySource: `${bucketName}/${srcKey}`,
        Key: targetKey,
      })
      .promise();
    console.log("copy succeed");

    // Delete the file from the 'uploaded' folder
    await s3
      .deleteObject({
        Bucket: bucketName,
        Key: srcKey,
      })
      .promise();
    console.log("delete succeed");
  }
};

const streamFinished = (stream) => {
  return new Promise((resolve, reject) => {
    stream.on("end", resolve);
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
};

export const main = importFileParser;
