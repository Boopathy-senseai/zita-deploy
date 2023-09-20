import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../uikit/Loader/Loader';
//import Text from '../../uikit/Text/Text';
import { AppDispatch, RootState } from '../../store';
// import SvgZitaLogo from '../../icons/SvgZitaLogo';
// import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
// import { home } from '../../appRoutesPath';
import { isEmpty } from '../../uikit/helper';
import { checkUpperCase, specialCharacter } from '../constValue';
//import styles from './setpasswordscreen.module.css';
import SetNewPassword, { newPassFormProps } from './SetNewPassword';
//import PasswordSuccessfully from './PasswordSuccessfully';
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
  const [employeelogin,setemployeelogin]=useState(false);
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

  const hanldeSubmit = (values: newPassFormProps) => {
    dispatch(
      passwordSetRequestMiddleWare({
        userid: userId,
        password2: values.changePass,
        password1: values.newPass,
      }),
    )
      .then((res) => {
        setemployeelogin(res.payload.is_employee)
        if (res.payload.success) {
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log('error ', err);
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
    <>

      <Flex>
        <SetNewPassword
          formik={formik}
          employeelogin={employeelogin}
          isSuccess={isSuccess}
          setPassSuccess={setPassSuccess}
          success={success}
          user_not_found={user_not_found}
        />
      </Flex>
    </>
  );
};

export default SetPasswordScreen;
