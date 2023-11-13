import { PolicyEffect } from "@models";
import { buildPolicy, validateToken } from "@utils";

export const basicAuthorizer = async (event) => {
  const token = event.authorizationToken;
  const methodArn = event.methodArn;

  if (!token) {
    return buildPolicy("user", PolicyEffect.DENY, methodArn);
  }

  const creds = token.split(" ")[1];
  const effect = validateToken(creds);

  // Return an IAM policy document for the current endpoint
  return buildPolicy(creds, effect, methodArn);
};

export const main = basicAuthorizer;
