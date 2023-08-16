import Chart from '../../uikit/Chart/Chart';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { Jd, Profile } from './jdViewTypes';
import styles from './rolesandresponsibilities.module.css';

type Props = {
  jdDetails: Jd;
  profile?: Profile;
};
const pieYValue = (value?: string) => {
  const output = value === '0.0' ? null : Number(value);
  return output;
};

const RolesandResponsibilities = ({ jdDetails, profile }: Props) => {
  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Role Distribution',
      style: {
        color: PRIMARY,
        fontWeight: 'bold',
        fontSize:14
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>:<br>{point.y} %<br>',
        },
      },
    },
    series: [
      {
        name: 'Roles',
        data: [
          {
            name: 'Data Analyst',
            y: pieYValue(profile?.data_analysis),
          },
          {
            name: 'Machine Learning Engineer',
            y: pieYValue(profile?.machine_learning),
          },
          {
            name: 'Big Data Engineer',
            y: pieYValue(profile?.data_engineering),
          },
          {
            name: 'Business Intelligence',
            y: pieYValue(profile?.business_intelligence),
          },
          {
            name: 'DevOps Engineer',
            y: pieYValue(profile?.devops),
          },
          {
            name: 'Others',
            y: pieYValue(profile?.others),
          },
        ],
      },
    ],
  };

  return (
    <Flex row>
      <Flex flex={8}>
        <td
          className={styles.des}
          dangerouslySetInnerHTML={{
            __html: jdDetails.richtext_job_description,
          }}
        />
      </Flex>
      <Flex flex={4}>
        <Chart options={options} />
      </Flex>
    </Flex>
  );
};

export default RolesandResponsibilities;
