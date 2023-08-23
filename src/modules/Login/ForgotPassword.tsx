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
  handlefunction1?: () => void;
  forgotFormik: FormikProps<forgotFormProps>;
  handleForgotClose: () => void;
  setEmailValid: (arg: boolean) => void;
  ResetSuccess: boolean;
  // isEmailValid: boolean;
};

const ForgotPassword = ({
  handlefunction1,
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
            <div className={styles.container}>
              {ResetSuccess === true ? (
                <>
                  <Flex middle center>
                  <div style={{marginTop: '-15px'}}>
                    <SvgResetPasswordIcon fill={PRIMARY} />
                  </div>
                  </Flex>

                  <Flex middle center className={styles.text_margin}>
                    <Text size={18} className={styles.text} bold>
                      Reset your password
                    </Text>
                  </Flex>
                  <Flex className={styles.text_margin}>
                    <Text size={14} className={styles.error_content}>
                      <ul style={{ marginLeft: '50px' }}>
                        <li
                          style={{
                            listStyleType: 'none',
                            textAlign: 'center',
                            marginLeft: '-48px',
                            fontSize: '14px',
                          }}
                        >
                          A link to reset your password has been sent to your
                          registered email. Please check your spam folder if you
                          haven’t received it in 3-5 minutes.
                        </li>
                      </ul>
                    </Text>
                  </Flex>
                  <Flex row middle center>
                  <Button types="primary"  onClick={handleForgotClose}>
                    
                      {/* <Flex>
                        {' '}
                        <SvgLeft height={15} width={15} />
                      </Flex>
                      <Flex>
                        <Text className={styles.Backtextchange}> */}
                           OK
                           {/* </Text>
                      </Flex> */}
                   
                  </Button>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex flex={2}></Flex>
                  <Flex flex={8} column>
                    <Flex>
                      <Text
                        size={20}
                        className={styles.text}
                        bold
                        style={{ marginLeft: '63px' }}
                      >
                        Forgot your password?
                      </Text>
                    </Flex>
                    <Flex>
                      <Text
                        className={styles.verify_name}
                        style={{ marginLeft: '63px', marginRight: '-5px' }}
                      >
                        Please enter your registered email id to receive the
                        password reset link.
                      </Text>
                    </Flex>

                    <Flex>
                      <InputText
                        className={styles.input}
                        placeholder="Your registered email"
                        required
                        value={forgotFormik.values.forgotEmail}
                        onChange={forgotFormik.handleChange('forgotEmail')}
                        keyboardType="email"
                        actionLeft={() => (
                          <Button types="link" className={styles.usericon}>
                          <div style={{marginTop: '-15px'}}>
                            <SvgEmail height={15} width={17} fill={'none'} />
                          </div>
                          </Button>
                        )}
                      />
                    </Flex>
                    {handlefunction1()}
                    <Flex className={styles.error_msg}>
                      <ErrorMessage
                        name="forgotEmail"
                        errors={forgotFormik.errors}
                        touched={forgotFormik.touched}
                      />
                    </Flex>
                  </Flex>
                  <Flex flex={2}></Flex>
                  
            {/* <Flex row className={styles.backbuttonchange}> */}
              {/* <Flex flex={1} marginTop={20}>
                <Button
                  types="secondary"
                  className={styles.backtohome}
                  onClick={handleForgotClose}
                >
                  {/* <Flex row center> */}
                  {/* <Flex>
                            {' '}
                            <SvgLeft height={15} width={15} />
                          </Flex> */}
                  {/* <Flex> */}
                  {/* <Text className={styles.Backtextchange}> */}
                  {/* Back */}
                  {/* </Text> */}
                  {/* </Flex> */}
                  {/* </Flex> */}
               {/* </Flex> </Button>
              </Flex>  */}

              
                <Button
                  className={styles.login_button}
                  onClick={forgotFormik.handleSubmit}
                  // disabled={isEmpty(forgotFormik.values.forgotEmail)}
                  types="primary"
                >
                  Send Link
                </Button>
                <Flex row middle center marginTop={20} marginLeft={5} style={{cursor:'pointer'}}>
                  <Text onClick={handleForgotClose} style={{fontWeight:600}} >
                     
                           Go Back
                           
                  </Text>
                  </Flex>
           
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
