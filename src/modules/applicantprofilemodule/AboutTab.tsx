import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import { RootState } from '../../store';
import Svgresume from '../../icons/Svgresumeicon';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, lowerCase, notSpecified } from '../../uikit/helper';
import { workYear } from '../common/commonHelper';
import Status from '../../uikit/Status/Status';
import Text from '../../uikit/Text/Text';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import styles from './abouttab.module.css';
import ResumeCoverTab from './ResumeCoverTab';
import Resume from './Resume';
import Questionnaire from './Questionnaire';
const AboutTab = () => {
  const { candidate_details, total_exp, skills, personalInfo, source, create,questionnaire } =
    useSelector(({ applicantProfileInitalReducers }: RootState) => {
      return {
        source: applicantProfileInitalReducers.source,
        candidate_details: applicantProfileInitalReducers.candidate_details,
        create: applicantProfileInitalReducers.status_id=== null ||applicantProfileInitalReducers.status_id=== undefined?'':applicantProfileInitalReducers.status_id[0].created_on === undefined?'':applicantProfileInitalReducers.status_id[0].created_on,
        initialLoader: applicantProfileInitalReducers.isLoading,
        questionnaire: applicantProfileInitalReducers.questionnaire,
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
    });

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
  const remotework = isEmpty(personalInfo[0].remote_work)
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
  let Authorized;
  if (
    isEmpty(personalInfo[0].current1_country) &&
    isEmpty(personalInfo[0].current2_country) &&
    isEmpty(personalInfo[0].current3_country)
  ) {
    Authorized = 'Not Specified';
  }
  const date = isEmpty(create) ? '' : create.slice(0, create.indexOf('T')); 
  const aboutData = [
    {
      lable: 'Applied Source:',
      value: notSpecified(source),
    },
    {
      lable: 'Applied Date:',
      value: notSpecified(date),
    },
    {
      lable: 'Contact Number:',
      value: notSpecified(personalInfo[0].contact_no),
    },
    {
      lable: 'Current  Location:',
      value:
        currentLocation === 'Not Specified'
          ? currentLocation
          : `${city__name}${state__name}${country__name}`,
    },
    {
      lable: 'Email ID:',
      value: notSpecified(personalInfo[0].email),
    },
    // {
    //   lable: 'LinkedIn:',
    //   value: notSpecified(personalInfo[0].linkedin_url),
    // },
    // {
    //   lable: 'GitHub:',
    //   value: notSpecified(personalInfo[0].code_repo),
    // },

    {
      lable: 'Experience:',
      value: getFresher ? 'Fresher' : `${totalYear} ${totalMonths}`,
    },
    {
      lable: 'Qualification:',
      value: notSpecified(candidate_details[0].qualification),
    },
  ];

  const aboutData1 = [
    // {
    //   lable: 'Job Type:',
    //   value: notSpecified(personalInfo[0].type_of_job__label_name),
    // },
    // {
    //   lable: 'Availability:',
    //   value: notSpecified(personalInfo[0].available_to_start__label_name),
    // },
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
    {
      lable: 'Remote Availability:',
      value: remotework,
    },
    // {
    //   lable: 'Industry Type:',
    //   value: notSpecified(personalInfo[0].industry_type__label_name),
    // },
    {
      lable: 'Current Gross Salary:',
      value: currentGross,
    },
    // {
    //   lable: 'Expected Gross Salary:',
    //   value: expGross,
    // },
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
    <Flex row>
      <Flex
        flex={6}
        className={styles.overAll}
        height={window.innerHeight - 93}
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
        <Flex>
          <Text bold className={styles.jobPreferenceStyles}>
            Job Preferences
          </Text>
          {aboutData1.map((list) => {
            return (
              <Flex
                key={list.lable}
                row
                center
                className={styles.flexLineHeight}
              >
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
        </Flex> 
        <Flex> {techSkillSplit[0] !== "" && techSkillSplit.length > 0&& techSkillSplit[0] !== undefined ?(
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
        </Flex>
        <Flex>
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
                              style={{ fontSize: '13px', color: '#581845' }}
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
        <Flex> 
              {questionnaire&& questionnaire.length !== 0  && (
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
        height={window.innerHeight - 115}
        style={{
          border: '0.3px solid #C3C3C3',
          width: '0.5px',
          margin: '15px 5px 10px 5px',
          paddingTop: '10px',
          paddingBottom:'10px'
        }}
      ></Flex>
      <Flex flex={6.4} style={{ marginTop: ' 6px' }}>
        <Tabs>
          <Tab title="Resume">
            <Resume />
          </Tab>
          <Tab title="Cover Letter">
            <ResumeCoverTab />
          </Tab>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default AboutTab;
