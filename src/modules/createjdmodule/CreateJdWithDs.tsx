import { Form, Formik } from 'formik';
import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { AppDispatch, RootState } from '../../store';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import StepProgressBar from '../../uikit/StepProgressBar/StepProgressBar';
import Text from '../../uikit/Text/Text';
import { THIS_FIELD_REQUIRED } from '../constValue';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { CountryEntity, SkillsEntityOne } from './createJdTypes';
import styles from './createjdwithds.module.css';
import type { dsFormProps } from './formikTypes';
import {
  handleValidateForm,
  jdSubmit,
  jdDraftSubmit,
  jdCancelSubmit,
} from './jdHelpers';
import JdParserLoader from './JdParserLoader';
import JobDescriptionTemplate from './JobDescriptionTemplate';
import JobDetails from './JobDetails';
import MissingSkills from './MissingSkills';
import RoleRecommendation from './RoleRecommendation';
import SkillsContainer from './SkillsContainer';
import {
  createJdMiddleWare,
  duplicateMiddleWare,
  jdTemplatesApiMiddleWare,
  locationMiddleWare,
} from './store/middleware/createjdmiddleware';
import UploadJd from './UploadJd';
import JobTitleDescription from './JobTitleDescription';

type ParamsType = {
  jdId: string;
  editJdId: string;
};

const initial: dsFormProps = {
  qualification: [{ education: '', specialization: '' }],
  jobTitle: '',
  jobRole: '',
  jobId: '',
  jobDescription: '',
  jobType: '',
  minimumExperience: '',
  maximumExperience: '',
  vacancies: '',
  country: '',
  state: '',
  city: '',
  remoteWork: '0',
  minimumSalary: '',
  maximumSalary: '',
  currency: '',
  showSalaryCandidates: '0',
  industryType: '1',
  skillData: {
    dataBaseTags: [],
    toolsTags: [],
    platformsTags: [],
    othersTags: [],
    programTags: [],
  },
  skillValid: '',
};

