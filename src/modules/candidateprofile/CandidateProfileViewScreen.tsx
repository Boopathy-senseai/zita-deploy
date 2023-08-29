import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import { CountryEntity } from '../createjdmodule/createJdTypes';
import { locationMiddleWare } from '../createjdmodule/store/middleware/createjdmiddleware';
import { zitaPath } from '../constValue';
import CandidateNavBar from './CandidateNavBar';
import styles from './candidateprofilescreen.module.css';
import CertificationsOrCourseCard from './CertificationsOrCourseCard';
import PersonalInformationCard from './PersonalInformationCard';
import ProfessionalSkillsCard from './ProfessionalSkillsCard';
import ProjectsCard from './ProjectsCard';
import QualificationCard from './QualificationCard';
import { profileEditMiddleWare } from './store/middleware/candidateprofilemiddleware';
import WorkExperienceAddandCard from './WorkExperienceAddandCard';

const CandidateProfileViewScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isGetCountry, setCountry] = useState<CountryEntity[]>([]);
  const [initialLoader, setInitialLoader] = useState(true);

  useEffect(() => {
    dispatch(profileEditMiddleWare({jd_id:localStorage.getItem('careerJobViewJobId')})).then(() => {
      setInitialLoader(false);
    });
    dispatch(locationMiddleWare({})).then((res) => {
      setCountry(res.payload.country);
    });
  }, []);

  const {
    isLoading,
    obj,
    personal,
    additional_detail,
    personal_obj,
    projects,
    experiences,
    candidate_details,
    user_info,
  } = useSelector(({ candidateProfileEditReducers }: RootState) => {
    return {
      isLoading: candidateProfileEditReducers.isLoading,
      obj: candidateProfileEditReducers.obj,
      additional_detail: candidateProfileEditReducers.additional_detail,
      candidate_details:candidateProfileEditReducers.obj,
      personal: candidateProfileEditReducers.personal,
      personal_obj: candidateProfileEditReducers.personal_obj,
      projects: candidateProfileEditReducers.projects,
      experiences: candidateProfileEditReducers.experiences,
      user_info: candidateProfileEditReducers.user_info,
    };
  });
  console.log(obj,'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
  const checkBox =
    (obj && Array.isArray(obj?.skills) && obj?.skills?.length !== 0) ||
    (obj && Array.isArray(obj?.soft_skills) && obj?.soft_skills.length !== 0);

  if (initialLoader) {
    return <Loader />;
  }

  return (
    <Flex className={styles.overAll}>
      {isLoading && <Loader />}
      <CandidateNavBar
        obj={obj}
        isProfileView
        personal_obj={personal_obj}
        user_info={user_info}
        projects={projects}
      />
      <Flex
        columnFlex
        center
        className={styles.flexContainer}
        height={window.innerHeight - 102}
      >
        <Flex columnFlex className={styles.marginAuto}>
          <Flex id='candidate_profile_screen___about' className={styles.positionOne} >
            {!isEmpty(personal_obj?.career_summary) && (
              <>
                <Text size={16} bold style={{ marginBottom: 8 }}>
                  Career Summary
                </Text>
                <Text style={{ marginBottom: 16 }}>
                  {personal_obj?.career_summary}
                </Text>
              </>
            )}
           { console.log(obj,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')}
            <PersonalInformationCard
              isProfileView
              personal={personal}
              additional_detail={additional_detail}
              obj={obj}
              personal_obj={personal_obj}
              isGetCountry={isGetCountry}
            />
          </Flex>
          {checkBox && (
            <div id='candidate_profile_screen___skill'>
              <Text size={16} bold className={styles.titleStyle}>
                Professional Skills
              </Text>              
                <ProfessionalSkillsCard obj={obj} isProfileView />
            </div>
          )}
          {Array.isArray(obj?.edu) && obj?.edu.length !== 0 && (
            <div id='candidate_profile_screen___qualification'>
              <Flex row center between className={styles.titleStyle}>
                <Text size={16} bold>
                  Qualification
                </Text>
              </Flex>
          
                <QualificationCard
                  obj={obj}
                  handleQualificationEdit={() => {}}
                  isProfileView
                />
            </div>
          )}
          {Array.isArray(obj?.certi) && obj?.certi.length !== 0 && (
            <div id='candidate_profile_screen___course'>
              <Flex row center between className={styles.titleStyle}>
                <Text size={16} bold>
                  Certifications/Course
                </Text>
              </Flex>
         
                <CertificationsOrCourseCard obj={obj} isProfileView />
            </div>
          )}

          {Array.isArray(obj?.exp) && obj?.exp.length !== 0 && (
            <div id='candidate_profile_screen___work_exp'>
              <Flex row center between className={styles.titleStyle}>
                <Text size={16} bold>
                  Work Experience
                </Text>
              </Flex>
            
                <WorkExperienceAddandCard
                  obj={obj}
                  experiences={experiences}
                  isProfileView
                />
            </div>
          )}
          {Array.isArray(projects) && projects.length !== 0 && (
            <div id='candidate_profile_screen___projects'>
              <Flex row center between className={styles.titleStyle}>
                <Text size={16} bold>
                  Projects
                </Text>
              </Flex>
              <div style={{ position: 'relative', marginBottom: 40 }}>
                <ProjectsCard projects={projects} obj={obj} isProfileView />
              </div>
            </div>
          )}
        </Flex>
        <div
          style={{
            cursor: 'pointer',
            marginTop: 40,
          }}
          className={styles.footerStyle}
        >
          <Text bold color='theme' align="center" size={14} onClick={zitaPath}>
                Powered by Zita.ai
              </Text>
        </div>
      </Flex>
    </Flex>
  );
};

export default CandidateProfileViewScreen;
