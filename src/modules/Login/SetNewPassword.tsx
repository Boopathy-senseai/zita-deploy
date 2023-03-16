import { FormikProps } from 'formik';
import { useState } from 'react';
import SvgView from '../../icons/SvgView';
import Button from '../../uikit/Button/Button';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import { checkUpperCase, specialCharacter } from '../constValue';
//import Logo from '../../assets/images/logo.png';
import SvgZitaLogo from '../../icons/SvgZitaLogo';
import Forgot from '../../assets/images/Passwordupdate.png';
import SvgLock from '../../icons/SvgLock';
//import { home } from '../../appRoutesPath';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import { loginAuth } from '../../appRoutesPath';
import styles from './setnewpassword.module.css';
const today = new Date();
export type newPassFormProps = { newPass: string; changePass: string };
type Props = {
  formik: FormikProps<newPassFormProps>;
  isSuccess: boolean;
  setPassSuccess: boolean | undefined;
  success: boolean;
  user_not_found: boolean;
};
export const ErrorMessages = ({
  error,
  message,
}: {
  error: boolean;
  message: string;
}) => {
  return (
    <Flex row center className={styles.errorMessageFlex}>
      {error ? (
        <span className={styles.iconColor}>&#x2715;</span>
      ) : (
        <span className={styles.iconTickColor}>&#x2713;</span>
      )}

      <Text size={12} color={error ? 'error' : 'success'}>
        {message}
      </Text>
    </Flex>
  );
};
const SetNewPassword = ({
  formik,
  isSuccess,
  setPassSuccess,
  success,
  user_not_found,
}: Props) => {
  const [isShowNewPass, setShowNewPass] = useState(false);
  const [isShowChangePass, setShowChnagePass] = useState(false);
  const checkOne =
    !isEmpty(formik.values.newPass) &&
    !checkUpperCase.test(formik.values.newPass);
  const checkTwo =
    !isEmpty(formik.values.newPass) &&
    (formik.values.newPass.length < 8 || formik.values.newPass.length > 12);
  const isCheckThre =
    !isEmpty(formik.values.newPass) &&
    !specialCharacter.test(formik.values.newPass);
  const isValid =
    checkOne === false && checkTwo === false && isCheckThre === false
      ? false
      : true;

  return (
    <>
      {console.log(isSuccess, setPassSuccess, success, user_not_found)}
      <Flex className={styles.row}>
        <Flex className={styles.splitrow_1}>
          <Flex className={styles.center_aligh}>
            {isSuccess && (
              <>
                <Text
                  size={20}
                  bold
                  align="center"
                  color="theme"
                  style={{ margin: '8px 0' }}
                >
                  Your password has changed successfully.
                </Text>

                <Flex center row middle>
                  <Text color="theme" style={{ marginRight: 2 }}>
                    Click here to
                  </Text>
                  <LinkWrapper to={loginAuth}>
                    <Button types="link">login</Button>
                  </LinkWrapper>
                </Flex>
              </>
            )}

            {setPassSuccess !== true && success === true && (
              <>
                <center>
                  <Text size={20} className={styles.text} bold>
                    Rest your new password?
                  </Text>
                </center>
                <Flex className={styles.pass_content}>
                  <Text className={styles.text}>
                    Please enter a valid password to reset for your account
                    sample mail
                  </Text>
                </Flex>

                <div>
                  <InputText
                    actionLeft={() => (
                      <Button types="link" className={styles.usericon}>
                        <SvgLock height={15} width={15} />
                      </Button>
                    )}
                    className={styles.input}
                    placeholder="New Password "
                    required
                    value={formik.values.newPass}
                    onChange={formik.handleChange('newPass')}
                    keyboardType={!isShowNewPass ? 'password' : 'text'}
                    actionRight={() => (
                      <Button
                        types="link"
                        className={styles.passwordicon}
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
                  {!isEmpty(formik.values.newPass) && isValid && (
                    <Flex columnFlex>
                      <ErrorMessages
                        message="Your password must contain at least one uppercase."
                        error={!checkUpperCase.test(formik.values.newPass)}
                      />

                      <ErrorMessages
                        message="Your password must be between 8-12 characters."
                        error={
                          formik.values.newPass.length < 8 ||
                          formik.values.newPass.length > 12
                        }
                      />

                      <ErrorMessages
                        message="Your password must contain at least one special character."
                        error={!specialCharacter.test(formik.values.newPass)}
                      />
                    </Flex>
                  )}
                  <InputText
                    actionLeft={() => (
                      <Button types="link" className={styles.usericon}>
                        <SvgLock height={15} width={15} />
                      </Button>
                    )}
                    className={styles.input}
                    placeholder="Confim New Password "
                    required
                    value={formik.values.changePass}
                    onChange={formik.handleChange('changePass')}
                    keyboardType={!isShowChangePass ? 'password' : 'text'}
                    actionRight={() => (
                      <Button
                        types="link"
                        className={styles.passwordicon}
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
                  <ErrorMessage
                    name="changePass"
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                  <Button
                    className={styles.login_button}
                    onClick={formik.handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              </>
            )}

            {user_not_found === true && (
              <Flex middle center flex={1} height={'50%'}>
                <Text align="center" color="theme">
                  User not found
                </Text>
              </Flex>
            )}

            {user_not_found !== true && success === false && (
              <Flex middle center flex={1} height={'50%'}>
                <Text align="center" color="theme">
                  Your password reset link has already been used or expired.
                </Text>
                <center>
                  <Button
                    className={styles.button}
                    onClick={() => window.location.replace('/')}
                  >
                    Go to Login
                  </Button>
                </center>
              </Flex>
            )}
          </Flex>

          <Flex className={styles.footer}>
            &#169; Sense7ai {today.getFullYear()} ALL RIGHTS RESERVED
          </Flex>
        </Flex>
        <Flex className={styles.splitrow_2}>
          <Flex className={styles.logo}>
            <center>
              <SvgZitaLogo />
            </center>
          </Flex>
          <Flex className={styles.center_aligh_slider}>
            <img src={Forgot} alt="log" />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default SetNewPassword;
