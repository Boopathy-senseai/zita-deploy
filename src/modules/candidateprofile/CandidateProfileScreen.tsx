import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SvgRoundAdd from '../../icons/SvgRoundAdd';
import { AppDispatch, RootState } from '../../store';
import Button from '../../uikit/Button/Button';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import LoginPopUpModal from '../common/LoginPopUpModal';
import { CountryEntity } from '../createjdmodule/createJdTypes';
import { locationMiddleWare } from '../createjdmodule/store/middleware/createjdmiddleware';
import { zitaPath } from '../constValue';
import { Modal } from '../../uikit';
import RichText from '../common/RichText';
import SvgInfo from '../../icons/SvgInfo';
import AddandUpdateQualificationEdit from './AddandUpdateQualificationEdit';
import AddandUpdateWorkExperienceEdit from './AddandUpdateWorkExperienceEdit';
import CandidateNavBar from './CandidateNavBar';
import styles from './candidateprofilescreen.module.css';
import CandidateUpload from './CandidateUpload';
import CertificationsAddandUpdateEdit from './CertificationsAddandUpdateEdit';
import CertificationsOrCourseCard from './CertificationsOrCourseCard';
import PersonalInformation from './PersonalInformation';
import PersonalInformationCard from './PersonalInformationCard';
import ProfessionalSkillsCard from './ProfessionalSkillsCard';
import ProjectsAddandUpdateEdit from './ProjectsAddandUpdateEdit';
import ProjectsCard from './ProjectsCard';
import QualificationCard from './QualificationCard';
import { profileEditMiddleWare } from './store/middleware/candidateprofilemiddleware';
import VerifyEmail from './VerifyEmail';
import WorkExperienceAddandCard from './WorkExperienceAddandCard';
import OverViewSummary from './OverviewSummaryEdit';

// import { applicantcandidateMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';

type ParamsType = {
  empId: string;
};

