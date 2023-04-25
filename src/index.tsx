import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { Provider } from 'react-redux';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import config from './outlookmailConfig';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

// import store from './store';

//const msalInstance = new PublicClientApplication(msalConfig);

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
});

const accounts = msalInstance.getAllAccounts();
if (accounts && accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

// msalInstance.addEventCallback((event: EventMessage) => {
//   if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
//     // Set the active account - this simplifies token acquisition
//     const authResult = event.payload as AuthenticationResult;
//     msalInstance.setActiveAccount(authResult.account);
//   }
// });
const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </Provider>
  </React.StrictMode>,
  rootElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
