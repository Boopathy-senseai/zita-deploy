import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
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
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { numberAndSpaceCheck, THIS_FIELD_REQUIRED } from '../constValue';
import { candidateMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { Obj } from './candidateProfileTypes';
import styles from './certificationsaddandupdateedit.module.css';
import {
  courseAddMiddleWare,
  courseUpdateMiddleWare,
  profileEditMiddleWare,
} from './store/middleware/candidateprofilemiddleware';

const inputWidth = 320;
const marginLeft = 16;
const marginRight = 16;

type certificateFormikProps = {
  courseName: string;
  courseYear: string;
  courseBody: string;
};
const initial: certificateFormikProps = {
  courseName: '',
  courseYear: '',
  courseBody: '',
};
type Props = {
  isUpdate?: boolean;
  isUpdateId?: string;
  cancel: () => void;
  obj?: Obj;
  open: boolean;
};

const certificationSchema = Yup.object().shape({
  courseName: Yup.string().required(THIS_FIELD_REQUIRED),
  courseYear: Yup.string().required(THIS_FIELD_REQUIRED),
  courseBody: Yup.string().required(THIS_FIELD_REQUIRED),
});

const CertificationsAddandUpdateEdit = ({
  isUpdate,
  isUpdateId,
  cancel,
  obj,
  open,
}: Props) => {
  const [isReload, setReload] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  // form submit function
  const handleSubmit = (values: certificateFormikProps) => {
    if (isUpdate) {
      dispatch(
        courseUpdateMiddleWare({
          certificate_name: values.courseName,
          certificate_year: values.courseYear,
          certificate_by: values.courseBody,
          id: isUpdateId,
        }),
      ).then((res) => {
        if (res.payload.success) {
            dispatch(
          candidateMatchMiddleWare({ 
             can_id:res.payload?.can_id[0]?.id.toString(),
          }),
        )
          setReload(false)
          dispatch(profileEditMiddleWare({jd_id:localStorage.getItem('careerJobViewJobId')}));
          Toast('Certification updated successfully');
          cancel();
          formik.resetForm();
        } else {
          Toast(
            'Certification not updated, Please try again.',
            'LONG',
            'error',
          );
        }
      });
    } else {
      dispatch(
        courseAddMiddleWare({
          certificate_name: values.courseName,
          certificate_year: values.courseYear,
          certificate_by: values.courseBody,
        }),
      ).then((res) => {
        if (res.payload.success) {
          dispatch(
            candidateMatchMiddleWare({ 
               can_id:res.payload?.can_id.toString(),
            }),
          )
          setReload(false)
          formik.resetForm();
          dispatch(profileEditMiddleWare({jd_id:localStorage.getItem('careerJobViewJobId')}));
          Toast('Certification added successfully');
          cancel();
        } else {
          Toast('Certification not added, Please try again.', 'LONG', 'error');
        }
      });
    }
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validationSchema: certificationSchema,
  });

  useEffect(() => {
    if (
      isUpdate &&
      isUpdateId !== '0' &&
      Array.isArray(obj?.certi) &&
      obj?.certi.length !== 0
    ) {
      const filtercerti: any = obj?.certi.filter(
        (value) => value.cert_id === Number(isUpdateId),
      );
      if (filtercerti.length !==0 && !isEmpty(filtercerti[0].certification_name)) {
        formik.setFieldValue('courseName', filtercerti[0].certification_name);
      }
      if (filtercerti.length !==0 && !isEmpty(filtercerti[0].certificate_year)) {
        formik.setFieldValue('courseYear', filtercerti[0].certificate_year);
      }
      if (filtercerti.length !==0 && !isEmpty(filtercerti[0].certificate_by)) {
        formik.setFieldValue('courseBody', filtercerti[0].certificate_by);
      }
    }
  }, [obj, open]);

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

  return (
    <Modal open={open}>
      {routerPrompt}
      <Flex columnFlex className={styles.overAll}>
        <div
          className={styles.svgClose}
          onClick={onCloseModal}
          tabIndex={-1}
          role="button"
          onKeyDown={() => { }}
        >
          <SvgCloseSmall />
        </div>
        <Text align="center" bold size={14} className={styles.title}>
          {isUpdate ? 'Update' : 'Add'} Certifications/Course
        </Text>
        <Flex row top className={styles.flexConatiner}>
          <Flex flex={4} width={inputWidth}>
            <InputText
              required
              label="Certificate/Course Name"
              value={formik.values.courseName}
              onChange={(e) => {
                setReload(true)
                formik.setFieldValue('courseName', e.target.value)
              }}
            />
            <ErrorMessage
              name="courseName"
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
              label="Certified Year"
              value={formik.values.courseYear}
              onChange={(e) => {
                if (
                  e.target.value === '' ||
                  numberAndSpaceCheck.test(e.target.value)
                ) {
                  setReload(true)
                  formik.setFieldValue(`courseYear`, e.target.value);
                }
              }}
            />
            <ErrorMessage
              name="courseYear"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={4} width={inputWidth}>
            <InputText
              required
              label="Certifying Body"
              value={formik.values.courseBody}
              // onChange={formik.handleChange('courseBody')}
              onChange={(e) => {
                setReload(true)
                formik.setFieldValue('courseBody', e.target.value)
              }}
            />

            <ErrorMessage
              name="courseBody"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
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

export default CertificationsAddandUpdateEdit