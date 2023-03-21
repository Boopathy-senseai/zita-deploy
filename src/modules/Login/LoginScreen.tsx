import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { home, homeRoute } from '../../appRoutesPath';
import SvgZitaLogo from '../../icons/SvgZitaLogo';
import { AppDispatch, RootState } from '../../store';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, mailformat } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Toast from '../../uikit/Toast/Toast';
import { ERROR_MESSAGE, PLEASE_ENTER_VALID_MAIL, THIS_FIELD_REQUIRED } from '../constValue';
import ForgotPassword, { forgotFormProps } from './ForgotPassword';
import LoginInto, { loginFormProps } from './LoginInto';
import styles from './loginscreen.module.css';
import ResetPasswordSuccess from './ResetPasswordSuccess';
import {
  loginMiddleWare,
  passwordResetRequestMiddleWare,
} from './store/middleware/loginMiddleWare';

const initial: loginFormProps = {
  userName: '',
  email: '',
};
const forgotInitial: forgotFormProps = {
  forgotEmail: '',
};

const LoginScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isForgot, setForgot] = useState(false);
  const [isResetSuccess, setResetSuccess] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isForgotLoader, setForgotLoader] = useState(false);
  const [isError, setError] = useState(false);
  const [isInactive, setInactive] = useState(false);
  const location = useLocation<any>();

  let nextUrl: any;

  useEffect(()=>{
    if(localStorage.getItem('token') !== null){
      window.location.replace(`${window.location.origin + homeRoute}`);
    }
  },[])
  if (typeof location.state !== 'undefined') {
    nextUrl = location.state.from.pathname;
  }

  const { isLoading } = useSelector(({ loginReducers }: RootState) => {
    return {
      isLoading: loginReducers.isLoading,
    };
  });

  // forgot password form validation
  const handleValidForgot = (values: forgotFormProps) => {
    const errors: Partial<forgotFormProps> = {};
    if (isEmpty(values.forgotEmail)) {
      errors.forgotEmail = THIS_FIELD_REQUIRED;
    }
    if (!isEmpty(values.forgotEmail) && isEmailValid) {
      errors.forgotEmail = ``;
    }
    if (!isEmpty(values.forgotEmail) && !mailformat.test(values.forgotEmail)) {
      errors.forgotEmail = PLEASE_ENTER_VALID_MAIL;
    }
    return errors;
  };

  // login form validation
  const handleLoginValid = (values: loginFormProps) => {
    const errors: Partial<loginFormProps> = {};
    if (values.email === '') {
      errors.email = THIS_FIELD_REQUIRED;
    }
    if (values.userName === '') {
      errors.userName = THIS_FIELD_REQUIRED;
    }
    return errors;
  };

  // login formik
  const formik = useFormik({
    initialValues: initial,
    onSubmit: (values) => hanldeLogin(values),
    validate: handleLoginValid,
  });

  // forgot password formik
  const forgotFormik = useFormik({
    initialValues: forgotInitial,
    onSubmit: (forgotValues) => handleForgot(forgotValues),
    validate: handleValidForgot,
  });

  const getApplyProfile = sessionStorage.getItem('applyWithCompanyProfile');

  // login function
  const hanldeLogin = (values: loginFormProps) => {
    setError(false);
    setInactive(false);
    dispatch(
      loginMiddleWare({
        username: values.userName,
        password: values.email,
      }),
    ).then((res) => {
      if (res.payload.token !== undefined) {
        localStorage.setItem('loginUserCheck', res.payload.is_staff);
        localStorage.setItem('token', res.payload.token);
        localStorage.setItem(
          'loginUserId',
          res.payload.is_staff ? '0' : res.payload.username,
        );
        if (res.payload.is_staff === false && getApplyProfile === 'true') {
          window.location.replace(
            `${
              window.location.origin +
              `/candidate_profile_edit/${res.payload.username}`
            }`,
          );
        } else {
          if (isEmpty(nextUrl)) {
            window.location.replace(`${window.location.origin + homeRoute}`);
          } else {
            window.location.replace(`${window.location.origin + nextUrl}`);
          }
        }
      } else if (res.payload.inactive === true) {
        setInactive(true);
      } else {
        setError(true);
      }
    });
  };

  // open forgot password screen
  const handleForgotOpen = () => {
    setForgot(true);
    formik.resetForm();
  };
  
    // close forgot password screen
  const handleForgotClose = () => {
    setForgot(false);
    forgotFormik.resetForm();
  };

  // Forgot api  function
  const handleForgot = (forgotValues: forgotFormProps) => {
    setForgotLoader(true);
    dispatch(
      passwordResetRequestMiddleWare({ email: forgotValues.forgotEmail }),
    ).then((res) => {
      if (res.payload.success) {
        setResetSuccess(res.payload.success);
        handleForgotClose();
      } else {
        Toast(ERROR_MESSAGE,'LONG','error')
      }
      setForgotLoader(false);
    });
  };

  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight}
      center
    >
      <div style={{ width: 1200 }}>
        <Flex row center between className={styles.svgZitaFlex}>
          <SvgZitaLogo />
          {isResetSuccess && (
            <Button onClick={() => window.location.replace(home)}>Home</Button>
          )}
        </Flex>

        {(isLoading || isForgotLoader) && <Loader />}
        {!isForgot && !isResetSuccess && (
          <LoginInto
            isError={isError}
            formik={formik}
            handleForgotOpen={handleForgotOpen}
            isInactive={isInactive}
            loginTitle="Login into Zita"
          />
        )}
        {isForgot && (
          <ForgotPassword
            forgotFormik={forgotFormik}
            handleForgotClose={handleForgotClose}
            setEmailValid={setEmailValid}
            isEmailValid={isEmailValid}
          />
        )}
        {isResetSuccess && <ResetPasswordSuccess />}
      </div>
    </Flex>
  );
};

export default LoginScreen;
