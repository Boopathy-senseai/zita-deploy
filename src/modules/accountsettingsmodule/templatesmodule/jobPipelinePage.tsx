import React, { useState, useEffect, useRef, createRef } from 'react';
import { Card } from 'react-bootstrap';
import classNames, { Value } from 'classnames/bind';
import { FormikProps, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import SvgBack from '../../../icons/SvgBack';
import Flex from '../../../uikit/Flex/Flex';
import InputText from '../../../uikit/InputText/InputText';
import Text from '../../../uikit/Text';
import { enterKeyPress, isEmpty } from '../../../uikit/helper';
import SvgTickBox from '../../../icons/SvgTickBox';
import SvgCloseBox from '../../../icons/SvgCloseBox';
import { Button, LinkWrapper, Loader } from '../../../uikit';
import { AppDispatch, RootState } from '../../../store';
import SvgPlusCircle from '../../../icons/SvgAddCircle';
import { Chip } from '../../../uikit/StagesChip/stagesChip';
import { StageCard } from '../../../uikit/StageCard/stagesCard';
import { StageData, jobPipelineForm } from './templatesPageTypes';
import {
  addJobPipelineStageMiddleWare,
  deleteJobPipelineStageMiddleWare,
  updateJobPipelineStageMiddleWare,
  jobPipelineStagesMiddleWare,
  jobPipelineSuggestionsMiddleWare,
  reorderJobPipelineStageMiddleWare,
} from './store/middleware/templatesmiddleware';

import styles from './jobPipelinePage.module.css';
import ReorderStage from './reorder';

const cx = classNames.bind(styles);
type FormProps = {
  handleBack: () => void;
  buttondata: number;
  //location: string;
};

const JobPipelinePage = ({ handleBack, buttondata }: FormProps) => {
  // const reorderRef = useRef<Reorder>(null);
  const [stage, setStage] = useState(false);
 //const userId = {id: "403"}
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    //dispatch(jobPipelineStagesMiddleWare(userId));
    dispatch(jobPipelineStagesMiddleWare());
    dispatch(jobPipelineSuggestionsMiddleWare());
  }, []);

  const { stages, suggestions, isLoading } = useSelector(
    ({ templatePageReducers }: RootState) => ({
      isLoading: templatePageReducers.isLoading,
      stages: templatePageReducers.stages,
      suggestions: templatePageReducers.suggestions,
    }),
  );

  const onStageEdit = (value: StageData) => {
    dispatch(updateJobPipelineStageMiddleWare(value));
  };

  const onStageDelete = (doc: StageData) => {
    dispatch(deleteJobPipelineStageMiddleWare(doc.id));
  };

  const addStage = (doc: { id: string; title: string }) => {
    dispatch(
      addJobPipelineStageMiddleWare({
        id: doc.id,
        color: 'gray',
        title: doc.title,
        disabled: false,
      }),
    );
  };

  const toggleStage = () => {
    setStage(!stage);
    formik.resetForm();
  };
  const isDuplicate = (title: string, data: string[]) => {
    return data
      .map((str) => str.trim().toLowerCase() === title.trim().toLowerCase())
      .includes(true);
  };
  const handleJobPipeline = (values: jobPipelineForm) => {
    const errors: Partial<jobPipelineForm> = {};

    if (!isEmpty(values.title) && values.title.length > 25) {
      errors.title = 'Stage name should not exceed 25 characters.';
    }
    if (
      isDuplicate(
        values.title,
        stages.map((doc) => doc.title),
      )
    ) {
      errors.title = 'Already stage name exists';
    }
    return errors;
  };
  const [isPipelineLoader, setPipelineLoader] = useState(false);

  const initial = {
    title: '',
    pipelineTitle: '',
  };
  const formik = useFormik({
    initialValues: initial,
    validate: handleJobPipeline,
    onSubmit: (form) => {
      addStage({ id: `${new Date().getTime()}`, title: form.title });
      toggleStage();
    },
  });

  const isStageExist = (id: string) => {
    return stages.find((doc) => doc.id === id) !== undefined;
  };
  const defaultStage: StageData = {
    id: '1STG',
    color: '#581845',
    title: 'New Applicants',
    disabled: true,
    palatteDisabled: true,
  };

  const onReorderChange = (list: StageData[]) => {
    dispatch(reorderJobPipelineStageMiddleWare(list));
  };

  return (
    <Flex>
      <Flex row start className={styles.title} onClick={handleBack}>
        <SvgBack height={16} width={16} />
        <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
          Back to Pipeline
        </Text>
      </Flex>
      <Flex column className={styles.bottomBorder}>
        <Flex flex={1} marginBottom={30}>
          <InputText
            inputConatinerClass={styles.with80}
            label="Pipeline Title"
            labelSize={16}
            required
            value={formik.values.pipelineTitle}
            style={{ width: 'fit-content' }}
            onChange={formik.handleChange('pipelineTitle')}
            className={styles.input}
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
                Create, Rename, reorder and delete job pipeline stages.
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
                list={stages}
                onEdit={onStageEdit}
                onDelete={onStageDelete}
                onChange={onReorderChange}
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
              {suggestions.map((doc, index) => {
                const isActive = isStageExist(doc.id);
                return (
                  <Chip
                    key={index}
                    isActive={isActive}
                    doc={doc}
                    index={index}
                    onAdd={addStage}
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
          <Button onClick={() => undefined} disabled={!formik.isValid}>
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
          <Button onClick={() => undefined} disabled={!formik.isValid}>
            Update
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default JobPipelinePage;
