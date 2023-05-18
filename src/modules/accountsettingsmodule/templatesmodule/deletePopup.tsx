import classNames from 'classnames/bind';
import Text from '../../../uikit/Text';
import { Button, Flex, Modal } from '../../../uikit';
import styles from './deletePopup.module.css';
import { PipelineData } from './templatesPageTypes';

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
          <Text bold color="theme" className={styles.insertStyles}>
            The Pipeline has been associated with the job post, so you cannot
            delete the pipeline.
          </Text>
          <Flex row end marginTop={20} className={styles.borderLine}>
            <Button
              className={styles.cancel}
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
        <Text bold color="theme" className={styles.insertStyles}>
          This will Delete the Pipeline.
        </Text>
        <Text color="theme" className={styles.insertStyles}>
          Are You sure?
        </Text>
        <Flex row end marginTop={20} className={styles.borderLine}>
          <Button className={styles.cancel} types={'primary'} onClick={onClose}>
            Cancel
          </Button>
          <Button className={styles.update} onClick={()=> onDelete(data)}>
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
