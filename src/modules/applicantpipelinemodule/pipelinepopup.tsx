import classNames from 'classnames/bind';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import { InputCheckBox, InputText, SelectTag } from '../../uikit';
import Button from '../../uikit/Button/Button';
import styles from './pipelinepopup.module.css';

const cx = classNames.bind(styles);
const pipelineOption = [
  { value: '', label: 'Zita' },
  { value: '1', label: 'Front End Dev' },
  { value: '2', label: 'Backend Dev' },
];

type Props = {
  openPipelinePopup: boolean;
  handleClosePipelinePopup: () => void;
};

const PipelinePopup = ({
  openPipelinePopup,
  handleClosePipelinePopup,
}: Props) => {
  return (
    <Modal open={openPipelinePopup}>
      <Flex flex={6} columnFlex className={styles.overAll}>
        <Text bold color="theme" className={styles.insertStyles}>
          Choose your pipeline
        </Text>
        <SelectTag
          value={'select'}
          options={pipelineOption}
          onChange={(option) => {}}
          placeholder="Select"
        />
        <Flex row className={styles.checkBox}>
          <InputCheckBox
            // disabled={}
            // checked={formik.values.terms_and_conditions === '1'}
            onChange={() => {}}
          />
          <Text className={styles.checkBoxText}>
            Would you like to set the selected pipeline to all the Job Postings
          </Text>
        </Flex>

        <Text className={styles.orText}>Or</Text>
        <Button types="secondary" onClick={() => {}} className={styles.newBtn}>
          <Text color="theme" size={14}>
            Create New Pipeline
          </Text>
        </Button>
        <Flex row end marginTop={20} className={styles.borderLine}>
          <Button className={styles.cancel} types={'primary'} onClick={handleClosePipelinePopup}>
            Cancel
          </Button>
          <Button className={styles.update} onClick={() => undefined}>
            Apply
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
export default PipelinePopup;
