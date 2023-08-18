import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import SvgCalendaricon from '../../../icons/SvgCalendaricon';
import SvgLocation from '../../../icons/SvgLocation';
// import SvgPosting from '../../../icons/SvgPosting';
 import SvgJobPost from '../../../icons/SvgJobPost';
 import SvgJobselection from '../../../icons/SvgJobselection';
 import SvgLocationjobpost from '../../../icons/SvgLocationjobpost';
 import SvgSubscription from '../../../icons/SvgSubscription';
import SvgGmailtest from '../../../icons/SvgGmailtest';
import { getDateString } from '../../../uikit/helper';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import { PRIMARY } from '../../../uikit/Colors/colors';
import Text from '../../../uikit/Text/Text';
import SvgJobTitle from '../../../icons/SvgJobTitle';
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

  const checkHide = Number(plan.plan_id_id) === 1 || jd_metrics.length === 0;

  return (
    <Flex className={styles.overAll}>
      {checkHide && (
        <div className={styles.hideStyle}>
          {Number(plan.plan_id_id) === 1 ?<Flex>  <Text size={24} color="white" bold className={styles.noText}>
            Please subscribe to any of the paid plans to view the job metrics
          </Text></Flex>  :
            <Text size={24} color="white" bold className={styles.noText}>
              No Data Available
            </Text>
          }
        </div>
      )}

      <Flex marginRight={5} marginLeft={5}>
        <Flex row center marginBottom={8} marginTop={8} className={styles.line}>
          <Text bold color="theme" className={styles.jobTitle} size={14}>Job Metrics</Text>
          {/* <Flex flex={20} end  >
          <SvgJobselection></SvgJobselection>
          </Flex> */}
          <Flex marginLeft={8} width={150} flex={3} end>
            <Flex row>
              <Flex marginTop={6} marginRight={5}> <SvgJobselection></SvgJobselection></Flex>
              <Flex>
                   
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
          
          </Flex>
        </Flex>

        {/* <Flex marginLeft={5} marginRight={5} className={styles.line} >

        </Flex> */}

        {jd_metrics.length !== 0 &&
          <Flex>
            <Flex row center>
              <Flex row center>
             
                  <Flex  marginLeft={9} marginRight={4}>
                  <SvgJobTitle width={12} height={12}/></Flex>
                
                <Text align='center' style={{fontSize:'13px'}} >
                  {job_details && job_details?.job_title} -{' '}
                  {job_details && job_details?.job_id}
                </Text>
              </Flex>
              <Flex row center marginLeft={11} marginRight={16}>
            
                  {/* <SvgLocation width={16} height={16} fill={PRIMARY}></SvgLocation> */}
                  <SvgLocationjobpost  width={16} height={16}></SvgLocationjobpost>
                
                <Text align='center' style={{marginLeft:"2px",fontSize:'13px'}}>
                  {job_details && job_details?.city},{' '}
                  {job_details && job_details?.state},{' '}
                  {job_details && job_details?.country}
                </Text>
              </Flex>
              <Flex row center marginRight={16}>
                  <Flex >
                  <SvgCalendaricon fill={PRIMARY}></SvgCalendaricon>
                  </Flex>
               
                <Text align='center' style={{marginLeft:"5px",fontSize:'13px'}} >
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
          </Flex>
        }


        <Flex marginTop={16} >
          <Flex row marginBottom={16}>
            <Flex flex={6} marginRight={8}>
              <ApplicantsSourcingChannel
                perc_dict={perc_dict}
                total_count={total_count}
                planId={plan.plan_id_id}
                jd_metrics={jd_metrics}
              />
            </Flex>
            <Flex flex={6} marginLeft={8} >
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
    </Flex>
  );
};

export default JobMetricsCard;
