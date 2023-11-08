import { handlerPath } from "@core/utils";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: {
          "Fn::GetAtt": ["SQSProductQueue", "Arn"],
        },
        batchSize: 5,
      },
    },
  ],
  environment: {
    SNS_TOPIC_ARN: {
      Ref: "CreateProductTopic",
    },
  },
};
