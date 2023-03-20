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
  //nameRegex,
  specialCharacter,
  THIS_FIELD_REQUIRED,
} from '../constValue';
import { emailMiddleWare } from '../Login/store/middleware/loginMiddleWare';
import { ErrorMessages } from '../Login/SetNewPassword';
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

const SignUpScreen = () => {
  const { planId } = useParams<ParamsType>();
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isUserNameValid, setUserNameValid] = useState(false);
  //const [isVerification, setVerification] = useState(false);
  const [isShowNewPass, setShowNewPass] = useState(false);
  const [isShowChangePass, setShowChnagePass] = useState(false);

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
        // setVerification(true);
        setLoader(false);
        Toast('Verification email sent successfully');
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
    if (values.password1 !== values.password2) {
      errors.password2 = `The two password fields didn't match.`;
    }
    if (isEmpty(values.username)) {
      errors.username = 'Enter a valid username';
    }
    if (!isEmpty(values.username) && isUserNameValid) {
      errors.username = `Username already exist.`;
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
      .min(2, 'Too Short!')
      .max(50, MAX_TEXT_LENGTH_20)
      .required(THIS_FIELD_REQUIRED),
    last_name: Yup.string()
      .min(1, 'Too Short!')
      .max(50, MAX_TEXT_LENGTH_20)
      .required(THIS_FIELD_REQUIRED),
    company_name: Yup.string()
      .min(2, 'Too Short!')
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
  }, [formik.values.username]);

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

  const isValid =
    checkOne === false && checkTwo === false && isCheckThre === false
      ? false
      : true;

  return (
    <>
      {console.log(isEmailValid)}
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
              <Flex>
                <Flex className={styles.logo}>
                  <center>
                    <SvgZitaLogo width={240} height={125} />
                  </center>
                </Flex>
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
                        {!isEmpty(formik.values.password1) && isValid && (
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
                          labelSize={16}
                          labelColor={'theme'}
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
                      </Flex>
                    </div>
                  </div>
                  <center>
                    <div className={styles.checkBoxStyle}>
                      <InputCheckBox
                        disabled={!checkBoxDisable}
                        checked={formik.values.terms_and_conditions === '1'}
                        onChange={() =>
                          formik.values.terms_and_conditions === '0'
                            ? formik.setFieldValue('terms_and_conditions', '1')
                            : formik.setFieldValue('terms_and_conditions', '0')
                        }
                      />
                      <Text className={styles.terms_con}>
                        I agree to Zita{' '}
                        <a
                          target={'_blank'}
                          rel="noreferrer"
                          href="https://zita.ai/terms-and-conditions"
                        >
                          <Text bold size={20} color="link">
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
                          <Text bold size={20} color="link">
                            Privacy Policy
                          </Text>
                        </a>
                      </Text>
                    </div>
                  </center>

                  <center>
                    <Button
                      className={styles.login_button}
                      // disabled={formik.values.terms_and_conditions === '0'}
                      onClick={formik.handleSubmit}
                    >
                      Sign Up
                    </Button>
                  </center>

                  <Flex className={styles.account_link}>
                    <center>
                      Already have an Account ?{' '}
                      <u>
                        <Link to="/login">Login </Link>
                      </u>
                    </center>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </>
        {/* )} */}
      </Flex>
    </>
  );
};

export default SignUpScreen;
