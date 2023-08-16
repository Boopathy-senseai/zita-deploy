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
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    const initialGoogleConnection = async () => {
      await gapi.load('client:auth2', {
        callback: () => {
          // Handle gapi.client initialization.
          gapi.client.setApiKey(process.env.REACT_APP_API_KEY);
          gapi.auth.authorize(
            {
              client_id: process.env.REACT_APP_CLIENT_ID,
              scope: process.env.REACT_APP_SCOPES,
              immediate: true,
            },
            handleAuthResult,
          );
        },
        onerror: function () {
          // Handle loading error.
          console.log('gapi.client failed to load!');
        },
        timeout: 5000, // 5 seconds.
        ontimeout: function () {
          // Handle timeout.
          console.log('gapi.client could not load in a timely manner!');
        },
      });
    };

    try {
      initialGoogleConnection();
    } catch (error) {
      console.log('error: ', error);
    }

    setLoading(false);
    // eslint-disable-next-line
  }, []);

  const handleAuthResult = (authResult) => {
    console.log(authResult);
    if (authResult && !authResult.error) {
      console.log('Sign-in successful');
      // setIsAuthorize(true);
      //setAuthorizemail('google');
      // localStorage.setItem('integrate', 'google');
      loadClient();
      profile();
    } else {
      console.error('handleAuthResult...');
      console.error(authResult);
    }
    setLoading(false);
  };

  const handleAuthClick = () => {
    setLoading(true);
    return gapi.auth.authorize(
      {
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: process.env.REACT_APP_SCOPES,
        immediate: false,
      },
      handleAuthResult,
    );
  };

  const loadClient = () => {
    return gapi.client.load('gmail', 'v1').then(
      (res) => {
        console.log('gapi client loaded for API', res);
        setIsAuthorize(true);
        // getMessages();
      },
      (err) => {
        console.error('Error loading window.gapi client for API', err);
      },
    );
  };

  const profile = () => {
    const userprofile = gapi.auth2.getAuthInstance().currentUser.get();
    console.log('dfdfdf', userprofile.wt.cu);
    setEmail(userprofile.wt.cu);
    setIsAuthorizegoogle(true);
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
        console.log('res++++', res);
        setEmail(res.account.username);
        setAuthorizemail('outlook');
        localStorage.setItem('integrate', 'outlook');
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
      {console.log('email', email)}
      <Text color="theme" size={16} bold>
        Email Integrations
      </Text>
      <Text>
        Choose which email address you want to use when sending emails from
        Recruitee
      </Text>
      <Flex row style={{ marginTop: '10px' }}>
        <Flex flex={3} height={'unset'} minWidth={200} marginRight={20}>
          <AuthenticatedTemplate>
            <Card className={styles.cardStruture}>
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
              <Flex
                marginTop={10}
                style={{
                  borderTop: '1px solid #c3c3c3',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Button
                  className={styles.btn}
                  onClick={() => EditMail('outlook')}
                >
                  <Flex row center className={styles.editButton}>
                    <SvgEdit width={14} height={14} />
                    <Text color="theme" style={{ marginLeft: '5px' }}>
                      Edit Configuration
                    </Text>
                  </Flex>
                </Button>
              </Flex>
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
              <Flex
                column
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginTop: 10,
                  borderTop: '1px solid #c3c3c3',
                }}
              >
                <Button
                  disabled={Authorizemail === 'google' ? true : false}
                  className={styles.btn}
                  onClick={() => outlookconfig()}
                >
                  <Text color="theme">Connect With Outlook</Text>
                </Button>
              </Flex>
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
                <Flex
                  column
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    marginTop: 10,
                    borderTop: '1px solid #c3c3c3',
                  }}
                >
                  <Button
                    disabled={Authorizemail === 'outlook' ? true : false}
                    className={styles.btn}
                    onClick={() => handleAuthClick()}
                  >
                    <Text color="theme">Connect with Gmail</Text>
                  </Button>
                </Flex>
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
              {/* <Flex
                marginTop={10}
                style={{
                  borderTop: '1px solid #c3c3c3',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Button
                  className={styles.btn}
                  onClick={() => EditMail('outlook')}
                >
                  <Flex row center className={styles.editButton}>
                    <SvgEdit width={14} height={14} />
                    <Text color="theme" style={{ marginLeft: '5px' }}>
                      Edit Configuration
                    </Text>
                  </Flex>
                </Button>
              </Flex> */}
              <Flex
                marginTop={10}
                style={{
                  borderTop: '1px solid #c3c3c3',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Button
                  className={styles.btn}
                  onClick={() => EditMail('gmail')}
                >
                  <Flex row center className={styles.editButton}>
                    <SvgEdit width={14} height={14} />
                    <Text color="theme" style={{ marginLeft: '5px' }}>
                      Edit Configuration
                    </Text>
                  </Flex>
                </Button>
              </Flex>
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
