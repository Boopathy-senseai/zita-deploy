import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

import { deletemail, movefolder, mailread } from '../../emailService';
import config from '../../outlookmailConfig';
import { Flex, Card, Text } from '../../uikit';
import SvgArchive from '../../icons/SvgArchive';
import { SvgTrash } from '../../icons';
import SvgJunk from '../../icons/SvgJunk';
import SvgReply from '../../icons/SvgReply';
import SvgForward from '../../icons/SvgForward';
import SvgRead from '../../icons/SvgRead';
import SvgLeft from '../../icons/SvgLeft';
import SvgRight from '../../icons/SvgRight';
import styles from './message.module.css';

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
  previousfun: () => void;
  nextfun: () => void;
  range: any;
  previous: any;
  previous1: any;
  total: any;
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
  previousfun,
  nextfun,
  range,
  previous,
  previous1,
  total,
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

  const Previousdata = () => {
    previousfun();
  };

  const Nextdata = () => {
    nextfun();
  };

  return (
    <div>
      {console.log('attachments', attachments)}
      {message !== '' ? (
        <>
          {/* {sidebarroute} */}
          <Flex flex={1} row between center className={styles.iconContainer}>
            {sidebarroute !== 3 ? (
              <>
                <Flex row>
                  {sidebarroute !== 4 ? (
                    // <Text onClick={archive}> Archive </Text>
                    <Flex title="Archive" className={styles.icons}>
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
                    className={styles.icons}
                    onClick={remove}
                  >
                    <SvgTrash width={16} height={16} fill={'#581845'} />
                  </Flex>

                  {sidebarroute !== 6 ? (
                    // <Text onClick={junk}> Junk </Text>
                    <Flex title="Junk" className={styles.icons} onClick={junk}>
                      <SvgJunk width={16} height={16} stroke={'#581845'} />
                    </Flex>
                  ) : (
                    ''
                  )}
                </Flex>

                {/* <Text onClick={remove}>delete</Text> */}
                <Flex row>
                  <Text>
                    {previous1}-{previous} of {total}
                  </Text>
                  <Flex
                    title="previous"
                    className={styles.icons}
                    style={{ marginLeft: '5px' }}
                  >
                    <SvgLeft
                      width={12}
                      height={12}
                      fill={'#581845'}
                      onClick={Previousdata}
                    />
                  </Flex>
                  <Flex title="Next" className={styles.icons}>
                    <SvgRight
                      width={12}
                      height={12}
                      fill={'#581845'}
                      onClick={Nextdata}
                    />
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
        style={{
          padding: '5px 10px',
          width: '100%',
        }}
        className={styles.bodyContainer}
      >
        <Flex row width={'100%'}>
          {message !== '' ? (
            <>
              <Flex column width={'100%'}>
                <Flex row between style={{ borderBottom: '1px solid #c3c3c3' }}>
                  <Flex width={'100%'} style={{ padding: '5px 10px' }}>
                    <Flex row between width={'100%'}>
                      <Text bold size={14}>
                        {message.sender.emailAddress.name}
                      </Text>

                      <Flex row marginRight={10}>
                        <Flex
                          title="Reply"
                          className={styles.icons}
                          onClick={composemodal}
                        >
                          <SvgReply width={16} height={16} />
                        </Flex>
                        <Flex
                          title="Forward"
                          className={styles.icons}
                          onClick={composemodal}
                        >
                          <SvgForward width={16} height={16} />
                        </Flex>
                        <Flex
                          title="Mark as unread"
                          className={styles.icons}
                          onClick={() => unread(false)}
                        >
                          <SvgRead width={16} height={16} />
                        </Flex>
                      </Flex>
                    </Flex>
                    <Text size={14}>
                      {message.subject !== ''
                        ? message.subject
                        : '(No Subject)'}
                    </Text>
                    <Text color="black">{`To: ${message.toRecipients.map(
                      (doc) => doc.emailAddress.name,
                    )}`}</Text>
                  </Flex>
                </Flex>
                <Flex height={590} style={{ margin: '10px' }}>
                  {parse(message.body.content)}
                </Flex>
              </Flex>
            </>
          ) : (
            'no message selected'
          )}
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
