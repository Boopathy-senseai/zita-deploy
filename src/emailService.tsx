import React, { useEffect } from 'react';
import {
  Client,
  GraphRequestOptions,
  PageCollection,
  PageIterator,
} from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
// import { User } from 'microsoft-graph';
import { gapi } from 'gapi-script';
import { Base64 } from 'js-base64';
import axios from 'axios';
//let graphClient = '';
let graphClient: Client | undefined = undefined;
let Email: any = [];
let Mail: any = [];

export async function filtermail(mail: any, user: string) {
  if (user === 'outlook') {
    const emailValues = mail.map((item: any) => item.value);
    Mail = mail.map((item: any) => item.value);
    Email = emailValues
      .map(
        (email) =>
          `from:${email} OR to:${email} OR cc:${email} OR bcc:${email}`,
      )
      .join(' OR ');
    return Email;
  } else {
    const emailValues = mail.map((item: any) => item.value);
    Email = emailValues
      .map(
        (email) =>
          `from:${email} OR to:${email} OR cc:${email} OR bcc:${email}`,
      )
      .join(' OR ');
    return Email;
  }
}

export async function outlooktoken(token: any) {
  graphClient = Client.init({
    authProvider: (done) => {
      done(null, token);
    },
  });
  return graphClient;
}

export async function getUser() {
  //ensureClient(authProvider);

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
  var response: any = await graphClient
    ?.api('/me/mailFolders/Inbox/messages')
    .count(true)
    .skip(previous)
    .top(range)
    .get();

  //console.log('-----Inboxmessage-----', response['@odata.count']);
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
      return error;
    });
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

export async function mailread(id, read) {
  //console.log('read', read);
  var response: any = await graphClient.api(`/me/messages/${id}`).update(read);
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
  return response;
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
  return response;
}

export async function mailreplayall(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id,
  data,
) {
  var response: any = await graphClient
    ?.api(`/me/messages/${id}/replyAll`)
    .post(data);
  return response;
  //console.log('-----replaymail-----', response);
}

export async function replay_all_forward_draft(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  data,
  id,
  reply_url,
) {
  var response: any = await graphClient
    .api(`/me/messages/${id}/createReply`)
    .post(data);
  return response;
}

export async function getsearchmail(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  folder,
  serchdata,
  range,
  token,
) {
  if (folder === 'All') {
    if (token !== null) {
      var response1: any = await graphClient
        ?.api(`/me/messages`)
        .count(true)
        .query(`$search="${serchdata} AND (${Email})"`)
        .top(range)
        .skipToken(token)
        .get();
      console.log('-----allsearch-----', response1);
      return response1;
    } else {
      var response2: any = await graphClient
        ?.api(`/me/messages`)
        .count(true)
        .query(`$search="${serchdata} AND (${Email})"`)
        .top(range)
        .get();
      console.log('-----allsearch2-----', response2);
      return response2;
    }
  } else {
    if (token !== null) {
      var response: any = await graphClient
        ?.api(`/me/mailFolders/${folder}/messages`)
        .count(true)
        .query(`$search="${serchdata} AND (${Email})"`)
        .top(range)
        .skipToken(token)
        .get();

      return response;
    } else {
      var res: any = await graphClient
        ?.api(`/me/mailFolders/${folder}/messages`)
        .count(true)
        .query(`$search="${serchdata} AND (${Email})"`)
        .top(range)
        .get();

      return res;
    }
  }
}

export async function getmessages(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  folder,
  token,
  range,
) {
  if (token === null) {
    const response = await graphClient
      .api(`/me/mailFolders/${folder}/messages`)
      .count(true)
      .query(`$search="${Email}"`)
      .top(range)
      .get();
    console.log('1111', response);
    return response;
  } else {
    const response = await graphClient
      .api(`/me/mailFolders/${folder}/messages`)
      .count(true)
      .query(`$search="${Email}"`)
      .top(range)
      .skipToken(token)
      .get();
    console.log('22222', response);
    return response;
  }
}

export async function getusermail(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
) {
  const emailList = ['manojr@sense7ai.com', 'jananirangesh@sense7ai.com'];

  const searchdata = emailList
    .map(
      (email) => `from:${email} OR to:${email} OR cc:${email} OR bcc:${email}`,
    )
    .join(' OR ');

  const response = await graphClient
    .api(`/me/mailFolders/${'Inbox'}/messages`)
    .count(true)
    .query(`$search="${searchdata}",$count="${true}"`)
    .get();

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

  return response;
}

export async function getattachments(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id,
) {
  var response: any = await graphClient
    ?.api(`/me/messages/${id}/attachments`)
    .get();

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

  return response;
}

export async function getmailfolders(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  folder,
) {
  const range=9000000
  var response: any = await graphClient
    ?.api(`/me/mailFolders/${folder}/messages`)
    .query({ '$search': `"${Email}"` })
    .top(range)
    .get();
    const unreadMessages = response.value ? response.value.filter(message => !message.isRead) : [];
    const unreadCount = unreadMessages.length; 
  return unreadCount; 
}
export async function draftupdate(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id,
  data,
) {
  var response: any = await graphClient?.api(`/me/messages/${id}`).update(data);
  return response;
}

////
//////////<----------------------------- Gmail Api---------------------------------->/////////////
/////

