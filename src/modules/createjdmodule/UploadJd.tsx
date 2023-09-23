import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import SvgRoundClose from '../../icons/SvgRoundClose';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import { ErrorMessage, InputText, Modal, SelectTag } from '../../uikit';
import { getFocus, isEmpty } from '../../uikit/helper';
import { GARY_4 } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { fileAccept, FILE_2MB, THIS_FIELD_REQUIRED } from '../constValue';
import { jdParserMiddleWare, locationCityMiddleWare, locationStateMiddleWare,AioutputApimiddleware } from './store/middleware/createjdmiddleware';
import styles from './uploadjd.module.css';
import { workspacetype } from './mock';
import {
  CityEntity,
  CountryEntity,
  JdOutput,
  LocationUpdate,
  QualificationEntity,
  StatesEntity,
} from './createJdTypes';




type Props = {
  handleTempOpen?:any;
  values:any;
  onDirty:any;
  setFieldValue:any;  
  getCountry:any;   
  errors?:any;
  touched ?:any;
  handleSubmit?:any;
}
const UploadJd=({handleTempOpen,values,onDirty,setFieldValue,getCountry, })=> {
  const [file, setFile] = useState<any>([]);
  const [isMb, setMb] = useState(false);
  const [modal,setmodal]= useState (false)
  const [openmodel,setopenmodel]=useState(false)
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSelectCurrOpen, setIsSelectCurrOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [getState, setState] = useState<StatesEntity[]>([]);
  const [getCity, setCity] = useState<CityEntity[]>([]);


  useEffect(() => {
    if (!isEmpty(values.country1)) {
      dispatch(locationStateMiddleWare({ country: values.country1 })).then(
        (res) => {
          if (res.payload.states && res.payload.states.length !== 0) {
            setState(res.payload.states);
          }
        },
      );
    }
  }, [values.country1]);

  useEffect(() => {
    if (!isEmpty(values.state1)) {
      dispatch(locationCityMiddleWare({ state: values.state1 })).then((res) => {
        if (res.payload.city && res.payload.city.length !== 0) {
          setCity(res.payload.city);
        }
      });
    }
  }, [values.state1]);

  const handleSubmit1 = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    uploadFile(file);
    setmodal(false)
  };

  const handlecancel = () => {
    setmodal(false);
    setFile([])
  }
  // resume clear function
  const handleClear = () => setFile([]);

    // resume upload function
  const uploadFile = (files: any) => {
    const formData = new FormData();
    formData.append('jd_file', files);
    return dispatch(jdParserMiddleWare({ upload: formData })).then(() => {
      handleClear();
    });
  };

  const handleOnChange = (e: any) => {
    var fileExt = e.target.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (fileAccept.indexOf(fileExt) < 0) {
      alert(
        'Invalid file selected, valid files are of ' +
          fileAccept.toString() +
          ' types.',
      );
    } else if (e.target.files && e.target.files[0].size / 1024 / 1024 > 2) {
      setMb(true);
    } else {
      setFile(e.target.files[0]);
      setMb(false);
    }
  };

  const dragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const dragEnter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const dragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  // File drag and drop Function
  const fileDrop = (e: {
    preventDefault: () => void;
    dataTransfer: { files: any };
  }) => {
    e.preventDefault();
    var fileName = e.dataTransfer.files && e.dataTransfer.files[0].name;
    fileName = fileName.substring(fileName.lastIndexOf('.'));
    if (fileAccept.indexOf(fileName) < 0) {
      alert(
        'Invalid file selected, valid files are of ' +
          fileAccept.toString() +
          ' types.',
      );
    } else if (
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].size / 1024 / 1024 > 2
    ) {
      setMb(true);
    } else {
      setMb(false);
      setFile(e.dataTransfer.files[0]);
    }
  };

  const checkSelectLength = file.length === 0 ? false : true;
  const correct=values.work_space_type1==='3';

  const initialValues: MyFormValues = {
    work_space_type1: '',
    jobTitle1:'',
    Industry_and_Domain:'',
    country1:'',
    city1:'',
    state1:'',
    Overview:'',
  };
  
  interface MyFormValues {
    work_space_type1: string;
    jobTitle1: string;
    Industry_and_Domain:string;
    country1:string;
    city1:string;
    state1:string;
    Overview:string;
  }
  const handleValidation = (formValues: MyFormValues) => {
    const errors: Partial<MyFormValues> = {};
  

    if (values.work_space_type1 === '0' || values.work_space_type1 === '') {
      errors.work_space_type1 = THIS_FIELD_REQUIRED;
    }
    if ( values.jobTitle1 === '') {
      errors.jobTitle1 = THIS_FIELD_REQUIRED;
    }
    if ( values.Industry_and_Domain === '') {
      errors.Industry_and_Domain = THIS_FIELD_REQUIRED;
    }
    if ( values.country1 === ''&& values.work_space_type1 !== '3') {
      errors.country1 = THIS_FIELD_REQUIRED;
    }
    if ( values.city1 === ''&& values.work_space_type1 !== '3') {
      errors.city1 = THIS_FIELD_REQUIRED;
    }
    if ( values.state1 === ''&& values.work_space_type1 !== '3') {
      errors.state1 = THIS_FIELD_REQUIRED;
    }
    if ( values.Overview === '') {
      errors.Overview = THIS_FIELD_REQUIRED;
    }
   

  
    return errors;
  };
  const handleSubmit = (formValues: MyFormValues, { resetForm }: any) => {
    dispatch(AioutputApimiddleware({
      jobTitle:values.jobTitle1,
      Industry_and_Domain:values.Industry_and_Domain,
      Work_Space_Type:values.work_space_type1,
      Country:values.country1,
      State:values.state1,
      City:values.city1,
      Overview_the_Role:values.Overview,
      Department_and_reporting_structure:values.Department_and_reporting,
    }))
   
    setopenmodel(false);
  
  };
  const handleReset = () => {
    formik.resetForm(); 
  };
  const formik = useFormik({
    initialValues: initialValues,
    validate: handleValidation,
    onSubmit: handleSubmit,
    validateOnBlur: true,
    validateOnChange: true,
  });
  const handlefunction2 = () => {
    handleReset();
    setopenmodel(true);
    
  };
  
  return (
    <Flex row style={{justifyContent:"space-between", marginTop:"6px"}}>
      <Flex>
      {/* <Text bold size={14} className={styles.title}>
        Create Your Job
      </Text> */}
      <Text className={styles.desText}>
        Take up your first step in your hiring process with Zita
      </Text>
      </Flex>
      <Flex>
        <Flex row>
          <Button types='secondary' onClick={()=>setmodal(true)} style={{marginRight:'10px'}}>Upload JD</Button>
          <Button onClick={handleTempOpen} style={{marginRight:'10px'}}>
              Import from our templates
            </Button>
            <Button onClick={handlefunction2}>Generate by AI</Button>
         </Flex>   
         <Modal open={openmodel} >
         <Flex className={styles.uploadpopup1}>
          <Text size={16}>Generate by AI</Text>
          <Flex row>
          <Flex flex={2} style={{marginRight:'10px'}}>
          <InputText
          id="jobtitle__jobtitle"
          name="jobTitle1"
          label="Job Title"
          required
          placeholder={ 'e.g. Sales Executive'}
          value={values.jobTitle1}
          onChange={(e) => {
            setFieldValue('jobTitle1', e.target.value);
            onDirty();
          }}
     
        />
        { values.jobTitle1===''&&(
           <ErrorMessage
           name={'jobTitle1'}
           errors={formik.errors}
           touched={formik.touched}
         />)
        }
       
        </Flex>
        <Flex flex={2} style={{marginRight:'10px'}} >
        <InputText
          id="jobtitle__jobtitle"
          name="Industry_and_Domain"
          label="Industry and Domain"
          required
          placeholder={ 'e.g. IT Sector'}
          value={values.Industry_and_Domain}
          onChange={(e) => {
            setFieldValue('Industry_and_Domain', e.target.value);
            onDirty();
          }}
          
        />
        { values.Industry_and_Domain===''&&(
           <ErrorMessage
           name={'Industry_and_Domain'}
           errors={formik.errors}
           touched={formik.touched}
         />)
        }
        </Flex>
        <Flex flex={2}>
        <SelectTag
            inputId="jobdetails___state"
            isSearchable
            options={workspacetype}
            label="Work Space Type"
            required
            value={
              workspacetype
                ? workspacetype.find(
                    (option) => option.value === values.work_space_type1,
                  )
                : ''
            }
            onChange={(option) => {
              setFieldValue('work_space_type1', option.value);
            }}
            
          />
            { values.work_space_type1===''&&(
           <ErrorMessage
           name={'work_space_type1'}
           errors={formik.errors}
           touched={formik.touched}
         />)
        }
        </Flex>
        </Flex>
        <Flex row>
          <Flex flex={2} style={{marginRight:'10px'}}>
          <SelectTag
            isSearchable
            inputId="jobdetails___country"
            options={getCountry}
            label="Country"
            required={correct?false:true}
            value={
              getCountry
                ? getCountry.find(
                    (option) => option.id === Number(values.country1),
                  )
                : ''
            }
            onChange={(option) => {
              setFieldValue('country1', option.id);
              setFieldValue('city1', '');
              setFieldValue('state1', '');
              onDirty();
            }}
          
            onMenuOpen={() => setIsSelectOpen(true)}
            onMenuClose={() => setIsSelectOpen(false)}
            getOptionValue={(option: { id: number }) => `${option.id}`}
            getOptionLabel={(option: { name: string }) => option.name}
 
          />
          { values.country1===''&& values.work_space_type1 !== '3'&&(
           <ErrorMessage
           name={'country1'}
           errors={formik.errors}
           touched={formik.touched}
         />)
        }
          </Flex>
          <Flex flex={2} style={{marginRight:'10px'}}>
            
          <SelectTag
            inputId="jobdetails___state"
            isSearchable
            options={getState}
            label="State"
            required={correct?false:true}
            getOptionValue={(option: { id: number }) => `${option.id}`}
            getOptionLabel={(option: { name: string }) => option.name}
            value={
              !isEmpty(values.state1)
                ? getState
                  ? getState.find(
                      (option) => option.id === Number(values.state1),
                    )
                  : ''
                : ''
            }
            onChange={(option) => {
              setFieldValue('state1', option.id);
              setFieldValue('city1', '');
              onDirty();
            }}
            onMenuOpen={() => setIsSelectOpen(true)}
            onMenuClose={() => setIsSelectOpen(false)}
          />
          { values.state1===''&& values.work_space_type1 !== '3'&&(
           <ErrorMessage
           name={'state1'}
           errors={formik.errors}
           touched={formik.touched}
         />)
        }
          </Flex>
          <Flex flex={2}>
          <SelectTag
            inputId="jobdetails___city"
            isSearchable
            options={getCity}
            label="City"
            required={correct?false:true}
            getOptionValue={(option: { id: number }) => `${option.id}`}
            getOptionLabel={(option: { name: string }) => option.name}
            value={
              !isEmpty(values.city1)
                ? getCity
                  ? getCity.find((option) => option.id === Number(values.city1))
                  : ''
                : ''
            }
           
            onChange={(option) => {
              setFieldValue('city1', option.id);
              onDirty();
            }}
            onMenuOpen={() => setIsSelectOpen(true)}
            onMenuClose={() => setIsSelectOpen(false)}
          />
           { values.city1===''&& values.work_space_type1 !== '3'&&(
           <ErrorMessage
           name={'city1'}
           errors={formik.errors}
           touched={formik.touched}
         />)
        }
          </Flex>
        </Flex>
        <Flex row>
            <Flex flex={2}style={{marginRight:'10px'}}>
            <InputText
            className={styles.textArea}
            value={values.Overview}
            textarea
            label="Overview of the Role"
            onChange={(e) => {
    
              setFieldValue('Overview', e.target.value);
            }}
        
            required
          />
           { values.Overview===''&&(
           <ErrorMessage
           name={'Overview'}
           errors={formik.errors}
           touched={formik.touched}
         />)
        }
          </Flex>
          <Flex flex={2}>
        <InputText
          className={styles.textArea}
          value={values.Department_and_reporting}
          textarea
          label="Department and reporting structure"
          onChange={(e) => {
   
            setFieldValue('Department_and_reporting', e.target.value);
          }}
          
        />
          
        </Flex>

        </Flex>
        <Flex row style={{display: 'flex',justifyContent:'flex-end'}}>
          <Button onClick={()=>setopenmodel(false)} types='close'>Cancel</Button>
          <Button onClick={formik.handleSubmit}style={{marginLeft:'10px'}} >Generate</Button>
        </Flex>
         </Flex>
        </Modal>

      <Modal open={modal} >
      <Flex className={styles.uploadpopup}>
        <Flex  center>
        <Text bold size={14} style={{marginBottom: "16px"}}>Add Attachment</Text>
          <Flex columnFlex className={styles.innerFlex}>
            <div
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileDrop}
              className={styles.border}
            >
              <input
                key={Date.now()}
                type="file"
                accept=".doc,.docx,.pdf,.txt"
                onChange={handleOnChange}
                className={styles.displayNone}
                id="upload__file_upload"
              />
              {!checkSelectLength ? (
                <Flex>
                  <Flex row center middle>
                    <Text color="gray">{'Drag & Drop JD Here or'}</Text>
                    <label
                      className={styles.labelStyle}
                      htmlFor={'upload__file_upload'}
                    >
                      <Text bold color="link">Browse Files</Text>
                    </label>
                  </Flex> 
                  <Text
                    size={12}
                    align="center"
                    color="gray"
                    className={styles.uploadText}
                  >
                    (Upload only .txt, .doc, .docx, .pdf formats)
                  </Text>
                </Flex>
              ) : (
                <Flex row center>
                  <Flex row className={styles.uploadjdfilebox}>
                  <Text className={styles.uploadjdfiletext} color="gray">{file.name}</Text>
                  <div
                    tabIndex={-1}
                    role={'button'}
                    onKeyPress={() => {}}
                    onClick={handleClear}
                    className={styles.svgClose}
                  >
                    <SvgRoundClose fill={GARY_4} width={16} height={16} />
                  </div>
                  </Flex>
                </Flex>
              )}
            </div>
            {isMb && (
              <Text
                align="center"
                size={12}
                color="error"
                style={{ position: 'absolute', bottom: -22 }}
              >
                {FILE_2MB}
              </Text>
            )}
          </Flex>
          <Flex row style={{marginTop:'10px',justifyContent: 'flex-end'}}>
          <Button
            onClick={handlecancel}
            types='close'
          >
            Cancel
          </Button>
          <Button
            disabled={!checkSelectLength}
            onClick={handleSubmit1}
            className={styles.btnStyle}
          >
            Upload JD
          </Button>
        </Flex>
        </Flex>
      </Flex>
      </Modal>
      </Flex>
    </Flex>
  );
}

export default UploadJd;
