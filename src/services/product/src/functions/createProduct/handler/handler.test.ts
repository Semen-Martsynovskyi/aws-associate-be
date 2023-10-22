import { formatJSONResponse } from "@utils";
import { createProduct } from "./handler";
import { productService } from "@services";
import { mockProduct } from "@mocks";

describe("createProduct", () => {
  it("should return product with passed id", async () => {
    const mockCreateProduct = { ...mockProduct, count: 5 };
    delete mockCreateProduct.id;
    jest.spyOn(productService, "createProduct").mockResolvedValue(mockProduct);

    const event = {
      body: { product: { ...mockCreateProduct } },
    } as any;
    const productRes = await createProduct(event, null, null);

    expect(productRes).toEqual(
      formatJSONResponse({
        product: mockProduct,
      })
    );
  });
});
