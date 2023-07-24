import { useFormik } from 'formik';
import { Dispatch, SetStateAction,useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import Flex from '../../uikit/Flex/Flex';
import { lowerCase } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Toast from '../../uikit/Toast/Toast';
import InputSearch from '../../uikit/InputSearch/InputSearch';
import Button from '../../uikit/Button/Button';
import { isEmpty} from '../../uikit/helper';
import { space} from '../constValue';
import { AppDispatch } from '../../store';
import { ERROR_MESSAGE, THIS_FIELD_REQUIRED } from '../constValue';
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
  setIsCheck?:any
  val:any
  update:any
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
  setvisible,
  setIsCheck,
  val,
  update
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [error,seterror]=useState(0)
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
      setIsCheck([])
      update(false)
  };

  const handleValidation = (values: FormProps) => {
    const errors: Partial<errorType> = {};    
    // if (values.location === '') {
    //   errors.location = THIS_FIELD_REQUIRED;
    // }

    // if (values.keywords === '') {
    //   errors.keywords = THIS_FIELD_REQUIRED;
    // }
    
    // if ((((formik.values.keywords).trim().length )<1)) {
    //   console.log("consoleeee11111",typeof((formik.values.keywords).trim().length))
    //    errors.keywords = "Space is not a character";
    // }
    // if ((((formik.values.location).length )<1)) {
    //    errors.location = "Space is not a character";
    // }
      return errors;
  };
  const SignupSchema = Yup.object().shape({
    keywords: Yup.string()
    .trim('Space is not a character')
    .min(1, 'Space is not a character')
    .max(512, 'The contact name cannot exceed 512 char')
    .required(THIS_FIELD_REQUIRED),
    location: Yup.string()
    .trim('Space is not a character')
    .min(1, 'Space is not a character')
    .max(512, 'The contact name cannot exceed 512 char')
    .required(THIS_FIELD_REQUIRED),
  });
  const formikRef = useRef();

  const formik = useFormik({
    innerRef: formikRef,
    initialValues: initial,
    validate: handleValidation,
    validationSchema: SignupSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  });
  useEffect(() => {
    
    seterror((formik.values.keywords).trim().length);
   console.log("errorrrrr",error)
}, [formik.values.keywords]);

  const handleInputChange=(event)=>{
    console.log("keyyyyyy",event.target.value);
    formik.setFieldValue("location", event.target.value);
   
  }



  return (
<>
{console.log("formik.values",formik.values,(formik.values.keywords).trim().length)}
    <Flex row between bottom className={cx('rowContainer')}>
      <Flex row  width={'89%'} >
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
            placeholder="e.g. City or State"
            options={location}
            setFieldValue={formik.setFieldValue}
            name="location"
            label={'Location'}
            required
            errorMessage={formik.errors.location}
            error={formik.touched.location}
            initialValue={lowerCase(formik.values.location)}
            style={styles.searchStyle}  
            onChange={handleInputChange}   
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
    <Flex>
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
      </Flex>
      

    </>
  );
};

export default TalentAction;

 // const valid=!isEmpty(formik.values.location)&& !isEmpty(formik.values.keywords);
  
  // const handlefuction=()=>{
  //   console.log("formik errorrrrrrrr",formik.isValid,formik.dirty,valid)
  //   if (isEmpty(formik.values.location)&&(formik.isValid &&formik.dirty)){
  //     console.log("i am here+++++++++++++++++++++++++++++++++++++++++++++++++",formik.isValid,formik.dirty)
  //      return <>
       
  //    <div style={{color:"#f94949",fontSize:'12px'}}>This field is required</div>
  //    </>
     
  //   }
  // }