import { mockProducts, mockStocks } from "../mocks";
import * as AWS from "aws-sdk";

const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

async function populateWithMocks(): Promise<void> {
  await dynamoClient
    .batchWrite({
      RequestItems: {
        products: mockProducts.map((product) => ({
          PutRequest: { Item: product },
        })),
      },
    })
    .promise();

  await dynamoClient
    .batchWrite({
      RequestItems: {
        stocks: mockStocks.map((stock) => ({
          PutRequest: { Item: stock },
        })),
      },
    })
    .promise();
}

populateWithMocks();
