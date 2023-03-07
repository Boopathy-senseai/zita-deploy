import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { home } from '../../appRoutesPath';
import SvgZitaLogo from '../../icons/SvgZitaLogo';
import { AppDispatch, RootState } from '../../store';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, mailformat } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import { PLEASE_ENTER_VALID_MAIL, THIS_FIELD_REQUIRED } from '../constValue';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  const history = useHistory();
  const [isForgot, setForgot] = useState(false);
  const [isResetSuccess, setResetSuccess] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isForgotLoader, setForgotLoader] = useState(false);
  const [isError, setError] = useState(false);
  const [isInactive, setInactive] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     history.push('/');
  //   }
  // }, []);

  const { isLoading } = useSelector(({ loginReducers }: RootState) => {
    return {
      isLoading: loginReducers.isLoading,
    };
  });

  const handleValidForgot = (values: forgotFormProps) => {
    const errors: Partial<forgotFormProps> = {};
    if (isEmpty(values.forgotEmail)) {
      errors.forgotEmail = THIS_FIELD_REQUIRED;
    }
    if (!isEmpty(values.forgotEmail) && isEmailValid) {
      errors.forgotEmail = `This email is not registered with Zita`;
    }
    if (!isEmpty(values.forgotEmail) && !mailformat.test(values.forgotEmail)) {
      errors.forgotEmail = PLEASE_ENTER_VALID_MAIL;
    }
    return errors;
  };

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

  const formik = useFormik({
    initialValues: initial,
    onSubmit: (values) => hanldeLogin(values),
    validate: handleLoginValid,
  });

  const forgotFormik = useFormik({
    initialValues: forgotInitial,
    onSubmit: (forgotValues) => handleForgot(forgotValues),
    validate: handleValidForgot,
  });

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
        localStorage.setItem('token', res.payload.token);
        // history.push('/');
        window.location.replace(`${window.location.origin + '/'}`);
        // window.location.reload();
      } else if (res.payload.inactive === true) {
        setInactive(true);
      } else {
        setError(true);
      }
    });
  };

  const handleForgotOpen = () => {
    setForgot(true);
    formik.resetForm();
  };
  const handleForgotClose = () => {
    setForgot(false);
    forgotFormik.resetForm();
  };

  const handleForgot = (forgotValues: forgotFormProps) => {
    setForgotLoader(true);
    dispatch(
      passwordResetRequestMiddleWare({ email: forgotValues.forgotEmail }),
    ).then((res) => {
      if (res.payload.success) {
        setResetSuccess(res.payload.success);
        handleForgotClose();
      }
      setForgotLoader(false);
    });
  };

  // if (isLoading) {
  //   return <Loader />;
  // }
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
          />
        )}
        {isForgot && (
          <ForgotPassword
            forgotFormik={forgotFormik}
            handleForgotClose={handleForgotClose}
            setEmailValid={setEmailValid}
          />
        )}
        {isResetSuccess && <ResetPasswordSuccess />}
      </div>
    </Flex>
  );
};

export default LoginScreen;
