import Card from '../../../uikit/Card/Card';
import Chart from '../../../uikit/Chart/Chart';
import Flex from '../../../uikit/Flex/Flex';
import SvgNoData from '../../../icons/SvgNoData';
import Text from '../../../uikit/Text/Text';
import { pieYValue } from '../../common/commonHelper';
import styles from './applicantssourcingchannel.module.css';
import { JdMetricsEntity, MyDatabaseEntity } from './DashBoardTypes';

type Props = {
  my_database?: MyDatabaseEntity[];
  zita_match: number;
  planId: number;
  jd_metrics: JdMetricsEntity[];
};
const MyDatabaseChart = ({
  my_database,
  zita_match,
  planId,
  jd_metrics,
}: Props) => {
  const myDatabaseName: any =
    my_database &&
    my_database
      .map((chart: any) => {
        const result: any = Object.keys(chart);
        return result[0];
      })
      .reverse();

  const myDatabaseValue: any =
    my_database &&
    my_database
      .map((chart: any, index) => {
        let color;
        if (index === 0) {
          color = '#bb8fce';
        } else if (index === 1) {
          color = '#abebc6';
        } else {
          color = 'rgba(250, 176, 61, 0.8)';
        }
        return {
          y: pieYValue(Object.values(chart)[0]),
          color,
        };
      })
      .reverse();

  const options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: myDatabaseName,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total Counts',
      },
      visible: false,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        data: myDatabaseValue,
        showInLegend: false,
      },
    ],
  };

  const optionsOne = {
    chart: {
      type: 'bar',
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: ['Zita Match', 'Invited to Apply', 'Applicant Conversion'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total Counts',
      },
      visible: false,
    },
    series: [
      {
        data: [
          { y: 1, color: 'rgba(250, 176, 61, 0.8)' },
          { y: 3, color: '#abebc6' },
          { y: 6, color: '#bb8fce' },
        ],
        showInLegend: false,
      },
    ],
  };
  return (
    <Card className={styles.overAll}>
      <Text bold size={14} style={{color:'#581845'}}>
        Database
      </Text>
      {(Array.isArray(my_database) &&
        my_database.length !== 0 &&
        zita_match !== 0) ||
      planId === 1 ||
      jd_metrics.length === 0 ? (
        <Chart
          options={
            planId === 1 || jd_metrics.length === 0 ? optionsOne : options
          }
        />
      ) : (
        <Flex flex={1} center middle style={{display:"flex"}}>
         <SvgNoData width={16} height={16} fill={"#888888"}/>
          <Text style={{marginTop:"2px"}} size={13} color="placeholder">No data available</Text>
        </Flex>
      )}
    </Card>
  );
};
export default MyDatabaseChart;
