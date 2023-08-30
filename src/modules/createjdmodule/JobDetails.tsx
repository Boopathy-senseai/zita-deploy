import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { getFocus, isEmpty } from '../../uikit/helper';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import { routesPath } from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import InputSwitch from '../../uikit/Switch/InputSwitch';
import {
  CANCEL,
  ENTER_GREATER_0,
  ENTER_GREATER_10,
  ENTER_GREATER_1000,
  ENTER_LESS_1000,
  ENTER_LESS_9000000,
  GREATER_THAN_MIN,
  LESS_THAN_MAX,
  MIN_MAX_EXP,
  THIS_FIELD_REQUIRED,
} from '../constValue';
import styles from './jobdetails.module.css';
import type { dsFormProps } from './formikTypes';
import { currencyData, jobTypeData } from './mock';
import QulificationAdd from './QulificationAdd';
import {
  CityEntity,
  CountryEntity,
  JdOutput,
  LocationUpdate,
  QualificationEntity,
  StatesEntity,
} from './createJdTypes';
import {
  locationCityMiddleWare,
  locationStateMiddleWare,
} from './store/middleware/createjdmiddleware';

type Props = {
  values: dsFormProps;
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  getCountry: CountryEntity[];
  jd_output: JdOutput;
  updateLocation: LocationUpdate;
  updateQualification: QualificationEntity[];
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  setVacancies: (arg: boolean) => void;
  setDrftLoader: (arg: boolean) => void;
  errors: any;
  setDraftSave?: any;
  touched: any;
  onPristine: () => void;
  onDirty: () => void;
};

