import { FormikHelpers, FormikProps, useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
// import { ref } from 'yup';

import SvgIntomark from "../../icons/Intomark";

// import { Button, DropdownButton } from 'react-bootstrap';
import { InputCheckBox  } from "../../uikit";
import InputRadio from '../../uikit/InputRadio/InputRadio';
// import Dropdown from 'react-bootstrap';
import SvgRefresh from "../../icons/SvgRefresh";
import Flex from "../../uikit/Flex/Flex";
import InputSearch from "../../uikit/InputSearch/InputSearch";
import SelectTag from "../../uikit/SelectTag/SelectTag";
import Text from "../../uikit/Text/Text";
import { postedOn, jobTypeData } from "./mock";
import styles from "./myjobpostingfilter.module.css";
// import classNames from "classnames";
// import { Pointer } from "highcharts";
// import Placeholder from "react-select/dist/declarations/src/components/Placeholder";

// import { any } from 'prop-types';
export interface DateEntity {
  label: string;
  value: string;
  // placeholder:string;
}
export type MyJobFormProps = {
  jobId: string;
  postedOn: DateEntity;
  jobType: string;
  location: string;
  jobTitle: string;
};

type Props = {
  formik: FormikProps<MyJobFormProps>;
  location_list: string[];
  job_title: string[];
  job_ids: string[];
};

const MyJobsPostingFilter = ({
  formik,
  location_list,
  job_ids,
  job_title,
}: Props) => {
  // console.log(MyJobsPostingFilter)
  const [data, setdata] = useState("");
  const [done, setdone] = useState("");
  const [date, setdate] = useState("");
  const [Title, setTitle] = useState("");
  const [locationdata, setlocationdata] = useState("");
  const[clickevent,setclickevent] = useState(false);
  const inputRef = useRef<any>()
  
  const pageReload = () => {
    // location.reload( );
    setdata("");
    setdate("");
    setTitle("");
    setlocationdata("");
    formik.resetForm();
    formik.setFieldValue("jobTitle", "");
    formik.setFieldValue("jobId","");
    formik.setFieldValue("postedOn", {
      value: "",
    });
    formik.setFieldValue("jobType", "");
    formik.setFieldValue("location", "");
    inputRef.current.autowhatever.input.value = null
  };
  useEffect(()=>{
    if(formik.values.jobType === "All"){
      setdata("");
      setdate("");
      setTitle("");
      setlocationdata("");
    }
  },[formik.values.jobType])
  useEffect(() => {
    if (formik.values.jobType === "1") {
      setdone("Active");
    } else if (formik.values.jobType === "4") {
      setdone("Inactive");
    } else if (formik.values.jobType === "2,5,6") {
      setdone("Draft");
    } else if (formik.values.jobType === "") {
      setdone("All");
      setdata("");
      setdate("");
      setTitle("");
      setlocationdata("");
    }

    if (formik.values.jobId !== "" && formik.values.jobType === "") {
      setdata(formik.values.jobId);
      // setdone("");
    } else {
      setdata(formik.values.jobId);
    }

    if (formik.values.postedOn.value === "1") {
      setdate("Last 24 hours");
    } else if (formik.values.postedOn.value === "3") {
      setdate("Last 3 days");
    } else if (formik.values.postedOn.value === "7") {
      setdate("Last 7 days");
    } else if (formik.values.postedOn.value === "14") {
      setdate("Last 14 days");
    } else if (formik.values.postedOn.value === "30") {
      setdate("Last 30 days");
    } else if (formik.values.postedOn.value === "90") {
      setdate("Last 90 days");
    } else if (formik.values.postedOn.value === "365"){
      setdate("Last Last year");
    } else if(formik.values.postedOn.value === "") {
      setdate("");
      
    }

    setTitle(formik.values.jobTitle);
    setlocationdata(formik.values.location);
  }, [
    formik.values.jobId,
    formik.values.jobType,
    formik.values.postedOn.value,
    formik.values.jobTitle,
    formik.values.location,
  ]);

  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);

  // const closeDropDown = (e: any) => { 
  //   console.log(showDropDown,'ffffffffffffffffffffffffffffff')
  //   if (
  //     dropDownRef.current &&
  //     showDropDown &&
  //     !dropDownRef.current.contains(e.target)
  //   ) { 
  //     setShowDropDown(false);
      
  //   }

  // };

//    useEffect(() =>{
//     if (typeof Window !== 'undefined') {
//       document.addEventListener('click',closeDropDown); 
//     }
//   })
//   const onchek = localStorage.getItem('oncheck')
//   useEffect(() => { 
//     if(onchek === 'false'){
//     if (typeof Window !== 'undefined') {
//       document.addEventListener('click', closeDropDown); 
//     }}
//     else{
     
         
       
//   }
//     return () => {
//       if (dropDownRef) {
//         if (typeof Window === 'undefined') {
//           document.removeEventListener('click',closeDropDown,false);
//         }
//       }
//     };}
//   );

//  useEffect(()=>{ 
// setShowDropDown(true)
//  },[formik.values])
  

  const closestatus = () => {
    setdone("");
    formik.setFieldValue("jobType", "");
  };
  const close = () => {
    setdata("");
    formik.setFieldValue("jobId", "");
  };
  

  const closedate = () => {
    setdate("");
    // postedOn.values("","All");
    formik.setFieldValue("postedOn",{value: '', label: 'All'});
    
  };

  const closetitle = () => {
    setTitle("");
    formik.setFieldValue("jobTitle","");
     
  };
  const closelocationdata = () => {
    setlocationdata("");
    formik.setFieldValue("location","");
    
  };

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // };

  const [offset, setOffset] = useState(0);



  // const MyDataBaseSearchAction = ({ jobTitle, formik,isSearchValue,setSearchValue }: Props) => {
  //   const selectInputRef = useRef<any>();
  //   const hanldeSearch = () => {
  //   formik.setFieldValue('searchValue', isSearchValue);
  //   };

  // useEffect(() => {
  //     const onScroll = () => setOffset(window.pageYOffset);
  //     // clean up code
  //     window.removeEventListener('scroll', onScroll);
  //     window.addEventListener('scroll', onScroll, { passive: true });
  //     return () => window.removeEventListener('scroll', onScroll);
  // }, []);

 

  return (
    <>
      

      <Text className={""} style={{ color: "#581845" }}>
        Quick Filters :
      </Text>
      {data.length === 0 &&
      date.length === 0 &&
      Title.length === 0 &&
      locationdata.length === 0 &&
      done === "All" ? (
        <Text className={styles.quickfilonlyall}> {done}</Text>
      ) : done === "All" ? ( 
      " "
      ) : (
        <Text className={styles.quickfil}>
          {" "}
          {done}
          <SvgIntomark
            className={styles.stylesvg}
            onClick={() => closestatus()}
          />
        </Text>
      )}

      {/* {data.length > 0?(done === "All" ? (
      
      ""
      ) : (
        <Text className={styles.quickfil}>
          {" "}
          {done}
          <SvgIntomark
            className={styles.stylesvg}
            onClick={() => closestatus()}
          />
        </Text>
      )):("")} */}
      {/* {done == "All" ? (
        <Text className={styles.quickfil}> {done}</Text>
      ) : (
        <Text className={styles.quickfil}>
          {" "}
          {done}
          <SvgIntomark
            className={styles.stylesvg}
            onClick={() => closestatus()}
          />
        </Text>
      )} */}

      {data !== "" ? (
        <Text className={styles.quickfil}>
          {data}{" "}
          <SvgIntomark className={styles.stylesvg} onClick={() => close()} />
        </Text>
      ) : (
        " "
      )}

      {  date !== ""   ? (
        <Text className={styles.quickfil}>
          {date}{" "}
          <SvgIntomark
            className={styles.stylesvg}
            onClick={() => closedate()}
          />
        </Text>
      ) : (
         " "
        // " "
      )}
      {Title !== "" ? (
        <Text className={styles.quickfil}>
          {Title}{" "}
          <SvgIntomark
            className={styles.stylesvg}
            onClick={() => closetitle()}
          />
        </Text>
      ) : (
        ""
      )}

      {locationdata !== "" ? (
        <Text className={styles.quickfil}>
          {locationdata}{" "}
          <SvgIntomark
            className={styles.stylesvg}
            onClick={() => closelocationdata()}
          />
        </Text>
      ) : (
        ""
      )}

      <div ref={dropDownRef} className={styles.drop_down}>
        <Flex
          row
          className={styles.drop_down_header}
          
        >
          <Flex
          onClick={() => {
            setShowDropDown((value) => !value);
            // console.log(showDropDown,'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
          }}>
            <Text
              bold
              className={styles.filtername}
              style={{ cursor: "Pointer",paddingTop:7,fontSize:14,paddingRight:"120px"}}
            >
              View Filter
            </Text>
          </Flex>

        
          <Flex title={"Clear Filters"}>
            <SvgRefresh
              width={18}
              height={18}
              onClick={pageReload}
              className={styles.filtersvg}
            />
          </Flex>
        </Flex>
        <div
          className={`${styles.drop_down_menus} ${
            showDropDown ? styles.show : ""
          }`}
        >
          <Flex className={styles.mtstyle}   >
            <div  >
              <Text className={styles.jobTextStyle}>Job Title</Text>
              
              <Flex className={styles.hoverbox}>
              <InputSearch
                initialValue={formik.values.jobTitle}
                setFieldValue={formik.setFieldValue}
                options={job_title}  
                placeholder="Enter a job title"
                style={styles.boxstyle}
                name="jobTitle"  
                onkeyPress={(event) => {
                  if (event.key === "Enter") {
                    formik.setFieldValue("jobTitle", event.target.value); 
                  } 
                }} /> 
             
              
              
              </Flex>
             
            </div>
          </Flex>
          <Flex className={styles.mtstyle}> 
            <Text className={styles.jobTextStyle}>Job ID</Text>
            
            <InputSearch
              style={styles.boxstyle}
              initialValue={formik.values.jobId}
              options={job_ids}
              placeholder="Enter a job id"
            
              // labelBold
              setFieldValue={formik.setFieldValue} 
              inputRef={inputRef}
              name="jobId"
              // // eslint-disable-next-line jsx-a11y/no-autofocus
              // autoFocus
              onkeyPress={(event) => {
                if (event.key === "Enter") {
                  formik.setFieldValue("jobId", event.target.value);
                }
              }} 
            />  
          </Flex>

          <Flex className={styles.mtstyle}>
            <div className={styles.skillContainer}>
              <Text className={styles.jobTextStyle} >Job Status</Text>
              <Flex marginTop={5} className={styles.matchRadioStyling}  >
                {jobTypeData.map((jobList) => {
                  return (
                    <Flex
                      
                      key={jobList.value}
                      width={jobList.width}
                      className={styles.matchRadioStyle}
                    >
                      <InputRadio
                        // className={styles.checkbox}
                        label={jobList.value}
                        checked={jobList.label === formik.values.jobType}
                        onClick={() =>{
                          formik.setFieldValue("jobType", jobList.label) 
                           
                        }
                        }
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </div>
          </Flex>
          
          <Flex className={styles.mtstyle}>
            <div className={styles.inputmargin}>
              <Text className={styles.jobTextStyle}>Job posted on</Text>
              <div   className={styles.selectoptions} >
             
              <SelectTag
              linechange 
               value={ 
                  postedOn
                    ?  postedOn.find(
                      (option) =>
                        option.value === formik.values.postedOn.value
                    )
                    :  ' '
                }  
                options={postedOn} 
                               
                onChange={(options) => {
                  
                formik.setFieldValue("postedOn",options)
                }} 
              />
              </div>
            </div>
          </Flex>
          
          {/* <Flex className={styles.mtstyle}
            <div className={styles.skillContainer}>
            <Text
                
                className={styles.jobTextStyle}
              >
                Location
              </Text>
              <InputSearch
                initialValue={formik.values.jobTitle}
                placeholder="Enter job location"
                options={job_title}
                setFieldValue={formik.setFieldValue}
                name="jobtitle"
                // labelBold
                // label={"Location"}
                style={styles.boxstyle}
                onkeyPress={(event) => {
                  if (event.key === "Enter") {
                    formik.setFieldValue("jobtitle", event.target.value);
                  }

                }}
              />
            </div>
          </Flex> */}
          <Flex className={styles.mtstyle}>
            <div>
              <Text className={styles.jobTextStyle}>Location</Text>
              <InputSearch 
                initialValue={formik.values.location}
                placeholder="Enter job location"
                options={location_list}
                setFieldValue={formik.setFieldValue}
                name="location" 
                style={styles.boxstyle}
                onkeyPress={(event) => {
                  if (event.key === "Enter") {
                    formik.setFieldValue("location", event.target.value);
                     setShowDropDown(true)
                  }
                }}
              />
            </div>
          </Flex>

        
        </div>
      </div>
    </>
  );
};

export default MyJobsPostingFilter;
      