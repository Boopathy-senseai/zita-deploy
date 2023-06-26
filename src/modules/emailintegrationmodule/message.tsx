import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

import {
  deletemail,
  movefolder,
  mailread,
  dowloadattachments,
} from '../../emailService';
import config from '../../outlookmailConfig';
import { Flex, Card, CheckBox, Text } from '../../uikit';
type Props = {
  message: any;
  sidebarroute: number;
  composemodal: () => void;
  removemsg: () => void;
  // archiveapi: () => void;
  // inboxapi: () => void;
  // senditemapi: () => void;
  // deleteditemsapi: () => void;
  // junkemailapi: () => void;
  // draftapi: () => void;
  page: () => void;
  attachments: any;
};
const Inbox = ({
  message,
  sidebarroute,
  composemodal,
  removemsg,
  // archiveapi,
  // inboxapi,
  // senditemapi,
  // deleteditemsapi,
  // junkemailapi,
  // draftapi,
  page,
  attachments,
}: Props) => {
  const msal = useMsal();
  const [view, setview] = useState(true);
  const [read, setread] = useState(true);
  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,

      interactionType: InteractionType.Popup,
    },
  );
  const selectinbox = () => {
    setview(!view);
  };

  useEffect(() => {
    if (message.isRead !== true && message !== '') {
      alert('im false');
      updatereadmessage();
    }
  }, [message]);

  const updatereadmessage = async () => {
    var readmessage = {
      IsRead: true,
    };
    await mailread(authProvider, message.id, readmessage)
      .then((res) => {
        //  console.log('read------++---', res);
      })
      .catch((error) => {
        //  console.log('connection failed inboxxxxxxx', error);
      });
  };

  const remove = async () => {
    if (message !== '') {
      if (sidebarroute === 5) {
        await deletemail(authProvider, message.id)
          .then((res) => {
            page();
            // console.log('res---------', res);
          })
          .catch((error) => {
            // console.log('connection failed inboxxxxxxx', error);
          });
      } else {
        await movefolder(authProvider, message.id, 'deleteditems')
          .then((res) => {
            page();
            // console.log('res---------', res);
          })
          .catch((error) => {
            // console.log('connection failed inboxxxxxxx', error);
          });
      }
    }
  };

  // const refetch = () => {
  //   if (sidebarroute === 1) {
  //     inboxapi();
  //   } else if (sidebarroute === 2) {
  //     senditemapi();
  //   } else if (sidebarroute === 3) {
  //     draftapi();
  //   } else if (sidebarroute === 4) {
  //     archiveapi();
  //   } else if (sidebarroute === 5) {
  //     deleteditemsapi();
  //   } else {
  //     junkemailapi();
  //   }
  // };

  const archive = async () => {
    if (message !== '') {
      await movefolder(authProvider, message.id, 'archive')
        .then((res) => {
          removemsg();
          page();
          // console.log('res---------', res);
        })
        .catch((error) => {
          // console.log('connection failed inboxxxxxxx', error);
        });
    }
  };

  const junk = async () => {
    if (message !== '') {
      await movefolder(authProvider, message.id, 'junkemail')
        .then((res) => {
          alert('junk successful');
          page();
        })
        .catch((error) => {
          // console.log('connection failed inboxxxxxxx', error);
        });
    }
  };

  const unread = async (val: boolean) => {
    if (message !== '') {
      var readmessage = {
        IsRead: false,
      };
      await mailread(authProvider, message.id, readmessage)
        .then((res) => {
          page();
          //  console.log('read------++---', res);
        })
        .catch((error) => {
          // console.log('connection failed inboxxxxxxx', error);
        });
    }
  };

  const donwnload = async (val) => {
    var a = document.createElement('a');
    a.href = `data:${val.contentType};base64,` + val.contentBytes;
    a.download = val.name;
    a.click();
  };

  return (
    <div>
      {console.log('attachments', attachments)}
      {message !== '' ? (
        <>
          {sidebarroute}
          <Flex row end between>
            {sidebarroute !== 3 ? (
              <>
                <Text onClick={remove}>delete</Text>
                {sidebarroute !== 4 ? (
                  <Text onClick={archive}> Archive </Text>
                ) : (
                  ''
                )}
                {sidebarroute !== 6 ? <Text onClick={junk}> Junk </Text> : ''}
                <Text onClick={composemodal}> Replay </Text>
                <Text onClick={composemodal}> forward </Text>
                <Text onClick={() => unread(false)}> UnRead </Text>
              </>
            ) : (
              <>
                <Text onClick={remove}>delete</Text>
                <Text onClick={() => unread(false)}> UnRead </Text>
                <Text>Re-Send</Text>
              </>
            )}
          </Flex>
        </>
      ) : (
        ''
      )}
      <Flex
        style={{
          marginLeft: '2px',
          marginTop: '10px',
          marginRight: '10px',
          with: '100%',
        }}
      >
        <Flex row>
          <Flex>
            {message !== '' ? (
              <>{parse(message.body.content)} </>
            ) : (
              'no message selected'
            )}
          </Flex>
        </Flex>
        <Flex row>
          <Flex>
            {attachments !== '' ? (
              <>
                {attachments.map((val, ind) => (
                  <Flex key={ind} style={{ width: '200px', padding: '5px' }}>
                    <Card onClick={() => donwnload(val)}>{val.name}</Card>
                  </Flex>
                ))}
              </>
            ) : (
              ''
            )}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Inbox;
