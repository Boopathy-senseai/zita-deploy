import SvgAdd from '../../../../icons/SvgAdd';
import SvgBack from '../../../../icons/SvgBack';
import { Button, Text, Flex } from '../../../../uikit';
import styles from './emailtemplateScreen.module.css';

type props = {
  handleBack: () => void;
};
const Emailtemplatescreen = ({ handleBack }: props) => {
  return (
    <Flex
      column
      className={styles.overflowContainer}
      style={{ padding: '0px 10px' }}
    >
      <Flex row between className={styles.titleBar}>
        <Flex
          row
          center
          className={styles.title}
          onClick={() => {
            handleBack();
          }}
        >
          <SvgBack height={14} width={14} />
          <Text color="theme" bold size={13} style={{ marginLeft: '5px' }}>
            Email Template
          </Text>
        </Flex>

        <Button>
          <Flex row center className={styles.pointer}>
            <SvgAdd height={10} width={10} fill="#FFFFFF" />
            <Text bold color="white" size={13} style={{ marginLeft: '10px' }}>
              Add Template
            </Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Emailtemplatescreen;
