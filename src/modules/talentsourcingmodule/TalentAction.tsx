import { useFormik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import Flex from '../../uikit/Flex/Flex';
import { lowerCase } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Toast from '../../uikit/Toast/Toast';
import InputSearch from '../../uikit/InputSearch/InputSearch';
import Button from '../../uikit/Button/Button';
import { AppDispatch } from '../../store';
import { ERROR_MESSAGE, THIS_FIELD_REQUIRED } from '../constValue';
import TalentFilter from './TalentFilter';
import styles from './talentaction.module.css';
import { distanceOptions, lastActiveOptions } from './mock';
import { talentSourcingSearchMiddleWare } from './store/middleware/talentSoucringMiddleware';

const cx = classNames.bind(styles);

type Props = {
  location?: string[];
  setSourceLimit: (arg: number) => void;
  setCandidatesLimit: (arg: string) => void;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setFind: (arg: boolean) => void;
  setInitalCheckBox: (arg: boolean) => void;
  setSubmitLoader:any
  setvisible:any
};

type FormProps = {
  keywords: string;
  location: string;
  distance: string;
  lastActive: string;
};
const initial: FormProps = {
  keywords: '',
  location: '',
  distance: '35',
  lastActive: '15',
};
type errorType = {
  location: string;
  keywords: string;
};
const TalentAction = ({
  location,
  setSourceLimit,
  setCandidatesLimit,
  setPageNumber,
  setFind,
  setInitalCheckBox,
  setSubmitLoader,
  setvisible
}: Props) => {
  const dispatch: AppDispatch = useDispatch();

  // form filter submit
  const handleSubmit = (values: FormProps) => {
    setvisible(true)
    setSubmitLoader(true)
    dispatch(
      talentSourcingSearchMiddleWare({
        location:
        lowerCase(values.location),
        keywords: values.keywords,
        radius: values.distance,
        lastActive: values.lastActive,
      }),
    )
      .then((response) => {
        setInitalCheckBox(false);
        setFind(false);
        setPageNumber(0);
        setSourceLimit(response.payload.source_limit);
        setCandidatesLimit(response.payload.candi_limit);
        setSubmitLoader(false)
      })
      .catch(() => {
        setFind(false);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
        setSubmitLoader(false)
      });
  };

  const handleValidation = (values: FormProps) => {
    const errors: Partial<errorType> = {};
    if (values.location === '') {
      errors.location = THIS_FIELD_REQUIRED;
    }

    if (values.keywords === '') {
      errors.keywords = THIS_FIELD_REQUIRED;
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: initial,
    validate: handleValidation,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });
  // console.log("112233",formik.setFieldValue)

  return (
    <>
    <Flex row between bottom className={cx('rowContainer')}>
      <Flex row bottom flex={1}>
        <InputText
          id={'talentaction__keywords'}
          label={'Job Title'}
          required
          inputConatinerClass={cx('salesStyle')}
          placeholder="e.g. Sales Executive"
          value={formik.values.keywords}
          onChange={formik.handleChange('keywords')}
          errorMessage={formik.errors.keywords}
          error={formik.touched.keywords}
        />
        <div className={cx('cityStyle')}>
          <InputSearch
            placeholder="e.g. City/State"
            options={location}
            setFieldValue={formik.setFieldValue}
            name="location"
            label={'Location'}
            required
            errorMessage={formik.errors.location}
            error={formik.touched.location}
            initialValue={lowerCase(formik.values.location)}
            style={styles.searchStyle}
          />
        </div>
        <SelectTag
          id={'talentaction__distanceId'}
          selectContainerClass={cx('distanceStyle')}
          options={distanceOptions}
          label={'Distance'}
          defaultValue={{ value: formik.values.distance, label: '35 Miles' }}
          onChange={(option) => formik.setFieldValue('distance', option.value)}
        />
        <SelectTag
          id={'talentaction__lastactiveId'}
          defaultValue={{
            value: formik.values.lastActive,
            label: '15 Days',
          }}
          selectContainerClass={cx('lastActiveStyle')}
          options={lastActiveOptions}
          label={'Last Active'}
          onChange={(option) =>
            formik.setFieldValue('lastActive', option.value)
          }
        />
      </Flex>
      <div className={styles.btnContainer}>
        <Button
          disabled={!(formik.isValid && formik.dirty)}
          className={cx('findBtn')}
          onClick={formik.handleSubmit}
        >
          Find Candidates
        </Button>
      </div>

    </Flex>
    
    </>
  );
};

export default TalentAction;


// <div className={cx('filterOverAll')}>
//     <TalentFilter
//              isInitalCheckBox={isInitalCheckBox}
//              setOther={setOther}
//              isOther={isOther}
//              isBachelors={isBachelors}
//              isDoctorate={isDoctorate}
//              isMasters={isMasters}
//              isAny={isAny}
//              setBachelors={setBachelors}
//              setDoctorate={setDoctorate}
//              setMasters={setMasters}
//              setAny={setAny}
//              isRelocate={isRelocate}
//              setRelocate={setRelocate}
//              isExperience={isExperience}
//              setExperience={setExperience}
//              setInitialPage={setPageNumber}
//              handleRefresh={handleRefresh}
//            />
//    </div>