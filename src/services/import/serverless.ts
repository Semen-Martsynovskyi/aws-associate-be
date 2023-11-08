import type { AWS } from "@serverless/typescript";
import importFileParser from "@functions/importFileParser";
import importProductsFile from "@functions/importProductsFile";

const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: "import-service",
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
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "s3:ListBucket",
          "s3:GetObject",
          "s3:PutObject",
          "s3:CopyObject",
          "s3:DeleteObject",
        ],
        Resource: "arn:aws:s3:::aws-associate-sem-files/*",
      },
      {
        Effect: "Allow",
        Action: ["sqs:SendMessage"],
        Resource: "arn:aws:sqs:us-east-1:871722638155:catalogItemsQueue",
      },
    ],
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
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
      ImportBucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "aws-associate-sem-files",
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedHeaders: ["*"],
                AllowedMethods: ["GET", "PUT", "POST"],
                AllowedOrigins: ["*"],
              },
            ],
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
