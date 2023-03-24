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
import styles from './setnewpassword.module.css';

export type newPassFormProps = {
  newPass: string;
  changePass: string;
};

type Props = {
  formik: FormikProps<newPassFormProps>;
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

const SetNewPassword = ({ formik }: Props) => {
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
    <Flex middle>
      <Flex columnFlex className={styles.cardOverAll}>
        <Text size={20} bold>
          Set New Password
        </Text>
        <div className={styles.userInput}>
          <InputText
            label="New Password"
            required
            value={formik.values.newPass}
            onChange={formik.handleChange('newPass')}
            keyboardType={!isShowNewPass ? 'password' : 'text'}
            actionRight={() => (
              <Button
                types="link"
                onClick={() => setShowNewPass(!isShowNewPass)}
              >
                <SvgView nonView={isShowNewPass} height={20} width={20} />
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
        </div>
        <div className={styles.userPassword}>
          <InputText
            label="Confirm New Password"
            required
            value={formik.values.changePass}
            onChange={formik.handleChange('changePass')}
            keyboardType={!isShowChangePass ? 'password' : 'text'}
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
            name="changePass"
            errors={formik.errors}
            touched={formik.touched}
          />
        </div>
        <Flex row center between className={styles.btnConatiner}>
          <Button
            disabled={
              isEmpty(formik.values.newPass) ||
              isEmpty(formik.values.changePass)
            }
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SetNewPassword;
