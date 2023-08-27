import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
  // useSelector
} from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import SvgGmail from '../../../icons/SvgGmail';
import SvgDotMenu from '../../../icons/SvgDotMenu';
import SvgEdit from '../../../icons/SvgEdit';
import SvgTick from '../../../icons/SvgTick';
import SvgOutlook from '../../../icons/SvgOutlook';
import SvgClose from '../../../icons/SvgClose';
import SvgOutlookcalendar from '../../../icons/SvgOutlookcalendar';
import SvgGooglecalendar from '../../../icons/SvgGooglecalendar';
import {
  AppDispatch,
  RootState,
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
import {
  // addOauthMiddleware,
  outlookCallApiMiddleware,
  checkAuthMiddleware,
  googleCallApiMiddleware,
  IntergratemailMiddleWare,
} from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';

import { getEmail } from '../../emailintegrationmodule/store/middleware/emailIntegrationMiddleWare';

import Email from './Emailintegration';

import styles from './integrationscreen.module.css';

import {
  deleteOutlookMiddleware,
  deleteGoogleMiddleware,
} from './store/middleware/integrationmiddleware';
import CalenderConfig from './calendarconfigurations/calendarconfig';

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
  const [disconnectopen, setDisconnectopen] = useState(true);
  const [conflictopen, setConflictopen] = useState(false);

  const history = useHistory();
  const windowFeatures = 'left=100,top=100,width=320,height=320';
  const { email } = useSelector(
    ({ applicantIntegratemailReducers }: RootState) => {
      return {
        email:
          applicantIntegratemailReducers.email !== undefined
            ? applicantIntegratemailReducers.email[0]?.email
            : '',
        mail: applicantIntegratemailReducers?.mail,
      };
    },
  );

  const [tost, settost] = useState(false);

  const googleAuthHandler = () => {
    setLoginLoader(true);
    dispatch(googleCallApiMiddleware())
      .then((res) => {
        setLoginLoader(false);
        window.location.href = res.payload.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const integrationSuccess = localStorage.getItem('integrationSuccess');
  const msAuthHandler = () => {
    setLoginLoader(true);

    dispatch(outlookCallApiMiddleware())
      .then((res) => {
        if (res.payload.success === true) {
          setLoginLoader(false);
          window.location.href = res.payload.authorization_url;
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
    // setConflictopen(true)
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
    // setConflictopen(true)
    // Toast('Details saved successfully', 'LONG');
  };

  // google disconnect button function
  const handleDisconnectGoogle = () => {
    dispatch(deleteGoogleMiddleware()).then((res) => {
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
    setDisconnectopen(true);
    dispatch(deleteOutlookMiddleware()).then((res) => {
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
    dispatch(IntergratemailMiddleWare());
    dispatch(checkAuthMiddleware())
      .then((res) => {
        if (res.payload.status === true) {
          if (res.payload.account === 'google') {
            setIsGoogle(1);
            setConnected(1);
          } else {
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
  function Configuration() {
    setConflictopen(true);
  }

  function CloseConfiguration() {
    setConflictopen(false);
  }

  return (
    <Flex className={styles.overAll}>
      <Email loaderupdate={loaderupdate} />
      {isLoginLoader && <Loader />}
      <Flex columnFlex>
        <Text size={14} bold>
          Calendar Integration
        </Text>
        <Text>Integrate your calendar with zita to schedule your meetings</Text>

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
                  {integrationSuccess === 'true' &&
                    Toast('Outlook Calendar Integrated Successfully', 'SHORT')}

                  {integrationSuccess === 'true' &&
                    localStorage.removeItem('integrationSuccess')}
                  <Text bold size={14} style={{ marginLeft: '10px' }}>
                    Outlook Mail
                  </Text>
                </Flex>

                <Text style={{ marginTop: '10px' }}>Connected as</Text>
                <Text color="theme" style={{ marginTop: '1px' }}>
                  {email}
                </Text>

                <Flex className={styles.borderbottom}></Flex>
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
                  {/* {  Toast('Outlook google Integrated Successfully', 'MEDIUM')   } */}
                  <Text bold size={14} style={{ marginLeft: '10px' }}>
                    Outlook Mail
                  </Text>
                </Flex>

                <Text style={{ marginTop: '10px' }}>
                  Connect your inbox with Outlook Calendar Service.
                </Text>
                <Flex className={styles.borderbottom}></Flex>

                {connected === 1 && active === 1 && isGoogle === 1 ? (
                  <Button
                    className={styles.btn}
                    onClick={() => handleOutlookRadio()}
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
                {integrationSuccess === 'true' &&
                  Toast('Google Calendar Integrated Successfully', 'SHORT')}

                {integrationSuccess === 'true' &&
                  localStorage.removeItem('integrationSuccess')}
                <Flex end style={{ position: 'absolute', right: '10px' }}>
                  <SvgTick />
                </Flex>
                {/* {      Toast('Google Calender Integrated Successfully', 'MEDIUM') } */}
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
                  {email}
                </Text>

                {/* {modelopen===false&&
                 Toast('Google calendar Integrated Successfully', 'MEDIUM')
                } */}
                <Flex className={styles.borderbottom}></Flex>
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

                  <Text bold size={14} style={{ marginLeft: '10px' }}>
                    Google Calendar
                  </Text>
                </Flex>

                <Text style={{ marginTop: '10px' }}>
                  Connect your inbox with Google calendar Service.
                </Text>
                <Flex className={styles.borderbottom}></Flex>
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
          {active ? (
            <>
              <Flex row end>
                <ActionsButton
                  Configuration={Configuration}
                  connected={connected}
                  active={active}
                />
              </Flex>
            </>
          ) : (
            ''
          )}
        </Flex>
      </Flex>

      <Modal open={modelopen}>
        <Flex className={styles.editmodal}>
          <Flex
            end
            style={{ marginRight: '15px' }}
            onClick={() => setmodelopen(!modelopen)}
          >
            <SvgClose width={10} height={10} fill={'#888888'} />
          </Flex>
          {connected === 1 && active === 1 && isGoogle === 0 ? (
            <Flex>
              <Flex row center>
                <SvgEdit fill={'#333333'} width={13} height={13} />
                <Text size={14} bold style={{ marginLeft: '5px' }}>
                  Edit Configuration
                </Text>
              </Flex>
              <Text size={13} style={{ marginTop: '5px' }}>
                You have connected your Email with Outlook Mail Service.
              </Text>
              <Flex row start className={styles.modelheadder}>
                <SvgOutlookcalendar></SvgOutlookcalendar>
                <Card className={styles.outlookEmailcard}>
                  <Flex style={{ padding: '10px' }}>
                    <Flex>Connected as</Flex>
                    <Flex>
                      <Text color="theme">{email}</Text>
                    </Flex>
                  </Flex>
                </Card>
              </Flex>
              <Flex style={{ marginTop: '20px' }}>
                Would you Like to do any of the following Actions?
              </Flex>
              <hr />
              <Flex style={{ marginRight: '15px' }} end>
                <span>
                  <Button
                    onClick={() => msAuthHandler()}
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
                    onClick={() => handleDisconnectOutlook()}
                  >
                    Disconnect
                  </Button>
                </span>
              </Flex>
            </Flex>
          ) : (
            ''
          )}

          {connected === 1 && active === 1 && isGoogle === 1 ? (
            <Flex>
              <Flex className={styles.borderbottom}></Flex>
              <Text color="theme" size={16} bold>
                {' '}
                <SvgEdit width={14} height={14} /> Edit Configuration
              </Text>
              <Text>
                You have connected your Email with Google Mail Service.
              </Text>
              <Flex row start className={styles.modelheadder}>
                <SvgGooglecalendar></SvgGooglecalendar>
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
                    onClick={() => googleAuthHandler()}
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
                    onClick={() => handleDisconnectGoogle()}
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

      <Modal open={disconnectopen}>
        <Flex className={styles.editmodal} >
          <Text size={13}>
            If you disconnect, your slotters will be inactivated and candidate
            will not be able to pick slots for the interviews.
          </Text>
          <Button className={styles.okButton} onClick={()=> setDisconnectopen(false)}>OK</Button>
        </Flex>
      </Modal>

      {connected === 1 && active === 1 ? (
        <Modal open={conflictopen} onClose={close}>
          <CalenderConfig
            isGoogle={isGoogle}
            email={email}
            CloseConfiguration={CloseConfiguration}
          />
        </Modal>
      ) : (
        ''
      )}
    </Flex>
  );
};

interface ActionButtonProps {
  Configuration: () => void;
  connected: number;
  active: number;
}

const ActionsButton: React.FC<ActionButtonProps> = ({
  Configuration,
  connected,
  active,
}) => {
  function BtnClick() {
    // alert("BtnClick")
  }
  return (
    <Flex>
      <Dropdown>
        <Dropdown.Toggle
          style={{
            borderColor: 'unset',
            backgroundColor: 'unset',
            boxShadow: 'none',
            cursor: 'pointer',
          }}
          id="dropdown-basic"
          // onClick={BtnClick }
        >
          <SvgDotMenu fill={'#black'} height={14} width={14} />
        </Dropdown.Toggle>
        {/* { connected === 1 && active === 1 ? ( */}
        <Dropdown.Menu>
          <Dropdown.Item onClick={Configuration}>
            <Flex row center className={styles.pointer}>
              <Text style={{ cursor: 'pointer' }}>Calendar Configurations</Text>
            </Flex>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Flex>
  );
};

export default IntegrationScreen;
