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
  getmail,
  move_to_spam,
  gmail_permanent_Delete,
  outlooktoken,
} from '../../emailService';
import config from '../../outlookmailConfig';
import { Flex, Card, Text } from '../../uikit';
import SvgArchive from '../../icons/SvgArchive';
import { SvgEdit, SvgTrash } from '../../icons';
import SvgSpam from '../../icons/SvgSpam';
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
  isprofileview?: boolean;
  page: () => void;
  attachments: any;
  msglistcount: any;
  integration: string;
  emailcollection: any;
  updateMailaction: (val: any) => void;
  remove_message: (id: any) => void;
  update_message: (id: any, val: boolean) => void;
  noEmails?: any;
};
const Inbox = ({
  message,
  sidebarroute,
  composemodal,
  removemsg,
  isprofileview,
  page,
  attachments,
  remove_message,
  msglistcount,
  emailcollection,
  integration,
  updateMailaction,
  update_message,
  noEmails,
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
  }, [message, integration]);

  const readmessages = async () => {
    const labelIds = message.labelIds || [];
    const isRead = !labelIds.includes('UNREAD');
    if (isRead === false && message !== '') {
      await Gmail_read_messages(message.id)
        .then((res) => {
          update_message(message.id, false);
        })
        .catch((error) => {});
    }
  };

  const updatereadmessage = async () => {
    if (message.isRead !== true && message !== '') {
      var readmessage = {
        IsRead: true,
      };
      outlooktoken(emailcollection.token).then(async () => {
        await mailread(message.id, readmessage)
          .then((res) => {
            update_message(message.id, true);
            //page();
          })
          .catch((error) => {});
      });
    }
  };

  const googleremove = async () => {
    if (sidebarroute === 5) {
      await gmail_permanent_Delete(message.id)
        .then((res) => {
          //console.log('cv', res);
          removemsg();
          Toast('Email removed permanently', 'SHORT', 'success');
          remove_message(message.id);
        })
        .catch((error) => {});
    } else {
      await Gmail_MessageToBin(message.id)
        .then((res) => {
          removemsg();
          Toast('Moved to bin folder email successfully', 'SHORT', 'success');
          remove_message(message.id);
        })
        .catch((error) => {});
    }
  };

  const remove = async () => {
    if (message !== '') {
      if (sidebarroute === 5) {
        await deletemail(authProvider, message.id)
          .then((res) => {
            removemsg();
            page();
            Toast('Email removed permanently', 'SHORT', 'success');
            remove_message(message.id);
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
            Toast('Email deleted successfully', 'SHORT', 'success');
            remove_message(message.id);
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
          // page();
          Toast('Email archived successfully', 'SHORT', 'success');
          remove_message(message.id);
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
          // page();
          Toast('Email moved to junk successfully', 'SHORT', 'success');
          remove_message(message.id);
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
      await mailread(message.id, readmessage)
        .then((res) => {
          removemsg();
          // page();
          //  console.log('read------++---', res);
          update_message(message.id, false);
        })
        .catch((error) => {
          // console.log('connection failed inboxxxxxxx', error);
        });
    }
  };

  const donwnload = async (val) => {
    if (integration === 'google') {
      const data = val.contentBytes;
      const decodedData = Buffer.from(data, 'base64');
      const blob = new Blob([decodedData], { type: val.contentType });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = val.name;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      var a = document.createElement('a');
      a.href = `data:${val.contentType};base64,${val.contentBytes}`;
      a.download = val.name;
      a.click();
    }
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
      if (sub[0].value !== '') {
        return <>{sub[0].value}</>;
      } else {
        return <>{'(No Subject)'}</>;
      }
    } else {
      return <>{'(No Subject)'}</>;
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
        removemsg();
        update_message(message.id, true);
      })
      .catch((error) => {});
  };

  const movespam = async (val: any) => {
    var Gfolder = '';
    if (sidebarroute === 1) {
      Gfolder = 'INBOX';
    } else if (sidebarroute === 2) {
      Gfolder = 'SENT';
    } else if (sidebarroute === 3) {
      Gfolder = 'DRAFT';
    } else if (sidebarroute === 4) {
      Gfolder = 'SPAM';
    } else if (sidebarroute === 5) {
      Gfolder = 'TRASH';
    }
    await move_to_spam(message.id, Gfolder)
      .then((res) => {
        removemsg();
        Toast('Moved to spam folder successfully', 'SHORT', 'success');
        remove_message(message.id);
      })
      .catch((error) => {});
  };

  const messageIcon = message !== '';

  const topActionBar = () => {
    if (!noEmails) {
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
                  title="Bin"
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
              {sidebarroute !== 4 && (
                <>
                  {integration === 'google' ? (
                    <Flex
                      title="Spam"
                      className={
                        messageIcon ? styles.icons : styles.iconsDisabled
                      }
                      onClick={messageIcon ? movespam : undefined}
                    >
                      <SvgSpam
                        width={18}
                        height={18}
                        ß
                        fill={messageIcon ? '#581845' : '#58184550'}
                      />
                    </Flex>
                  ) : (
                    ''
                  )}
                </>
              )}

              {sidebarroute !== 6 && (
                <>
                  {integration !== 'google' ? (
                    <Flex
                      title="Move to Junk"
                      className={
                        messageIcon ? styles.icons : styles.iconsDisabled
                      }
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
                </>
              )}
            </Flex>
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
            {/* <Flex
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
          </Flex> */}
          </Flex>
        </>
      );
    }
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

  const drafticon = (val) => {
    var get = val.labelIds.includes('DRAFT');

    if (get === true) {
      return (
        <>
          <Flex
            title="Edit Message"
            className={styles.iconsDisabled}
            style={{ cursor: 'pointer' }}
            onClick={() => mail('draft')}
          >
            <SvgEdit width={16} height={16} />
          </Flex>
        </>
      );
    } else {
      return (
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
      );
    }
  };

  const handlefunction = (val) => {
    const hasDraftLabel = val.includes('DRAFT');
    if (hasDraftLabel) {
      return (
        <Text bold size={13} style={{ color: '#ED4857' }}>
          {'Draft'}
        </Text>
      );
    }
  };

  const ccshow = (val) => {
    const from = val.filter((item) => item.name === 'Cc');
    console.log('======', from);
    if (from.length !== 0) {
      let From = from[0].value.replace(/\s\S*$/, '');
      if (from[0].value !== '') {
        return <>{`Cc: ${from[0].value}`}</>;
      }
    }
  };

  const renderBody = () => {
    if (message !== '') {
      return (
        <>
          {console.log('message', message)}
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
                    {handlefunction(message.labelIds)}

                    <Flex row between width={'100%'}>
                      <Text bold size={13}>
                        {sender(message.header, '0')}
                      </Text>

                      <Flex row marginRight={10}>
                        {drafticon(message)}
                        <Flex>
                          <Flex
                            title="Mark as unread"
                            className={styles.icons}
                            onClick={() => gmailunread(message)}
                          >
                            <SvgRead width={16} height={16} />
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Text size={13}>{subject(message.header)}</Text>
                    <Text color="black"> {to(message.header, '0')}</Text>
                    {ccshow(message.header)}
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
                        <>
                          <Text bold size={13}>
                            {message.sender.emailAddress.name}
                          </Text>
                        </>
                      ) : (
                        <Flex>
                          <Text bold size={13} style={{ color: '#ED4857' }}>
                            {'Draft'}
                          </Text>
                          <Text bold size={13}>
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
                              title="Reply All"
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
                          <Flex
                            title="Edit Message"
                            className={styles.iconsDisabled}
                            style={{ cursor: 'pointer' }}
                            onClick={() => mail('draft')}
                          >
                            <SvgEdit width={16} height={16} />
                          </Flex>
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

                    <Text size={13}>
                      {message.subject !== ''
                        ? message.subject
                        : '(No Subject)'}
                    </Text>
                    {message.toRecipients.length !== 0 ? (
                      <>
                        <Text color="black">{`To:  ${message.toRecipients.map(
                          (doc) => doc.emailAddress.name,
                        )}`}</Text>
                        {message.ccRecipients.length !== 0 && (
                          <Text size={13}>{`Cc:${message.ccRecipients.map(
                            (doc) => doc.emailAddress.name,
                          )}`}</Text>
                        )}
                      </>
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
                    fontsize: '13px',
                    width: '-webkit-fill-available',
                    maxHeight: '-webkit-fill-available',
                  }}
                >
                  <td
                    className={styles.bulletpoint}
                    dangerouslySetInnerHTML={{
                      __html: message.body.content,
                    }}
                  />
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
          // height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        height={
          isprofileview ? window.innerHeight - 190 : window.innerHeight - 170
        }
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
          <Flex
            className={
              isprofileview ? styles.bodyContainers : styles.bodyContainer
            }
            height={isprofileview ? window.innerHeight - 130 : ''}
          >
            {renderBody()}
          </Flex>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Inbox;
