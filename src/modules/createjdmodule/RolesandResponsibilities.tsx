import { spawn } from 'child_process';
import * as Yup from 'yup';
import Chart from '../../uikit/Chart/Chart';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { pieYValue } from '../common/commonHelper';
import { colorCode } from '../constValue';
import { Jd, Profile } from './createJdTypes';
import styles from './rolesandresponsibilities.module.css';

type Props = {
  jdDetails: Jd;
  profile: Profile;
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
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>:<br>{point.y} %<br>',
        },
        colors: colorCode,
      },
    },
    series: [
      {
        name: 'Roles',
        data: [
          {
            name: 'Data Analyst',
            y: pieYValue(profile.data_analysis),
          },
          {
            name: 'Machine Learning Engineer',
            y: pieYValue(profile.machine_learning),
          },
          {
            name: 'Big Data Engineer',
            y: pieYValue(profile.data_engineering),
          },
          {
            name: 'Business Intelligence',
            y: pieYValue(profile.business_intelligence),
          },
          {
            name: 'Devops Engineer',
            y: pieYValue(profile.devops),
          },
          {
            name: 'Others',
            y: pieYValue(profile.others),
          },
        ],
      },
    ],
  };
  const parser = new DOMParser();
  const doc = parser.parseFromString(jdDetails.richtext_job_description, 'text/html');
  const textNodes = doc.querySelectorAll('body')[0].textContent;
  // const texttrim = textNodes.trim();
  // const SignupSchema = Yup.object().shape({
  //   textNodes: Yup.string()
  //   .trim()})
  // const lines = texttrim.split('\n');  
  // const value = lines.join('\n');
//  const removeExtraSpace = textNodes.trim().split(/ +/).join(' ');
//   const value = jdDetails.richtext_job_description.replace(/^\s*$/gm, '');
  // console.log("lklklklklkl",texttrim)
  return (
    <Flex row>
      <Flex flex={8}>
         {/* {removeExtraSpace}  */}
        <td
          className={styles.des}
          dangerouslySetInnerHTML={{
            __html:jdDetails.richtext_job_description,
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
