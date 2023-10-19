import { formatJSONResponse } from "@utils";
import { getProductById } from "./handler";
import { productService } from "@services";
import { mockProduct } from "@mocks";

describe("getProductById", () => {
  it("should return product with passed id", async () => {
    jest.spyOn(productService, "getProductById").mockResolvedValue(mockProduct);

    const event = {
      pathParameters: { productId: "7567ec4b-b10c-48c5-9345-fc73c48a80a3" },
    } as any;
    const productRes = await getProductById(event, null, null);

    expect(productRes).toEqual(
      formatJSONResponse({
        product: mockProduct,
      })
    );
  });
});
