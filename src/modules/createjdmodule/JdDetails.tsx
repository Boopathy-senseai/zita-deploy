import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, notSpecified } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { Jd, LocationEntity, QualificationEntity } from './createJdTypes';
import styles from './jddetails.module.css';
/* eslint max-len: ["error", { "code": 2000 }] */

type Props = {
  jdDetails: Jd;
  location: LocationEntity;
  qualification: QualificationEntity[];
};

const JdDetails = ({ jdDetails, location, qualification }: Props) => {
  let experience;
  let salary;

  if (
    (jdDetails.min_exp === 0 && jdDetails.max_exp === 1) ||
    (jdDetails.min_exp === 0 && isEmpty(jdDetails.max_exp))
  ) {
    experience = isEmpty(jdDetails.max_exp)
      ? `${jdDetails.min_exp} Year`
      : `${jdDetails.min_exp} - ${jdDetails.max_exp} Year`;
  } else {
    experience = isEmpty(jdDetails.max_exp)
      ? jdDetails.min_exp === 1
        ? `${jdDetails.min_exp} Year`
        : `${jdDetails.min_exp} Years`
      : `${jdDetails.min_exp} - ${jdDetails.max_exp} Years`;
  }

  const education =
    qualification &&
    qualification.map((list) => {
      return isEmpty(list.specialization)
        ? list.qualification
        : `${list.qualification} - ${list.specialization}`;
    });

  if (jdDetails.job_type__label_name === 'Contract') {
    salary = `${!isEmpty(jdDetails?.salary_curr_type__value) && jdDetails?.salary_curr_type__value.split('(')[0]} ${jdDetails.salary_min} - ${jdDetails.salary_max} Per Hour`;
  } else {
    salary = `${!isEmpty(jdDetails?.salary_curr_type__value) && jdDetails?.salary_curr_type__value.split('(')[0]} ${jdDetails.salary_min} - ${jdDetails.salary_max} Per Annum`;
  }
  const jdData = [
    {
      title: 'Job Role:',
      value: jdDetails.job_role__label_name,
      check: jdDetails.job_role__label_name !== 'Others',
    },
    {
      title: 'Job ID:',
      value: jdDetails.job_id,
      check: true,
    },
    {
      title: 'Job Type:',
      value: jdDetails.job_type__label_name,
      check: true,
    },
    {
      title: 'Experience:',
      value: jdDetails.min_exp === 0 ? 'Fresher' : experience,
      check: true,
    },
    {
      title: 'Work Location:',
      
      value: (location.city__name!==undefined&&location.state__name !==undefined&&location.country__name!==undefined) ? ((location.city__name!=="" &&location.state__name !=="" &&location.country__name!=="")?`${location.city__name}, ${location.state__name}, ${location.country__name}`:'Not Specified'):'Not Specified',
      check: true,
    },
    {
      title: 'Remote Work Allowed:',
      // value: jdDetails.work_remote ? 'Yes' : 'No',
      value: jdDetails.work_space_type === "3" ? 'Yes': 'No',
      check: true,
    },
    {
      title: 'Industry Type:',
      value: jdDetails.industry_type__label_name,
      check: true,
    },
    {
      title: 'No. of Vacancies:',
      value: jdDetails.no_of_vacancies,
      check: true,
    },
    {
      title: 'Salary:',
      value: isEmpty(jdDetails.salary_min)
        ? notSpecified(jdDetails.salary_min)
        : salary,
      check: jdDetails.show_sal_to_candidate,
    },
    {
      title: 'Qualification:',
      value: education && education.toString().replace(/,/g, ', '),
      check: true,
    },
  ];

  return (
    <Card className={styles.cardStyle}>
     
      <Flex row wrap top>
        {jdData.map((list, index) => {
          return (
            list.check && (
              <Flex
                width={index % 2 === 0 ? '55%' : '45%'}
                row
                key={list.title}
                className={styles.listFlex}
              >
                <Text color="theme">
                  {list.title}
                </Text>
                {list.title === 'Qualification:' ? (
                  <Text
                    style={{ width: '68%', overflowWrap: 'anywhere' ,fontSize:"13px"}}
                    className={styles.valueStyle}
                  >
                    {list.value}
                  </Text>
                ) : (
                  <Text className={styles.valueStyle}
                  style={{ fontSize:"13px"}}
                  >{list.value}</Text>
                )}
              </Flex>
            )
          );
        })}
      </Flex>
    </Card>
  );
};
export default JdDetails;
