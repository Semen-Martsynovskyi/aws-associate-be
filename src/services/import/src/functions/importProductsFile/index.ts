import { handlerPath } from "@core/utils";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "/import",
        cors: {
          origin: "*",
          headers: [
            "Content-Type",
            "X-Amz-Date",
            "Authorization",
            "X-Api-Key",
            "X-Amz-Security-Token",
            "X-Amz-User-Agent",
            "Access-Control-Allow-Origin",
          ],
          allowCredentials: true,
        },
        authorizer: {
          name: "basic-authorizer",
          arn: "arn:aws:lambda:us-east-1:871722638155:function:auth-service-dev-basicAuthorizer",
          resultTtInSeconds: 0,
          identitySource: "method.request.header.Authorization",
          type: "token",
        },
      },
    },
  ],
};
