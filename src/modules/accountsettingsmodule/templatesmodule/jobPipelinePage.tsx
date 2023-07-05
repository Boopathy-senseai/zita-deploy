import React, { useState, useEffect, useRef, createRef } from 'react';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import SvgBack from '../../../icons/SvgBack';
import Flex from '../../../uikit/Flex/Flex';
import InputText from '../../../uikit/InputText/InputText';
import Text from '../../../uikit/Text';
import { isEmpty } from '../../../uikit/helper';
import { Button, Loader, Toast } from '../../../uikit';
import { AppDispatch, RootState } from '../../../store';
import { StageCard } from '../../../uikit/StageCard/stagesCard';
import { useStages } from '../../../hooks/useStages';
import { StageData } from '../../../hooks/useStages/types';
import { useForm } from '../../../hooks/useForm/useForm';
import { useSuggestions } from '../../../hooks/useSuggestions';
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
import PipelineSuggestions from './suggestions';

const cx = classNames.bind(styles);
type FormProps = {
  handleBack: () => void;
  buttondata: number;
  wk_id?: number;
};

const JobPipelinePage = ({ handleBack, buttondata, wk_id }: FormProps) => {
  const [stage, setStage] = useState(false);
  const [form, setForm] = useState({ pipelineTitle: '' });
  const [isSubmitLoader, setSubmitLoader] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const {
    piplineList,
    pipeline,
    stages,
    suggestions,
    pipelineSuggestions,
    isLoading,
    isUpdateLoading,
    error,
  } = useSelector(
    ({ templatePageReducers, pipelinePageReducers }: RootState) => {
      return {
        isLoading: templatePageReducers.isLoading,
        isUpdateLoading: templatePageReducers.isUpdateLoading,
        error: templatePageReducers.error,
        pipeline: templatePageReducers.data[0],
        piplineList: pipelinePageReducers.pipeline,
        stages: templatePageReducers.stages,
        pipelineSuggestions: pipelinePageReducers.suggestion,
        suggestions: templatePageReducers.suggestion,
      };
    },
  );

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
    isEqual,
    sortStages,
    updateStageOrder,
    NEW_APPLICANT_STAGE,
  } = useStages(stages);

  const { localSuggestions, removedSuggestions, onRemoveSuggestion } =
    useSuggestions(wk_id ? suggestions : pipelineSuggestions);

  useEffect(() => {
    if (error !== '') {
      Toast(error, 'LONG', 'error');
    }
  }, [error]);

  useEffect(() => {
    if (wk_id) {
      // setSubmitLoader(true);
      dispatch(getTemplateDataMiddleWare(wk_id));
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

  const isPipelineDuplicate = (title: string) => {
    const trimTitle = title.trim().toLowerCase();
    const list = pipeline
      ? piplineList.filter(
          (doc) =>
            doc.pipeline_name.trim().toLowerCase() !==
            pipeline?.pipeline_name.trim().toLowerCase(),
        )
      : piplineList;
    const tilteMap = [...list].map((doc) =>
      doc.pipeline_name.trim().toLowerCase(),
    );
    return tilteMap.map((str) => str === trimTitle).includes(true);
  };

  const handleJobPipeline = (values: jobPipelineForm) => {
    const errors: Partial<jobPipelineForm> = {};
    const trimValue = values?.pipelineTitle.trim();
    // if (error) {
    //   errors.pipelineTitle = error;
    // }
    if (isEmpty(values.pipelineTitle)) {
      errors.pipelineTitle = 'This field is required';
    }
    if (!isEmpty(values.pipelineTitle) && values?.pipelineTitle.trim() === '') {
      errors.pipelineTitle = 'Enter a valid Pipeline Title';
    }

    if (
      !isEmpty(values.pipelineTitle) &&
      values.pipelineTitle.trim().length > 25
    ) {
      errors.pipelineTitle = 'Pipeline Title should not exceed 25 characters.';
    }

    if (isPipelineDuplicate(values.pipelineTitle)) {
      errors.pipelineTitle = 'Pipeline Title already exist';
    }
    return errors;
  };

  const formik = useForm<jobPipelineForm>({
    initialValues: form,
    initialValidation: true,
    validate: handleJobPipeline,
    // enableReinitialize: true,
    onSubmit: (data) => {
      console.log(data);
      // formik.handleChange('pipelineTitle')(data.pipelineTitle.trim());
      if (wk_id) {
        handleUpdate();
      } else {
        handleCreate();
      }
      toggleStage();
    },
  });

  const isFormDirty = () => {
    if (stages && stages.length !== localStages.length) {
      return true;
    }
    if (stages && !isEqual(stages)) {
      return true;
    }
    if (removedSuggestions.length !== 0) {
      return true;
    }

    if (pipeline && formik.isDirty) {
      return true;
    }
    return false;
  };
  const isFormValid = () => {
    if (!formik.isValid) return false;
    if (localStages?.length === 0) return false;
    return true;
  };

  /// Save Form

  const handleCreate = () => {
    const payload: ICreateTemplate = {
      pipeline_name: formik.values.pipelineTitle.trim(),
      stages: updateStageOrder(localStages),
      suggestion: localSuggestions.map((v) => v.suggestion_id),
    };
    // setSubmitLoader(true);
    dispatch(createTemplateDataMiddleWare(payload)).then(() => {
      // setSubmitLoader(false);
      handleBack();
    });
  };

  /// update form

  const handleUpdate = () => {
    const payload: IUpdateTemplate = {
      pipeline_name: formik.values.pipelineTitle.trim(),
      workflow_id: wk_id,
      stages: updateStageOrder(localStages),
      suggestion: localSuggestions.map((v) => v.suggestion_id),
    };
    // setSubmitLoader(true);
    dispatch(updateTemplateDataMiddleWare(payload)).then(() => {
      // setSubmitLoader(false);
      Toast('Changes saved successfully.', 'LONG');
    });
  };
 
  /// skip stages
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {isUpdateLoading && <Loader />}
      <Flex
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Flex column className={styles.bottomBorder}>
          <Flex column marginBottom={15} marginTop={15} start>
            <InputText
              inputConatinerClass={styles.with80}
              label="Pipeline Title"
              disabled={pipeline?.is_active}
              labelSize={14}
              required
              name="pipelineTitle"
              value={formik.values.pipelineTitle}
              style={{ width: '250px', marginBottom: '5px' }}
              onChange={formik.handleChange('pipelineTitle')}
              className={styles.input}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="pipelineTitle"
            />
          </Flex>

          <Flex
            row
            noWrap
            style={{
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
              flex: 1,
              overflow: 'hidden',
              boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.36)',
              padding: 28,
              margin: '0 1px',
              borderRadius: 10,
            }}
          >
            <Flex
              flex={4}
              className={`${styles.columnGroup} ${styles.borderRightLine}`}
            >
              <Flex column start marginBottom={20}>
                <Text color="black2" bold size={14}>
                  Pipeline Stages
                </Text>
                <Text color="black2" size={13}>
                  Create, Rename, reorder, and delete job pipeline stages.
                </Text>
              </Flex>
              <Flex
                column
                style={{
                  overflowY: 'auto',
                  maxHeight: '390px',
                  padding: '2px 2px',
                }}
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
            <Flex
              flex={4}
              className={`${styles.columnGroup} ${styles.paddingLeft}`}
            >
              <Flex column start marginBottom={20}>
                <Text bold color="black2" size={14}>
                  Proposed Stages
                </Text>
                <Text size={13} color="black2">
                  Click on the below stages to add it to your pipeline.
                </Text>
              </Flex>
              <PipelineSuggestions
                wk_id={wk_id}
                localStages={localStages}
                suggestions={localSuggestions}
                isStageExist={isStageExist}
                onAddStageFromSuggestion={onAddStageFromSuggestion}
                onRemoveStage={onRemoveStage}
                isStageDuplicate={isStageDuplicate}
                onRemoveSuggestion={(value) =>
                  onRemoveSuggestion(value.suggestion_id)
                }
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex row middle className={styles.title}>
          <Flex row center onClick={handleBack} style={{ cursor: 'pointer' }}>
            {/* <SvgBack height={14} width={14} /> */}
            <Button types={'secondary'}>Back to Pipeline</Button>
          </Flex>
          {buttondata === 1 ? (
            <Flex row end>
              <Button
                className={styles.cancel}
                onClick={handleBack}
                types={'primary'}
              >
                Cancel
              </Button>
              <Button
                onClick={formik.handleSubmit}
                // disabled={!(isFormValid() && isFormDirty())}
              >
                Save
              </Button>
            </Flex>
          ) : (
            <Flex row end>
              <Button
                className={styles.cancel}
                onClick={handleBack}
                types={'primary'}
              >
                Cancel
              </Button>
              <Button
                onClick={formik.handleSubmit}
                disabled={!(isFormValid() && isFormDirty())}
              >
                Update
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default JobPipelinePage;
