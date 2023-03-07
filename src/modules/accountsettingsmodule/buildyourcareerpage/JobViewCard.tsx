import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty, lowerCase, notSpecified } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Status from '../../../uikit/Status/Status';
import Text from '../../../uikit/Text/Text';
import {
  JdForm,
  SkillsEntity,
  EducationEntity,
  CompanyDetailEntity,
} from './buildCareerPageTypes';
import styles from './jobviewcard.module.css';

type Props = {
  jd_form?: JdForm;
  skills: SkillsEntity[];
  education?: EducationEntity[];
  company_detail: CompanyDetailEntity;
};
const JobViewCard = ({ jd_form, skills, education, company_detail }: Props) => {
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
    salary = `$ ${jd_form?.salary_min} - ${jd_form?.salary_max} Per Hour`;
  } else {
    salary = `$ ${jd_form?.salary_min} - ${jd_form?.salary_max} Per Annum`;
  }

  const jdData = [
    {
      title: 'Experience:',
      value: jd_form?.min_exp === 0 ? 'Fresher' : experience,
      check: true,
    },
    {
      title: 'Industry Type:',
      value: notSpecified(jd_form?.job_type__label_name),
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
        ? qualification.toString().replace(/,/g, ', ')
        : notSpecified(qualification),
      check: true,
    },
  ];

  return (
    <Card className={styles.overAll}>
      <Flex row between>
        <Flex flex={8} className={styles.jobDetails}>
          <Text bold size={16} style={{ marginBottom: 16 }}>
            Job Details
          </Text>
          <Flex row top wrap>
            {jdData.map((list, index) => {
              return (
                list.check && (
                  <Flex
                    width={index % 2 === 0 ? '55%' : '45%'}
                    row
                    key={list.title}
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
        </Flex>
        <Flex flex={4} columnFlex className={styles.btnContainer} end>
          <LinkWrapper
            target={'_parent'}
            to={`/candidate_profile_upload/${company_detail?.recruiter_id_id}`}
          >
            <Button style={{ width: 202, marginBottom: 20 }}>
              Create Company Profile
            </Button>
          </LinkWrapper>

          <Button style={{ width: 202 }}>Apply with Company Profile</Button>
        </Flex>
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
