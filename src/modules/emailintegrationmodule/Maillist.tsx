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
  previousfun: () => void;
  nextfun: () => void;
  range: any;
  previous: any;
  previous1: any;
  total: any;
  msglistcount: any;

  message: any;
  noEmails: boolean;
  integration: string;
  pagetoken: any;
  hasMore: any;
  isLoading: any;
  searchapi: boolean;
  serchmessage: any;
  savemail: any;
  searchSection: string;
  search: any;
  emailcollection: any;
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
  previousfun,
  nextfun,
  range,
  previous,
  previous1,
  total,
  msglistcount,

  message,
  noEmails,
  integration,
  pagetoken,
  hasMore,
  isLoading,
  searchapi,
  serchmessage,
  savemail,
  searchSection,
  search,
  emailcollection,
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
      await getsearchmail(
        authProvider,
        searchSection,
        search.trim(),
        range,
        splittoken,
      )
        .then((res) => {
          savemail(res.value);
          console.log('dvfd', res.value);
          setSearchicon(res.value.length === 0 ? true : false);
          setsplittoken(res['@odata.nextLink'].split('skiptoken=')[1]);
          if (!res['@odata.nextLink']) {
            setload(false);
          }
        })
        .catch((error) => {
          setload(false);
          // console.log('get junk mail', error);
        });
    } else if (search !== '' && integration === 'google') {
      initGoogleAuth(emailcollection.token)
        .then(() => {
          Gmail_search(searchSection, search.trim(), range, token)
            .then((res) => {
              console.log('ress', res);
              savemail(res.fullMessages);
              settoken(res.token);
              if (res.token === undefined) {
                console.log('ad');
                setload(false);
                savemail([]);
                // settoken(null);
              }
            })
            .catch((error) => {
              console.log('cvvccv');
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
    setTimeout(() => {
      process();
    }, 500);
  }, [sidebarroute, searchapi, integration]);

  const showfolder = () => {
    if (integration === 'google') {
      if (sideroute === 1) {
        return <Text bold>{`Inbox (${gmailunread})`}</Text>;
      } else if (sideroute === 2) {
        return <Text bold>{`Sent (${gmailunread})`}</Text>;
      } else if (sideroute === 3) {
        return <Text bold>{`Draft (${gmailunread})`}</Text>;
      } else if (sideroute === 4) {
        return <Text bold>{`Spam (${gmailunread})`}</Text>;
      } else if (sideroute === 5) {
        return <Text bold>{`Trash (${gmailunread})`}</Text>;
      }
    } else if (integration === 'outlook') {
      if (mailfolders.length !== 0) {
        if (sideroute === 1) {
          return (
            <Text bold>
              {mailfolders[4].unreadItemCount !== 0
                ? `Inbox (${mailfolders[4].unreadItemCount})`
                : 'Inbox'}
            </Text>
          );
        } else if (sideroute === 2) {
          return (
            <Text bold>
              {mailfolders[7].unreadItemCount !== 0
                ? `Sent Items (${mailfolders[7].unreadItemCount})`
                : 'Sent Items'}
            </Text>
          );
        } else if (sideroute === 3) {
          return (
            <Text bold>
              {mailfolders[3].unreadItemCount !== 0
                ? `Drafts (${mailfolders[3].unreadItemCount})`
                : 'Drafts'}
            </Text>
          );
        } else if (sideroute === 4) {
          return (
            <Text bold>
              {mailfolders[0].unreadItemCount !== 0
                ? `Archive (${mailfolders[0].unreadItemCount})`
                : 'Archive'}
            </Text>
          );
        } else if (sideroute === 5) {
          return (
            <Text bold>
              {mailfolders[2].unreadItemCount !== 0
                ? ` Deleted Items (${mailfolders[2].unreadItemCount})`
                : ' Deleted Items'}
            </Text>
          );
        } else if (sideroute === 6) {
          return (
            <Text bold>
              {mailfolders[5].unreadItemCount !== 0
                ? ` Junk Email (${mailfolders[5].unreadItemCount})`
                : ' Junk Email'}
            </Text>
          );
        } else if (sideroute === 0) {
          return <Text bold>Search Results</Text>;
        }
      }
    }
  };

  const referesh = () => {
    process();
  };

  const handlemessage = (val) => {
    if (sideroute === 3 || sideroute === 5 || sideroute === 0) {
      if (val.isDraft === true) {
        if (val.toRecipients.length !== 0) {
          var del = val.toRecipients.reduce(function (nam, arr) {
            return nam + ' & ' + arr.emailAddress.name;
          }, '');
          // return <>{'Draft' + del.substring(2)}</>;
          return (
            <Flex row>
              <Text style={{ color: '#ED4857', marginRight: '5px' }}>
                Draft{' '}
              </Text>
              <Text>{del.substring(2)}</Text>
            </Flex>
          );
        }
        // return <>{'Draft (No Recipients)'}</>;
        return (
          <Flex row>
            <Text style={{ color: '#ED4857', marginRight: '5px' }}>Draft </Text>
            <Text>{`(No Recipients)`}</Text>
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
        return <>{subject[0].value}</>;
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
              <Text style={{ color: '#ED4857', marginRight: '5px' }}>
                Draft{' '}
              </Text>
              <Text>{ToEmails[0]}</Text>
            </Flex>
          );
        } else {
          return (
            <Flex row>
              <Text style={{ color: '#ED4857', marginRight: '5px' }}>
                Draft{' '}
              </Text>
              <Text>{`(No Recipients)`}</Text>
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
                  <Text style={{ color: '#ED4857', marginRight: '5px' }}>
                    Draft{' '}
                  </Text>
                  <Text>{From}</Text>
                </Flex>
              </>
            );
          } else {
            return <>{'(No Recipients)'}</>;
          }
        } else {
          const ToEmails = data
            .filter((header) => header.name === 'To')
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
      return messagelist.length % range === 0 && !isLoading;
    }
  };

  return (
    <Flex style={{ margintop: '1px' }} className={styles.maillist}>
      <Flex
        row
        between
        style={{
          borderBottom: '1px solid #c3c3c3',
        }}
      >
        <Flex style={{ padding: '6px' }}>{showfolder()}</Flex>

        <Flex row center>
          {sidebarroute !== 0 && <></>}
          <Flex title="Refresh" style={{ padding: '6px' }}>
            <SvgRefresh width={18} height={18} onClick={referesh} />
          </Flex>
        </Flex>
      </Flex>
      <Flex style={{ overflowY: 'auto' }} id="scrollableDiv">
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
                        messages === undefined
                          ? styles.cardStyles
                          : messages.id === val.id
                          ? styles.seletmsg
                          : styles.cardStyles
                      }
                      onClick={() => getmessage(val, val.id)}
                    >
                      <Flex row start className={styles.mailCard}>
                        {notification(val)}

                        <Flex
                          style={{
                            marginLeft: val.isRead ? '20px' : '10px',
                            width: 'calc(100% - 20px)',
                            display: 'flex',
                          }}
                        >
                          <Flex
                            column
                            start
                            between
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <Flex row between>
                              <Text className={styles.textHeadingStyle}>
                                {getfrom(val.payload.headers, val)}
                              </Text>
                              <Text size={12}>{date(val.payload.headers)}</Text>
                            </Flex>

                            <Text size={14} className={styles.textHeadingStyle}>
                              {getsubject(val.payload.headers)}
                            </Text>
                          </Flex>
                          <Flex>
                            <Text className={styles.textStyle} size={12}>
                              {val.snippet}
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
                          messages === undefined
                            ? styles.cardStyles
                            : messages.id === val.id
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
                              >
                                {handlemessage(val)}
                              </Text>
                              <Text size={12}>
                                {getDateString(val.sentDateTime, 'DD/MM/YY')}
                              </Text>
                            </Flex>

                            <Text size={14} className={styles.textHeadingStyle}>
                              {val.subject !== ''
                                ? val.subject
                                : '(no subject)'}
                            </Text>

                            <Flex>
                              <Text className={styles.textStyle} size={12}>
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
                    <Flex className={styles.noEmail}>
                      <SvgNoEmail />
                      <Text>No emails yet.</Text>
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
