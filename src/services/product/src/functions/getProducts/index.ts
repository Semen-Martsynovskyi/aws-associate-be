import { handlerPath } from "@core/utils";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "/products",
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
        },
      },
    },
  ],
};
