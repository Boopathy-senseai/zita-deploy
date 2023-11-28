import React, { useState, useEffect } from 'react';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { AppDispatch, RootState } from '../../store';
import Loader from '../../uikit/Loader/Loader';
import {
  getEmail,
  // outlookUserProfile,
} from '../emailintegrationmodule/store/middleware/emailIntegrationMiddleWare';
import { Flex, InputText, LinkWrapper, Button, Text } from '../../uikit';
import SvgSearch from '../../icons/SvgSearch';
import SvgGooglemail from '../../icons/SvgGooglemail';
import SvgOutlookcalendar from '../../icons/SvgOutlookcalendarname';
import {
  getUser,
  getmail,
  getdraft,
  getsenditem,
  getarchivemsg,
  getdeleteditems,
  getjunkemail,
  getmessages,
  getselectedmsg,
  getattachments,
  getmailfolders,
  Gmail_Mails,
  initGoogleAuth,
  Selected_message,
  Gmail_Attachment,
  Gmail_Folder_Total_count,
  outlooktoken,
  filtermail,
} from '../../emailService';
import config from '../../outlookmailConfig';
import SvgArrowDown from '../../icons/SvgArrowDown';
import Sidebar from './sidebar';
import Newcompose from './composemodal';
import styles from './integration.module.css';
import Message from './message';
import Maillist from './Maillist';

