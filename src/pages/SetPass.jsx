
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
const today = new Date();
export type loginFormProps = {
  userName: string;
  email: string;
};

type Props = {
  formik: FormikProps<loginFormProps>;
  handleForgotOpen: () => void;
  isError: boolean;
  isInactive: boolean;
  //loginTitle:string;
};
const SetPass = ({
  formik,
  handleForgotOpen,
  isError,
  isInactive,
}: // loginTitle,
Props) => {
  const [isShowPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!isShowPass);
  };

  return (
    <>
      {console.log(handleForgotOpen, isError, isInactive, isEmpty, SvgEmail)}

      {console.log('error', formik.errors)}
      <Flex className={styles.row}>
        <Flex className={styles.splitrow_1}>
          <Flex className={styles.center_aligh}>
            <Text size={22} className={styles.Log_title} bold >
              Welcome Back!
            </Text>
            <Text className={styles.text}>
              Start with the fast and smart hiring process.
            </Text>

            <Flex>
              <div>
                <InputText
                  className={styles.input}
                  placeholder="Your email or username"
                  required
                  value={formik.values.userName}
                  onChange={formik.handleChange('userName')}
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
              </div>

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
                  placeholder="Password at least 8 characters"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  keyboardType={!isShowPass ? 'password' : 'text'}
                  actionRight={() => (
                    <Button
                      types="link"
                      className={styles.passwordicon}
                      onClick={handleShowPass}
                    >
                    <div style={{marginTop: '-15px'}}>
                      <SvgView nonView={isShowPass} height={20} width={20} />
                    </div>
                    </Button>
                  )}
                  onKeyPress={(e) => enterKeyPress(e, formik.handleSubmit)}
                />
                    <div style={{marginTop:'4px'}}></div>
                <ErrorMessage
                  name="email"
                  touched={formik.touched}
                  errors={formik.errors}
                />

                {isError && (
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
            </Flex>

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
              onClick={formik.handleSubmit}
              className={styles.login_button}
            >
              Login
            </Button>

            <hr />
            <Flex middle>
              <Text className={styles.text_account}>
                Don`t have an account ?{' '}
                <u style={{textDecoration:'none'}}>
                  <Link to="/recruiter/1" style={{fontWeight:"bold"}}>Sign up</Link>
                </u>
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex className={styles.splitrow_2}>
          <Flex middle className={styles.logo}>
            <SvgZitaLogo width={240} height={125} />
          </Flex>
          <Flex className={styles.center_aligh_slider}>
            <Loginslider />
          </Flex>
        </Flex>
        <Flex className={styles.footer}>
          &#169; Sense7ai {today.getFullYear()} ALL RIGHTS RESERVED
        </Flex>
      </Flex>
    </>
  );
};

export default SetPass;
