import * as AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";

import { formatJSONResponse, middyfyHttp } from "@core/utils";
import { schema } from "../schema";

export const importProductsFile = async ({
  queryStringParameters,
}: APIGatewayProxyEvent) => {
  const fileName = queryStringParameters.name;
  if (!fileName) {
    return formatJSONResponse(
      {
        message: "Filename is required as a query parameter.",
      },
      400
    );
  }

  const s3Params = {
    Bucket: "aws-associate-sem-files",
    Key: `uploaded/${fileName}`,
    Expires: 60,
    ContentType: "text/csv",
  };

  const s3 = new AWS.S3({ region: process.env.REGION });

  try {
    const signedUrl = s3.getSignedUrl("putObject", s3Params);
    console.log("[signedUrl]: ", signedUrl);
    return formatJSONResponse({
      signedUrl: signedUrl,
    });
  } catch (error) {
    console.error("Error creating signed URL:", error);
    return formatJSONResponse(
      {
        message: "Internal Server Error.",
      },
      500
    );
  }
};

export const main = middyfyHttp(importProductsFile, schema);
