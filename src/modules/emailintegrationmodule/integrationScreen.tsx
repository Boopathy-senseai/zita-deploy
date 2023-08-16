import React, { useState, useEffect } from 'react';

import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { gapi } from 'gapi-script';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Base64 } from 'js-base64';
import { AppDispatch, RootState } from '../../store';
import Loader from '../../uikit/Loader/Loader';
import {
  getEmail,
  outlookUserProfile,
} from '../emailintegrationmodule/store/middleware/emailIntegrationMiddleWare';
import { Flex, InputText, LinkWrapper, Button, Text } from '../../uikit';
import SvgSearch from '../../icons/SvgSearch';

import {
  getUser,
  getmail,
  getdraft,
  getsenditem,
  getarchivemsg,
  getdeleteditems,
  getjunkemail,
  getsearchmail,
  getmessages,
  getusermail,
  getselectedmsg,
  getattachments,
  getmailfolders,
  gmail_Account_Profile,
  Gmail_Mails,
  initGoogleAuth,
  Selected_message,
  Gmail_search,
  Gmail_Attachment,
  Gmail_Folder_Total_count,
  Gmail_profile,
} from '../../emailService';
import config from '../../outlookmailConfig';
import SvgArrowDown from '../../icons/SvgArrowDown';
import Sidebar from './sidebar';
import Newcompose from './composemodal';
import styles from './integration.module.css';
import Message from './message';
import Maillist from './Maillist';

