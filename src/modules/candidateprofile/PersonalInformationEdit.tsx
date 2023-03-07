import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Toast from '../../uikit/Toast/Toast';
import Loader from '../../uikit/Loader/Loader';
import { AppDispatch } from '../../store';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import Modal from '../../uikit/Modal/Modal';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { isEmpty } from '../../uikit/helper';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import {
  isValidLinkedinUrl,
  letters,
  THIS_FIELD_REQUIRED,
} from '../constValue';
import { locationMiddleWare } from '../createjdmodule/store/middleware/createjdmiddleware';
import {
  CountryEntity,
  StatesEntity,
  CityEntity,
} from '../createjdmodule/createJdTypes';
import { AdditionalDetailEntity, Personal } from './candidateProfileTypes';
import styles from './personalinformationedit.module.css';
import { expYearOptions, genderOptions, monthOptions } from './mock';
import {
  profileEditMiddleWare,
  updatePersonalInfoMiddleWare,
} from './store/middleware/candidateprofilemiddleware';

const inputWidth = 320;
const marginLeft = 16;
const marginRight = 16;
type Props = {
  open: boolean;
  cancel: () => void;
  personal?: Personal;
  personal_obj?: Personal;
  additional_detail?: AdditionalDetailEntity;
  isGetCountry: CountryEntity[];
};

type personalUpdateForms = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  birthYear: any;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  years: string;
  month: string;
  objective: string;
  linkedInUrl: string;
  gitUrl: string;
};

