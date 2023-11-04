// import { bodySchema as createProductBody } from "@functions/createProduct";

export const schema = {
  type: "object",
  required: ["Records"],
  properties: {
    Records: {
      type: "array",
      // items: { type: "object", properties: { body: createProductBody } },
    },
  },
} as const;
