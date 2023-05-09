import {
  Client,
  GraphRequestOptions,
  PageCollection,
  PageIterator,
} from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
// import { User } from 'microsoft-graph';

let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
  }

  return graphClient;
}

export async function getUser(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
) {
  ensureClient(authProvider);

  // Return the /me API endpoint result as a User object
  const user = await graphClient!
    .api('/me')
    // Only retrieve the specific fields needed
    .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();

  return user;
}

export async function getmail(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
) {
  var response: any = await graphClient?.api('/me/messages').top(25).get();

  return response;
}

export async function composemail(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
) {
  console.log('data');
}
