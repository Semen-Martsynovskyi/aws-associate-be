export const iamConfig = [
  {
    Effect: "Allow",
    Action: [
      "dynamodb:Query",
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:Scan",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:TransactWriteItems",
    ],
    Resource: "arn:aws:dynamodb:us-east-1:871722638155:table/stocks",
  },
  {
    Effect: "Allow",
    Action: [
      "dynamodb:Query",
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:Scan",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:TransactWriteItems",
    ],
    Resource: "arn:aws:dynamodb:us-east-1:871722638155:table/products",
  },
  {
    Effect: "Allow",
    Action: [
      "sqs:ReceiveMessage",
      "sqs:DeleteMessage",
      "sqs:GetQueueAttributes",
    ],
    Resource: [
      {
        "Fn::GetAtt": ["SQSProductQueue", "Arn"],
      },
    ],
  },
  {
    Effect: "Allow",
    Action: ["sns:Publish"],
    Resource: [
      {
        Ref: "CreateProductTopic",
      },
    ],
  },
];
