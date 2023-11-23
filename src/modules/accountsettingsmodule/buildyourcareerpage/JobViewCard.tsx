import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import SvgBack from '../../../icons/SvgBack';
import { AppDispatch } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import { LINK } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty, lowerCase, notSpecified } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Status from '../../../uikit/Status/Status';
import Text from '../../../uikit/Text/Text';
import { logOutMiddleWare } from '../../navbar/store/middleware/navbarmiddleware';
import {
  JdForm,
  SkillsEntity,
  EducationEntity,
  CompanyDetailEntity,
  CareerPageSetting,
} from './buildCareerPageTypes';
import styles from './jobviewcard.module.css';

type Props = {
  jd_form?: JdForm;
  skills: SkillsEntity[];
  education?: EducationEntity[];
  company_detail: CompanyDetailEntity;
  login_user: boolean;
  jobId: string;
  applied_status: number;
  career_page_setting: CareerPageSetting;
};
const JobViewCard = ({
  jd_form,
  skills,
  education,
  company_detail,
  login_user,
  jobId,
  applied_status,
  career_page_setting,
}: Props) => {
  const isTablet = useMediaQuery({ query: '(max-width: 770px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const dispatch: AppDispatch = useDispatch();

  let experience;
  let salary;
  if (
    (jd_form?.min_exp === 0 && jd_form?.max_exp === 1) ||
    (jd_form?.min_exp === 0 && isEmpty(jd_form?.max_exp))
  ) {
    experience = isEmpty(jd_form?.max_exp)
      ? `${jd_form?.min_exp} Year`
      : `${jd_form?.min_exp} - ${jd_form?.max_exp} Year`;
  } else {
    experience = isEmpty(jd_form?.max_exp)
      ? jd_form?.min_exp === 1
        ? `${jd_form?.min_exp} Year`
        : `${jd_form?.min_exp} Years`
      : `${jd_form?.min_exp} - ${jd_form?.max_exp} Years`;
  }

  const qualification =
    education &&
    education.map((list) => {
      return isEmpty(list.specialization)
        ? list.qualification
        : `${list.qualification} - ${list.specialization}`;
    });

  if (jd_form?.job_type__label_name === 'Contract') {
    salary = `${
      !isEmpty(jd_form?.salary_curr_type__value) &&
      jd_form?.salary_curr_type__value.split('(')[0]
    } ${jd_form?.salary_min} - ${jd_form?.salary_max} Per Hour`;
  } else {
    salary = `${
      !isEmpty(jd_form?.salary_curr_type__value) &&
      jd_form?.salary_curr_type__value.split('(')[0]
    } ${jd_form?.salary_min} - ${jd_form?.salary_max} Per Annum`;
  }

  const jdData = [
    {
      title: 'Experience:',
      value: jd_form?.min_exp === 0 ? 'Fresher' : experience,
      check: true,
    },
    {
      title: 'Industry Type:',
      value: notSpecified(jd_form?.industry_type__label_name),
      check: true,
    },
    {
      title: 'Remote Work Allowed:',
      value: jd_form?.work_space_type === "3" ? 'Yes' : 'No',
      check: true,
    },

    {
      title: 'No. of Vacancies:',
      value: notSpecified(jd_form?.no_of_vacancies),
      check: true,
    },
    {
      title: 'Salary:',
      value: isEmpty(jd_form?.salary_min)
        ? notSpecified(jd_form?.salary_min)
        : salary,
      check: jd_form?.show_sal_to_candidate,
    },
    {
      title: 'Qualification:',
      value: qualification
        ? `${qualification.toString().replace(/,/g, ', ')}`
        : notSpecified(qualification),
      check: jd_form?.show_sal_to_candidate,
    },
  ];

  return (
    <Card className={styles.overAll}>
      <Flex row={!isMobile} between={!isMobile}>
        <Flex flex={isMobile ? 1 : 8} className={styles.jobDetails}>
          <Flex row center between marginBottom={15}>
            <Flex>
              <LinkWrapper
                to={`/${career_page_setting?.career_page_url}/careers`}
              >
                <Flex row center>
                  <div
                    style={{ cursor: 'pointer', position: 'relative', top: -2 }}
                  >
                    <SvgBack
                      width={14}
                      height={14}
                      fill={career_page_setting.button_color}
                    />
                  </div>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: career_page_setting.button_color,
                      cursor: 'pointer',
                    }}
                    bold
                  >
                    Back to careers
                  </Text>
                </Flex>
              </LinkWrapper>
            </Flex>
            <Flex>
              {login_user ? (
                <Flex
                  // flex={isMobile ? 1 : 4}
                  
                  className={styles.btnContainer}
                >
                  {applied_status !== 0 && (
                    // <div style={{ marginBottom: 20, marginRight: 34 }}>
                    <div style={{fontWeight:"bold"}}>
                      <Status label={'Applied'} color="success"/>
                    </div>
                  )}
                  <LinkWrapper to={`/`}>
                    <Button
                      style={{
                        backgroundColor: career_page_setting?.button_color,
                        borderColor: career_page_setting?.button_color,
                      }}
                    >
                      Go to Dashboard
                    </Button>
                  </LinkWrapper>
                </Flex>
              ) : (
                <Flex
                  row
                  // flex={isMobile ? 1 : 4}
                  columnFlex
                  className={styles.btnContainer}
                >
                  <LinkWrapper
                    to={`/candidate_profile_upload/${company_detail?.recruiter_id_id}`}
                    onClick={() =>
                      localStorage.setItem('careerJobViewJobId', jobId)
                    }
                  >
                    <Button
                      types="secondary"
                      style={{
                        width: 230,
                        marginRight: 8,
                        whiteSpace: 'nowrap',
                        // backgroundColor: career_page_setting?.button_color,
                        borderColor: career_page_setting?.button_color,
                        color: career_page_setting?.button_color,
                      }}
                    >
                      <Text
                        bold
                        size={13}
                        style={{ color: career_page_setting?.button_color }}
                      >
                        Create Company Profile
                      </Text>
                    </Button>
                  </LinkWrapper>
                  <LinkWrapper
                    to="/login"
                    onClick={() => {
                      dispatch(logOutMiddleWare()).then(() => {
                        localStorage.removeItem('token');
                      });
                      sessionStorage.setItem('applyWithCompanyProfile', 'true');
                      localStorage.setItem('careerJobViewJobId', jobId);
                    }}
                  >
                    <Button
                      style={{
                        width: 218,
                        whiteSpace: 'nowrap',
                        backgroundColor: career_page_setting?.button_color,
                        borderColor: career_page_setting?.button_color,
                      }}
                    >
                      Apply with Company Profile
                    </Button>
                  </LinkWrapper>
                </Flex>
              )}
            </Flex>
          </Flex>

          <Flex style={{ borderTop: '1px solid #c3c3c3', padding: '5px 0' }}>
            <Text bold size={14} style={{margin:"5px 0"}}>
              Job Details
            </Text>
          </Flex>

          <Flex marginBottom={10} className={styles.jobDetail}>
            <Flex row={!isTablet} top wrap>
              {jdData.map((list, index) => {
                return (
                  list.check && (
                    <Flex
                      width={
                        isTablet ? '100%' : index % 2 === 0 ? '55%' : '45%'
                      }
                      row
                      key={list.title + index}
                      className={styles.listFlex}
                    >
                      <Text style={{color: career_page_setting.button_color}}>{list.title}</Text>
                      {list.title === 'Qualification:' ? (
                        <Text
                          style={{ width: '68%', overflowWrap: 'anywhere' }}
                          className={styles.valueStyle}
                        >
                          {list.value}
                        </Text>
                      ) : (
                        <Text size={13} className={styles.valueStyle}>
                          {list.value}
                        </Text>
                      )}
                    </Flex>
                  )
                );
              })}
            </Flex>
            {jd_form?.show_sal_to_candidate === false && (
              <Flex row top>
                <Text style={{color: career_page_setting.button_color}}>Qualification:</Text>
                <Text size={13} className={styles.valueStyle}>
                  {qualification
                    ? `${qualification.toString().replace(/,/g, ', ')}`
                    : notSpecified(qualification)}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        // style={{ borderBottom: '1px solid #c3c3c3' }}
        className={styles.jobDes}
      >
        <Text bold size={14} style={{margin:"5px 0"}}>
          Job Description
        </Text>
      </Flex>
      <Flex className={styles.jobDetail}>
      <td
        className={styles.des}
        dangerouslySetInnerHTML={{
          __html: jd_form ? jd_form?.richtext_job_description : '',
        }}
      />
      {skills && (
        <Flex>
          <Text bold style={{ marginTop: 10 }}>
            Required Skills
          </Text>
          <Flex row center wrap className={styles.statusContainer}>
            {skills.map((skillList: any, index: number) => {
              const exp =
                Number(skillList.experience) === 0
                  ? ''
                  : Number(skillList.experience) === 1
                  ? `- ${skillList.experience} Year`
                  : `- ${skillList.experience} Years`;
              return (
                <>
                  {!isEmpty(skillList.skill) && (
                    <div
                      key={index + skillList.skill}
                      className={styles.statusList}
                    >
                      <Status label={lowerCase(skillList.skill) + exp} />
                    </div>
                  )}
                </>
              );
            })}
          </Flex>
        </Flex>
      )}

      </Flex>
      
    </Card>
  );
};

export default JobViewCard;
