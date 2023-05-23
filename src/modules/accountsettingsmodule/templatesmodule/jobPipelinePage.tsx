import React, { useState, useEffect, useRef, createRef } from 'react';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import SvgBack from '../../../icons/SvgBack';
import Flex from '../../../uikit/Flex/Flex';
import InputText from '../../../uikit/InputText/InputText';
import Text from '../../../uikit/Text';
import { enterKeyPress, isEmpty } from '../../../uikit/helper';
import SvgTickBox from '../../../icons/SvgTickBox';
import SvgCloseBox from '../../../icons/SvgCloseBox';
import { Button, Loader, Toast } from '../../../uikit';
import { AppDispatch, RootState } from '../../../store';
import SvgPlusCircle from '../../../icons/SvgAddCircle';
import { Chip } from '../../../uikit/StagesChip/stagesChip';
import { StageCard } from '../../../uikit/StageCard/stagesCard';
import { useStages } from '../../../hooks/useStages';
import { StageData, SuggestionData } from '../../../hooks/useStages/types';
import {
  ICreateTemplate,
  IUpdateTemplate,
  jobPipelineForm,
} from './templatesPageTypes';
import {
  getTemplateDataMiddleWare,
  updateTemplateDataMiddleWare,
  createTemplateDataMiddleWare,
} from './store/middleware/templatesmiddleware';

import styles from './jobPipelinePage.module.css';
import ReorderStage from './reorder';
import { templatePageReducerActions } from './store/reducer/templatesreducer';

const cx = classNames.bind(styles);
type FormProps = {
  handleBack: () => void;
  buttondata: number;
  wk_id?: number;
};

