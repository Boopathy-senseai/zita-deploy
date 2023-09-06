import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import SvgView from '../../../../icons/SvgView';
import { AppDispatch } from '../../../../store';
import Button from '../../../../uikit/Button/Button';
import Card from '../../../../uikit/Card/Card';
import ErrorMessage from '../../../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../../../uikit/Flex/Flex';
import { isEmpty } from '../../../../uikit/helper';
import InputText from '../../../../uikit/InputText/InputText';
import Loader from '../../../../uikit/Loader/Loader';
import Text from '../../../../uikit/Text/Text';
import Toast from '../../../../uikit/Toast/Toast';
import { passwordChangeMiddleWare } from '../../../accountsettingsmodule/userprofilemodule/store/middleware/userprofilemiddleware';
import {
  checkUpperCase,
  specialCharacter,
  THIS_FIELD_REQUIRED,
} from '../../../constValue';
import { ErrorMessages } from '../../../Login/SetNewPassword';
import styles from './passwordchangescreen.module.css';

type formikProps = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const initial: formikProps = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

  // form validation
const schema = Yup.object().shape({
  newPassword: Yup.string().required(THIS_FIELD_REQUIRED),
  currentPassword: Yup.string().required(THIS_FIELD_REQUIRED),
  confirmPassword: Yup.string().required(THIS_FIELD_REQUIRED),
});

const PasswordChangeScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isError, setError] = useState(false);
  const [isShowCurrent, setShowCurrent] = useState(false);
  const [isShowNewPass, setShowNewPass] = useState(false);
  const [isShowChangePass, setShowChnagePass] = useState(false);
  const [isLoader, setLoader] = useState(false);

  // password change submit
  const hanldeSubmit = (values: formikProps) => {
    setLoader(true);
    const formData = new FormData();
    formData.append('old_password', values.currentPassword);
    formData.append('new_password1', values.newPassword);
    formData.append('new_password2', values.confirmPassword);
    dispatch(
      passwordChangeMiddleWare({
        formData,
      }),
    ).then((res: any) => {
      if (res.payload.data.success) {
        Toast('Password changed successfully', 'LONG');
        setError(false);
      } else {
        setError(true);
      }
      setLoader(false);
    });
  };

  // form validation
  const handleValidation = (values: formikProps) => {
    const errors: Partial<formikProps> = {};

    if (
      !isEmpty(values.confirmPassword) &&
      values.newPassword !== values.confirmPassword
    ) {
      errors.confirmPassword = `The two password fields didn't match.`;
    }
    if (
      (!isEmpty(values.newPassword) && values.newPassword.length < 8) ||
      (values.newPassword.length > 12 &&
        !checkUpperCase.test(values.newPassword) &&
        !specialCharacter.test(values.newPassword))
    ) {
      errors.newPassword = '';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: hanldeSubmit,
    validate: handleValidation,
    validationSchema: schema,
  });
  const handleInputLength = (e, fieldName) => {
    const maxLength = 12; // Maximum length allowed
  
    if (e.target.value.length >= maxLength) {
      e.preventDefault(); // Prevent further input
      const truncatedValue = e.target.value.slice(0, maxLength);
      formik.setFieldValue(fieldName, truncatedValue); // Update the field value
    }
  };
  const [inputLengthError, setInputLengthError] = useState(false);
 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputLength = event.target.value.length;

    // Check if input length exceeds 20 characters
    if (inputLength > 12) {
      setInputLengthError(true);
    } else {
      setInputLengthError(false);
      formik.handleChange('currentPassword')(event); // Update the formik value
    }
  };

  const checkFillValue =
    isEmpty(formik.values.confirmPassword) ||
    isEmpty(formik.values.newPassword) ||
    isEmpty(formik.values.currentPassword)
      ? true
      : false;
  const checkNewPass =
    (!isEmpty(formik.values.newPassword) &&
      formik.values.newPassword.length < 8) ||
    (formik.values.newPassword.length > 12 &&
      !checkUpperCase.test(formik.values.newPassword) &&
      !specialCharacter.test(formik.values.newPassword));

      const submit=()=>{
        if(inputLengthError===false){
        formik.handleSubmit();}
      }
  return (
    <Flex className={styles.overAll}>
      {isLoader && <Loader />}
      <Text bold size={16} className={styles.passwordTextStyle}>
        Password Change
      </Text>
      <Card className={styles.cardOverAll}>
        <Flex row top>
          <Flex flex={3}>
            <InputText
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              keyboardType={!isShowCurrent ? 'password' : 'text'}
              label="Current Password"
              required
              value={formik.values.currentPassword}
              onChange={handleInputChange}
              actionRight={() => (
                <Button
                  types="link"
                  onClick={() => setShowCurrent(!isShowCurrent)}
                >
                  <SvgView nonView={isShowCurrent} height={20} width={20} />
                </Button>
              )}
            />
            {
              inputLengthError===true &&
              <Text size={12} color="error">
                   Current password should be a maximum of 12 characters
                </Text>
            }
            {!isEmpty(formik.values.currentPassword) &&
              isEmpty(formik.errors.currentPassword) &&
              isError && (
                <Text size={12} color="error">
                  Your current password is incorrect
                </Text>
              )}
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="currentPassword"
            />
          </Flex>
          <Flex flex={3} marginLeft={16} marginRight={16}>
            <InputText
              keyboardType={!isShowNewPass ? 'password' : 'text'}
              label="New Password"
              required
              value={formik.values.newPassword}
              onChange={formik.handleChange('newPassword')}
              onKeyPress={(e) => handleInputLength(e, 'newPassword')}
              actionRight={() => (
                <Button
                  types="link"
                  onClick={() => setShowNewPass(!isShowNewPass)}
                >
                  <SvgView nonView={isShowNewPass} height={20} width={20} />
                </Button>
              )}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="newPassword"
            />
            {!isEmpty(formik.values.newPassword) && checkNewPass && (
              <Flex columnFlex>
                <ErrorMessages
                  message="Your password must contain at least one uppercase."
                  error={!checkUpperCase.test(formik.values.newPassword)}
                />
                <ErrorMessages
                  message="Your password must be between 8-12 characters."
                  error={
                    formik.values.newPassword.length < 8 ||
                    formik.values.newPassword.length > 12
                  }
                />
                <ErrorMessages
                  message="Your password must contain at least one special character."
                  error={!specialCharacter.test(formik.values.newPassword)}
                />
              </Flex>
            )}
          </Flex>
          <Flex flex={3} marginRight={16}>
            <InputText
              keyboardType={!isShowChangePass ? 'password' : 'text'}
              label="Confirm New Password"
              required
              value={formik.values.confirmPassword}
              onChange={formik.handleChange('confirmPassword')}
              onKeyPress={(e) => handleInputLength(e, 'confirmPassword')}
              actionRight={() => (
                <Button
                  types="link"
                  onClick={() => setShowChnagePass(!isShowChangePass)}
                >
                  <SvgView nonView={isShowChangePass} height={20} width={20} />
                </Button>
              )}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="confirmPassword"
            />
          </Flex>
          <Flex className={styles.btnFlex}>
            <Button onClick={submit} disabled={checkFillValue}>
              Change
            </Button>
          </Flex>
          <Flex flex={3}>
            <></>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default PasswordChangeScreen;
