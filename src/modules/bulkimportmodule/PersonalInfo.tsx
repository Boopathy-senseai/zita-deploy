import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import Toast from '../../uikit/Toast/Toast';
import Loader from '../../uikit/Loader/Loader';
import { AppDispatch } from '../../store';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { isEmpty } from '../../uikit/helper';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import {
  isValidLinkedinUrl,
  onlyNumber,
  letters,
  THIS_FIELD_REQUIRED,
  zipCodeRegx,
} from '../constValue';
import { jobTypeData } from '../createjdmodule/mock';
import { CountryEntity } from '../createjdmodule/createJdTypes';
import { locationMiddleWare } from '../createjdmodule/store/middleware/createjdmiddleware';
import { bulkImportUpdatePersonalMiddleWare,uploadedProfileViewMiddleWare } from './store/middleware/bulkImportMiddleware';

import {
  expYearOptions,
  monthOptions,
  availabilityOptions,
  currencyOptions,
} from './mock';
import styles from './PersonalInfo.module.css';

const inputWidth = 100;
const marginLeft = 2;
const marginRight = 2;
type Props = {
  personal?: any;
  personal_obj?: any;
  canId?: any;
  additional_detail?: any;
  cancel: () => void;
};

type personalUpdateForms = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentSalary: string;
  currency: string;
  location: string;
  country: string;
  expectedSalary: string;
  applicantSource: string;
  zipCode: string;
  years: string;
  month: string;
  availability: string;
  relocate: string;
  linkedInUrl: string;
  jobType: string;
};

