import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SvgRoundAdd from '../../icons/SvgRoundAdd';
import { AppDispatch, RootState } from '../../store';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import { CountryEntity } from '../createjdmodule/createJdTypes';
import { locationMiddleWare } from '../createjdmodule/store/middleware/createjdmiddleware';
import AddandUpdateQualificationEdit from './AddandUpdateQualificationEdit';
import CandidateNavBar from './CandidateNavBar';
import styles from './candidateprofilescreen.module.css';
import CandidateUpload from './CandidateUpload';
import MyJobPreferenceCard from './MyJobPreferenceCard';
import PersonalInformation from './PersonalInformation';
import PersonalInformationCard from './PersonalInformationCard';
import ProfessionalSkillsCard from './ProfessionalSkillsCard';
import ProjectsCard from './ProjectsCard';
import QualificationCard from './QualificationCard';
import { profileEditMiddleWare } from './store/middleware/candidateprofilemiddleware';
import VerifyEmail from './VerifyEmail';
import WorkExperienceAddandCard from './WorkExperienceAddandCard';

const CandidateProfileScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isPersoanl, setPersonal] = useState(false);
  const [isOtp, setOtp] = useState(false);
  const [isQualificationEdit, setQualificationEdit] = useState(false);
  const [isQualificationAdd, setQualificationAdd] = useState(false);
  const [isGetCountry, setCountry] = useState<CountryEntity[]>([]);
  const [isUpdateId, setUpdateId] = useState('0');

  useEffect(() => {
    dispatch(profileEditMiddleWare());
    dispatch(locationMiddleWare({})).then((res) => {
      setCountry(res.payload.country);
    });
  }, []);

  const { isLoading, obj, personal, additional_detail, personal_obj } =
    useSelector(({ candidateProfileEditReducers }: RootState) => {
      return {
        isLoading: candidateProfileEditReducers.isLoading,
        obj: candidateProfileEditReducers.obj,
        additional_detail: candidateProfileEditReducers.additional_detail,
        personal: candidateProfileEditReducers.personal,
        personal_obj: candidateProfileEditReducers.personal_obj,
      };
    });

  useEffect(() => {
    if (isEmpty(personal?.email)) {
      setPersonal(true);
    } else {
      setPersonal(false);
    }
  }, [personal]);
  const handleCloseOtp = () => {
    setOtp(false);
    setPersonal(true);
  };

  const handleOpenOtp = () => {
    setOtp(true);
    setPersonal(false);
  };

  const handleQualificationEdit = (updateId: string) => {
    setQualificationEdit(true);
    setUpdateId(updateId);
  };
  const handleQualificationAdd = () => {
    setQualificationAdd(true);
  };

  return (
    <Flex className={styles.overAll}>
      {isLoading && <Loader />}
      <PersonalInformation open={isPersoanl} cancel={handleOpenOtp} />
      <VerifyEmail
        open={isOtp}
        cancel={handleCloseOtp}
        close={() => setOtp(false)}
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

      <CandidateNavBar />
      <Flex columnFlex className={styles.flexContainer}>
        <CandidateUpload />
        <Flex row>
          <Flex flex={6} marginRight={8}>
            <Text size={20} bold className={styles.titleStyle}>
              Personal Information
            </Text>
            <PersonalInformationCard
              personal={personal}
              additional_detail={additional_detail}
              personal_obj={personal_obj}
              isGetCountry={isGetCountry}
            />
          </Flex>
          <Flex flex={6} marginLeft={8}>
            <Text size={20} bold className={styles.titleStyle}>
              My Job Preference
            </Text>
            <MyJobPreferenceCard
              personal={personal}
              personal_obj={personal_obj}
              isGetCountry={isGetCountry}
            />
          </Flex>
        </Flex>
        <div>
          <Text size={20} bold className={styles.titleStyle}>
            Professional Skills
          </Text>
          <ProfessionalSkillsCard obj={obj} />
        </div>
        <div>
          <Flex row center between className={styles.titleStyle}>
            <Text size={20} bold>
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
        <div>
          <Flex row center between className={styles.titleStyle}>
            <Text size={20} bold>
              Work Experience
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
          <WorkExperienceAddandCard obj={obj} />
        </div>
        <div>
          <Flex row center between className={styles.titleStyle}>
            <Text size={20} bold>
              Projects
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
          <ProjectsCard obj={obj} />
        </div>
      </Flex>
    </Flex>
  );
};

export default CandidateProfileScreen;