const CandidateProfileScreen = () => {
  const { empId } = useParams<ParamsType>();
  const editorRef = useRef<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const [isPersonal, setPersonal] = useState(false);
  const [isOtp, setOtp] = useState(false);
  const [isQualificationEdit, setQualificationEdit] = useState(false);
  const [isQualificationAdd, setQualificationAdd] = useState(false);
  const [isGetCountry, setCountry] = useState<CountryEntity[]>([]);
  const [isUpdateId, setUpdateId] = useState('0');
  const [isworkExpAdd, setworkExpAdd] = useState(false);
  const [isProjectAdd, setProjectAdd] = useState(false);
  const [isCertiAdd, setCertiAdd] = useState(false);
  const [initialLoader, setInitialLoader] = useState(true);
  const [isLoginShow, setLoginShow] = useState(false);
  const [isLoader, setLoader] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(false);
  // initial api call
  useEffect(() => {
    dispatch(
      profileEditMiddleWare({
        jd_id: localStorage.getItem('careerJobViewJobId'),
      }),
    ).then((res) => {
      setInitialLoader(false);
      if (
        isEmpty(res.payload.personal.current_country__name) ||
        isEmpty(res.payload.personal.current_state__name) ||
        isEmpty(res.payload.personal.current_city__name)
      ) {
        setPersonal(true);
      }
    });
    dispatch(locationMiddleWare({})).then((res) => {
      setCountry(res.payload.country);
      setLoader(false);
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
    user_info,
    career_page_setting,
    applied_status,
    Qualification,
    overview,
    techSkill,
  } = useSelector(
    ({ techSkillReducers, candidateProfileEditReducers }: RootState) => {
      return {
        isLoading: candidateProfileEditReducers.isLoading,
        obj: candidateProfileEditReducers.obj,
        overview: candidateProfileEditReducers.overview,
        additional_detail: candidateProfileEditReducers.additional_detail,
        personal: candidateProfileEditReducers.personal,
        personal_obj: candidateProfileEditReducers.personal_obj,
        projects: candidateProfileEditReducers.projects,
        experiences: candidateProfileEditReducers.experiences,
        user_info: candidateProfileEditReducers.user_info,
        career_page_setting: candidateProfileEditReducers.career_page_setting,
        applied_status: candidateProfileEditReducers.applied_status,
        Qualification:
          candidateProfileEditReducers?.Qualification !== undefined &&
          candidateProfileEditReducers?.Qualification[0]?.qualification,
        techSkill: techSkillReducers && techSkillReducers,
      };
    },
  );

  // otp popup close function
  const handleCloseOtp = () => {
    setOtp(false);
    setPersonal(true);
  };
  // otp open popup function
  const handleOpenOtp = () => {
    setOtp(true);
    setPersonal(false);
  };
  // Qualification open popup function
  const handleQualificationEdit = (updateId: string) => {
    // dispatch(
    //   applicantcandidateMatchMiddleWare({
    //     can_id:updateId,
    //   }),
    // )
    setQualificationEdit(true);
    setUpdateId(updateId);
  };
  // Qualification add popup function
  const handleQualificationAdd = () => {
    setQualificationAdd(true);
  };
  // login close popup function
  const handleCloseLogin = () => {
    setLoginShow(false);
    setPersonal(true);
  };
  // login open popup function
  const handleOpenLogin = () => {
    setLoginShow(true);
    setPersonal(false);
  };
  if (initialLoader || isLoader) {
    return <Loader />;
  }
  const handlefunction=()=>{
    setshow(false)
    setshow1(false)
  }
  return (
    <Flex className={styles.overAll}>
      {isLoading && <Loader />}
      <LoginPopUpModal
        open={isLoginShow}
        cancel={() => setLoginShow(false)}
        closeLogin={handleCloseLogin}
      />
      {user_info && user_info.active !== true && (
        <VerifyEmail
          open={isOtp}
          cancel={handleCloseOtp}
          close={() => setOtp(false)}
          setshow={setshow}
        />
      )}
      <PersonalInformation
        empId={empId}
        open={isPersonal}
        cancel={handleOpenOtp}
        personal={personal}
        additional_detail={additional_detail}
        handleOpenLogin={handleOpenLogin}
        userInfo={user_info}
      />

      <AddandUpdateQualificationEdit
        open={isQualificationEdit}
        cancel={() => setQualificationEdit(false)}
        isUpdate
        isUpdateId={isUpdateId}
        obj={obj}
      />
      <AddandUpdateQualificationEdit
        open={isQualificationAdd}
        cancel={() => setQualificationAdd(false)}
        isUpdateId={isUpdateId}
      />
      <AddandUpdateWorkExperienceEdit
        open={isworkExpAdd}
        cancel={() => setworkExpAdd(false)}
      />
      <ProjectsAddandUpdateEdit
        obj={obj}
        projects={projects}
        cancel={() => setProjectAdd(false)}
        open={isProjectAdd}
      />
      <CertificationsAddandUpdateEdit
        open={isCertiAdd}
        cancel={() => setCertiAdd(false)}
      />
      <CandidateNavBar obj={obj} projects={projects} personal={personal} />
      {show&&(
          <Flex  style={{marginLeft: '150px'}}>
          <Flex middle row center className={styles.warningFlex1}>
            <SvgInfo fill={'#2E6ADD'} height={16} width={16} />
            
            <Text size={13} className={styles.warningText1}>
            <Text
                  style={{
                    color: '#2E6ADD',
                    marginRight: '3px',
                    fontSize: '13px',
                  }}
                  bold
                >
                  Heads Up!{' '}
                </Text>
            Your application has been pre-filled using your resume. Please take a moment to review and ensure before proceeding with your application.
            </Text>
            
            <div id="toast-close" role="button" style={{padding:'0  0 0 5px'}} onClick={handlefunction}>&#10006;</div>
          </Flex>
          </Flex>
          )
       }
      <Flex
        columnFlex
        center
        className={styles.flexContainer}
        height={window.innerHeight - 102}
      >
        <Flex
          row
          between
          center
          width={'100%'}
          style={{ padding:show? '0px':'10px 30px 0px 105px' }}
        >
          <Text size={13}>
            Updating your resume will exclusively associate it with your
            profile.
          </Text>
          <Button
            // disabled={!checkSelectLength}
            onClick={() => {
              setShowModel(true);
            }}
            className={styles.btnStyle}
          >
            Reupload Resume/CV
          </Button>
        </Flex>
        <Modal open={showModel}>
          <Flex
            style={{
              backgroundColor: '#ffffff',
              padding: '25px',
              height: '320px',
              width: '600px',
              borderRadius: '4px',
            }}
          >
            <CandidateUpload
              empId={empId}
              user_info={user_info}
              onClose={() => {
                setShowModel(false);
              }}
            />
          </Flex>
        </Modal>
        <Flex columnFlex className={styles.marginAuto}>
          <div id="candidate_profile_screen___about" style={{ paddingTop: 20 }}>
            <PersonalInformationCard
              personal={personal}
              additional_detail={additional_detail}
              obj={obj}
              Qualification={Qualification}
              personal_obj={personal_obj}
              isGetCountry={isGetCountry}
            />
          </div>

          <div id={'candidate_profile_screen___skill'}>
            <Text size={14} bold className={styles.titleStyle}>
              Professional Skills
            </Text>
            <ProfessionalSkillsCard obj={obj} techSkill={techSkill} />
          </div>

          <div id={'candidate_profile_screen___skill'}>
            <Text
              size={14}
              bold
              className={styles.titleStyle}
              style={{ marginTop: '20px' }}
            >
            Resume Overview 
            </Text>
            <OverViewSummary obj={obj} overview={overview} />
          </div>

          {/* <Flex marginTop={10} marginBottom={20}>
            <Text size={14} bold className={styles.titleStyle}>
              Overview of the Resume
            </Text>
            <RichText
            // onFocus={handleOpenInput}
            // onBlur={handleCloseInput}
            onInit={(_a: any, editor: any) => (editorRef.current = editor)}
            // initialValue={values.jobDescription}
            height={500}
            placeholder="Enter the overview of the resume"
          />
          </Flex> */}
          {/* <div id={'candidate_profile_screen___qualification'}>
            <Flex row center between className={styles.titleStyle}>
              <Text size={16} bold>
                Qualification
              </Text>
              <div
                onClick={handleQualificationAdd}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <SvgRoundAdd fill={PRIMARY} />
              </div>
            </Flex>

            <QualificationCard
              obj={obj}
              handleQualificationEdit={handleQualificationEdit}
            />
          </div>
          <div id={'candidate_profile_screen___course'}>
            <Flex row center between className={styles.titleStyle}>
              <Text size={16} bold>
                Certifications/Course
              </Text>
              <div
                onClick={() => setCertiAdd(true)}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <SvgRoundAdd fill={PRIMARY} />
              </div>
            </Flex>
            <CertificationsOrCourseCard obj={obj} />
          </div>
          <div id={'candidate_profile_screen___work_exp'}>
            <Flex row center between className={styles.titleStyle}>
              <Text size={16} bold>
                Work Experience
              </Text>
              <div
                onClick={() => setworkExpAdd(true)}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <SvgRoundAdd fill={PRIMARY} />
              </div>
            </Flex>

            <WorkExperienceAddandCard obj={obj} experiences={experiences} />
          </div>
          <div id={'candidate_profile_screen___projects'}>
            <Flex row center between className={styles.titleStyle}>
              <Text size={16} bold>
                Projects
              </Text>
              <div
                onClick={() => setProjectAdd(true)}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <SvgRoundAdd fill={PRIMARY} />
              </div>
            </Flex>
            <div style={{ position: 'relative', marginBottom: 40 }}>
              <ProjectsCard projects={projects} obj={obj} />
            </div>
          </div> */}

          {localStorage.getItem('careerJobViewJobId') !== null &&
            applied_status === false && (
              <Flex
                center
                middle
                className={styles.btnConatiner}
                marginTop={20}
              >
                <LinkWrapper
                  // target={'_parent'}
                  to={`/${
                    career_page_setting?.career_page_url
                  }/career_job_view/${localStorage.getItem(
                    'careerJobViewJobId',
                  )}/${localStorage.getItem(
                    'careerJobTitle',
                  )}?applicationFocus=focus`}
                >
                  <Button>Proceed to Apply</Button>
                </LinkWrapper>
              </Flex>
            )}
        </Flex>
        <div
          style={{
            cursor: 'pointer',
          }}
          className={styles.footerStyle}
        >
          <Text
            bold
            color="theme"
            align="center"
            size={14}
            onClick={zitaPath}
            style={{ marginTop: '30px' }}
          >
            Powered by Zita.ai
          </Text>
        </div>
      </Flex>
    </Flex>
  );
};

export default CandidateProfileScreen;
