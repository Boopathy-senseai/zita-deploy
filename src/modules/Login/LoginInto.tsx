import { FormikProps } from 'formik';
import { useState } from 'react';
import SvgView from '../../icons/SvgView';
import Button from '../../uikit/Button/Button';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../uikit/Flex/Flex';
import { enterKeyPress, isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import styles from './loginscreen.module.css';

export type loginFormProps = {
  userName: string;
  email: string;
};

type Props = {
  formik: FormikProps<loginFormProps>;
  handleForgotOpen: () => void;
  isError: boolean;
  isInactive: boolean;
  loginTitle:string
};
const LoginInto = ({
  formik,
  handleForgotOpen,
  isError,
  isInactive,
  loginTitle
}: Props) => {
  const [isShowPass, setShowPass] = useState(false);

  // show password
  const handleShowPass = () => {
    setShowPass(!isShowPass);
  };

  return (
    <Flex middle>
      <Flex columnFlex className={styles.cardOverAll}>
        <Text size={20} bold>
          {loginTitle}
        </Text>
        <div className={styles.userInput}>
          <InputText
            label="Username/Email"
            required
            value={formik.values.userName}
            onChange={formik.handleChange('userName')}
            keyboardType="email"
          />
          <ErrorMessage
            name="userName"
            touched={formik.touched}
            errors={formik.errors}
          />
        </div>
        <div className={styles.userPassword}>
          <InputText
            label="Password"
            required
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            keyboardType={!isShowPass ? 'password' : 'text'}
            actionRight={() => (
              <Button types="link" onClick={handleShowPass} >
                <SvgView nonView={isShowPass} height={20} width={20}  />
              </Button>
            )}
            onKeyPress={(e) => enterKeyPress(e, formik.handleSubmit)}
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
        <Flex row center between className={styles.btnConatiner}>
          <Button
            disabled={
              isEmpty(formik.values.userName) || isEmpty(formik.values.email)
            }
            onClick={formik.handleSubmit}
          >
            Login
          </Button>
          <Button types="link" onClick={handleForgotOpen}>
            Forgot your password?
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginInto;
