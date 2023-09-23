import { useFormik } from 'formik';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { home, homeRoute } from '../../appRoutesPath';
//import SvgZitaLogo from '../../icons/SvgZitaLogo';
import { AppDispatch, RootState } from '../../store';
//import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, mailformat } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import { PLEASE_ENTER_VALID_MAIL, THIS_FIELD_REQUIRED } from '../constValue';
import ForgotPassword, { forgotFormProps } from './ForgotPassword';
import LoginInto, { loginFormProps } from './LoginInto';
import styles from './loginscreen.module.css';
// import ResetPasswordSuccess from './ResetPasswordSuccess';
import {
  loginMiddleWare,
  passwordResetRequestMiddleWare,
} from './store/middleware/loginMiddleWare';
import CandidateLogin from './CandidateLogin';

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
  const [iswrongemployeecredential,setwrongemployeecredential] = useState(false);
  const location = useLocation<any>();

  let nextUrl: any;

  useEffect(()=>{
    if(localStorage.getItem('token') !== null){
      window.location.replace(`${window.location.origin + homeRoute}`);
    }
   // if()
   var url = new URL(window.location.href);

   if (url.searchParams.get('isforgot')) {
    setForgot(true)
  }
  },[])
  if (typeof location.state !== 'undefined') {
    nextUrl = location.state.from.pathname;
  }
  // setForgot(true)
  

 

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
      errors.forgotEmail = '';
    }
    if (!isEmpty(values.forgotEmail) && !mailformat.test(values.forgotEmail)) {
      errors.forgotEmail = '';
    }
    return errors;
  };

  const handlechange=(val)=>{

  }
  // give the correct credential
  const handleLoginValid = (values: loginFormProps) => {
    setError(false);
    setInactive(false);
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
  const getApplyProfile = sessionStorage.getItem('applyWithCompanyProfile');
  const hanldeLogin = (values: loginFormProps) => {
    setError(false);
    setInactive(false);
    dispatch(
      loginMiddleWare({
        username: values.userName,
        password: values.email,
        isStaff:true
      }),
    ).then((res) => {
      console.log(res,res.payload.Message,'messge')
      if(res.payload.Message === "give the Employee credential"){  
        setwrongemployeecredential(true)
      }
      else{
        setwrongemployeecredential(false)
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
      }}
    });
  };

 

  const handleForgotOpen = () => {
    setForgot(true);
    formik.resetForm();
  };
  const handleForgotClose = () => {
    setForgot(false);
    setResetSuccess(false);
    forgotFormik.resetForm();
  };

  const handleForgot = (forgotValues: forgotFormProps) => {
    setForgotLoader(true);
    dispatch(
      passwordResetRequestMiddleWare({ email: forgotValues.forgotEmail }),
    ).then((res) => {
      if (res.payload.success) {
        setResetSuccess(res.payload.success);
        // handleForgotClose();
      }
      setForgotLoader(false);
    });
  };

  const handlefunction1=()=>{

    if(!isEmpty(forgotFormik.values.forgotEmail) && !mailformat.test(forgotFormik.values.forgotEmail)){
      return <>
      {console.log("valid")}
       <div style={{color:"#f94949",fontSize:'12px',marginLeft:'66px',marginTop:'4px'}}>Please enter a valid email address.</div>
       </>
       
    }

    if(!isEmpty(forgotFormik.values.forgotEmail) && isEmailValid){
      return <>
      {console.log("register")}
       <div style={{color:"#f94949",fontSize:'12px',marginLeft:'66px',marginTop:'4px'}}>This email is not registered with Zita.</div>
       </>
    }
    
    
  }

  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <>
      {console.log(
        setEmailValid,
        PLEASE_ENTER_VALID_MAIL,
        isEmailValid,
        setResetSuccess,
        isForgotLoader,
        setForgotLoader,
      )}

      <Flex columnFlex className={styles.overAll} height={window.innerHeight}>
        {(isLoading || isForgotLoader) && <Loader />}

        {!isForgot && (
          <LoginInto
            isError={isError}
            formik={formik}
            handleForgotOpen={handleForgotOpen}
            isInactive={isInactive}
            iswrongcredential={iswrongemployeecredential}
          />
        )}
        
        {/* {!isForgot && (
          <CandidateLogin
            isError={isError}
            formik={formik}
            handleForgotOpen={handleForgotOpen}
            isInactive={isInactive}
          />
        )} */}

        {isForgot && (
          <ForgotPassword
            handlefunction1={handlefunction1}
            forgotFormik={forgotFormik}
            handleForgotClose={handleForgotClose}
            setEmailValid={setEmailValid}
            ResetSuccess={isResetSuccess}
          />
        )}

        {/* {isResetSuccess && <ResetPasswordSuccess />} */}
      </Flex>
    </>
  );
};

export default LoginScreen;