const JobPipelinePage = ({ handleBack, buttondata, wk_id }: FormProps) => {
  const [stage, setStage] = useState(false);
  const [form, setForm] = useState({ title: '', pipelineTitle: '' });
  const [isSubmitLoader, setSubmitLoader] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { pipeline, stages, suggestions, pipelineSuggestions, isLoading } =
    useSelector(({ templatePageReducers, pipelinePageReducers }: RootState) => {
      return {
        isLoading: templatePageReducers.isLoading,
        pipeline: templatePageReducers.data[0],
        stages: templatePageReducers.stages,
        pipelineSuggestions: pipelinePageReducers.suggestion,
        suggestions: templatePageReducers.suggestion,
      };
    });

  const {
    localStages,
    onEditStage,
    onAddStageFromSuggestion,
    onAddStage,
    onRemoveStage,
    onReorder,
    isStageDuplicate,
    isStageExist,
    addDefaultStages,
  } = useStages(stages);

  useEffect(() => {
    if (wk_id) {
      setSubmitLoader(true);
      dispatch(getTemplateDataMiddleWare(wk_id)).then(() => {
        setSubmitLoader(false);
      });
    } else {
      dispatch(templatePageReducerActions.clearState());
      addDefaultStages(undefined);
    }
    return () => {
      dispatch(templatePageReducerActions.clearState());
    };
  }, [wk_id]);
  useEffect(() => {
    if (pipeline) {
      setForm({ ...form, pipelineTitle: pipeline.pipeline_name });
    }
  }, [pipeline]);

  const toggleStage = () => {
    setStage(!stage);
    formik.setFieldValue('title', '');
  };

  const handleJobPipeline = (values: jobPipelineForm) => {
    const errors: Partial<jobPipelineForm> = {};
    console.log(values.pipelineTitle.length);
    if (!isEmpty(values.pipelineTitle) && values.pipelineTitle.length > 25) {
      console.log(true);
      errors.pipelineTitle = 'Title name should not exceed 25 characters.';
    }

    if (!isEmpty(values.title) && values.title.length > 25) {
      errors.title = 'Stage name should not exceed 25 characters.';
    }
    if (isStageDuplicate(values.title)) {
      errors.title = 'Already stage name exists';
    }

    return errors;
  };
  const [isPipelineLoader, setPipelineLoader] = useState(false);

  const formik = useFormik({
    initialValues: form,
    validate: handleJobPipeline,
    enableReinitialize: true,
    onSubmit: (data) => {
      onAddStageFromSuggestion({
        stage_name: data.title,
        stage_order: localStages.length + 1,
        stage_color: 'gray',
        suggestion_id: new Date().getTime(),
        wk_id_id: wk_id,
        is_disabled: false,
      });
      toggleStage();
    },
  });

  const isFormDirty = () => {
    if (stages && stages.length !== localStages.length) return true;
    if (stages && JSON.stringify(stages) !== JSON.stringify(localStages)) {
      return true;
    }

    if (pipeline && formik.values.pipelineTitle !== pipeline.pipeline_name) {
      return true;
    }
    return false;
  };
  const isFormValid = () => {
    if (formik.values.pipelineTitle === '') return false;
    if (localStages?.length === 0) return false;
    return true;
  };
  const defaultStage: StageData = {
    id: 1,
    stage_color: '#581845',
    stage_name: 'New Applicants',
    is_disabled: true,
    // palatteDisabled: true,
  };

  /// Save Form

  const handleCreate = () => {
    const payload: ICreateTemplate = {
      pipeline_name: formik.values.pipelineTitle,
      stages: localStages,
    };
    setSubmitLoader(true);
    dispatch(createTemplateDataMiddleWare(payload)).then(() => {
      setSubmitLoader(false);
    });
    handleBack();
  };

  /// update form

  const handleUpdate = () => {
    const payload: IUpdateTemplate = {
      pipeline_name: formik.values.pipelineTitle,
      workflow_id: wk_id,
      stages: localStages,
    };
    setSubmitLoader(true);
    dispatch(updateTemplateDataMiddleWare(payload)).then(() => {
      setSubmitLoader(false);
      Toast('Changes saved successfully.', 'LONG');
    });
    // handleBack()
  };
  /// skip stages

  const skipStages = (doc: SuggestionData) => {
    return !localStages
      .map((item) => item.stage_name.trim().toLowerCase())
      .includes(doc.stage_name.trim().toLowerCase());
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      formik.handleSubmit();
    }
  };
  return (
    <Flex>
      {isSubmitLoader && <Loader />}
      <Flex row start className={styles.title} onClick={handleBack}>
        <SvgBack height={14} width={14} />
        <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
          Back to Pipeline
        </Text>
      </Flex>
      <Flex column className={styles.bottomBorder}>
        <Flex flex={1} marginBottom={30}>
          <InputText
            inputConatinerClass={styles.with80}
            label="Pipeline Title"
            disabled={pipeline?.is_active}
            labelSize={16}
            required
            value={formik.values.pipelineTitle}
            style={{ width: 'fit-content' , marginBottom: '5px' }}
            onChange={formik.handleChange('pipelineTitle')}
            className={styles.input}
          />
          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="pipeline"
          />
        </Flex>
        <Flex row noWrap>
          <Flex
            flex={4}
            className={`${styles.columnGroup} ${styles.borderRightLine}`}
          >
            <Flex column start marginBottom={20}>
              <Text color="theme" size={16}>
                Pipeline Stages
              </Text>
              <Text color="black2">
                Create, Rename, reorder, and delete job pipeline stages.
              </Text>
            </Flex>
            <Flex column style={{ overFlow: 'none' }}>
              <StageCard
                doc={defaultStage}
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
          <Flex
            flex={4}
            className={`${styles.columnGroup} ${styles.paddingLeft}`}
          >
            <Flex column start marginBottom={20}>
              <Text color="theme" size={16}>
                Proposed Stages
              </Text>
            </Flex>
            <Flex row wrap className={styles.borderLine}>
              {(wk_id ? suggestions : pipelineSuggestions)
                .filter(skipStages)
                .map((doc, index) => {
                  const isActive = isStageExist(doc.stage_name);
                  return (
                    <Chip
                      key={index}
                      isActive={isActive}
                      doc={doc}
                      index={index}
                      onAdd={onAddStageFromSuggestion}
                      onRemove={onRemoveStage}
                    />
                  );
                })}
              {stage === false ? (
                <Button
                  types="secondary"
                  onClick={() => toggleStage()}
                  className={styles.newBtn}
                >
                  <Flex row center>
                    <SvgPlusCircle fill="#581845" />
                    <Text color="theme" size={14} style={{ marginLeft: '5px' }}>
                      Create a new stage
                    </Text>
                  </Flex>
                </Button>
              ) : (
                <>
                  <Flex column noWrap>
                    <InputText
                      value={formik.values.title}
                      onChange={formik.handleChange('title')}
                      lineInput
                      size={12}
                      className={styles.input}
                      onKeyPress={handleKeyPress}
                    />
                    <ErrorMessage
                      touched={formik.touched}
                      errors={formik.errors}
                      name="title"
                    />
                  </Flex>
                  <div className={styles.svgContainer}>
                    {isPipelineLoader ? (
                      <div className={styles.svgTick}>
                        <Loader withOutOverlay size={'small'} />
                      </div>
                    ) : (
                      <div
                        className={cx('svgTickMargin', {
                          svgTickDisable: isEmpty(formik.values.title),
                          tickStyle: !isEmpty(formik.values.title),
                        })}
                        //  onClick={handleLocationSubmit}
                        tabIndex={-1}
                        role={'button'}
                        onClick={() => {
                          formik.submitForm();
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
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {buttondata === 1 ? (
        <Flex row end marginTop={50} marginBottom={20}>
          <Button
            className={styles.cancel}
            onClick={handleBack}
            types={'primary'}
          >
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!isFormValid()}>
            Save
          </Button>
        </Flex>
      ) : (
        <Flex row end marginTop={50} marginBottom={20}>
          <Button
            className={styles.cancel}
            onClick={handleBack}
            types={'primary'}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!(isFormValid() && isFormDirty())}
          >
            Update
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default JobPipelinePage;
