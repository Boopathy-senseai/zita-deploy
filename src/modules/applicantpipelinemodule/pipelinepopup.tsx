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
import { PipelineData } from '../accountsettingsmodule/templatesmodule/templatesPageTypes';
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

const PipelinePopup = ({
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
  const [defaultAll, setDefaultAll] = useState<boolean>(false);

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
      const defaultPipeline = pipelineData.find((doc) => doc.set_as_default);
      setSelectValue(
        getDefaultOption(defaultPipeline) || getDefaultOption(pipelineData[0]),
      );
    }
  }, [pipelineData]);
  console.log(pipelineData);
  return (
    <Modal open={openPipelinePopup}>
      <Flex flex={6} columnFlex className={styles.overAll}>
        <Text bold color="theme" className={styles.insertStyles}>
          Choose your pipeline
        </Text>
        <SelectTag
          value={selectValue}
          options={pipelineData.map((doc) => ({
            label: doc.set_as_default
              ? `${doc.pipeline_name} (default)`
              : doc.pipeline_name,
            value: doc.wk_id,
          }))}
          onChange={(option) => {
            console.log(option);
            setSelectValue(option);
          }}
          placeholder="Select"
        />
        <Flex row className={styles.checkBox}>
          <InputCheckBox
            // disabled={}
            checked={defaultAll}
            onChange={() => setDefaultAll(!defaultAll)}
          />
          <Text className={styles.checkBoxText}>
            Would you like to set the selected pipeline to all the Job Postings
          </Text>
        </Flex>

        <Text className={styles.orText}>Or</Text>

        <Button
          types="secondary"
          onClick={onNewPipeline}
          className={styles.newBtn}
        >
          <Text color="theme" size={14}>
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
          default_all: defaultAll,
        }),
      ).then(() => {
        onSuccessClose();
      });
    }
    ///
  }
};
export default PipelinePopup;
