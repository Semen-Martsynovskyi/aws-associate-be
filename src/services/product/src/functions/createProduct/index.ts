import { handlerPath } from "@core/utils";

export default {
  handler: `${handlerPath(__dirname)}/handler/handler.main`,
  events: [
    {
      http: {
        method: "post",
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

export { bodySchema } from "./schema";
