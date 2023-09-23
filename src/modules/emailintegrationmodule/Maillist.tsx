import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { Flex, Card, CheckBox, Text, InputText } from '../../uikit';
import SvgRefresh from '../../icons/SvgRefresh';
import { getDateString } from '../../uikit/helper';
import SvgSearchGlass from '../../icons/SvgSearchGlass';
import SvgRight from '../../icons/SvgRight';
import SvgLeft from '../../icons/SvgLeft';
import SvgNoEmail from '../../icons/SvgNoEmails';
import config from '../../outlookmailConfig';
import {
  initGoogleAuth,
  gmail_msg,
  getmessages,
  Gmail_Mails,
  getsearchmail,
  Gmail_search,
  outlooktoken,
} from '../../emailService';
import Loader from '../../uikit/Loader/Loader';
import styles from './maillist.module.css';

type Props = {
  messagelist: any;
  selectmessage: any;
  getmessageid: any;
  sideroute: number;
  mailfolders: any;
  removemsg: any;
  page: any;
  gmailunread: any;
  sidebarroute: any;
  range: any;
  message: any;
  noEmails: boolean;
  integration: string;

  isLoading: any;
  searchapi: boolean;
  isprofileview?: boolean;
  savemail: any;
  searchSection: string;
  search: any;
  emailcollection: any;
  enterKey: boolean;
  refresh: () => void;
  tokens: any;
  can_id: any;
};
const Maillist = ({
  messagelist,
  selectmessage,
  getmessageid,
  sideroute,
  mailfolders,
  removemsg,
  page,
  gmailunread,
  sidebarroute,
  range,
  message,
  isprofileview,
  noEmails,
  integration,
  isLoading,
  searchapi,
  savemail,
  searchSection,
  search,
  emailcollection,
  enterKey,
  refresh,
  tokens,
  can_id,
}: Props) => {
  const msal = useMsal();
  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,

      interactionType: InteractionType.Popup,
    },
  );

  const [messages, setmesage] = useState<any>();
  const [splittoken, setsplittoken] = useState('');
  const [load, setload] = useState(true);
  const [token, settoken] = useState(null);
  const [searchicon, setSearchicon] = useState(false);

  const getmessage = (get, id) => {
    if (message.id !== id) {
      if (integration === 'google') {
        getmessageid(id);
        removemsg();
        setmesage(get);
      } else if (integration === 'outlook') {
        removemsg();
        setmesage(get);
        selectmessage(get);
        getmessageid(id);
      }
    }
  };

  const serch = async () => {
    if (search !== '' && integration === 'outlook') {
      getsearchmail(authProvider, searchSection, search.trim(), range, tokens)
        .then((res) => {
          setSearchicon(res.value.length === 0 ? true : false);
          // setsplittoken(res['@odata.nextLink'].split('skiptoken=')[1]);
          if (!res['@odata.nextLink']) {
            setload(false);
            savemail(res.value, null);
          } else {
            setload(true);
            savemail(res.value, res['@odata.nextLink'].split('skiptoken=')[1]);
          }
        })
        .catch((error) => {
          setload(false);
        });
    } else if (search !== '' && integration === 'google') {
      initGoogleAuth(emailcollection.token)
        .then(() => {
          Gmail_search(searchSection, search.trim(), range, tokens)
            .then((res) => {
              if (res === undefined) {
                setSearchicon(true);
              }
              savemail(res.fullMessages, res.token);
              //settoken(res.token);
              if (res.token === undefined) {
                setload(false);
                savemail([]);
                // settoken(null);
              }
            })
            .catch((error) => {
              savemail([]);
              setload(false);
            });
        })
        .catch((error) => {
          setload(false);
        });
    }
  };

  useEffect(() => {
    if (sidebarroute !== 0) {
      setTimeout(() => {
        process();
      }, 500);
    }
  }, [sidebarroute,integration]);

  useEffect(() => {
    if (enterKey) {
      settoken(null);
      setTimeout(() => {
        process();
      }, 500);
    }
  }, [enterKey]);

  const showfolder = () => {
    if (integration === 'google') {
      if (sideroute === 1) {
        return (
          <Text bold>
            {gmailunread === 0 ? 'Inbox' : `Inbox (${gmailunread})`}
          </Text>
        );
      } else if (sideroute === 2) {
        return (
          <Text bold>
            {gmailunread === 0 ? 'Sent' : `Sent (${gmailunread})`}
          </Text>
        );
      } else if (sideroute === 3) {
        return (
          <Text bold>
            {gmailunread === 0 ? 'Draft' : `Draft (${gmailunread})`}
          </Text>
        );
      } else if (sideroute === 4) {
        return (
          <Text bold>
            {gmailunread === 0 ? 'Spam' : `Spam (${gmailunread})`}
          </Text>
        );
      } else if (sideroute === 5) {
        return (
          <Text bold>
            {gmailunread === 0 ? 'Trash' : `Trash (${gmailunread})`}
          </Text>
        );
      } else if (sideroute === 0) {
        return <Text bold>Search Results</Text>;
      }
    } else if (integration === 'outlook') {
      if (sideroute === 1) {
        return (
          <Text bold>
            {mailfolders === 0 ? 'Inbox' : `Inbox (${mailfolders})`}
          </Text>
        );
      } else if (sideroute === 2) {
        return (
          <Text bold>
            {mailfolders === 0 ? 'Sent Items' : `Sent Items (${mailfolders})`}
          </Text>
        );
      } else if (sideroute === 3) {
        return (
          <Text bold>
            {mailfolders === 0 ? 'Drafts' : `Drafts (${mailfolders})`}
          </Text>
        );
      } else if (sideroute === 4) {
        return (
          <Text bold>
            {mailfolders === 0 ? 'Archive' : `Archive (${mailfolders})`}
          </Text>
        );
      } else if (sideroute === 5) {
        return (
          <Text bold>
            {mailfolders === 0
              ? 'Deleted Items'
              : `Deleted Items (${mailfolders})`}
          </Text>
        );
      } else if (sideroute === 6) {
        return (
          <Text bold>
            {mailfolders === 0 ? 'Junk Email' : `Junk Email (${mailfolders})`}
          </Text>
        );
      } else if (sideroute === 0) {
        return <Text bold>Search Results</Text>;
      }
    }
  };

  const serchreferesh = () => {
    savemail(0, null);
    if (search !== '' && integration === 'outlook') {
      getsearchmail(authProvider, searchSection, search.trim(), range, null)
        .then((res) => {
          setSearchicon(res.value.length === 0 ? true : false);
          // setsplittoken(res['@odata.nextLink'].split('skiptoken=')[1]);
          if (!res['@odata.nextLink']) {
            setload(false);
            savemail(res.value, null);
          } else {
            setload(true);
            savemail(res.value, res['@odata.nextLink'].split('skiptoken=')[1]);
          }
        })
        .catch((error) => {
          setload(false);
          // console.log('errorsearch', error);
        });
    } else if (search !== '' && integration === 'google') {
      initGoogleAuth(emailcollection.token)
        .then(() => {
          Gmail_search(searchSection, search.trim(), range, null)
            .then((res) => {
              savemail(res.fullMessages, res.token);
              //settoken(res.token);
              if (res.token === undefined) {
                setload(false);
                savemail([]);
                // settoken(null);
              }
            })
            .catch((error) => {
              savemail([]);
              setload(false);
            });
        })
        .catch((error) => {
          setload(false);
        });
    }
  };

  const referesh = () => {
    setmesage('');

    if (sidebarroute !== 0) {
      refresh();
    } else {
      refresh();
      serchreferesh();
    }
  };

  const handlemessage = (val) => {
    if (
      sideroute === 3 ||
      sideroute === 5 ||
      sideroute === 0 ||
      sideroute === 4 ||
      sideroute === 6
    ) {
      if (val.isDraft === true) {
        if (val.toRecipients.length !== 0) {
          var del = val.toRecipients.reduce(function (nam, arr) {
            return nam + ' & ' + arr.emailAddress.name;
          }, '');
          // return <>{'Draft' + del.substring(2)}</>;
          return (
            <Flex row>
              <Text style={{ color: '#ED4857', marginRight: '5px' }} size={13}>
                Draft{' '}
              </Text>
              <Text size={13}>{del.substring(2)}</Text>
            </Flex>
          );
        }
        // return <>{'Draft (No Recipients)'}</>;
        return (
          <Flex row>
            <Text style={{ color: '#ED4857', marginRight: '5px' }} size={13}>
              Draft{' '}
            </Text>
            <Text size={13}>{`(No Recipients)`}</Text>
          </Flex>
        );
      }

      if (val.from !== undefined) {
        return <>{val.from.emailAddress.name}</>;
      } else {
        return <>{'(No Recipients)'}</>;
      }
    } else {
      if (sideroute === 2) {
        if (val.toRecipients.length !== 0) {
          var res = val.toRecipients.reduce(function (nam, arr) {
            return nam + ' & ' + arr.emailAddress.name;
          }, '');
          return <>{res.substring(2)}</>;
        } else {
          return <>{'(No Recipients)'}</>;
        }
      }
      return <>{val.from.emailAddress.name}</>;
    }
  };

  const getsubject = (data: any) => {
    if (data.length !== 0) {
      const subject = data.filter((item) => item.name === 'Subject');
      if (subject.length !== 0) {
        if (subject[0].value !== '') {
          return <>{subject[0].value}</>;
        } else {
          return <>{'(No Subject)'}</>;
        }
      } else {
        return <>{'(No Subject)'}</>;
      }
    } else {
      return <>{'(No Subject)'}</>;
    }
  };

  const getfrom = (data: any, val: any) => {
    if (data.length !== 0) {
      if (sideroute === 1 || sideroute === 4) {
        const from = data.filter((item) => item.name === 'From');
        if (from.length !== 0) {
          let From = from[0].value.replace(/\s\S*$/, '');
          return <>{From}</>;
        } else {
          return <>{'(No Recipients)'}</>;
        }
      }

      if (sideroute === 3) {
        const To = data.filter((item) => item.name === 'To');
        if (To.length !== 0) {
          const ToEmails = data
            .filter((header) => header.name === 'To')
            .map((header, int) => header.value);
          return (
            <Flex row>
              <Text style={{ color: '#ED4857', marginRight: '5px' }} size={13}>
                Draft{' '}
              </Text>
              <Text size={13}>{ToEmails[0]}</Text>
            </Flex>
          );
        } else {
          return (
            <Flex row>
              <Text style={{ color: '#ED4857', marginRight: '5px' }} size={13}>
                Draft{' '}
              </Text>
              <Text size={13}>{`(No Recipients)`}</Text>
            </Flex>
          );
        }
      }

      if (sideroute === 5 || sideroute === 0) {
        var get = val.labelIds.includes('DRAFT');

        if (get === true) {
          const from = data.filter((item) => item.name === 'From');
          if (from.length !== 0) {
            let From = from[0].value.replace(/\s\S*$/, '');
            return (
              <>
                <Flex row>
                  <Text
                    size={13}
                    style={{ color: '#ED4857', marginRight: '5px' }}
                  >
                    Draft{' '}
                  </Text>
                  <Text size={13}>{From}</Text>
                </Flex>
              </>
            );
          } else {
            return <>{'(No Recipients)'}</>;
          }
        } else {
          const ToEmails = data
            .filter((header) => header.name === 'From')
            .map((header) => header.value);

          return <>{ToEmails[0]}</>;
        }
      }

      if (sideroute === 2) {
        const ToEmails = data
          .filter((header) => header.name === 'To')
          .map((header) => header.value);

        return <>{ToEmails[0]}</>;
      } else {
        return <>{'(No Recipients)'}</>;
      }
    }
  };

  const notification = (val) => {
    const labelIds = val.labelIds || [];
    const isRead = !labelIds.includes('UNREAD');
    if (isRead === false) {
      return (
        <>
          <Flex className={styles.notification_dot}></Flex>
        </>
      );
    } else {
      return <> </>;
    }
  };

  const date = (data) => {
    const from = data.filter((item) => item.name === 'Date');
    if (from.length !== 0) {
      return <>{getDateString(from[0].value, 'DD/MM/YY')}</>;
    }
  };

  const process = () => {
    if (searchapi === true) {
      serch();
    } else {
      page();
    }
  };

  const scroll = () => {
    if (searchapi === true) {
      return load;
    } else {
      return tokens !== null ? true : false;
    }
  };

  return (
    <Flex
      style={{ margintop: '1px' }}
      className={styles.maillist}
      height={
        isprofileview ? window.innerHeight - 95 : window.innerHeight - 106
      }
    >
      <Flex
        row
        between
        style={{
          borderBottom: '1px solid #c3c3c3',
          height: '35px',
        }}
      >
        <Flex style={{ padding: '8px' }}>{showfolder()}</Flex>

        <Flex row center>
          {sidebarroute !== 0 && <></>}
          <Flex title="Refresh" style={{ padding: '6px' }}>
            <SvgRefresh width={18} height={18} onClick={referesh} />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        style={{ overflowY: 'auto', overflowX: 'hidden' }}
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={messagelist.length}
          next={process}
          // hasMore={integration === 'google' ? pagetoken !== undefined : isLoading}
          // hasMore={messagelist.length % range === 0 && !isLoading}
          hasMore={scroll()}
          loader={''}
          scrollableTarget="scrollableDiv"
        >
          {messagelist.length !== 0 ? (
            <>
              {messagelist.map((val, int) => (
                <>
                  {integration === 'google' ? (
                    <Card
                      key={int}
                      className={
                        message === ''
                          ? styles.cardStyles
                          : message.id === val.id
                          ? styles.seletmsg
                          : styles.cardStyles
                      }
                      onClick={() => getmessage(val, val.id)}
                    >
                      <Flex row start className={styles.mailCard}>
                        {notification(val)}

                        <Flex
                          style={{
                            marginLeft:
                              val &&
                              typeof val === 'string' &&
                              val.includes('UNREAD')
                                ? '10px'
                                : '10px',
                            width: '92%',
                            display: 'flex',
                          }}
                        >
                          <Flex
                            row
                            between
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              maxWidth: '300px',
                            }}
                          >
                            <Text
                              className={styles.textHeadingStyle}
                              style={{ maxWidth: '70%' }}
                              bold
                              size={13}
                            >
                              {getfrom(val.payload.headers, val)}
                            </Text>
                            <Text size={13}>{date(val.payload.headers)}</Text>
                          </Flex>

                          <Text size={13} className={styles.textHeadingStyle}>
                            {getsubject(val.payload.headers)}
                          </Text>
                          <Flex>
                            <Text className={styles.textStyle} size={13}>
                              {val.snippet !== ''
                                ? val.snippet
                                : 'This message has no content'}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Card>
                  ) : (
                    <>
                      <Card
                        key={int}
                        className={
                          message === undefined
                            ? styles.cardStyles
                            : message.id === val.id
                            ? styles.seletmsg
                            : styles.cardStyles
                        }
                        onClick={() => getmessage(val, val.id)}
                      >
                        <Flex row start className={styles.mailCard}>
                          {val.isRead !== true ? (
                            <Flex className={styles.notification_dot}></Flex>
                          ) : (
                            ''
                          )}

                          <Flex
                            style={{
                              marginLeft: val.isRead ? '20px' : '10px',

                              width: '92%',
                              display: 'flex',
                            }}
                          >
                            <Flex
                              row
                              between
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                maxWidth: '300px',
                              }}
                            >
                              <Text
                                className={styles.textHeadingStyle}
                                style={{ maxWidth: '70%' }}
                                size={13}
                                bold
                              >
                                {handlemessage(val)}
                              </Text>
                              <Text size={13}>
                                {getDateString(val.sentDateTime, 'DD/MM/YY')}
                              </Text>
                            </Flex>

                            <Text size={13} className={styles.textHeadingStyle}>
                              {val.subject !== ''
                                ? val.subject
                                : '(no subject)'}
                            </Text>

                            <Flex>
                              <Text className={styles.textStyle} size={13}>
                                {val.bodyPreview !== ''
                                  ? val.bodyPreview
                                  : 'This message has no content'}
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Card>
                    </>
                  )}
                </>
              ))}
            </>
          ) : (
            <>
              {sideroute === 0 ? (
                <>
                  {searchicon === true ? (
                    <Flex className={styles.noEmail}>
                      <Flex style={{ justifyContent: 'center' }}>
                        <SvgSearchGlass width={65} height={65} />
                      </Flex>
                      <Text style={{ marginTop: '10px' }}>
                        We didn`t find anthing.
                      </Text>
                      <Text color="gray">Try a different keyword.</Text>
                    </Flex>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                <>
                  {noEmails && (
                    <Flex center middle className={styles.noEmail}>
                      <Flex center middle marginBottom={-40} marginLeft={11}>
                        <SvgNoEmail />
                      </Flex>
                      <Text style={{ color: '#979797' }}>
                        No emails to view.
                      </Text>
                    </Flex>
                  )}
                </>
              )}
            </>
          )}
        </InfiniteScroll>
      </Flex>
    </Flex>
  );
};

export default Maillist;
