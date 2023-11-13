import { PolicyEffect } from "@models";

export const validateToken = (principalId): PolicyEffect => {
  const buff = Buffer.from(principalId, "base64");
  const plainCreds = buff.toString("utf-8").split(":");
  const [username, password] = plainCreds;

  const storedPassword = process.env[username];
  console.log({ plainCreds, storedPassword });
  const effect =
    storedPassword && storedPassword === password
      ? PolicyEffect.ALLOW
      : PolicyEffect.DENY;
  return effect;
};

export const buildPolicy = (principalId, effect, resource) => {
  const policyDocument = {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };

  return policyDocument;
};
