import { useFormik } from 'formik';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { isEmpty } from '../../uikit/helper';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../uikit/InputText/InputText';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import { THIS_FIELD_REQUIRED } from '../constValue';
import styles from './addandupdateworkexperienceedit.module.css';
import { Obj } from './candidateProfileTypes';

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
};

const initial: workFormikProps = {
  organisation: '',
  jobTitle: '',
  location: '',
  techSkill: '',
  from: '',
  to: '',
  jobDescription: '',
};

type Props = {
  open: boolean;
  cancel: () => void;
  isUpdate?: boolean;
  obj?: Obj;
  isUpdateId?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const AddandUpdateWorkExperienceEdit = ({
  open,
  cancel,
  obj,
  isUpdate,
  isUpdateId,
}: Props) => {
  // const editorRef = useRef<any>(null);
  // const [isRich, setRich] = useState(false);

  // useEffect(() => {
  //   formik.setFieldValue(
  //     'jobDescription',
  //     editorRef.current && editorRef.current.getContent(),
  //   );
  // }, [isRich]);

  // const handleOpenInput = () => {
  //   setRich(true);
  // };

  // const handleCloseInput = () => {
  //   setRich(false);
  // };

  const qualificationSchema = Yup.object().shape({
    organisation: Yup.string().required(THIS_FIELD_REQUIRED),
    jobTitle: Yup.string().required(THIS_FIELD_REQUIRED),
    techSkill: Yup.string().required(THIS_FIELD_REQUIRED),
    from: Yup.string().required(THIS_FIELD_REQUIRED),
    to: Yup.string().required(THIS_FIELD_REQUIRED),
    jobDescription: Yup.string().required(THIS_FIELD_REQUIRED),
  });

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
    validationSchema: qualificationSchema,
  });

  useEffect(() => {
    if (
      isUpdate &&
      isUpdateId !== '0' &&
      Array.isArray(obj?.exp) &&
      obj?.exp.length !== 0
    ) {
      const filterEducation: any = obj?.exp.filter(
        (value) => value.exp_id === Number(isUpdateId),
      );
      if (!isEmpty(filterEducation[0].org)) {
        formik.setFieldValue('organisation', filterEducation[0].org);
      }
      if (!isEmpty(filterEducation[0].des)) {
        formik.setFieldValue('jobTitle', filterEducation[0].des);
      }
      if (!isEmpty(filterEducation[0].loc)) {
        formik.setFieldValue('location', filterEducation[0].loc);
      }
      if (!isEmpty(filterEducation[0].from_exp)) {
        formik.setFieldValue('from', new Date(filterEducation[0].from_exp));
      }
      if (
        !isEmpty(filterEducation[0].to_exp) &&
        filterEducation[0].to_exp === 'Till Date'
      ) {
        formik.setFieldValue('to', new Date());
      } else if (
        !isEmpty(filterEducation[0].to_exp) &&
        filterEducation[0].to_exp !== 'Till Date'
      ) {
        formik.setFieldValue('to', new Date(filterEducation[0].to_exp));
      }
      if (!isEmpty(filterEducation[0].roles)) {
        formik.setFieldValue('jobDescription', filterEducation[0].roles); // need to disscuss
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
          Add Work Experience
        </Text>
        <Flex row top>
          <Flex flex={6} width={inputWidth} marginRight={marginRight}>
            <InputText
              label="Organisation"
              required
              value={formik.values.organisation}
              onChange={formik.handleChange('organisation')}
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
              onChange={formik.handleChange('jobTitle')}
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
              onChange={formik.handleChange('location')}
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
              onChange={formik.handleChange('techSkill')}
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
                  onChange={(date) => formik.setFieldValue('from', date)}
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
                  onChange={(date) => formik.setFieldValue('to', date)}
                  className={styles.datePicker}
                />
              </LabelWrapper>
              <div className={styles.tillDateCheckBox}>
                <InputCheckBox label="Till Date" />
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
          {/* <LabelWrapper label="Job Description" required>
            <RichText
              onFocus={handleOpenInput}
              onBlur={handleCloseInput}
              onInit={(_a: any, editor: any) => (editorRef.current = editor)}
              initialValue={formik.values.jobDescription}
              height={200}
            />
          </LabelWrapper> */}
          <InputText
            textarea
            value={formik.values.jobDescription}
            onChange={formik.handleChange('jobDescription')}
          />
          <ErrorMessage
            name="jobDescription"
            touched={formik.touched}
            errors={formik.errors}
          />
        </Flex>

        <Flex end>
          <Button onClick={formik.handleSubmit}>Add</Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AddandUpdateWorkExperienceEdit;
