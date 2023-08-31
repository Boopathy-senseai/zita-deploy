import { useSelector } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, lowerCase, notSpecified } from '../../uikit/helper';
import { workYear } from '../common/commonHelper';
import Status from '../../uikit/Status/Status';
import Text from '../../uikit/Text/Text';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import CandiDateResumeTab from '../candidatemodule/CandiDateResumeTab';
import styles from './abouttab.module.css';
import ResumeCoverTab from './ResumeCoverTab';
import Resume from './Resume';

const AboutTab = () => {
  const { candidate_details, total_exp, skills, personalInfo } = useSelector(
    ({ applicantProfileInitalReducers }: RootState) => {
      return {
        candidate_details: applicantProfileInitalReducers.candidate_details,
        initialLoader: applicantProfileInitalReducers.isLoading,
        total_exp: applicantProfileInitalReducers.total_exp
          ? applicantProfileInitalReducers.total_exp
          : [
              {
                total_exp_year: 0,
                total_exp_month: 0,
              },
            ],
        skills: applicantProfileInitalReducers.skills
          ? applicantProfileInitalReducers.skills
          : [
              {
                id: 0,
                application_id_id: 0,
                soft_skill: '',
                tech_skill: '',
                updated_at: '',
              },
            ],
        personalInfo: applicantProfileInitalReducers.personalInfo
          ? applicantProfileInitalReducers.personalInfo
          : [
              {
                application_id: 0,
                user_id_id: 0,
                firstname: '',
                lastname: '',
                email: '',
                contact_no: 0,
                country_id: 0,
                state_id: 0,
                city_id: 0,
                zipcode: '',
                Date_of_birth: 0,
                linkedin_url: '',
                career_summary: '',
                gender_id: 0,
                updated_at: '',
                code_repo: '',
                visa_sponsorship: false,
                remote_work: false,
                type_of_job_id: 0,
                available_to_start_id: 0,
                industry_type_id: 0,
                curr_gross: '',
                current_currency: '',
                exp_gross: 0,
                salary_negotiable: false,
                current_country_id: 0,
                current_state_id: 0,
                current_city_id: 0,
                current1_country: '',
                current2_country: '',
                current3_country: '',
                relocate: false,
                current_city__name: '',
                current_country__name: '',
                current_state__name: '',
                type_of_job__label_name: '',
                available_to_start__label_name: '',
                industry_type__label_name: '',
                country__name: '',
                city__name: '',
                state__name: '',
              },
            ],
      };
    },
  );

  const totalYear =
    total_exp && total_exp[0].total_exp_year !== 0
      ? total_exp && total_exp[0].total_exp_year > 1
        ? `${total_exp[0].total_exp_year} Years`
        : `${total_exp[0].total_exp_year} Year`
      : '';

  const totalMonths =
    total_exp && total_exp[0].total_exp_month !== 0
      ? total_exp && total_exp[0].total_exp_month > 1
        ? `${total_exp[0].total_exp_month} Months`
        : `${total_exp[0].total_exp_month} Month`
      : '';

  const relocate = isEmpty(personalInfo[0].relocate)
    ? 'Not Specified'
    : personalInfo[0].relocate === true
    ? 'Yes'
    : 'No';

  const perAnnumGross = isEmpty(personalInfo[0].curr_gross) ? '' : 'Per Annum';

  const perAnnumExpGross = isEmpty(personalInfo[0].exp_gross)
    ? ''
    : `Per Annum ${
        personalInfo[0].salary_negotiable === false ? '' : '- Negotiable'
      }`;

  const currentGross =
    notSpecified(personalInfo[0].curr_gross) !== 'Not Specified'
      ? `${getSymbolFromCurrency(personalInfo[0].current_currency)} ${
          personalInfo[0].curr_gross
        } ${perAnnumGross}`
      : notSpecified(personalInfo[0].curr_gross);

  const expGross =
    notSpecified(personalInfo[0].exp_gross) !== 'Not Specified'
      ? `${getSymbolFromCurrency(personalInfo[0].current_currency)} ${
          personalInfo[0].exp_gross
        } ${perAnnumExpGross}`
      : notSpecified(personalInfo[0].exp_gross);

  const getFresher =
    total_exp &&
    total_exp[0].total_exp_year === 0 &&
    total_exp &&
    total_exp[0].total_exp_year === 0
      ? true
      : false;

  let currentLocation;
  if (
    isEmpty(personalInfo[0].city__name) &&
    isEmpty(personalInfo[0].state__name) &&
    isEmpty(personalInfo[0].country__name)
  ) {
    currentLocation = `Not Specified`;
  }

  const city__name = isEmpty(personalInfo[0].city__name)
    ? ''
    : `${personalInfo[0].city__name}, `;
  const state__name = isEmpty(personalInfo[0].state__name)
    ? ''
    : `${personalInfo[0].state__name}, `;

  const country__name = isEmpty(personalInfo[0].country__name)
    ? ''
    : `${personalInfo[0].country__name}`;

  let workLocation;
  if (
    isEmpty(personalInfo[0].current_state__name) &&
    isEmpty(personalInfo[0].current_country__name) &&
    isEmpty(personalInfo[0].current_city__name)
  ) {
    workLocation = 'Not Specified';
  }

  const aboutData = [
    {
      lable: 'Contact Number:',
      value: notSpecified(personalInfo[0].contact_no),
    },
    {
      lable: 'Email ID:',
      value: notSpecified(personalInfo[0].email),
    },
    {
      lable: 'LinkedIn:',
      value: notSpecified(personalInfo[0].linkedin_url),
    },
    {
      lable: 'GitHub:',
      value: notSpecified(personalInfo[0].code_repo),
    },
    {
      lable: 'Current  Location:',
      value:
        currentLocation === 'Not Specified'
          ? currentLocation
          : `${city__name}${state__name}${country__name}`,
    },
    {
      lable: 'Qualification:',
      value: notSpecified(candidate_details[0].qualification),
    },
    {
      lable: 'Experience:',
      value: getFresher ? 'Fresher' : `${totalYear} ${totalMonths}`,
    },
  ];
  let Authorized;
  if (
    isEmpty(personalInfo[0].current1_country) &&
    isEmpty(personalInfo[0].current2_country) &&
    isEmpty(personalInfo[0].current3_country)
  ) {
    Authorized = 'Not Specified';
  }
  const aboutData1 = [
    // {
    //   lable: 'Job Type:',
    //   value: notSpecified(personalInfo[0].type_of_job__label_name),
    // },
    {
      lable: 'Availability:',
      value: notSpecified(personalInfo[0].available_to_start__label_name),
    },
    {
      lable: 'Preferred Work Location:',
      value:
        workLocation === 'Not Specified'
          ? 'Not Specified'
          : `${personalInfo[0].current_city__name}, ${personalInfo[0].current_state__name}, ${personalInfo[0].current_country__name}`,
    },
    // {
    //   lable: 'Willing to Relocate:',
    //   value: relocate,
    // },
    // {
    //   lable: 'Industry Type:',
    //   value: notSpecified(personalInfo[0].industry_type__label_name),
    // },
    {
      lable: 'Current Gross Salary:',
      value: currentGross,
    },
    {
      lable: 'Countries Authorized to Work:',
      value:
        Authorized === 'Not Specified'
          ? 'Not Specified'
          : `${personalInfo[0].current1_country}, ${personalInfo[0].current2_country}, ${personalInfo[0].current3_country}`,
    },
  ];
  const techSkillSplit =
    (candidate_details && candidate_details[0].skills.length === 0) || candidate_details[0].skills === null
      ? []
      : candidate_details[0].skills.replace(',,', ',').split(',');
  const softSkillSplit =
    (skills && skills.length === 0) || skills[0].soft_skill === null
      ? []
      : skills[0].soft_skill.replace(',,', ',').split(','); 
  return (
    <Flex row flex={12}>
      <Flex
        flex={6}
        className={styles.overAll}
        height={window.innerHeight-120}
        style={{display: 'flex'}}
      >
        {/* <Text  bold className={styles.aboutCandidateStyle}>
          About Candidate
        </Text>
        {aboutData.map((list) => {
          return (
            <Flex key={list.lable} row center  className={styles.flexLineHeight}>
              <Text bold color='theme' className={styles.lableWidth}>
                {list.lable}
              </Text>
              {list.lable === 'Experience:' && list.value === 'Fresher' ? (
                <Text   style={{fontSize:'13px'}}>
                  {notSpecified(workYear(candidate_details[0].work_exp))}
                </Text>
              ) : (
                <Text   style={{fontSize:'13px'}}>{list.value}</Text>
              )}
            </Flex>
          );
        })} */}
        <Text bold className={styles.jobPreferenceStyle}>
          Job Preferences
        </Text>
        {aboutData1.map((list) => {
          return (
            <Flex key={list.lable} row center className={styles.flexLineHeight}>
              <Text
                color="theme"
                style={{ fontSize: '13px' }} 
                className={styles.lableWidth}
              >
                {list.lable}
              </Text>
              <Text style={{ fontSize: '13px' }}>{list.value}</Text>
            </Flex>
          );
        })}
        {techSkillSplit[0] !== "" && techSkillSplit.length > 0 && techSkillSplit[0] !== undefined  ? (
          <>
            <Text bold className={styles.jobPreferenceStyleproffesional}>
              Professional Skills
            </Text>
            <Flex row center wrap>
              {techSkillSplit &&
                techSkillSplit.map((skilsList, index) => {
                  return (
                    skilsList !== ' ' && (
                      <Flex
                        key={skilsList + index}
                        className={styles.skillStyle}
                        style={{ fontSize: '13px' }}
                      >
                        <Status label={lowerCase(skilsList)} />
                      </Flex>
                    )
                  );
                })}
            </Flex>
          </>
        ):''}

        {softSkillSplit.length !== 0 && (
          <>
            {softSkillSplit[0] !== '' && (
              <>
                <Text bold className={styles.softSkillStyle}>
                  Soft Skills
                </Text>
                <Flex row center wrap>
                  {softSkillSplit &&
                    softSkillSplit.map((skilsList, index) => {
                      return (
                        skilsList !== ' ' && (
                          <Flex
                            key={skilsList + index}
                            className={styles.skillStyle}
                            style={{ fontSize: '13px' }}
                          >
                            <Status label={lowerCase(skilsList)} />
                          </Flex>
                        )
                      );
                    })}
                </Flex>
              </>
            )}
          </>
        )}
      </Flex>
      <Flex
        height={window.innerHeight - 100}
        style={{
          border: '0.3px solid #C3C3C3',
          width: '1px',
          margin: '15px 5px 10px 5px',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      ></Flex>
      <Flex flex={6.4} style={{ marginTop: ' 6px' }}>
        <Tab title="Resume">
          <CandiDateResumeTab />
        </Tab>
      </Flex>
    </Flex>
  );
};

export default AboutTab;