const PersonalInformationEdit = ({
  open,
  cancel,
  personal,
  additional_detail,
  personal_obj,
  isGetCountry,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [getState, setState] = useState<StatesEntity[]>([]);
  const [getCity, setCity] = useState<CityEntity[]>([]);
  const [isLoader, setLoader] = useState(false);

  const initial: personalUpdateForms = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phone: '',
    birthYear: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    years: '',
    month: '',
    objective: '',
    linkedInUrl: '',
    gitUrl: '',
  };

  const personalSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').required(THIS_FIELD_REQUIRED),
    lastName: Yup.string().min(1, 'Too Short!').required(THIS_FIELD_REQUIRED),
    gender: Yup.string().required(THIS_FIELD_REQUIRED),
    phone: Yup.string()
      .min(11, 'Invalid contact number')
      .required(THIS_FIELD_REQUIRED),
    birthYear: Yup.string().required(THIS_FIELD_REQUIRED),
    country: Yup.string().required(THIS_FIELD_REQUIRED),
    state: Yup.string().required(THIS_FIELD_REQUIRED),
    city: Yup.string().required(THIS_FIELD_REQUIRED),
    years: Yup.string().required(THIS_FIELD_REQUIRED),
  });

  const handleValid = (values: personalUpdateForms) => {
    const errors: Partial<personalUpdateForms> = {};
    if (!isEmpty(values.objective) && values.objective.length <= 150) {
      errors.objective = `Text length should be minimum 150 characters`;
    }
    if (
      !isEmpty(values.linkedInUrl) &&
      !isValidLinkedinUrl(values.linkedInUrl)
    ) {
      errors.linkedInUrl = 'Please enter a valid URL';
    }
    return errors;
  };

  const handleSubmit = (values: personalUpdateForms) => {
    setLoader(true);
    const formData = new FormData();
    formData.append('firstname', values.firstName);
    formData.append('lastname', values.lastName);
    formData.append('email', values.email);
    formData.append('contact_no', values.phone);
    formData.append('country', values.country);
    formData.append('state', values.state);
    formData.append('city', values.city);
    formData.append('zipcode', values.zipCode);
    formData.append('gender', values.gender);
    formData.append('Date_of_birth', values.birthYear);
    formData.append('linkedin_url', values.linkedInUrl);
    formData.append('career_summary', values.objective);
    formData.append('code_repo', values.gitUrl);
    formData.append('total_exp_year', values.years);
    formData.append('total_exp_month', values.month);
    dispatch(updatePersonalInfoMiddleWare({ formData })).then((res) => {
      if (res.payload.success) {
        Toast('Personal Info updated successfully');
        dispatch(profileEditMiddleWare());
        setLoader(false);
        cancel();
      } else {
        Toast('Personal Info not updated, Please try again', 'LONG', 'error');
        setLoader(false);
      }
    });
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validationSchema: personalSchema,
    validate: handleValid,
  });

  useEffect(() => {
    if (!isEmpty(formik.values.country)) {
      dispatch(
        locationMiddleWare({ country: Number(formik.values.country) }),
      ).then((res) => {
        if (res.payload.states && res.payload.states.length !== 0) {
          setState(res.payload.states);
        }
      });
    }
  }, [formik.values.country]);

  useEffect(() => {
    if (!isEmpty(formik.values.state)) {
      dispatch(locationMiddleWare({ state: Number(formik.values.state) })).then(
        (res) => {
          if (res.payload.city && res.payload.city.length !== 0) {
            setCity(res.payload.city);
          }
        },
      );
    }
  }, [formik.values.state]);

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
        formik.setFieldValue('country', personal_obj?.country_id);
      }
      if (!isEmpty(personal_obj?.state_id)) {
        formik.setFieldValue('state', personal_obj?.state_id);
      }
      if (!isEmpty(personal_obj?.city_id)) {
        formik.setFieldValue('city', personal_obj?.city_id);
      }
      if (!isEmpty(personal.zipcode)) {
        formik.setFieldValue('zipCode', personal.zipcode);
      }
      if (!isEmpty(personal_obj?.gender_id)) {
        formik.setFieldValue('gender', personal_obj?.gender_id.toString());
      }
      if (personal.Date_of_birth) {
        formik.setFieldValue('birthYear', personal.Date_of_birth);
      }
      if (!isEmpty(personal.linkedin_url)) {
        formik.setFieldValue('linkedInUrl', personal.linkedin_url);
      }
      if (!isEmpty(personal.career_summary)) {
        formik.setFieldValue('objective', personal.career_summary);
      }
      if (!isEmpty(additional_detail?.total_exp_year)) {
        formik.setFieldValue('years', additional_detail?.total_exp_year);
      }
      if (!isEmpty(additional_detail?.total_exp_month)) {
        formik.setFieldValue('month', additional_detail?.total_exp_month);
      }
      if (!isEmpty(personal.code_repo)) {
        formik.setFieldValue('gitUrl', personal?.code_repo);
      }
    }
  }, [personal]);

  return (
    <Modal open={open}>
      {isLoader && <Loader />}
      <Flex columnFlex className={styles.overAll}>
        <div
          className={styles.svgClose}
          onClick={cancel}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <SvgCloseSmall />
        </div>
        <Text align="center" size={20} bold className={styles.title}>
          Update Personal Information
        </Text>
        <Flex row center top>
          <Flex flex={4} width={inputWidth}>
            <InputText
              label="First Name"
              required
              value={formik.values.firstName}
              onChange={(e) => {
                if (e.target.value === '' || letters.test(e.target.value)) {
                  console.log();
                  formik.setFieldValue(`firstName`, e.target.value);
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
                  console.log();
                  formik.setFieldValue(`lastName`, e.target.value);
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
              disabled
              required
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange('email')}
            />
          </Flex>
        </Flex>
        <Flex row center className={styles.genderFlex}>
          <Flex flex={4} width={inputWidth}>
            <SelectTag
              options={genderOptions}
              label="Gender"
              required
              onChange={(option) =>
                formik.setFieldValue('gender', option.value)
              }
              value={
                genderOptions
                  ? genderOptions.find(
                      (option) =>
                        Number(option.value) === Number(formik.values.gender),
                    )
                  : ''
              }
            />
          </Flex>
          <Flex flex={4} marginLeft={marginLeft} marginRight={marginRight}>
            <LabelWrapper label="Contact Number" required>
              <PhoneInput
                inputClass={styles.phoneInput}
                dropdownClass={styles.dropDownStyle}
                country={'us'}
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue('phone', phone)}
              />
            </LabelWrapper>
            <ErrorMessage
              name="phone"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={4} width={inputWidth}>
            <InputText
              required
              label="Birth Year"
              value={formik.values.birthYear}
              onChange={formik.handleChange('birthYear')}
            />

            <ErrorMessage
              name="birthYear"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
        <Flex row center top>
          <Flex flex={4} width={inputWidth}>
            <SelectTag
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
              onChange={(option) =>
                formik.setFieldValue('country', option.id.toString())
              }
            />
            <ErrorMessage
              name="county"
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
              options={getState}
              label="State"
              required
              getOptionValue={(option: { id: number }) => `${option.id}`}
              getOptionLabel={(option: { name: string }) => option.name}
              onChange={(option) => formik.setFieldValue('state', option.id)}
              value={
                getState
                  ? getState.find(
                      (option) =>
                        Number(option.id) === Number(formik.values.state),
                    )
                  : ''
              }
            />
            <ErrorMessage
              name="state"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={4} width={inputWidth}>
            <SelectTag
              options={getCity}
              label="City"
              required
              getOptionValue={(option: { id: number }) => `${option.id}`}
              getOptionLabel={(option: { name: string }) => option.name}
              onChange={(option) => formik.setFieldValue('city', option.id)}
              value={
                getCity
                  ? getCity.find(
                      (option) =>
                        Number(option.id) === Number(formik.values.city),
                    )
                  : ''
              }
            />
            <ErrorMessage
              name="city"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
        <Flex row center top className={styles.genderFlex}>
          <Flex flex={4} width={inputWidth}>
            <InputText
              label="Zip Code"
              required
              value={formik.values.zipCode}
              onChange={formik.handleChange('zipCode')}
            />
            <ErrorMessage
              name="zipCode"
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
              label="Linkedin URL"
              value={formik.values.linkedInUrl}
              onChange={formik.handleChange('linkedInUrl')}
            />
            <ErrorMessage
              name="linkedInUrl"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={4} width={inputWidth}>
            <InputText
              label="Your Personal Code Repository"
              value={formik.values.gitUrl}
              onChange={formik.handleChange('gitUrl')}
            />
            <ErrorMessage
              name="gitUrl"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
        <Text>Total Experience</Text>
        <Flex columnFlex>
          <Flex flex={4} width={inputWidth}>
            <Flex row top>
              <Flex flex={6} marginRight={marginRight}>
                <SelectTag
                  label="Years"
                  required
                  options={expYearOptions}
                  onChange={(option) =>
                    formik.setFieldValue('years', option.value)
                  }
                  value={
                    expYearOptions
                      ? expYearOptions.find(
                          (option) =>
                            Number(option.value) ===
                            Number(formik.values.years),
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
              <Flex flex={6}>
                <SelectTag
                  options={monthOptions}
                  label="Months"
                  onChange={(option) =>
                    formik.setFieldValue('month', option.value)
                  }
                  value={
                    monthOptions
                      ? monthOptions.find(
                          (option) =>
                            Number(option.value) ===
                            Number(formik.values.month),
                        )
                      : ''
                  }
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex flex={4}>
            <></>
          </Flex>
          <Flex flex={4}>
            <></>
          </Flex>
        </Flex>
        <Flex className={styles.objectiveInput}>
          <InputText
            label="Career Objective"
            textarea
            value={formik.values.objective}
            onChange={formik.handleChange('objective')}
          />
          <ErrorMessage
            name="objective"
            touched={formik.touched}
            errors={formik.errors}
          />
        </Flex>
        <Flex end>
          <Button disabled={!formik.isValid} onClick={formik.handleSubmit}>
            Update
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
export default PersonalInformationEdit;
