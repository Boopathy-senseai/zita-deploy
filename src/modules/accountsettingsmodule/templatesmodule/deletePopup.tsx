import classNames from 'classnames/bind';
import Text from '../../../uikit/Text';
import { Button, Flex, Modal } from '../../../uikit';
import { PipelineData } from '../../../hooks/useStages/types';
import styles from './deletePopup.module.css';

const cx = classNames.bind(styles);

type Props = {
  visible: boolean;
  onDelete: (value: PipelineData) => void;
  onClose: () => void;
  data: PipelineData;
};

const DeletePopup = ({ visible, onDelete, onClose, data }: Props) => {
  const renderTitle = () => {
    if (data.associate) {
      return (
        <Flex flex={6} column center className={styles.overAll}>
          <Text size={14} color="theme" className={styles.insertStyles}>
            You cannot delete this pipeline as its associated with a job post.
          </Text>
          <Flex row end marginTop={20} className={styles.borderLine}>
            <Button
              // className={styles.cancel}
              types={'primary'}
              onClick={onClose}
            >
              OK
            </Button>
          </Flex>
        </Flex>
      );
    }
    return (
      <Flex flex={6} column center className={styles.overAll}>
        <Text size={14} color="theme" className={styles.insertStyles}>
          This action will delete the job pipeline and its stages.
        </Text>
        <Text size={13} color="theme" className={styles.insertStyles}>
          Are you sure to proceed?
        </Text>
        <Flex row end marginTop={20} className={styles.borderLine}>
          <Button className={styles.cancel} types={'primary'} onClick={onClose}>
            Cancel
          </Button>
          <Button className={styles.update} onClick={() => onDelete(data)}>
            Delete
          </Button>
        </Flex>
      </Flex>
    );
  };

  return (
    <Modal open={visible}>
      {/* <Flex flex={6} column center className={styles.overAll}> */}
      {renderTitle()}
      {/* <Flex row end marginTop={20} className={styles.borderLine}>
          <Button className={styles.cancel} types={'primary'} onClick={onClose}>
            Cancel
          </Button>
          <Button className={styles.update} onClick={onDelete}>
            Delete
          </Button>
        </Flex> */}
      {/* </Flex> */}
    </Modal>
  );
};
export default DeletePopup;