type Props = {
  isprofileview?: boolean;
  can_id?: any;
  Emailsidebar?: any;
};
const EmailScreen = ({ Emailsidebar, isprofileview, can_id }: Props) => {
  const msal = useMsal();
  const dispatch: AppDispatch = useDispatch();

  const [model, setmodel] = useState(false);

  const [messagelist, setmessagelist] = useState([]);
  const [message, setmesage] = useState<any>('');
  const [usermail, setUsermail] = useState('');
  const [sideroute, setsideroute] = useState(1);
  //chage loader state check //
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [mailfolders, setMailfolders] = useState<any>(0);
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
  const [enterKey, setEnterKey] = useState(false);
  const [token, settoken] = useState(null);

  const [Mailaction, setMailaction] = useState('compose');
  const [hasMore, setHasMore] = useState(true);

  const [searchapi, setsearchapi] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [newmsg, setnewmsg] = useState('');

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,

      interactionType: InteractionType.Popup,
    },
  );
  const { permission, super_user, roles } = useSelector(
    ({ permissionReducers}: RootState) => {
      return {
        permission: permissionReducers.Permission,
        super_user: permissionReducers.super_user,
        roles: permissionReducers.roles,
        
      };
    },
  );
  const emailcollection = useSelector(({ useremail }: RootState) => {
    return {
      email: useremail.email,
      maillist: useremail.mails,
      integration: useremail.account,
      loading: useremail.isLoading,
      token: useremail.token,
    };
  });
  const integrate = useSelector(({ useremail }: RootState) => {
    return {
      email: useremail.email,
      mailname: useremail.account,
    };
  });

  const handleIntegrateTab = () => {
    if (super_user === true && roles === "Admin") {
      sessionStorage.setItem('superUserTab','4')
    } else if (super_user === false && roles === "Admin") {
      sessionStorage.setItem('superUserTab', '2')
    } else if (roles === "Hiring" && !permission.includes('manage_account_settings') ) {
      sessionStorage.setItem('superUserTab', '1')
    } else if (roles === "Hiring" && permission.includes('manage_account_settings')) {
      sessionStorage.setItem('superUserTab', '2')
    } else if (roles === "HR" && !permission.includes('manage_account_settings')) {
      sessionStorage.setItem('superUserTabTwo', '1')
    } else if (roles === "HR" && permission.includes('manage_account_settings')) {
      sessionStorage.setItem('superUserTab','2')
    }
  }

  let integrationnavpath = '/account_setting/settings'

  if (super_user === true && roles === "Admin") {
    integrationnavpath='/account_setting/settings?tab=4' 
  } else if (super_user === false && roles === "Admin") {
    integrationnavpath='/account_setting/settings?tab=2'
  } else if (roles === "Hiring" && !permission.includes('manage_account_settings') ) {
    integrationnavpath='/account_setting/settings?tab=1'
  } else if (roles === "Hiring" && permission.includes('manage_account_settings')) {
    integrationnavpath='/account_setting/settings?tab=2'
  } else if (roles === "HR" && !permission.includes('manage_account_settings')) {
    integrationnavpath='/account_setting/settings?tab=1'
  } else if (roles === "HR" && permission.includes('manage_account_settings')) {
    integrationnavpath='/account_setting/settings?tab=2'
  }

  useEffect(() => {
    dispatch(getEmail(can_id !== undefined ? can_id : undefined));
  }, []);

  useEffect(() => {
    if (
      emailcollection.integration !== null &&
      emailcollection.integration !== ''
    ) {
      outlooktoken(emailcollection.token);
      filtermail(emailcollection.maillist, emailcollection.integration);
    } else {
      setLoader(false);
    }
  }, [emailcollection, sideroute]);

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
    await getUser()
      .then((res: any) => {
        console.log(res, 'outloooook1');
        setUsermail(res.mail);
      })
      .catch((error) => {
        // console.log('error', error);
      });
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
    setEnterKey(false);
  };

  useEffect(() => {
    if (emailcollection.integration === 'google') {
      setsearchDropdownMenu(gmail);
    } else {
      setsearchDropdownMenu(outlook);
    }
  }, []);

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
    if (emailcollection.integration === 'google') {
      var gremove = messagelist.filter((obj) => obj.id !== id);
      setmessagelist(gremove);
    } else if (emailcollection.integration === 'outlook') {
      var remove = messagelist.filter((obj) => obj.id !== id);

      setmessagelist(remove);
    }
  };

  const update_message = (id, val) => {
    if (emailcollection.integration === 'google') {
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
    }

    if (emailcollection.integration === 'outlook') {
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
      setLoader(true);
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
      setNoEmails(false);
      settoken(null);
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
    setEnterKey(false);
    settoken(null);
  };

  const serchmessage = async (e: any) => {
    // e.preventDefault();

    if (e && e.key === 'Enter') {
      if (search.trim() !== '') {
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
        setEnterKey(true);
        settoken(null);
      }
    }
  };

  const refresh = async () => {
    if (sideroute !== 0) {
      setLoader(true);
      setmessagelist([]);
      setSkip(0);
      setnextpagetoken(null);
      setmesage('');
      setEnterKey(false);
      if (emailcollection.integration === 'outlook') {
        var folder = '';
        if (sideroute === 1) {
          folder = 'Inbox';
        } else if (sideroute === 2) {
          folder = 'sentitems';
        } else if (sideroute === 3) {
          folder = 'drafts';
        } else if (sideroute === 4) {
          folder = 'archive ';
        } else if (sideroute === 5) {
          folder = 'deleteditems';
        } else if (sideroute === 6) {
          folder = 'junkemail';
        }
        await getmessages(authProvider, folder, null, range)
          .then((res) => {
            setmessagelist((prevMessages) => [...prevMessages, ...res.value]);
            setNoEmails(res.value.length === 0 ? true : false);
            setLoader(false);
            getfolder();
            if (!res['@odata.nextLink']) {
              setnextpagetoken(undefined);
              settoken(null);
            } else {
              settoken(res['@odata.nextLink'].split('skiptoken=')[1]);
            }
          })
          .catch((error) => {
            //console.log('goole----errr', error);
          });
      } else if (emailcollection.integration === 'google') {
        setLoader(true);
        setmessagelist([]);
        setSkip(0);
        setnextpagetoken(null);
        setmesage('');
        setEnterKey(false);
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
        await initGoogleAuth(emailcollection.token)
          .then(() => {
            Gmail_Mails(Gfolder, null, range, emailcollection.token)
              .then((res) => {
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
    }
  };

  const page = async () => {
    if (messagelist.length === 0) {
      setLoader(true);
    }
    if (emailcollection.integration === 'outlook') {
      var folder = '';
      if (sideroute === 1) {
        folder = 'Inbox';
      } else if (sideroute === 2) {
        folder = 'sentitems';
      } else if (sideroute === 3) {
        folder = 'drafts';
      } else if (sideroute === 4) {
        folder = 'archive ';
      } else if (sideroute === 5) {
        folder = 'deleteditems';
      } else if (sideroute === 6) {
        folder = 'junkemail';
      }
      setIsLoading(true);
      await getmessages(authProvider, folder, token, range)
        .then((res) => {
          setmessagelist((prevMessages) => [...prevMessages, ...res.value]);
          setNoEmails(res.value.length === 0 ? true : false);
          getfolder();
          setLoader(false);
          if (!res['@odata.nextLink']) {
            setnextpagetoken(undefined);
            settoken(null);
          } else {
            settoken(res['@odata.nextLink'].split('skiptoken=')[1]);
          }
        })
        .catch((error) => {
          //console.log('goole----errr', error);
        });
    } else if (emailcollection.integration === 'google') {
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
      await initGoogleAuth(emailcollection.token)
        .then(() => {
          Gmail_Mails(Gfolder, token, range, emailcollection.token)
            .then((res) => {
              if (res.fullMessages !== undefined) {
                setmessagelist((prevMessages) => [
                  ...prevMessages,
                  ...res.fullMessages,
                ]);
              } else {
                setNoEmails(true);
              }
              if (res.token === undefined) {
                settoken(null);
              } else {
                settoken(res.token);
              }
              foldercount();
              setIsLoading(false);
              // setnextpagetoken(res.token);
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
    if (emailcollection.integration === 'google') {
      initGoogleAuth(emailcollection.token)
        .then(() => {
          Selected_message(msgid)
            .then((res) => {
              if (res.attachments.length === 0) {
                setLoader(false);
                setnewmsg(res.message);
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
          // page();
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
    var folder = '';
    if (sideroute === 1) {
      folder = 'Inbox';
    } else if (sideroute === 2) {
      folder = 'sentitems';
    } else if (sideroute === 3) {
      folder = 'drafts';
    } else if (sideroute === 4) {
      folder = 'archive ';
    } else if (sideroute === 5) {
      folder = 'deleteditems';
    } else if (sideroute === 6) {
      folder = 'junkemail';
    }
    await getmailfolders(authProvider, folder)
      .then((res) => {
        setMailfolders(res);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (
      emailcollection.integration !== null &&
      emailcollection.integration !== ''
    ) {
      if (emailcollection.integration === 'google') {
        if (sideroute !== 0) {
          foldercount();
        }
      } else if (emailcollection.integration === 'outlook') {
        if (sideroute !== 0) {
          // console.log('getProfile');
          getprofile();

          getfolder();
        }
      }
    }
  }, [sideroute, skip]);
  //////gmail ///////

  const foldercount = async () => {
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
    await initGoogleAuth(emailcollection.token).then(() => {
      Gmail_Folder_Total_count(Gfolder)
        .then((res) => {
          console.log('resfffffffffffffffffffff', res);
          setgmailunread(res.result.resultSizeEstimate);
          setTotal(res.result.messagesTotal);
        })
        .catch((err) => {
          // console.log('foldererror', err);
        });
    });
  };

  const savemail = (val, tok) => {
    if (val === 0) {
      setmessagelist([]);
      settoken(tok);
      setLoader(false);
    } else {
      setmessagelist((prevMessages) => [...prevMessages, ...val]);
      settoken(tok);
      setLoader(false);
    }
  };

  const IntegrationMenuView = (
    <Flex
      center
      // flex={!isprofileview && 1}
      middle
      columnFlex
      className={styles.integrationContent}
      height={window.innerHeight - 121}
    >
      <Text color="gray" style={{ marginBottom: 16 }}>
        Integrate your email with zita application to handle mailing inside zita
      </Text>
      <LinkWrapper
        onClick={() => {
          handleIntegrateTab()
        }}
        to={integrationnavpath}
      >
        <Button>Integrate</Button>
      </LinkWrapper>
    </Flex>
  );

  return (
    <>
      <Flex column className={styles.inboxContainer}>
        {loader === true && <Loader />}
        {/* {loader === true && emailcollection.loading === false && <Loader />} */}
        <>
          {!isprofileview && (
            <Flex row between center className={styles.titleContainer}>
              <Text bold size={16} color="theme">
                Mailbox
              </Text>
              {emailcollection.integration !== null &&
                emailcollection.integration !== '' && (
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
                        <Flex style={{ marginTop: '6px' }}>
                          <SvgSearch />
                        </Flex>
                      )}
                      placeholder="Search by email subject or body"
                      className={styles.inputSearch}
                      onKeyPress={(e) => serchmessage(e)}
                      onChange={(e) => searchinput(e)}
                      style={
                        searchDropdown
                          ? {
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                            }
                          : { borderRadius: '4px' }
                      }
                      value={search}
                      onFocus={() => {
                        setSearchDropdown(true);
                      }}
                    />
                  </Flex>
                )}
              <Flex end row center marginRight={10}>
                <Flex marginTop={34} center row marginRight={-20}>
                  {' '}
                  {integrate?.mailname === 'google' && <SvgGooglemail />}
                  {integrate?.mailname === 'outlook' && (
                    <SvgOutlookcalendar />
                  )}{' '}
                </Flex>

                <Flex>
                  <Text>{integrate?.email}</Text>
                </Flex>
              </Flex>
              <div className={styles.triangle}> </div>
            </Flex>
          )}
          {emailcollection.integration !== null &&
            emailcollection.integration !== '' && (
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
                    integration={emailcollection.integration}
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
                    isprofileview={isprofileview}
                    mailfolders={mailfolders}
                    removemsg={removemessage}
                    gmailunread={gmailunread}
                    page={page}
                    sidebarroute={sideroute}
                    range={range}
                    message={message}
                    noEmails={noEmails}
                    integration={emailcollection.integration}
                    isLoading={isLoading}
                    searchapi={searchapi}
                    savemail={savemail}
                    searchSection={searchSection}
                    search={search}
                    emailcollection={emailcollection}
                    refresh={refresh}
                    enterKey={enterKey}
                    tokens={token}
                    can_id={can_id}
                  />
                </Flex>
                <Flex
                  marginTop={1}
                  marginRight={1}
                  style={{ width: '-moz-available' }}
                  className={styles.containerColumn1}
                >
                  <Message
                    message={message}
                    sidebarroute={sideroute}
                    composemodal={modelupdate}
                    removemsg={removemessage}
                    isprofileview={isprofileview}
                    page={page}
                    noEmails={noEmails}
                    emailcollection={emailcollection}
                    attachments={attachments}
                    msglistcount={messagelist.length}
                    integration={emailcollection.integration}
                    updateMailaction={updateMailaction}
                    remove_message={remove_message}
                    update_message={update_message}
                    Emailsidebar={Emailsidebar}
                  />
                </Flex>
              </Flex>
            )}
          {/* <Flex flex={10}></Flex> */}
          {emailcollection.integration !== null &&
            emailcollection.integration !== '' && (
              <Newcompose
                data={model}
                mail={usermail}
                onClose={modelupdate}
                replaymsg={message}
                integration={emailcollection.integration}
                Mail_action={Mailaction}
                updateMailaction={updateMailaction}
                atfiles={attachments}
                can_id={can_id}
                sidebarroute={sideroute}
                removemsg={removemessage}
                remove_message={remove_message}
                newmsg={newmsg}
              />
            )}
        </>

        {emailcollection.integration === null && <>{IntegrationMenuView}</>}
      </Flex>
    </>
  );
};

export default EmailScreen;
