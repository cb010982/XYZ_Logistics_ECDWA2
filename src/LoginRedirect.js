import React, { useEffect } from 'react';
import { COGNITO_CONFIG } from './awsConfig';

const LoginRedirect = () => {
  useEffect(() => {
    const { Domain, ClientId, RedirectURI } = COGNITO_CONFIG;

    const loginURL = `https://${Domain}/login?client_id=${ClientId}&response_type=code&scope=email+openid+phone&redirect_uri=${encodeURIComponent(RedirectURI)}`;

    window.location.href = loginURL;
  }, []);

  return <p>Redirecting to Cognito login...</p>;
};

export default LoginRedirect;
