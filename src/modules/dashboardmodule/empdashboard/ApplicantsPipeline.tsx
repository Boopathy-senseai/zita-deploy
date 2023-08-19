import Card from '../../../uikit/Card/Card';
import Chart from '../../../uikit/Chart/Chart';
import Flex from '../../../uikit/Flex/Flex';
import SvgNoData from '../../../icons/SvgNoData';
import Text from '../../../uikit/Text/Text';
import { pieYValue } from '../../common/commonHelper';
import styles from './applicantssourcingchannel.module.css';
import { JdMetricsEntity, PipelineEntity } from './DashBoardTypes';

type Props = {
  pipeline?: PipelineEntity[];
  planId: number;
  jd_metrics: JdMetricsEntity[];
};

const ApplicantsPipeline = ({ pipeline, planId,jd_metrics }: Props) => {
  const viewCheck = pipeline && pipeline[0].Views;
  const pipeLineName: any =
    pipeline &&
    viewCheck !== null &&
    pipeline.map((chart: any) => {
      const result: any = Object.keys(chart);
      return result[0];
    });

  const pipeLinevalue: any =
    pipeline &&
    viewCheck !== null &&
    pipeline.map((chart: any) => {
      return pieYValue(Object.values(chart)[0]);
    });

  const options = {
    title: {
      text: null,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.f}',
        },
      },
    },
    xAxis: {
      categories: pipeLineName,
    },
    yAxis: {
      title: {
        text: 'Total Counts',
      },
    },
    series: [
      {
        type: 'column',
        colorByPoint: true,
        data: pipeLinevalue,
        showInLegend: false,
      },
    ],
  };

  const optionsOne = {
    title: {
      text: null,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.f}',
        },
      },
    },
    xAxis: {
      categories: [
        'Views',
        'Applicants',
        'Shortlisted',
        'Hired',
        'Rejected',
      ],
    },
    yAxis: {
      title: {
        text: 'Total Counts',
      },
    },
    series: [
      {
        type: 'column',
        colorByPoint: true,
        data: [8, 6, 5, 6, 2],
        showInLegend: false,
      },
    ],
  };
  const isCheckOne=(Array.isArray(pipeline) &&
  pipeline.length !== 0 &&
  viewCheck !== null)
  
  return (
    <Card className={styles.overAll}>
      <Text bold size={14} style={{color:'#581845'}}>
        Applicants Pipeline
      </Text>
      {isCheckOne || (planId === 1 || jd_metrics.length === 0) ? (
        <Chart
          options={
            planId === 1 || jd_metrics.length === 0 ? optionsOne : options
          }
        />
      ) : (
        <Flex flex={1} center middle style={{display:"flex"}}>
          <SvgNoData width={15} style={{filter:"opacity(0.5)"}} />
          <Text color="gray">No Data Available</Text>
        </Flex>
      )}
    </Card>
  );
};
export default ApplicantsPipeline;
