import SvgMail from '../../icons/SvgMail';
import SvgPhone from '../../icons/SvgPhone';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './candidatenavbar.module.css';

const CandidateNavBar = () => {
  return (
    <Flex className={styles.overAll}>
      <Flex row>
        <div className={styles.profile} />
        <Flex columnFlex flex={1} between>
          <Text bold size={20} color="white">
            Meer Hussain Sharma
          </Text>
          <Flex row between center className={styles.phoneFlex}>
            <Flex row center>
              <Flex row center>
                <SvgPhone height={16} width={16} />
                <Text
                  size={16}
                  color="white"
                  bold
                  style={{ marginLeft: 8, marginRight: 16 }}
                >
                  Meer Hussain Sharma
                </Text>
              </Flex>
              <Flex row center>
                <SvgMail height={16} width={16} />
                <Text size={16} color="white" bold style={{ marginLeft: 8 }}>
                  Meer Hussain Sharma
                </Text>
              </Flex>
            </Flex>
            <Flex row center>
              <Text size={16} color="white" bold style={{ marginRight: 30 }}>
                About
              </Text>
              <Text size={16} color="white" bold style={{ marginRight: 30 }}>
                Skills
              </Text>
              <Text size={16} color="white" bold style={{ marginRight: 30 }}>
                Qualification
              </Text>
              <Text size={16} color="white" bold style={{ marginRight: 30 }}>
                Work Experience
              </Text>
              <Text size={16} color="white" bold>
                Projects
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CandidateNavBar;
