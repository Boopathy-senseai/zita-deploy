import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import Flex from '../../uikit/Flex/Flex';
import SvgZitaLogo from '../../icons/SvgZitaLogo';
import Toast from '../../uikit/Toast/Toast';
import SvgVerificationEmailIcon from '../../icons/SvgVerificationEmailIcon';
import {
  allowAlphaNumericSpace,
  isEmpty,
  mailformat,
} from '../../uikit/helper';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';

import SvgView from '../../icons/SvgView';
//import { home } from '../../appRoutesPath';
import Loader from '../../uikit/Loader/Loader';
import {
  checkUpperCase,
  domainValidation,
  MAX_TEXT_LENGTH_20,
  nameRegex,
  space,
  specialCharacter,
  usernameNumberCase,
  THIS_FIELD_REQUIRED,
} from '../constValue';
import { emailMiddleWare } from '../Login/store/middleware/loginMiddleWare';
import { ErrorMessages, OnChangeErrors } from '../Login/SetNewPassword';
import styles from './signupscreen.module.css';
import { SignUpPayLoad } from './signupTypes';
import {
  signUpMiddleWare,
  userNameMiddleWare,
} from './store/middleware/signupMiddleWare';
//import VerificationSuccessfully from './VerificationSuccessfully';

const initial: SignUpPayLoad = {
  username: '',
  email: '',
  password1: '',
  password2: '',
  contact_no: '',
  company_name: '',
  terms_and_conditions: '0',
  first_name: '',
  last_name: '',
};

type ParamsType = {
  planId: string;
};

