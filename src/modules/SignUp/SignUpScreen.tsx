import { Field, useFormik } from 'formik';
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
  // userNameMiddleWare,
  signupGetMiddleWare,
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
  const [ispassword, setpassword] = useState(false);
  //const [passerror, setpasserror] = useState('');
  const [isShowChangePass, setShowChnagePass] = useState(false);
  const [show, setshow] = useState(false);
  const [name, setname] = useState(false);
  const [nameemail, setnameemail] = useState(false);
  const [namevalid, setnamevalid] = useState(false);

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
        formik.errors.password2 =
          'The password is too similar to the username.';
        setLoader(false);
        setpassword(true);

      //  console.log('faild', res);
      }
    });
  };

  const handleValid = (values: SignUpPayLoad) => {
    const errors: Partial<SignUpPayLoad> = {};

    if (!isEmpty(values.email) && isEmailValid) {
      errors.email = ' ';
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
    if (isEmpty(values.username)) {
      errors.username = THIS_FIELD_REQUIRED;
    }

    if (values.terms_and_conditions === '0') {
      errors.terms_and_conditions = THIS_FIELD_REQUIRED;
    }

    if (values.password1 !== values.password2) {
      // setpasserror("The two password fields didn't match.");
      errors.password2 = ``;
    }
    //   if(ispassword){
    //   formik.errors.password2 = "The password is too similar to the username.";
    //  }
    if (!isEmpty(values.username) && usernameNumberCase.test(values.username)) {
      errors.username = ' ';
    }
    if (!isEmpty(values.username) && !nameRegex.test(values.username)) {
     // console.log('1');
      errors.username = ' ';
    }
    //  console.log(!nameRegex.test(values.username))

    if (!isEmpty(formik.values.username) && isUserNameValid) {
      errors.username = ``;
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
      .min(2, 'Too Short.')
      .max(50, MAX_TEXT_LENGTH_20)
      .required(THIS_FIELD_REQUIRED),
    last_name: Yup.string()
      .min(1, 'Enter valid name.')
      .max(50, MAX_TEXT_LENGTH_20)
      .required(THIS_FIELD_REQUIRED),
    company_name: Yup.string()
      .min(2, 'Enter valid name.')
      .max(50, MAX_TEXT_LENGTH_20)
      .required(THIS_FIELD_REQUIRED),
    contact_no: Yup.string()
      .min(11, 'Invalid contact number.')
      .required(THIS_FIELD_REQUIRED),
    password1: Yup.string().required(THIS_FIELD_REQUIRED),
    password2: Yup.string().required(THIS_FIELD_REQUIRED),

    username: Yup.string()
      .min(2, 'Too Short.')
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
    dispatch(signupGetMiddleWare({ email: formik.values.email })).then(
      (res) => {
        if (res.payload.success === true) {
          setEmailValid(false);
        }
        if (res.payload.success === false) {
          setEmailValid(true);
          // formik.errors.email = "This domain is already in use.";
        }
      },
    );
  }, [formik.values.email]);

  useEffect(() => {
    dispatch(signupGetMiddleWare({ username: formik.values.username })).then(
      (res) => {
        if (res.payload.success === true) {
          setUserNameValid(false);
        }
        if (res.payload.success === false) {
          setUserNameValid(true);
          // formik.errors.username="Username already exist."
        }
      },
    );
  }, [formik.values.username]);
  // useEffect(() => {
  //   dispatch(signupGetMiddleWare({password1:formik.values.password1 })).then(
  //     (res) => {
  //       if (res.payload.success === true) {
  //         setpassword(false)
  //       }
  //       if (res.payload.success === false) {
  //         console.log("is i am there");
  //         setpassword(true)
  //       }
  //     },
  //   );
  // }, [formik.values.password1]);

  //  useEffect(() => {
  //   const errors: Partial<SignUpPayLoad> = {};
  //    if (formik.values.password1 !== formik.values.password2) {
  //      // setpasserror("The two password fields didn't match.");
  //      errors.password2 = `The two password fields didn't match.`;
  //    }
  //    return errors;
  //  }, [formik.values.password2]);
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

  const hello = !isEmpty(formik.values.username);

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
  const handleChange1 = () => {
    if (formik.values.terms_and_conditions === '0') {
      formik.setFieldValue('terms_and_conditions', '1');
      // formik.errors.terms_and_conditions=" "
    } else {
      formik.setFieldValue('terms_and_conditions', '0');
    }
  };
  const emtysp = space.test(formik.values.password1);

  const handlefunction = () => {
    if (
      !isEmpty(formik.values.username) &&
      usernameNumberCase.test(formik.values.username)
    ) {
      return (
        <>
          <div style={{ color: '#f94949', fontSize: '12px' }}>
            Username must not start with number.
          </div>
        </>
      );
    }

    if (
      isUserNameValid === true &&
      !isEmpty(formik.values.username) &&
      nameRegex.test(formik.values.username)
    ) {
      return (
        <>
          <div style={{ color: '#f94949', fontSize: '12px' }}>
            Username already exist.
          </div>
        </>
      );
    }
    if (
      !isEmpty(formik.values.username) &&
      !nameRegex.test(formik.values.username)
    ) {
      return (
        <>
          <div style={{ color: '#f94949', fontSize: '12px' }}>
          Username must be 4-16 charcters including numbers.
          </div>
        </>
      );
    }
    // if(isEmpty(formik.values.username)&& name) {
    //   return <>
    //    <div style={{color:"#f94949",fontSize:'12px'}}>This field is required.</div>
    //    </>

    //   // formik.errors.username=THIS_FIELD_REQUIRED;
    // }
  };
  const handleInputLength = (e, fieldName) => {
    const maxLength = 12; // Maximum length allowed
  
    if (e.target.value.length >= maxLength) {
      e.preventDefault(); // Prevent further input
      const truncatedValue = e.target.value.slice(0, maxLength);
      formik.setFieldValue(fieldName, truncatedValue); // Update the field value
    }
  };
  
  const handlefunction1 = () => {
    if (isEmailValid === true && !isEmpty(formik.values.email)) {
      return (
        <>
          <div style={{ color: '#f94949', fontSize: '12px' }}>
          Email already exist.
          </div>
        </>
      );
    }

    // if(isEmpty(formik.values.email)&& namevalid){
    //   return <>
    //    <div style={{color:"#f94949",fontSize:'12px'}}>This field is required.</div>
    //    </>
    // }
  };
  const handlefunction2 = () => {
    if (!emtysp && !isEmpty(formik.values.password1)) {
      // return <>
      //  <div style={{color:"#f94949",fontSize:'12px'}}>Space is not a charecter.</div>
      //  </>
      formik.errors.password1 = 'Space is not a character.';
    }
  };
  const [inputLengthErrorpass, setInputLengthErrorpass] = useState(false);
  const handleInputChangepass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputLength = event.target.value.length;

    // Check if input length exceeds 20 characters
    if (inputLength > 50) {
      setInputLengthErrorpass(true);
    } else {
      setInputLengthErrorpass(false);
      formik.handleChange('email')(event); // Update the formik value
    }
  };
  const submit=()=>{
    if(inputLengthErrorpass===false){
    formik.handleSubmit();}
  }

  return (
    <>
      
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
              <Text size={14} className={styles.text} style={{ marginRight: '10px' }}>
                Experience our AI-Powered recruitment ATS with enhanced features
                to streamline your hiring process.
              </Text>

              <Text size={14} className={styles.free_trail}>
                {"Zita's standout features for hiring top talent."}
              </Text>
              <Flex className={styles.margin}>
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>Job Creation & Posting </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>Candidate Database Management </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>7Million+ External Resume Access </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>Customizable Career Page</li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>Human like AI Matching </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>Customizable Kanban Hiring Board </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>Collaborate & Hire </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>Reports & Analysis</li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>Inbuilt Interview Management </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>Inbuilt Email Communication</li>
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
                      <Flex className={styles.signup_col }>
                        <InputText
                          label="Company Name"
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
                          labelColor={'theme'}
                          className={styles.signup_input}
                          label="Username"
                          required
                          onKeyPress={allowAlphaNumericSpace}
                          value={formik.values.username}
                          onChange={formik.handleChange('username')}
                        />
                        {handlefunction()}
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
                          labelColor={'theme'}
                          className={styles.signup_input}
                          label="Work Email"
                          required
                          style={{fontSize:"13px"}}
                          value={formik.values.email}
                          onChange={handleInputChangepass}
                         // maxLength={51}
                        />
                        {handlefunction1()}
                        {inputLengthErrorpass===true &&
                           <div style={{ color: '#f94949', fontSize: '12px' }}>
                            Email should be a maximum of 50 characters
                           </div>
                        }
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
                          labelColor={'theme'}
                          required
                          value={formik.values.password1}
                          onChange={formik.handleChange('password1')}
                          onKeyPress={(e) => handleInputLength(e, 'password1')}

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
                        {handlefunction2()}
                        {!checkpwd &&
                          !isEmpty(formik.values.password1) &&
                          emtysp &&
                          isValid && (
                            <Flex>
                              <ErrorMessages
                                message="Password must contain at least one uppercase."
                                error={
                                  !checkUpperCase.test(formik.values.password1)
                                }
                              />
                              <ErrorMessages
                                message="Password must be between 8-12 characters."
                                error={
                                  formik.values.password1.length < 8 ||
                                  formik.values.password1.length > 12
                                }
                              />
                              <ErrorMessages
                                message="Password must contain at least one special character."
                                error={
                                  !specialCharacter.test(
                                    formik.values.password1,
                                  )
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
                          onKeyPress={(e) => handleInputLength(e, 'password2')}
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
                    
                    <div className={styles.checkBoxStyle} style={{display:"flex"}}>
                      <InputCheckBox
                        className={styles.checks}
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
                            Privacy Policy.
                          </Text>
                        </a>
                      </Text>
                    </div>
                    <div >
                      <ErrorMessage
                        name={'terms_and_conditions'}
                        errors={formik.errors}
                        touched={formik.touched}
                      />
                    </div>

                    <Button
                      className={styles.login_button}
                      // disabled={formik.values.terms_and_conditions === '0'}
                      onClick={submit}
                    >
                      Sign up
                    </Button>
                  </Flex>

                  <Flex middle className={styles.account_link} row>
                    Already have an account? &nbsp;
                    <u style={{ textDecoration: 'none' }}>
                      <Link to="/login" style={{ fontWeight: 'bold' }}>
                        {' '}
                        Login{' '}
                      </Link>
                    </u>
                  </Flex>
                </Flex>
              ) : (
                <>
                  <Flex className={styles.successform_body}>
                    <Flex>
                      <Flex
                        middle
                        className={styles.text_margin}
                        style={{ marginTop: '115px' }}
                      >
                        <SvgVerificationEmailIcon fill={'#581845'} />
                      </Flex>
                      <Flex column-middle>
                        <Text
                          size={18}
                          bold
                          className={styles.verificationtext}
                        >
                          Verification email sent successfully
                        </Text>
                        <Text
                          size={14}
                          className={styles.messages}
                          style={{
                            justifyContent: 'center',
                            marginBottom: '135px',
                          }}
                        >
                          Please click on the verification link sent to your
                          email id to complete the registration. In case you are
                          not able to find our mail, please check the spam
                          folder.
                        </Text>
                      </Flex>
                      <Flex middle>
                        <Button
                          style={{
                            marginTop: '-56px',
                            position: 'relative',
                            bottom: '68px',
                            borderRadius: '5px',
                            marginBottom: '81px',
                          }}
                          onClick={() => Redirect()}
                        >
                          OK
                        </Button>
                      </Flex>
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
