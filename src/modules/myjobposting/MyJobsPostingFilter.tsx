import { FormikProps } from 'formik';
import SvgRefresh from '../../icons/SvgRefresh';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import InputSearch from '../../uikit/InputSearch/InputSearch';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { postedOn, jobTypeData } from './mock';
import styles from './myjobpostingfilter.module.css';

export interface DateEntity {
  label: string;
  value: string;
}
export type MyJobFormProps = {
  jobTitle: string;
  jobId: string;
  postedOn: DateEntity;
  jobType: string;
  location: string;
};

type Props = {
  formik: FormikProps<MyJobFormProps>;
  location_list: string[];
  job_ids: string[];
  job_title: string[];
};

const MyJobsPostingFilter = ({
  formik,
  location_list,
  job_ids,
  job_title,
}: Props) => {
  const pageReload = () => {
    formik.resetForm();
    // formik.setFieldValue('jobTitle','')
    // formik.setFieldValue('jobId','')
    // formik.setFieldValue('postedOn','')
    // formik.setFieldValue('jobType', '')
    // formik.setFieldValue('location', '');
  };
  console.log('f', formik.values.jobTitle);

  return (
    <Card className={styles.overAllfilter}>
      <Flex row center className={styles.filterStyle}>
        <Text bold size={16}>
          Filters
        </Text>
        <div
          title="Refresh Filters"
          className={styles.svgRefresh}
          tabIndex={-1}
          role={'button'}
          onClick={pageReload}
          onKeyPress={() => {}}
        >
          <SvgRefresh width={22} height={22} />
        </div>
      </Flex>
      <div className={styles.skillContainer}>
        <InputSearch
          initialValue={formik.values.jobTitle}
          options={job_title}
          setFieldValue={formik.setFieldValue}
          name="jobTitle"
          labelBold
          placeholder=""
          label={'Job Title'}
          onkeyPress={(event) => {
            if (event.key === 'Enter') {
              formik.setFieldValue('jobTitle', event.target.value);
            }
          }}
        />
      </div>
      <div className={styles.skillContainer}>
        <InputSearch
          initialValue={formik.values.jobId}
          options={job_ids}
          placeholder=""
          labelBold
          setFieldValue={formik.setFieldValue}
          name="jobId"
          label={'Job ID'}
          onkeyPress={(event) => {
            if (event.key === 'Enter') {
              formik.setFieldValue('jobId', event.target.value);
            }
          }}
        />
      </div>

      <div className={styles.skillContainer}>
        <SelectTag
          label="Posted On"
          labelBold
          options={postedOn}
          placeholder="Select"
          onChange={(option) => {
            formik.setFieldValue('postedOn', option);
          }}
          value={
            postedOn
              ? postedOn.find(
                  (option) => option.value === formik.values.postedOn.value,
                )
              : ''
          }
        />
      </div>

      <div className={styles.skillContainer}>
        <Text color="black" bold className={styles.jobTextStyle}>
          Job Status
        </Text>
        <Flex row wrap center>
          {jobTypeData.map((jobList) => {
            return (
              <Flex
                row
                key={jobList.value}
                width={jobList.width}
                className={styles.matchRadioStyle}
              >
                <InputRadio
                  label={jobList.value}
                  checked={jobList.label === formik.values.jobType}
                  onClick={() => formik.setFieldValue('jobType', jobList.label)}
                />
              </Flex>
            );
          })}
        </Flex>
      </div>
      <div className={styles.skillContainer} style={{ marginTop: 10 }}>
        <InputSearch
          initialValue={formik.values.location}
          placeholder="Enter job location"
          options={location_list}
          setFieldValue={formik.setFieldValue}
          name="location"
          labelBold
          label={'Location'}
          onkeyPress={(event) => {
            if (event.key === 'Enter') {
              formik.setFieldValue('location', event.target.value);
            }
          }}
        />
      </div>
    </Card>
  );
};

export default MyJobsPostingFilter;
