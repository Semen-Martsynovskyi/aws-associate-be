import { getProductById } from "./handler";

test("should return product with passed id", () => {
  expect(
    getProductById(
      {
        pathParameters: { productId: "7567ec4b-b10c-48c5-9345-fc73c48a80a3" },
      } as any,
      null,
      null
    )
  ).toBe({
    description: "Short Product Description2",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    title: "Wakeboard Force",
  });
});
