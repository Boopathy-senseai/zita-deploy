import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import Loader from '../../uikit/Loader/Loader';
import Modal from '../../uikit/Modal/Modal';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import {
  ENTER_VALID_URL,
  isValidLinkedinUrl,
  THIS_FIELD_REQUIRED,
} from '../constValue';
import type {
  CityEntity,
  CountryEntity,
  StatesEntity,
} from '../createjdmodule/createJdTypes';
import { locationMiddleWare } from '../createjdmodule/store/middleware/createjdmiddleware';
import { expYearOptions, monthOptions } from './mock';
import styles from './personalinformation.module.css';
import {
  basicDetailMiddleWare,
  emailValidationMiddleWare,
} from './store/middleware/candidateprofilemiddleware';

type formProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedIn: string;
  years: any;
  month: string;
  county: string;
  state: string;
  city: string;
};

const initial: formProps = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  linkedIn: '',
  years: '',
  month: '0',
  county: '',
  state: '',
  city: '',
};
type Props = {
  open: boolean;
  cancel: () => void;
};

const PersonalInformation = ({ open, cancel }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isGetCountry, setCountry] = useState<CountryEntity[]>([]);
  const [getState, setState] = useState<StatesEntity[]>([]);
  const [getCity, setCity] = useState<CityEntity[]>([]);
  const [isError, setError] = useState(false);
  const [isLoader, setLoader] = useState(false);
  useEffect(() => {
    dispatch(locationMiddleWare({})).then((res) => {
      setCountry(res.payload.country);
    });
  }, []);

  const personalSchema = Yup.object().shape({
    firstName: Yup.string().required(THIS_FIELD_REQUIRED),
    lastName: Yup.string().required(THIS_FIELD_REQUIRED),
    phone: Yup.string()
      .min(11, 'Invalid contact number')
      .required(THIS_FIELD_REQUIRED),
    linkedIn: Yup.string().required(THIS_FIELD_REQUIRED),
    years: Yup.string().required(THIS_FIELD_REQUIRED),
    county: Yup.string().required(THIS_FIELD_REQUIRED),
    state: Yup.string().required(THIS_FIELD_REQUIRED),
    city: Yup.string().required(THIS_FIELD_REQUIRED),
    email: Yup.string().required(THIS_FIELD_REQUIRED),
  });

  const handleSubmit = (values: formProps) => {
    setLoader(true);
    const formData = new FormData();
    formData.append('firstname', values.firstName);
    formData.append('lastname', values.lastName);
    formData.append('email', values.email);
    formData.append('contact_no', values.phone);
    formData.append('linkedin_url', values.linkedIn);
    formData.append('current_state', values.state);
    formData.append('current_city', values.city);
    formData.append('total_exp_year', values.years);
    formData.append('total_exp_month', values.month);
    formData.append('current_country', values.county);
    dispatch(basicDetailMiddleWare({ formData })).then((res) => {
      if (res.payload.success) {
        cancel();
        setLoader(false);
      } else {
        setLoader(false);
      }
    });
  };

  const handleValidation = (values: formProps) => {
    const errors: Partial<formProps> = {};
    if (!isEmpty(values.linkedIn) && !isValidLinkedinUrl(values.linkedIn)) {
      errors.linkedIn = ENTER_VALID_URL;
    }
    if (!isEmpty(values.email) && isError) {
      errors.email = '';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validationSchema: personalSchema,
    validate: handleValidation,
  });

  useEffect(() => {
    if (!isEmpty(formik.values.county)) {
      dispatch(
        locationMiddleWare({ country: Number(formik.values.county) }),
      ).then((res) => {
        if (res.payload.states && res.payload.states.length !== 0) {
          setState(res.payload.states);
        }
      });
    }
  }, [formik.values.county]);

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
    dispatch(
      emailValidationMiddleWare({ email: formik.values.email, empId: '608' }),
    ).then((res) => {
      if (res.payload.success) {
        setError(true);
      } else {
        setError(false);
      }
    });
    localStorage.setItem('companyMailId', formik.values.email);
  }, [formik.values.email]);

  return (
    <Modal open={open}>
      {isLoader && <Loader />}
      <Flex className={styles.overAll}>
        <Text align="center" bold size={20} className={styles.infoText}>
          Personal Information
        </Text>
        <Flex row top>
          <Flex flex={4} width={284}>
            <InputText
              label="First Name"
              required
              value={formik.values.firstName}
              onChange={formik.handleChange('firstName')}
            />
            <ErrorMessage
              name="firstName"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={4} width={284} marginLeft={16} marginRight={16}>
            <InputText
              label="Last Name"
              required
              value={formik.values.lastName}
              onChange={formik.handleChange('lastName')}
            />
            <ErrorMessage
              name="lastName"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={4} width={284}>
            <InputText
              label="Email"
              required
              value={formik.values.email}
              onChange={formik.handleChange('email')}
            />
            <ErrorMessage
              name="email"
              touched={formik.touched}
              errors={formik.errors}
            />
            {isError && (
              <Text color="error" size={12}>
                {
                  'This email id already exist. Please login or use another valid email id to proceed'
                }
              </Text>
            )}
          </Flex>
        </Flex>
        <Text align="center" color="link" className={styles.loginText}>
          Your login details are sent to the provided email id and system
          generated password for further login
        </Text>
        <Flex row top>
          <Flex flex={4} width={284}>
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
          <Flex flex={4} width={284} marginLeft={16} marginRight={16}>
            <InputText
              label="Linkedin URL"
              required
              value={formik.values.linkedIn}
              onChange={formik.handleChange('linkedIn')}
            />
            <ErrorMessage
              name="linkedIn"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex row top flex={4} width={284} className={styles.totalExpFlex}>
            <Flex flex={6} marginRight={16}>
              <Text className={styles.totalExpText}>Total Experience</Text>
              <SelectTag
                options={expYearOptions}
                label="Years"
                required
                onChange={(options) =>
                  formik.setFieldValue('years', options.value)
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
                          Number(option.value) === Number(formik.values.month),
                      )
                    : ''
                }
              />
            </Flex>
          </Flex>
        </Flex>
        <Text align="center" bold size={20} className={styles.workText}>
          Preferred Work Location
        </Text>
        <Flex row top>
          <Flex flex={4} width={284}>
            <SelectTag
              options={isGetCountry}
              label="Country"
              required
              getOptionValue={(option: { id: number }) => `${option.id}`}
              getOptionLabel={(option: { name: string }) => option.name}
              onChange={(option) => formik.setFieldValue('county', option.id)}
            />
            <ErrorMessage
              name="county"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={4} width={284} marginLeft={16} marginRight={16}>
            <SelectTag
              options={getState}
              label="State"
              required
              getOptionValue={(option: { id: number }) => `${option.id}`}
              getOptionLabel={(option: { name: string }) => option.name}
              onChange={(option) => formik.setFieldValue('state', option.id)}
            />
            <ErrorMessage
              name="state"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={4} width={284}>
            <SelectTag
              options={getCity}
              label="City"
              required
              getOptionValue={(option: { id: number }) => `${option.id}`}
              getOptionLabel={(option: { name: string }) => option.name}
              onChange={(option) => formik.setFieldValue('city', option.id)}
            />
            <ErrorMessage
              name="city"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
        <Flex middle className={styles.saveBtn}>
          <Button onClick={formik.handleSubmit}>Save</Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default PersonalInformation;
