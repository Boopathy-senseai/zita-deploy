// import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gapi } from 'gapi-script';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  MsalProvider,
} from '@azure/msal-react';

import { PublicClientApplication, EventType } from '@azure/msal-browser';
//import { loginRequest, msalConfig } from '../../../outlookmailConfig';
import {
  outlook_integrate,
  integrate_mail,
  outlook_remove,
  getEmail,
  gmail_integrate,
  google_remove,
} from '../../emailintegrationmodule/store/middleware/emailIntegrationMiddleWare';

import Modal from '../../../uikit/Modal/Modal';

import SvgGmail from '../../../icons/SvgGmailNew';

import SvgClose from '../../../icons/SvgClose';

import SvgoutlookMail from '../../../icons/SvgOutlookmail';
import SvgEdit from '../../../icons/SvgEdit';
import SvgTick from '../../../icons/SvgTickNew';
import {
  AppDispatch,
  RootState,
  //  RootState
} from '../../../store';
import { Button, Card, Flex, Text, Toast } from '../../../uikit';
import styles from './emailintegration.module.css';

type props = {
  loaderupdate: (val: any) => void;
};

const IntegrationScreen = ({ loaderupdate }: props) => {
  const dispatch: AppDispatch = useDispatch();

  const { instance } = useMsal();

  const [email, setEmail] = useState<string>('');
  const [Authorizemail, setAuthorizemail] = useState('');
  const [modelopen, setmodelopen] = useState(false);
  const [Edit, setEdit] = useState('');
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [loading, setLoading] = useState(false);

  const [gbutton, setgbutton] = useState(0);
  const [outbutton, setoutbutton] = useState(0);

  const integrate = useSelector(({ useremail }: RootState) => {
    return {
      email: useremail.email,
    };
  });

  const checkAuth = () => {
    dispatch(getEmail()).then((res) => {
      console.log('res', res);
      if (res.payload.email !== null && res.payload.account !== null) {
        if (res.payload.account === 'outlook') {
          setAuthorizemail('outlook');
          setgbutton(1);
          setoutbutton(1);
        } else if (res.payload.account === 'google') {
          setAuthorizemail('google');
          setoutbutton(1);
          setgbutton(1);
        }
      } else {
        setEmail('');
        setAuthorizemail('');
        setgbutton(0);
        setoutbutton(0);
      }
    });
  };

  useEffect(() => {
    checkAuth();
  }, [Authorizemail, outbutton, gbutton]);
  useEffect(() => {
    checkAuth();
  }, []);

  const handleAuthClick = () => {
    // loaderupdate(true);

    dispatch(gmail_integrate())
      .then((res) => {
        localStorage.setItem('integrate', 'Mail');
        console.log('res++++++++++=', res);
        // window.open(res.payload.url);
        setgbutton(1);
        setoutbutton(1);
        window.location.href = res.payload.url;
        checkAuth();
        loaderupdate(false);
        // Toast(' Google Mail Integrated Successfully', 'MEDIUM');
      })
      .catch((error) => {
        console.log('errror!!!!!!!!!!', error);
      });
  };

  const EditMail = (Eval: string) => {
    setmodelopen(!modelopen);
    setEdit(Eval);
  };

  const disconnect = () => {
    loaderupdate(true);
    dispatch(google_remove())
      .then((res) => {
        if (res.payload.delete === true) {
          setmodelopen(false);
          setEmail('');
          setAuthorizemail('');
          setgbutton(0);
          setoutbutton(0);
          loaderupdate(false);
        }
      })
      .catch((error) => {
        //  console.log('error');
        loaderupdate(false);
      });
  };

  //////outlook /////

  const outlookconfig = async () => {
    loaderupdate(true);
    dispatch(outlook_integrate())
      .then((res) => {
        if (res.payload.success === true) {
          localStorage.setItem('integrate', 'Mail');
          //Toast('Outlook Mail Integrated Successfully', 'MEDIUM');
          // checkAuth();
          // window.open(res.payload.authorization_url);
          setoutbutton(1);
          setgbutton(1);

          window.location.href = res.payload.authorization_url;
          checkAuth();
          loaderupdate(false);
        }
      })
      .catch((error) => {
        //  console.log('error');
        loaderupdate(false);
      });
  };

  const outlookdisconnect = async () => {
    loaderupdate(true);
    dispatch(outlook_remove())
      .then((res) => {
        if (res.payload.delete === true) {
          setmodelopen(false);
          setEmail('');
          setAuthorizemail('');
          setgbutton(0);
          setoutbutton(0);
          loaderupdate(false);
        }
      })
      .catch((error) => {
        //console.log('error', error);
        loaderupdate(false);
      });
  };

  const ChangeoutlookMail = async () => {
    // alert('change mail ');
    const value = instance
      .logoutPopup({
        mainWindowRedirectUri: 'http://localhost:3000/account_setting/settings', // redirects the top level app after logout
        account: instance.getActiveAccount(),
      })
      .catch((error) => console.log(error));
    // console.log('sd', value);
    //setEmail(value.account.username);
  };

  return (
    <>
      {/* {console.log('email', integrate.email)}
      {console.log('au', Authorizemail)}
      {console.log('ob', outbutton)}
      {console.log('gb', gbutton)} */}
      <Text color="theme" size={16} bold>
        Email Integrations
      </Text>
      <Text>
        Choose which email address you want to use when sending emails from
        Recruitee
      </Text>
      <Flex row style={{ marginTop: '10px' }}>
        <Flex flex={3} height={'unset'} minWidth={200} marginRight={20}>
          {Authorizemail === 'outlook' && email !== null && outbutton === 1 ? (
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
                {integrate.email}
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
                    <Text
                      color="theme"
                      style={{ marginLeft: '5px', cursor: 'pointer' }}
                    >
                      Edit Configuration
                    </Text>
                  </Flex>
                </Button>
              </Flex>
            </Card>
          ) : (
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
                  className={styles.btn}
                  disabled={outbutton === 1 ? true : false}
                  onClick={() => outlookconfig()}
                >
                  <Text color="theme">Connect With Outlook</Text>
                </Button>
              </Flex>
            </Card>
          )}
        </Flex>
        <Flex flex={3}>
          {Authorizemail === 'google' &&
          integrate.email !== null &&
          gbutton === 1 ? (
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
                {integrate.email}
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
                  onClick={() => EditMail('gmail')}
                >
                  <Flex row center className={styles.editButton}>
                    <SvgEdit width={14} height={14} />
                    <Text
                      color="theme"
                      style={{ marginLeft: '5px', cursor: 'pointer' }}
                    >
                      Edit Configuration
                    </Text>
                  </Flex>
                </Button>
              </Flex>
            </Card>
          ) : (
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
                  disabled={gbutton === 1 ? true : false}
                  className={styles.btn}
                  onClick={() => handleAuthClick()}
                >
                  <Text color="theme">Connect with Gmail</Text>
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
                      <Text color="theme">{integrate.email}</Text>
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
                      <Text color="theme">{integrate.email}</Text>
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
