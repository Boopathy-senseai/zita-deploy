import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import SvgResetPasswordIcon from '../../icons/SvgResetPasswordIcon';
import { PRIMARY } from '../../uikit/Colors/colors';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../uikit/Flex/Flex';
//import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import SvgZitaLogo from '../../icons/SvgZitaLogo';
import Forgot from '../../assets/images/Forgotpassword.png';
import SvgEmail from '../../icons/SvgEmail';
import SvgLeft from '../../icons/SvgLeft';
import styles from './forgotpassword.module.css';
const today = new Date();
import { emailMiddleWare } from './store/middleware/loginMiddleWare';

export type forgotFormProps = {
  forgotEmail: string;
};

type Props = {
  forgotFormik: FormikProps<forgotFormProps>;
  handleForgotClose: () => void;
  setEmailValid: (arg: boolean) => void;
  ResetSuccess: boolean;
  // isEmailValid: boolean;
};

const ForgotPassword = ({
  forgotFormik,
  handleForgotClose,
  setEmailValid,
  ResetSuccess,
}: //isEmailValid,
Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [show, setshow] = useState(true);
  useEffect(() => {
    dispatch(emailMiddleWare({ email: forgotFormik.values.forgotEmail })).then(
      (res) => {
        if (res.payload.success === false) {
          setEmailValid(true);
        }
        if (res.payload.success === true) {
          setEmailValid(false);
        }
      },
    );
  }, [forgotFormik.values.forgotEmail]);
  return (
    <>
      {console.log(show, setshow)}

      <Flex className={styles.row}>
        <Flex className={styles.splitrow_1}>
          <Flex className={styles.center_aligh}>
            <Button types="link" onClick={handleForgotClose}>
              <SvgLeft height={15} width={15} />
            </Button>

            <div className={styles.container}>
              {ResetSuccess === true ? (
                <>
                  <Flex middle center>
                    <SvgResetPasswordIcon fill={PRIMARY} />
                  </Flex>

                  <Flex middle center className={styles.text_margin}>
                    <Text size={22} className={styles.text} bold>
                      Reset your password
                    </Text>
                  </Flex>
                  <Flex className={styles.text_margin}>
                    <Text size={18} className={styles.error_content}>
                      <ul style={{ marginLeft: '50px' }}>
                        <li>
                          A link to reset your password has been sent to your
                          registered email.
                        </li>
                      </ul>
                    </Text>
                  </Flex>
                  <Flex>
                    <Text size={18} className={styles.error_content}>
                      <ul style={{ marginLeft: '50px' }}>
                        <li>
                          Please check your spam folder if you haven’t received
                          it in 3-5 minutes.
                        </li>
                      </ul>
                    </Text>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex middle>
                    <Text size={20} className={styles.text} bold>
                      Forgot your password?
                    </Text>
                  </Flex>
                  <Flex middle>
                    <Text className={styles.verify_name}>
                      Please enter your registered email id to receive the
                      password reset link.
                    </Text>
                  </Flex>

                  <div>
                    <InputText
                      className={styles.input}
                      placeholder="Your email "
                      required
                      value={forgotFormik.values.forgotEmail}
                      onChange={forgotFormik.handleChange('forgotEmail')}
                      keyboardType="email"
                      actionLeft={() => (
                        <Button types="link" className={styles.usericon}>
                          <SvgEmail height={15} width={17} fill={'none'} />
                        </Button>
                      )}
                    />
                  </div>

                  <Flex className={styles.error_msg}>
                    <ErrorMessage
                      name="forgotEmail"
                      errors={forgotFormik.errors}
                      touched={forgotFormik.touched}
                    />
                  </Flex>

                  <Button
                    className={styles.login_button}
                    onClick={forgotFormik.handleSubmit}
                    // disabled={isEmpty(forgotFormik.values.forgotEmail)}
                  >
                    Send Link
                  </Button>
                </>
              )}
            </div>
          </Flex>
          <Flex className={styles.footer}>
            &#169; Sense7ai {today.getFullYear()} ALL RIGHTS RESERVED
          </Flex>
        </Flex>

        <Flex className={styles.splitrow_2}>
          <Flex middle className={styles.logo}>
            <SvgZitaLogo width={240} height={125} />
          </Flex>

          <Flex className={styles.center_aligh_slider}>
            <img src={Forgot} alt="log" />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ForgotPassword;
