/* eslint-disable */
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isEmpty } from '../uikit/helper';
import SvgView from '../icons/SvgView';
import Loader from '../uikit/Loader/Loader';
import Text from '../uikit/Text/Text';
import Flex from '../uikit/Flex/Flex';
import styles from './setpassword.module.css';
import LabelWrapper from '../uikit/Label/LabelWrapper';
import Button from '../uikit/Button/Button';
import { GARY_8 } from '../uikit/Colors/colors';
import { ErrorMessages } from '../modules/Login/SetNewPassword';
import {
  checkUpperCase,
  PASSWORD_MATCH,
  specialCharacter,
} from '../modules/constValue';
import Toast from '../uikit/Toast/Toast';

const SetPassword = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [isPassword, setPassword] = useState('');
  const [isChangePassword, setChangePassword] = useState('');
  const [isShowNewPass, setShowNewPass] = useState(false);
  const [isShowChangePass, setShowChnagePass] = useState(false);

  const myRef = useRef();

  ////////// Form Validation ////////////
  const schema = yup.object().shape({
    password: yup.string().required('This field is required'),
    confirm_password: yup.string().required('This field is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handelLogin = (data) => {
    setIsLogin(true);
    let userId = data;
    if (userId.password === userId.confirm_password) {
      const data = {
        email: userEmail,
        password: userId.password,
      };

      axios
        .patch('users/confirmation', data, {
          headers: { Authorization: '' },
        })
        .then(() => {
          // Toast('Login successfull');
          history.push('/login');
        })
        .catch((err) => {
          if (err.response.status !== 200) {
            Toast('Server Error ! Not Connected', 'LONG', 'error');
          }
        });
    } else {
      Toast('Password does not match', 'LONG', 'error');
    }
  };

  useEffect(() => {
    localStorage.clear();
    const data = {
      token: id,
    };
    axios
      .patch('users/check-token', data, {
        headers: { Authorization: '' },
      })
      .then((res) => {
        if (res.data.ststus === true) {
          setUserEmail(res.data.data.email);
        } else {
          localStorage.clear();
          return history.push('/login');
        }
        setLoader(true);
      })
      .catch((err) => {
        // setLoader(true);
        // if (err.response.data.success === false) {
        localStorage.clear();
        return history.push('/login');
        // }
      });
  }, [id]);

  const checkOne = !isEmpty(isPassword) && !checkUpperCase.test(isPassword);
  const checkTwo =
    !isEmpty(isPassword) && (isPassword.length < 8 || isPassword.length > 12);

  const isCheckThree =
    !isEmpty(isPassword) && !specialCharacter.test(isPassword);

  const isValid =
    checkOne === false && checkTwo === false && isCheckThree === false
      ? false
      : true;

  const changeValid =
    !isEmpty(isChangePassword) && isChangePassword !== isPassword;
  console.log('loader', loader);

  if (!loader) {
    return <Loader />;
  }
  return (
    <>
      {isLogin && <Loader />}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center justify-content-center full-height">
            <div className="col-lg-5 col-md-5 col-12">
              <Flex middle columnFlex center className={styles.titleContainer}>
                <Text size={20} bold>
                  Welcome to Zita.
                </Text>
                <Text>Create your password and activate your account</Text>
              </Flex>
              <div
                className="rounded-lg border rounded px-4"
                style={{
                  paddingTop: 16,
                  paddingLeft: '40px !important',
                  paddingRight: '40px !important',
                  backgroundColor: GARY_8,
                }}
              >
                <Text size={20} bold style={{ marginTop: 30 }}>
                  Login to your account
                </Text>
                <form
                  onSubmit={handleSubmit(handelLogin)}
                  className="form pb-4 pt-1"
                  action="#"
                  method="POST"
                  style={{ marginTop: 16 }}
                >
                  <div>
                    <LabelWrapper label="Email" required>
                      <input
                        className={styles.inputStyle}
                        type="text"
                        required
                        placeholder="email"
                        disabled
                        value={userEmail}
                      />
                    </LabelWrapper>
                  </div>
                  <div className={styles.marginTop}>
                    <LabelWrapper label="Password" required>
                      <div className={styles.inputPosition}>
                        <input
                          ref={myRef}
                          className={styles.inputStyle}
                          type={!isShowNewPass ? 'password' : 'text'}
                          {...register('password')}
                          name="password"
                          onChange={(e) => {
                            setValue('password', e.target.value);
                            setPassword(e.target.value);
                          }}
                        />
                        <div className={styles.actionRightStyle}>
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
                        </div>
                      </div>
                    </LabelWrapper>

                    <Text size={12} color="error">
                      {errors.password?.message}
                    </Text>

                    {!isEmpty(isPassword) && isValid && (
                      <Flex columnFlex>
                        <ErrorMessages
                          message="Your password must contain at least one uppercase."
                          error={!checkUpperCase.test(isPassword)}
                        />
                        <ErrorMessages
                          message="Your password must be between 8-12 characters."
                          error={
                            isPassword.length < 8 || isPassword.length > 12
                          }
                        />
                        <ErrorMessages
                          message="Your password must contain at least one special character."
                          error={!specialCharacter.test(isPassword)}
                        />
                      </Flex>
                    )}
                  </div>
                  <div className={styles.marginTop}>
                    <LabelWrapper label="Confirm password" required>
                      <div className={styles.inputPosition}>
                        <input
                          className={styles.inputStyle}
                          type={!isShowChangePass ? 'password' : 'text'}
                          name="confirm_password"
                          {...register('confirm_password')}
                          onChange={(e) => {
                            setValue('confirm_password', e.target.value);
                            setChangePassword(e.target.value);
                          }}
                        />
                        <div className={styles.actionRightStyle}>
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
                        </div>
                      </div>
                    </LabelWrapper>
                    {changeValid && (
                      <Text size={12} color="error">
                        {PASSWORD_MATCH}
                      </Text>
                    )}
                    <Text size={12} color="error">
                      {errors.confirm_password?.message}
                    </Text>
                  </div>
                  <div className={styles.btnContainer}>
                    <Button
                      disabled={
                        changeValid !== isValid ||
                        isEmpty(isPassword) ||
                        isEmpty(isChangePassword)
                      }
                      type="submit"
                      onClick={handleSubmit(handelLogin)}
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SetPassword;
