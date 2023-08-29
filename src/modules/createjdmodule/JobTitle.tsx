import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import {
  ENTER_JD_ID,
  JOB_TITLE_LIMIT,
  THIS_FIELD_REQUIRED,
} from '../constValue';
import { JdOutput } from './createJdTypes';
import type { dsFormProps } from './formikTypes';
import styles from './jobtitle.module.css';
import { jobRoleData } from './mock';
import { validateJobIDMiddleWare } from './store/middleware/createjdmiddleware';

type Props = {
  values: dsFormProps;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  job_title: string;
  jd_output: JdOutput;
  isNonDs?: boolean;
  jd_id: string;
  is_taken: boolean;
  errors: any;
  touched: any;
  updateJd: string;
  onDirty: () => void;
};

const JobTitle = ({
  values,
  setFieldValue,
  job_title,
  jd_output,
  isNonDs,
  jd_id,
  is_taken,
  errors,
  touched,
  updateJd,
  onDirty,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setFieldValue('jobTitle', job_title);
  }, [job_title]);

  useEffect(() => {
    setFieldValue('jobTitle', jd_output.job_title);
    if (jd_output.job_role_id !== 0) {
      setFieldValue('jobRole', jd_output.job_role_id);
    }
    if (!updateJd) {
      setFieldValue('jobId', jd_output.job_id);
    }
  }, [jd_output]);

  useEffect(() => {
    if (updateJd && !isEmpty(values.jobId)) {
      dispatch(
        validateJobIDMiddleWare({ job_id: values.jobId, jd_id: updateJd }),
      );
    } else if (!isEmpty(values.jobId)) {
      dispatch(validateJobIDMiddleWare({ job_id: values.jobId, jd_id }));
    }
  }, [values.jobId]);

  return (
    <Flex row top className={styles.overAll}>
      <Flex flex={!isNonDs ? 4 : 8} className={styles.jobTitleFlex}>
        <InputText
          id="jobtitle__jobtitle"
          name="jobTitle"
          label="Job Title"
          required
          placeholder={isNonDs ? 'e.g. Sales Executive' : 'e.g. Data Scientist'}
          value={values.jobTitle}
          onChange={(e) => {
            setFieldValue('jobTitle', e.target.value);
            onDirty();
          }}
        />
        {isEmpty(values.jobTitle) &&
        <ErrorMessage name="jobTitle" touched={touched} errors={errors} />}
        {!isEmpty(values.jobTitle) && values.jobTitle.length > 50 && (
          <Text color="error" size={12}>
            {JOB_TITLE_LIMIT}
          </Text>
        )}
      </Flex>
      {!isNonDs && (
        <Flex flex={4} className={styles.jobRoleFlex}>
          <input name="jobRole" className={styles.displayNone} />
          <SelectTag
            inputId="jobtitle__jobrole"
            name="jobRole"
            label="Job Role"
            required
            options={jobRoleData}
            value={
              jobRoleData
                ? jobRoleData.find(
                    (option) => option.value === Number(values.jobRole),
                  )
                : ''
            }
            onChange={(option) => {
              setFieldValue('jobRole', option.value);
              onDirty();
            }}
          />
          {isEmpty(values.jobRole) &&
          <ErrorMessage name="jobRole" touched={touched} errors={errors} />}
        </Flex>
      )}

      <Flex flex={!isNonDs ? 4 : 4} className={styles.postion}>
        <InputText
          id="jobtitle__jobId"
          value={values.jobId}
          label="Job ID"
          required
          placeholder="e.g. JD036"
          name="jobId"
          onChange={(e) => {
            setFieldValue('jobId', e.target.value);
            onDirty();
          }}
        />
        {!isEmpty(values.jobId) && is_taken === true && (
          <Text size={12} color="error" className={styles.errorMessage}>
            {ENTER_JD_ID}
          </Text>
        )}
        {!isEmpty(values.jobId) && values.jobId.length > 50 && (
          <Text color="error" size={12}>
            {JOB_TITLE_LIMIT}
          </Text>
        )}
        {updateJd && isEmpty(values.jobId) && (
          <Text color="error" size={12}>
            {THIS_FIELD_REQUIRED}
          </Text>
        )}
        {!updateJd && (
          <ErrorMessage name="jobId" touched={touched} errors={errors} />
        )}
      </Flex>
    </Flex>
  );
};

export default JobTitle;
