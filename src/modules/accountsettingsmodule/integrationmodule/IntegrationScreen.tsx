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
import { GARY_1, GARY_4 } from '../../../uikit/Colors/colors';
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
  const [disconnectopen, setDisconnectopen] = useState(false);
  const [conflictopen, setConflictopen] = useState(false);

  const history = useHistory();
  const windowFeatures = 'left=100,top=100,width=320,height=320';
  const { email, events } = useSelector(
    ({ applicantIntegratemailReducers }: RootState) => {
      return {
        email:
          applicantIntegratemailReducers.email !== undefined
            ? applicantIntegratemailReducers.email[0]?.email
            : '',
        mail: applicantIntegratemailReducers?.mail,
        events: applicantIntegratemailReducers?.events,
      };
    },
  );

  const [tost, settost] = useState(false);

  const googleAuthHandler = () => {
    setLoginLoader(true);
    dispatch(googleCallApiMiddleware())
      .then((res) => {
        setLoginLoader(false);
        localStorage.setItem('integrate', 'calender');
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
          localStorage.setItem('integrate', 'calender');
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
    if (events === true) {
      setDisconnectopen(true);
    } else {
      dispatch(deleteGoogleMiddleware()).then((res) => {
        if (res.payload.delete === true) {
          setActive(0);
          setIsGoogle(2);
          setConnected(0);
        }
        setmodelopen(!modelopen);

        Toast('Google calendar Disconnected Successfully', 'SHORT', 'error');
      });
    }
  };
  const handleDisconnectGoogleCheck = () => {
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
    if (events === true) {
      setDisconnectopen(true);
    } else {
      dispatch(deleteOutlookMiddleware()).then((res) => {
        if (res.payload.delete === true) {
          setActive(0);
          setIsGoogle(2);
          setConnected(0);
        }
        setmodelopen(!modelopen);

        Toast('Outlook calendar Disconnected Successfully', 'SHORT', 'error');
      });
    }
  };
  const handleDisconnectCheck = () => {
    // setDisconnectopen(false);
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
        <Flex row between>
        <Flex><Text size={14} bold>
          Calendar Integration
        </Text>
        <Text>Integrate your calendar with zita to schedule your meetings</Text></Flex>
        <Flex>{active ? (
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
          )}</Flex></Flex>
        

        <Flex row marginTop={10}>
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
                  Outlook Calendar
                  </Text>
                </Flex>

                <Text style={{ marginTop: '10px' }}>Connected as</Text>
                <Text color="theme" style={{ marginTop: '1px' }}>
                  {email}
                </Text>

                <Flex className={styles.borderbottom1}></Flex>
                <Button className={styles.btn} onClick={() => disconnectfun()}>
                  <Flex row center style={{ cursor: 'pointer' }}>
                    <SvgEdit width={12} height={12} fill="#581845" />
                    <Text color="theme" bold style={{ marginLeft: '5px' }}>
                      Edit Configuration
                    </Text>
                  </Flex>
                </Button>
              </Card>
            ) : (
              // Calendar Integration outlook mail out box
              <Card className={styles.cardStruture}>
                <Flex row start className={styles.cardHeader}>
                  <SvgOutlookcalendar></SvgOutlookcalendar>
                  {/* {  Toast('Outlook google Integrated Successfully', 'MEDIUM')   } */}
                  <Text bold size={14} style={{ marginLeft: '10px' }}>
                  Outlook Calendar
                  </Text>
                </Flex>

                <Text style={{ marginTop: '10px' }}>
                Connect your calendar with Outlook Calendar Service.
                </Text>
                <Flex className={styles.borderbottom1}></Flex>

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
                    // color="theme"
                    bold
                    size={14}
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
                {/* google calendar outview box edit*/}
                <Flex className={styles.borderbottom1}></Flex>
                <Button className={styles.btn} onClick={() => disconnectfun()}>
                  <Flex row center style={{ cursor: 'pointer' }}>
                    <SvgEdit width={12} height={12} fill={'#581845'} />
                    <Text color="theme" bold style={{ marginLeft: '5px' }}>
                      Edit Configuration
                    </Text>
                  </Flex>
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
                Connect your calendar with Google Calendar Service.
                </Text>
                <Flex className={styles.borderbottom1}></Flex>
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
      </Flex>

      <Modal open={modelopen}>
        <Flex className={styles.editmodal}>
          {/* <Flex end onClick={() => setmodelopen(!modelopen)}>
            <SvgClose width={10} height={10} fill={'#888888'} />
          </Flex> */}
          {connected === 1 && active === 1 && isGoogle === 0 ? (
            <>
              {disconnectopen === true ? (
                <>
                  <Flex end onClick={() => setmodelopen(!modelopen)}>
                    <SvgClose width={10} height={10} fill={'#888888'} />
                  </Flex>
                  <Flex>
                    <Text size={13} style={{ marginTop: '5px' }}>
                      If you disconnect, your slotters will be inactivated and
                      candidate will not be able to pick slots for the
                      interviews.
                    </Text>
                  </Flex>
                </>
              ) : (
                <Flex>
                  <Flex row center between>
                    <Flex row center>
                      <SvgEdit fill={'#333333'} width={12} height={12} />
                      <Text size={14} bold style={{ marginLeft: '5px' }}>
                        Edit Configuration
                      </Text>
                    </Flex>
                    <Flex end onClick={() => setmodelopen(!modelopen)}>
                      <SvgClose width={10} height={10} fill={'#888888'} />
                    </Flex>
                  </Flex>
                  <div className={styles.borderbottom}> </div>
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
                    Would you Like to do any of the following actions?
                  </Flex>
                  <Flex
                    style={{
                      borderBottom: '1px solid #c3c3c3',
                      margin: '20px 0px',
                    }}
                  ></Flex>
                </Flex>
              )}
              <Flex>
                {disconnectopen === true ? (
                  <Button
                    className={styles.okButton}
                    onClick={() => handleDisconnectCheck()}
                  >
                    OK
                  </Button>
                ) : (
                  <Flex end>
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
                )}
              </Flex>
            </>
          ) : (
            ''
          )}

          {connected === 1 && active === 1 && isGoogle === 1 ? (
            <>
              {disconnectopen === true ? (
                <>
                  <Flex end onClick={() => setmodelopen(!modelopen)}>
                    <SvgClose width={10} height={10} fill={'#888888'} />
                  </Flex>
                  <Flex>
                    <Text size={13} style={{ marginTop: '5px' }}>
                      If you disconnect, your slotters will be inactivated and
                      candidate will not be able to pick slots for the
                      interviews.
                    </Text>
                  </Flex>
                </>
              ) : (
                <Flex>
                  {/* <Flex className={styles.borderbottom}></Flex> */}
                  <Flex row center between>
                    <Flex row center>
                      <SvgEdit fill={'#333333'} width={12} height={12} />
                      <Text size={14} bold style={{ marginLeft: '5px' }}>
                        Edit Configuration
                      </Text>
                    </Flex>
                    <Flex end onClick={() => setmodelopen(!modelopen)}>
                      <SvgClose width={10} height={10} fill={'#888888'} />
                    </Flex>
                  </Flex>
                  <div className={styles.borderbottom1}></div>
                  <Text size={13} style={{ marginTop: '5px' }}>
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
                  <Flex style={{ marginTop: '20px' }}>
                    Would you Like to do any of the following actions?
                  </Flex>
                  <Flex
                    style={{
                      borderBottom: '1px solid #c3c3c3',
                      margin: '20px 0px',
                    }}
                  ></Flex>
                </Flex>
              )}
              <Flex>
                {disconnectopen === true ? (
                  <Button
                    className={styles.okButton}
                    onClick={() => handleDisconnectGoogleCheck()}
                  >
                    OK
                  </Button>
                ) : (
                  <Flex end>
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
                )}
              </Flex>
            </>
          ) : (
            ''
          )}
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
          <Button onClick={Configuration}>
            <Flex row center className={styles.pointer}>
              <Text bold style={{ cursor: 'pointer', color: '#fff' }}>
                Calendar Configurations
              </Text>
            </Flex>
          </Button>

          {/* <SvgDotMenu fill={'#black'} height={14} width={14} /> */}
        </Dropdown.Toggle>
        {/* { connected === 1 && active === 1 ? ( */}
        {/* <Dropdown.Menu>
          <Dropdown.Item onClick={Configuration}>
            <Flex row center className={styles.pointer}>
              <Text style={{ cursor: 'pointer' }}>Calendar Configurations</Text>
            </Flex>
          </Dropdown.Item>
        </Dropdown.Menu> */}
      </Dropdown>
    </Flex>
  );
};

export default IntegrationScreen;
