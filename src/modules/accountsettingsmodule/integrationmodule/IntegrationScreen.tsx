import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import SvgGmail from '../../../icons/SvgGmail';

import SvgOutlook from '../../../icons/SvgOutlook';

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
  Text,
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
import Email from './Emailintegration';

import styles from './integrationscreen.module.css';

// import MicrosoftLogin from './microSoftLogin/MicrosoftLogin';
import {
  // calenderTokenMiddleWare,
  // googleEventMiddleWare,
  // msEventMiddleWare,
  // calenderTokenDeleteMiddleWare,
  // calenderTokenGetMiddleWare,
  // msEventMiddleWareMe,
  deleteOutlookMiddleware,
  deleteGoogleMiddleware,
} from './store/middleware/integrationmiddleware';

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
  console.log(setMail);
  // initial api call
  // useEffect(() => {
  //   dispatch(calenderTokenGetMiddleWare()).then((res) => {
  //     if (!isEmpty(res.payload.outlook) && res.payload.outlook.length !==0) {
  //       setMail(res.payload.outlook[0].email);
  //       if (!isEmpty(res.payload.outlook[0].email)) {
  //         setLogin(false);
  //         setChange(false);
  //       }

  //     }
  //     if (!isEmpty(res.payload.google) && res.payload.google.length !==0) {
  //       setMail(res.payload.google[0].email);
  //       if (!isEmpty(res.payload.google[0].email)) {
  //         setLogin(true);
  //         setChange(false);
  //       }
  //     }
  //   });
  // }, []);

  // const { outlook, google } = useSelector(
  //   ({ integrationReducers }: RootState) => {
  //     return {
  //       outlook: integrationReducers.outlook,
  //       google: integrationReducers.google,
  //     };
  //   },
  // );

  // outlook login function
  // const msAuthHandler = (_a: any, data: any) => {
  //   if(typeof data !== 'undefined'){
  //   setLoginLoader(true);
  //   console.log("data",data)
  //   dispatch(msEventMiddleWare({ accessToken: data.accessToken })).then(
  //     (res) => {
  //       if (res && res.payload && res.payload.value) {
  //         const datas = querystring.stringify(
  //           { calendar: 'outlook', value: JSON.stringify(res.payload.value) },
  //           { arrayFormat: 'comma' },
  //         );
  //         axios.post('calendar_data_store/', datas, config);
  //       }
  //     },
  //   ).catch(()=>setLoginLoader(false))
  //   dispatch(calenderTokenDeleteMiddleWare({ calendar: 'google' })).then(() => {
  //     dispatch(msEventMiddleWareMe({accessToken:data.accessToken})).then((timeRes)=>{
  //       localStorage.setItem('timeZone',timeRes.payload.mailboxSettings.timeZone)
  //       dispatch(
  //         calenderTokenMiddleWare({
  //           calendar: 'outlook',
  //           info: {
  //             accessToken: data.accessToken,
  //             email: data.idTokenClaims.preferred_username,
  //             timeZone:timeRes.payload.mailboxSettings.timeZone
  //           },
  //         }),
  //       ).then(() => {
  //         dispatch(calenderTokenGetMiddleWare()).then((res) => {
  //           if (!isEmpty(res.payload.outlook)) {
  //             setMail(res.payload.outlook[0].email);
  //             setChange(false);
  //             Toast('Calendar integrated successfully', 'LONG');
  //           }
  //           if (!isEmpty(res.payload.google)) {
  //             setMail(res.payload.google[0].email);
  //             setChange(false);
  //             Toast('Calendar integrated successfully', 'LONG');
  //           }
  //           setLoginLoader(false);
  //         })
  //       });
  //     })
  //   });
  // }
  // };

  // google login function
  // const googleAuthHandler = (data: any) => {
  //   console.log("*******")
  //   console.log(data)
  //   setLoginLoader(true);
  //   dispatch(
  //     googleEventMiddleWare({
  //       accessToken: data.accessToken,
  //       key: googleApiKey,
  //     }),
  //   ).then((res) => {
  //     const datas = querystring.stringify(
  //       { calendar: 'google', value: JSON.stringify(res.payload) },
  //       { arrayFormat: 'comma' },
  //     );
  //     axios.post('calendar_data_store/', datas, config);
  //     dispatch(calenderTokenDeleteMiddleWare({ calendar: 'outlook' })).then(
  //       () => {
  //         localStorage.setItem('timeZone',res.payload.timeZone)
  //         dispatch(
  //           calenderTokenMiddleWare({
  //             calendar: 'google',
  //             info: {
  //               accessToken: data.accessToken,
  //               email: data.profileObj.email,
  //               timeZone:res.payload.timeZone
  //             },
  //           }),
  //         ).then(() => {
  //           dispatch(calenderTokenGetMiddleWare()).then((resToken) => {
  //             if (!isEmpty(resToken.payload.outlook)) {
  //               setMail(resToken.payload.outlook[0].email);
  //               setChange(false);
  //               Toast('Calendar integrated successfully', 'LONG');
  //             }
  //             if (!isEmpty(resToken.payload.google)) {
  //               setMail(resToken.payload.google[0].email);
  //               setChange(false);
  //               Toast('Calendar integrated successfully', 'LONG');
  //             }
  //             setLoginLoader(false);
  //           });
  //         });
  //       },
  //     );
  //   });
  // };

  const googleAuthHandler = () => {
    setLoginLoader(true);

    handleDisconnectGoogle();
    dispatch(googleCallApiMiddleware())
      .then((res) => {
        setLoginLoader(false);
        setConnected(1);
        setIsGoogle(1);
        setActive(1);
        window.open(res.payload.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const msAuthHandler = () => {
    setLoginLoader(true);
    dispatch(outlookCallApiMiddleware())
      .then((res) => {
        console.log(res);
        if (res.payload.success === true) {
          window.open(res.payload.authorization_url);
          setLoginLoader(false);
          setConnected(1);
          setIsGoogle(0);
          setActive(1);
        }
      })
      .catch((err) => {
        console.error('outlookCallApiMiddleware ', err);
      });
  };
  // google radio button function
  const handleGoogleRadio = () => {
    setActive(1);
    setIsGoogle(1);
    if (connected && isGoogle === 0) {
      setConnected(0);
      setIsGoogle(1);
    }
  };

  // outlook radio button function
  const handleOutlookRadio = () => {
    setActive(1);
    setIsGoogle(0);
    if (connected && isGoogle === 1) {
      setConnected(0);
      setIsGoogle(0);
    }
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

  return (
    <>
      <Flex style={{ marginTop: '10px' }}>
        <Email />

        <Flex columnFlex>
          <Text color="theme" size={16} bold>
            Calendar Integration
          </Text>
          <Text>
            Integrate your calendar with zita to schedule your meetings
          </Text>
          <Flex row center className={styles.radioContainer}>
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
          </Flex>

          {connected === 0 && active === 1 && isGoogle !== 2 && (
            <Flex row center>
              <Text className={styles.clickText}>
                Click on the button to integrate with your{' '}
                {isGoogle === 1 ? 'Google' : 'Outlook'} Calendar
              </Text>
              {isGoogle === 1 && (
                <div className={styles.googleBtn}>
                  {/* <GoogleLogin
                  clientId={googleClientId}
                  buttonText="Integrate"
                  onSuccess={googleAuthHandler}
                  onFailure={(res) => console.log('onFailure', res)}
                  icon={false}
                  scope={'https://www.googleapis.com/auth/calendar.events'}
                  disabled={false}
                  accessType="online"
                /> */}
                  <Button onClick={googleAuthHandler}>Integrate</Button>
                </div>
              )}
              {isGoogle === 0 && (
                // <MicrosoftLogin
                //   prompt="select_account"
                //   clientId={msClientId}
                //   authCallback={msAuthHandler}
                //   redirectUri={redirectUri}
                //   graphScopes={graphScopes}
                // >
                //   <Button>Integrate</Button>
                // </MicrosoftLogin>
                <Button onClick={msAuthHandler}>Integrate</Button>
              )}
            </Flex>
          )}
          {connected === 1 && active === 1 && isGoogle === 0 && (
            <Flex columnFlex>
              <Flex row center>
                <Text>Connected account {isMail}</Text>
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
                <Button types="link" onClick={msAuthHandler}>
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
          )}

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
      </Flex>
    </>
  );
};

export default IntegrationScreen;
