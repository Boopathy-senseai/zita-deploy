/* eslint max-len: ["error", { "code": 2000 }] */
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import SvgZitaLogo from '../../icons/SvgZitaLogo';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import Flex from '../../uikit/Flex/Flex';
import {
  allowAlphaNumericSpace,
  isEmpty,
  mailformat,
} from '../../uikit/helper';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import SvgView from '../../icons/SvgView';
import { home } from '../../appRoutesPath';
import Loader from '../../uikit/Loader/Loader';
import {
  checkUpperCase,
  domainValidation,
  MAX_TEXT_LENGTH_20,
  nameRegex,
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
import VerificationSuccessfully from './VerificationSuccessfully';

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
  const [isDomainValid, setDomainValid] = useState(false);
  const [isUserNameValid, setUserNameValid] = useState(false);
  const [isVerification, setVerification] = useState(false);
  const [isShowNewPass, setShowNewPass] = useState(false);
  const [isShowChangePass, setShowChnagePass] = useState(false);
  // signup function
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
      console.log('res', res.payload);

      if (res.payload.success) {
        formik.resetForm();
        setVerification(true);
        setLoader(false);
      }
    });
  };

  // signup validation
  const handleValid = (values: SignUpPayLoad) => {
    const errors: Partial<SignUpPayLoad> = {};
    if (!isEmpty(values.email) && isEmailValid) {
      errors.email = `This email is already in use.`;
    }
    if (!isEmpty(values.email) && isDomainValid) {
      errors.email = `This domain is already in use.`;
    }
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
    if (!isEmpty(values.username) && !nameRegex.test(values.username)) {
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
      (!isEmpty(values.username) && formik.values.username.length < 4) ||
      formik.values.username.length > 16
    ) {
      errors.username = '';
    }
    if (
      !isEmpty(values.password1) &&
      !specialCharacter.test(formik.values.password1)
    ) {
      errors.password1 = '';
    }
    return errors;
  };

  // signup validation
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
      // .min(4, 'Your username must be between 4-16 characters.')
      // .max(16, 'Your username must be between 4-16 characters.')
      .required(THIS_FIELD_REQUIRED),
  });

  // signup formik
  const formik = useFormik({
    initialValues: initial,
    onSubmit: hanldeSubmit,
    validate: (value) => handleValid(value),
    validationSchema: SignupSchema,
  });

  // email validation api call
  useEffect(() => {
    dispatch(emailMiddleWare({ email: formik.values.email, domain: '' })).then(
      (res) => {
        if (res.payload.success === true) {
          if (res.payload.value === 'email') {
            console.log('sdsddssdds');
            setEmailValid(true);
            setDomainValid(false);
          } else if (res.payload.value === 'domain') {
            console.log('setDomainValid');
            setDomainValid(true);
            setEmailValid(false);
          }
        }
        if (res.payload.success === false) {
          setEmailValid(false);
          setDomainValid(false);
        }
      },
    );
  }, [formik.values.email]);

  // user name validation api call
  useEffect(() => {
    dispatch(
      userNameMiddleWare({
        username: formik.values.username.toLocaleLowerCase(),
      }),
    ).then((res) => {
      if (res.payload.success === true) {
        setUserNameValid(true);
      }
      if (res.payload.success === false) {
        setUserNameValid(false);
      }
    });
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

  const usernameValid =
    !isEmpty(formik.values.username) && formik.values.username.length < 4;
  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight}
      center
    >
      {isLoader && <Loader />}
      <div style={{ width: 1200 }}>
        <Flex row center between className={styles.svgZitaFlex}>
          <SvgZitaLogo />
          {!isVerification && (
            <Button onClick={() => window.location.replace(home)}>Home</Button>
          )}
        </Flex>
        {isVerification ? (
          <VerificationSuccessfully />
        ) : (
          <Flex middle top>
            <Flex className={styles.inpuFlex}>
              <Text size={20} bold>
                Get Started. Signup into Zita
              </Text>
              <Flex columnFlex>
                <Flex row top className={styles.marginRight}>
                  <div className={styles.inputWidthOne}>
                    <InputText
                      label="First Name"
                      required
                      value={formik.values.first_name}
                      onChange={formik.handleChange('first_name')}
                    />
                    <ErrorMessage
                      name={'first_name'}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div className={styles.inputWidth}>
                    <InputText
                      label="Last Name"
                      required
                      value={formik.values.last_name}
                      onChange={formik.handleChange('last_name')}
                    />
                    <ErrorMessage
                      name={'last_name'}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                </Flex>
                <Flex row top className={styles.marginRight}>
                  <div className={styles.inputWidthOne}>
                    <InputText
                      label="Company Name"
                      required
                      value={formik.values.company_name}
                      onChange={formik.handleChange('company_name')}
                    />
                    <ErrorMessage
                      name={'company_name'}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div className={styles.inputWidth}>
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
                  </div>
                </Flex>
                <Flex row top className={styles.marginRight}>
                  <div className={styles.inputWidthOne}>
                    <InputText
                      onKeyPress={allowAlphaNumericSpace}
                      label="Username"
                      required
                      value={formik.values.username.toLocaleLowerCase()}
                      onChange={formik.handleChange('username')}
                    />

                    {(usernameValid || formik.values.username.length > 16) && (
                      <Text size={12} color="error">
                        {`Username must be between 4-16 characters including numbers.`}
                      </Text>
                    )}
                    <ErrorMessage
                      name={'username'}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div className={styles.inputWidth}>
                    <InputText
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
                  </div>
                </Flex>
                <Flex row top className={styles.marginRight}>
                  <div className={styles.inputWidthOne}>
                    <InputText
                      label="Password"
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
                      <Flex columnFlex>
                        <ErrorMessages
                          message="Your password must contain at least one uppercase."
                          error={!checkUpperCase.test(formik.values.password1)}
                        />
                        <ErrorMessages
                          message="Your password must be between 8-12 characters."
                          error={
                            formik.values.password1.length < 8 ||
                            formik.values.password1.length > 12
                          }
                        />
                        <ErrorMessages
                          message="Your password must contain at least one special character."
                          error={
                            !specialCharacter.test(formik.values.password1)
                          }
                        />
                      </Flex>
                    )}
                  </div>
                  <div className={styles.inputWidth}>
                    <InputText
                      label="Confirm Password"
                      required
                      value={formik.values.password2}
                      onChange={formik.handleChange('password2')}
                      keyboardType={!isShowChangePass ? 'password' : 'text'}
                      actionRight={() => (
                        <Button
                          types="link"
                          onClick={() => setShowChnagePass(!isShowChangePass)}
                        >
                          <SvgView
                            nonView={isShowChangePass}
                            height={20}
                            width={20}
                          />
                        </Button>
                      )}
                    />
                    {!isEmpty(formik.values.password2) &&
                      formik.values.password1 !== formik.values.password2 && (
                        <Text size={12} color="error">
                          {`The two password fields didn't match.`}
                        </Text>
                      )}
                    <ErrorMessage
                      name={'password2'}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                </Flex>
              </Flex>

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
                <Text style={{ marginLeft: 8 }}>
                  I agree to the{' '}
                  <a
                    target={'_blank'}
                    rel="noreferrer"
                    href="https://www.zita.ai/privacy-policy"
                  >
                    <Text color="link">Privacy Policy</Text>
                  </a>{' '}
                  and{' '}
                  <a
                    target={'_blank'}
                    rel="noreferrer"
                    href="https://zita.ai/terms-and-conditions"
                  >
                    <Text color="link">Terms of Use</Text>
                  </a>
                </Text>
              </div>
              <Button
                disabled={
                  formik.values.terms_and_conditions === '0' ||
                  formik.values.password1 !== formik.values.password2 ||
                  isValid ||
                  isEmpty(formik.values.password1)
                }
                onClick={formik.handleSubmit}
              >
                Sign Up
              </Button>
            </Flex>
          </Flex>
        )}
      </div>
    </Flex>
  );
};

export default SignUpScreen;