const PersonalInformationEdit = ({
  canId,
  cancel,
  personal,
  additional_detail,
  personal_obj,
}: // isGetCountry,
Props) => {
  const dispatch: AppDispatch = useDispatch();
  // const [getState, setState] = useState<StatesEntity[]>([]);
  // const [getCity, setCity] = useState<CityEntity[]>([]);
  const [isLoader, setLoader] = useState(false);
  const [isReload, setReload] = useState(false);
  const [isGetCountry, setCountry] = useState<CountryEntity[]>([]);
  const [getLocation, setLocation] = useState<any>([]);
  const initial: personalUpdateForms = {
    firstName: '',
    lastName: '',
    email: '',
    jobType: '',
    availability: '',
    location: '',
    phone: '',
    country: '',
    applicantSource: '',
    relocate: '',
    currentSalary: '',
    currency: '',
    expectedSalary: '',
    zipCode: '',
    years: '',
    month: '',
    linkedInUrl: '',
  };

  // form validation
  const personalSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').required(THIS_FIELD_REQUIRED),
    lastName: Yup.string().min(1, 'Too Short!').required(THIS_FIELD_REQUIRED),
    phone: Yup.string()
      .min(11, 'Invalid contact number')
      .required(THIS_FIELD_REQUIRED),

    years: Yup.string().required(THIS_FIELD_REQUIRED),
    zipCode: Yup.string().required(THIS_FIELD_REQUIRED),
  });
  // form validation
  const handleValid = (values: personalUpdateForms) => {
    const errors: Partial<personalUpdateForms> = {};

    if (
      !isEmpty(values.linkedInUrl) &&
      !isValidLinkedinUrl(values.linkedInUrl)
    ) {
      errors.linkedInUrl = 'Please enter a valid URL';
    }

    return errors;
  };

  useEffect(() => {
   
    dispatch(locationMiddleWare({})).then((res) => {
      setCountry(res.payload.country);
    });
  }, []);
  // form submit
  const handleSubmit = (values: personalUpdateForms) => {
    setLoader(true);
    const formData = new FormData();
    formData.append('firstname', values.firstName);
    formData.append('lastname', values.lastName);
    formData.append('email', values.email);
    formData.append('contact_no', values.phone);
    formData.append('type_of_job', values.jobType);
    formData.append('available_to_start', values.availability);
    formData.append('applicant_source', values.applicantSource);
    formData.append('zipcode', values.zipCode);
    formData.append('relocate', values.relocate);
    formData.append('location', values.location);
    formData.append('country', values.country);
    formData.append('curr_gross', values.currentSalary);
    formData.append('linkedin_url', values.linkedInUrl);
    formData.append('current_currency', values.currency);
    formData.append('exp_gross', values.expectedSalary);
    formData.append('total_exp_year', values.years);
    formData.append('total_exp_month', values.month);
    formData.append('candi_id', canId);

    dispatch(bulkImportUpdatePersonalMiddleWare({ formData })).then((res) => {
      if (res.payload.success) {
        dispatch(uploadedProfileViewMiddleWare({ id: canId }));
        Toast('Personal Info updated successfully');
        setReload(false);
        setLoader(false);
        cancel();
      } else {
        Toast('Personal Info not updated, Please try again', 'LONG', 'error');
        setLoader(false);
      }
    });
  };
  const { onDirty, onPristine, routerPrompt } = useUnsavedChangesWarning();

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validationSchema: personalSchema,
    validate: handleValid,
  });

  useEffect(() => {
    if (!isEmpty(formik.values.country)) {
      dispatch(
        locationMiddleWare({ location: Number(formik.values.country) }),
      ).then((res) => {
        if (res.payload.location && res.payload.location.length !== 0) {
          setLocation(res.payload.location);
        }
      });
    }
  }, [formik.values.country]);


  // free fill initial value
  useEffect(() => {
    if (personal) {
      if (!isEmpty(personal.firstname)) {
        formik.setFieldValue('firstName', personal.firstname);
      }
      if (!isEmpty(personal.lastname)) {
        formik.setFieldValue('lastName', personal.lastname);
      }
      if (!isEmpty(personal.email)) {
        formik.setFieldValue('email', personal.email);
      }
      if (!isEmpty(personal.contact_no)) {
        formik.setFieldValue('phone', personal.contact_no.toString());
      }
      if (!isEmpty(personal_obj?.country_id)) {
        formik.setFieldValue('country', personal_obj?.country_id.toString());
      }  if (!isEmpty(personal_obj?.location)) {
        formik.setFieldValue('location', personal_obj?.location);
      }
      if (!isEmpty(personal_obj?.relocate)) {
        if( personal_obj?.relocate===false){

      formik.setFieldValue('relocate', '0')
        }else{
      formik.setFieldValue('relocate', '1')

        }
      }
      if (!isEmpty(personal.exp_gross)) {
        formik.setFieldValue('expectedSalary', personal.exp_gross.toString());
      }else{
        formik.setFieldValue('expectedSalary', '');
      }
      if (!isEmpty(personal.curr_gross)) {
        formik.setFieldValue('currentSalary', personal.curr_gross.toString());
      }else{
        formik.setFieldValue('currentSalary', '');
      }
if (!isEmpty(personal.current_currency)) {
        formik.setFieldValue('currency', personal.current_currency);
      } 
      if (!isEmpty(personal.zipcode)) {
        formik.setFieldValue('zipCode', personal.zipcode);
      }
    if (!isEmpty(personal_obj.type_of_job_id)) {
        formik.setFieldValue('jobType', personal_obj.type_of_job_id.toString());
      }else{
        formik.setFieldValue('jobType', '');
      }
      if (!isEmpty(personal_obj.available_to_start_id)) {
        formik.setFieldValue(
          'availability',
          personal_obj.available_to_start_id.toString(),
        );
      }else{
        formik.setFieldValue(
          'availability',
''        );
      }
      if (!isEmpty(personal.linkedin_url)) {
        formik.setFieldValue('linkedInUrl', personal.linkedin_url);
      }   if (!isEmpty(personal_obj.applicant_source)) {
        formik.setFieldValue('applicantSource', personal_obj.applicant_source);
      }

      if (!isEmpty(additional_detail?.total_exp_year)) {
        formik.setFieldValue('years', additional_detail?.total_exp_year);
      }
      if (!isEmpty(additional_detail?.total_exp_month)) {
        formik.setFieldValue('month', additional_detail?.total_exp_month);
      }
    }
  }, [personal, open]);

  const onCloseModal = () => {
    if (
      isReload &&
      window.confirm(
        'Do you want to leave this site? Changes you made may not be saved.',
      )
    ) {
      cancel();
      formik.resetForm();
      setReload(false);
    }
    if (!isReload) {
      cancel();
      formik.resetForm();
      setReload(false);
    }
  };
  useEffect(() => {
    if (isReload) {
      onDirty();
    } else if (!isReload) {
      onPristine();
    }
  }, [isReload]);

  return (
    <Flex>
      {routerPrompt}

      {isLoader && <Loader />}
      <Flex className={styles.overAll}>
        <div
          className={styles.svgClose}
          onClick={onCloseModal}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <SvgCloseSmall />
        </div>
        <Text align="center" size={16} bold className={styles.title}>
          Update Personal Information
        </Text>
        <Flex columnFlex className={styles.scrollStyle}>
          <Flex row center top>
            <Flex flex={4} width={inputWidth}>
              <InputText
                label="First Name"
                required
                value={formik.values.firstName}
                onChange={(e) => {
                  if (e.target.value === '' || letters.test(e.target.value)) {
                    formik.setFieldValue(`firstName`, e.target.value);
                    setReload(true);
                  }
                }}
              />
              <ErrorMessage
                name="firstName"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
            <Flex
              flex={4}
              width={inputWidth}
              marginLeft={marginLeft}
              marginRight={marginRight}
            >
              <InputText
                required
                label="Last Name"
                value={formik.values.lastName}
                onChange={(e) => {
                  if (e.target.value === '' || letters.test(e.target.value)) {
                    formik.setFieldValue(`lastName`, e.target.value);
                    setReload(true);
                  }
                }}
              />
              <ErrorMessage
                name="lastName"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
            <Flex flex={4} width={inputWidth}>
              <InputText
                
                required
                label="Email"
                value={formik.values.email}
                onChange={(e) => {
                  setReload(true);
                  formik.setFieldValue('email', e.target.value);
                }}
              />
            </Flex>
          </Flex>
          <Flex row center className={styles.genderFlex}>
            <Flex flex={4} marginLeft={marginLeft} marginRight={marginRight}>
              <LabelWrapper label="Contact Number" required>
                <PhoneInput
                  inputClass={styles.phoneInput}
                  dropdownClass={styles.dropDownStyle}
                  country={'us'}
                  value={formik.values.phone}
                  onChange={(phone) => {
                    setReload(true);
                    formik.setFieldValue('phone', phone);
                  }}
                />
              </LabelWrapper>
              <ErrorMessage
                name="phone"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
            <Flex flex={4} marginLeft={marginLeft} marginRight={marginRight}>
               <SelectTag
                isSearchable
                options={isGetCountry}
                label="Country"
                required
                getOptionValue={(option: { id: number }) => `${option.id}`}
                getOptionLabel={(option: { name: string }) => option.name}
                value={
                  isGetCountry
                    ? isGetCountry.find(
                        (option) =>
                          Number(option.id) === Number(formik.values.country),
                      )
                    : ''
                }
                onChange={(option) => {
                  formik.setFieldValue('country', option.id.toString());
                  formik.setFieldValue('location', '');
                  
                  setReload(true);
                }}
              />
              {isEmpty(formik.values.country) && (
                <ErrorMessage
                  name="country"
                  touched={formik.touched}
                  errors={formik.errors}
                />
              )}
            </Flex>
          
          </Flex>
          <Flex row center top className={styles.locationFlex}>
            <Flex flex={4} marginLeft={marginLeft} marginRight={marginRight}>
               <SelectTag
                isSearchable
                options={getLocation}
                label="Location"
                required
                getOptionValue={(option: { id: string }) => `${option.id}`}
                getOptionLabel={(option: { location: string }) => option.location}
                value={
                  getLocation
                    ? getLocation.find(
                        (option:any) =>
                          option.location === formik.values.location,
                      )
                    : ''
                }
                onChange={(option) => {
                  formik.setFieldValue('location', option.location.toString());
                 
                  
                  setReload(true);
                }}
              />
              {isEmpty(formik.values.country) && (
                <ErrorMessage
                  name="country"
                  touched={formik.touched}
                  errors={formik.errors}
                />
              )}
            </Flex>
            <Flex flex={4} marginLeft={marginLeft} marginRight={marginRight}>
              <InputText
                label="Zip Code"
                required
                value={formik.values.zipCode}
                onChange={(e) => {
                  if (
                    e.target.value === '' ||
                    zipCodeRegx.test(e.target.value)
                  ) {
                    formik.setFieldValue(`zipCode`, e.target.value);
                    setReload(true);
                  }
                }}
                maxLength={6}
              />
              <ErrorMessage
                name="zipCode"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
          </Flex>
          <Text style={{ marginBottom: -15}}>Total Experience</Text>
          <Flex row center top className={styles.genderFlex}>
            {/*     <Flex flex={4} width={inputWidth}>
              <Flex row top>*/}
            <Flex flex={2} marginRight={marginRight}>
              <SelectTag
                isSearchable
                label="Years"
                required
                options={expYearOptions}
                onChange={(option) => {
                  formik.setFieldValue('years', option.value);
                  setReload(true);
                }}
                value={
                  expYearOptions
                    ? expYearOptions.find(
                        (option) =>
                          Number(option.value) === Number(formik.values.years),
                      )
                    : ''
                }
              />
              <ErrorMessage
                name="years"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
            <Flex flex={2}>
              <SelectTag
                isSearchable
                options={monthOptions}
                label="Months"
                onChange={(option) => {
                  formik.setFieldValue('month', option.value);

                  setReload(true);
                }}
                value={
                  monthOptions
                    ? monthOptions.find(
                        (option) =>
                          Number(option.value) === Number(formik.values.month),
                      )
                    : ''
                }
              />
            </Flex>

            <Flex
              flex={4}
              width={inputWidth}
              marginLeft={marginLeft}
              marginRight={marginRight}
            >
              <InputText
                label="Linkedin URL"
                value={formik.values.linkedInUrl}
                onChange={(e) => {
                  formik.setFieldValue('linkedInUrl', e.target.value);
                  setReload(true);
                }}
              />
              <ErrorMessage
                name="linkedInUrl"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
            <Flex
              flex={4}
              width={inputWidth}
              marginLeft={marginLeft}
              marginRight={marginRight}
            >
              <InputText
                label="Applicant Source"
                value={formik.values.applicantSource}
                onChange={(e) => {
                  formik.setFieldValue('applicantSource', e.target.value);
                  setReload(true);
                }}
              />
              <ErrorMessage
                name="applicantSource"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
          </Flex>
          <Text align="center" size={16} bold >
            Job Preference
          </Text>
          <Flex row top className={styles.genderFlex}>
            <Flex flex={4} width={inputWidth}>
              <SelectTag
                id="myjob_preference_edit___job_type"
                options={jobTypeData}
                label="Job Type"
                value={
                  jobTypeData
                    ? jobTypeData.find(
                        (option) =>
                          Number(option.value) ===
                          Number(formik.values.jobType),
                      )
                    : ''
                }
                onChange={(option) => {
                  setReload(true);
                  formik.setFieldValue('jobType', option.value);
                }}
              />
            </Flex>
            <Flex
              flex={4}
              width={inputWidth}
              marginLeft={marginLeft}
              marginRight={marginRight}
            >
              <SelectTag
                id="myjob_preference_edit___availability"
                options={availabilityOptions}
                label="Availability"
                value={
                  availabilityOptions
                    ? availabilityOptions.find(
                        (option) =>
                          Number(option.value) ===
                          Number(formik.values.availability),
                      )
                    : ''
                }
                onChange={(option) => {
                  setReload(true);
                  formik.setFieldValue('availability', option.value);
                }}
              />
            </Flex>
            <Flex flex={4} width={inputWidth} className={styles.relocateStyle}>
              <InputCheckBox
                onChange={() => setReload(true)}
                label="Willing to Relocate?"
                checked={Number(formik.values.relocate) === 1}
                onClick={() =>
                  formik.values.relocate === '1'
                    ? formik.setFieldValue('relocate', '0')
                    : formik.setFieldValue('relocate', '1')
                }
              />
            </Flex>
          </Flex>
          <Flex row top className={styles.genderFlex}>
            <Flex flex={4} width={inputWidth}>
              <InputText
                label={`Current CTC`}
                value={formik.values.currentSalary}
                onChange={(e) => {
                  if (
                    e.target.value === '' ||
                    onlyNumber.test(e.target.value)
                  ) {
                    setReload(true);
                    formik.setFieldValue(`currentSalary`, e.target.value);
                  }
                }}
                maxLength={10}
              />
            </Flex>

            <Flex flex={4} width={inputWidth}>
              <InputText
                label={`Expected CTC`}
                required
                value={formik.values.expectedSalary}
                onChange={(e) => {
                  if (
                    e.target.value === '' ||
                    onlyNumber.test(e.target.value)
                  ) {
                    setReload(true);
                    formik.setFieldValue(`expectedSalary`, e.target.value);
                  }
                }}
              />
              <ErrorMessage
                name="expectedSalary"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
            <Flex
              flex={4}
              width={inputWidth}
              marginLeft={marginLeft}
              marginRight={marginRight}
            >
              <SelectTag
                options={currencyOptions}
                label="Currency"
                required
                value={
                  currencyOptions
                    ? currencyOptions.find(
                        (option) => option.value === formik.values.currency,
                      )
                    : ''
                }
                onChange={(option) => {
                  setReload(true);
                  formik.setFieldValue('currency', option.value);
                }}
              />
              <ErrorMessage
                name="currency"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex end className={styles.updateButton}>
          <Button onClick={formik.handleSubmit}>Update</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PersonalInformationEdit;