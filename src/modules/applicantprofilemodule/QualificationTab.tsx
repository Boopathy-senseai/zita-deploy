import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import styles from './qualificationtab.module.css';

const QualificationTab = () => {
  const { education, course, contrib } = useSelector(
    ({ applicantProfileInitalReducers }: RootState) => {
      return {
        education: applicantProfileInitalReducers?.education,
        course: applicantProfileInitalReducers?.course,
        contrib: applicantProfileInitalReducers?.contrib,
      };
    },
  );

  return (
    <Flex
      className={styles.overAll}
      columnFlex
      height={window.innerHeight - 230}
    >
      {education?.length === 0 &&
      course?.length === 0 &&
      contrib?.length === 0 ? (
        <Flex flex={1} middle center>
          <Text color="gray">Not Specified</Text>
        </Flex>
      ) : (
        <Text color="theme" bold>
          Qualification:
        </Text>
      )}
      {education &&
        education.map((list, index) => {
          return (
            <Flex
              key={list.qual_title + index}
              className={styles.educationFlex}
            >
              <Flex row center between>
                {isEmpty(list.qual_title) ? (
                  <Text bold>{list.qual_spec} {list.qual_spec}</Text>
                ) : (
                  <Text bold>
                    {list.qual_title} {!isEmpty(list.qual_spec) ? `- ${list.qual_spec}`: ''}
                  </Text>
                )}

                <Text bold>{list.year_completed}</Text>
              </Flex>
              {isEmpty(list.institute_location) ? (
                <Text className={styles.titleStyle}>
                   {list.institute_name} {list.institute_location} 
                </Text>
              ) : (
                <Text className={styles.titleStyle}>
                  {list.institute_name} -{' '}
                  {list.institute_location}
                </Text>
              )}
            </Flex>
          );
        })}
      {course?.length !== 0 && (
        <>
          <Text color="theme" bold className={styles.courseTitle}>
            Certifications/Course:
          </Text>
          {course &&
            course.map((list, index) => {
              return (
                <Flex
                  key={list.certificate_name + index}
                  className={styles.educationFlex}
                >
                  <Flex row center between>
                    <Text bold>{list.certificate_name}</Text>
                    <Text bold>{list.certificate_year}</Text>
                  </Flex>
                  <Text className={styles.titleStyle}>
                    {list.certificate_by}
                  </Text>
                </Flex>
              );
            })}
        </>
      )}
      {contrib?.length !== 0 && (
        <>
          <Text color="theme" bold className={styles.courseTitle}>
            Contributions:
          </Text>
          {contrib &&
            contrib.map((list, index) => {
              return (
                <Flex
                  key={list.contrib_text + index}
                  className={styles.educationFlex}
                >
                  <Text bold>{list.contrib_type__label_name}</Text>
                  <Text className={styles.titleStyle}>{list.contrib_text}</Text>
                </Flex>
              );
            })}
        </>
      )}
    </Flex>
  );
};

export default QualificationTab;
