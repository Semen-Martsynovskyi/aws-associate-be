import * as AWS from "aws-sdk";

// import { middyfySqs } from "@core/utils";

// import { schema } from "../schema";
import { productService } from "@services";
import { CreateProductDTO } from "@dtos";
import { PriceType } from "@models";

export const catalogBatchProcess = async (event) => {
  const sns = new AWS.SNS();

  for (const message of event.Records) {
    try {
      console.log("received new message", message.body);
      const product = JSON.parse(message.body) as CreateProductDTO;

      console.log("creating product...", product);
      const created = await productService.createProduct(product);
      console.log("product created", created);

      const snsMessage = {
        TopicArn: process.env.SNS_CREATE_PRODUCT_TOPIC_ARN,
        Message: `New product created: ${JSON.stringify(created)}`,
        Subject: "New Product Created",
        MessageAttributes: {
          priceType: {
            DataType: "String",
            StringValue:
              created.price > 20 ? PriceType.LUXURY : PriceType.STANDARD,
          },
        },
      };
      await sns.publish(snsMessage).promise();
    } catch (error) {
      console.error("Unhandled error", error);
    }
  }
};

export const main = catalogBatchProcess;
// export const main = middyfySqs(catalogBatchProcess, schema);
