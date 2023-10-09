import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import { products } from "@mocks/product.mock";

export const getProductById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const product = products.find(
    (product) => product.id === event.pathParameters.productId
  );

  if (!product) {
    return formatJSONResponse({ message: "Product not found" }, 404);
  }

  return formatJSONResponse({
    product,
    event,
  });
};

export const main = middyfy(getProductById);
