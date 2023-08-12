import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { AppDispatch } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../../uikit/Flex/Flex';
import { getFocus, isEmpty } from '../../../uikit/helper';
import InputText from '../../../uikit/InputText/InputText';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import Text from '../../../uikit/Text/Text';
import { genderOptions } from '../../candidateprofile/mock';
import { mediaPath, THIS_FIELD_REQUIRED } from '../../constValue';
import { applicantMatchMiddleWare, candidateMatchMiddleWare } from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import {
  disabilitiesData,
  q2Data,
  q3Data,
  q4Data,
  q5Data,
  qualificationData,
  raceFive,
  raceFour,
  raceOne,
  raceThree,
  raceTwo,
  selftOne,
  selfTwo,
} from '../../createjdmodule/mock';
import ApplicantQustionsSubmit, {
  applicationFormikForms,
} from './ApplicantQustionsSubmit';
import styles from './applicationform.module.css';
import { JdForm } from './buildCareerPageTypes';
import { aboutUsOptions } from './mock';
import { applocationFormPostMiddleWare } from './store/middleware/buildyourcareerpagemiddleware';

const inital: applicationFormikForms = {
  qualification: '',
  aboutUs: '',
  gender: '',
  hispanic: '',
  veteran: '',
  disability: '',
  map: '',
  coverLetter: '',
  identify_race:''
};

// form validation condition
const Schema = Yup.object().shape({
  qualification: Yup.string().required(THIS_FIELD_REQUIRED),
  aboutUs: Yup.string().required(THIS_FIELD_REQUIRED),
  map: Yup.array().of(
    Yup.object().shape({
      required: Yup.string()
        .matches(/[0\ ]/, THIS_FIELD_REQUIRED)
        .required(THIS_FIELD_REQUIRED),
    }),
  ),
});

type Props = {
  questionnaire?: any[];
  jobId: string;
  applicant_detail?: any;
  setSuccess: (arg: boolean) => void;
  additional_detail?: any;
  jd_form?: JdForm;
  setLoader: (a: boolean) => void;
  cand_id?: any;
};

