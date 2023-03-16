import { FormikProps } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SvgView from '../../icons/SvgView';
import SvgMail from '../../icons/SvgMail';
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
};
const LoginInto = ({
  formik,
  handleForgotOpen,
  isError,
  isInactive,
}: Props) => {
  const [isShowPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!isShowPass);
  };

  return (
    <>
      {console.log(handleForgotOpen, isError, isInactive, isEmpty)}
      <Flex className={styles.row}>
        <Flex className={styles.splitrow_1}>
          <Flex className={styles.center_aligh}>
            <Text size={18} className={styles.text} bold>
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
                      <SvgMail height={15} width={15} />
                    </Button>
                  )}
                />

                <ErrorMessage
                  name="userName"
                  touched={formik.touched}
                  errors={formik.errors}
                />
              </div>

              <div>
                <InputText
                  actionLeft={() => (
                    <Button types="link" className={styles.usericon}>
                      <SvgLock height={15} width={15} />
                    </Button>
                  )}
                  className={styles.input}
                  placeholder="Password "
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
                      <SvgView nonView={isShowPass} height={20} width={20} />
                    </Button>
                  )}
                  onKeyPress={(e) => enterKeyPress(e, formik.handleSubmit)}
                />

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
                {isInactive && (
                  <Text size={12} color="error">
                    This account is inactive
                  </Text>
                )}
              </div>
            </Flex>
            <div>
              <Button
                types="link"
                className={styles.forget}
                onClick={handleForgotOpen}
              >
                Forgot your password?
              </Button>
            </div>

            <Button
              onClick={formik.handleSubmit}
              className={styles.login_button}
            >
              Login
            </Button>

            <hr />

            <center>
              Don`t have an Account ?{' '}
              <u>
                <Link to="/recruiter/1">Sign Up</Link>
              </u>
            </center>
          </Flex>
        </Flex>

        <Flex className={styles.splitrow_2}>
          <Flex className={styles.logo}>
            <center>
              <SvgZitaLogo />
            </center>
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

export default LoginInto;
