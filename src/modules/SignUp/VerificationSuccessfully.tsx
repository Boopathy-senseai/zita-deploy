import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgVerificationEmailIcon from '../../icons/SvgVerificationEmailIcon';
import { Button } from '../../uikit';
import styles from './verificationsuccessfully.module.css';

const VerificationSuccessfully = (props: any) => {
  const Redirect = () => {
    props.history.push('/login');
  };
  return (
    <Flex middle center  style={{ marginTop: '140px' }}>
      <Flex middle center className={styles.overAll}>
        <Flex middle center>
          <SvgVerificationEmailIcon fill={'#581845'} />
        </Flex>
        <Text size={20} bold align="center" style={{ margin: '8px 0' }}>
        Activation link has been sent successfully. 
        </Text>
        <Text align="center"size={16}>
        Incase if you are not able to find our mail, Please check the spam folder.
        </Text>
        <Flex middle>
                        <Button
                          style={{
                             
                            position: 'relative',
                            marginTop:'20px',
                            borderRadius: '5px', 
                          }}
                          onClick={() => Redirect()}
                        >
                          OK
                        </Button>
                      </Flex>
      </Flex>
    </Flex>
  );
};
export default VerificationSuccessfully;
