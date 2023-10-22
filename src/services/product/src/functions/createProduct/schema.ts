export const bodySchema = {
  type: "object",
  required: ["title", "price", "count"],
  properties: {
    title: {
      type: "string",
      maxLength: 50,
    },
    description: { type: "string", maxLength: 200 },
    price: { type: "integer", minimum: 1, maximum: 2027 },
    count: { type: "integer", minimum: 1 },
  },
} as const;

export const schema = {
  type: "object",
  required: ["body"],
  properties: {
    body: bodySchema,
  },
} as const;
