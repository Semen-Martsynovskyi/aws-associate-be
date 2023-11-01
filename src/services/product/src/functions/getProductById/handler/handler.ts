import type { ValidatedEventAPIGatewayProxyEvent } from "@core/utils";
import { formatJSONResponse } from "@core/utils";
import { middyfyHttp } from "@core/utils";

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

export const main = middyfyHttp(getProductById, schema);
