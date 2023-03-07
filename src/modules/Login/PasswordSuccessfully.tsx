import SvgPasswordSuccessfullyIcon from '../../icons/SvgPasswordSuccessfullyIcon';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import { loginAuth } from '../../appRoutesPath';
import styles from './passwordsuccessfully.module.css';

const PasswordSuccessfully = () => {
  return (
    <Flex middle>
      <Flex middle center className={styles.overAll}>
        <Flex middle center>
          <SvgPasswordSuccessfullyIcon />
        </Flex>
        <Text size={20} bold align="center" style={{ margin: '8px 0' }}>
          Your password has changed successfully.
        </Text>
        <Flex center row middle>
          <Text style={{ marginRight: 2 }}>Click here to</Text>
          <LinkWrapper to={loginAuth}>
            <Button types="link">login</Button>
          </LinkWrapper>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PasswordSuccessfully;