const ApplicationForm = ({
  questionnaire,
  jobId,
  applicant_detail,
  setSuccess,
  additional_detail,
  jd_form,
  cand_id,
  setLoader,
}: Props) => {
  const [isFocus,setFocus]=useState(true)
  const dispatch: AppDispatch = useDispatch();
  const expYears = isEmpty(additional_detail?.total_exp_year)
    ? ''
    : additional_detail?.total_exp_year === 0
    ? additional_detail.total_exp_month <= 0
      ? 'Fresher'
      : ''
    : additional_detail?.total_exp_year === 1
    ? `${additional_detail?.total_exp_year} Year`
    : `${additional_detail?.total_exp_year} Years`;
  const getJobViewLocal: any = localStorage.getItem('jobViewCount');

  const expMonth = isEmpty(additional_detail?.total_exp_month)
    ? ''
    : additional_detail?.total_exp_month === 0
    ? ''
    : additional_detail?.total_exp_month === 1
    ? '1 Month'
    : `${additional_detail?.total_exp_month} Months`;

  const getLoginUserId =
    localStorage.getItem('loginUserId') !== null
      ? localStorage.getItem('loginUserId')
      : '0';

  // formik submit 
  const handleSubmit = (values: applicationFormikForms) => { 
    setLoader(true);
    const raceFilter =
      values.map && values.map.filter((a: any) => a.result !== '');
    const raceOutput =
      raceFilter &&
      raceFilter.map((list: any) => {
        return `${list.id}:${list.result.replace(',', '')}`;
      });
    const formData = new FormData();
    formData.append('Qualification', values.qualification);
    formData.append('source', values.aboutUs);
    formData.append('cover_letter', values.coverLetter);
    formData.append('gender', values.gender);
    formData.append('hispanic_latino', values.hispanic);
    formData.append('veteran_status', values.veteran);
    formData.append('disability_status', values.disability);
    formData.append('questionnaire', raceOutput);
    if(!isEmpty(values.identify_race)){
      formData.append('identify_race', values.identify_race);
    }

    if (getJobViewLocal === null) {
      formData.append('source_count', 'Career Page');
    } else {
      formData.append('source_count', getJobViewLocal);
    }
    dispatch(
      applocationFormPostMiddleWare({
        id: jobId,
        user_id: getLoginUserId,
        formData,
      }),
    ).then((res) => { 
      if (res.payload.success) {
        dispatch(
          candidateMatchMiddleWare({
        //  jd_id:jobId,
         can_id:res.payload.candidate_id[0].id,
          }),
        )
        setSuccess(true);
        setLoader(false);
      }
    });
  };

  // formik validation
  const handleValid = (values: applicationFormikForms) => {
    const errors: Partial<applicationFormikForms> = {};
    if (values.hispanic === 'No' && isEmpty(values.identify_race)) {      
      errors.identify_race = THIS_FIELD_REQUIRED;
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: inital,
    onSubmit: handleSubmit,
    validationSchema: Schema,
    validate:handleValid
  });

  // left side data
  const personalData = [
    { title: 'First Name*', value: applicant_detail.firstname },
    {
      title: 'Contact Number*',
      value: (
        <div className={styles.phoneHide}>
          <PhoneInput
            inputClass={styles.phoneInput}
            dropdownClass={styles.dropDownStyle}
            value={applicant_detail.contact_no?.toString()}
          />
        </div>
      ),
    },
    {
      title: 'Location*',
      value: `${applicant_detail.current_city__name}, ${applicant_detail.current_state__name}, ${applicant_detail.current_country__name}`,
    },
    {
      title: 'Qualification*',
      value: (
        <div style={{ width: 200, position: 'relative' }}>
          <SelectTag
            options={qualificationData}
            onChange={(options) =>
              formik.setFieldValue('qualification', options.value)
            }
            inputId="applicationform___qualification"
          />
          <div style={{ position: 'absolute' }}>
            <ErrorMessage
              name="qualification"
              errors={formik.errors}
              touched={formik.touched}
            />
          </div>
        </div>
      ),
    },
  ];

  // right side data
  const personalRightData = [
    { title: 'Last Name*', value: applicant_detail.lastname },
    { title: 'Email*', value: applicant_detail.email },
    {
      title: 'Total Experience*',
      value:
        isEmpty(expYears) && isEmpty(expMonth)
          ? 'Not Specified'
          : `${expYears} ${expMonth}`,
    },
    {
      title: 'Where did you hear about us?*',
      value: (
        <div style={{ width: 200, position: 'relative' }}>
          <SelectTag
            options={aboutUsOptions}
            onChange={(options) =>
              formik.setFieldValue('aboutUs', options.value)
            }
            inputId="applicationform___about_as"
          />
          <div style={{ position: 'absolute' }}>
            <ErrorMessage
              name="aboutUs"
              errors={formik.errors}
              touched={formik.touched}
            />
          </div>
        </div>
      ),
    },
  ];

  // error message focus function
  const errorFocus = () => {
    if (!isEmpty(formik.errors.qualification)) {
      console.log('erorrr');
      getFocus('applicationform___qualification');
    } else if (!isEmpty(formik.errors.aboutUs)) {
      getFocus('applicationform___about_as');
    } else if (formik.errors.map && formik.errors.map.length !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      const getindex: any =
        Array.isArray(formik.errors.map) &&
        formik.errors.map.map((list: any, index) => {
          if (list && list.required && !isEmpty(list.required)) return index;
        });
      const findIndex =
        getindex && getindex.filter((a: any) => typeof a === 'number');
      if (Array.isArray(findIndex) && findIndex.length !== 0) {
        getFocus(`applicant_qustions_submit___error_${findIndex[0]}`);
      }
    }
  };

  // error message focus function
  useEffect(() => {
    if(isFocus){
      if (!isEmpty(formik.errors.qualification)) {
        getFocus('applicationform___qualification');
      } else if (!isEmpty(formik.errors.aboutUs)) {
        getFocus('applicationform___about_as');
      } else if (formik.errors.map && formik.errors.map.length !== 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        const getindex: any =
          Array.isArray(formik.errors.map) &&
          formik.errors.map.map((list: any, index) => {
            if (list && list.required && !isEmpty(list.required)) return index;
          });
        const findIndex =
          getindex && getindex.filter((a: any) => typeof a === 'number');
        if (Array.isArray(findIndex) && findIndex.length !== 0) {
          getFocus(`applicant_qustions_submit___error_${findIndex[0]}`);
        }
      }
    }
  }, [formik.errors,isFocus]);

  return (
    <Card className={styles.overAllCard}>
      <Flex>
        <Text bold size={18} className={styles.applicationText}>
          Application Form
        </Text>
        <Text>Start your application for the job</Text>
        <Text bold size={18} className={styles.personalText}>
          Personal Information:
        </Text>
        <Flex row between>
          <Flex flex={6}>
            {personalData.map((leftList) => (
              <Flex key={leftList.title} row center marginTop={16}>
                <Text style={{ width: 150 }}>{leftList.title}</Text>
                <Text>{leftList.value}</Text>
              </Flex>
            ))}
          </Flex>
          <Flex flex={6}>
            {personalRightData.map((leftList) => (
              <Flex key={leftList.title} row center marginTop={16}>
                <Text style={{ width: 210 }}>{leftList.title}</Text>
                <Text>{leftList.value}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Text bold size={20} className={styles.generalInfoStyle}>
          General Information:
        </Text>
        <InputText
          label="Cover Letter"
          labelBold
          value={formik.values.coverLetter}
          onChange={(event) => {
            setFocus(false);
            formik.setFieldValue('coverLetter', event.target.value);
          }}
          textarea
          className={styles.coverLetterInput}
        />
        <FormikProvider value={formik}>
          <FieldArray
            name="map"
            render={(arrayHelpers) =>
              questionnaire &&
              questionnaire.map((qustionsList, index) => {
                return (
                  <ApplicantQustionsSubmit
                    key={index}
                    value={qustionsList}
                    formik={formik}
                    arrayHelpers={arrayHelpers}
                    index={index}
                  />
                );
              })
            }
          />
        </FormikProvider>
        {jd_form && jd_form?.is_eeo_comp === true && (
          <>
            <Text bold size={18}>
              U.S. Equal Employment Opportunity Information (Completion is
              voluntary)
            </Text>
            <Text align="justify" style={{ marginTop: 20, marginBottom: 8 }}>
              Individuals seeking employment at Proxmox are considered without
              regards to race, color, religion, national origin, age, sex,
              marital status, ancestry, physical or mental disability, veteran
              status, gender identity, or sexual orientation. You are being
              given the opportunity to provide the following information in
              order to help us comply with federal and state Equal Employment
              Opportunity/Affirmative Action record keeping, reporting, and
              other legal requirements.
            </Text>
            <Text align="justify" style={{ marginBottom: 16 }}>
              Completion of the form is entirely <Text bold>voluntary</Text>.
              Whatever your decision, it will not be considered in the hiring
              process or thereafter. Any information that you do provide will be
              recorded and maintained in a confidential file.
            </Text>
            <Flex row top between>
              <div style={{ width: 320 }}>
                <SelectTag
                  options={genderOptions}
                  label="Gender"
                  labelBold
                  onChange={(options) => {
                    setFocus(false);
                    formik.setFieldValue('gender', options.value);
                  }}
                />
              </div>
              <div style={{ width: 320 }}>
                <SelectTag
                  options={q2Data}
                  label="Are you Hispanic/Latino?"
                  labelBold
                  onChange={(options) => {
                    setFocus(false);
                    formik.setFieldValue('hispanic', options.value);
                  }}
                />
                {formik.values.hispanic === 'No' && (
                  <div style={{ paddingTop: 16 }}>
                    <SelectTag
                      required
                      onChange={(options) => {
                        setFocus(false);
                        formik.setFieldValue('identify_race', options.value);
                      }}
                      // value={formik.values.identify_race}
                      options={q3Data}
                      labelBold
                      label="Please identify your race"
                    />
                    <ErrorMessage
                      name="identify_race"
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                )}
              </div>
            </Flex>
            <Text  color='link' onClick={()=>window.open(mediaPath+'RaceEthnicityDefinitions.pdf')} style={{ marginTop: 20, marginBottom: 20 }}>
              Race & Ethnicity Definitions
            </Text>
            <Text style={{ marginTop: 8 }} align="justify">
              {raceOne}
            </Text>
            <Text style={{ marginTop: 8 }} align="justify">
              {raceTwo}
            </Text>
            <Text style={{ marginTop: 8 }} align="justify">
              {raceThree}
            </Text>
            <Text style={{ marginTop: 8 }} align="justify">
              {raceFour}
            </Text>
            <Text style={{ marginTop: 8 }} align="justify">
              {raceFive}
            </Text>
            <div
              className={styles.selectTagStyle}
              style={{ marginTop: 16, marginBottom: 16, width: 320 }}
            >
              <SelectTag
                options={q4Data}
                label="Veteran Status"
                labelBold
                onChange={(options) => {
                  setFocus(false);
                  formik.setFieldValue('veteran', options.value);
                }}
              />
            </div>
            <Flex end>
              <Text>Form CC-305 OMB</Text>
              <Text style={{ margin: '4px 0px' }}>
                Control Number 1250-0005
              </Text>
              <Text>Expires 05/31/2023 </Text>
            </Flex>
            <Text bold size={18} style={{ marginTop: 16 }}>
              Voluntary Self-Identification of Disability
            </Text>
            <Text bold style={{ marginTop: 16 }}>
              Why are you being asked to complete this form?
            </Text>
            <Text style={{ marginTop: 8 }} align="justify">
              {selftOne}
            </Text>
            <Text style={{ marginTop: 8 }} align="justify">
              {selfTwo}
              <a
                target={'_blank'}
                rel="noreferrer"
                href="http://www.dol.gov/ofccp"
              >
                <Text bold color="link">
                  http://www.dol.gov/ofccp
                </Text>
              </a>
            </Text>
            <Text bold style={{ marginTop: 16 }}>
              How do you know if you have a disability?
            </Text>
            <Text style={{ marginTop: 8 }} align="justify">
              You are considered to have a disability if you have a physical or
              mental impairment or medical condition that substantially limits a
              major life activity, or if you have a history or record of such an
              impairment or medical condition.
            </Text>
            <Text style={{ marginTop: 8, marginBottom: 8 }}>
              Disabilities include, but are not limited to:
            </Text>
            {disabilitiesData.map((list) => {
              return (
                <ul key={list.value} className={styles.ulTag}>
                  <li>
                    <Text>{list.value}</Text>
                  </li>
                </ul>
              );
            })}
            <div
              className={styles.selectTagStyle}
              style={{ marginTop: 16, width: 320 }}
            >
              <SelectTag
                options={q5Data}
                label="Disability Status:"
                labelBold
                onChange={(options) => {
                  setFocus(false);
                  formik.setFieldValue('disability', options.value);
                }}
              />
            </div>
            <Text style={{ marginTop: 20 }} align="justify">
              {`1Section 503 of the Rehabilitation Act of 1973, as amended. For more
          information about this form or the equal employment obligations of
          Federal contractors, visit the U.S. Department of Labor's Office of
          Federal Contract Compliance Programs (OFCCP) website at`}
              <a
                target={'_blank'}
                rel="noreferrer"
                href="http://www.dol.gov/ofccp"
              >
                <Text color="link" bold>
                  {' http://www.dol.gov/ofccp'}
                </Text>
              </a>
            </Text>
            <Text style={{ marginTop: 8, marginBottom: 20 }} align="justify">
              PUBLIC BURDEN STATEMENT: According to the Paperwork Reduction Act
              of 1995 no persons are required to respond to a collection of
              information unless such collection displays a valid OMB control
              number. This survey should take about 5 minutes to complete.
            </Text>
          </>
        )}
        <Flex end>
          <Button
            onClick={() => {
              setFocus(true); 
              formik.handleSubmit();
              errorFocus();
            }}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ApplicationForm;
