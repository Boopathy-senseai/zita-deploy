import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './jddetails.module.css';
import { Jd, LocationEntity, QualificationEntity } from './jdViewTypes';

type Props = {
  jdDetails: Jd;
  location: LocationEntity;
  qualification?: QualificationEntity[];
};

const JdDetails = ({ jdDetails, location, qualification }: Props) => {
  const jdData = [
    {
      title: 'Job Role:',
      value: jdDetails.job_role__label_name,
      check: jdDetails.job_role__label_name === 'other' ? false : true,
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
      value: `${jdDetails.min_exp} - ${jdDetails.max_exp} Years`,
      check: true,
    },
    {
      title: 'Work Location:',
      value: `${location.country__name}, ${location.state__name}, ${location.city__name}`,
      check: true,
    },
    {
      title: 'Remote Work Allowed:',
      value: jdDetails.work_remote ? 'True' : 'False',
      check: true,
    },
    {
      title: 'Education:',
      value: qualification,
      check: true,
    },
    {
      title: 'Industry Type:',
      value: jdDetails.industry_type__label_name,
      check: true,
    },
    {
      title: 'Salary:',
      value: `$ ${jdDetails.salary_min} - ${jdDetails.salary_max} Per Annum`,
      check: jdDetails.show_sal_to_candidate,
    },
  ];

  return (
    <Card className={styles.cardStyle}>
      <Flex row wrap center>
        {jdData.map((list: any) => {
          return (
            <Flex
              width={'50%'}
              row
              center
              key={list.title}
              className={styles.listFlex}
            >
              <Text bold color="theme">
                {list.title}
              </Text>
              {list.title === 'Education:' && (
                <Flex columnFlex>
                  {list.value &&
                    list.value.map((educationList: any, index: number) => {
                      return (
                        <Text
                          className={styles.valueStyle}
                          key={educationList.qualification + index}
                        >
                          {`${educationList.qualification} - ${educationList.specialization}`}
                        </Text>
                      );
                    })}
                </Flex>
              )}

              {list.title !== 'Education:' && list.check && (
                <Text className={styles.valueStyle}>{list.value}</Text>
              )}
            </Flex>
          );
        })}
      </Flex>
    </Card>
  );
};
export default JdDetails;
