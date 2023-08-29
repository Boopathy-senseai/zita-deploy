import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import Loader from '../../uikit/Loader/Loader';
import { getDateString, isEmpty } from '../../uikit/helper';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import Button from '../../uikit/Button/Button';
import Toast from '../../uikit/Toast/Toast';
import Flex from '../../uikit/Flex/Flex';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../uikit/InputText/InputText';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import { THIS_FIELD_REQUIRED } from '../constValue';
import { candidateMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import styles from './addandupdateworkexperienceedit.module.css';
import { ExperiencesEntity, Obj } from './candidateProfileTypes';
import {
  experiencesAddMiddleWare,
  experienceUpdateMiddleWare,
  profileEditMiddleWare,
} from './store/middleware/candidateprofilemiddleware';

const inputWidth = 320;
const marginLeft = 16;
const marginRight = 16;

type workFormikProps = {
  organisation: string;
  jobTitle: string;
  location: string;
  techSkill: string;
  from: any;
  to: any;
  jobDescription: string;
  tillDate: string;
};

const initial: workFormikProps = {
  organisation: '',
  jobTitle: '',
  location: '',
  techSkill: '',
  from: '',
  to: '',
  jobDescription: '',
  tillDate: '0',
};

type Props = {
  open: boolean;
  cancel: () => void;
  isUpdate?: boolean;
  obj?: Obj;
  isUpdateId?: string;
  experiences?: ExperiencesEntity[];
};

const qualificationSchema = Yup.object().shape({
  organisation: Yup.string().required(THIS_FIELD_REQUIRED),
  jobTitle: Yup.string().required(THIS_FIELD_REQUIRED),
  techSkill: Yup.string().required(THIS_FIELD_REQUIRED),
  from: Yup.string().required(THIS_FIELD_REQUIRED),
  to: Yup.string().required(THIS_FIELD_REQUIRED),
  jobDescription: Yup.string().required(THIS_FIELD_REQUIRED),
});

const AddandUpdateWorkExperienceEdit = ({
  open,
  cancel,
  obj,
  isUpdate,
  isUpdateId,
  experiences,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const [isReload, setReload] = useState(false);
  const { onDirty, onPristine, routerPrompt } = useUnsavedChangesWarning();

  // form submit condition
  const handleSubmit = (values: workFormikProps) => {
    setLoader(true);
    if (isUpdate) {
      dispatch(
        experienceUpdateMiddleWare({
          from_exp: getDateString(values.from, 'YYYY-MM-DD'),
          to_exp: getDateString(values.to, 'YYYY-MM-DD'),
          organisations: values.organisation,
          designation: values.jobTitle,
          work_location: values.location,
          work_tools: values.techSkill,
          work_role: values.jobDescription,
          id: isUpdateId,
          till_date: values.tillDate,
        }),
      ).then((res) => {
        if (res.payload.success === true) {
             dispatch(
          candidateMatchMiddleWare({ 
             can_id:res.payload?.can_id[0]?.id.toString(),
          }),
        )
          dispatch(profileEditMiddleWare({jd_id:localStorage.getItem('careerJobViewJobId')}));
          setReload(false);
          formik.resetForm();
          Toast('Experience updated successfully');
          cancel();
        } else {
          Toast('Experience not updated, Please try again.');
        }
        setLoader(false);
      });
    } else {
      dispatch(
        experiencesAddMiddleWare({
          from_exp: getDateString(values.from, 'YYYY-MM-DD'),
          to_exp: getDateString(values.to, 'YYYY-MM-DD'),
          organisations: values.organisation,
          designation: values.jobTitle,
          work_location: values.location,
          work_tools: values.techSkill,
          work_role: values.jobDescription,
          till_date: values.tillDate,
        }),
      ).then((res) => {
        if (res.payload.success === true) {
           // dispatch(
        //   candidateMatchMiddleWare({ 
        //      can_id:id.toString(),
        //   }),
        // )
          setReload(false);
          dispatch(profileEditMiddleWare({jd_id:localStorage.getItem('careerJobViewJobId')}));
          Toast('Experience added successfully');
          cancel();
          formik.resetForm();
        } else {
          Toast('Experience not added, Please try again.');
        }
        setLoader(false);
      });
    }
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validationSchema: qualificationSchema,
  });

  // free fill initial value condtion
  useEffect(() => {
    if (
      isUpdate &&
      isUpdateId !== '0' &&
      Array.isArray(obj?.exp) &&
      obj?.exp.length !== 0
    ) {
      const filterExp: any =
        obj && obj?.exp.filter((value) => value.exp_id === Number(isUpdateId));

      const filterExpOne: any =
        experiences &&
        experiences.filter((value) => value.exp_id === Number(isUpdateId));

      if (filterExp && !isEmpty(filterExp[0].org)) {
        formik.setFieldValue('organisation', filterExp[0].org);
      } else {
        formik.setFieldValue('organisation', '');
      }
      if (filterExp && !isEmpty(filterExp[0].des)) {
        formik.setFieldValue('jobTitle', filterExp[0].des);
      } else {
        formik.setFieldValue('jobTitle', '');
      }
      if (filterExp && !isEmpty(filterExp[0].loc)) {
        formik.setFieldValue('location', filterExp[0].loc);
      } else {
        formik.setFieldValue('location', '');
      }
      if (filterExp && !isEmpty(filterExp[0].from_exp)) {
        formik.setFieldValue('from', new Date(filterExp[0].from_exp));
      } else {
        formik.setFieldValue('from', '');
      }
      if (
        filterExp &&
        !isEmpty(filterExp[0].is_present) &&
        filterExp[0].is_present === 1
      ) {
        formik.setFieldValue('to', new Date());
      } else if (
        filterExp &&
        !isEmpty(filterExp[0].is_present) &&
        filterExp[0].is_present === 0 &&
        !isEmpty(filterExp[0].to_exp)
      ) {
        formik.setFieldValue('to', new Date(filterExp[0].to_exp));
      } else {
        formik.setFieldValue('to', '');
      }
      if (filterExp && !isEmpty(filterExpOne[0].work_role)) {
        formik.setFieldValue('jobDescription', filterExpOne[0].work_role);
      } else {
        formik.setFieldValue('jobDescription', '');
      }
      if (filterExp && !isEmpty(filterExp[0].is_present)) {
        formik.setFieldValue('tillDate', filterExp[0].is_present.toString());
      } else {
        formik.setFieldValue('tillDate', '');
      }
      if (filterExp && !isEmpty(filterExp[0].exp_tools)) {
        formik.setFieldValue('techSkill', filterExp[0].exp_tools);
      } else {
        formik.setFieldValue('techSkill', '');
      }
    }
  }, [obj, open]);

  // close popup condition
  const onCloseModal = () => {
    if (
      isReload &&
      window.confirm(
        'Do you want to leave this site? Changes you made may not be saved.',
      )
    ) {
      formik.resetForm();
      cancel();
      setReload(false);
    }
    if (!isReload) {
      formik.resetForm();
      cancel();
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
    <Modal open={open}>
      {routerPrompt}
      {isLoader && <Loader />}
      <Flex columnFlex className={styles.overAll}>
        <div
          className={styles.svgClose}
          onClick={onCloseModal}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <SvgCloseSmall />
        </div>
        <Text size={14} bold align="center" className={styles.title}>
          {isUpdate ? 'Update' : 'Add'} Work Experience
        </Text>
        <Flex row top>
          <Flex flex={6} width={inputWidth} marginRight={marginRight}>
            <InputText
              label="Organisation"
              required
              value={formik.values.organisation}
              onChange={(e) => {
                setReload(true);
                formik.setFieldValue('organisation', e.target.value);
              }}
            />
            <ErrorMessage
              name="organisation"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={6} width={inputWidth}>
            <InputText
              label="Job Title"
              required
              value={formik.values.jobTitle}
              onChange={(e) => {
                setReload(true);
                formik.setFieldValue('jobTitle', e.target.value);
              }}
            />
            <ErrorMessage
              name="jobTitle"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
        <Flex row top className={styles.locationFlex}>
          <Flex flex={6} width={inputWidth} marginRight={marginRight}>
            <InputText
              label="Location"
              value={formik.values.location}
              onChange={(e) => {
                setReload(true);
                formik.setFieldValue('location', e.target.value);
              }}
            />
            <ErrorMessage
              name="location"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={6} width={inputWidth}>
            <InputText
              label="Technical Skills"
              required
              value={formik.values.techSkill}
              onChange={(e) => {
                setReload(true);
                formik.setFieldValue('techSkill', e.target.value);
              }}
            />
            <ErrorMessage
              name="techSkill"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
        <Flex row>
          <Flex flex={6} row top className={styles.zindexStyleDate}>
            <Flex flex={4}>
              <LabelWrapper label="From" required>
                <DatePicker
                  selected={formik.values.from}
                  onChange={(date) => {
                    setReload(true);
                    formik.setFieldValue('from', date);
                  }}
                  className={styles.datePicker}
                />
              </LabelWrapper>
              <ErrorMessage
                name="from"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
            <Flex
              flex={4}
              marginLeft={marginLeft}
              marginRight={marginRight}
              className={styles.toFlex}
            >
              <LabelWrapper label="To" required>
                <DatePicker
                  selected={formik.values.to}
                  onChange={(date) => {
                    setReload(true);
                    formik.setFieldValue('to', date);
                  }}
                  className={styles.datePicker}
                  disabled={formik.values.tillDate === '1'}
                />
              </LabelWrapper>
              <div className={styles.tillDateCheckBox}>
                <InputCheckBox
                  label="Till Date"
                  checked={formik.values.tillDate === '1'}
                  onChange={() =>
                    formik.values.tillDate === '1'
                      ? formik.setFieldValue('tillDate', '0')
                      : (formik.setFieldValue('tillDate', '1'),
                        formik.setFieldValue('to', new Date()))
                  }
                  onClick={() => setReload(true)}
                />
              </div>

              <ErrorMessage
                name="to"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
          </Flex>
          <Flex flex={6}>
            <></>
          </Flex>
        </Flex>
        <Flex className={styles.locationFlex}>
          <InputText
            textarea
            value={formik.values.jobDescription}
            label={'Roles & Responsibilities'}
            required
            className={styles.jobDesStyle}
            onChange={(e) => {
              setReload(true);
              formik.setFieldValue('jobDescription', e.target.value);
            }}
          />
          <ErrorMessage
            name="jobDescription"
            touched={formik.touched}
            errors={formik.errors}
          />
        </Flex>

        <Flex end>
          <Button onClick={formik.handleSubmit}>
            {isUpdate ? 'Update' : 'Add'}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AddandUpdateWorkExperienceEdit;
