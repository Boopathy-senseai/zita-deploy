import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { deletemail, movefolder, mailread } from '../../emailService';
import config from '../../outlookmailConfig';
import { Flex, Card, CheckBox, Text } from '../../uikit';

type Props = {
  message: any;
  sidebarroute: number;
  composemodal: () => void;
};
const Inbox = ({ message, sidebarroute, composemodal }: Props) => {
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
            // console.log('res---------', res);
          })
          .catch((error) => {
            // console.log('connection failed inboxxxxxxx', error);
          });
      } else {
        await movefolder(authProvider, message.id, 'deleteditems')
          .then((res) => {
            // console.log('res---------', res);
          })
          .catch((error) => {
            // console.log('connection failed inboxxxxxxx', error);
          });
      }
    }
  };

  const archive = async () => {
    if (message !== '') {
      await movefolder(authProvider, message.id, 'archive')
        .then((res) => {
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
          //  console.log('read------++---', res);
        })
        .catch((error) => {
          // console.log('connection failed inboxxxxxxx', error);
        });
    }
  };

  return (
    <div>
      {message !== '' ? (
        <>
          <Flex row end between>
            <Text onClick={remove}>delete</Text>
            <Text onClick={archive}> Archive </Text>
            <Text onClick={junk}> Junk </Text>
            <Text onClick={composemodal}> Replay </Text>
            <Text onClick={composemodal}> forward </Text>
            <Text onClick={() => unread(false)}> UnRead </Text>
          </Flex>
        </>
      ) : (
        ''
      )}

      <Flex
        row
        style={{
          marginLeft: '2px',
          marginTop: '10px',
          marginRight: '10px',
          with: '100%',
        }}
      >
        <Flex row>
          {message !== '' ? (
            <>{parse(message.body.content)} </>
          ) : (
            'no message selected'
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default Inbox;
