import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import cors from "@middy/http-cors";

export const middyfy = (handler, schema: Record<string, unknown>) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(httpEventNormalizer())
    .use(
      validator({
        eventSchema: transpileSchema(schema),
      })
    )
    .use(httpErrorHandler())
    .use(cors());
};
