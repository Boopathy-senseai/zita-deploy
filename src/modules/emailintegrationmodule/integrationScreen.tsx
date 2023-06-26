import React, { useState, useEffect } from 'react';

import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import Loader from '../../uikit/Loader/Loader';
import {
  getEmail,
  outlookUserProfile,
} from '../emailintegrationmodule/store/middleware/emailIntegrationMiddleWare';
import { Flex, InputText, Text } from '../../uikit';
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
} from '../../emailService';
import config from '../../outlookmailConfig';
import SvgRefresh from '../../icons/SvgRefresh';
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
  const [view, setview] = useState(0);
  const [messagelist, setmessagelist] = useState([]);
  const [message, setmesage] = useState('');
  const [usermail, setUsermail] = useState('');
  const [sideroute, setsideroute] = useState(1);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState('');
  const [attachments, setAttachments] = useState('');

  const [previous, setPrevious] = useState(25);
  const [previous1, setPrevious1] = useState(1);
  const [skip, setSkip] = useState(0);
  const [range, setRange] = useState(25);
  const [total, setTotal] = useState(0);
  const [del, setDel] = useState(0);

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
    const users = await getUser(authProvider);
    setUsermail(users.mail);
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
  };

  // const emailcollection = useSelector(({ useremail }: RootState) => {
  //   return {
  //     emailcollection: useremail.mails,
  //   };
  // });

  useEffect(() => {
    getprofile();
    page();
    //sss();
    // dispatch(getEmail()).then((res) => {
    // });
  }, [sideroute, skip]);

  const sss = async () => {
    await getusermail(authProvider)
      .then((res: any) => {
        //  console.log('achive---------', res);
      })
      .catch((error) => {
        //  console.log('connection failed achive mail', error);
      });
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('This will run after 1 second!');
  //   }, 1000);
  // });

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
    setPrevious(25);
    setSkip(0);
    setDel(0);
    setPrevious1(1);
    setsideroute(val);
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

  const searchinput = (val) => {
    setSearch(val);
  };

  const serchmessage = async () => {
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
    await getsearchmail(authProvider, folder, search)
      .then((res) => {
        removemessage();
        setmessagelist(res.value);
        setLoader(false);
      })
      .catch((error) => {
        // console.log('get junk mail', error);
      });
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
        removemessage();
        setmessagelist(res.value);
        setTotal(res['@odata.count']);
        setLoader(false);
        if (res['@odata.count'] < range) {
          setPrevious(res['@odata.count']);
        }
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
      setSkip(previous + 1);
      setPrevious1(previous + 1);
    } else if (previous < total) {
      setPrevious(previous + range);
      setSkip(previous + 1);
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
      // alert(previous - del);
      // alert(previous1 - range);
      // alert(previous1);
      // alert(range);
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

        if (res.hasAttachments === true) {
          attachment(res.id);
        } else {
          setLoader(false);
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

  return (
    <>
      <Flex column>
        {loader === true ? <Loader /> : ''}
        <Flex row between className={styles.titleContainer}>
          <Text bold size={16} color="theme">
            Inbox
          </Text>
          <Flex>
            <InputText
              actionRight={() => (
                <Flex style={{ marginTop: '3px' }}>
                  <SvgSearch />
                </Flex>
              )}
              placeholder="Search by email subject or body"
              className={styles.inputSearch}
              value={search}
            />
          </Flex>

          <Flex></Flex>
          <div className={styles.triangle}> </div>
        </Flex>
        <Flex row className={styles.container}>
          <Flex className={styles.containerColumn}>
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
            />
          </Flex>
          <Flex flex={3} className={styles.containerColumn}>
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
              searchmessage={serchmessage}
              searchinput={searchinput}
              search={search}
              getmessageid={getmessageid}
              sideroute={sideroute}
            />
          </Flex>
          <Flex flex={9} className={styles.containerColumn}>
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
              previousfun={Previousdata}
              nextfun={Nextdata}
              range={range}
              previous={previous}
              previous1={previous1}
              total={total}
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
    </>
  );
};

export default EmailScreen;
