import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import { AppDispatch, RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, mailformat } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Modal from '../../uikit/Modal/Modal';
import { profileEditMiddleWare } from '../candidateprofile/store/middleware/candidateprofilemiddleware';
import { PLEASE_ENTER_VALID_MAIL, THIS_FIELD_REQUIRED } from '../constValue';
import ForgotPassword, { forgotFormProps } from '../Login/ForgotPassword';
import LoginInto, { loginFormProps } from '../Login/LoginInto';
import ResetPasswordSuccess from '../Login/ResetPasswordSuccess';
import {
  loginMiddleWare,
  passwordResetRequestMiddleWare,
} from '../Login/store/middleware/loginMiddleWare';
import styles from './loginpopupmodal.module.css';

const initial: loginFormProps = {
  userName: '',
  email: '',
};
const forgotInitial: forgotFormProps = {
  forgotEmail: '',
};

type Props = {
  cancel: () => void;
  open: boolean;
  closeLogin: () => void;
};
const LoginPopUpModal = ({ cancel, open, closeLogin }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isForgot, setForgot] = useState(false);
  const [isResetSuccess, setResetSuccess] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isForgotLoader, setForgotLoader] = useState(false);
  const [isError, setError] = useState(false);
  const [isInactive, setInactive] = useState(false);

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
      errors.forgotEmail = ``;
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
        localStorage.setItem('loginUserCheck', res.payload.is_staff);
        localStorage.setItem(
          'loginUserId',
          res.payload.is_staff ? '0' : res.payload.username,
        );
        axios.defaults.headers.common['Authorization'] =
          'Token ' + localStorage.getItem('token');
        dispatch(
          profileEditMiddleWare({
            jd_id: localStorage.getItem('careerJobViewJobId'),
          }),
        );
        cancel();
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

  return (
    <Modal open={open}>
      <Flex columnFlex className={styles.overAll}>
        <div
          className={styles.svgClose}
          onClick={() => {
            closeLogin();
            formik.resetForm();
          }}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <SvgCloseSmall />
        </div>
        {(isLoading || isForgotLoader) && <Loader />}
        {!isForgot && !isResetSuccess && (
          <LoginInto
            isError={isError}
            formik={formik}
            handleForgotOpen={handleForgotOpen}
            isInactive={isInactive}
            //loginTitle="Login"
          />
        )}
        {isForgot && (
          <ForgotPassword
            forgotFormik={forgotFormik}
            handleForgotClose={handleForgotClose}
            setEmailValid={setEmailValid}
            ResetSuccess={isResetSuccess}
            // isEmailValid={isEmailValid}
          />
        )}
        {isResetSuccess && <ResetPasswordSuccess />}
      </Flex>
    </Modal>
  );
};

export default LoginPopUpModal;
