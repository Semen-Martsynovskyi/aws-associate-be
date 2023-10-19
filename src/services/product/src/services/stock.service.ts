import { Stock } from "@models";
import { BaseService } from "./base.service";

class StockService extends BaseService {
  static singleton: boolean;
  protected readonly BASE_PARAMS = {
    TableName: "stocks",
  };

  constructor() {
    super();

    if (StockService.singleton) {
      throw new Error("StockService is singleton and was already instantiated");
    }
    StockService.singleton = true;
  }

  async getProductsInStock(): Promise<Stock[]> {
    const params = {
      ...this.BASE_PARAMS,
      FilterExpression: "#countField > :countValue",
      ExpressionAttributeNames: {
        "#countField": "count",
      },
      ExpressionAttributeValues: {
        ":countValue": 0,
      },
    };
    const response = await this.dynamoClient.scan(params).promise();
    return response.Items as Stock[];
  }
}

export const stockService = new StockService();
