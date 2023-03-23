import { useFormik } from 'formik';
import { memo } from 'react';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputSearch from '../../uikit/InputSearch/InputSearch';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import { CANCEL } from '../constValue';
import { JDTemplates } from './createJdTypes';
import styles from './jobdescriptiontemplate.module.css';

type Props = {
  temTitle: string[];
  jdTemplates: JDTemplates[];
  open: boolean;
  close: () => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
};
type FormProps = {
  jobTitle: string;
};

const initial: FormProps = {
  jobTitle: '',
};

const JobDescriptionTemplate = ({
  temTitle,
  jdTemplates,
  open,
  close,
  setFieldValue,
}: Props) => {
  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
    enableReinitialize: true,
  });
  const jobTemplate = jdTemplates.find((element) => {
    if (
      element.job_title.toLowerCase() === formik.values.jobTitle.toLowerCase()
    ) {
      return true;
    }
  });

  const handleAddSubmit = () => {
    const expSplit = jobTemplate?.experience.split('-').toString();
    if (expSplit?.length !== 0) {
      setFieldValue('minimumExperience', expSplit?.charAt(0));
    }
    if (expSplit?.length === 3) {
      setFieldValue('maximumExperience', expSplit?.charAt(2));
    }
    setFieldValue('jobTitle', jobTemplate?.job_title);
    setFieldValue('jobDescription', jobTemplate?.job_description);
    close();
    setTimeout(() => {
      formik.resetForm();
    }, 500);
  };
  const hanldeClose = () => {
    close();
    formik.resetForm();
  };

  return (
    <Modal open={open}>
      <Flex
        columnFlex
        className={styles.overAll}
        width={window.innerWidth / 1.35}
      >
        <Flex className={styles.title}>
          <Text color="white" bold>
            Job Description Template
          </Text>
        </Flex>
        <Flex row className={styles.inputContainer} center>
          <Flex row center>
            <Flex row center>
              <Text>Job Title</Text>
              <Text color="theme" style={{ marginLeft: 2, marginRight: 8 }}>
                *
              </Text>
            </Flex>
            <div style={{ width: 300, position: 'relative' }}>
              <InputSearch
                options={temTitle}
                setFieldValue={formik.setFieldValue}
                name="jobTitle"
                placeholder="Search by job title"
              />
              {!isEmpty(formik.values.jobTitle) &&
                typeof jobTemplate === 'undefined' && (
                  <Text size={12} color="error" className={styles.error}>
                    Job title not found
                  </Text>
                )}
            </div>
          </Flex>
          <Flex row center>
            <Button
              disabled={
                isEmpty(formik.values.jobTitle) ||
                typeof jobTemplate === 'undefined'
              }
              className={styles.addBtn}
              onClick={handleAddSubmit}
            >
              Add
            </Button>
            <Button types="secondary" onClick={hanldeClose}>
              {CANCEL}
            </Button>
          </Flex>
        </Flex>
        <Flex className={styles.noContent} height={window.innerHeight - 200}>
          {typeof jobTemplate !== 'undefined' && (
            <Flex columnFlex>
              <div className={styles.jobTitle}>
                <Text bold color="theme">
                  {jobTemplate.job_title}
                </Text>
              </div>
              <td
                style={{
                  height: window.innerHeight - 280,
                  overflowY: 'scroll',
                }}
                className={styles.des}
                dangerouslySetInnerHTML={{
                  __html: jobTemplate.job_description,
                }}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};
export default memo(JobDescriptionTemplate);
