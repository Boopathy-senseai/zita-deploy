import React, { useState } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import classNames, { Value } from 'classnames/bind';
import {
  Button,
  ErrorMessage,
  InputText,
  Loader,
  Modal,
  Toast,
} from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgEditStages from '../../icons/SvgEditStages';
import { StageCard } from '../../uikit/StageCard/stagesCard';
import ReorderStage from '../accountsettingsmodule/templatesmodule/reorder';
import SvgPlusCircle from '../../icons/SvgAddCircle';
import SvgTickBox from '../../icons/SvgTickBox';
import SvgCloseBox from '../../icons/SvgCloseBox';
import { isEmpty } from '../../uikit/helper';
import { useStages } from '../../hooks/useStages';
import { useForm } from '../../hooks/useForm';
import { StageData } from '../../hooks/useStages/types';
import { AppDispatch } from '../../store';
import styles from './totalapplicant.module.css';
import { columnTypes } from './dndBoardTypes';
import { updateKanbanStagesMiddleware } from './store/middleware/applicantpipelinemiddleware';

const cx = classNames.bind(styles);

interface Props {
  open: boolean;
  stages: StageData[];
  columns: columnTypes;
  jd_id: number;
  handleClosePopup: () => void;
}

const EditStagesModal: React.FC<Props> = (props) => {
  const { open, stages, columns, handleClosePopup, jd_id } = props;
  const dispatch: AppDispatch = useDispatch();
  const [stage, setStage] = useState(false);
  const [isStageLoader, setStageLoader] = useState(false);

  const {
    localStages,
    onEditStage,
    onAddStageFromSuggestion,
    onAddStage,
    onRemoveStage,
    onReorder,
    isStageDuplicate,
    isEqual,
    resetStages,
    NEW_APPLICANT_STAGE,
  } = useStages(stages, columns);

  const initial = {
    title: '',
  };

  const handleJobPipeline = (values: { title: string }) => {
    const errors: Partial<{ title: string }> = {};
    if (isEmpty(values.title) || values?.title.trim() === '') {
      errors.title = 'Enter a valid stage name';
    }

    if (!isEmpty(values.title.trim()) && values.title.trim().length > 25) {
      errors.title = 'Stage name should not exceed 25 characters.';
    }
    if (isStageDuplicate(values.title)) {
      errors.title = 'Stage name already exist.';
    }
    return errors;
  };
  const toggleStage = () => {
    setStage(!stage);
    formik.resetForm();
  };

  const formik = useForm<{ title: string }>({
    initialValues: initial,
    isTrim: false,
    validate: handleJobPipeline,
    initialValidation: true,
    onSubmit: (data) => {
      // formik.handleChange("stage_name")(data.title.trim());
      onAddStageFromSuggestion({
        stage_name: data.title.trim(),
        // stage_order: suggestions.length + 1,
        stage_order: (localStages || [])?.length + 1,
        stage_color: '#888888',
        suggestion_id: new Date().getTime(),
        wk_id_id: new Date().getTime(),
        is_disabled: false,
      });
      toggleStage();
    },
  });

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      formik.handleSubmit();
    }
  };

  const isFormDirty = () => {
    if (stages && stages.length !== localStages.length) {
      return true;
    }
    if (stages && !isEqual(stages)) {
      return true;
    }
    return false;
  };

  return (
    <Modal open={open}>
      <Flex flex={6} columnFlex className={styles.Popup}>
        <Flex row center className={styles.insertStyles}>
          <Flex marginBottom={5}>
            {' '}
            <SvgEditStages fill="#333333" />
          </Flex>
          <Text
            size={14}
            style={{ marginLeft: '10px', marginBottom: '5px' }}
            bold
            // color="theme"
          >
            Edit Stages
          </Text>
        </Flex>
        <Flex row noWrap>
          <Flex flex={1} className={styles.columnGroup}>
            <Flex style={{ borderBottom: '1px solid #c3c3c3' }}>
              {stage === false ? (
                <Button
                  types="secondary"
                  onClick={() => toggleStage()}
                  className={styles.newBtn}
                >
                  <Flex row center>
                    <SvgPlusCircle fill="#581845" />
                    <Text color="theme" bold size={13} style={{ marginLeft: '5px' }}>
                      Create a new stage
                    </Text>
                  </Flex>
                </Button>
              ) : (
                <Flex row noWrap marginBottom={15} width={'100%'}>
                  <Flex column flex={1}>
                    <InputText
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange('title')}
                      lineInput
                      size={14}
                      className={styles.input}
                      onKeyPress={handleKeyPress}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMessage
                      touched={formik.touched}
                      errors={formik.errors}
                      name="title"
                    />
                  </Flex>
                  <div className={styles.svgContainer}>
                    {isStageLoader ? (
                      <div className={styles.svgTick}>
                        <Loader withOutOverlay size={'small'} />
                      </div>
                    ) : (
                      <div
                        className={cx('svgTickMargin', {
                          svgTickDisable: !formik.isValid,
                          tickStyle: !isEmpty(formik.values.title.trim()),
                        })}
                        //  onClick={handleLocationSubmit}
                        tabIndex={-1}
                        role={'button'}
                        onClick={() => {
                          formik.handleSubmit();
                        }}
                      >
                        <SvgTickBox className={styles.tickStyle} />
                      </div>
                    )}

                    <div
                      className={styles.svgClose}
                      onClick={toggleStage}
                      tabIndex={-1}
                      role={'button'}
                      // onClick={() => formik.resetForm()}
                    >
                      <SvgCloseBox className={styles.tickStyle} />
                    </div>
                  </div>
                </Flex>
              )}
            </Flex>
            <Flex
              column
              className={styles.stagesCard}
              // style={{
              //   overFlow: 'none',
              //   paddingTop: '15px',
              //   borderTop: '1px solid #c3c3c3',
              // }}
            >
              <StageCard
                doc={NEW_APPLICANT_STAGE}
                index={-1}
                isColorPicker={false}
                isDrag={false}
                // onEdit={onStageEdit}
                //onDelete={onStageDelete}
              />
              <ReorderStage
                list={localStages}
                onEdit={onEditStage}
                onDelete={onRemoveStage}
                onChange={onReorder}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex row end marginTop={10} className={styles.borderLine}>
          <Button
            className={styles.cancel}
            types={'primary'}
            onClick={onCloseModal}
          >
            Cancel
          </Button>
          {/* <Button
            className={styles.update}
            onClick={handleUpdateStages}
            disabled={!isFormDirty()}
          >
            Apply 
          </Button> */}
          {isStageLoader ? (
            <Flex className={styles.applyBtnLoader}>
              <Loader size="small" withOutOverlay />
            </Flex> 
            ) : (
            <Button
              className={styles.update}
              onClick={handleUpdateStages}
              disabled={!isFormDirty()}
            >
              Apply 
            </Button>
            )
          }
        </Flex>
      </Flex>
    </Modal>
  );

  function onCloseModal() {
    setStage(false);
    resetStages();
    handleClosePopup();
  }

  function handleUpdateStages() {
    setStageLoader(true)
    if (jd_id) {
      dispatch(
        updateKanbanStagesMiddleware({
          jd_id,
          // workflow_id: workflowId,
          stages: localStages,
        }),
      ).then(() => {
        setStageLoader(false)
        Toast('Changes saved successfully', 'LONG');
        onCloseModal();
      });
    } else {
      console.log('workflow id not there');
    }
  }
};

export default EditStagesModal;
