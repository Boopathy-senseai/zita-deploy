import React, { useState, useEffect } from 'react';

import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';

import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
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
} from '../../emailService';
import config from '../../outlookmailConfig';
import SvgRefresh from '../../icons/SvgRefresh';
import SvgDownload from '../../icons/SvgDownload';
import SvgArrowDown from '../../icons/SvgArrowDown';
import Sidebar from './sidebar';
import Newcompose from './composemodal';
import styles from './integration.module.css';
import Message from './message';
import Maillist from './Maillist';
import Pagination from './pagination';

const EmailScreen = () => {
  const msal = useMsal();
  const dispatch: AppDispatch = useDispatch();

  const [model, setmodel] = useState(false);
  const [integration, setintegration] = useState(false);
  const [messagelist, setmessagelist] = useState([]);
  const [message, setmesage] = useState('');
  const [usermail, setUsermail] = useState('');
  const [sideroute, setsideroute] = useState(1);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [mailfolders, setMailfolders] = useState('');
  const [noEmails, setNoEmails] = useState(false);

  const [previous, setPrevious] = useState(25);
  const [previous1, setPrevious1] = useState(1);
  const [skip, setSkip] = useState(0);
  const [range, setRange] = useState(25);
  const [total, setTotal] = useState(0);
  const [del, setDel] = useState(0);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchSection, setSearchSection] = useState('All');
  const [searchFolder, setSearchFolder] = useState('All Folder');
  const [searchicon, setSearchicon] = useState(true);

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,

      interactionType: InteractionType.Popup,
    },
  );

  const modelupdate = () => {
    setmodel(!model);
  };

  const Send = async () => {
    setLoader(true);
    await getsenditem(authProvider)
      .then((res) => {
        // console.log('res---------', res);
        setmessagelist(res.value);
        removemessage();
        setLoader(false);
      })
      .catch((error) => {
        // console.log('connection failed inboxxxxxxx', error);
      });
  };

  const Draft = async () => {
    setLoader(true);

    await getdraft(authProvider)
      .then((res) => {
        // console.log('res---------', res);
        setmessagelist(res.value);
        removemessage();
        setLoader(false);
      })
      .catch((error) => {
        // console.log('connection failed inboxxxxxxx', error);
      });
  };

  const getprofile = async () => {
    await getUser(authProvider)
      .then((res: any) => {
        setUsermail(res.mail);
      })
      .catch((error) => {
        console.log('sd', error);
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
        // console.log('asasasas', res);
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

  const searchDropdownMenu = [
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
      onclick: () => Select('sentitems', 'Send Items'),
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

  useEffect(() => {
    if (sideroute !== 0) {
      getprofile();
      page();
      getfolder();
      as();
    }
  }, [sideroute, skip]);

  const as = async () => {
    await getusermail(authProvider)
      .then((res: any) => {
        console.log('---', res);
      })
      .catch((error) => {
        console.log('---', error);
      });
  };

  const inboxmail = () => {
    getmails();
  };

  const archive = async () => {
    setLoader(true);
    await getarchivemsg(authProvider)
      .then((res: any) => {
        //  console.log('achive---------', res);
        removemessage();
        setmessagelist(res.value);
        setLoader(false);
      })
      .catch((error) => {
        //  console.log('connection failed achive mail', error);
      });
  };

  const deleteditems = async () => {
    setLoader(true);
    await getdeleteditems(authProvider)
      .then((res) => {
        removemessage();
        setmessagelist(res.value);
        setLoader(false);
      })
      .catch((error) => {
        //  console.log('connection failed achive mail', error);
      });
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
      .catch((error) => {
        // console.log('get junk mail', error);
      });
  };

  const searchinput = (e) => {
    setSearch(e.target.value);
  };

  const serchmessage = async (e: any) => {
    // e.preventDefault();
    if (e.key === 'Enter') {
      if (search !== '') {
        setSearchicon(false);
        setsideroute(0);
        setPrevious(25);
        setSkip(0);
        setDel(0);
        setPrevious1(1);
        setmessagelist([]);
        setmesage('');
        setLoader(true);
        await getsearchmail(authProvider, searchSection, search, skip, range)
          .then((res) => {
            setSearchicon(true);
            // removemessage();
            setmessagelist(res.value);
            if (res['@odata.count'] < range) {
              setPrevious(res['@odata.count']);
            }
            setTotal(res['@odata.count']);
            setLoader(false);
          })
          .catch((error) => {
            // console.log('get junk mail', error);
          });
      }
    }
  };

  const page = async () => {
    setLoader(true);
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

    await getmessages(authProvider, folder, skip, range)
      .then((res) => {
        //removemessage();
        setmessagelist(res.value);
        setNoEmails(res.value.length === 0 ? true : false)
        if (res['@odata.count'] < range) {
          setPrevious(res['@odata.count']);
        }
        setTotal(res['@odata.count']);
        setLoader(false);
        getfolder();
        //console.log(folder, res.value);
      })
      .catch((error) => {
        //console.log('error', error);
      });
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

  const getmessageid = async (msgid) => {
    setLoader(true);
    await getselectedmsg(authProvider, msgid)
      .then((res) => {
        // console.log('addad', res);
        page();
        if (res.hasAttachments === true) {
          attachment(res.id);
        } else {
          setLoader(false);
          setAttachments([]);
        }
      })
      .catch((error) => {
        //  console.log('error', error);
      });
  };

  const attachment = async (msgid) => {
    await getattachments(authProvider, msgid)
      .then((res) => {
        console.log('attach', res);
        setAttachments(res.value);
        setLoader(false);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const getfolder = async () => {
    await getmailfolders(authProvider)
      .then((res) => {
        // console.log('res---------', res);
        setMailfolders(res.value);
      })
      .catch((error) => {
        // console.log('connection failed inboxxxxxxx', error);
      });
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
          Integrate your email with zita application to handle mailing inside
          zita
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
      <AuthenticatedTemplate>
        <Flex column className={styles.inboxContainer}>
          {/* {console.log('asas', sideroute)} */}
          {loader === true && <Loader />}
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
                          <Flex row center className={styles.dropDownListStyle}>
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
                // onBlur={() => {
                //   setSearchDropdown(false);
                // }}
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
              />
            </Flex>
            <Flex
              marginTop={1}
              className={styles.containerColumn}
              style={{ minWidth: 349, maxWidth: 349 }}
            >
              {/* <Pagination
              previousfun={Previousdata}
              nextfun={Nextdata}
              range={range}
              previous={previous}
              previous1={previous1}
              total={total}
            /> */}
              <Maillist
                messagelist={messagelist}
                selectmessage={selectmessage}
                getmessageid={getmessageid}
                sideroute={sideroute}
                mailfolders={mailfolders}
                removemsg={removemessage}
                page={page}
                sidebarroute={sideroute}
                previousfun={Previousdata}
                nextfun={Nextdata}
                range={range}
                previous={previous}
                previous1={previous1}
                total={total}
                msglistcount={messagelist.length}
                searchicon={searchicon}
                message={message}
                noEmails={noEmails}
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
                // archiveapi={archive}
                // inboxapi={getmails}
                //senditemapi={Send}
                //deleteditemsapi={deleteditems}
                // junkemailapi={junkemail}
                //draftapi={Draft}
                page={page}
                attachments={attachments}
                // previousfun={Previousdata}
                // nextfun={Nextdata}
                // range={range}
                // previous={previous}
                // previous1={previous1}
                // total={total}
                msglistcount={messagelist.length}
              />
            </Flex>
          </Flex>
          {/* <Flex flex={10}></Flex> */}
          <Newcompose
            data={model}
            mail={usermail}
            onClose={modelupdate}
            replaymsg={message}
          />
        </Flex>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>{IntegrationMenuView}</UnauthenticatedTemplate>
    </>
  );
};

export default EmailScreen;
