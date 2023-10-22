export const schema = {
  type: "object",
  required: ["pathParameters"],
  properties: {
    pathParameters: {
      type: "object",
      required: ["productId"],
      properties: {
        productId: {
          type: "string",
        },
      },
    },
  },
} as const;
