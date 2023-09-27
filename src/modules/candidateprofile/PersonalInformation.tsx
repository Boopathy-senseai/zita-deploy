import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useHistory, useLocation, useParams } from 'react-router-dom';
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
  PLEASE_ENTER_VALID_MAIL,
  THIS_FIELD_REQUIRED,
} from '../constValue';
import type {
  CityEntity,
  CountryEntity,
  StatesEntity,
} from '../createjdmodule/createJdTypes';
import { locationMiddleWare } from '../createjdmodule/store/middleware/createjdmiddleware';
import SvgInfo from '../../icons/SvgInfo';
import { UserInfo } from './candidateProfileTypes';
import { expYearOptions, monthOptions } from './mock';
import styles from './personalinformation.module.css';
import {
  basicDetailMiddleWare,
  emailValidationMiddleWare,
  // personalInformationMiddleware,
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
  linkedIn: 'https://',
  years: '',
  month: '',
  county: '',
  state: '',
  city: '',
};
type Props = {
  open: boolean;
  cancel: () => void;
  handleOpenLogin: () => void;
  empId: string;
  userInfo?: UserInfo;
  additional_detail?:any;
  personal?:any;
};

type ParamsType = {
  empId: string;
};

const PersonalInformation = ({
  open,
  cancel,
  handleOpenLogin,
  empId,
  personal,
  userInfo,
  additional_detail
}: Props) => {
  const params = useParams<ParamsType>();
  const dispatch: AppDispatch = useDispatch();
  const [isGetCountry, setCountry] = useState<CountryEntity[]>([]);
  const [getState, setState] = useState<StatesEntity[]>([]);
  const [getCity, setCity] = useState<CityEntity[]>([]);
  const [isError, setError] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isShowText, setShowText] = useState(false);

  useEffect(() => {
    dispatch(locationMiddleWare({})).then((res) => {
      setCountry(res.payload.country);
    });
  }, []);

  // form validation
  const personalSchema = Yup.object().shape({
    firstName: Yup.string().required(THIS_FIELD_REQUIRED),
    lastName: Yup.string().required(THIS_FIELD_REQUIRED),
    phone: Yup.string()
      .required('This field is required.')
      .max(15, 'Enter a valid contact number.')
      .min(10, 'Enter a valid contact number.'),
    linkedIn: Yup.string().required(THIS_FIELD_REQUIRED),
    years: Yup.string().required(THIS_FIELD_REQUIRED),
    county: Yup.string().required(THIS_FIELD_REQUIRED),
    state: Yup.string().required(THIS_FIELD_REQUIRED),
    city: Yup.string().required(THIS_FIELD_REQUIRED),
    email: Yup.string()
      .email(PLEASE_ENTER_VALID_MAIL)
      .required(THIS_FIELD_REQUIRED),
  });
  
  // form submit function
  const handleSubmit = (values: formProps) => {
    setLoader(true);
    const formData = new FormData();
    formData.append('firstname', values.firstName);
    formData.append('lastname', values.lastName);
    formData.append('email', values.email !== 'None' && values.email);
    formData.append('contact_no', values.phone);
    formData.append('linkedin_url', values.linkedIn);
    formData.append('current_state', values.state);
    formData.append('current_city', values.city);
    formData.append('total_exp_year', values.years);
    formData.append(
      'total_exp_month',
      isEmpty(values.month) ? '0' : values.month,
    );
    formData.append('current_country', values.county);
    dispatch(basicDetailMiddleWare({ formData })).then((res) => {
      if (res.payload.success) {
        if (userInfo?.active === true) {
          window.location.replace(window.location.origin + '/');
        } else {
          cancel();
        }
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
    if (!isEmpty(values.email) && isError && userInfo && !userInfo?.active) {
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
  // useEffect(()=>{
  //   dispatch(personalInformationMiddleware({emp_id: params.empId}));
  // })
  useEffect(() => { 
      if (!isEmpty(personal.firstname)&&personal.firstname !== 'None') {
        formik.setFieldValue('firstName', personal.firstname);
      }
      if (!isEmpty(personal.lastname)&&personal.lastname !== 'None') {
        formik.setFieldValue('lastName', personal.lastname);
      }
      if (!isEmpty(personal.email)&&personal.email !== 'None' ) {
        formik.setFieldValue('email', personal.email);
      }
      if (!isEmpty(personal.contact_no) &&personal.contact_no !== 'None') {
        formik.setFieldValue('phone', personal.contact_no.toString());
      } 
      if (!isEmpty(personal.linkedin_url) &&personal.linkedin_url !== 'None' ) {
        formik.setFieldValue('linkedInUrl', personal.linkedin_url);  }
       if (!isEmpty(additional_detail?.total_exp_year)&& Number(additional_detail?.total_exp_year) !== 0) {
        formik.setFieldValue('years', additional_detail?.total_exp_year);
        }
      if (!isEmpty(additional_detail?.total_exp_month && Number(additional_detail?.total_exp_month) !== 0)) {
        formik.setFieldValue('month', additional_detail?.total_exp_month);
      }
   
  }, [personal,additional_detail]);

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
      emailValidationMiddleWare({ email: formik.values.email, empId }),
    ).then((res) => {
      if (res.payload.success) {
        setError(true);
      } else {
        setError(false);
      }
    });
    localStorage.setItem('companyMailId', formik.values.email);
  }, [formik.values.email]);

  useEffect(() => {
    if (userInfo && userInfo.email && !isEmpty(userInfo?.email)) {
      formik.setFieldValue('email', userInfo.email);
    }
  }, [userInfo]);

  const [inputLengthErrorpass, setInputLengthErrorpass] = useState(false);
  const handleInputChangepass = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputLength = event.target.value.length;

    // Check if input length exceeds 20 characters
    if (inputLength > 50) {
      setInputLengthErrorpass(true);
    } else {
      setInputLengthErrorpass(false);
      formik.handleChange('email')(event); // Update the formik value
    }
  };
  const submit = () => {
    if (inputLengthErrorpass === false) {
      formik.handleSubmit();
    }
  };

  return (
    <Modal open={open}>
      {/* {isLoader && <Loader />} */}
      <Flex className={styles.overAll}>
        <Flex
          style={{ borderBottom: '0.5px solid #581845', marginBottom: '15px' }}
        >
          <Text
            bold
            size={14}
            className={styles.infoText}
            style={{ marginBottom: '5px' }}
          >
            Personal Information
          </Text>
        </Flex>

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
            <div
              onFocus={() => setShowText(false)}
              onBlur={() => setShowText(true)}
            >
              <InputText
                label="Email"
                required
                value={formik.values.email}
                onChange={handleInputChangepass}
              />
            </div>

            <ErrorMessage
              name="email"
              touched={formik.touched}
              errors={formik.errors}
            />
            {inputLengthErrorpass === true && (
              <Text
                //align="center"
                color="error"
                size={12}
                // className={styles.loginText}
              >
                Email should be a maximum of 50 characters
              </Text>
            )}
          </Flex>
        </Flex>

        {userInfo && !userInfo?.active && isError && (
          <Text
            align="center"
            color="error"
            size={12}
            className={styles.loginText}
          >
            This email id already exist. Please{' '}
            <Text color="link" onClick={handleOpenLogin}>
              login
            </Text>{' '}
            or use another valid email id to proceed
          </Text>
        )}
        {isShowText && isError === false && !isEmpty(formik.values.email) && (
          <Flex row center className={styles.loginText}>
            <SvgInfo fill="#fcc203" width={12} height={12} />
            <Text
              align="center"
              style={{ color: '#fcc203', marginLeft: '5px' }}
            >
              {`Your login details will be sent to the provided email id & system generated password for further login. If not please check your spam folder.`}
            </Text>
          </Flex>
        )}

        <Flex row top className={styles.contactFlex}>
          <Flex>
            <LabelWrapper label="Contact Number" required>
              <PhoneInput
                inputClass={styles.phoneInput}
                dropdownClass={styles.dropDownStyle}
                country={'us'}
                value={formik.values.phone}
                onChange={(phone, _data: any, _event, _formattedValue) => {
                  const countryCode = _data.dialCode;

                  // setPhoneValidate(phone.slice(data.dialCode.length));
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
          <Flex width={284} marginLeft={16} marginRight={16}>
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
        </Flex>
        <Flex row top marginTop={20} className={styles.totalExpFlex}>
          <Flex marginRight={16} width={284}> 
            <SelectTag
              options={expYearOptions}
              label="Total Experience Years"
              required
              value={
                // formik.values.years
                expYearOptions
                  ? expYearOptions.find(
                      (option) =>  Number(option.value) ===  Number(formik.values.years),
                    )
                  :  ''
              }
              isSearchable
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
          <Flex width={284}>
            <SelectTag
              isSearchable
              options={monthOptions}
              label="Months"
              onChange={(option) => formik.setFieldValue('month', option.value)}
              value={
                monthOptions
                  ? monthOptions.find(
                      (option) =>  Number(option.value) ===  Number(formik.values.month),
                    )
                  : ''
              }
            />
          </Flex>
        </Flex>
        <Text bold size={14} className={styles.workText}>
          Preferred Work Location
        </Text>
        <Flex row top>
          <Flex flex={4} width={284}>
            <SelectTag
              isSearchable
              options={isGetCountry}
              label="Country"
              required
              value={
                isGetCountry
                  ? isGetCountry.find(
                      (option) => option.id === Number(formik.values.county),
                    )
                  : ''
              }
              getOptionValue={(option: { id: number }) => `${option.id}`}
              getOptionLabel={(option: { name: string }) => option.name}
              onChange={(option) => {
                formik.setFieldValue('county', option.id);
                formik.setFieldValue('state', '');
                formik.setFieldValue('city', '');
              }}
            />
            {isEmpty(formik.values.county) && (
              <ErrorMessage
                name="county"
                touched={formik.touched}
                errors={formik.errors}
              />
            )}
          </Flex>
          <Flex flex={4} width={284} marginLeft={16} marginRight={16}>
            <SelectTag
              isSearchable
              options={getState}
              value={
                !isEmpty(formik.values.state)
                  ? getState
                    ? getState.find(
                        (option) => option.id === Number(formik.values.state),
                      )
                    : ''
                  : ''
              }
              label="State"
              required
              getOptionValue={(option: { id: number }) => `${option.id}`}
              getOptionLabel={(option: { name: string }) => option.name}
              onChange={(option) => {
                formik.setFieldValue('state', option.id);
                formik.setFieldValue('city', '');
              }}
            />
            {isEmpty(formik.values.state) && (
              <ErrorMessage
                name="state"
                touched={formik.touched}
                errors={formik.errors}
              />
            )}
          </Flex>
          <Flex flex={4} width={284}>
            <SelectTag
              isSearchable
              options={getCity}
              value={
                !isEmpty(formik.values.city)
                  ? getCity
                    ? getCity.find(
                        (option) => option.id === Number(formik.values.city),
                      )
                    : ''
                  : ''
              }
              label="City"
              required
              getOptionValue={(option: { id: number }) => `${option.id}`}
              getOptionLabel={(option: { name: string }) => option.name}
              onChange={(option) => formik.setFieldValue('city', option.id)}
            />
            {isEmpty(formik.values.city) && (
              <ErrorMessage
                name="city"
                touched={formik.touched}
                errors={formik.errors}
              />
            )}
          </Flex>
        </Flex>
        <Flex
          end
          className={styles.saveBtn}
          style={{ borderTop: '1px solid #c3c3c3' }}
        >
          {/* <Button onClick={submit} style={{ marginTop: '10px' }}>
            {userInfo && userInfo.active ? 'Go to Messages' : 'Save'}
          </Button> */}
          {isLoader ? (
            <Flex className={styles.profilesaveBtnLoader}>
              <Loader size="small" withOutOverlay />
            </Flex>
          ) : (
            <Button onClick={submit} style={{ marginTop: '10px' }}>
              {userInfo && userInfo.active ? 'Go to Messages' : 'Save'}
            </Button>
          )} 
        </Flex>
      </Flex>
    </Modal>
  );
};

export default PersonalInformation;
