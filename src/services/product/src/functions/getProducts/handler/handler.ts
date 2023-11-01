import type { ValidatedEventAPIGatewayProxyEvent } from "@core/utils";
import { formatJSONResponse } from "@core/utils";
import { middyfyHttp } from "@core/utils";

import { schema } from "../schema";
import { productService } from "@services";

export const getProducts: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  const products = await productService.getAvailableProducts();
  return formatJSONResponse({
    products,
  });
};

export const main = middyfyHttp(getProducts, schema);