const JobDetails = ({
  values,
  setFieldValue,
  handleChange,
  getCountry,
  jd_output,
  updateLocation,
  updateQualification,
  handleSubmit,
  setVacancies,
  setDrftLoader,
  errors,
  touched,
  setDraftSave,
  onPristine,
  onDirty,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [getState, setState] = useState<StatesEntity[]>([]);
  const [getCity, setCity] = useState<CityEntity[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSelectCurrOpen, setIsSelectCurrOpen] = useState(false);
  useEffect(() => {
    if (!isEmpty(values.country)) {
      dispatch(locationStateMiddleWare({ country: values.country })).then(
        (res) => {
          if (res.payload.states && res.payload.states.length !== 0) {
            setState(res.payload.states);
          }
        },
      );
    }
  }, [values.country]);

  useEffect(() => {
    if (!isEmpty(values.state)) {
      dispatch(locationCityMiddleWare({ state: values.state })).then((res) => {
        if (res.payload.city && res.payload.city.length !== 0) {
          setCity(res.payload.city);
        }
      });
    }
  }, [values.state]);

  const perAnnum = values.jobType === '3' ? 'Per Hour' : 'Per Annum';


  // free fill initial form
  useEffect(() => {
    if (jd_output.job_type_id !== 0) {
      setFieldValue('jobType', jd_output.job_type_id.toString());
    }
    if (!isEmpty(jd_output.min_exp)) {
      setFieldValue('minimumExperience', jd_output.min_exp);
    }
    if (!isEmpty(jd_output.max_exp) && Number(jd_output.max_exp) !== 0) {
      setFieldValue('maximumExperience', jd_output.max_exp);
    }
    if (
      !isEmpty(jd_output.no_of_vacancies) &&
      jd_output.no_of_vacancies !== 0
    ) {
      setFieldValue('vacancies', jd_output.no_of_vacancies);
    }
    if (jd_output.work_remote !== false) {
      setFieldValue('remoteWork', jd_output.work_remote === true ? '1' : '0');
    }
    if (!isEmpty(jd_output.salary_min) && jd_output.salary_min !== 0) {
      setFieldValue('minimumSalary', jd_output.salary_min);
    }
    if (!isEmpty(jd_output.salary_max) && jd_output.salary_max !== 0) {
      setFieldValue('maximumSalary', jd_output.salary_max);
    }
    if (
      !isEmpty(jd_output.salary_curr_type_id) &&
      jd_output.salary_curr_type_id !== 0
    ) {
      setFieldValue('currency', jd_output.salary_curr_type_id.toString());
    } else {
      setFieldValue('currency', '240');
    }
    setFieldValue(
      'showSalaryCandidates',
      jd_output.show_sal_to_candidate === true ? '1' : '0',
    );
    if (jd_output.industry_type_id !== 1) {
      setFieldValue('industryType', jd_output.industry_type_id.toString());
    }
    if (updateLocation.country_id !== 0) {
      setFieldValue('country', updateLocation.country_id);
    }
    if (updateLocation.state_id !== 0) {
      setFieldValue('state', updateLocation.state_id);
    }
    if (updateLocation.city_id !== 0) {
      setFieldValue('city', updateLocation.city_id);
    }
  }, [jd_output]);

  // error focus input function
  const hanldeErrorFocus = () => {
    if (!isEmpty(errors.jobTitle)) {
      getFocus('jobtitle__jobtitle');
    } else if (!isEmpty(errors.jobRole)) {
      getFocus('jobtitle__jobrole');
    } else if (!isEmpty(errors.jobId)) {
      getFocus('jobtitle__jobId');
    } else if (!isEmpty(errors.jobDescription) || !isEmpty(values.jobDescription) && values.jobDescription.length < 201) {
      getFocus('jobtitledescription___richtext');
    } else if (!isEmpty(errors.nonDsSkill)) {
      getFocus('nondsSkill__nonSkill');
    } else if (!isEmpty(errors.skillValid)) {
      getFocus('skillscontainer__skillValid');
    } else if (!isEmpty(errors.jobType)) {
      getFocus('jobdetails___jobtype');
    } else if (!isEmpty(errors.minimumExperience)) {
      getFocus('jobdetails___minimumExperience');
    } else if (!isEmpty(errors.maximumExperience)) {
      getFocus('jobdetails___maximumExperience');
    } else if (!isEmpty(errors.vacancies)) {
      getFocus('jobdetails___vacancies');
    } else if (!isEmpty(errors.country)) {
      getFocus('jobdetails___country');
    } else if (!isEmpty(errors.state)) {
      getFocus('jobdetails___state');
    } else if (!isEmpty(errors.city)) {
      getFocus('jobdetails___city');
    } else if (!isEmpty(errors.minimumSalary)) {
      getFocus('jobdetails___minimumSalary');
    } else if (!isEmpty(errors.maximumSalary)) {
      getFocus('jobdetails___maximumSalary');
    }
  };

  return (
    <Flex className={styles.overAll} style={{ paddingBottom: isSelectOpen ? '20px' : '0'&& isSelectCurrOpen ? "90px" : "0"}}>
      <Flex >
      <Text size={14}className={styles.jobTitle} bold>
        Job Details
      </Text>
      <Flex flex={1} row top className={styles.containerOne}>
        <Flex flex={3} className={styles.margin16}>
          <SelectTag
            inputId="jobdetails___jobtype"
            options={jobTypeData}
            label="Job Type"
            required
            value={
              jobTypeData
                ? jobTypeData.find((option) => option.value === values.jobType)
                : ''
            }
            onChange={(option) => {
              setFieldValue('jobType', option.value);
              onDirty();
            }}
          />
          <ErrorMessage name={'jobType'} errors={errors} touched={touched} />
        </Flex>
        <Flex flex={3} className={styles.margin16}>
          <InputText
            id="jobdetails___minimumExperience"
            name="minimumExperience"
            label="Minimum Experience"
            required
            value={values.minimumExperience}
            onChange={(event) => {
              handleChange('minimumExperience')(
                event.target.value.replace(/\D/g, ''),
              );
              onDirty();
            }}
          />

          {isEmpty(values.minimumExperience) && 
          <ErrorMessage
            name={'minimumExperience'}
            errors={errors}
            touched={touched}
          />}
          {Number(values.minimumExperience) < 0 && (
            <Text size={12} color="error">
              {ENTER_GREATER_0}
            </Text>
          )}
        </Flex>
        <Flex flex={3} className={styles.margin16}>
          <InputText
            id="jobdetails___maximumExperience"
            name="maximumExperience"
            label="Maximum Experience"
            value={values.maximumExperience}
            onChange={(event) => {
              handleChange('maximumExperience')(
                event.target.value.replace(/\D/g, ''),
              );
              onDirty();
            }}
          />
          <ErrorMessage
            name={'maximumExperience'}
            errors={errors}
            touched={touched}
          />
          {!isEmpty(values.maximumExperience) &&
            Number(values.maximumExperience) <=
              Number(values.minimumExperience) && (
              <Text size={12} color="error">
                {MIN_MAX_EXP}
              </Text>
            )}
        </Flex>
        <Flex flex={3} className={styles.postion}>
          <InputText
            id="jobdetails___vacancies"
            name="vacancies"
            label="No. of Vacancies"
            required
            value={values.vacancies}
            onChange={(event) => {
              handleChange('vacancies')(event.target.value.replace(/\D/g, ''));
              onDirty();
            }}
          />
          <ErrorMessage name={'vacancies'} errors={errors} touched={touched} />
        </Flex>
      </Flex>
      <Flex row top className={styles.containerOne}>
        <Flex flex={3} className={styles.margin16}>
          <SelectTag
            isSearchable
            inputId="jobdetails___country"
            options={getCountry}
            label="Country"
            required
            value={
              getCountry
                ? getCountry.find(
                    (option) => option.id === Number(values.country),
                  )
                : ''
            }
            onChange={(option) => {
              setFieldValue('country', option.id);
              setFieldValue('city', '');
              setFieldValue('state', '');
              onDirty();
            }}
            onMenuOpen={() => setIsSelectOpen(true)}
            onMenuClose={() => setIsSelectOpen(false)}
            getOptionValue={(option: { id: number }) => `${option.id}`}
            getOptionLabel={(option: { name: string }) => option.name}
          />

          <ErrorMessage name={'country'} errors={errors} touched={touched} />
        </Flex>
        <Flex flex={3} className={styles.margin16}>
          <SelectTag
            inputId="jobdetails___state"
            isSearchable
            options={getState}
            label="State"
            required
            getOptionValue={(option: { id: number }) => `${option.id}`}
            getOptionLabel={(option: { name: string }) => option.name}
            value={
              !isEmpty(values.state)
                ? getState
                  ? getState.find(
                      (option) => option.id === Number(values.state),
                    )
                  : ''
                : ''
            }
            onChange={(option) => {
              setFieldValue('state', option.id);
              setFieldValue('city', '');
              onDirty();
            }}
            onMenuOpen={() => setIsSelectOpen(true)}
            onMenuClose={() => setIsSelectOpen(false)}
          />
          <ErrorMessage name={'state'} errors={errors} touched={touched} />
        </Flex>
        <Flex flex={3} className={styles.margin16}>
          <SelectTag
            inputId="jobdetails___city"
            isSearchable
            options={getCity}
            label="City"
            required
            getOptionValue={(option: { id: number }) => `${option.id}`}
            getOptionLabel={(option: { name: string }) => option.name}
            value={
              !isEmpty(values.city)
                ? getCity
                  ? getCity.find((option) => option.id === Number(values.city))
                  : ''
                : ''
            }
            onChange={(option) => {
              setFieldValue('city', option.id);
              onDirty();
            }}
            onMenuOpen={() => setIsSelectOpen(true)}
            onMenuClose={() => setIsSelectOpen(false)}
          />
          <ErrorMessage name={'city'} errors={errors} touched={touched} />
        </Flex>
        <Flex row flex={3} className={styles.showStyle}>
          <InputSwitch
            label="Remote Work Allowed"
            checked={values.remoteWork === '1'}
            onClick={() =>
              values.remoteWork === '0'
                ? setFieldValue('remoteWork', '1')
                : setFieldValue('remoteWork', '0')
            }
          />
          {/* <Text size={14} color="theme">Remote Work Allowed</Text> */}
        </Flex>
      </Flex>
      <Flex row top className={styles.containerOne}>
        <Flex flex={3} className={styles.margin16}>
          <InputText
            id="jobdetails___minimumSalary"
            label={`Minimum Salary (${perAnnum})`}
            onChange={(event) => {
              handleChange('minimumSalary')(
                event.target.value.replace(/\D/g, ''),
              );
              onDirty();
            }}
            value={values.minimumSalary}
          />
          {Number(values.jobType) === 3 &&
            !isEmpty(values.minimumSalary) &&
            Number(values.minimumSalary) < 10 && (
              <Text size={12} color="error">
                {ENTER_GREATER_10}
              </Text>
            )}
          {Number(values.jobType) !== 3 &&
            !isEmpty(values.minimumSalary) &&
            Number(values.minimumSalary) < 1000 && (
              <Text size={12} color="error">
                {ENTER_GREATER_1000}
              </Text>
            )}
          {!isEmpty(values.minimumSalary) &&
            !isEmpty(values.maximumSalary) &&
            Number(values.minimumSalary) >= Number(values.maximumSalary) && (
              <Text size={12} color="error">
                {LESS_THAN_MAX}
              </Text>
            )}
          {isEmpty(values.minimumSalary) && !isEmpty(values.maximumSalary) && (
            <Text size={12} color="error">
              {THIS_FIELD_REQUIRED}
            </Text>
          )}
        </Flex>
        <Flex flex={3} className={styles.margin16}>
          <InputText
            id="jobdetails___maximumSalary"
            name="maximumSalary"
            label={`Maximum Salary (${perAnnum})`}
            onChange={(event) => {
              handleChange('maximumSalary')(
                event.target.value.replace(/\D/g, ''),
              );
              onDirty();
            }}
            value={values.maximumSalary}
          />

              {Number(values.jobType) === 3 &&
                !isEmpty(values.maximumSalary) &&
                Number(values.maximumSalary) > 1000 && (
                  <Text size={12} color="error">
                    {ENTER_LESS_1000}
                  </Text>
                )}

              {Number(values.jobType) !== 3 &&
                !isEmpty(values.maximumSalary) &&
                Number(values.maximumSalary) > 9000000 && (
                  <Text size={12} color="error">
                    {ENTER_LESS_9000000}
                  </Text>
                )}
              {!isEmpty(values.minimumSalary) &&
                !isEmpty(values.maximumSalary) &&
                Number(values.minimumSalary) >=
                  Number(values.maximumSalary) && (
                  <Text size={12} color="error">
                    {GREATER_THAN_MIN}
                  </Text>
                )}
              {!isEmpty(values.minimumSalary) && isEmpty(values.maximumSalary) && (
                <Text size={12} color="error">
                  {THIS_FIELD_REQUIRED}
                </Text>
              )}
            </Flex>
            <Flex flex={3} className={styles.margin16}>
              <SelectTag
                options={currencyData}
                label="Currency"
                required
                isSearchable
                value={
                  currencyData
                    ? currencyData.find(
                        (option) =>
                          Number(option.value) === Number(values.currency),
                      )
                    : ''
                }
                onChange={(option) => {
                  setFieldValue('currency', option.value);
                  onDirty();
                }}
                onMenuOpen={() => setIsSelectCurrOpen(true)}
                onMenuClose={() => setIsSelectCurrOpen(false)}
              />
              {isEmpty(values.currency) && (
                <ErrorMessage
                  name={'currency'}
                  errors={errors}
                  touched={touched}
                />
              )}
            </Flex>
            <Flex row flex={3} className={styles.showStyle}>
              <InputSwitch
                disabled={isEmpty(values.minimumSalary)}
                label="Show Salary to Candidates"
                checked={values.showSalaryCandidates === '1'}
                onClick={() =>
                  values.showSalaryCandidates === '0'
                    ? setFieldValue('showSalaryCandidates', '1')
                    : setFieldValue('showSalaryCandidates', '0')
                }
              />
              {/* <Text size={14} color="theme">Show Salary to Candidates</Text> */}
            </Flex>
          </Flex>
          <QulificationAdd
            values={values}
            setFieldValue={setFieldValue}
            updateQualification={updateQualification}
            isSelectOpen={isSelectOpen}
            setIsSelectOpen={setIsSelectOpen}
          />
        </Flex>
      <Flex>
        <Flex row center end className={styles.btnContainer}>
          <LinkWrapper
            onClick={() => onPristine()}
            to={routesPath.MY_JOB_POSTING}
          >
            <Button className={styles.cancelbtn} types="close">
              {CANCEL}
            </Button>
          </LinkWrapper>

          <Button
            onClick={() => {
              setDraftSave(true);
              setDrftLoader(false);
              onPristine();
              setVacancies(false);
              hanldeErrorFocus();
              setTimeout(() => {
                handleSubmit();
              }, 200);
            }}
            types="secondary"
            className={styles.draftBtn}
          >
            Save as draft
          </Button>
          <Button
            onClick={() => {
              onPristine();
              setDraftSave(false);
              setVacancies(true);
              hanldeErrorFocus();
              setTimeout(() => {
                handleSubmit();
              }, 200);
              setDrftLoader(true);
            }}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default JobDetails;
