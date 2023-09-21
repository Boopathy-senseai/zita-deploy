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

type Props = {
  open: boolean;
  cancel: () => void;
  obj?: Obj;
};

const UpdateOverviewSummaryEdit = ({ open, cancel, obj }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const editorRef = useRef<any>(null);
  const [isLoader, setLoader] = useState(false);
  const [isReload, setReload] = useState(false);

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
            Update Overview of the Resume
          </Text>
        </Flex>
        <RichText
          // onFocus={handleOpenInput}
          // onBlur={handleCloseInput}
          onInit={(_a: any, editor: any) => (editorRef.current = editor)}
          // initialValue={values.jobDescription}
          height={500}
          placeholder="Enter the overview of the resume"
        />

        <Flex end row marginTop={10} className={styles.borderLine}>
          <Button className={styles.cancel} onClick={cancel}>
            Cancel
          </Button>
          <Button style={{ marginTop: '20px' }} onClick={() => {}}>
            update
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default UpdateOverviewSummaryEdit;
