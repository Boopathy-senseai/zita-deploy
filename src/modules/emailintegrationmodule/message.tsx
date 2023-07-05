import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import Toast from '../../uikit/Toast/Toast';
import { deletemail, movefolder, mailread } from '../../emailService';
import config from '../../outlookmailConfig';
import { Flex, Card, Text } from '../../uikit';
import SvgArchive from '../../icons/SvgArchive';
import { SvgEdit, SvgTrash } from '../../icons';
import SvgJunk from '../../icons/SvgJunk';
import SvgReply from '../../icons/SvgReply';
import SvgForward from '../../icons/SvgForward';
import SvgRead from '../../icons/SvgRead';
import SvgLeft from '../../icons/SvgLeft';
import SvgRight from '../../icons/SvgRight';
import SvgDownload from '../../icons/SvgDownload';
import SvgEmptyMail from '../../icons/SVGEmptyMail';
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
      updatereadmessage();
    }
  }, [message]);

  const updatereadmessage = async () => {
    var readmessage = {
      IsRead: true,
    };
    await mailread(authProvider, message.id, readmessage)
      .then((res) => {
        //page();
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
            removemsg();
            page();
            Toast('Email remove permanent successfully', 'SHORT', 'success');

            // console.log('res---------', res);
          })
          .catch((error) => {
            // console.log('connection failed inboxxxxxxx', error);
          });
      } else {
        await movefolder(authProvider, message.id, 'deleteditems')
          .then((res) => {
            removemsg();
            page();
            Toast('Moved to delete email successfully', 'SHORT', 'success');

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
          Toast('Moved to archive email successfully', 'SHORT', 'success');

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
          removemsg();
          page();
          Toast('Moved to junk email successfully', 'SHORT', 'success');
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
          removemsg();
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
  const messageIcon = message !== '';
  return (
    <div>
      {console.log('meaa', message)}
      <Flex flex={1} row between center className={styles.iconContainer}>
        {sidebarroute !== 3 ? (
          <>
            <Flex row>
              {sidebarroute !== 4 ? (
                // <Text onClick={archive}> Archive </Text>
                <Flex
                  title="Archive"
                  className={messageIcon ? styles.icons : styles.iconsDisabled}
                >
                  <SvgArchive
                    width={16}
                    height={16}
                    fill={messageIcon ? '#581845' : '#58184550'}
                    onClick={messageIcon ? archive : undefined}
                  />
                </Flex>
              ) : (
                ''
              )}
              <Flex
                title="Delete"
                className={messageIcon ? styles.icons : styles.iconsDisabled}
                // onClick={messageIcon ? remove : undefined}
              >
                <SvgTrash
                  width={16}
                  height={16}
                  fill={messageIcon ? '#581845' : '#58184550'}
                  onClick={messageIcon ? remove : undefined}
                  cursor={messageIcon ? 'pointer' : 'auto'}
                />
              </Flex>

              {sidebarroute !== 6 ? (
                <Flex
                  title="Junk"
                  className={messageIcon ? styles.icons : styles.iconsDisabled}
                  onClick={messageIcon ? junk : undefined}
                >
                  <SvgJunk
                    width={16}
                    height={16}
                    ß
                    stroke={messageIcon ? '#581845' : '#58184550'}
                  />
                </Flex>
              ) : (
                ''
              )}
            </Flex>

            {sidebarroute !== 0 ? (
              <>
                <Flex row>
                  <Text color="theme">
                    {`${previous1}-${previous} of ${total}`}
                  </Text>
                  <Flex
                    title="previous"
                    className={
                      previous1 !== 1 ? styles.icons : styles.iconsDisabled
                    }
                    style={{ marginLeft: '5px' }}
                  >
                    <SvgLeft
                      width={12}
                      height={12}
                      fill={previous1 !== 1 ? '#581845' : '#58184550'}
                      onClick={previous1 !== 1 ? Previousdata : undefined}
                    />
                  </Flex>
                  <Flex
                    title="Next"
                    className={
                      previous !== total ? styles.icons : styles.iconsDisabled
                    }
                  >
                    <SvgRight
                      width={12}
                      height={12}
                      fill={previous !== total ? '#581845' : '#58184550'}
                      onClick={previous !== total ? Nextdata : undefined}
                    />
                  </Flex>
                </Flex>
              </>
            ) : (
              ''
            )}
          </>
        ) : (
          <>
            <Flex row>
              {' '}
              <Flex
                title="Delete"
                className={messageIcon ? styles.icons : styles.iconsDisabled}
                onClick={messageIcon ? remove : undefined}
              >
                <SvgTrash
                  width={16}
                  height={16}
                  fill={messageIcon ? '#581845' : '#58184550'}
                  cursor={messageIcon ? 'pointer' : 'auto'}
                />
              </Flex>
              {/* <Flex
                title="Mark as unread"
                className={messageIcon ? styles.icons : styles.iconsDisabled}
                style={{ cursor: 'pointer' }}
                onClick={() => unread(false)}
              >
                <SvgRead
                  width={16}
                  height={16}
                  fill={messageIcon ? '#581845' : '#58184550'}
                />
              </Flex> */}
              <Flex
                title="Edit Message"
                className={styles.iconsDisabled}
                // style={{ cursor: 'pointer' }}
                onClick={() => {}}
              >
                <SvgEdit
                  width={16}
                  height={16}
                  fill={messageIcon ? '#581845' : '#58184550'}
                />
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
      {console.log('attachments', attachments)}
      {message !== '' ? <>{/* {sidebarroute} */}</> : ''}
      <Flex
        style={{
          padding: '5px 10px',
          width: '100%',
        }}
        className={styles.bodyContainer}
      >
        <Flex row width={'100%'} height={'100%'}>
          {message !== '' ? (
            <>
              <Flex
                column
                width={'100%'}
                style={{
                  border: '1px solid #c3c3c3',
                  borderRadius: '5px 5px 0px 0px',
                }}
              >
                <Flex row between style={{ borderBottom: '1px solid #c3c3c3' }}>
                  <Flex width={'100%'} style={{ padding: '5px 10px' }}>
                    <Flex row between width={'100%'}>
                      {message.isDraft !== true ? (
                        <Text bold size={14}>
                          {message.sender.emailAddress.name}
                        </Text>
                      ) : (
                        <Flex>
                          <Text bold size={14} style={{ color: '#ED4857' }}>
                            {'Draft'}
                          </Text>
                          <Text bold size={14}>
                            {'(No Sender)'}
                          </Text>
                        </Flex>
                      )}

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
                    {message.toRecipients.length !== 0 ? (
                      <Text color="black">{`To:  ${message.toRecipients.map(
                        (doc) => doc.emailAddress.name,
                      )}`}</Text>
                    ) : (
                      <Text color="black">{`To: (No Recipients)`}</Text>
                    )}
                  </Flex>
                </Flex>
                <Flex
                  maxHeight={500}
                  style={{ margin: '10px', overflowY: 'auto' }}
                >
                  {parse(message.body.content)}
                </Flex>
              </Flex>
            </>
          ) : (
            <Flex
              center
              style={{
                alignContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <SvgEmptyMail />
              {/* <Flex center middle> */}
              <Text style={{ marginTop: '10px' }}>Select an item to read</Text>
              <Text color="gray">Nothing is selected</Text>
              {/* </Flex> */}
            </Flex>
          )}
        </Flex>

        {attachments && (
          <Flex
            row
            width={'100%'}
            className={styles.filesContainer}
            style={{
              borderTop:
                attachments.length !== 0 ? '1px solid #c3c3c3' : 'unset',
            }}
          >
            {attachments.map((val, ind) => (
              <Flex
                flex={1}
                row
                center
                between
                key={ind}
                className={styles.attachfile}
              >
                <Flex marginRight={10} style={{ padding: '10px' }}>
                  <Text size={12} title={val.name} className={styles.fileName}>
                    {val.name}
                  </Text>
                  <Text
                    size={10}
                    title={`${Math.round(val.size / 1024)} KB`}
                    style={{ color: '#666666' }}
                  >
                    {Math.round(val.size / 1024)} KB
                  </Text>
                </Flex>
                <Flex
                  style={{
                    borderLeft: '1px solid #c3c3c3',
                    height: '100%',
                    display: 'flex',
                    padding: '0',
                  }}
                  className={styles.iconsContainer}
                >
                  <Flex
                    style={{
                      cursor: 'pointer',
                      padding: '5px 10px 5px 0px',
                      height: '100%',
                    }}
                    onClick={() => donwnload(val)}
                  >
                    <SvgDownload
                      width={14}
                      height={14}
                      className={styles.svgicon}
                    />
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Inbox;
