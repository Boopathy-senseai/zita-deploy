import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { AppDispatch, RootState } from '../../store';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import StepProgressBar from '../../uikit/StepProgressBar/StepProgressBar';
import Text from '../../uikit/Text/Text';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { THIS_FIELD_REQUIRED } from '../constValue';
import { CountryEntity } from './createJdTypes';
import styles from './createjdwithds.module.css';
import type { dsFormProps } from './formikTypes';
import {
  handleNonDsValidateForm,
  jdNonDsSubmit,
  jdNonDsDraftSubmit,
} from './jdHelpers';
import JobDetails from './JobDetails';
import JobTitleDescription from './JobTitleDescription';
import NonDsSkill from './NonDsSkill';
import {
  createJdMiddleWare,
  duplicateMiddleWare,
  jdTemplatesApiMiddleWare,
  locationMiddleWare,
} from './store/middleware/createjdmiddleware';
import UploadJd from './UploadJd';
import JobDescriptionTemplate from './JobDescriptionTemplate';
import JdParserLoader from './JdParserLoader';

type ParamsType = {
  jdId: string;
  editJdId: string;
};

const CreateJdWithNonDs = () => {
  const { jdId, editJdId } = useParams<ParamsType>();
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const [isGetCountry, setCountry] = useState<CountryEntity[]>([]);
  const [isTemp, setTemp] = useState(false);
  const [isVacancies, setVacancies] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  const [isDrftLoader, setDrftLoader] = useState(false);
  const [isDraftSave, setDraftSave] = useState(false);
  const { routerPrompt, onDirty, onPristine } = useUnsavedChangesWarning();

  // initial api call
  useEffect(() => {
    if (!isEmpty(jdId)) {
      dispatch(duplicateMiddleWare({ jd_id: jdId }));
    }
    if (!isEmpty(editJdId)) {
      dispatch(duplicateMiddleWare({ jd_id: editJdId }));
    }
    dispatch(createJdMiddleWare());
    dispatch(locationMiddleWare({}));
    dispatch(jdTemplatesApiMiddleWare({ ds_role: '0' }));
  }, []);
  const {
    job_title,
    job_description,
    jdParserLoader,
    createJdLoader,
    getCountry,
    jdTemplates,
    jd_output,
    jdDuplicateLoader,
    updateLocation,
    updateQualification,
    is_taken,
    skill_list,
    skills,
    database_skills,
    programming_skills,
    tool_skills,
    misc_skills,
    platform_skills,
    is_plan
  } = useSelector(
    ({
      jdParserReducers,
      createJdReducers,
      locationReducers,
      jdTemplatesReducers,
      duplicateReducers,
      validateJobIDReducers,
      permissionReducers
    }: RootState) => {
      return {
        job_title: jdParserReducers.job_title,
        jdParserLoader: jdParserReducers.isLoading,
        job_description: jdParserReducers.job_description,
        createJdLoader: createJdReducers.isLoading,
        getCountry: locationReducers.country,
        temTitle: jdTemplatesReducers.job_title,
        jdTemplates: jdTemplatesReducers.jd_templates,
        jd_output: duplicateReducers.jd_output,
        jdDuplicateLoader: duplicateReducers.isLoading,
        updateLocation: duplicateReducers.location,
        updateQualification: duplicateReducers.qualification,
        skills: duplicateReducers.skills,
        is_taken: validateJobIDReducers.is_taken,
        skill_list: createJdReducers.skill_list,
        programming_skills: jdParserReducers.programming_skills,
        tool_skills: jdParserReducers.tool_skills,
        database_skills: jdParserReducers.database_skills,
        misc_skills: jdParserReducers.misc_skills,
        platform_skills: jdParserReducers.platform_skills,
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

  const combinedArray = [
    ...database_skills,
    ...programming_skills,
    ...tool_skills,
    ...misc_skills,
    platform_skills,
  ];
  const jdParseSkill = combinedArray.map((list: any) => {
    return { value: list.skill, label: list.skill };
  });
  const jdParseSkillEmptyCheck = jdParseSkill.filter(
    (x) => x.value !== undefined,
  );

  useEffect(() => {
    if (getCountry && getCountry.length !== 0) {
      setCountry(getCountry);
    }
  }, [getCountry]);

  const initial: dsFormProps = {
    qualification: [{ education: '', specialization: '' }],
    jobTitle: '',
    jobRole: '6',
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
    nonDsSkill: [],
    skillData: {
      dataBaseTags: [],
      toolsTags: [],
      platformsTags: [],
      othersTags: [],
      programTags: [],
    },
  };

  // open template function
  const handleTempOpen = () => {
    setTemp(true);
  };

  return (
    <>
      <Flex
        columnFlex
        className={styles.overAll}
        height={window.innerHeight - 72}
      >
        {(createJdLoader || jdDuplicateLoader) && <Loader />}
        <JdParserLoader
          open={jdParserLoader}
          title="Please wait… Your JD is getting parsed for pre-population"
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
              <Text bold size={18} color={'black'}>
                {3}
              </Text>
            </div>
            <Text bold className={styles.stepThree}>
              Preview & Post Job
            </Text>
          </Flex>
        </Flex>
        <UploadJd />

        <Formik
          initialValues={initial}
          onSubmit={(values) =>
            isDraftSave
              ? jdNonDsDraftSubmit({ values, dispatch, editJdId })
              : jdNonDsSubmit({ values, dispatch, editJdId })
          }
          validate={(values) => handleNonDsValidateForm(values, is_taken)}
          validationSchema={Yup.object({
            jobDescription: Yup.string().required(THIS_FIELD_REQUIRED),
            qualification: Yup.array().of(
              Yup.object().shape({
                education: Yup.string().required(THIS_FIELD_REQUIRED),
                specialization: Yup.string().max(50, ''),
              }),
            ),
            vacancies: isVacancies
              ? Yup.string().required(THIS_FIELD_REQUIRED)
              : Yup.string(),
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
            <Form>
              <Card className={styles.cardOverAll}>
                <JobDescriptionTemplate
                  jdTemplates={jdTemplates}
                  open={isTemp}
                  close={() => setTemp(false)}
                  setFieldValue={setFieldValue}
                />
                <JobTitleDescription
                  onPristine={onPristine}
                  is_taken={is_taken}
                  values={values}
                  setFieldValue={setFieldValue}
                  job_title={job_title}
                  job_description={job_description}
                  errors={errors}
                  touched={touched}
                  handleTempOpen={handleTempOpen}
                  jd_output={jd_output}
                  isNonDs
                  jd_id={editJdId}
                  updateJd={jdId}
                  onDirty={onDirty}
                />
                <NonDsSkill
                  setFieldValue={setFieldValue}
                  skill_list={skill_list}
                  values={values}
                  skills={skills}
                  jdParseSkill={jdParseSkillEmptyCheck}
                  job_description={job_description}
                  onDirty={onDirty}
                />
              </Card>
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
          )}
        </Formik>
      </Flex>
      {routerPrompt}
    </>
  );
};

export default CreateJdWithNonDs;
