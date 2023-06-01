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
import { useForm } from '../../../hooks/useForm';
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

export interface SuggestionForm {
  title: string;
}

interface Props {
  wk_id: number;
  suggestions: SuggestionData[];
  localStages: StageData[];
  isStageDuplicate: (name: string) => boolean;
  onAddStageFromSuggestion: (value: any) => void;
  onRemoveStage: (id: number) => void;
  isStageExist: (name: string) => boolean;
}

const PipelineSuggestions: React.FC<Props> = (props) => {
  const {
    wk_id,
    localStages,
    suggestions,
    isStageDuplicate,
    onRemoveStage,
    isStageExist,
    onAddStageFromSuggestion,
  } = props;
  const form: SuggestionForm = { title: '' };
  const [stage, setStage] = useState(false);
  const [isPipelineLoader, setPipelineLoader] = useState(false);

  const skipStages = (doc: SuggestionData) => {
    return !localStages
      .map((item) => item.stage_name.trim().toLowerCase())
      .includes(doc.stage_name.trim().toLowerCase());
  };

  const handleJobPipeline = (values: SuggestionForm) => {
    const errors: Partial<SuggestionForm> = {};
    if(!isEmpty(values.title) && values?.title.trim() === ""){
      errors.title = "Enter a valid stage name";
    }
    if (!isEmpty(values.title) && values.title.trim().length > 25) {
      errors.title = 'Stage name should not exceed 25 characters.';
    }
    if (isStageDuplicate(values.title)) {
      errors.title = 'Already stage name exists';
    }
    return errors;
  };

  const formik = useForm<SuggestionForm>({
    initialValues: form,
    validate: handleJobPipeline,
    onSubmit: (data) => {
      // formik.handleChange('title')(data.title.trim());
      onAddStageFromSuggestion({
        stage_name: data.title.trim(),
        stage_order: localStages.length + 1,
        stage_color: '#888888',
        suggestion_id: new Date().getTime(),
        wk_id_id: wk_id,
        is_disabled: false,
      });
      toggleStage();
    },
  });

  const toggleStage = () => {
    setStage(!stage);
    formik.setFieldValue('title', '');
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      formik.handleSubmit();
    }
  };

  return (
    <Flex row wrap className={styles.borderLine}>
      {suggestions.filter(skipStages).map((doc, index) => {
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
              name='title'
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
        </>
      )}
    </Flex>
  );
};

export default PipelineSuggestions;
