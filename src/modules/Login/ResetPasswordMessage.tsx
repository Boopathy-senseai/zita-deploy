import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './forgotpassword.module.css';

const ResetPasswordMessage = () => {
  return (
    <Flex columnFlex className={styles.cardOverAll}>
      <Text align="center" size={18} bold>
        Reset your password
      </Text>
      <Text align="center"size={14}>
        A link to reset your password has been sent to your registered email.
      </Text>
      <Text align="center"size={14} >
        Please check your spam folder if you haven’t received it in 3-5 minutes.
      </Text>
    </Flex>
  );
};

export default ResetPasswordMessage;
