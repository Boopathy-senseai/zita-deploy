import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, mailformat } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import styles from './forgotpassword.module.css';
import { emailMiddleWare } from './store/middleware/loginMiddleWare';

export type forgotFormProps = {
  forgotEmail: string;
};

type Props = {
  forgotFormik: FormikProps<forgotFormProps>;
  handleForgotClose: () => void;
  setEmailValid: (arg: boolean) => void;
  isEmailValid: boolean;
};

const ForgotPassword = ({
  forgotFormik,
  handleForgotClose,
  setEmailValid,
  isEmailValid,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isTrueEmail, setTrueEmail] = useState(false);

  // email validation api call
  useEffect(() => {
    if (!isEmpty(forgotFormik.values.forgotEmail)) {
      dispatch(
        emailMiddleWare({ email: forgotFormik.values.forgotEmail }),
      ).then((res) => {
        if (res.payload.success === false) {
          setEmailValid(true);
          setTrueEmail(true);
        }
        if (res.payload.success === true) {
          setEmailValid(false);
        }
      });
    }
  }, [forgotFormik.values.forgotEmail]);

  return (
    <Flex middle>
      <Flex columnFlex className={styles.cardOverAll}>
        <Text size={20} bold>
          Forgot your password?
        </Text>
        <Text>
          Please enter your registered email id to receive the password reset
          link.
        </Text>
        <div className={styles.userInput}>
          <InputText
            label="Email"
            required
            value={forgotFormik.values.forgotEmail}
            onChange={forgotFormik.handleChange('forgotEmail')}
            keyboardType="email"
          />
          <ErrorMessage
            name="forgotEmail"
            errors={forgotFormik.errors}
            touched={forgotFormik.touched}
          />
          {!isEmpty(forgotFormik.values.forgotEmail) &&
            isEmailValid &&
            isTrueEmail &&
            mailformat.test(forgotFormik.values.forgotEmail) && (
              <Text size={12} color="error">
                This email is not registered with Zita
              </Text>
            )}
        </div>
        <Flex row center between className={styles.btnConatiner}>
          <Button
            disabled={isEmpty(forgotFormik.values.forgotEmail)}
            onClick={forgotFormik.handleSubmit}
          >
            Send Link
          </Button>
          <Button types="link" onClick={handleForgotClose}>
            Go Back
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
