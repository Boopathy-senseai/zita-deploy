import SvgResetPasswordIcon from '../../icons/SvgResetPasswordIcon';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './resetpasswordsuccess.module.css';

const ResetPasswordSuccess = () => {
  return (
    <Flex middle>
      <Flex middle center className={styles.overAll}>
        <Flex middle center>
          <SvgResetPasswordIcon fill={PRIMARY} />
        </Flex>
        <Text size={20} bold align="center" style={{ margin: '8px 0' }}>
          Reset your password
        </Text>
        <Text align="center">
          A link to reset your password has been sent to your registered email.
        </Text>
        <Text align="center">
          Please check your spam folder if you haven’t received it in 3-5
          minutes.
        </Text>
      </Flex>
    </Flex>
  );
};

export default ResetPasswordSuccess;
