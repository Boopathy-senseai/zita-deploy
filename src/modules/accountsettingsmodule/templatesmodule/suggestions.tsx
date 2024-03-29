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
import styles from './jobPipelinePage.module.css';


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
  onRemoveSuggestion?: (value: SuggestionData) => void;
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
    onRemoveSuggestion,
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
    if (isEmpty(values.title) || values?.title.trim() === '') {
      errors.title = 'Enter a valid stage name.';
    }
    if (!isEmpty(values.title) && values.title.trim().length > 25) {
      errors.title = 'Stage name should not exceed 25 characters.';
    }
    if (isStageDuplicate(values.title)) {
      errors.title = 'Stage name already exist.';
    }
    return errors;
  };

  const formik = useForm<SuggestionForm>({
    initialValues: form,
    initialValidation: true,
    validate: handleJobPipeline,
    onSubmit: (data) => {
      // formik.handleChange('title')(data.title.trim());
      onAddStageFromSuggestion({
        stage_name: data.title.trim(),
        stage_order: localStages.length,
        stage_color: '#888888',
        suggestion_id: new Date().getTime(),
        wk_id_id: wk_id,
        is_disabled: false,
      });
      toggleStage();
      formik.resetForm();
    },
  });

  const onAddSuggestion = (doc: SuggestionData) => {
    onAddStageFromSuggestion({ ...doc, stage_order: localStages.length });
  };
  const toggleStage = () => {
    setStage(!stage);
    formik.setFieldValue('title', '');
    formik.resetForm();
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      formik.handleSubmit();
    }
  };

  return (
    <Flex row wrap className={styles.borderLine} style={{overflowY: "scroll", maxHeight:"390px"}}>
      {suggestions.filter(skipStages).map((doc, index) => {
        const isActive = isStageExist(doc.stage_name);
        return (
          <Chip
            key={index}
            isActive={isActive}
            doc={doc}
            index={index}
            onAdd={onAddSuggestion}
            onRemove={onRemoveStage}
            onDeleteSuggestion={onRemoveSuggestion}
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
            <Text color="theme" bold size={13} style={{ marginLeft: '5px' }}>
              Create a new stage
            </Text>
          </Flex>
        </Button>
      ) : (
        <Flex row noWrap>
          <Flex column noWrap>
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
            {isPipelineLoader ? (
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
                  if(!formik.isValid || isEmpty(formik.values.title.trim())) return;
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
  );
};

export default PipelineSuggestions;
