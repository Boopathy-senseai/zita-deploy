import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import { InputCheckBox, LinkWrapper, SelectTag } from '../../uikit';
import Button from '../../uikit/Button/Button';
import { AppDispatch, RootState } from '../../store';
import { getPipelineDataMiddleWare } from '../accountsettingsmodule/templatesmodule/store/middleware/pipelinesmiddleware';
import { PipelineData } from '../../hooks/useStages/types';
import styles from './pipelinepopup.module.css';
import { getKanbanStagesMiddleWare } from './store/middleware/applicantpipelinemiddleware';

const cx = classNames.bind(styles);
const pipelineOption = [
  { value: '', label: 'Zita Pipeline' },
  { value: '1', label: 'Front End Dev' },
  { value: '2', label: 'Backend Dev' },
];

type Props = {
  jd_id: number;
  openPipelinePopup: boolean;
  onClose: () => void;
  onSuccessClose: () => void;
  onNewPipeline: () => void;
};

const PipelinePopupTwo = ({
  jd_id,
  openPipelinePopup,
  onClose,
  onSuccessClose,
  onNewPipeline,
}: Props) => {
  const [selectValue, setSelectValue] = useState<{
    label: string;
    value: number;
  } | null>(null);

  const { pipelineData, isLoading } = useSelector(
    ({ pipelinePageReducers, templatePageReducers }: RootState) => ({
      isLoading: pipelinePageReducers.isLoading,
      // isTemplateLoading: templatePageReducers.isLoading,
      pipelineData: pipelinePageReducers.pipeline,
    }),
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getPipelineDataMiddleWare());
  }, []);

  const getDefaultOption = (doc: PipelineData) => {
    if (!doc) return null;
    return { label: doc.pipeline_name, value: doc.wk_id };
  };

  useEffect(() => {
    if (pipelineData && pipelineData.length > 0) {
      const defaultPipeline = pipelineData.find((doc) => doc.default_all);
      setSelectValue(
        getDefaultOption(defaultPipeline) || getDefaultOption(pipelineData[0]),
      );
    }
  }, [pipelineData]);

  const optionsList = pipelineData.map((doc) => ({
    label: doc.default_all
      ? `${doc.pipeline_name}(Default)`
      : doc.pipeline_name,
    value: doc.wk_id,
  }));
  return (
    <Modal open={openPipelinePopup}>
      <Flex flex={6} columnFlex className={styles.overAll}>
        <Text size={14}  color="theme" className={styles.insertStyles}>
          You can either continue with the current pipeline or choose another
          pipeline from the list.
        </Text>
        <SelectTag
          value={selectValue}
          options={optionsList}
          onChange={(option) => {
            setSelectValue(option);
          }}
          placeholder="Select"
        />
        <Text size={14} className={styles.orText}>Or</Text>
        <Button
          types="secondary"
          onClick={onNewPipeline}
          className={styles.newBtn}
        >
          <Text color="theme" bold size={13}>
            Create New Pipeline
          </Text>
        </Button>

        <Flex row end marginTop={20} className={styles.borderLine}>
          <Button className={styles.cancel} types={'primary'} onClick={onClose}>
            Cancel
          </Button>
          <Button className={styles.update} onClick={handleUpdate}>
            Apply
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );

  function handleUpdate() {
    if (jd_id && selectValue) {
      dispatch(
        getKanbanStagesMiddleWare({
          jd_id,
          workflow_id: selectValue.value,
        }),
      ).then(() => {
        onSuccessClose();
      });
    }
    ///
  }
};
export default PipelinePopupTwo;