const EmailScreen = () => {
  const msal = useMsal();
  const dispatch: AppDispatch = useDispatch();

  const [model, setmodel] = useState(false);
  const [int, setint] = useState(localStorage.getItem('integrate'));
  const [integration, setintegration] = useState(
    localStorage.getItem('integrate'),
  );
  const [messagelist, setmessagelist] = useState([]);
  const [message, setmesage] = useState<any>('');
  const [usermail, setUsermail] = useState('');
  const [sideroute, setsideroute] = useState(1);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [mailfolders, setMailfolders] = useState('');
  const [gmailunread, setgmailunread] = useState(0);
  const [nextpagetoken, setnextpagetoken] = useState(null);
  const [noEmails, setNoEmails] = useState(false);
  const [previous, setPrevious] = useState(25);
  const [previous1, setPrevious1] = useState(1);
  const [skip, setSkip] = useState(0);
  const [range, setRange] = useState(10);
  const [total, setTotal] = useState<any>(0);
  const [del, setDel] = useState(0);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchSection, setSearchSection] = useState('All');
  const [searchFolder, setSearchFolder] = useState('All Folder');
  const [searchDropdownMenu, setsearchDropdownMenu] = useState([]);

  const [Mailaction, setMailaction] = useState('compose');
  const [hasMore, setHasMore] = useState(true);

  const [searchapi, setsearchapi] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [splittoken, setsplittoken] = useState('');

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,

      interactionType: InteractionType.Popup,
    },
  );

  const updateMailaction = (val) => {
    setMailaction(val);
  };

  const modelupdate = () => {
    setmodel(!model);
  };

  const Send = async () => {
    await getsenditem(authProvider)
      .then((res) => {
        setmessagelist(res.value);
        removemessage();
        setLoader(false);
      })
      .catch((error) => {});
  };

  const Draft = async () => {
    setLoader(true);

    await getdraft(authProvider)
      .then((res) => {
        setmessagelist(res.value);
        removemessage();
        setLoader(false);
      })
      .catch((error) => {});
  };

  const getprofile = async () => {
    if (integration === 'google') {
    } else if (integration === 'outlook') {
      await getUser(authProvider)
        .then((res: any) => {
          setUsermail(res.mail);
        })
        .catch((error) => {});
    }
  };
  const getmails = async () => {
    setLoader(true);
    await getmail(authProvider, previous, range)
      .then((res: any) => {
        removemessage();
        setmessagelist(res.value);
        setTotal(res['@odata.count']);
        setLoader(false);
      })
      .catch((error) => {});
  };

  const selectmessage = (msg) => {
    setmesage(msg);
  };

  const removemessage = () => {
    setmesage('');
    setAttachments([]);
  };

  const Select = (val, folder) => {
    setSearchSection(val);
    setSearchFolder(folder);
  };

  useEffect(() => {
    if (integration === 'google') {
      setsearchDropdownMenu(gmail);
    } else {
      setsearchDropdownMenu(outlook);
    }
  }, [integration]);

  const outlook = [
    {
      name: 'All folder',
      onclick: () => Select('All', 'All Folder'),
    },
    {
      name: 'Inbox',
      onclick: () => Select('Inbox', 'Inbox'),
    },
    {
      name: 'Sent',
      onclick: () => Select('sentitems', 'Sent Items'),
    },
    {
      name: 'Draft',
      onclick: () => Select('drafts', 'Drafts'),
    },

    {
      name: 'Archive',
      onclick: () => Select('archive', 'Archive'),
    },
    {
      name: 'Delete',
      onclick: () => Select('deleteditems', 'Deleted Items'),
    },
    {
      name: 'Junk',
      onclick: () => Select('junkemail', 'Junk Email'),
    },
  ];

  const gmail = [
    {
      name: 'All folder',
      onclick: () => Select('inbox', 'All Folder'),
    },
    {
      name: 'Sent',
      onclick: () => Select('sent', 'Sent'),
    },

    {
      name: 'Draft',
      onclick: () => Select('draft', 'Draft'),
    },
    {
      name: 'Spam',
      onclick: () => Select('spam', 'Spam'),
    },
    {
      name: 'Trash',
      onclick: () => Select('trash ', 'Trash '),
    },
  ];

  const particularmailget = async () => {
    await getusermail(authProvider)
      .then((res: any) => {})
      .catch((error) => {});
  };

  const inboxmail = () => {
    getmails();
  };

  const archive = async () => {
    setLoader(true);
    await getarchivemsg(authProvider)
      .then((res: any) => {
        removemessage();
        setmessagelist(res.value);
        setLoader(false);
      })
      .catch((error) => {});
  };

  const remove_message = (id) => {
    if (integration === 'google') {
      var gremove = messagelist.filter((obj) => obj.id !== id);
      setmessagelist(gremove);
    } else if (integration === 'outlook') {
      var remove = messagelist.filter((obj) => obj.id !== id);

      setmessagelist(remove);
    }
  };

  const update_message = (id, val) => {
    if (integration === 'google') {
      if (val === true) {
        let newLabel = 'UNREAD';
        setmessagelist((prevMessages) =>
          prevMessages.map((item) =>
            item.id === id
              ? { ...item, labelIds: [...item.labelIds, newLabel] }
              : item,
          ),
        );
      }

      if (val === false) {
        let newLabel = 'UNREAD';
        setmessagelist((prevMessages) =>
          prevMessages.map((item) =>
            item.id === id
              ? {
                  ...item,
                  labelIds: item.labelIds.filter((label) => label !== newLabel),
                }
              : item,
          ),
        );
      }
      foldercount();
    } else if (integration === 'outlook') {
      let newName = val;
      getfolder();
      setmessagelist((prevMessages) =>
        prevMessages.map((item) =>
          item.id === id ? { ...item, isRead: newName } : item,
        ),
      );
    }
  };

  const deleteditems = async () => {
    setLoader(true);
    await getdeleteditems(authProvider)
      .then((res) => {
        removemessage();
        setmessagelist(res.value);
        setLoader(false);
      })
      .catch((error) => {});
  };

  const updateroute = (val) => {
    if (val !== sideroute) {
      setPrevious(25);
      setSkip(0);
      setDel(0);
      setPrevious1(1);
      setmessagelist([]);
      setmesage('');
      setSearchDropdown(false);
      setSearch('');
      setsideroute(val);
      setSearchFolder('All Folder');
      setSearchSection('All');
      setAttachments([]);
      setnextpagetoken(null);
      setIsLoading(true);
      setsearchapi(false);
    }
  };

  const junkemail = async () => {
    setLoader(true);
    await getjunkemail(authProvider)
      .then((res) => {
        removemessage();
        setmessagelist(res.value);
        setLoader(false);
      })
      .catch((error) => {});
  };
  const searchinput = (e) => {
    setSearch(e.target.value);
  };

  const serchmessage = async (e: any) => {
    // e.preventDefault();

    if (e && e.key === 'Enter') {
      setLoader(true);
      setsearchapi(true);

      setsideroute(0);
      setPrevious(25);
      setSkip(0);
      setDel(0);
      setPrevious1(1);
      setmessagelist([]);
      setmesage('');
      setSearch(search.trim());
      setIsLoading(true);
    }
  };

  const page = async () => {
    if (messagelist.length === 0) {
      setLoader(true);
    }
    if (integration === 'outlook') {
      var folder = '';
      if (sideroute === 1) {
        folder = 'Inbox';
      } else if (sideroute === 2) {
        folder = 'sentitems';
      } else if (sideroute === 3) {
        folder = 'drafts';
      } else if (sideroute === 4) {
        folder = 'archive	';
      } else if (sideroute === 5) {
        folder = 'deleteditems';
      } else if (sideroute === 6) {
        folder = 'junkemail';
      }
      setIsLoading(true);
      await getmessages(authProvider, folder, skip, range)
        .then((res) => {
          setmessagelist((prevMessages) => [...prevMessages, ...res.value]);
          setNoEmails(res.value.length === 0 ? true : false);
          setSkip(skip + range);
          setIsLoading(false);
          setTotal(res['@odata.count']);
          setLoader(false);
          getfolder();
          if (!res['@odata.nextLink']) {
            setnextpagetoken(undefined);
          }
        })
        .catch((error) => {});
    } else if (integration === 'google') {
      var Gfolder = '';
      if (sideroute === 1) {
        Gfolder = 'INBOX';
      } else if (sideroute === 2) {
        Gfolder = 'SENT';
      } else if (sideroute === 3) {
        Gfolder = 'DRAFT';
      } else if (sideroute === 4) {
        Gfolder = 'SPAM';
      } else if (sideroute === 5) {
        Gfolder = 'TRASH';
      }
      setIsLoading(true);
      initGoogleAuth()
        .then(() => {
          Gmail_Mails(Gfolder, nextpagetoken, range)
            .then((res) => {
              //  console.log('rem', res);
              if (res.fullMessages !== undefined) {
                setmessagelist((prevMessages) => [
                  ...prevMessages,
                  ...res.fullMessages,
                ]);
              }
              setIsLoading(false);
              setnextpagetoken(res.token);
              setLoader(false);
            })
            .catch((err) => {
              setLoader(false);
            });
        })
        .catch((error) => {
          setLoader(false);
        });
    }
  };

  const Nextdata = () => {
    var a = previous + range;

    if (a > total) {
      setDel(total - previous);
      setPrevious(previous + (total - previous));
      // setSkip(previous + 1);
      setSkip(previous);
      setPrevious1(previous + 1);
    } else if (previous < total) {
      setPrevious(previous + range);
      // setSkip(previous + 1);
      setSkip(previous);
      setPrevious1(previous + 1);
    }
  };

  const Previousdata = () => {
    if (del === 0) {
      if (previous !== 0 && range !== previous) {
        setPrevious(previous - range);
        setSkip(previous - (range + range) + 1);
        setPrevious1(previous - (range + range) + 1);
      }
    } else {
      setPrevious(previous - del);
      setSkip(previous1 - range);
      setPrevious1(previous1 - range);
      setDel(0);
    }
  };
  const get_attach = async (id, attach, res) => {
    let getfile = [];

    attach.map(async (val, ind) => {
      await Gmail_Attachment(id, val.attachmentId).then((responce) => {
        let fileInfo = {
          name: val.name,
          size: responce.result.size,
          contentBytes: responce.result.data,
          contentType: val.mimeType,
        };
        getfile.push(fileInfo);
      });
    });

    var obj = {
      id: id,
      snippet: res.message.snippet,
      internalDate: res.message.internalDate,
      threadId: res.message.threadId,
      labelIds: res.message.labelIds,
      header: res.message.payload.headers,
      body: res.body,
    };

    setTimeout(function () {
      setmesage(obj);
      setAttachments(getfile);
      setLoader(false);
    }, 2500);
  };
  const getmessageid = async (msgid) => {
    setLoader(true);
    if (integration === 'google') {
      initGoogleAuth()
        .then(() => {
          Selected_message(msgid)
            .then((res) => {
              if (res.attachments.length === 0) {
                setLoader(false);

                var obj = {
                  id: msgid,
                  snippet: res.message.snippet,
                  internalDate: res.message.internalDate,
                  threadId: res.message.threadId,
                  labelIds: res.message.labelIds,
                  header: res.message.payload.headers,
                  body: res.body,
                };
                setmesage(obj);
                setAttachments(res.attachments);
              } else {
                get_attach(msgid, res.attachments, res);
              }
            })
            .catch((err) => {});
        })
        .catch((error) => {
          setLoader(false);
        });
    } else {
      setLoader(true);
      await getselectedmsg(authProvider, msgid)
        .then((res) => {
          page();
          if (res.hasAttachments === true) {
            attachment(res.id);
          } else {
            setLoader(false);
            setAttachments([]);
          }
        })
        .catch((error) => {});
    }
  };

  const attachment = async (msgid) => {
    await getattachments(authProvider, msgid)
      .then((res) => {
        setAttachments(res.value);
        setLoader(false);
      })
      .catch((error) => {});
  };

  const getfolder = async () => {
    await getmailfolders(authProvider)
      .then((res) => {
        setMailfolders(res.value);
      })
      .catch((error) => {});
  };

  const gProfile = () => {
    initGoogleAuth().then(() => {
      Gmail_profile()
        .then((res) => {
          setUsermail(res.result.emailAddress);
        })
        .catch((err) => {
          console.log('error');
        });
    });
  };

  useEffect(() => {
    if (integration !== '') {
      if (integration === 'google') {
        if (sideroute !== 0) {
          foldercount();
          gProfile();
        }
      } else if (integration === 'outlook') {
        if (sideroute !== 0) {
          getprofile();

          getfolder();
          //particularmailget();
        }
      }
    }
  }, [sideroute, skip]);
  //////gmail ///////

  const foldercount = () => {
    var Gfolder = '';
    if (sideroute === 1) {
      Gfolder = 'INBOX';
    } else if (sideroute === 2) {
      Gfolder = 'SENT';
    } else if (sideroute === 3) {
      Gfolder = 'DRAFT';
    } else if (sideroute === 4) {
      Gfolder = 'SPAM';
    } else if (sideroute === 5) {
      Gfolder = 'TRASH';
    }
    initGoogleAuth()
      .then(() => {
        Gmail_Folder_Total_count(Gfolder)
          .then((res) => {
            if (res.result.messagesTotal < range) {
              setPrevious(res.result.messagesTotal);
            }
            setgmailunread(res.result.messagesUnread);
            setTotal(res.result.messagesTotal);
          })
          .catch((err) => {
            // console.log('error', err);
          });
      })
      .catch(() => {
        // console.log('auth error');
      });
  };

  const savemail = (val) => {
    setmessagelist((prevMessages) => [...prevMessages, ...val]);
    setLoader(false);
  };

  const IntegrationMenuView = (
    <Flex
      center
      flex={1}
      middle
      columnFlex
      className={styles.integrationContent}
    >
      <Text color="gray" style={{ marginBottom: 16 }}>
        Integrate your email with zita application to handle mailing inside zita
      </Text>
      <LinkWrapper
        onClick={() => {
          sessionStorage.setItem('superUserTab', '4');
          sessionStorage.setItem('superUserFalseTab', '3');
        }}
        to="/account_setting/settings"
      >
        <Button>Integrate</Button>
      </LinkWrapper>
    </Flex>
  );

  return (
    <>
      <Flex column className={styles.inboxContainer}>
        {console.log('==1==', int)}
        {loader === true && <Loader />}

        {int !== null ? (
          <>
            <Flex row between className={styles.titleContainer}>
              <Text bold size={16} color="theme">
                Mailbox
              </Text>
              <Flex row>
                {searchDropdown && (
                  <Dropdown className="dropdown toggle">
                    {
                      <Dropdown.Toggle
                        style={{
                          borderColor: '#A5889C',
                          backgroundColor: 'unset',
                          boxShadow: 'none',
                          padding: '0px',
                        }}
                        className={styles.Toggle}
                        // id="dropdown-basic"
                      >
                        <Flex row noWrap center style={{ padding: '5px' }}>
                          <Text
                            size={12}
                            color="theme"
                            style={{
                              marginRight: '10px',
                              textTransform: 'capitalize',
                            }}
                          >
                            {' '}
                            {searchFolder}
                          </Text>
                          <SvgArrowDown width={11} height={11} />
                        </Flex>
                      </Dropdown.Toggle>
                    }

                    {
                      <Dropdown.Menu style={{ minWidth: '5rem' }}>
                        {searchDropdownMenu.map((doc, index) => (
                          <Dropdown.Item key={index} onClick={doc.onclick}>
                            <Flex
                              row
                              center
                              className={styles.dropDownListStyle}
                            >
                              <Text style={{ cursor: 'pointer' }}>
                                {doc.name}
                              </Text>
                            </Flex>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    }
                  </Dropdown>
                )}

                <InputText
                  actionRight={() => (
                    <Flex style={{ marginTop: '3px' }}>
                      <SvgSearch />
                    </Flex>
                  )}
                  placeholder="Search by email subject or body"
                  className={styles.inputSearch}
                  onKeyPress={(e) => serchmessage(e)}
                  onChange={(e) => searchinput(e)}
                  style={
                    searchDropdown
                      ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                      : { borderRadius: '4px' }
                  }
                  value={search}
                  onFocus={() => {
                    setSearchDropdown(true);
                  }}
                />
              </Flex>

              <Flex></Flex>
              <div className={styles.triangle}> </div>
            </Flex>
            <Flex row className={styles.container}>
              <Flex className={styles.containerColumn} marginTop={1}>
                <Sidebar
                  open={modelupdate}
                  send={Send}
                  draft={Draft}
                  inbox={inboxmail}
                  archive={archive}
                  updateroute={updateroute}
                  deleteditems={deleteditems}
                  junkemail={junkemail}
                  page={page}
                  sidebarroute={sideroute}
                  integration={integration}
                />
              </Flex>
              <Flex
                marginTop={1}
                className={styles.containerColumn}
                style={{ minWidth: 349, maxWidth: 349 }}
              >
                <Maillist
                  messagelist={messagelist}
                  selectmessage={selectmessage}
                  getmessageid={getmessageid}
                  sideroute={sideroute}
                  mailfolders={mailfolders}
                  removemsg={removemessage}
                  gmailunread={gmailunread}
                  page={page}
                  sidebarroute={sideroute}
                  previousfun={Previousdata}
                  nextfun={Nextdata}
                  range={range}
                  previous={previous}
                  previous1={previous1}
                  total={total}
                  msglistcount={messagelist.length}
                  message={message}
                  noEmails={noEmails}
                  integration={integration}
                  pagetoken={nextpagetoken}
                  hasMore={hasMore}
                  isLoading={isLoading}
                  searchapi={searchapi}
                  serchmessage={serchmessage}
                  savemail={savemail}
                  searchSection={searchSection}
                  search={search}
                />
              </Flex>
              <Flex
                marginTop={1}
                marginRight={1}
                className={styles.containerColumn1}
              >
                <Message
                  message={message}
                  sidebarroute={sideroute}
                  composemodal={modelupdate}
                  removemsg={removemessage}
                  page={page}
                  attachments={attachments}
                  msglistcount={messagelist.length}
                  integration={integration}
                  updateMailaction={updateMailaction}
                  remove_message={remove_message}
                  update_message={update_message}
                />
              </Flex>
            </Flex>
            {/* <Flex flex={10}></Flex> */}
            <Newcompose
              data={model}
              mail={usermail}
              onClose={modelupdate}
              replaymsg={message}
              integration={integration}
              Mail_action={Mailaction}
              updateMailaction={updateMailaction}
              atfiles={attachments}
              sidebarroute={sideroute}
            />
          </>
        ) : (
          <>{IntegrationMenuView}</>
        )}
      </Flex>
    </>
  );
};

export default EmailScreen;