const SignUpScreen = (props: any) => {
  const { planId } = useParams<ParamsType>();
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isUserNameValid, setUserNameValid] = useState(false);
  const [isVerification, setVerification] = useState(false);
  const [isShowNewPass, setShowNewPass] = useState(false);
  //const [passerror, setpasserror] = useState('');
  const [isShowChangePass, setShowChnagePass] = useState(false);
  const [show, setshow] = useState(false);

  const hanldeSubmit = (values: SignUpPayLoad) => {
    setLoader(true);
    dispatch(
      signUpMiddleWare({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        company_name: values.company_name,
        contact_no: values.contact_no,
        terms_and_conditions: values.terms_and_conditions,
        username: values.username,
        password1: values.password1,
        password2: values.password2,
        planId,
      }),
    ).then((res) => {
      if (res.payload.success) {
        formik.resetForm();
        setVerification(true);
        setLoader(false);
        setshow(true);
        Toast('Verification email sent successfully');
      } else {
        console.log('faild', res);
      }
    });
  };

  const handleValid = (values: SignUpPayLoad) => {
    const errors: Partial<SignUpPayLoad> = {};
    // if (!isEmpty(values.email) && isEmailValid) {
    //   errors.email = `This domain is already in use.`;
    // }
    if (!isEmpty(values.email) && !mailformat.test(values.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (
      !isEmpty(values.email) &&
      mailformat.test(values.email) &&
      !domainValidation.test(values.email)
    ) {
      errors.email = 'Enter valid email id with domain';
    }
    if (isEmpty(values.email)) {
      errors.email = THIS_FIELD_REQUIRED;
    }
    if (initial.terms_and_conditions ==="0") {
      errors.terms_and_conditions = THIS_FIELD_REQUIRED;
    }
    // else{
    //   errors.terms_and_conditions =" "
    // }
   
    if (values.terms_and_conditions ==="1") {
      errors.terms_and_conditions ="";
    }
    
    if(checkpwd)
    {
      errors.password1="";
    }

    if (values.password1 !== values.password2) {
      // setpasserror("The two password fields didn't match.");
      errors.password2 = ``;
    }

    if (!isEmpty(values.username) && usernameNumberCase.test(values.username)) {
      errors.username = 'username must not start with number ';
    } else if (!isEmpty(values.username) && !nameRegex.test(values.username)) {
      errors.username = 'Username must be 4-16 including number ';
    }
    if (!isEmpty(values.username) && isUserNameValid) {
      errors.username = `Username already exist.`;
    }
    if (isEmpty(values.first_name.trim())) {
      errors.first_name = 'Enter a valid name';
    }
    if (isEmpty(values.last_name.trim())) {
      errors.last_name = 'Enter a valid name';
    }
    if (isEmpty(values.company_name.trim())) {
      errors.company_name = 'Enter a valid name';
    }
    if (
      !isEmpty(values.password1) &&
      !checkUpperCase.test(formik.values.password1)
    ) {
      errors.password1 = '';
    }
    if (
      (!isEmpty(values.password1) && formik.values.password1.length < 8) ||
      formik.values.password1.length > 12
    ) {
      errors.password1 = '';
    }
    if (
      !isEmpty(values.password1) &&
      !specialCharacter.test(formik.values.password1)
    ) {
      errors.password1 = '';
    }
    return errors;
  };
  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short')
      .max(50, MAX_TEXT_LENGTH_20)
      .required(THIS_FIELD_REQUIRED),
    last_name: Yup.string()
      .min(1, 'Enter valid name ')
      .max(50, MAX_TEXT_LENGTH_20)
      .required(THIS_FIELD_REQUIRED),
    company_name: Yup.string()
      .min(2, 'Enter valid name')
      .max(50, MAX_TEXT_LENGTH_20)
      .required(THIS_FIELD_REQUIRED),
    contact_no: Yup.string()
      .min(11, 'Invalid contact number')
      .required(THIS_FIELD_REQUIRED),
    password1: Yup.string().required(THIS_FIELD_REQUIRED),
    password2: Yup.string().required(THIS_FIELD_REQUIRED),

    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, MAX_TEXT_LENGTH_20)
      .required(THIS_FIELD_REQUIRED),

      terms_and_conditions: Yup.boolean().oneOf([true],''),

  });

  const formik = useFormik({
    initialValues: initial,
    onSubmit: hanldeSubmit,
    validate: (value) => handleValid(value),
    validationSchema: SignupSchema,
  });

  useEffect(() => {
    dispatch(emailMiddleWare({ email: formik.values.email })).then((res) => {
      if (res.payload.success === true) {
        setEmailValid(true);
      }
      if (res.payload.success === false) {
        setEmailValid(false);
      }
    });
  }, [formik.values.email]);

  useEffect(() => {
    dispatch(userNameMiddleWare({ username: formik.values.username })).then(
      (res) => {
        if (res.payload.success === true) {
          setUserNameValid(true);
        }
        if (res.payload.success === false) {
          setUserNameValid(false);
        }
      },
    );
    
  }, [formik.values.username ]);

  const checkBoxDisable =
    !isEmpty(formik.values.company_name) &&
    !isEmpty(formik.values.contact_no) &&
    !isEmpty(formik.values.email) &&
    !isEmpty(formik.values.first_name) &&
    !isEmpty(formik.values.last_name) &&
    !isEmpty(formik.values.password1) &&
    !isEmpty(formik.values.password2) &&
    !isEmpty(formik.values.username);

  

  const checkOne =
    !isEmpty(formik.values.password1) &&
    !checkUpperCase.test(formik.values.password1);

  const checkTwo =
    !isEmpty(formik.values.password1) &&
    (formik.values.password1.length < 8 || formik.values.password1.length > 12);

  const isCheckThre =
    !isEmpty(formik.values.password1) &&
    !specialCharacter.test(formik.values.password1);

  const checkFour =
    !isEmpty(formik.values.password1) && !space.test(formik.values.password1);

  const checkpwd = !checkOne && !checkTwo && !isCheckThre && !checkFour;  

  const isValid =
    checkOne === false &&
    checkTwo === false &&
    isCheckThre === false &&
    checkFour === true
      ? false
      : true;

  const Redirect = () => {
    props.history.push('/login');
  };
  const handleChange1=()=>{
    if(  formik.values.terms_and_conditions === '0')
    {
      formik.setFieldValue('terms_and_conditions', '1')
      formik.errors.terms_and_conditions=" "
    }
    else
    {
      formik.setFieldValue('terms_and_conditions', '0')
      
    }
  }
  return (
    <>
      {console.log("fgfgfffff",checkpwd, formik.errors.terms_and_conditions)}

      {isLoader && <Loader />}
      <Flex className={styles.row} height={window.innerHeight}>
        {/* {isVerification ? (
          <VerificationSuccessfully />
        ) : ( */}
        <>
          <Flex className={styles.row1}>
            <Flex className={styles.center_aligh}>
              <Text size={20} className={styles.title}>
                Hello, Welcome to Zita
              </Text>
              <Text className={styles.text}>
                Try our full hiring platform with no credit card required
              </Text>

              <Text size={14} className={styles.free_trail}>
                Your free trail includes access to:
              </Text>
              <Flex className={styles.margin}>
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>Hiring & Applicant Tracking </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>Onboarding & Off-boarding </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>Paid Time Off </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>Time Tracking </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>Performance Management </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>Benefits Tracking </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>Employee Database </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>Reporting & Analytics</li>
                    </ul>
                  </div>
                </div>
              </Flex>
            </Flex>
          </Flex>
          <Flex className={styles.row2}>
            <Flex>
              <Flex middle className={styles.logo}>
                <SvgZitaLogo width={240} height={125} />
              </Flex>
              {show === false ? (
                <Flex className={styles.form_body}>
                  <div className="row">
                    <div className="col">
                      <Flex className={styles.signup_col}>
                        <InputText
                          label="First Name"
                          labelSize={16}
                          labelColor={'theme'}
                          className={styles.signup_input}
                          required
                          value={formik.values.first_name}
                          onChange={formik.handleChange('first_name')}
                        />
                        <ErrorMessage
                          name={'first_name'}
                          errors={formik.errors}
                          touched={formik.touched}
                        />
                      </Flex>
                    </div>
                    <div className="col">
                      <Flex className={styles.signup_col}>
                        <InputText
                          label="Last Name"
                          labelSize={16}
                          labelColor={'theme'}
                          required
                          className={styles.signup_input}
                          value={formik.values.last_name}
                          onChange={formik.handleChange('last_name')}
                        />
                        <ErrorMessage
                          name={'last_name'}
                          errors={formik.errors}
                          touched={formik.touched}
                        />
                      </Flex>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Flex className={styles.signup_col}>
                        <InputText
                          label="Company Name"
                          labelSize={16}
                          labelColor={'theme'}
                          className={styles.signup_input}
                          required
                          value={formik.values.company_name}
                          onChange={formik.handleChange('company_name')}
                        />
                        <ErrorMessage
                          name={'company_name'}
                          errors={formik.errors}
                          touched={formik.touched}
                        />
                      </Flex>
                    </div>
                    <div className="col">
                      <Flex className={styles.signup_col}>
                        <LabelWrapper label="Contact Number" required>
                          <PhoneInput
                            inputClass={styles.phoneInput}
                            dropdownClass={styles.dropDownStyle}
                            country={'us'}
                            value={formik.values.contact_no}
                            onChange={(phone) =>
                              formik.setFieldValue('contact_no', phone)
                            }
                          />
                        </LabelWrapper>
                        <ErrorMessage
                          name={'contact_no'}
                          errors={formik.errors}
                          touched={formik.touched}
                        />
                      </Flex>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Flex className={styles.signup_col}>
                        <InputText
                          labelSize={16}
                          labelColor={'theme'}
                          className={styles.signup_input}
                          label="Username"
                          required
                          onKeyPress={allowAlphaNumericSpace}
                          value={formik.values.username}
                          onChange={formik.handleChange('username')}
                        />
                        <ErrorMessage
                          name={'username'}
                          errors={formik.errors}
                          touched={formik.touched}
                        />
                        {/* {!isEmpty(formik.values.username) &&
                          !isEmpty(formik.values.username) && (
                            <OnChangeErrors
                              message="username be between 4-12 characters"
                              error={
                                formik.values.username.length < 8 ||
                                formik.values.username.length > 12
                              }
                            />
                          )} */}
                      </Flex>
                    </div>
                    <div className="col">
                      <Flex className={styles.signup_col}>
                        <InputText
                          labelSize={16}
                          labelColor={'theme'}
                          className={styles.signup_input}
                          label="Work Email"
                          required
                          value={formik.values.email}
                          onChange={formik.handleChange('email')}
                        />
                        <ErrorMessage
                          name={'email'}
                          errors={formik.errors}
                          touched={formik.touched}
                        />
                      </Flex>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Flex className={styles.signup_col}>
                        <InputText
                          className={styles.signup_input}
                          label="Password"
                          labelSize={16}
                          labelColor={'theme'}
                          required
                          value={formik.values.password1}
                          onChange={formik.handleChange('password1')}
                          keyboardType={!isShowNewPass ? 'password' : 'text'}
                          actionRight={() => (
                            <Button
                              types="link"
                              onClick={() => setShowNewPass(!isShowNewPass)}
                            >
                              <SvgView
                                nonView={isShowNewPass}
                                height={20}
                                width={20}
                              />
                            </Button>
                          )}
                        />
                        <ErrorMessage
                          name={'password1'}
                          errors={formik.errors}
                          touched={formik.touched}
                        />
                        {!checkpwd&&!isEmpty(formik.values.password1) && isValid && (
                          <Flex>
                            <ErrorMessages
                              message="password must contain at least one uppercase."
                              error={
                                !checkUpperCase.test(formik.values.password1)
                              }
                            />
                            <ErrorMessages
                              message="password must be between 8-12 characters."
                              error={
                                formik.values.password1.length < 8 ||
                                formik.values.password1.length > 12
                              }
                            />
                            <ErrorMessages
                              message="password must contain at least one special character."
                              error={
                                !specialCharacter.test(formik.values.password1)
                              }
                            />
                          </Flex>
                        )}
                      </Flex>
                    </div>
                    <div className="col">
                      <Flex className={styles.signup_col}>
                        <InputText
                          className={styles.signup_input}
                          label="Confirm Password"
                          required
                          value={formik.values.password2}
                          onChange={formik.handleChange('password2')}
                          keyboardType={!isShowChangePass ? 'password' : 'text'}
                          actionRight={() => (
                            <Button
                              types="link"
                              onClick={() =>
                                setShowChnagePass(!isShowChangePass)
                              }
                            >
                              <SvgView
                                nonView={isShowChangePass}
                                height={20}
                                width={20}
                              />
                            </Button>
                          )}
                        />
                        <ErrorMessage
                          name={'password2'}
                          errors={formik.errors}
                          touched={formik.touched}
                        />
                        {!isEmpty(formik.values.password1) &&
                          !isEmpty(formik.values.password2) && (
                            <OnChangeErrors
                              message="The two password fields didn't match"
                              error={
                                formik.values.password1 !==
                                formik.values.password2
                              }
                            />
                          )}
                      </Flex>
                    </div>
                  </div>
                  <Flex middle>
                    <div className={styles.checkBoxStyle}>
                      <InputCheckBox
                        className={styles.check}
                       
                        // disabled={!checkBoxDisable}
                        checked={formik.values.terms_and_conditions === '1'}
                        
                        onChange={handleChange1}
                      />
                      
                      <Text className={styles.terms_con}>
                        I agree to Zita{' '}
                        <a
                          style={{ marginRight: '5px' }}
                          target={'_blank'}
                          rel="noreferrer"
                          href="https://zita.ai/terms-and-conditions"
                        >
                          <Text bold size={14} color="link">
                            Terms of Use
                          </Text>
                        </a>
                        {''}
                        and{' '}
                        <a
                          target={'_blank'}
                          rel="noreferrer"
                          href="https://www.zita.ai/privacy-policy"
                        >
                          <Text bold size={14} color="link">
                            Privacy Policy
                          </Text>
                        </a>
                      </Text>
                    </div>
                    <ErrorMessage
                      name={'terms_and_conditions'}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                    <Button
                      className={styles.login_button}
                  
                      onClick={formik.handleSubmit}
                    >
                      SignUp
                    </Button>
                  </Flex>

                  <Flex middle className={styles.account_link} row>
                    Already have an Account ?{' '}
                    &nbsp;
                    <u>
                      <Link to="/login"> Login </Link>
                    </u>
                  </Flex>
                </Flex>
              ) : (
                <>
                  <Flex className={styles.successform_body}>
                    <Flex middle className={styles.text_margin}>
                      <SvgVerificationEmailIcon fill={'#581845'} />
                    </Flex>
                    <Flex column-middle>
                    <Text size={22} bold className={styles.verificationtext}>
                      Verification email sent successfully
                    </Text>
                    <Text size={16} className={styles.messages} style={{justifyContent:'center'}}>
                      Please click on the verification link sent to your email
                      id to complete the registration. In case you are not able
                      to find our mail, please check the spam folder.
                    </Text>
                    </Flex>
                    <Flex middle>
                      <Button
                        style={{ marginTop: '10px',position:'relative',bottom:'68px',borderRadius:'5px' }}
                        onClick={() => Redirect()}
                      >
                        Ok
                      </Button>
                    </Flex>
                  </Flex>
                </>
              )}
            </Flex>
          </Flex>
        </>
        {/* )} */}
      </Flex>
    </>
  );
};

export default SignUpScreen;
