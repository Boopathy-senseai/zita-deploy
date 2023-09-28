import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import { AppDispatch } from '../../store';
import Loader from '../../uikit/Loader/Loader';
import Toast from '../../uikit/Toast/Toast';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../uikit/InputText/InputText';
import Modal from '../../uikit/Modal/Modal';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import { industryType, jobTypeData } from '../createjdmodule/mock';
import { onlyNumber, THIS_FIELD_REQUIRED } from '../constValue';
import {
  CountryEntity,
  StatesEntity,
  CityEntity,
} from '../createjdmodule/createJdTypes';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { locationMiddleWare } from '../createjdmodule/store/middleware/createjdmiddleware';
import { candidateMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import styles from './myjobpreferenceedit.module.css';
import {
  profileEditMiddleWare,
  updateJobPreferenceMiddleWare,
} from './store/middleware/candidateprofilemiddleware';
import { Personal } from './candidateProfileTypes';
import { availabilityOptions, currencyOptions } from './mock';

const inputWidth = 320;
const marginLeft = 16;
const marginRight = 16;
type Props = {
  open: boolean;
  cancel: () => void;
  personal?: Personal;
  isGetCountry: CountryEntity[];
};

type jobPreferenceUpdateForms = {
  jobType: string;
  availability: string;
  industryType: string;
  currentSalary: string;
  expectedSalary: string;
  country: string;
  state: string;
  city: string;
  relocate: string;
  currency: string;
};

const MyJobPreferenceEdit = ({
  open,
  cancel,
  personal,
  isGetCountry,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [getState, setState] = useState<StatesEntity[]>([]);
  const [getCity, setCity] = useState<CityEntity[]>([]);
  const [isLoader, setLoader] = useState(false);
  const [isReload, setReload] = useState(false);
  const [isBtnLoader, setBtnLoader] = useState(false)

  const initial: jobPreferenceUpdateForms = {
    jobType: '',
    availability: '',
    industryType: '',
    currentSalary: '',
    expectedSalary: '',
    country: '',
    state: '',
    city: '',
    relocate: '0',
    currency: '',
  };

  // form validation
  const myJobSchema = Yup.object().shape({
    currency: Yup.string().required(THIS_FIELD_REQUIRED),
    expectedSalary: Yup.string().required(THIS_FIELD_REQUIRED),
    country: Yup.string().required(THIS_FIELD_REQUIRED),
    state: Yup.string().required(THIS_FIELD_REQUIRED),
    city: Yup.string().required(THIS_FIELD_REQUIRED),
  });

  // form submit function
  const handleSubmit = (values: jobPreferenceUpdateForms) => {
    setBtnLoader(true);
    const formData = new FormData();
    formData.append('curr_gross', values.currentSalary);
    formData.append('current_currency', values.currency);
    formData.append('exp_gross', values.expectedSalary);
    formData.append('type_of_job', values.jobType);
    formData.append('available_to_start', values.availability);
    formData.append('industry_type', values.industryType);
    formData.append('current_country', values.country);
    formData.append('current_state', values.state);
    formData.append('current_city', values.city);
    formData.append('relocate', values.relocate);

    dispatch(updateJobPreferenceMiddleWare({ formData })).then((res) => {
      if (res.payload.success) {
        dispatch(
          candidateMatchMiddleWare({
            can_id: res.payload?.can_id[0]?.id.toString(),
          }),
        );
        setReload(false);
        Toast('Job Preference updated successfully');
        dispatch(profileEditMiddleWare({jd_id:localStorage.getItem('careerJobViewJobId')}));
        setBtnLoader(false);
        cancel();
      } else {
        setBtnLoader(false);
        Toast('Job Preference not updated, Please try again', 'LONG', 'error');
      }
    });
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validationSchema: myJobSchema,
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

  // free fill initial value
  useEffect(() => {
    if (personal) {
      if (!isEmpty(personal.type_of_job_id)) {
        formik.setFieldValue('jobType', personal.type_of_job_id.toString());
      } else {
        formik.setFieldValue('jobType', '');
      }
      if (!isEmpty(personal.available_to_start_id)) {
        formik.setFieldValue(
          'availability',
          personal.available_to_start_id.toString(),
        );
      } else {
        formik.setFieldValue('availability', '');
      }
      if (!isEmpty(personal.current_country_id)) {
        formik.setFieldValue('country', personal.current_country_id.toString());
      }
      if (!isEmpty(personal.current_state_id)) {
        formik.setFieldValue('state', personal.current_state_id.toString());
      }
      if (!isEmpty(personal.current_city_id)) {
        formik.setFieldValue('city', personal.current_city_id.toString());
      }
      if (!isEmpty(personal.exp_gross)) {
        formik.setFieldValue('expectedSalary', personal.exp_gross.toString());
      } else {
        formik.setFieldValue('expectedSalary', '');
      }
      if (!isEmpty(personal.curr_gross)) {
        formik.setFieldValue('currentSalary', personal.curr_gross.toString());
      } else {
        formik.setFieldValue('currentSalary', '');
      }
      if (!isEmpty(personal.industry_type_id)) {
        formik.setFieldValue(
          'industryType',
          personal.industry_type_id.toString(),
        );
      }
      if (!isEmpty(personal.relocate)) {
        formik.setFieldValue('relocate', personal.relocate ? '1' : '0');
      } else {
        formik.setFieldValue('relocate', '0');
      }
      if (!isEmpty(personal.current_currency)) {
        formik.setFieldValue('currency', personal.current_currency);
      }
    }
  }, [personal, open]);

  const salaryLabel =
    Number(formik.values.jobType) === 3 ? 'Per Hour' : 'Per Annum';

  // close popup condition
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
  const { onDirty, onPristine, routerPrompt } = useUnsavedChangesWarning();

  useEffect(() => {
    if (isReload) {
      onDirty();
    } else if (!isReload) {
      onPristine();
    }
  }, [isReload]);

  const industryTypeSort =
    industryType && industryType.sort((a, b) => a.value.localeCompare(b.value));

  return (
    <Modal open={open}>
      {routerPrompt}
      {isLoader && <Loader />}
      <Flex className={styles.overAll}>
        {/* <div
          className={styles.svgClose}
          onClick={onCloseModal}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <SvgCloseSmall />
        </div> */}
        <Flex
          style={{ borderBottom: '0.5px solid #581845', marginBottom: '15px' }}
        >
          <Text className={styles.title} bold size={14}>
            Update My Job Preference
          </Text>
        </Flex>
        <Flex row top>
          <Flex flex={4} width={inputWidth}>
            <SelectTag
              id="myjob_preference_edit___job_type"
              options={jobTypeData}
              label="Job Type"
              value={
                jobTypeData
                  ? jobTypeData.find(
                      (option) =>
                        Number(option.value) === Number(formik.values.jobType),
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
          <Flex flex={4} width={inputWidth}>
            <SelectTag
              id="myjob_preference_edit___industry_type"
              options={industryTypeSort}
              label="Industry Type"
              value={
                industryTypeSort
                  ? industryTypeSort.find(
                      (option) => option.value === formik.values.industryType,
                    )
                  : ''
              }
              onChange={(option) => {
                setReload(true);
                formik.setFieldValue('industryType', option.value);
              }}
            />
          </Flex>
        </Flex>
        <Flex row top className={styles.salaryFlex}>
          <Flex flex={4} width={inputWidth}>
            <InputText
              label={`Current Gross Salary (${salaryLabel})`}
              value={formik.values.currentSalary}
              onChange={(e) => {
                if (e.target.value === '' || onlyNumber.test(e.target.value)) {
                  setReload(true);
                  formik.setFieldValue(`currentSalary`, e.target.value);
                }
              }}
              maxLength={10}
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
          <Flex flex={4} width={inputWidth}>
            <InputText
              label={`Expected Gross Salary (${salaryLabel})`}
              required
              value={formik.values.expectedSalary}
              onChange={(e) => {
                if (e.target.value === '' || onlyNumber.test(e.target.value)) {
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
        </Flex>
        <Text className={styles.title} bold size={14}>
          Preferred Work Location
        </Text>
        <Flex row top className={styles.stateFlex}>
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
              onChange={(option) => {
                setReload(true);
                formik.setFieldValue('country', option.id.toString());
                formik.setFieldValue('state', '');
                formik.setFieldValue('city', '');
              }}
            />
            <ErrorMessage
              name="country"
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
              onChange={(option) => {
                setReload(true);
                formik.setFieldValue('state', option.id);
                formik.setFieldValue('city', '');
              }}
              value={
                !isEmpty(formik.values.state)
                  ? getState
                    ? getState.find(
                        (option) =>
                          Number(option.id) === Number(formik.values.state),
                      )
                    : ''
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
              onChange={(option) => {
                setReload(true);
                formik.setFieldValue('city', option.id);
              }}
              value={
                !isEmpty(formik.values.city)
                  ? getCity
                    ? getCity.find(
                        (option) =>
                          Number(option.id) === Number(formik.values.city),
                      )
                    : ''
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
        <Flex row center between>
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
          {/* <Button onClick={formik.handleSubmit}>Update</Button> */}
          <Flex end row  >
          <Flex marginRight={15}><Button  types="close" onClick={cancel}>Cancel</Button></Flex>
          <Flex> {isBtnLoader ? (
            <Flex className={styles.updateBtnLoader}>
              <Loader size="small" withOutOverlay />
            </Flex>
          ) : (
            <Button onClick={formik.handleSubmit}>Update</Button>  
          )}</Flex> 
        </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default MyJobPreferenceEdit;
