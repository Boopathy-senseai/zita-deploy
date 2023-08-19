import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import SvgGmail from '../../../icons/SvgGmail';
import SvgEdit from '../../../icons/SvgEdit';
import SvgTick from '../../../icons/SvgTick';
import SvgOutlook from '../../../icons/SvgOutlook';
import SvgClose from '../../../icons/SvgClose';
import SvgOutlookcalendar from '../../../icons/SvgOutlookcalendar';
import SvgGooglecalendar from '../../../icons/SvgGooglecalendar';
import {
  AppDispatch,
  //  RootState
} from '../../../store';
import {
  Button,
  Card,
  Flex,
  InputRadio,
  LinkWrapper,
  Loader,
  Modal,
  Text,
  Toast,
} from '../../../uikit';
// import { isEmpty } from '../../../uikit/helper';
// import Toast from '../../../uikit/Toast/Toast';
// import { config } from '../../constValue';
import {
  // addOauthMiddleware,
  outlookCallApiMiddleware,
  checkAuthMiddleware,
  googleCallApiMiddleware,
} from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';

import { getEmail } from '../../emailintegrationmodule/store/middleware/emailIntegrationMiddleWare';

import Email from './Emailintegration';

import styles from './integrationscreen.module.css';

// import MicrosoftLogin from './microSoftLogin/MicrosoftLogin';
import {
  deleteOutlookMiddleware,
  deleteGoogleMiddleware,
} from './store/middleware/integrationmiddleware';
// import { GoogleLogin } from './googleLogin/index';
// var querystring = require('qs');

export const googleApiKey = 'AIzaSyC4DoRmvUsYtcQWa2PkMzjEbf1BQpAnlok';

export const googleClientId =
  '836461204453-ukhhuh2fku1j0n0rep5cp1ops5mt1hei.apps.googleusercontent.com';

export const clientSecret = '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';

const IntegrationScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  // const [showLogin, setLogin] = useState<any>(null);
  const [isMail, setMail] = useState('');
  // const [isChange, setChange] = useState(false);
  const [isLoginLoader, setLoginLoader] = useState(false);
  const [modelopen, setmodelopen] = useState(false);

  const googleAuthHandler = () => {
    setLoginLoader(true);

    dispatch(googleCallApiMiddleware())
      .then((res) => {
        setLoginLoader(false);
        console.log('googlecallApi,', res);
        setConnected(1);
        setIsGoogle(1);
        setActive(1);
        window.open(res.payload.url);
        Toast('Outlook google Integrated Successfully', 'MEDIUM');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const msAuthHandler = () => {
    setLoginLoader(true);

    dispatch(outlookCallApiMiddleware())
      .then((res) => {
        console.log('outlookintegration', res);
        if (res.payload.success === true) {
          setLoginLoader(false);
          setConnected(1);
          setIsGoogle(0);
          setActive(1);
          Toast('Outlook calendar Integrated Successfully', 'MEDIUM');
          window.open(res.payload.authorization_url);
          console.log('outlookcallApi', outlookCallApiMiddleware());
        }
      })
      .catch((err) => {
        console.error('outlookCallApiMiddleware ', err);
      });
  };
  // google radio button function
  const handleGoogleRadio = () => {
    googleAuthHandler();
    setActive(1);
    setIsGoogle(1);
    if (connected && isGoogle === 0) {
      setConnected(0);
      setIsGoogle(1);
    }
  };
  const disconnectfun = () => {
    setmodelopen(!modelopen);

    // Toast('Details not saved', 'LONG', 'error');
  };

  // outlook radio button function
  const handleOutlookRadio = () => {
    msAuthHandler();
    setActive(1);
    setIsGoogle(0);
    if (connected && isGoogle === 1) {
      setConnected(0);
      setIsGoogle(0);
    }
    // Toast('Details saved successfully', 'LONG');
  };

  // google disconnect button function
  const handleDisconnectGoogle = () => {
    dispatch(deleteGoogleMiddleware()).then((res) => {
      console.log(res);
      if (res.payload.delete === true) {
        setActive(0);
        setIsGoogle(2);
        setConnected(0);
      }
      setmodelopen(!modelopen);

      Toast('Google calendar Disconnected Successfully', 'SHORT', 'error');
    });
  };

  // outlook disconnect button function
  const handleDisconnectOutlook = () => {
    dispatch(deleteOutlookMiddleware()).then((res) => {
      console.log(res);
      if (res.payload.delete === true) {
        setActive(0);
        setIsGoogle(2);
        setConnected(0);
      }
      setmodelopen(!modelopen);

      Toast('Outlook calendar Disconnected Successfully', 'SHORT', 'error');
    });
  };

  const [isGoogle, setIsGoogle] = useState(0);
  const [active, setActive] = useState(0);
  const [connected, setConnected] = useState(0);
  const checkAuth = () => {
    dispatch(checkAuthMiddleware())
      .then((res) => {
        if (res.payload.status === true) {
          console.log(res.payload);
          if (res.payload.account === 'google') {
            console.log('inside if');
            setIsGoogle(1);
            setConnected(1);
          } else {
            console.log('inside else');
            setIsGoogle(0);
            setConnected(1);
          }
          setActive(1);
        } else {
          setActive(0);
          setIsGoogle(2);
        }
      })
      .catch(() => {
        console.log('Error');
      });
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const loaderupdate = (val) => {
    setLoginLoader(val);
  };

  function outlookconfig(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Flex className={styles.overAll}>
      <Email loaderupdate={loaderupdate} />
      {isLoginLoader && <Loader />}
      <Flex columnFlex>
        <Text size={16} bold style={{ color: '#581845' }}>
          Calendar Integration
        </Text>
        <Text>Integrate your calendar with zita to schedule your meetings</Text>

        {/* <Flex row center className={styles.radioContainer}>
          <Flex
            onClick={handleOutlookRadio}
            disabled={connected === 1}
            row
            center
            className={styles.outlookFlex}
          >
            {active === 1 && isGoogle === 0 ? (
              <InputRadio checked={true} />
            ) : (
              <InputRadio checked={false} />
            )}
            <div className={styles.gmailSvg}>
              <SvgOutlook height={16} width={16} />
            </div>
            <Text>Outlook Calendar</Text>
          </Flex>
          <Flex
            row
            center
            onClick={handleGoogleRadio}
            disabled={connected === 1}
          >
            {active === 1 && isGoogle === 1 ? (
              <InputRadio checked={true} />
            ) : (
              <InputRadio checked={false} />
            )}
            <div className={styles.gmailSvg}>
              <SvgGmail height={16} width={16} />
            </div>
            <Text>Google Calendar</Text>
          </Flex>
        </Flex> */}
        <Flex row marginTop={20}>
          <Flex flex={3}>
            {connected === 1 && active === 1 && isGoogle === 0 ? (
              <Card className={styles.selectCard}>
                <Flex end style={{ position: 'absolute', right: '10px' }}>
                  <SvgTick />
                </Flex>
                <Flex row start className={styles.cardHeader}>
                  {/* <SvgOutlookMail /> */}
                  <SvgOutlookcalendar></SvgOutlookcalendar>

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
                  {/* {email} */}
                </Text>
                {/* {modelopen===false&&
                 Toast('Outlook calendar Integrated Successfully', 'MEDIUM')
                } */}
                <Button className={styles.btn} onClick={() => disconnectfun()}>
                  <Text color="theme" bold>
                    <SvgEdit width={14} height={14} /> Edit Configuration
                  </Text>
                </Button>
              </Card>
            ) : (
              <Card className={styles.cardStruture}>
                <Flex row start className={styles.cardHeader}>
                  <SvgOutlookcalendar></SvgOutlookcalendar>

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
                  Connect your inbox with Outlook Calendar Service.
                </Text>
                {connected === 1 && active === 1 && isGoogle === 1 ? (
                  <Button
                    className={styles.btn}
                    onClick={() => handleOutlookRadio()}
                    disabled
                  >
                    <Text style={{ color: '#581845' }} bold>
                      Connect With Outlook
                    </Text>
                  </Button>
                ) : (
                  <Button
                    className={styles.btn}
                    onClick={() => handleOutlookRadio()}
                  >
                    <Text style={{ color: '#581845' }} bold>
                      Connect With Outlook
                    </Text>
                  </Button>
                )}
              </Card>
            )}
          </Flex>
          <Flex flex={3}>
            {connected === 1 && active === 1 && isGoogle === 1 ? (
              <Card className={styles.selectCard}>
                <Flex end style={{ position: 'absolute', right: '10px' }}>
                  <SvgTick />
                </Flex>
                <Flex row start className={styles.cardHeader}>
                  {/* <SvgOutlookMail /> */}
                  <SvgGooglecalendar></SvgGooglecalendar>

                  <Text
                    color="theme"
                    bold
                    size={16}
                    style={{ marginLeft: '10px' }}
                  >
                    Google Calendar
                  </Text>
                </Flex>

                <Text style={{ marginTop: '10px' }}>Connected as</Text>
                <Text color="theme" style={{ marginTop: '1px' }}>
                  {/* {email} */}
                </Text>

                {/* {modelopen===false&&
                 Toast('Google calendar Integrated Successfully', 'MEDIUM')
                } */}
                <Button className={styles.btn} onClick={() => disconnectfun()}>
                  <Text color="theme" bold>
                    <SvgEdit width={14} height={14} /> Edit Configuration
                  </Text>
                </Button>
              </Card>
            ) : (
              <Card className={styles.cardStruture}>
                <Flex row start className={styles.cardHeader}>
                  <SvgGooglecalendar></SvgGooglecalendar>

                  <Text
                    color="theme"
                    bold
                    size={16}
                    style={{ marginLeft: '10px' }}
                  >
                    Google Calendar
                  </Text>
                </Flex>

                <Text style={{ marginTop: '10px' }}>
                  Connect your inbox with Google calendar Service.
                </Text>
                {connected === 1 && active === 1 && isGoogle === 0 ? (
                  <Button
                    className={styles.btn}
                    onClick={() => handleGoogleRadio()}
                    disabled
                  >
                    <Text style={{ color: '#581845' }} bold>
                      Connect With Google
                    </Text>
                  </Button>
                ) : (
                  <Button
                    className={styles.btn}
                    onClick={() => handleGoogleRadio()}
                  >
                    <Text style={{ color: '#581845' }} bold>
                      Connect With Google
                    </Text>
                  </Button>
                )}
              </Card>
            )}
          </Flex>
          <Flex flex={9}></Flex>
        </Flex>

        {/* {connected === 1 && active === 1 && isGoogle === 0 && (
          <Flex columnFlex>
            <Flex row center>
              <Text>Connected account {isMail}</Text> */}
        {/* <MicrosoftLogin
                prompt="select_account"
                clientId={msClientId}
                authCallback={msAuthHandler}
                redirectUri={redirectUri}
                graphScopes={graphScopes}
              >
                <Button types="link" className={styles.changeBtn}>
                  Change
                </Button>
              </MicrosoftLogin> */}
        {/* <Button types="link" onClick={msAuthHandler}>
                Change
              </Button>
              <Button types="link" onClick={handleDisconnectOutlook}>
                Disconnect
              </Button>
            </Flex>
            <Flex row center className={styles.dashboardFlex}>
              <Text>View your events in</Text>
              <LinkWrapper to="/">
                <Text bold color="link" className={styles.dashBoardText}>
                  My Dashboard
                </Text>
              </LinkWrapper>
            </Flex>
          </Flex> 
        )}*/}

        {connected === 1 && active === 1 && isGoogle === 1 && (
          <Flex columnFlex>
            <Flex row center>
              <Text>Connected account {isMail}</Text>
              <div className={styles.changeGoogleBtn}>
                {/* <GoogleLogin
                  disabled={false}
                  accessType="online"
                  clientId={googleClientId}
                  buttonText="Change"
                  onSuccess={googleAuthHandler}
                  onFailure={(res) => console.log('onFailure', res)}
                  icon={false}
                  scope={'https://www.googleapis.com/auth/calendar.events'}
                /> */}
                <Button types="link" onClick={googleAuthHandler}>
                  Change
                </Button>
              </div>
              <Button types="link" onClick={handleDisconnectGoogle}>
                Disconnect
              </Button>
            </Flex>
            <Flex row center className={styles.dashboardFlex}>
              <Text>View your events in</Text>
              <LinkWrapper to="/">
                <Text bold color="link" className={styles.dashBoardText}>
                  My Dashboard
                </Text>
              </LinkWrapper>
            </Flex>
          </Flex>
        )}
      </Flex>

      {/* </Card> */}
    </Flex>
  );
};

export default IntegrationScreen;
