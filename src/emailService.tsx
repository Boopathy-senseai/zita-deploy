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
  // console.log(graphClient);
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
    // .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();
  // console.log(user);
  return user;
}

export async function getmail(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  previous,
  range,
) {
  console.log('1', previous);
  console.log('2', range);
  var response: any = await graphClient
    ?.api('/me/mailFolders/Inbox/messages')
    .count(true)
    .skip(previous)
    .top(range)
    .get();

  console.log('-----Inboxmessage-----', response['@odata.count']);
  return response;
}

export async function composemail(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  data,
) {
  var response: any = await graphClient?.api('me/sendMail').post(data);
  // console.log('data---------', response);
}

export async function draftmail(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  data,
) {
  var response: any = await graphClient?.api('me/messages').post(data.message);
  //console.log('data---------', response);
}

export async function getdraft(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
) {
  var response: any = await graphClient
    ?.api('/me/mailFolders/Drafts/messages')
    .top(25)
    .get();
  //console.log('-----mailresponce-----', response);
  return response;
}

export async function getsenditem(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
) {
  var response: any = await graphClient
    ?.api('/me/mailFolders/SentItems/messages')
    .top(25)
    .get();
  // console.log('-----sendmailresponce-----', response);
  return response;
}

export async function deletemail(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id,
) {
  await graphClient
    ?.api(`/me/messages/${id}`)
    .delete()
    .then((res) => {
      //  console.log('--succres--', res);
      return res;
    })
    .catch((error) => {
      //   console.log('--errorDEl--', error);
    });
  // console.log('-----sendmailresponce-----', response);
  // return response;
}

export async function getarchivemsg(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
) {
  var response: any = await graphClient
    ?.api('/me/mailFolders/archive/messages')
    .top(25)
    .get();
  // console.log('-----mailresponce-----', response);
  return response;
}

export async function movefolder(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id,
  folder,
) {
  const message = {
    destinationId: folder,
  };
  await graphClient
    ?.api(`/me/messages/${id}/move`)
    .top(25)
    .post(message)
    .then((res) => {
      // console.log('--move on folder success--', res);
      return res;
    })
    .catch((error) => {
      //  console.log('--move error--', error);
    });
}

export async function getdeleteditems(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
) {
  var response: any = await graphClient
    ?.api('/me/mailFolders/deleteditems/messages')
    .top(25)
    .get();
  return response;
}

export async function getjunkemail(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
) {
  var response: any = await graphClient
    ?.api('/me/mailFolders/junkemail/messages')
    .top(25)
    .get();
  // console.log('-----junkmail-----', response);
  return response;
}

export async function mailread(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id,
  read,
) {
  //console.log('read', read);
  var response: any = await graphClient?.api(`/me/messages/${id}`).update(read);
  //console.log('-----mailread-----', response);
  return response;
}

export async function mailreplay(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id,
  data,
) {
  var response: any = await graphClient
    ?.api(`/me/messages/${id}/reply`)
    .post(data);
  // console.log('-----replaymail-----', response);
}

export async function mailforward(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id,
  data,
) {
  var response: any = await graphClient
    ?.api(`/me/messages/${id}/forward`)
    .post(data);
  //console.log('-----replaymail-----', response);
}

export async function getsearchmail(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  folder,
  serchdata,
) {
  console.log('folder', folder);
  console.log('serchdata', serchdata);
  var response: any = await graphClient
    ?.api(`/me/mailFolders/${folder}/messages`)
    .search(serchdata)
    .top(1000)
    .get();
  console.log('-----searchmail-----', response);
  return response;
}

export async function getmessages(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  folder,
  previous,
  range,
) {
  console.log('------------ folder', folder);
  console.log('------------ previous', previous);
  console.log('------------ range', range);
  var response: any = await graphClient
    ?.api(`/me/mailFolders/${folder}/messages`)
    .count(true)
    .skip(previous)
    .top(range)
    .get();
  //console.log('-----mailresponce-----', response);
  return response;
}
