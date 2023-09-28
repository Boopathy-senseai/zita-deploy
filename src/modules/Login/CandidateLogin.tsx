
import { FormikProps } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SvgView from '../../icons/SvgView';
//import SvgMail from '../../icons/SvgMail';
import SvgEmail from '../../icons/SvgEmail';
import SvgLock from '../../icons/SvgLock';
import Button from '../../uikit/Button/Button';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../uikit/Flex/Flex';
import SvgZitaLogo from '../../icons/SvgZitaLogo';
import { enterKeyPress, isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import styles from './loginscreen.module.css';
import Loginslider from './Loginslider';
import Loginslidercandidate from './Loginslidercandidate';
const today = new Date();
// export type loginFormProps = {
//   userName: string;
//   email: string;
// };

export type candidateFormProps = {
    userName: string;
    email: string;
  };
  

type Props = {
  formik: FormikProps<candidateFormProps>;
  handleForgotOpen: () => void;
  isError: boolean;
  isInactive: boolean;
  iswrongcredential?:boolean;
  //loginTitle:string;
};
const CandidateLogin = ({
  formik,
  handleForgotOpen,
  isError,
  isInactive,
  iswrongcredential
}: // loginTitle,
Props) => {
  const [isShowPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!isShowPass);
  };

    const [inputLengthError, setInputLengthError] = useState(false);
    const [inputLengthErrorpass, setInputLengthErrorpass] = useState(false);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputLength = event.target.value.length;
  
      // Check if input length exceeds 20 characters
      if (inputLength > 50) {
        setInputLengthError(true);
      } else {
        setInputLengthError(false);
        formik.handleChange('userName')(event); // Update the formik value
      }
    };
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
      if(inputLengthError===false && inputLengthErrorpass===false)
      formik.handleSubmit();
    }
  
  return (
    <>
      <Flex className={styles.row}>
        <Flex className={styles.splitrow_1}>
          <Flex className={styles.center_aligh}>
            <Text size={22} className={styles.Log_title} bold >
              Welcome Back!
            </Text>
            <Text className={styles.text}>
                Create your profile and apply for the job.
            </Text>

           {/* Fields starts */}
            <Flex>
              <div>
                <InputText
                  className={styles.input}
                  placeholder="Your email or username"
                  required
                  value={formik.values.userName}
                  onChange={handleInputChange}
                 // onKeyPress={(e) => handleInputLength(e, 'userName'
                  keyboardType="email"
                  actionLeft={() => (
                    <Button types="link" className={styles.usericon}>
                    <div style={{marginTop: '-15px'}}>
                      <SvgEmail height={15} width={17} fill={'none'} />
                    </div>
                    </Button>
                  )}
                />
                <div style={{marginTop:'4px'}}></div>
                <ErrorMessage
                  name="userName"
                  touched={formik.touched}
                  errors={formik.errors}
                />
                
                {inputLengthError && (
                  <Text size={12} color="error">
                      Email or username should be a maximum of 50 characters
                  </Text>
                )}
              </div>
               {/* Password Starts */}
              <div>
                <InputText
                  actionLeft={() => (
                    <Button types="link" className={styles.Passicon}>
                    <div style={{marginTop: '-15px'}}>
                      <SvgLock height={20} width={19} />
                    </div>
                    </Button>
                  )}
                  className={styles.input}
                  placeholder="Your Password"
                  required
                  value={formik.values.email}
                 // onChange={formik.handleChange('email')}
                 onChange={handleInputChangepass}
                  keyboardType={!isShowPass ? 'password' : 'text'}
                  actionRight={() => (
                    <Button
                      types="link"
                      className={styles.passwordicon}
                      onClick={handleShowPass}
                    >
                    <div style={{marginTop: '-2px'}}>
                      <SvgView nonView={isShowPass} height={20} width={20} />
                    </div>
                    </Button>
                  )}
                 // maxLength={50}
                  onKeyPress={(e) => enterKeyPress(e, formik.handleSubmit)}
                />
                    <div style={{marginTop:'4px'}}></div>
                <ErrorMessage
                  name="email"
                  touched={formik.touched}
                  errors={formik.errors}
                />
                
                {inputLengthErrorpass && (
                  <Text size={12} color="error">
                     Password should be a maximum of 50 characters
                  </Text>
                )}
                {isError && (
                  <Text size={12} color="error">
                    Your username or password is incorrect. Try again.
                  </Text>
                )}
                {formik.errors.email !== "This field is required."  && iswrongcredential&&(
                  <Text size={12} color="error">
                     Your username or password is incorrect. Try again.
                  </Text>
                )}
                {!isEmpty(formik.values.email)&& isInactive && (
                  <Text size={12} color="error">
                    This account is inactive

                  </Text>
                )}
              </div>
                {/* Password end */}
            </Flex>
            {/* Fields starts */}

            <Flex end>
              <Button
                types="link"
                className={styles.forget}
                onClick={handleForgotOpen}
              >
                Forgot password?
              </Button>
            </Flex>
            <Button
              onClick={submit}
              className={styles.login_button}
              style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
              }}
            >
              Login
            </Button>

            {/* <hr /> */}
            {/* <Flex middle>
              <Text className={styles.text_account}>
                Don`t have an account?{' '}
                <u style={{textDecoration:'none'}}>
                  <Link to="/recruiter/1" style={{fontWeight:"bold"}}>Sign up</Link>
                </u>
              </Text>
            </Flex> */}
          </Flex>
        </Flex>

        <Flex className={styles.splitrow_2}>
          <Flex middle className={styles.logo}>
            <SvgZitaLogo width={240} height={125} />
          </Flex>
          <Flex className={styles.center_aligh_slider}>
            {/* <Loginslider /> */}
            <Loginslidercandidate/>
          </Flex>
        </Flex>
        <Flex className={styles.footer}>
          &#169; Sense7ai {today.getFullYear()} ALL RIGHTS RESERVED
        </Flex>
      </Flex>
    </>
  );
};

export default CandidateLogin;
