import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, lowerCase, notSpecified } from '../../uikit/helper';
import Status from '../../uikit/Status/Status';
import Text from '../../uikit/Text/Text';
import Tab from '../../uikit/Tabs/Tab';
import Questionnaire from '../applicantprofilemodule/Questionnaire';
import { workYear } from '../common/commonHelper';
import CandiDateResumeTab from './CandiDateResumeTab';
import styles from './candidateabouttab.module.css';

const AboutTab = () => {
  const { candidate_details, questionnaire } = useSelector(
    ({ applicantProfileInitalReducers }: RootState) => {
      return {
        candidate_details: applicantProfileInitalReducers.candidate_details,
        questionnaire: applicantProfileInitalReducers.questionnaire,
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
    <Flex row flex={12}>
      <Flex
      flex={6}
        columnFlex
        className={styles.overAll}
         height={window.innerHeight - 120}
      > 
        <Text bold className={styles.jobPreferenceStyle}>
          Job Preference
        </Text>
        {aboutData1.map((list) => {
          return (
            <Flex key={list.lable} row center className={styles.flexLineHeight}>
              <Text
                style={{ fontSize: '13px' }}
                color="theme" 
                className={styles.lableWidth}
              >
                {list.lable}
              </Text>
              <Text style={{ fontSize: '13px' }}>{list.value}</Text>
            </Flex>
          );
        })}
       { console.log(skillSplit,'skillSplitskillSplit')}
        {  skillSplit[0] !== ""&& skillSplit.length > 0 && skillSplit[0] !== undefined  ? (
          <>
            <Text bold className={styles.jobPreferenceStyles}>
              Professional Skills
            </Text>
            <Flex row center wrap>
              {skillSplit &&
                skillSplit.map((skilsList, index) => {
                  return (
                    skilsList !== ' ' && (
                      <Flex
                        key={skilsList + index}
                        className={styles.skillStyle}
                      >
                        <Status label={lowerCase(skilsList)} />
                      </Flex>
                    )
                  );
                })}
            </Flex>
          </>
        ):''}
        <Flex>
          {questionnaire && questionnaire.length !== 0 && (
            <>
              <Text bold className={styles.softSkillStyle}>
                Applicant questionnaire
              </Text>
              <Flex>
                <Questionnaire issingletab={false} />
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
      <Flex
        height={window.innerHeight - 105}
        style={{
          border: '1px solid #C3C3C3',
          width: '1px',
          margin: '15px 5px 10px 5px',
          paddingTop: '10px',
          paddingBottom:'10px'
        }}
      ></Flex>
      <Flex flex={6.4}>
        <Tab title="Resume">
          <CandiDateResumeTab />
        </Tab>
      </Flex>
    </Flex>
  );
};

export default AboutTab;
