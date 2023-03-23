import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import Modal from '../../uikit/Modal/Modal';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import { THIS_FIELD_REQUIRED } from '../constValue';
import { qualificationData } from '../createjdmodule/mock';
import styles from './addandupdatequalificationedit.module.css';
import { Obj } from './candidateProfileTypes';
import { educationUpdateApiMiddleWare } from './store/middleware/candidateprofilemiddleware';

type Props = {
  open: boolean;
  cancel: () => void;
  isUpdate?: boolean;
  isUpdateId: string;
  obj?: Obj;
};

const inputWidth = 320;
const marginLeft = 16;
const marginRight = 16;

type qualificationFormikForm = {
  qualification: string;
  specilization: string;
  university: string;
  location: string;
  year: string;
  percentage: string;
};

const initial: qualificationFormikForm = {
  qualification: '',
  specilization: '',
  university: '',
  location: '',
  year: '',
  percentage: '',
};

const AddandUpdateQualificationEdit = ({
  cancel,
  open,
  isUpdate,
  isUpdateId,
  obj,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const qualificationSchema = Yup.object().shape({
    qualification: Yup.string().required(THIS_FIELD_REQUIRED),
    university: Yup.string().required(THIS_FIELD_REQUIRED),
    year: Yup.string().required(THIS_FIELD_REQUIRED),
  });

  const handleSubmit = (values: qualificationFormikForm) => {
    dispatch(
      educationUpdateApiMiddleWare({
        eduId: isUpdateId,
        qual_title: values.qualification,
        qual_spec: values.specilization,
        year_completed: values.year,
        percentage: values.percentage,
        institute_name: values.university,
        institute_location: values.location,
      }),
    ).then(() => {
      Toast('Qualifications updated successfully');
    });
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validationSchema: qualificationSchema,
  });

  useEffect(() => {
    if (
      isUpdate &&
      isUpdateId !== '0' &&
      Array.isArray(obj?.edu) &&
      obj?.edu.length !== 0
    ) {
      const filterEducation: any = obj?.edu.filter(
        (value) => value.edu_id === Number(isUpdateId),
      );
      if (!isEmpty(filterEducation[0].qual_title)) {
        formik.setFieldValue('qualification', filterEducation[0].qual_title);
      }
      if (!isEmpty(filterEducation[0].title_spec)) {
        formik.setFieldValue('specilization', filterEducation[0].title_spec);
      }
      if (!isEmpty(filterEducation[0].inst_name)) {
        formik.setFieldValue('university', filterEducation[0].inst_name);
      }
      if (!isEmpty(filterEducation[0].inst_loc)) {
        formik.setFieldValue('location', filterEducation[0].inst_loc);
      }
      if (!isEmpty(filterEducation[0].year)) {
        formik.setFieldValue('year', filterEducation[0].year);
      }
      if (!isEmpty(filterEducation[0].percentage)) {
        formik.setFieldValue('percentage', filterEducation[0].percentage);
      }
    }
  }, [obj, open]);

  return (
    <Modal open={open}>
      <Flex columnFlex className={styles.overAll}>
        <div
          className={styles.svgClose}
          onClick={() => {
            cancel();
            formik.resetForm();
          }}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <SvgCloseSmall />
        </div>
        <Text size={20} bold align="center" className={styles.title}>
          {isUpdate ? 'Update Qualification' : 'Add Qualification'}
        </Text>
        <Flex row top>
          <Flex flex={4} width={inputWidth}>
            <SelectTag
              label="Qualification"
              required
              options={qualificationData}
              value={
                qualificationData
                  ? qualificationData.find(
                      (option) => option.value === formik.values.qualification,
                    )
                  : ''
              }
              onChange={(option) =>
                formik.setFieldValue('qualification', option.value)
              }
            />
            <ErrorMessage
              name="qualification"
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
              label="Specilization"
              value={formik.values.specilization}
              onChange={formik.handleChange('specilization')}
            />
          </Flex>
          <Flex flex={4} width={inputWidth}>
            <InputText
              label="College Name/University"
              required
              value={formik.values.university}
              onChange={formik.handleChange('university')}
            />
            <ErrorMessage
              name="university"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
        <Flex row top className={styles.locationFlex}>
          <Flex flex={4} width={inputWidth}>
            <InputText
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange('location')}
            />
          </Flex>
          <Flex
            flex={4}
            width={inputWidth}
            marginLeft={marginLeft}
            marginRight={marginRight}
          >
            <InputText
              label="Year of Completion"
              required
              value={formik.values.year}
              onChange={formik.handleChange('year')}
            />
            <ErrorMessage
              name="year"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={4} width={inputWidth}>
            <InputText
              label="Percentage/CGPA"
              value={formik.values.percentage}
              onChange={formik.handleChange('percentage')}
            />
          </Flex>
        </Flex>
        <Flex end onClick={formik.handleSubmit}>
          <Button>{isUpdate ? 'Update' : 'Add'}</Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AddandUpdateQualificationEdit;
