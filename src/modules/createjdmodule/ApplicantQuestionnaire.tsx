import { Formik, FormikState, FormikProps } from 'formik';
import { SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { AppDispatch, RootState } from '../../store';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import StepProgressBar from '../../uikit/StepProgressBar/StepProgressBar';
import Tab from '../../uikit/Tab/Tab';
import Tabs from '../../uikit/Tab/Tabs';
import Text from '../../uikit/Text/Text';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { THIS_FIELD_REQUIRED } from '../constValue';
import AddedApplicantQuestionnaire from './AddedApplicantQuestionnaire';
import styles from './applicantquestionnaire.module.css';
import ChooseFromTemplates from './ChooseFromTemplates';
import CreateNewQuestion from './CreateNewQuestion';
import EEOCompliance from './EEOCompliance';
import { questionnaireProps } from './formikTypes';
import {
  dsOrNonDsGetdMiddleWare,
  questionnaireForJdMiddleWare,
  questionnaireSaveGetMiddleWare,
  questionnaireSaveMiddleWare,
  questionnaireTemplateMiddleWare,
} from './store/middleware/createjdmiddleware';

const initial: questionnaireProps = {
  fieldType: '',
  question: '',
  description: '',
  required: '1',
  options: [],
};

type ParamsType = {
  jd_id: string;
};
const ApplicantQuestionnaire = () => {
  const { jd_id } = useParams<ParamsType>();
  const history = useHistory();
  const [tabKey, setTabKey] = useState('0');
  
  const { routerPrompt, onDirty, onPristine } = useUnsavedChangesWarning();

  const dispatch: AppDispatch = useDispatch();

  // initial api call
  useEffect(() => {
    dispatch(questionnaireForJdMiddleWare({ jd_id }));
    dispatch(questionnaireTemplateMiddleWare());
    dispatch(dsOrNonDsGetdMiddleWare({ jd_id }));
  }, []);

  const {
    tabledata,
    template,
    tabledataisLoading,
    tempLoading,
    company_name,
    ds_role,
    country,
    is_eeo_comp,
    is_plan
  } = useSelector(
    ({
      questionnaireForJdReducers,
      cretejdTemplateReducers,
      dsOrNonDsGetReducers,
      permissionReducers
    }: RootState) => {
      return {
        tabledata: questionnaireForJdReducers.questionnaire_for_jd,
        template: cretejdTemplateReducers.template,
        tabledataisLoading: questionnaireForJdReducers.isLoading,
        tempLoading: cretejdTemplateReducers.isLoading,
        company_name: questionnaireForJdReducers.company_name,
        ds_role: dsOrNonDsGetReducers.ds_role,
        country: questionnaireForJdReducers.country,
        is_eeo_comp: questionnaireForJdReducers.is_eeo_comp,
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

  
  const [isCheck, setCheck] = useState(is_eeo_comp);

  useEffect(() => {
    setCheck(is_eeo_comp);
  }, [is_eeo_comp, tabledataisLoading]);
  
  // eeo api call
  useEffect(() => {
    if (country.toLowerCase() === 'usa') {
      dispatch(
        questionnaireSaveGetMiddleWare({
          jd_id,
          is_eeo_comp: '1',
        }),
      );
    }
  }, [country]);

  // form validation
  const handleValidateForm = (values: questionnaireProps) => {
    const error: Partial<questionnaireProps> = {};
    if (values.question === '') {
      error.question = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.fieldType)) {
      error.fieldType = THIS_FIELD_REQUIRED;
    }
    return error;
  };

  // form submit function
  const handleFormSubmit = (
    formValues: questionnaireProps,
    resetForm: (
      nextState?: Partial<FormikState<questionnaireProps>> | undefined,
    ) => void,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => void,
  ) => {
    const optionList = formValues.options.map((list) => {
      return list.list;
    });
    dispatch(
      questionnaireSaveMiddleWare({
        jd_id,
        question: formValues.question,
        description: formValues.description,
        fieldType: formValues.fieldType,
        required: formValues.required,
        option: optionList,
      }),
    ).then((res) => {
      if (res.payload.success === true) {
        resetForm({});
        setFieldValue('fieldType', '');
        dispatch(questionnaireForJdMiddleWare({ jd_id }));
      }
    });
  };

  // eeo check function
  const handleCompliance = () => {
    setCheck(!isCheck);
    dispatch(
      questionnaireSaveGetMiddleWare({
        jd_id,
        is_eeo_comp: isCheck ? '0' : '1',
      }),
    );
  };

  return (
    <Flex className={styles.overAll} height={window.innerHeight - 114}>
      <Flex row center className={styles.step}>
        <StepProgressBar titleclassName={styles.stepOne} roundFill barFilled />
        <StepProgressBar
          title="Applicant Questionnaire"
          titleclassName={styles.stepTwo}
          stepIndex="2"
          roundFill
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
      <Flex className={styles.cardOverAll}>
        {/* <Text size={16} bold className={styles.applicantTitle}>
          Applicant Questionnaire
        </Text> */}
        <Text>
          Add your own pre-screening questions or choose from our library for
          applicants to answer while applying for the job.
        </Text>
        <div className={styles.tabDiv}>
          <Tabs
            activeKey={tabKey}
            onSelect={(keys: SetStateAction<string>) => setTabKey(keys)}
          >
            <Tab title={'Create New Question'} eventKey={'0'}>
              <Formik
                initialValues={initial}
                onSubmit={(values, { resetForm, setFieldValue }) =>
                  handleFormSubmit(values, resetForm, setFieldValue)
                }
                validate={(values) => handleValidateForm(values)}
                validationSchema={Yup.object({
                  options: Yup.array().of(
                    Yup.object().shape({
                      list: Yup.string().required('This field is required.'),
                    }),
                  ),
                })}
              >
                {({
                  values,
                  setFieldValue,
                  handleChange,
                  handleSubmit,
                  isValid,
                  dirty,
                  
                }) => (
                  <CreateNewQuestion
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isValid={isValid}
                    dirty={dirty}
                    onDirty={onDirty}
                    onPristine={onPristine}
                  />
                )}
              </Formik>
            </Tab>
            <Tab title={'Choose From Templates'} eventKey={'1'} style={{justifyContent:"left"}} >
              <ChooseFromTemplates
                template={template}
                jdId={jd_id}
                tabledata={tabledata}
                tempLoading={tempLoading}
                tabledataisLoading={tabledataisLoading}
                onDirty={onDirty}
                onPristine={onPristine}
                
              />
            </Tab>
            <Tab title={'EEO Compliance (USA)'} eventKey={'2'}>
              <EEOCompliance
                handleCompliance={handleCompliance}
                isCheck={isCheck}
                company_name={company_name}
                country={country}
              />
            </Tab>
          </Tabs>
        </div>
      </Flex>
      <AddedApplicantQuestionnaire
        tabledata={tabledata}
        jdId={jd_id}
        ds_role={ds_role}
        onPristine={onPristine}    
      />
      {routerPrompt}
    </Flex>
  );
};

export default ApplicantQuestionnaire;