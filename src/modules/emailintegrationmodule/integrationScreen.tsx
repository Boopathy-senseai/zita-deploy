import React, { useState, useEffect } from 'react';

import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

import { Flex, Text } from '../../uikit';
import { getUser, getmail } from '../../emailService';
import config from '../../outlookmailConfig';
import Sidebar from './sidebar';
import Newmessage from './composemodal';
import styles from './integration.module.css';
import Message from './message';
import Maillist from './Maillist';

const EmailScreen = () => {
  const msal = useMsal();
  const [model, setmodel] = useState(false);
  const [view, setview] = useState(0);
  const [messagelist, setmessagelist] = useState([]);
  const [message, setmesage] = useState('');
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

  const Send = () => {
    setview(1);
  };

  const Draft = () => {
    setview(2);
  };

  const getprofile = async () => {
    const users = await getUser(authProvider);
    console.log('sdsd', users);
  };

  const getmails = async () => {
    await getmail(authProvider)
      .then((res) => {
        console.log('res---------', res);
        setmessagelist(res.value);
      })
      .catch((error) => {
        console.log('connection failed');
      });
  };

  const selectmessage = (msg) => {
    setmesage(msg);
  };

  useEffect(() => {
    getprofile();
    getmails();
  }, []);

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
          <Sidebar open={modelupdate} send={Send} draft={Draft} />
        </Flex>
        <Flex flex={3} className={styles.containerColumn}>
          <Maillist messagelist={messagelist} selectmessage={selectmessage} />
        </Flex>
        <Flex flex={9} className={styles.containerColumn}>
          <Message message={message} />
        </Flex>
      </Flex>
      {/* <Flex flex={10}></Flex> */}
      <Newmessage data={model} onClose={modelupdate} />
    </Flex>
  );
};

export default EmailScreen;
