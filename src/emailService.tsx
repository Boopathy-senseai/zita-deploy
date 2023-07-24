import {
  Client,
  GraphRequestOptions,
  PageCollection,
  PageIterator,
} from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
// import { User } from 'microsoft-graph';
import { gapi } from 'gapi-script';
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
  previous,
  range,
) {
  if (folder === 'All') {
    var response1: any = await graphClient
      ?.api(`/me/messages`)
      .count(true)

      .top(1000)
      .search(serchdata)
      .get();

    console.log('-----allsearch-----', response1);
    return response1;
  } else {
    var response: any = await graphClient
      ?.api(`/me/mailFolders/${folder}/messages`)
      .count(true)

      .top(1000)
      .search(serchdata)
      .get();

    console.log('-----particularsearchmail-----', response);
    return response;
  }
}

export async function getmessages(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  folder,
  previous,
  range,
) {
  console.log('previous', previous);
  var response: any = await graphClient
    ?.api(`/me/mailFolders/${folder}/messages`)
    .count(true)
    .skip(previous)
    .top(range)
    .get();
  console.log('-----folder-----', folder, response);
  return response;
}

export async function getusermail(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
) {
  // eslint-disable-next-line max-len
  const searchQuery = `(from: 'manojr@sense7ai.com' OR from: 'jananirangesh@sense7ai.com') OR (to: 'manojr@sense7ai.com' OR to: 'jananirangesh@sense7ai.com') OR (cc: 'manojr@sense7ai.com' OR cc: 'jananirangesh@sense7ai.com') OR (bcc: 'manojr@sense7ai.com' OR bcc: 'jananirangesh@sense7ai.com')`;

  var response: any = await graphClient
    ?.api(`/me/mailFolders/${'Inbox'}/messages`)
    .query({ $search: searchQuery })
    .count(true)
    .top(1000)
    .get();
  console.log('-----particularmail-----', response);
  return response;
}

export async function getselectedmsg(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id,
) {
  var response: any = await graphClient
    ?.api(`/me/messages/${id}`)
    // .select('attachments,toRecipients')
    .top(25)
    .get();
  console.log('----- selectmsg-----', response);
  return response;
}

export async function getattachments(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id,
) {
  var response: any = await graphClient
    ?.api(`/me/messages/${id}/attachments`)
    .get();
  console.log('-----attachment-----', response);
  return response;
}

export async function dowloadattachments(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id,
  val,
) {
  var response: any = await graphClient
    ?.api(`/me/messages/${id}/attachments/${val}`)
    .get();
  console.log('-----attachment-----', response);
  return response;
}

export async function getmailfolders(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
) {
  var response: any = await graphClient
    ?.api(`/me/mailFolders`)
    .select('id,displayName,totalItemCount,unreadItemCount')
    .get();
  //console.log('-----getmailfolder-----', response);
  return response;
}

/////// Gmail /////////

export async function gmail_Account_Profile() {
  await gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .then.then((res: any) => {
      return res;
    })
    .catch((errmsg) => {
      return errmsg;
    });
}

export const initGoogleAuth = () => {
  return new Promise<void>((resolve, reject) => {
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: process.env.REACT_APP_SCOPES,
        })
        .then(() => {
          // Load the Gmail API client
          return gapi.client.load('gmail', 'v1');
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export function handleGoogleAuth() {
  initGoogleAuth()
    .then(() => {
      // console.log('Google API client initialized');
      // After successful initialization and authentication, fetch inbox messages
    })
    .catch((error) => {
      console.error('Failed to initialize Google API client:', error);
    });
}

export async function gmail_Inbox() {
  var response: any = await gapi.client.gmail.users.messages.list({
    userId: 'me',
    labelIds: 'INBOX',
    maxResults: 20, // Adjust the number of results as needed
  });
  return response;
}

export const fetchFullMessageContent = (messageId) => {
  return gapi.client.gmail.users.messages.get({
    userId: 'me',
    id: messageId,
    format: 'full', // Request the full message body
  });
};

export async function gmail_send(base64EncodedEmail) {
  const res = gapi.client.gmail.users.messages.send({
    userId: 'me',
    resource: {
      raw: base64EncodedEmail,
    },
  });
  return res;
}

export async function Gmail_Mails(folder) {
  try {
    const response = await gapi.client.gmail.users.messages.list({
      userId: 'me',
      labelIds: folder,
      maxResults: 25,
    });

    const { messages } = response.result;
    if (messages && messages.length > 0) {
      const messageIds = messages.map((message) => message.id);
      var messageResponses = [];

      for (const messageId of messageIds) {
        const messageResponse = await gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: messageId,
          format: 'metadata',
          metadataHeaders: ['From', 'Subject', 'To', 'X-GM-Labels'],
        });

        messageResponses.push(messageResponse.result);
      }
    }
    return messageResponses;
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}
export async function Selected_message(id) {
  try {
    const response = await gapi.client.gmail.users.messages.get({
      userId: 'me',
      id: id,
      format: 'full',
    });
    const message = response.result;
    return message;
  } catch (error) {
    console.error('Error loading message body:', error);
  }
}
export const Gmail_read_messages = async (messageId) => {
  const response = await gapi.client.gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    resource: {
      removeLabelIds: ['UNREAD'],
    },
  });
  console.log('sdsd', response);
  return response;
};

export const Gmail_unread_messages = (messageId) => {
  return gapi.client.gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    resource: {
      addLabelIds: ['UNREAD'],
    },
  });
};
export const Gmail_MessageToBin = (messageId) => {
  return gapi.client.gmail.users.messages.trash({
    userId: 'me',
    id: messageId,
  });
};

export const Gmail_search = async (Folder, serchdata) => {
  try {
    const query = `in:${Folder} ${serchdata}`;
    const response = await gapi.client.gmail.users.messages.list({
      userId: 'me',
      q: query,
    });

    const { messages } = response.result;
    if (messages && messages.length > 0) {
      const messageIds = messages.map((message) => message.id);
      var messageResponses = [];

      for (const messageId of messageIds) {
        const messageResponse = await gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: messageId,
          format: 'full',
        });

        messageResponses.push(messageResponse.result);
      }
    }
    console.log('-search-', messageResponses);
    return messageResponses;
  } catch (error) {
    console.error('Error loading messages:', error);
  }
};

export const Gmail_Draft = async (Folder, serchdata) => {
  var draft = 'sd';
  gapi.client.gmail.users.drafts
    .create({
      userId: 'me',
      resource: draft,
    })
    .then((response) => {
      console.log('Draft saved successfully.', response);
      // You can perform additional actions here after the draft is saved
    })
    .catch((error) => {
      console.error('Error saving draft:', error);
    });
};
