import {
    fromCognitoIdentityPool
  } from "@aws-sdk/credential-provider-cognito-identity";
  import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
  
  export const configureAwsCredentials = async (idToken) => {
    const IDENTITY_POOL_ID = 'us-east-1:491ed7d8-2c6f-44ff-b285-983c2444263b'; // 🔁 Replace
    const USER_POOL_ID = 'us-east-1_MFpzTZaoK';                 // 🔁 Replace
    const REGION = 'us-east-1';
  
    const credentials = fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: REGION }),
      identityPoolId: IDENTITY_POOL_ID,
      logins: {
        [`cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`]: idToken,
      },
    });
  
    return credentials;
  };
  