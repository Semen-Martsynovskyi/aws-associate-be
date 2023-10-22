import type { ValidatedEventAPIGatewayProxyEvent } from "@utils";
import { formatJSONResponse } from "@utils";
import { middyfy } from "@utils";

import { schema } from "../schema";
import { productService } from "@services";

export const getProductById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async ({ pathParameters: { productId } }) => {
  const product = await productService.getProductById(productId);

  if (!product) {
    return formatJSONResponse({ message: "Product not found" }, 404);
  }

  return formatJSONResponse({
    product,
  });
};

export const main = middyfy(getProductById, schema);