const CreateJdWithDs = () => {
  const { jdId, editJdId } = useParams<ParamsType>();
  const history = useHistory();
  const [isJdOutputId, setJdOutpuId] = useState('0');
  const [isVacancies, setVacancies] = useState(false);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const duplicate: any = query.get('duplicate');

  // initial api call
  useEffect(() => {
    if (!isEmpty(jdId)) {
      dispatch(duplicateMiddleWare({ jd_id: jdId })).then((res) => {
        setJdOutpuId(res.payload.jd_output.id.toString());
      });
    }
    if (!isEmpty(editJdId)) {
      dispatch(duplicateMiddleWare({ jd_id: editJdId })).then((res) => {
        if (res) {
          setJdOutpuId(editJdId);
        }
      });
    }
    dispatch(createJdMiddleWare());
    dispatch(locationMiddleWare({}));
    dispatch(jdTemplatesApiMiddleWare({ ds_role: '1' }));
  }, []);

  const dispatch: AppDispatch = useDispatch();
  // Inital Left Tag
  const [dataBaseleftTags, setDataBaseLeftTags] = useState([]);
  const [toolsLeftTags, setToolsLeftTags] = useState([]);
  const [platformsLeftTags, setPlatformsLeftTags] = useState([]);
  const [othersLeftTags, setOthersLeftTags] = useState([]);
  const [programLeftTags, setProgramLeftTags] = useState([]);
  // Inital Right Tag
  const [dataBaseTags, setDataBaseTags] = useState<SkillsEntityOne[]>([]);
  const [toolsTags, setToolsTags] = useState<SkillsEntityOne[]>([]);
  const [platformsTags, setPlatformsTags] = useState<SkillsEntityOne[]>([]);
  const [programTags, setProgramTags] = useState<SkillsEntityOne[]>([]);
  const [othersTags, setOtherTags] = useState<SkillsEntityOne[]>([]);
  const [isGetCountry, setCountry] = useState<CountryEntity[]>([]);
  const [isjdProfileLoader, setJdProfileLoader] = useState(false);
  const [isTemp, setTemp] = useState(false);
  const [isRole, setRole] = useState(false);
  const [isMiss, setMiss] = useState(false);
  const [isDrftLoader, setDrftLoader] = useState(false);
  const [isDraftSave, setDraftSave] = useState(false);
  const [isCancel, setCancel] = useState(false);
  const { routerPrompt, onDirty, onPristine } = useUnsavedChangesWarning();

  const {
    job_title,
    job_description,
    jdParserLoader,
    database_skills,
    platform_skills,
    programming_skills,
    tool_skills,
    misc_skills,
    skillsData,
    createJdLoader,
    getCountry,
    jdTemplates,
    profile_value,
    selected_role,
    new_role,
    old_role,
    jd_output,
    jdDuplicateLoader,
    updateLocation,
    updateQualification,
    updateSkills,
    is_taken,
    jdProfileLoader,
    createJdPostLoader,
    jd_profile,
    is_plan,
  } = useSelector(
    ({
      jdParserReducers,
      createJdReducers,
      locationReducers,
      jdTemplatesReducers,
      jdProfileReducers,
      createJdPostReducers,
      jdProfilePostReducers,
      duplicateReducers,
      validateJobIDReducers,
      permissionReducers,
    }: RootState) => {
      return {
        job_title: jdParserReducers.job_title,
        jdParserLoader: jdParserReducers.isLoading,
        job_description: jdParserReducers.job_description,
        platform_skills: jdParserReducers.platform_skills,
        programming_skills: jdParserReducers.programming_skills,
        qual_name: jdParserReducers.qual_name,
        tool_skills: jdParserReducers.tool_skills,
        database_skills: jdParserReducers.database_skills,
        misc_skills: jdParserReducers.misc_skills,
        skillsData: createJdReducers.data,
        createJdLoader: createJdReducers.isLoading,
        getCountry: locationReducers.country,
        temLoader: jdTemplatesReducers.isLoading,
        jdTemplates: jdTemplatesReducers.jd_templates,
        profile_value: jdProfileReducers.profile_value,
        selected_role: jdProfileReducers.selected_role,
        jd_id: createJdPostReducers.jd_id,
        createJdPostLoader: createJdPostReducers.isLoading,
        new_role: jdProfilePostReducers.new_role,
        old_role: jdProfilePostReducers.old_role,
        jdProfileLoader: jdProfilePostReducers.isLoading,
        jd_output: duplicateReducers.jd_output,
        jdDuplicateLoader: duplicateReducers.isLoading,
        updateLocation: duplicateReducers.location,
        updateQualification: duplicateReducers.qualification,
        updateSkills: duplicateReducers.skills,
        is_taken: validateJobIDReducers.is_taken,
        jd_profile: duplicateReducers.jd_profile,
        is_plan: permissionReducers.is_plan,
      };
    },
  );
  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });
  // filter skill list
  const skillOne: any = useMemo(
    () =>
      updateSkills
        .filter((x) => x.category_id === 1)
        .map((listOne) => {
          return {
            skill: listOne.skill,
            id: listOne.id,
            exp: listOne.experience.toString(),
          };
        }),
    [updateSkills],
  );
  // filter skill list
  const skillTwo: any = useMemo(
    () =>
      updateSkills
        .filter((x) => x.category_id === 2)
        .map((listOne) => {
          return {
            skill: listOne.skill,
            id: listOne.id,
            exp: listOne.experience.toString(),
          };
        }),
    [updateSkills],
  );
