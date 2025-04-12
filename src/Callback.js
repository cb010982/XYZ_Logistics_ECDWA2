// // src/Callback.js
// import React, { useEffect } from 'react';
// import { COGNITO_CONFIG } from './awsConfig';

// const Callback = () => {
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get('code');

//     if (code) {
//       const details = {
//         grant_type: 'authorization_code',
//         client_id: COGNITO_CONFIG.ClientId,
//         code,
//         redirect_uri: COGNITO_CONFIG.RedirectURI
//       };

//       const formBody = Object.keys(details)
//         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`)
//         .join('&');

//       fetch(`https://${COGNITO_CONFIG.Domain}/oauth2/token`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: formBody
//       })
//         .then(res => res.json())
//         .then(data => {
//           if (data.id_token) {
//             localStorage.setItem('idToken', data.id_token);
//             const decoded = JSON.parse(atob(data.id_token.split('.')[1]));
//             Promise.resolve().then(() => window.location.href = '/company');


//           } else {
//             console.error('Token not received:', data);
//           }
//         })
//         .catch(err => console.error('Token fetch error:', err));
//     }
//   }, []);

//   return <div>Processing login...</div>;
// };

// export default Callback;


// src/Callback.js
import React, { useEffect } from 'react';
import { COGNITO_CONFIG } from './awsConfig';

const Callback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const body = {
        grant_type: 'authorization_code',
        client_id: COGNITO_CONFIG.ClientId,
        code,
        redirect_uri: COGNITO_CONFIG.RedirectURI
      };

      const formBody = Object.entries(body)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');

      fetch(`https://${COGNITO_CONFIG.Domain}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${COGNITO_CONFIG.ClientId}:${COGNITO_CONFIG.ClientSecret}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        
        
        body: formBody,
      })
        .then(res => res.json())
        .then(data => {
          if (data.id_token) {
            localStorage.setItem('idToken', data.id_token);

            // (Optional) Decode and log the user
            const decoded = JSON.parse(atob(data.id_token.split('.')[1]));
            console.log("User Sub:", decoded.sub);

            // ✅ Redirect to the form page
            window.location.href = '/company';
          } else {
            console.error('Token fetch failed:', data);
          }
        })
        .catch(err => console.error('Callback error:', err));
    }
  }, []);

  return <div>Processing login...</div>;
};

export default Callback;
