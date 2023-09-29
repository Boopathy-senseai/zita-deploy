import { memo, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../uikit/Flex/Flex';

import { isEmpty } from '../../uikit/helper';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import Text from '../../uikit/Text/Text';
import RichText from '../common/RichText';
import { JdOutput } from './createJdTypes';
import type { dsFormProps } from './formikTypes';
import JobTitle from './JobTitle';
import styles from './jobtitledescription.module.css';

type ParamsType = {
  jdId: string;
  editJdId: string;
};
type Props = {
  values: dsFormProps;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  job_title: string;
  job_description: string;
  errors: any;
  touched: any;
  handleTempOpen: () => void;
  jd_output: JdOutput;
  isNonDs?: boolean;
  jd_id: string;
  is_taken: boolean;
  updateJd: string;
  onDirty: () => void;
  onPristine: () => void;
};

const JobTitleDescription = ({
  values,
  setFieldValue,
  job_title,
  job_description,
  errors,
  touched,
  handleTempOpen,
  jd_output,
  isNonDs,
  jd_id,
  is_taken,
  updateJd,
  onDirty,
  onPristine,
}: Props) => {
  const { jdId, editJdId } = useParams<ParamsType>();
  const editorRef = useRef<any>(null);
  const [isRich, setRich] = useState(false);

  // free fill initial value
  useEffect(() => {
    setFieldValue(
      'jobDescription',
      editorRef.current && editorRef.current.getContent(),
    );
    if (jd_output.richtext_job_description === values.jobDescription) {
      onPristine();
    } else {
      onDirty();
    }
  }, [isRich]);

  const handleOpenInput = () => {
    setRich(true);
  };

  const handleCloseInput = () => {
    setRich(false);
  };

  useEffect(() => {
    setFieldValue('jobDescription', job_description);
  }, [job_description]);

  useEffect(() => {
    setFieldValue('jobDescription', jd_output.richtext_job_description);
  }, [jd_output]);

  useEffect(() => {
    if (jdId === undefined && editJdId === undefined) {
      setFieldValue('jobDescription', '');
    }
  }, []);

  return (
    <Flex columnFlex>
      <Flex row center className={styles.jobTitleFlex}>
        <Text size={14} bold className={styles.jobTitle}>
          Job Title & Description
        </Text>
      </Flex>
      <JobTitle
        values={values}
        setFieldValue={setFieldValue}
        job_title={job_title}
        jd_output={jd_output}
        isNonDs={isNonDs}
        jd_id={jd_id}
        is_taken={is_taken}
        errors={errors}
        touched={touched}
        updateJd={updateJd}
        onDirty={onDirty}
      />
      <div className={styles.richTextContainer}>
        <LabelWrapper label="Job Description" required>
          <RichText
            onFocus={handleOpenInput}
            onBlur={handleCloseInput}
            onInit={(_a: any, editor: any) => (editorRef.current = editor)}
            initialValue={values.jobDescription}
            height={500}
            placeholder="Enter the job description here including the candidate job duties and requirements"
            // onChange={() => {

            //   // onDirty();
            //   console.log('desssss')
            // }}
          />
        </LabelWrapper>

        <input
          name="jobDescription"
          id="jobtitledescription___richtext"
          className={styles.displayNone}
        />
        {!isEmpty(values.jobDescription) && values.jobDescription.length < 201 && (
          <Text size={12} color="error">
            {'Text length should contain at least 200 characters.'}
          </Text>
        )}
        {/* {!isEmpty(values.jobDescription) &&
          values.jobDescription.length > 20000 && (
            <Text size={12} color="error">
              Text length should not exceed 20000 characters
            </Text>
          )} */}
        <ErrorMessage name="jobDescription" touched={touched} errors={errors} />
      </div>
    </Flex>
  );
};

export default memo(JobTitleDescription);
