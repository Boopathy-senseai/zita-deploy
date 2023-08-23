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
      {/* <Flex columnFlex>
        <Text size={16} bold style={{ color: '#581845' }}>
          Calendar Integration
        </Text>
        <Text>Integrate your calendar with zita to schedule your meetings</Text>
      </Flex> */}
    </Flex>
  );
};

export default IntegrationScreen;
