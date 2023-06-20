import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { deletemail, movefolder, mailread } from '../../emailService';
import config from '../../outlookmailConfig';
import { Flex, Card, CheckBox, Text } from '../../uikit';
import SvgArchive from '../../icons/SvgArchive';
import { SvgTrash } from '../../icons';
import SvgJunk from '../../icons/SvgJunk';
import SvgReply from '../../icons/SvgReply';
import SvgForward from '../../icons/SvgForward';
import SvgRead from '../../icons/SvgRead';
import styles from './message.module.css';

type Props = {
  message: any;
  sidebarroute: number;
  composemodal: () => void;
  removemsg: () => void;
  archiveapi: () => void;
  inboxapi: () => void;
  senditemapi: () => void;
  deleteditemsapi: () => void;
  junkemailapi: () => void;
  draftapi: () => void;
};
const Inbox = ({
  message,
  sidebarroute,
  composemodal,
  removemsg,
  archiveapi,
  inboxapi,
  senditemapi,
  deleteditemsapi,
  junkemailapi,
  draftapi,
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
            refetch();
            // console.log('res---------', res);
          })
          .catch((error) => {
            // console.log('connection failed inboxxxxxxx', error);
          });
      } else {
        await movefolder(authProvider, message.id, 'deleteditems')
          .then((res) => {
            refetch();
            // console.log('res---------', res);
          })
          .catch((error) => {
            // console.log('connection failed inboxxxxxxx', error);
          });
      }
    }
  };

  const refetch = () => {
    if (sidebarroute === 1) {
      inboxapi();
    } else if (sidebarroute === 2) {
      senditemapi();
    } else if (sidebarroute === 3) {
      draftapi();
    } else if (sidebarroute === 4) {
      archiveapi();
    } else if (sidebarroute === 5) {
      deleteditemsapi();
    } else {
      junkemailapi();
    }
  };

  const archive = async () => {
    if (message !== '') {
      await movefolder(authProvider, message.id, 'archive')
        .then((res) => {
          removemsg();
          refetch();
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
          refetch();
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
          refetch();
          //  console.log('read------++---', res);
        })
        .catch((error) => {
          // console.log('connection failed inboxxxxxxx', error);
        });
    }
  };

  return (
    <div >
      {console.log('message', message)}
      {console.log('sidebarroute', sidebarroute)}

      {message !== '' ? (
        <>
          {/* {sidebarroute} */}
          <Flex flex={1} row between className={styles.iconContainer}>
            {sidebarroute !== 3 ? (
              <>
                <Flex row>
                  {sidebarroute !== 4 ? (
                    // <Text onClick={archive}> Archive </Text>
                    <Flex title="Archive" className= {styles.icons}>
                      <SvgArchive
                        width={16}
                        height={16}
                        fill={'#581845'}
                        onClick={archive}
                      />
                    </Flex>
                  ) : (
                    ''
                  )}
                  <Flex
                    title="Delete"
                    className= {styles.icons}
                    onClick={remove}
                  >
                    <SvgTrash width={16} height={16} fill={'#581845'} />
                  </Flex>

                  {sidebarroute !== 6 ? (
                    // <Text onClick={junk}> Junk </Text>
                    <Flex
                      title="Junk"
                      className= {styles.icons}
                      onClick={junk}
                    >
                      <SvgJunk width={16} height={16} stroke={'#581845'} />
                    </Flex>
                  ) : (
                    ''
                  )}
                </Flex>

                {/* <Text onClick={remove}>delete</Text> */}
                <Flex row>
                  <Flex
                    title="Reply"
                    className= {styles.icons}
                    onClick={composemodal}
                  >
                    <SvgReply width={16} height={16} />
                  </Flex>

                  {/* <Text onClick={composemodal}> Replay </Text> */}
                  {/* <Text onClick={composemodal}> forward </Text> */}
                  <Flex
                    title="Forward"
                    className= {styles.icons}
                    onClick={composemodal}
                  >
                    <SvgForward width={16} height={16} />
                  </Flex>
                  {/* <Text onClick={() => unread(false)}> UnRead </Text> */}
                  <Flex
                    title="Mark as unread"
                    className= {styles.icons}
                    onClick={() => unread(false)}
                  >
                    <SvgRead width={16} height={16} />
                  </Flex>
                </Flex>
              </>
            ) : (
              <>
                {/* <Text onClick={remove}>delete</Text> */}
                <Flex
                  title="Delete"
                  style={{ cursor: 'pointer' }}
                  onClick={remove}
                >
                  <SvgTrash width={16} height={16} fill={'#581845'} />
                </Flex>
                {/* <Text onClick={() => unread(false)}> UnRead </Text> */}
                <Flex
                  title="Mark as unread"
                  style={{ cursor: 'pointer' }}
                  onClick={() => unread(false)}
                >
                  <SvgRead />
                </Flex>
                <Text>Re-Send</Text>
              </>
            )}
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
        className={styles.bodyContainer}
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
