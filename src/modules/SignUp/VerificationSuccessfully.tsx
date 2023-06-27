import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgVerificationEmailIcon from '../../icons/SvgVerificationEmailIcon';
import styles from './verificationsuccessfully.module.css';

const VerificationSuccessfully = () => {
  return (
    <Flex middle>
      <Flex middle center className={styles.overAll}>
        <Flex middle center>
          <SvgVerificationEmailIcon />
        </Flex>
        <Text size={20} bold align="center" style={{ margin: '8px 0' }}>
          Verification email sent successfully.
        </Text>
        <Text align="center"size={16}>
          Please click on the verification link sent to your email id to
          complete the registration.
        </Text>
        <Text align="center"size={16}>
          In case you are not able to find our mail, please check the spam
          folder.
        </Text>
      </Flex>
    </Flex>
  );
};
export default VerificationSuccessfully;
