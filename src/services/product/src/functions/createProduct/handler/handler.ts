import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
  middyfyHttp,
} from "@core/utils";
import { bodySchema, schema } from "../schema";
import { productService } from "@services";
import { CreateProductDTO } from "@dtos";

export const createProduct: ValidatedEventAPIGatewayProxyEvent<
  typeof bodySchema
> = async ({ body }) => {
  const product = await productService.createProduct(body as CreateProductDTO);

  if (!product) {
    return formatJSONResponse({ message: "Product not found" }, 404);
  }

  return formatJSONResponse({
    product,
  });
};

export const main = middyfyHttp(createProduct, schema);
