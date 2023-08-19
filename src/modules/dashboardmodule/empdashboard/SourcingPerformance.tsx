import Card from '../../../uikit/Card/Card';
import Chart from '../../../uikit/Chart/Chart';
import SvgNoData from '../../../icons/SvgNoData';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import styles from './applicantssourcingchannel.module.css';
import { EntityOrRoleBaseEntityEntity, JdMetricsEntity } from './DashBoardTypes';

type Props = {
  role_base?: EntityOrRoleBaseEntityEntity[][];
  dates_length?: any[];
  planId: number;
  jd_metrics: JdMetricsEntity[];

};
const SourcingPerformance = ({ role_base, dates_length, planId ,jd_metrics}: Props) => {
  const jobViewWeekArray: any =
    role_base &&
    role_base[0].map((list, index) => {
      const result = index === 0 ? list.label : `Week ${index}`;
      return result;
    });

  const applicantWeekArray: any =
    role_base &&
    role_base[1].map((list, index) => {
      const result = index === 0 ? list.label : `Week ${index}`;
      return result;
    });

  const applicantValue =
    role_base &&
    role_base[1].map((list) => {
      const result = list.y;
      return result;
    });

  const jobViewValue =
    role_base &&
    role_base[0].map((list) => {
      const result = list.y;
      return result;
    });

  const options = {
    title: {
      text: null,
      style: {
        color: '#581845',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      title: {
        text: 'Active Job Posting Period (Weekly)',
      },
      categories:
        jobViewWeekArray?.length > applicantWeekArray?.length
          ? jobViewWeekArray
          : applicantWeekArray,
    },
    yAxis: {
      title: {
        text: 'Total Counts',
      },
      min: -1,
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
    },
    series: [
      {
        name: 'Job Views',
        data: jobViewValue,
        color: '#4F81BC',
      },
      {
        name: 'Applicants',
        data: applicantValue,
        color: '#C0504E',
      },
    ],
  };
  const optionsOne = {
    title: {
      text: null,
      style: {
        color: '#581845',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      title: {
        text: 'Active Job Posting Period (Weekly)',
      },
      categories: ['Oct-19', 'Week 1', 'Week 2'],
    },
    yAxis: {
      title: {
        text: 'Total Counts',
      },
      min: -1,
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
    },
    series: [
      {
        name: 'Job Views',
        data: [0, 1, 1],
        color: '#4F81BC',
      },
      {
        name: 'Applicants',
        data: [0, 2],
        color: '#C0504E',
      },
    ],
  };
  return (
    <Card className={styles.overAll}>
      <Text bold size={14}>
        Sourcing Performance
      </Text>
      {(Array.isArray(role_base) &&
        role_base.length !== 0 &&
        dates_length?.length !== 0) ||
      planId === 1  || jd_metrics.length === 0  ? (
        <Chart options={planId === 1 || jd_metrics.length === 0 ? optionsOne : options} />
      ) : (
        <Flex flex={1} center middle style={{display:"flex"}}>
          <SvgNoData width={16} height={16} fill={"#888888"}/>
          <Text size={13} style={{marginTop:"2px"}} color="placeholder">No data available</Text>
        </Flex>
      )}
    </Card>
  );
};
export default SourcingPerformance;
