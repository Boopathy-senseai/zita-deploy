import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { AppDispatch, RootState } from '../../store';
import Modal from '../../uikit/Modal/Modal';
import Toast from '../../uikit/Toast/Toast';
import Loader from '../../uikit/Loader/Loader';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Button from '../../uikit/Button/Button';
import { THIS_FIELD_REQUIRED } from '../constValue';
import { candidateMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import RichText from '../common/RichText';
import styles from './updateprofessionalskillsedit.module.css';
import { Obj } from './candidateProfileTypes';
import {
  profileEditMiddleWare,
  updatereumeoverviewMiddleWare,
} from './store/middleware/candidateprofilemiddleware';

type Props = {
  open: boolean;
  cancel: () => void;
  obj?: Obj;
  overview?: string;
};
export type FormProps = {
  resume_overview: string;
};
const initial: FormProps = {
  resume_overview: '',
};

const UpdateOverviewSummaryEdit = ({ open, cancel, obj, overview }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const editorRef = useRef<any>(null);
  const [isLoader, setLoader] = useState(false);
  const [isReload, setReload] = useState(false);
  const handleSubmit = (values: FormProps) => {
    const formData = new FormData();
    formData.append('resume_overview', values.resume_overview);
    dispatch(
      updatereumeoverviewMiddleWare({
        formData,
      }),
    ).then((res) => {
      cancel();
      Toast('Resume overview updated successfully');
      dispatch(
        profileEditMiddleWare({
          jd_id: localStorage.getItem('careerJobViewJobId'),
        }),
      );
    });
  };
  type error = {
    resume_overview: string;
  };
  const parser = new DOMParser();
  const handlerequire = (values: error) => {
    const errors: Partial<error> = {};
    console.log(
      formik.values.resume_overview,
      'formik.values.notesformik.values.notes',
    );
    const doc = parser.parseFromString(
      formik.values.resume_overview,
      'text/html',
    );
    const textNodes = doc.querySelectorAll('body')[0].textContent;
    const texttrim = textNodes.trim();
    if (texttrim === '') {
      errors.resume_overview = 'Enter valid resume overview.';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validate: handlerequire,
    enableReinitialize: true,
  });

  return (
    <Modal open={open}>
      {/* {routerPrompt} */}
      {isLoader && <Loader />}
      <Flex className={styles.overAll}>
        <Flex
          style={{ borderBottom: '0.5px solid #581845', marginBottom: '15px' }}
        >
          <Text
            className={styles.title}
            size={14}
            bold
            style={{ marginBottom: '5px' }}
          >
            Update Resume Overview
          </Text>
        </Flex>
        <RichText
          // onFocus={handleOpenInput}
          // onBlur={handleCloseInput}
          onInit={(_a: any, editor: any) => (editorRef.current = editor)}
          initialValue={overview}
          onChange={formik.handleChange('resume_overview')}
          height={500}
          placeholder="Enter the overview of the resume"
        />
        <ErrorMessage
          touched={formik.touched}
          errors={formik.errors}
          name="resume_overview"
        />
        <Flex end row marginTop={10} className={styles.borderLine}>
          <Button className={styles.cancel} onClick={cancel}>
            Cancel
          </Button>
          <Button style={{ marginTop: '20px' }} onClick={formik.handleSubmit}>
            update
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
export default UpdateOverviewSummaryEdit;
