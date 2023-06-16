import React, { useState, useEffect } from 'react';

import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  getEmail,
  outlookUserProfile,
} from '../emailintegrationmodule/store/middleware/emailIntegrationMiddleWare';
import { Flex, Text } from '../../uikit';
import {
  getUser,
  getmail,
  getdraft,
  getsenditem,
  getarchivemsg,
  getdeleteditems,
  getjunkemail,
} from '../../emailService';
import config from '../../outlookmailConfig';
import Sidebar from './sidebar';
import Newcompose from './composemodal';
import styles from './integration.module.css';
import Message from './message';
import Maillist from './Maillist';

const EmailScreen = () => {
  const msal = useMsal();
  const dispatch: AppDispatch = useDispatch();
  const [model, setmodel] = useState(false);
  const [view, setview] = useState(0);
  const [messagelist, setmessagelist] = useState([]);
  const [message, setmesage] = useState('');
  const [usermail, setUsermail] = useState('');
  const [sideroute, setsideroute] = useState(1);
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
    await getsenditem(authProvider)
      .then((res) => {
        // console.log('res---------', res);
        setmessagelist(res.value);
      })
      .catch((error) => {
        // console.log('connection failed inboxxxxxxx', error);
      });
  };

  const Draft = async () => {
    await getdraft(authProvider)
      .then((res) => {
        // console.log('res---------', res);
        setmessagelist(res.value);
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
    await getmail(authProvider)
      .then((res: any) => {
        setmessagelist(res.value);
      })
      .catch((error) => {});
  };

  const selectmessage = (msg) => {
    setmesage(msg);
  };

  // const emailcollection = useSelector(({ useremail }: RootState) => {
  //   return {
  //     emailcollection: useremail.mails,
  //   };
  // });

  useEffect(() => {
    getprofile();
    getmails();
    // dispatch(getEmail()).then((res) => {

    // });
  }, []);

  const inboxmail = () => {
    getmails();
  };

  const archive = async () => {
    await getarchivemsg(authProvider)
      .then((res: any) => {
        //  console.log('achive---------', res);
        setmessagelist(res.value);
      })
      .catch((error) => {
        //  console.log('connection failed achive mail', error);
      });
  };

  const deleteditems = async () => {
    await getdeleteditems(authProvider)
      .then((res) => {
        setmessagelist(res.value);
      })
      .catch((error) => {
        console.log('connection failed achive mail', error);
      });
  };

  const updateroute = (val) => {
    setsideroute(val);
  };

  const junkemail = async () => {
    await getjunkemail(authProvider)
      .then((res) => {
        setmessagelist(res.value);
      })
      .catch((error) => {
        console.log('get junk mail', error);
      });
  };

  return (
    <Flex column>
      <Flex row className={styles.titleContainer}>
        <Text bold size={16} color="theme">
          Inbox
        </Text>
        <div className={styles.triangle}> </div>
      </Flex>
      <Flex row className={styles.container}>
        <Flex flex={1} className={styles.containerColumn}>
          <Sidebar
            open={modelupdate}
            send={Send}
            draft={Draft}
            inbox={inboxmail}
            archive={archive}
            updateroute={updateroute}
            deleteditems={deleteditems}
            junkemail={junkemail}
          />
        </Flex>
        <Flex flex={3} className={styles.containerColumn}>
          <Maillist messagelist={messagelist} selectmessage={selectmessage} />
        </Flex>
        <Flex flex={9} className={styles.containerColumn}>
          <Message
            message={message}
            sidebarroute={sideroute}
            composemodal={modelupdate}
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
  );
};

export default EmailScreen;
