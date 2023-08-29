import { Link } from 'react-router-dom';
import { Button, Flex } from '../../../../uikit';
import styles from './confirmationdialog.module.css';

type Props = {
  message: string;
  onConfirm: (boolean) => void;
  onCancel: (boolean) => void;
};

const IntegrationPopup = ({ message, onConfirm, onCancel }: Props) => {
  return (
    <>
      <Flex className={styles.container}>
        <Flex row className={styles.message}>
          {"Integrate your calendar inside zita application to create events"}
        </Flex>
        <Flex row end>
          <Button
            types={'primary'}
            className={styles.cancel}
            onClick={onCancel}
          >
            Cancel
          </Button>
          
          <Link to="/account_setting/settings?tab=4"><Button className={styles.button} onClick={onConfirm}>Intergate Calendar</Button></Link>
        </Flex>
      </Flex>
    </>
  );
};

export default IntegrationPopup;
