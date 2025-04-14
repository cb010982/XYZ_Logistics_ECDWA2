import {
  fromCognitoIdentityPool
} from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

export const configureAwsCredentials = async (idToken) => {
  const IDENTITY_POOL_ID = 'us-east-1:491ed7d8-2c6f-44ff-b285-983c2444263b';
  const USER_POOL_ID = 'us-east-1_MFpzTZaoK';
  const REGION = 'us-east-1';

  const identityClient = new CognitoIdentityClient({ region: REGION });

  const credentialProvider = fromCognitoIdentityPool({
    client: identityClient,
    identityPoolId: IDENTITY_POOL_ID,
    logins: {
      [`cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`]: idToken,
    },
  });

  const resolved = await credentialProvider(); // force credentials to resolve

  return {
    credentials: credentialProvider,
    identityId: resolved.identityId // ✅ this is the part you need
  };
};