// filter skill list
  const skillThree: any = useMemo(
    () =>
      updateSkills
        .filter((x) => x.category_id === 3)
        .map((listOne) => {
          return {
            skill: listOne.skill,
            id: listOne.id,
            exp: listOne.experience.toString(),
          };
        }),
    [updateSkills],
  );
  // filter skill list
  const skillFour: any = useMemo(
    () =>
      updateSkills
        .filter((x) => x.category_id === 4)
        .map((listOne) => {
          return {
            skill: listOne.skill,
            id: listOne.id,
            exp: listOne.experience.toString(),
          };
        }),
    [updateSkills],
  );
  // filter skill list
  const skillFive: any = useMemo(
    () =>
      updateSkills
        .filter((x) => x.category_id === 5)
        .map((listOne) => {
          return {
            skill: listOne.skill,
            id: listOne.id,
            exp: listOne.experience.toString(),
          };
        }),
    [updateSkills],
  );

  useEffect(() => {
    if (getCountry && getCountry.length !== 0) {
      setCountry(getCountry);
    }
  }, [getCountry]);

  // free fill value skills
  useEffect(() => {
    const databaseParse =
      database_skills &&
      database_skills.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.skill.toLocaleLowerCase() === value.skill.toLocaleLowerCase(),
          ),
      );
    const toolSkillsParse =
      tool_skills &&
      tool_skills.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.skill.toLocaleLowerCase() === value.skill.toLocaleLowerCase(),
          ),
      );
    const platform_skillsParse =
      platform_skills &&
      platform_skills.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.skill.toLocaleLowerCase() === value.skill.toLocaleLowerCase(),
          ),
      );
    const misc_skillsParse =
      misc_skills &&
      misc_skills.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.skill.toLocaleLowerCase() === value.skill.toLocaleLowerCase(),
          ),
      );
    const programming_skillsParse =
      programming_skills &&
      programming_skills.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.skill.toLocaleLowerCase() === value.skill.toLocaleLowerCase(),
          ),
      );
    if (
      databaseParse.length !== 0 ||
      toolSkillsParse.length !== 0 ||
      platform_skillsParse.length !== 0 ||
      misc_skillsParse.length !== 0 ||
      programming_skills.length !== 0
    ) {
      setDataBaseTags(databaseParse);
      setToolsTags(toolSkillsParse);
      setPlatformsTags(platform_skillsParse);
      setOtherTags(misc_skillsParse);
      setProgramTags(programming_skillsParse);
    }
  }, [
    database_skills,
    updateSkills,
    tool_skills,
    misc_skills,
    programming_skills,
    jdParserLoader,
  ]);

  // template open function
  const handleTempOpen = () => {
    setTemp(true);
  };

  // template close function
  const hanldeOpenRole = () => {
    setRole(true);
  };

  // form next submit function
  const handleFormSubmit = (values: dsFormProps) => {
    if (!isCancel) {
      if (!isEmpty(editJdId)) {
        jdSubmit({
          values,
          setRole: hanldeOpenRole,
          dispatch,
          editJdId,
          dsCheck: '1',
          jd_output,
          setJdOutpuId,
          setJdProfileLoader,
          jd_profile,
        });
      }

      if (isEmpty(editJdId)) {
        jdSubmit({
          values,
          setRole: hanldeOpenRole,
          dispatch,
          dsCheck: '1',
          jd_output,
          setJdOutpuId,
          setJdProfileLoader,
          jd_profile,
          duplicate,
        });
      }
    }
    if (isCancel) {
      jdCancelSubmit({
        values,
        setRole: hanldeOpenRole,
        dispatch,
        dsCheck: '1',
        jd_output,
        setJdOutpuId,
        setJdProfileLoader,
        cancelJdId: isJdOutputId,
      });
    }
  };

  // from draft function
  const handleDrftSubmit = (values: dsFormProps) => {
    if (!isEmpty(editJdId)) {
      jdDraftSubmit({
        values,
        dispatch,
        editJdId,
        dsCheck: '1',
        jd_output,
        setJdProfileLoader,
      });
    }

    if (isEmpty(editJdId)) {
      jdDraftSubmit({
        values,
        dispatch,
        dsCheck: '1',
        jd_output,
        setJdProfileLoader,
      });
    }
  };

  return (
    <>
      {/* <div>
        <Flex row className={styles.titleContainer}>
          <Text
            bold
            size={18}
            style={{ marginLeft: 8, color: '#581845' }}
            className={styles.postingcl}
          >
            Job Posting
          </Text>
          <div className={styles.triangle}></div>
        </Flex>
      </div> */}
    
      <Flex
        columnFlex
        className={styles.overAll}
        height={window.innerHeight - 112}
      >
        {(jdDuplicateLoader || createJdPostLoader) && <Loader />}
        <JdParserLoader
          open={jdParserLoader}
          title="Please wait… Your JD is getting parsed for pre-population"
        />
        <JdParserLoader
          open={isjdProfileLoader && isDrftLoader}
          title="Please wait.. your job is getting profiled for role recommendation"
        />
        <Flex row center className={styles.step}>
          <StepProgressBar titleclassName={styles.stepOne} roundFill />
          <StepProgressBar
            title="Applicant Questionnaire"
            titleclassName={styles.stepTwo}
            stepIndex="2"
          />
          <Flex columnFlex className={styles.step3Flex}>
            <div className={styles.round}>
              <Text bold size={16} color={'black'}>
                {3}
              </Text>
            </div>
            <Text bold className={styles.stepThree}>
              Preview & Post Job
            </Text>
          </Flex>
        </Flex>
        <UploadJd handleTempOpen={undefined} />
        <RoleRecommendation
          isRole={isRole}
          cancel={() => setRole(false)}
          setMiss={setMiss}
          profile_value={profile_value}
          selected_role={selected_role}
          jd_id={isJdOutputId}
          jdProfileLoader={jdProfileLoader}
          setCancel={setCancel}
        />

        <Formik
          initialValues={initial}
          onSubmit={(values) =>
            isDraftSave ? handleDrftSubmit(values) : handleFormSubmit(values)
          }
          validate={(values) => handleValidateForm(values, is_taken)}
          validationSchema={Yup.object({
            jobDescription: Yup.string().required(THIS_FIELD_REQUIRED),
            vacancies: isVacancies
              ? Yup.string().required(THIS_FIELD_REQUIRED)
              : Yup.string(),
            qualification: Yup.array().of(
              Yup.object().shape({
                education: Yup.string().required(THIS_FIELD_REQUIRED),
                specialization: Yup.string().max(50, ''),
              }),
            ),
          })}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            handleSubmit,
            errors,
            touched,
          }) => (
            <>
              <Form>
                <Flex className={styles.cardOverAll}>
                  <JobDescriptionTemplate
                    // temTitle={temTitle}
                    jdTemplates={jdTemplates}
                    open={isTemp}
                    close={() => setTemp(false)}
                    setFieldValue={setFieldValue}
                  />

                  <MissingSkills
                    skillOne={skillOne}
                    skillFour={skillFour}
                    skillTwo={skillTwo}
                    skillFive={skillFive}
                    skillThree={skillThree}
                    updateSkills={updateSkills}
                    setMiss={setMiss}
                    jd_id={isJdOutputId}
                    new_role={new_role}
                    old_role={old_role}
                    open={isMiss}
                    dataBaseleftTags={dataBaseleftTags}
                    setDataBaseLeftTags={setDataBaseLeftTags}
                    toolsLeftTags={toolsLeftTags}
                    setToolsLeftTags={setToolsLeftTags}
                    platformsLeftTags={platformsLeftTags}
                    setPlatformsLeftTags={setPlatformsLeftTags}
                    othersLeftTags={othersLeftTags}
                    setOthersLeftTags={setOthersLeftTags}
                    programLeftTags={programLeftTags}
                    setProgramLeftTags={setProgramLeftTags}
                    dataBaseTags={dataBaseTags}
                    setDataBaseTags={setDataBaseTags}
                    toolsTags={toolsTags}
                    setToolsTags={setToolsTags}
                    platformsTags={platformsTags}
                    setPlatformsTags={setPlatformsTags}
                    programTags={programTags}
                    setProgramTags={setProgramTags}
                    othersTags={othersTags}
                    setOtherTags={setOtherTags}
                    skillsData={skillsData}
                    values={values}
                    createJdLoader={createJdLoader}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    onPristine={onPristine}
                    onDirty={onDirty}
                  />

                  <JobTitleDescription
                    onDirty={onDirty}
                    onPristine={onPristine}
                    values={values}
                    setFieldValue={setFieldValue}
                    job_title={job_title}
                    job_description={job_description}
                    errors={errors}
                    touched={touched}
                    handleTempOpen={handleTempOpen}
                    jd_output={jd_output}
                    jd_id={editJdId}
                    is_taken={is_taken}
                    updateJd={jdId}
                  />
                  <SkillsContainer
                    onPristine={onPristine}
                    onDirty={onDirty}
                    jd_id={isJdOutputId}
                    skillOne={skillOne}
                    skillFour={skillFour}
                    skillTwo={skillTwo}
                    skillFive={skillFive}
                    skillThree={skillThree}
                    updateSkills={updateSkills}
                    setMiss={() => {}}
                    dataBaseleftTags={dataBaseleftTags}
                    setDataBaseLeftTags={setDataBaseLeftTags}
                    toolsLeftTags={toolsLeftTags}
                    setToolsLeftTags={setToolsLeftTags}
                    platformsLeftTags={platformsLeftTags}
                    setPlatformsLeftTags={setPlatformsLeftTags}
                    othersLeftTags={othersLeftTags}
                    setOthersLeftTags={setOthersLeftTags}
                    programLeftTags={programLeftTags}
                    setProgramLeftTags={setProgramLeftTags}
                    dataBaseTags={dataBaseTags}
                    setDataBaseTags={setDataBaseTags}
                    toolsTags={toolsTags}
                    setToolsTags={setToolsTags}
                    platformsTags={platformsTags}
                    setPlatformsTags={setPlatformsTags}
                    programTags={programTags}
                    setProgramTags={setProgramTags}
                    othersTags={othersTags}
                    setOtherTags={setOtherTags}
                    skillsData={skillsData}
                    values={values}
                    createJdLoader={createJdLoader}
                    setFieldValue={setFieldValue}
                    profileTitle={'Recommended skills for the given profile'}
                    profileTitleRight="Required Skills"
                    errors={errors}
                    touched={touched}
                  />
                </Flex>
                <JobDetails
                  values={values}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  getCountry={isGetCountry}
                  jd_output={jd_output}
                  updateLocation={updateLocation}
                  updateQualification={updateQualification}
                  handleSubmit={handleSubmit}
                  setVacancies={setVacancies}
                  setDrftLoader={setDrftLoader}
                  errors={errors}
                  touched={touched}
                  setDraftSave={setDraftSave}
                  onPristine={onPristine}
                  onDirty={onDirty}
                />
              </Form>
            </>
          )}
        </Formik>
      </Flex>
      {routerPrompt}
    </>
  );
};

export default memo(CreateJdWithDs);
