import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import { getDateString } from '../../../uikit/helper';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import Text from '../../../uikit/Text/Text';
import ApplicantsPipeline from './ApplicantsPipeline';
import ApplicantsSourcingChannel from './ApplicantsSourcingChannel';
import styles from './jobmetricscard.module.css';
import MyDatabaseChart from './MyDatabaseChart';
import SourcingPerformance from './SourcingPerformance';
import { dashboardJobMetricsMiddleWare } from './store/dashboardmiddleware';

const JobMetricsCard = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isValue, setValue] = useState<any>();
  const {
    jd_metrics,
    perc_dict,
    role_base,
    pipeline,
    my_database,
    job_details,
    // posted_channel,
    dates_length,
    total_count,
    zita_match,
    plan,
  } = useSelector(
    ({ dashboardEmpReducers, dashboardJobMetricsReducers }: RootState) => {
      return {
        jd_metrics: dashboardEmpReducers.jd_metrics,
        perc_dict: dashboardJobMetricsReducers.perc_dict,
        role_base: dashboardJobMetricsReducers.role_base,
        pipeline: dashboardJobMetricsReducers.pipeline,
        my_database: dashboardJobMetricsReducers.my_database,
        job_details: dashboardJobMetricsReducers.job_details,
        // posted_channel: dashboardJobMetricsReducers.posted_channel,
        dates_length: dashboardJobMetricsReducers.dates_length,
        total_count: dashboardJobMetricsReducers.total_count,
        zita_match: dashboardJobMetricsReducers.zita_match,
        plan: dashboardEmpReducers.plan,
      };
    },
  );
// dropdown select function
  const handleSelect = (value: number) => {
    dispatch(dashboardJobMetricsMiddleWare({ jd_id: value }));
  };

  useEffect(() => {
    if (jd_metrics && jd_metrics.length !== 0) {
      setValue(jd_metrics[0].id);
    }
  }, [jd_metrics]);

  const checkHide=Number(plan.plan_id_id) === 1 || jd_metrics.length === 0;

  return (
    <Card className={styles.overAll}>
      {checkHide && (
        <div className={styles.hideStyle}>
          {Number(plan.plan_id_id) === 1 ? <Text size={24} color="white" bold className={styles.noText}>
            Please subscribe to any of the paid plans to view the job metrics
          </Text> :
            <Text size={24} color="white" bold className={styles.noText}>
              No Data Available
            </Text>
          }
        </div>
      )}
      <Text color="theme" bold className={styles.jobTitle}>
        Job Metrics
      </Text>
      <Flex marginLeft={16} marginRight={16}>
        <Flex row center marginBottom={16} marginTop={16}>
          <Text bold>Select Job</Text>
          <Flex marginLeft={8} width={400}>
          <SelectTag
            isSearchable
            placeholder="Select Job"
            options={jd_metrics}
            getOptionValue={(option: { id: number }) => `${option.id}`}
            getOptionLabel={(option: { job_title: string; job_id: string }) =>
              `${option.job_title} - ${option.job_id}`
            }
            onChange={(option) => {
              handleSelect(option.id);
              setValue(option.id)
            }}
            value={
              jd_metrics
                ? jd_metrics.find(
                    (option) => Number(option.id) === Number(isValue),
                  )
                : ''
            }
          />
        </Flex>
        </Flex>

        {jd_metrics.length !==0 &&
          <Card className={styles.titleCard}>
          <Flex row center>
            <Flex row center>
              <Text style={{ marginRight: 8 }} color="theme" bold>
                Job Title:
              </Text>
              <Text>
                {job_details && job_details?.job_title} -{' '}
                {job_details && job_details?.job_id}
              </Text>
            </Flex>
            <Flex row center marginLeft={16} marginRight={16}>
              <Text style={{ marginRight: 8 }} color="theme" bold>
                Location:
              </Text>
              <Text>
                {job_details && job_details?.city},{' '}
                {job_details && job_details?.state},{' '}
                {job_details && job_details?.country}
              </Text>
            </Flex>
            <Flex row center marginRight={16}>
              <Text style={{ marginRight: 8 }} color="theme" bold>
                Posted On:
              </Text>
              <Text>
                {getDateString(job_details && job_details.job_posted_on, 'll')}
              </Text>
            </Flex>
            {/* <Flex row center>
              <Text style={{ marginRight: 8 }} color="theme" bold>
                Posted Channels:
              </Text>
              <Text>{posted_channel}</Text>
            </Flex> */}
          </Flex>
        </Card>
        }
        

        <Flex marginTop={16} marginBottom={16}>
          <Flex row marginBottom={16}>
            <Flex flex={6} marginRight={8}>
              <ApplicantsSourcingChannel
                perc_dict={perc_dict}
                total_count={total_count}
                planId={plan.plan_id_id}
                jd_metrics={jd_metrics}
              />
            </Flex>
            <Flex flex={6} marginLeft={8}>
              <SourcingPerformance
                role_base={role_base}
                dates_length={dates_length}
                planId={plan.plan_id_id}
                jd_metrics={jd_metrics}
              />
            </Flex>
          </Flex>
          <Flex row>
            <Flex flex={6} marginRight={8}>
              <ApplicantsPipeline
                pipeline={pipeline}
                planId={plan.plan_id_id}
                jd_metrics={jd_metrics}
              />
            </Flex>
            <Flex flex={6} marginLeft={8}>
              <MyDatabaseChart
                my_database={my_database}
                zita_match={zita_match}
                planId={plan.plan_id_id}
                jd_metrics={jd_metrics}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default JobMetricsCard;
