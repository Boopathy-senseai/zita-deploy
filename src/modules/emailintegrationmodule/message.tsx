import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import Toast from '../../uikit/Toast/Toast';
import {
  deletemail,
  movefolder,
  mailread,
  Gmail_unread_messages,
  Gmail_read_messages,
  Gmail_MessageToBin,
} from '../../emailService';
import config from '../../outlookmailConfig';
import { Flex, Card, Text } from '../../uikit';
import SvgArchive from '../../icons/SvgArchive';
import { SvgEdit, SvgTrash } from '../../icons';
import SvgJunk from '../../icons/SvgJunk';
import SvgReply from '../../icons/SvgReply';
import SvgReplyall from '../../icons/SvgReplyall';
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
  // previousfun: () => void;
  // nextfun: () => void;
  // range: any;
  // previous: any;
  // previous1: any;
  // total: any;
  msglistcount: any;
  integration: string;
  updateMailaction: (val: any) => void;
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
  // previousfun,
  // nextfun,
  // range,
  // previous,
  // previous1,
  // total,
  msglistcount,
  integration,
  updateMailaction,
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

  const mail = (val) => {
    updateMailaction(val);
    composemodal();
  };

  useEffect(() => {
    if (integration === 'google') {
      readmessages();
    } else if (integration === 'outlook') {
      updatereadmessage();
    }
  }, [message]);

  const readmessages = async () => {
    const labelIds = message.labelIds || [];
    const isRead = !labelIds.includes('UNREAD');
    if (isRead === false && message !== '') {
      alert('n');
      await Gmail_read_messages(message.id)
        .then((res) => {
          Toast('read successfully', 'SHORT', 'success');
        })
        .catch((error) => {});
    }
  };

  const updatereadmessage = async () => {
    if (message.isRead !== true && message !== '') {
      var readmessage = {
        IsRead: true,
      };
      await mailread(authProvider, message.id, readmessage)
        .then((res) => {
          //page();
        })
        .catch((error) => {});
    }
  };

  const googleremove = async () => {
    alert('google');
    await Gmail_MessageToBin(message.id)
      .then((res) => {
        Toast('move trach successfully', 'SHORT', 'success');
      })
      .catch((error) => {});
  };

  const remove = async () => {
    if (message !== '') {
      if (sidebarroute === 5) {
        await deletemail(authProvider, message.id)
          .then((res) => {
            removemsg();
            page();
            Toast('Email removed permanently', 'SHORT', 'success');

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

  // const Previousdata = () => {
  //   previousfun();
  // };

  // const Nextdata = () => {
  //   nextfun();
  // };

  const sender = (data, val) => {
    const from = data.filter((item) => item.name === 'From');
    if (from.length !== 0) {
      let From = from[0].value.replace(/\s\S*$/, '');
      return <>{From}</>;
    } else {
      return <>{'(No Recipients)'}</>;
    }
  };

  const subject = (data) => {
    const sub = data.filter((item) => item.name === 'Subject');
    if (sub.length !== 0) {
      let subj = sub[0].value.replace(/\s\S*$/, '');
      return <>{subj}</>;
    } else {
      return <>{'(No Recipients)'}</>;
    }
  };

  const to = (data, val) => {
    const from = data.filter((item) => item.name === 'To');
    if (from.length !== 0) {
      let From = from[0].value.replace(/\s\S*$/, '');
      return <>{`To: ${from[0].value}`}</>;
    } else {
      return <>{`To: (No Recipients)`}</>;
    }
  };

  const gmailunread = async (val: any) => {
    await Gmail_unread_messages(val.id)
      .then((res) => {
        Toast('unread successfully', 'SHORT', 'success');
      })
      .catch((error) => {});
  };

  const messageIcon = message !== '';

  const topActionBar = () => {
    if (sidebarroute !== 3) {
      return (
        <>
          <Flex row>
            {sidebarroute !== 4 && (
              // <Text onClick={archive}> Archive </Text>
              <Flex
                title="Archive"
                className={messageIcon ? styles.icons : styles.iconsDisabled}
              >
                {integration === 'outlook' ? (
                  <SvgArchive
                    width={16}
                    height={16}
                    fill={messageIcon ? '#581845' : '#58184550'}
                    onClick={messageIcon ? archive : undefined}
                  />
                ) : (
                  ''
                )}
              </Flex>
            )}

            {integration === 'google' ? (
              <Flex
                title="Delete"
                className={messageIcon ? styles.icons : styles.iconsDisabled}
                // onClick={messageIcon ? remove : undefined}
              >
                <SvgTrash
                  width={16}
                  height={16}
                  fill={messageIcon ? '#581845' : '#58184550'}
                  onClick={messageIcon ? googleremove : undefined}
                  cursor={messageIcon ? 'pointer' : 'auto'}
                />
              </Flex>
            ) : (
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
            )}

            {sidebarroute !== 6 && (
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
            )}
          </Flex>

          {/* {sidebarroute !== 0 && (
            <>
              <Flex row>
                <Text color="theme">{`${previous1}-${previous} of ${total}`}</Text>
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
          )} */}
        </>
      );
    }

    return (
      <>
        <Flex row width={'100%'} height={'100%'}>
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
    );
  };

  const renderAttachments = attachments && (
    <Flex
      row
      width={'100%'}
      className={styles.filesContainer}
      style={{
        borderTop: attachments.length !== 0 ? '1px solid #c3c3c3' : 'unset',
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
              <SvgDownload width={14} height={14} className={styles.svgicon} />
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );

  const renderBody = () => {
    if (message !== '') {
      return (
        <>
          {integration === 'google' ? (
            <>
              <Flex
                column
                style={{
                  position: 'relative',
                  border: '1px solid #c3c3c3',
                  borderRadius: '5px 5px 0px 0px',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: 'fit-content',
                  maxHeight: '-webkit-fill-available',
                }}
              >
                <Flex
                  row
                  between
                  style={{
                    position: 'relative',
                    borderBottom: '1px solid #c3c3c3',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <Flex
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '5px 10px',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <Flex row between width={'100%'}>
                      <Text bold size={14}>
                        {sender(message.header, '0')}
                      </Text>

                      <Flex row marginRight={10}>
                        <Flex
                          title="Reply"
                          className={styles.icons}
                          onClick={() => mail('reply')}
                        >
                          <SvgReply width={16} height={16} />
                        </Flex>
                        <Flex
                          title="ReplyAll"
                          className={styles.icons}
                          onClick={() => mail('replyall')}
                        >
                          <SvgReplyall width={16} height={16} />
                        </Flex>
                        <Flex
                          title="Forward"
                          className={styles.icons}
                          onClick={() => mail('forward')}
                        >
                          <SvgForward width={16} height={16} />
                        </Flex>
                        <Flex
                          title="Mark as unread"
                          className={styles.icons}
                          onClick={() => gmailunread(message)}
                        >
                          <SvgRead width={16} height={16} />
                        </Flex>
                      </Flex>
                    </Flex>

                    <Text size={14}>{subject(message.header)}</Text>
                    <Text color="black"> {to(message.header, '0')}</Text>
                  </Flex>
                </Flex>

                <Flex
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    margin: '10px',
                    overflowY: 'auto',
                    width: '-webkit-fill-available',
                    maxHeight: '-webkit-fill-available',
                  }}
                >
                  {parse(message.body)}
                </Flex>
                {renderAttachments}
              </Flex>
            </>
          ) : (
            <>
              <Flex
                column
                style={{
                  position: 'relative',
                  border: '1px solid #c3c3c3',
                  borderRadius: '5px 5px 0px 0px',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: 'fit-content',
                  maxHeight: '-webkit-fill-available',
                }}
              >
                <Flex
                  row
                  between
                  style={{
                    position: 'relative',
                    borderBottom: '1px solid #c3c3c3',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <Flex
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '5px 10px',
                      width: '100%',
                      height: '100%',
                    }}
                  >
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
                        {message.isDraft !== true ? (
                          <>
                            <Flex
                              title="Reply"
                              className={styles.icons}
                              onClick={() => mail('reply')}
                            >
                              <SvgReply width={16} height={16} />
                            </Flex>
                            <Flex
                              title="ReplyAll"
                              className={styles.icons}
                              onClick={() => mail('replyall')}
                            >
                              <SvgReplyall width={16} height={16} />
                            </Flex>
                            <Flex
                              title="Forward"
                              className={styles.icons}
                              onClick={() => mail('forward')}
                            >
                              <SvgForward width={16} height={16} />
                            </Flex>
                          </>
                        ) : (
                          ''
                        )}

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
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    margin: '10px',
                    overflowY: 'auto',
                    width: '-webkit-fill-available',
                    maxHeight: '-webkit-fill-available',
                  }}
                >
                  {parse(message.body.content)}
                </Flex>
                {renderAttachments}
              </Flex>
            </>
          )}
        </>
      );
    }

    return (
      <Flex
        center
        style={{
          alignContent: 'center',
          alignItems: 'center',
          height: '100%',
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
    );
  };

  return (
    <div className={styles.messageContainer}>
      <Flex row between center className={styles.iconContainer}>
        {topActionBar()}
      </Flex>
      {msglistcount !== 0 ? (
        <>
          <Flex className={styles.bodyContainer}>{renderBody()}</Flex>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Inbox;
