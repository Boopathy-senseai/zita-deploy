
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
// import { ref } from 'yup';

import SvgIntomark from '../../icons/Intomark';

// import { Button, DropdownButton } from 'react-bootstrap';
import { InputCheckBox, InputRadio } from '../../uikit';
// import Dropdown from 'react-bootstrap';
import SvgRefresh from '../../icons/SvgRefresh';
import Flex from '../../uikit/Flex/Flex';
import InputSearch from '../../uikit/InputSearch/InputSearch';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';

import { postedOn, jobTypeData } from './mock';
import styles from './myjobpostingfilter.module.css';


// import { any } from 'prop-types';
export interface DateEntity {
  label: string;
  value: string;
}
export type MyJobFormProps = {
  jobTitle: string;
  jobId: string;
  postedOn: DateEntity;
  jobType: string;
  location: string;
};


type Props = {
  formik: FormikProps<MyJobFormProps>;
  location_list: string[];
  job_ids: string[];
  job_title: string[];
};

const MyJobsPostingFilter = ({
  formik,
  location_list,
  job_ids,
  job_title,
}: Props) => {
  const[data,setdata]=useState("")
  const [done,setdone]=useState("")
  const[date,setdate]=useState('')
  
  const pageReload=()=>{
    setdata('')
    setdate('')
    
    formik.resetForm()
    formik.setFieldValue('jobTitle','' )
    formik.setFieldValue('jobId','')
    formik.setFieldValue('postedOn',{ value: '', label: '------------' } )
    formik.setFieldValue('jobType', '')
    formik.setFieldValue('location', '');
  }

  
  useEffect(()=>{
  

   if(formik.values.jobType === "1"){
    
    setdone("Active")
 }
 else if(formik.values.jobType === "4"){
  
    setdone("Inactive")}

    else if(formik.values.jobType === "2,5,6"){

    setdone("Draft")
 }
 else if(formik.values.jobType === ''){

  setdone("All")
  setdata('')
  setdate('')
  
 }

 if(formik.values.jobId !=="" && formik.values.jobType === ''){
  setdata(formik.values.jobId  )
  setdone("")
  
 }else{
  setdata(formik.values.jobId  )
 }

 if(formik.values.postedOn.value === "1"){
  setdate("24 hours")
  setdone("")
 }else if(formik.values.postedOn.value === "3"){
  setdate("3 days")
  setdone("")
 }else if(formik.values.postedOn.value === "7"){
  setdate("7 days")
  setdone("")
 }else if(formik.values.postedOn.value === "14"){
  setdate("14 days")
  setdone("")
 }else if(formik.values.postedOn.value === "30"){
  setdate("30 days")
  setdone("")
 }else if(formik.values.postedOn.value === "90"){
  setdate("90 days")
  setdone("")
 }else if(formik.values.postedOn.value === "365"){
  setdate("Last year")
  setdone("")
 }
 


  },[formik.values.jobId,formik.values.jobType,formik.values.postedOn.value])

 



  const  [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null)


  const closeDropDown = (e: any) => { 
    // console.log("closeDropDown")
    // console.log({target: e.target, showDropDown, dropDownRef})
    if(dropDownRef.current && showDropDown && !dropDownRef.current.contains(e.target)){
      // console.log("SHOW FASLE")
      setShowDropDown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', closeDropDown)
  }, [showDropDown])


  const close=()=>{
    setdata("")
    formik.setFieldValue('jobId','')

  }

  const closedate=()=>{
    setdate("")
    formik.setFieldValue('postedOn', { value: '', label: '------------' })
  
  }
  
  return (
    <>
    
       {console.log("check filter",formik.values)} 
       {console.log("value",data)} 

     <Text className={''}>    
    
     Quick Filters:
     </Text> 
     {done !=="" ?(
     <Text className={styles.quickfil}> {done}</Text>
     ):("")}
{data !==""?(
     <Text className={styles.quickfil}>{data} <SvgIntomark  className={styles.stylesvg} onClick={()=>close()}/></Text>

):(" ")}

{date !==""?(
    <Text className={styles.quickfil}>{date} <SvgIntomark  className={styles.stylesvg} onClick={()=>closedate()}/></Text>

):(" ")}
     
   
    <div  ref={dropDownRef} className={styles.drop_down}>

        <Flex className={styles.drop_down_header} onClick={() => {
          setShowDropDown((value) => !value);
        } }>

          <Text bold size={16} className={styles.filtername}>
            View Filter
             {/* <div
         tabIndex={-1}
         role={'button'}
          onClick={pageReload}
         onKeyPress={() => { } } 
       > */}
      <SvgRefresh width={22} height={22} 
      onClick={pageReload} 
      className={styles.filtersvg} />
            {/* </div> */}
            </Text>
          </Flex>
          
        <div  className={`${styles.drop_down_menus} ${showDropDown ? styles.show : ""}`}>

<Flex className={styles.mtstyle} >

           <div className={styles.skillContainer}>
              <InputSearch
                initialValue={formik.values.jobId}
                options={job_ids}
                placeholder="enter a job id"
                labelBold
                setFieldValue={formik.setFieldValue}
                name="jobId"
                label={'Job ID'}
                onkeyPress={(event) => {
                  if (event.key === 'Enter') {
                    formik.setFieldValue('jobId', event.target.value);
                  }
                
                } } />
            </div>
          </Flex>

          <Flex className={styles.mtstyle}>
            <div className={styles.skillContainer}>
              <Text color="black" bold className={styles.jobTextStyle}>
                Job Status
              </Text>
              <Flex>
                {jobTypeData.map((jobList) => {
                  return (
                    <Flex
                      row
                      key={jobList.value}
                      width={jobList.width}
                      className={styles.matchRadioStyle}
                    >
                      <InputCheckBox
                      className={styles.checkbox}
                        label={jobList.value}
                        checked={jobList.label === formik.values.jobType}
                        onClick={() => formik.setFieldValue('jobType', jobList.label)} />
                    </Flex>
                    
                  );
                })}

              </Flex>
            </div>
          </Flex>

          <Flex className={styles.mtstyle}>
            <div className={styles.inputmargin}>
              <SelectTag
                label="Posted On"
                labelBold
                options={postedOn}
                placeholder="Select"
                onChange={(option) => {
                  formik.setFieldValue('postedOn', option);
                } }
                value={postedOn
                  ? postedOn.find(
                    (option) => option.value === formik.values.postedOn.value
                  )
                  : ''} />
            </div>
          </Flex>

          
         
        

          {/* <div className={styles.inputmargin}>
      <InputSearch
        initialValue={formik.values.jobTitle}
        options={job_title}
        setFieldValue={formik.setFieldValue}
        name="jobTitle"
        
        labelBold
        placeholder="hello2"
        label={'Job Title'}
        onkeyPress={(event) => {
          if (event.key === 'Enter') {
            formik.setFieldValue('jobTitle', event.target.value);
          }
        }}
      />
    </div> */}

          {/* <div className={styles.inputmargin}>
      <SelectTag
        label="Posted On"
        labelBold
        options={postedOn}
        placeholder="Select"
        onChange={(option) => {
          formik.setFieldValue('postedOn', option);
        }}
        value={
          postedOn
            ? postedOn.find(
                (option) =>
                  option.value === formik.values.postedOn.value,
              )
            : ''
        }
      />
    </div> */}

          {/* <div className={styles.skillContainer}>
      <Text color="black" bold className={styles.jobTextStyle}>
        Job Status
      </Text>
      <Flex column>
        {jobTypeData.map((jobList) => {
          return (
            <Flex
              row
              key={jobList.value}
              width={jobList.width}
            

              className={styles.matchRadioStyle}
            >
              <InputCheckBox
                label={jobList.value}
                checked={jobList.label === formik.values.jobType}
                onClick={() => formik.setFieldValue('jobType', jobList.label)}
              />
            </Flex>
          );
        })}
      </Flex>
    </div> */}
          {/* <div className={styles.skillContainer} style={ { marginTop: 10 }}>
      <InputSearch
      initialValue={formik.values.location}
        placeholder="Enter job location"
        options={location_list}
        setFieldValue={formik.setFieldValue}
        name="location"
        labelBold
        label={'Location'}
        onkeyPress={(event) => {
          if (event.key === 'Enter') {
            formik.setFieldValue('location', event.target.value);
          }
        }}
      />
    </div> */}



        </div>

      </div></>
  );
};

export default MyJobsPostingFilter;








