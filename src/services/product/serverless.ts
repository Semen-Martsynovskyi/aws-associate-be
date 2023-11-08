import type { AWS } from "@serverless/typescript";

import getProductById from "@functions/getProductById";
import getProducts from "@functions/getProducts";
import createProduct from "@functions/createProduct";
import catalogBatchProcess from "@functions/catalogBatchProcess";
import { dbConfig } from "./serverless.db";
import { iamConfig } from "./serverless.iam";

const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: "product-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-dotenv-plugin"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [...iamConfig],
      },
    },
  },
  // import the function via paths
  functions: {
    getProductById,
    getProducts,
    createProduct,
    catalogBatchProcess,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      ...dbConfig,
      SQSProductQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "catalogItemsQueue",
        },
      },
      CreateProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          DisplayName: "Product Creation Topic",
          TopicName: "createProductTopic",
        },
      },
      EmailSubscriptionBasic: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: "email",
          TopicArn: {
            Ref: "CreateProductTopic",
          },
          Endpoint: "semen_martsynovskyi@epam.com",
          FilterPolicy: {
            priceType: ["Standard"],
          },
        },
      },
      EmailSubscriptionLuxury: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: "email",
          TopicArn: {
            Ref: "CreateProductTopic",
          },
          Endpoint: "testertoster9197@gmail.com",
          FilterPolicy: {
            priceType: ["Luxury"],
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
