// import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  useDispatch,
  // useSelector
} from 'react-redux';
import { gapi } from 'gapi-script';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  MsalProvider,
} from '@azure/msal-react';

import { PublicClientApplication, EventType } from '@azure/msal-browser';
//import { loginRequest, msalConfig } from '../../../outlookmailConfig';
import Modal from '../../../uikit/Modal/Modal';

import SvgGmail from '../../../icons/SvgGmailNew';

import SvgClose from '../../../icons/SvgClose';

import SvgoutlookMail from '../../../icons/SvgOutlookmail';
import SvgEdit from '../../../icons/SvgEdit';
import SvgTick from '../../../icons/SvgTickNew';
import {
  AppDispatch,
  //  RootState
} from '../../../store';
import { Button, Card, Flex, Text } from '../../../uikit';
import styles from './emailintegration.module.css';

const IntegrationScreen = () => {
  const dispatch: AppDispatch = useDispatch();

  const { instance } = useMsal();

  const [email, setEmail] = useState<string>('');
  const [isAuthorizegoogle, setIsAuthorizegoogle] = useState(false);
  const [Authorizemail, setAuthorizemail] = useState('');
  const [modelopen, setmodelopen] = useState(false);
  const [Edit, setEdit] = useState('');

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  useEffect(() => {
    // const initialGoogleConnection = async () => {
    //   gapi.load('client:auth2', {
    //     callback: () => {
    //       // Handle gapi.client initialization.
    //       gapi.client.setApiKey(process.env.REACT_APP_API_KEY);
    //       gapi.auth.authorize(
    //         {
    //           client_id: process.env.REACT_APP_CLIENT_ID,
    //           scope: process.env.REACT_APP_SCOPES,
    //           immediate: true,
    //         },
    //         handleAuthResult,
    //       );
    //     },
    //     onerror: function () {
    //       // Handle loading error.
    //       console.log('gapi.client failed to load!');
    //     },
    //     timeout: 5000, // 5 seconds.
    //     ontimeout: function () {
    //       // Handle timeout.
    //       console.log('gapi.client could not load in a timely manner!');
    //     },
    //   });
    // };
    // try {
    //   initialGoogleConnection();
    // } catch (error) {
    //   console.log('error: ', error);
    // }
  }, []);

  const handleAuthResult = (authResult) => {
    if (authResult && !authResult.error) {
      console.log('Sign-in successful1', authResult);
      console.log('Sign-in successful2', !authResult.error);
      console.log('Sign-in successful3', authResult.access_token);

      loadClient();
      profile();
    } else {
      console.error('handleAuthResult...');
      console.error(authResult);
    }
  };

  const select = () => {
    return gapi.auth.authorize(
      {
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: process.env.REACT_APP_SCOPES,
        immediate: false,
      },
      handleAuthResult,
    );
  };

  const profile = () => {
    const userprofile = gapi.auth2.getAuthInstance().currentUser.get();
    console.log('dfdfdf', userprofile);
    setIsAuthorizegoogle(true);
    setEmail(userprofile.wt.cu);
  };

  const loadClient = () => {
    return gapi.client.load('gmail', 'v1').then(
      (res) => {
        console.log('gapi client loaded for API');

        // getMessages();
      },
      (err) => {
        console.error('Error loading window.gapi client for API', err);
      },
    );
  };

  const EditMail = (Eval: string) => {
    setmodelopen(!modelopen);
    setEdit(Eval);
  };

  const disconnect = () => {
    setmodelopen(!modelopen);
    console.log('im work 1');
    setIsAuthorizegoogle(false);
    console.log('disconnect', gapi.auth2.getAuthInstance().disconnect());
  };

  //////outlook /////

  const outlookconfig = async () => {
    await instance
      .loginPopup({
        scopes: ['openid', 'profile', 'User.Read', 'Mail.Read'],
      })
      .then((res) => {
        console.log('res---------', res.account);
        setEmail(res.account.username);
        setAuthorizemail('outlook');
      })
      .catch((error) => {
        console.log('connection faild  error------', error);
      });

    //console.log('asasas', value);
    //setEmail(value.account.username);

    // instance .loginRedirect(loginRequest) .catch((error) => {
    //   console.log('error', error)});
  };

  const outlookdisconnect = async () => {
    // alert('logout');
    instance
      .logoutPopup({
        mainWindowRedirectUri: 'http://localhost:3000/account_setting/settings', // redirects the top level app after logout
        account: instance.getActiveAccount(),
      })
      .catch((error) => console.log(error));
  };

  const ChangeoutlookMail = async () => {
    // alert('change mail ');
    const value = instance
      .logoutPopup({
        mainWindowRedirectUri: 'http://localhost:3000/account_setting/settings', // redirects the top level app after logout
        account: instance.getActiveAccount(),
      })
      .catch((error) => console.log(error));
    console.log('sd', value);
    //setEmail(value.account.username);
  };

  return (
    <>
      {console.log('isAuthorizegoogle', isAuthorizegoogle)}
      <Text color="theme" size={16} bold>
        Email Integrations
      </Text>
      <Text>
        Choose which email address you want to use when sending emails from
        Recruitee
      </Text>
      <Flex row style={{ marginTop: '10px' }}>
        <Flex flex={3}>
          <AuthenticatedTemplate>
            <Card className={styles.selectCard}>
              <Flex end style={{ position: 'absolute', right: '10px' }}>
                <SvgTick />
              </Flex>
              <Flex row start className={styles.cardHeader}>
                <SvgoutlookMail />

                <Text
                  color="theme"
                  bold
                  size={16}
                  style={{ marginLeft: '10px' }}
                >
                  Outlook Mail
                </Text>
              </Flex>

              <Text style={{ marginTop: '10px' }}>Connected as</Text>
              <Text color="theme" style={{ marginTop: '1px' }}>
                {email}
              </Text>
              <Button
                className={styles.btn}
                onClick={() => EditMail('outlook')}
              >
                <Text color="theme">
                  <SvgEdit width={14} height={14} /> Edit Configuration
                </Text>
              </Button>
            </Card>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <Card className={styles.cardStruture}>
              <Flex row start className={styles.cardHeader}>
                <SvgoutlookMail />

                <Text
                  color="theme"
                  bold
                  size={16}
                  style={{ marginLeft: '10px' }}
                >
                  Outlook Mail
                </Text>
              </Flex>

              <Text style={{ marginTop: '10px' }}>
                Connect your inbox with Outlook Mail Service.
              </Text>

              <Button className={styles.btn} onClick={() => outlookconfig()}>
                <Text color="theme">Connect With Outlook</Text>
              </Button>
            </Card>
          </UnauthenticatedTemplate>
        </Flex>
        <Flex flex={3}>
          {isAuthorizegoogle === false ? (
            <>
              <Card className={styles.cardStruture}>
                <Flex row start className={styles.cardHeader}>
                  <SvgGmail />

                  <Text
                    color="theme"
                    bold
                    size={16}
                    style={{ marginLeft: '10px' }}
                  >
                    Google Mail
                  </Text>
                </Flex>

                <Text style={{ marginTop: '10px' }}>
                  Connect your inbox with Google Mail Service.
                </Text>

                <Button
                  disabled={Authorizemail === 'outlook' ? true : false}
                  className={styles.btn}
                  onClick={() => select()}
                >
                  <Text color="theme">Connect with Gmail</Text>
                </Button>
              </Card>
            </>
          ) : (
            <Card className={styles.cardStruture}>
              <Flex end style={{ position: 'absolute', right: '10px' }}>
                <SvgTick />
              </Flex>
              <Flex row start className={styles.cardHeader}>
                <SvgGmail />

                <Text
                  color="theme"
                  bold
                  size={16}
                  style={{ marginLeft: '10px' }}
                >
                  Outlook Mail
                </Text>
              </Flex>

              <Text style={{ marginTop: '10px' }}>Connected as</Text>
              <Text color="theme" style={{ marginTop: '1px' }}>
                {email}
              </Text>

              <Button className={styles.btn} onClick={() => EditMail('gmail')}>
                <Text color="theme">Edit Configuration</Text>
              </Button>
            </Card>
          )}
        </Flex>

        <Flex flex={8}></Flex>
      </Flex>
      <hr />

      <Modal open={modelopen}>
        <Flex className={styles.editmodal}>
          <Flex
            end
            style={{ marginRight: '15px' }}
            onClick={() => setmodelopen(!modelopen)}
          >
            <SvgClose
              width={12}
              height={12}
              fill={'581845'}
              cursor={'pointer'}
            />
          </Flex>

          {Edit === 'outlook' ? (
            <Flex>
              <Text color="theme" size={16} bold>
                {' '}
                Edit Configuration
              </Text>
              <Text>
                You have connected your Email with Outlook Mail Service.
              </Text>
              <Flex row start className={styles.modelheadder}>
                <SvgoutlookMail />
                <Card className={styles.outlookEmailcard}>
                  <Flex style={{ padding: '10px' }}>
                    <Flex>Connected as</Flex>
                    <Flex>
                      <Text color="theme">{email}</Text>
                    </Flex>
                  </Flex>
                </Card>
              </Flex>
              <Flex style={{ marginTop: '20px', color: '#581845' }}>
                Would you Like to do any of the following Actions?
              </Flex>
              <hr />
              <Flex style={{ marginRight: '15px' }} end>
                <span>
                  <Button
                    onClick={() => ChangeoutlookMail()}
                    style={{
                      paddingRight: '24px',
                      paddingLeft: '24px',
                    }}
                  >
                    Change
                  </Button>
                  <Button
                    className={styles.disconnectbtn}
                    types="secondary"
                    onClick={() => outlookdisconnect()}
                  >
                    Disconnect
                  </Button>
                </span>
              </Flex>
            </Flex>
          ) : (
            ''
          )}

          {Edit === 'gmail' ? (
            <Flex>
              <Text color="theme" size={16} bold>
                {' '}
                Edit Configuration
              </Text>
              <Text>
                You have connected your Email with Google Mail Service.
              </Text>
              <Flex row start className={styles.modelheadder}>
                <SvgGmail />
                <Card className={styles.outlookEmailcard}>
                  <Flex style={{ padding: '10px' }}>
                    <Flex>Connected as</Flex>
                    <Flex>
                      <Text color="theme">{email}</Text>
                    </Flex>
                  </Flex>
                </Card>
              </Flex>
              <Flex style={{ marginTop: '20px', color: '#581845' }}>
                Would you Like to do any of the following Actions?
              </Flex>
              <hr />
              <Flex style={{ marginRight: '15px' }} end>
                <span>
                  <Button
                    onClick={() => ChangeoutlookMail()}
                    style={{
                      paddingRight: '24px',
                      paddingLeft: '24px',
                    }}
                  >
                    Change
                  </Button>

                  <Button
                    className={styles.disconnectbtn}
                    types="secondary"
                    onClick={() => disconnect()}
                  >
                    Disconnect
                  </Button>
                </span>
              </Flex>
            </Flex>
          ) : (
            ''
          )}
        </Flex>
      </Modal>
    </>
  );
};

export default IntegrationScreen;