export async function gmail_Account_Profile(token) {
  gapi.auth.setToken({
    access_token: token,
  });

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

export const initGoogleAuth = async (token) => {
  return new Promise<void>(async (resolve, reject) => {
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

export async function Gmail_Mails(folder, pageToken, maxresult, tokens) {
  gapi.auth.setToken({
    access_token: tokens,
  });
  try {
    const response = await gapi.client.gmail.users.messages.list({
      userId: 'me',
      labelIds: folder,
      q: Email,
      maxResults: maxresult,
      pageToken: pageToken,
    });

    const { messages } = response.result;
    const token = response.result.nextPageToken;

    if (messages !== undefined) {
      var fullMessages = await Promise.all(
        messages.map(async (message) => {
          const fullMessageResponse =
            await gapi.client.gmail.users.messages.get({
              userId: 'me',
              id: message.id,
            });
          return fullMessageResponse.result;
        }),
      );
    }
    console.log('zazaza', response);
    return { token, messages, fullMessages };
  } catch (error) {
    // console.error('Error loading messages:', error);
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

    const attachments = [];
    const contentTypeHeader = message.payload.headers.find(
      (header) => header.name.toLowerCase() === 'content-type',
    );
    const checkfileattach = contentTypeHeader.value.includes('multipart/mixed');
    if (checkfileattach === true) {
      const parts = message.payload.parts || [];
      parts.forEach((part) => {
        if (part.filename && part.body && part.body.attachmentId) {
          const attachment = {
            attachmentId: part.body.attachmentId,
            name: part.filename,
            mimeType: part.mimeType,
          };
          attachments.push(attachment);
        }
      });
    }

    // Extract the body of the message
    var body = getMessageBody(message.payload);
    return { attachments, body, message };
  } catch (error) {
    //console.error('Error loading message body:', error);
  }
}

const getMessageBody = (mes) => {
  const encodedBody =
    typeof mes.parts === 'undefined' ? mes.body.data : getHTMLPart(mes.parts);
  return Base64.decode(encodedBody);
};

const getHTMLPart = (arr) => {
  for (var x = 0; x <= arr.length; x++) {
    console.log('000typeof arr[x].parts', typeof arr[x].parts);
    if (typeof arr[x].parts === 'undefined') {
      console.log('1111', arr[x].mimeType);
      if (arr[x].mimeType === 'text/html') {
        console.log('2222', arr[x].body.data);
        return arr[x].body.data;
      }
    } else {
      console.log('3333', arr[x].mimeType);
      return getHTMLPart(arr[x].parts);
    }
  }
  return '';
};

export const Gmail_read_messages = async (messageId) => {
  const response = await gapi.client.gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    resource: {
      removeLabelIds: ['UNREAD'],
    },
  });

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

export const Gmail_search = async (Folder, serchdata, maxresult, pageToken) => {
  try {
    const query = `from:(${Email}) in:${Folder} ${serchdata}`;
    const response = await gapi.client.gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: maxresult,
      pageToken: pageToken,
    });

    const { messages } = response.result;
    const token = response.result.nextPageToken;
    if (messages && messages.length > 0) {
      const fullMessages = await Promise.all(
        messages.map(async (message) => {
          const fullMessageResponse =
            await gapi.client.gmail.users.messages.get({
              userId: 'me',
              id: message.id,
            });
          return fullMessageResponse.result;
        }),
      );

      return { token, messages, fullMessages };
    }
  } catch (error) {
    // console.error('Error loading messages:', error);
  }
};

export const Gmail_Draft = async (draft) => {
  gapi.client.gmail.users.drafts
    .create({
      userId: 'me',
      resource: draft,
    })
    .then((response) => {
      // You can perform additional actions here after the draft is saved
    })
    .catch((error) => {
      //console.error('Error saving draft:', error);
    });
};

export const Gmail_Attachment = async (id, attachid) => {
  const response = await gapi.client.gmail.users.messages.attachments.get({
    userId: 'me',
    // eslint-disable-next-line max-len
    id: attachid,
    messageId: id,
  });
  return response;
};

export const Gmail_Folder_Total_count = async (folder) => {
  const count = gapi.client.gmail.users.messages.list({
    userId: 'me',
    q: `is:unread label:${folder} from:${Email}`,
  });
  return count;
};

export const Gmail_Reply_forward = async (data) => {
  // console.log('====', data);
  const reply = gapi.client.gmail.users.messages.send({
    userId: 'me',
    resource: {
      raw: data,
    },
  });
  return reply;
};

export const Gmail_profile = async () => {
  const profile = await gapi.client.gmail.users.getProfile({
    userId: 'me', // 'me' refers to the authenticated user
  });

  return profile;
};

export const gmail_msg = async (id) => {
  const fullMessageResponse = await gapi.client.gmail.users.messages.get({
    userId: 'me',
    id: id,
  });

  return fullMessageResponse.result;
};

export const move_to_spam = async (id, folder) => {
  const responce = await gapi.client.gmail.users.messages.modify({
    userId: 'me',
    id: id,
    resource: {
      removeLabelIds: folder,
      addLabelIds: ['SPAM'],
    },
  });
  return responce;
};

export const gmail_permanent_Delete = async (messageId) => {
  gapi.client.gmail.users.messages
    .delete({
      userId: 'me',
      id: messageId,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const gmail_draft_update = async (id, messagebody) => {
  gapi.client.gmail.users.drafts
    .update({
      userId: 'me',
      id: id,
      resource: messagebody,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      // console.log('error:', error);
      return error;
    });
};
