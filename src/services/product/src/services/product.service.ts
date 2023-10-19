import { v4 as uuid } from "uuid";
import * as AWS from "aws-sdk";
import { AvailableProduct, DBParams, Product, Stock } from "@models";
import { CreateProductDTO } from "@dtos";
import { BaseService } from "./base.service";
import { stockService as stockSrvc } from "./stock.service";

class ProductService extends BaseService {
  static singleton: boolean;
  protected readonly BASE_PARAMS: DBParams = {
    TableName: "products",
  };

  constructor(private stockService = stockSrvc) {
    super();

    if (ProductService.singleton) {
      throw new Error(
        "ProductService is singleton and was already instantiated"
      );
    }
    ProductService.singleton = true;
  }

  async getProducts(): Promise<Product[]> {
    const response = await this.dynamoClient.scan(this.BASE_PARAMS).promise();
    return response.Items as Product[];
  }

  async getAvailableProducts(): Promise<AvailableProduct[]> {
    const stocks = await this.stockService.getProductsInStock();
    if (!stocks.length) return [];

    const params = {
      RequestItems: {
        products: {
          Keys: stocks.map((stock) => ({ id: stock.product_id })),
        },
      },
    };
    const result = await this.dynamoClient.batchGet(params).promise();
    const products = result.Responses.products as Product[];

    return products.map((product) => ({
      ...product,
      count: stocks.find(({ product_id }) => product_id === product.id).count,
    }));
  }

  async getProductById(id: string): Promise<Product> {
    const response = await this.dynamoClient
      .get({
        ...this.BASE_PARAMS,
        Key: {
          id,
        },
      })
      .promise();

    return response.Item as Product;
  }

  async createProduct(productCreate: CreateProductDTO): Promise<Product> {
    const product: Product = {
      id: uuid(),
      title: productCreate.title,
      description: productCreate.description,
      price: productCreate.price,
    };
    const stock: Stock = { product_id: product.id, count: productCreate.count };

    const params: AWS.DynamoDB.DocumentClient.TransactWriteItemsInput = {
      TransactItems: [
        this.generatePutTransactionItem<Product>(product),
        this.stockService.generatePutTransactionItem<Stock>(stock),
      ],
    };
    await this.dynamoClient.transactWrite(params).promise();

    return product;
  }
}

export const productService = new ProductService();
