import Card from '../../../uikit/Card/Card';
import Chart from '../../../uikit/Chart/Chart';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import Text from '../../../uikit/Text/Text';
import { pieYValue } from '../../common/commonHelper';
import { colorCode } from '../../constValue';
import styles from './applicantssourcingchannel.module.css';
import { JdMetricsEntity, TotalCount } from './DashBoardTypes';

type Props = {
  perc_dict?: any[];
  total_count: TotalCount;
  planId: number;
  jd_metrics: JdMetricsEntity[];
};
const ApplicantsSourcingChannel = ({
  perc_dict,
  total_count,
  planId,
  jd_metrics
}: Props) => {
  const piechartArray: any =
    perc_dict &&
    perc_dict.map((chart: any) => {
      const result: any = Object.keys(chart);
      return { name: result[0], y: pieYValue(Object.values(chart)[0]) };
    });

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: null,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '{point.y} %',
        },
        colors: colorCode,
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Roles',
        data: piechartArray,
      },
    ],
  };

  const optionsOne = {
    chart: {
      type: 'pie',
    },
    title: {
      text: null,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '{point.y} %',
        },
        colors: colorCode,
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Roles',
        data: [
          {
            name: 'Career Page',
            y: 50,
          },
          {
            name: 'Facebook',
            y: 20,
          },
          {
            name: 'Gmail',
            y: 30,
          },
        ],
      },
    ],
  };

  return (
    <Card className={styles.overAll}>
      <Text bold size={16}>
        Applicants Sourcing Channel
      </Text>
      {(Array.isArray(perc_dict) &&
        perc_dict?.length !== 0 &&
        !isEmpty(total_count?.count__sum)) ||
      planId === 1 || jd_metrics.length === 0? (
        <Chart options={planId === 1 || jd_metrics.length === 0 ? optionsOne : options} />
      ) : (
        <Flex flex={1} center middle>
          <Text color="gray">No Data Available</Text>
        </Flex>
      )}
    </Card>
  );
};
export default ApplicantsSourcingChannel;
