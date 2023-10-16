import { formatJSONResponse } from "@libs/api-gateway";
import { getProductById } from "./handler";

describe("getProductById", () => {
  it("should return product with passed id", async () => {
    const event = {
      pathParameters: { productId: "7567ec4b-b10c-48c5-9345-fc73c48a80a3" },
    } as any;
    const productRes = await getProductById(event, null, null);

    expect(productRes).toEqual(
      formatJSONResponse({
        product: {
          description: "Short Product Description2",
          id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
          price: 23,
          title: "Wakeboard Force",
        },
        event,
      })
    );
  });
});
