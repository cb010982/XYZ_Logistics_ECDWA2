// src/LoginButton.js
import React from 'react';
import { COGNITO_CONFIG } from './awsConfig';

const LoginButton = () => {
  const handleLogin = () => {
    const { Domain, ClientId, RedirectURI } = COGNITO_CONFIG;

    const loginURL = `https://${Domain}/login?client_id=${ClientId}&response_type=code&scope=email+openid+phone&redirect_uri=${encodeURIComponent(RedirectURI)}`;

    window.location.href = loginURL;
  };

  return <button onClick={handleLogin}>Login with Cognito</button>;
};

export default LoginButton;
