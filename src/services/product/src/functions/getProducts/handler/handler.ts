import type { ValidatedEventAPIGatewayProxyEvent } from "@utils";
import { formatJSONResponse } from "@utils";
import { middyfy } from "@utils";

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

export const main = middyfy(getProducts, schema);
