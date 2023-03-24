import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import { AppDispatch, RootState } from '../../store';
import SvgZitaLogo from '../../icons/SvgZitaLogo';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import { home } from '../../appRoutesPath';
import { isEmpty } from '../../uikit/helper';
import { checkUpperCase, specialCharacter } from '../constValue';
import styles from './setpasswordscreen.module.css';
import SetNewPassword, { newPassFormProps } from './SetNewPassword';
import PasswordSuccessfully from './PasswordSuccessfully';
import {
  emailActiveMiddleWare,
  passwordSetRequestMiddleWare,
} from './store/middleware/loginMiddleWare';

const initial: newPassFormProps = {
  newPass: '',
  changePass: '',
};

const handleValidation = (values: newPassFormProps) => {
  const errors: Partial<newPassFormProps> = {};
  if (values.newPass !== values.changePass) {
    errors.changePass = `The two password fields didn't match.`;
  }
  if (
    (!isEmpty(values.newPass) && values.newPass.length < 8) ||
    (values.newPass.length > 12 &&
      !checkUpperCase.test(values.newPass) &&
      !specialCharacter.test(values.newPass))
  ) {
    errors.newPass = '';
  }
  return errors;
};

type ParamsType = {
  userId: string;
  confirmationToken: string;
};

const SetPasswordScreen = () => {
  const { userId, confirmationToken } = useParams<ParamsType>();
  const dispatch: AppDispatch = useDispatch();
  const [isSuccess, setSuccess] = useState(false);
  // inital email api call for url params baseed
  useEffect(() => {
    dispatch(
      emailActiveMiddleWare({
        userid: userId,
        confirmation_token: confirmationToken,
      }),
    );
  }, []);

  const { isLoading, success, user_not_found, setPassLoader, setPassSuccess } =
    useSelector(({ emailActiveReducers, setPasswordReducers }: RootState) => {
      return {
        isLoading: emailActiveReducers.isLoading,
        success: emailActiveReducers.success,
        user_not_found: emailActiveReducers.user_not_found,
        setPassLoader: setPasswordReducers.isLoading,
        setPassSuccess: setPasswordReducers.success,
      };
    });

    // reset password submit
  const hanldeSubmit = (values: newPassFormProps) => {
    dispatch(
      passwordSetRequestMiddleWare({
        userid: userId,
        password2: values.changePass,
        password1: values.newPass,
      }),
    ).then((res) => {
      if (res.payload.success) {
        setSuccess(true);
      }
    });
  };
  const formik = useFormik({
    initialValues: initial,
    onSubmit: hanldeSubmit,
    validate: (value) => handleValidation(value),
    enableReinitialize: true,
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight}
      center
    >
      <div style={{ width: 1200, height: '100%' }}>
        {setPassLoader && <Loader />}
        <Flex className={styles.svgZitaFlex} row center between>
          <SvgZitaLogo />
          <Button onClick={() => window.location.replace(home)}>Home</Button>
        </Flex>
        {isSuccess && <PasswordSuccessfully />}
        {setPassSuccess !== true && success === true && (
          <SetNewPassword formik={formik} />
        )}
        {user_not_found === true && (
          <Flex middle center flex={1} height={'50%'}>
            <Text align="center" color="gray">
              User not found
            </Text>
          </Flex>
        )}
        {user_not_found !== true && success === false && (
          <Flex middle center flex={1} height={'50%'}>
            <Text align="center" color="gray">
              Your password reset link has already been used or expired.
            </Text>
          </Flex>
        )}
      </div>
    </Flex>
  );
};

export default SetPasswordScreen;
