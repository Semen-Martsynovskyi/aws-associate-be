import * as AWS from "aws-sdk";
import { DBParams } from "../models";

export abstract class BaseService {
  protected abstract readonly BASE_PARAMS: DBParams;

  constructor(
    protected dynamoClient = new AWS.DynamoDB.DocumentClient({
      region: "us-east-1",
    })
  ) {}

  generatePutTransactionItem<T>(
    item: T
  ): AWS.DynamoDB.DocumentClient.TransactWriteItem {
    return {
      Put: {
        ...this.BASE_PARAMS,
        Item: {
          ...item,
        },
      },
    };
  }
}
