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
import { GARY_1 } from '../../../uikit/Colors/colors';
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
// import SvgTick from '../../../icons/SvgTickNew';
import SvgTick from '../../../icons/SvgTick';
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
  const [verifymail, setverifymail] = useState('');
  const [gbutton, setgbutton] = useState(0);
  const [outbutton, setoutbutton] = useState(0);

  const integrate = useSelector(({ useremail }: RootState) => {
    return {
      email: useremail.email,
    };
  });

  const checkAuth = () => {
    dispatch(getEmail()).then((res) => {
      if (res.payload.email !== null && res.payload.account !== null) {
        loaderupdate(false);
        if (res.payload.account === 'outlook') {
          setAuthorizemail('outlook');
          setverifymail('Outlook Mail')
          setgbutton(1);
          setoutbutton(1);
        } else if (res.payload.account === 'google') {
          setAuthorizemail('google');
          setverifymail('Google Mail')
          setoutbutton(1);
          setgbutton(1);
        }
      } else {
        loaderupdate(false);
        setEmail('');
        setAuthorizemail('');
        setgbutton(0);
        setoutbutton(0);
      }
    });
  };

  useEffect(() => {
    loaderupdate(true);
    checkAuth();
  }, [Authorizemail, outbutton, gbutton]);
  // useEffect(() => {
  //   checkAuth();
  // }, []);

  const handleAuthClick = () => {
    // loaderupdate(true);

    dispatch(gmail_integrate())
      .then((res) => {
        localStorage.setItem('integrate', 'Mail');
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

  const ChangeoutlookMail = async (val:string) => {
    if (val === 'outlook') {
      outlookconfig();
    } else {
    handleAuthClick();
    }
  };

  return (
    <>
      {/* {console.log('email', integrate.email)}
      {console.log('au', Authorizemail)}
      {console.log('ob', outbutton)}
      {console.log('gb', gbutton)} */}
      <Text size={14} bold>
        Email Integrations
      </Text>
      <Text>
      Integrate and choose which email address you want to use when sending emails from Zita
      </Text>
      <Flex row style={{ marginTop: '10px' }}>
        <Flex flex={3} height={'unset'} minWidth={200} marginRight={20}>
          {Authorizemail === 'outlook' && email !== null && outbutton === 1 ? (
            <Card className={Authorizemail === 'outlook' && email !== null && outbutton === 1?styles.cardStrutureborder:styles.cardStruture }>
              <Flex end style={{ position: 'absolute', right: '10px' }}>
                <SvgTick />
              </Flex>
              <Flex row start className={styles.cardHeader}>
                <SvgoutlookMail />

                <Text
                  // color="theme"
                  bold
                  size={14}
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
                    <SvgEdit width={12} height={12} />
                    <Text
                      color="theme"
                      bold
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
                  // color="theme"
                  bold
                  size={14}
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
                  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <Text color="theme" bold>
                    Connect With Outlook
                  </Text>
                </Button>
              </Flex>
            </Card>
          )}
        </Flex>
        <Flex flex={3}>
          {Authorizemail === 'google' &&
            integrate.email !== null &&
            gbutton === 1 ? (
            <Card className={Authorizemail === 'google' &&
            integrate.email !== null &&
            gbutton === 1 ?styles.cardStrutureborder:styles.cardStruture}>
              <Flex end style={{ position: 'absolute', right: '10px' }}>
                <SvgTick />
              </Flex>
              <Flex row start className={styles.cardHeader}>
                <SvgGmail />

                <Text
                  // color="theme"
                  bold
                  size={14}
                  style={{ marginLeft: '10px' }}
                >
                  {verifymail}
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
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Flex row center className={styles.editButton}>
                    <SvgEdit width={12} height={12} />
                    <Text
                      color="theme"
                      bold
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
                  // color="theme"
                  bold
                  size={14}
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
                  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <Text color="theme" bold>
                    Connect with Gmail
                  </Text>
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


          {Edit === 'outlook' ? (
            <Flex>

              <Flex style={{display:"flex", alignItems:"center", flexDirection:"row", justifyContent:"space-between"}}>
              <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
              <SvgEdit width={12} height={12} fill={GARY_1} />
                <Text size={14} bold>
                  {' '}
                  Edit Configuration
                </Text>
                </div>
                <Flex
                  end
                  style={{ marginRight: '15px' }}
                  onClick={() => setmodelopen(!modelopen)}
                >
                  <SvgClose
                    width={10}
                    height={10}
                    fill={'#888888'}
                    cursor={'pointer'}
                  />
                </Flex>
              </Flex>
              
              <div className={styles.lineVertical}></div>

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
                    onClick={() => ChangeoutlookMail('outlook')}
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
              <Flex style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                <Flex style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                  <SvgEdit width={12} height={12} fill={GARY_1} />
                  <Text size={14} bold>
                    {' '}
                    Edit Configuration
                  </Text>
                </Flex>
                <Flex
                  end
                  style={{ marginRight: '15px' }}
                  onClick={() => setmodelopen(!modelopen)}
                >
                  <SvgClose
                    width={10}
                    height={10}
                    fill={'#888888'}
                    cursor={'pointer'}
                  />
                </Flex>
              </Flex>
              <div className={styles.lineVertical}> </div>
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
                    onClick={() => ChangeoutlookMail('google')}
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
