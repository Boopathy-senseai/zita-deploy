import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, lowerCase, notSpecified } from '../../uikit/helper';
import Status from '../../uikit/Status/Status';
import Text from '../../uikit/Text/Text';
import Tab from '../../uikit/Tabs/Tab';
import { workYear } from '../common/commonHelper';
import CandiDateResumeTab from './CandiDateResumeTab';

import styles from './candidateabouttab.module.css';

const AboutTab = () => {
  const { candidate_details } = useSelector(
    ({ applicantProfileInitalReducers }: RootState) => {
      return {
        candidate_details: applicantProfileInitalReducers.candidate_details,
      };
    },
  );

  const relocate = isEmpty(candidate_details[0].relocate)
    ? 'Not Specified'
    : candidate_details[0].relocate === true
    ? 'Yes'
    : 'No';

  const aboutData = [
    {
      lable: 'Contact Number:',
      value: notSpecified(candidate_details[0].contact),
    },
    {
      lable: 'Email ID:',
      value: notSpecified(candidate_details[0].email),
    },
    {
      lable: 'LinkedIn:',
      value: notSpecified(candidate_details[0].linkedin_url),
    },
    {
      lable: 'Current  Location:',
      value: notSpecified(candidate_details[0].location),
    },
    {
      lable: 'Qualification:',
      value: notSpecified(candidate_details[0].qualification),
    },
    {
      lable: 'Experience:',
      value: notSpecified(workYear(candidate_details[0].work_exp)),
    },
  ];

  const aboutData1 = [
    {
      lable: 'Job Type:',
      value: notSpecified(candidate_details[0].job_title),
    },
    {
      lable: 'Willing to Relocate:',
      value: relocate,
    },
    {
      lable: 'Expected Gross Salary:',
      value:
        candidate_details[0].exp_salary === 'Not Specified - Not Specified' ||
        isEmpty(candidate_details[0].exp_salary)
          ? 'Not Specified'
          : candidate_details[0].exp_salary,
    },
  ];
  const skillSplit = isEmpty(candidate_details[0].skills)
    ? []
    : candidate_details[0].skills.replace(',,', ',').split(',');
  return (
    <Flex row>
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 230}
    >
      <Text  bold className={styles.aboutCandidateStyle}>
        About Candidate
      </Text>
      {aboutData.map((list) => {
        return (
          <Flex key={list.lable} row center className={styles.flexLineHeight}>
            <Text style={{fontSize:'13px'}}  color='theme' bold className={styles.lableWidth}>
              {list.lable}
            </Text>
            <Text style={{fontSize:'13px'}}>{list.value}</Text>
          </Flex>
        );
      })}
      <Text  bold className={styles.jobPreferenceStyle}>
        Job Preference
      </Text>
      {aboutData1.map((list) => {
        return (
          <Flex key={list.lable} row center className={styles.flexLineHeight}>
            <Text style={{fontSize:'13px'}} color='theme' bold className={styles.lableWidth}>
              {list.lable}
            </Text>
            <Text style={{fontSize:'13px'}}>{list.value}</Text>
          </Flex>
        );
      })}
      {skillSplit.length !== 0 && (
        <>
          <Text  bold className={styles.jobPreferenceStyle}>
            Professional Skills
          </Text>
          <Flex row center wrap>
            {skillSplit &&
              skillSplit.map((skilsList, index) => {
                return (
                  skilsList !== ' ' && (
                    <Flex key={skilsList + index} className={styles.skillStyle}>
                      <Status label={lowerCase(skilsList)} />
                    </Flex>
                  )
                );
              })}
          </Flex>
        </>
      )}
      </Flex>
<Flex>
<Tab title='Resume'>< CandiDateResumeTab/></Tab>
</Flex>
    </Flex>
  );
};

export default AboutTab;
