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
  career_page_setting:CareerPageSetting
};
const JobViewCard = ({
  jd_form,
  skills,
  education,
  company_detail,
  login_user,
  jobId,
  applied_status,
  career_page_setting
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
      value: jd_form?.work_remote ? 'Yes' : 'No',
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
        <Flex flex={isMobile ?1:8} className={styles.jobDetails}>
          <LinkWrapper to={`/${career_page_setting?.career_page_url}/careers`}>
          <Flex row center marginBottom={16}>
            <div style={{cursor:'pointer',position:'relative',top:-2}}>
            <SvgBack width={14} height={14} fill={LINK}/>
            </div>
            <Text style={{marginLeft: 8}} bold color='link'>Back to careers</Text>
          </Flex>
          </LinkWrapper>
          <Text bold size={16} style={{ marginBottom: 16 }}>
            Job Details
          </Text>
          <Flex row={!isTablet} top wrap>
            {jdData.map((list, index) => {
              return (
                list.check && (
                  <Flex
                    width={ isTablet ? '100%':index % 2 === 0 ? '55%' : '45%'}
                    row
                    key={list.title + index}
                    className={styles.listFlex}
                  >
                    <Text bold color="theme">
                      {list.title}
                    </Text>
                    {list.title === 'Qualification:' ? (
                      <Text
                        style={{ width: '68%', overflowWrap: 'anywhere' }}
                        className={styles.valueStyle}
                      >
                        {list.value}
                      </Text>
                    ) : (
                      <Text className={styles.valueStyle}>{list.value}</Text>
                    )}
                  </Flex>
                )
              );
            })}
          </Flex>
          {jd_form?.show_sal_to_candidate === false && (
            <Flex row top marginBottom={16}>
              <Text bold color="theme">
                Qualification:
              </Text>
              <Text className={styles.valueStyle}>
                {qualification
                  ? `${qualification.toString().replace(/,/g, ', ')}`
                  : notSpecified(qualification)}
              </Text>
            </Flex>
          )}
        </Flex>

        {login_user ? (
          <Flex flex={isMobile ? 1: 4} columnFlex className={styles.btnContainer} >
            {applied_status !== 0 && (
              <div style={{ marginBottom: 20, marginRight: 34 }}>
                <Status label={'Applied'} color="success" />
              </div>
            )}
            <LinkWrapper to={`/`}>
              <Button           
              style={{
                backgroundColor: career_page_setting?.button_color,
                borderColor: career_page_setting?.button_color,
              }}>Go to Dashboard</Button>
            </LinkWrapper>
          </Flex>
        ) : (
          <Flex flex={isMobile ? 1: 4} columnFlex className={styles.btnContainer} >
            <LinkWrapper
              to={`/candidate_profile_upload/${company_detail?.recruiter_id_id}`}
              onClick={() => localStorage.setItem('careerJobViewJobId', jobId)}
            >
              <Button style={{ width: 218, marginBottom: 20,backgroundColor: career_page_setting?.button_color,
                borderColor: career_page_setting?.button_color, }}>
                Create Company Profile
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
              <Button style={{ width: 218 ,backgroundColor: career_page_setting?.button_color,
                borderColor: career_page_setting?.button_color,}}>Apply with Company Profile</Button>
            </LinkWrapper>
          </Flex>
        )}
      </Flex>
      <Text bold size={16} className={styles.jobDes}>
        Job Description
      </Text>
      <td
        className={styles.des}
        dangerouslySetInnerHTML={{
          __html: jd_form ? jd_form?.richtext_job_description : '',
        }}
      />
      {skills && (
        <Flex>
          <Text bold color="theme" style={{ marginTop: 24 }}>
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
    </Card>
  );
};

export default JobViewCard;
