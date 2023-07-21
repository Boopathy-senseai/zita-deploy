import { PublicClientApplication } from '@azure/msal-browser';

const clientId = '63177925-c246-4962-8277-eab973bbf0fb'; // Replace with your registered application's client ID
const authority = 'https://login.microsoftonline.com/YOUR_TENANT_ID'; // Replace with your Azure AD tenant ID or 'common' for multi-tenant apps
const scopes = [ "openid",
"offline_access",
"mailboxsettings.read",
"calendars.readwrite",
"user.read",
"profile"]; // Replace with the required scopes for your app

// Create a new instance of MSAL PublicClientApplication
const msalInstance = new PublicClientApplication({
  auth: {
    clientId,
    authority,
    redirectUri: 'http://localhost:3000/account_setting/settings', // Replace with your app's redirect URI
  },
});

// Define the authentication provider function
const getAuthProvider = async () => {
  const loginRequest = {
    scopes,
  };
  alert(">?.")

  try {
    // Attempt to acquire an access token silently (if a valid token is already in cache)
    console.log("loginRequest",loginRequest)
    const response = await msalInstance.acquireTokenSilent(loginRequest);
    // If a token is successfully acquired, return the authentication provider
    if (response && response.accessToken) {
        const { accessToken } = response;
        return {
          getAccessToken: async () => accessToken,
        };
      }
  } catch (error) {
    // If acquiring a token silently fails, try to acquire a new token using interactive login
    if (error.errorMessage === 'interaction_required') {
      try {
        const loginResponse = await msalInstance.loginPopup(loginRequest);

        if (loginResponse && loginResponse.accessToken) {
            const { accessToken } = loginResponse;
            return {
              getAccessToken: async () => accessToken,
            };
          }
      } catch (err) {
        console.error('Error during login:', err);
        throw error;
      }
    }
    console.error('Error acquiring access token:', error);
    throw error;
  }
};

export default getAuthProvider;
