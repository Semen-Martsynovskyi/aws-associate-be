import { Product } from "@models";
import { catalogBatchProcess } from "./handler";
import { productService } from "@services";
import * as AWS from "aws-sdk";

jest.mock("aws-sdk");

describe("catalogBatchProcess", () => {
  let mockPublish: jest.Mock;

  beforeEach(() => {
    mockPublish = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    });
    (AWS.SNS.prototype.publish as jest.Mock) = mockPublish;
  });

  it("should process products from SQS and publish to SNS", async () => {
    const mockProduct: Product = {
      id: "1",
      title: "title",
      description: "descr",
      price: 56,
    };

    const createProductSpy = jest
      .spyOn(productService, "createProduct")
      .mockResolvedValue(mockProduct);

    const event = {
      Records: [{ body: JSON.stringify(mockProduct) }],
    };
    process.env.SNS_CREATE_PRODUCT_TOPIC_ARN = "mockTopicArn";

    await catalogBatchProcess(event as any);

    expect(createProductSpy).toHaveBeenCalledWith(mockProduct);
    expect(mockPublish).toHaveBeenCalledWith(
      expect.objectContaining({
        Message: `New product created: ${JSON.stringify(mockProduct)}`,
        MessageAttributes: {
          priceType: { DataType: "String", StringValue: "Luxury" },
        },
        Subject: "New Product Created",
        TopicArn: process.env.SNS_CREATE_PRODUCT_TOPIC_ARN,
      })
    );
  });
});
