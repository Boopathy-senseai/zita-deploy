import { Formik, FormikProps } from 'formik';
import escapeRegExp from 'lodash/escapeRegExp'; // eslint-disable-line
import { useMemo, useRef, useState, useEffect } from 'react';
import ReactSwitch from 'react-switch';

import SvgIntomark from '../../icons/Intomark';
import SvgRefresh from '../../icons/SvgRefresh';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { enterKeyPress, isEmpty } from '../../uikit/helper';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { MAX_DISPLAYED_OPTIONS } from '../constValue';
import { experienceOption, jobTypeData, myDataSkillList } from './mock';
import styles1 from "./switch.module.css";
import styles from './mydatabasefilter.module.css';
import { MyDataFormProps } from './MyDataBaseScreen'; // eslint-disable-line


type Props = {
  formik: FormikProps<MyDataFormProps>;
  qualificationOption: {
    value: string;
    label: string;
    checked: boolean;
    onChange: () => void;
    width: number;
  }[];
  hanldeRefresh: () => void;
};

const MyDataBaseFilter = ({
  formik,
  qualificationOption,
  hanldeRefresh,
}: Props) => {
  const [isSkills, setSkills] = useState<any>();
  const [isRelocate, setRelocate] = useState(false);
  const [isSearch, setSearch] = useState('');
  const [isOut, setOut] = useState(false);
  const [experience, setexperience] = useState("");
  const [present,setpresent]=useState(true);
  const [jobname,setjobname]=useState("")
  const [job,setjob]=useState(true);
  const [location,setlocation]=useState("")
  const [skill,setskill]=useState([])
  const [qual,setqual]=useState([])
  const [qual1,setqual1]=useState([])
  const [qualificationValue, setQualificationValue] = useState<
  | {
      value: string;
      label: string;
      checked: boolean;
      onChange: () => void;
    }[]
  | undefined
>();

  const selectInputRef = useRef<any>();
  const myRef = useRef<any>();
  const dropDownRef = useRef(null);
  const [showDropDown, setShowDropDown] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!isSkills) {
      return myDataSkillList;
    }
    const matchByStart = [];
    const matchByInclusion = [];
    const regByInclusion = new RegExp(escapeRegExp(isSkills), 'i');
    const regByStart = new RegExp(`^${escapeRegExp(isSkills)}`, 'i');
    for (const option of myDataSkillList) {
      if (regByInclusion.test(option.label)) {
        if (regByStart.test(option.label)) {
          matchByStart.push(option);
        } else {
          matchByInclusion.push(option);
        }
      }
    }
    return [...matchByStart, ...matchByInclusion];
  }, [isSkills]);
  const slicedOptions = useMemo(
    () => filteredOptions.slice(0, MAX_DISPLAYED_OPTIONS),
    [filteredOptions],
  );

  useEffect(() => {
    if (isRelocate === true) {
      formik.setFieldValue('reLocateValue', '1');
    }
    if (isRelocate !== true) {
      formik.setFieldValue('reLocateValue', '0');
    }
  }, [isRelocate]);

  useEffect(() => {
    if (isSearch !== '') setOut(true);
  }, [isSearch]);

  const handleLocation = () => {
    formik.setFieldValue('locationSearch', isSearch);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target) && isOut) {
      handleLocation();
      setOut(false);
    }
  };

  useEffect(() => {
    if (typeof Window !== 'undefined') {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      if (myRef) {
        if (typeof Window !== 'undefined') {
          document.removeEventListener('click', handleClickOutside, true);
        }
      }
    };
  });
  useEffect(()=>{
    if(formik.values.jobType === " "){
      setjobname("Any");
    }else if (formik.values.jobType === "6") {
      setjobname("Permanent");
    }else if (formik.values.jobType === "3") {
      setjobname("Contract");
    }
  },[formik.values.jobType])
  // useEffect(() => {
  //   if (formik.values.jobType === "1") {
  //      setexperience("Active");
  //   } else if (formik.values.jobType === "4") {
  //     setdone("Inactive");
  //   } else if (formik.values.jobType === "2,5,6") {
  //     setdone("Draft");
  //   } else if (formik.values.jobType === "") {
  //     setdone("All");
  //     setdata("");
  //     setdate("");
  //     setTitle("");
  //     setlocationdata("");
  //   }


    
  //   setTitle(formik.values.jobTitle);
    
  // }, [
    
  //   formik.values.jobType,
  //   formik.values.jobTitle,
  
  // ]);
  useEffect(()=>{
    if(formik.values.locationSearch !==''){
      setlocation(formik.values.locationSearch);
    }
   
  },[formik.values.locationSearch])

  useEffect(()=>{
    if(formik.values.skillValue.length !== 0){
      setskill(formik.values.skillValue.filter(name=>name.value).map(filter=>filter.value))
    }
   
  },[formik.values.skillValue])

  useEffect(() => {
    if (formik.values.experience.value === ' ') {
      setexperience(" ");
      console.log("55555555555555555555555")
      setpresent(false);
    } else if (formik.values.experience.value === "0-1") {
      setexperience(formik.values.experience.label);
    } else if (formik.values.experience.value === "1-2") {
      setexperience(formik.values.experience.label);
    } else if (formik.values.experience.value=== "3-5") {
      setexperience(formik.values.experience.label);
    } 
    else if (formik.values.experience.value=== "6-10") {
      setexperience(formik.values.experience.label);
    }  
    else if (formik.values.experience.value=== "10+") {
      setexperience(formik.values.experience.label);
    }   
  }, [
        formik.values.experience.value,  
  ]);
  
// filterv refresh function
  const filterRefresh = () => {
    
    hanldeRefresh();
    setSearch('');
    setRelocate(false);
    formik.resetForm()
  };


  const closeexp = () => {
    setexperience('');
    formik.setFieldValue("experience","");
  }  

  const closequal = () => {
    setqual([]);
    
      // const obj=qualificationOption.map(name=>name.checked===true).findIndex(name=>name.);
    //  qualificationOption[objIndex].checked = false;
     console.log("hello");
     };

     const closeQualification = (doc: {
      value: string;
      label: string;
      checked: boolean;
      onChange: () => void;
    }) => {
      doc.onChange();
    };

  const closejob = () => {
  setjobname('');
  formik.setFieldValue("jobType","");
  };
  
  const locationsrh = () => {
    setlocation('');
    setSearch('')
    formik.setFieldValue("locationSearch","");
    };

    const skillval = (id) => {
      console.log("id++++++++++++",id);
      setskill(skill.splice(id,1) );
      console.log("new change",skill);
      // formik.setFieldValue("skillValue",skill);
      // if(skill.length===1){
      // setskill([]);
      // formik.setFieldValue("skillValue","");}
      };
  useEffect(() => {
    setQualificationValue(
      qualificationOption.filter((option) => option.checked),     
    );
  }, [qualificationOption]);
  useEffect(()=>{
    const ans=qualificationOption.filter(chek=>chek.checked !== false).map(name=>name.value);
    if(qualificationOption.length !== 0 && ans.length !==0){
      setqual(ans);
    }
   console.log("ans",ans);
  },[qualificationOption])


    const closestatus1 = (id) => {
      
     const objIndex = qualificationOption.findIndex((obj,index)=> index === id); 
     qualificationOption[objIndex].checked = false
     console.log("index111111111",objIndex)
     console.log("new quali",qualificationOption)
     };

  const expe=formik.values.experience.label==="All";
  const job_type=isEmpty(formik.values.jobType);
  const locsrc=isEmpty(formik.values.locationSearch);
  const skillvul=formik.values.skillValue.length===0;
  const reloc=formik.values.reLocateValue==="0";
  const total=expe&&job_type&&locsrc&&skillvul&&reloc;
  console.log("qua",qualificationOption);
  console.log("formik",formik.values);
  // console.log("total",total,expe,job_type,locsrc,skillvul);
  console.log("skill",skill);

  // {qualificationOption.map((val,int)=>(
  //   <>
  //   {val.checked===true?(
  //     <>
  //     <Text className={styles.quickfil}> {val.value}
  //     <SvgIntomark
  //     className={styles.stylesvg}
  //     onClick={() => closestatus1(int)}
  //   />
  //   </Text>
  //   </>
  //     ) : (
  //       " " )        
  //   }
  //   </>
  //   ))}
  const RenderQuickFilter = (props: {
    doc?: { label: string; value: any };
    onClose: () => void;
  }) => {
    const { doc, onClose } = props;
    if (doc === undefined) {
      return null;
    }
    if (doc && (doc.value === '' || doc.value === 'any')) {
      return null;
    }
    // if (doc && (doc.value === 'any')) {
    //   return <Text className={styles.quickfil}>{doc.label}</Text>;
    // }
    return (
      <>{doc.label !=="any"&&(
      <Text className={styles.quickfil}>
      {doc.label}{" "}
      <SvgIntomark className={styles.stylesvg} onClick={onClose} />
            </Text>
            )}
             {doc.label ==="any" &&total&&(
              <Text className={styles.quickfil}>
              {"Any"}
              
                    </Text>
                    )}
     </>       
    );
  };

 
 
  return (
<>


<Text className={""} style={{ color: "#581845" }}>
        Quick Filters :
      </Text>
      {qualificationValue &&
        qualificationValue.map((doc, index) => (
          <RenderQuickFilter
            key={index}
            doc={{ label: doc.label, value: doc.value }}
            onClose={() => closeQualification(doc)}
          />
        ))}
            {formik.values.experience.label ==="All"|| experience===''?(
              null
            ): (
              <Text className={styles.quickfil}>
              {experience}{" "}
              <SvgIntomark
                className={styles.stylesvg}
                onClick={() => closeexp()}
              />
            </Text>
            )
            }
            {formik.values.jobType ===''||jobname===''?(
              null
            ): (
              <Text className={styles.quickfil}>
                {jobname}{" "}
                <SvgIntomark
                  className={styles.stylesvg}
                  onClick={() => closejob()}
                />
              </Text>
            )
            }
            {formik.values.locationSearch ===''||location===''?(
              null
            ): (
              <Text className={styles.quickfil}>
                {location}{" "}
                <SvgIntomark
                  className={styles.stylesvg}
                  onClick={() => locationsrh()}
                />
              </Text>
            )
            }
            {formik.values.skillValue.length === 0||skill.length=== 0?(
              null
            ): (
              skill.map((skills,index) =>
              <Text className={styles.quickfil} key={skills}>

                {skills}{" "}
                <SvgIntomark
                  className={styles.stylesvg}
                  onClick={() => skillval(index)}
                />
              </Text>
              )
            )
            }


    <div ref={dropDownRef} className={styles.drop_down} style={{ zIndex: 1}}>
    <Flex
      row
      className={styles.drop_down_header}
      onClick={() => {
        setShowDropDown((value) => !value);
      }}
    >
      <Flex>
        <Text
          bold
          className={styles.filtername}
          style={{ cursor: "Pointer",paddingTop:7,fontSize:14 }}
        >
          View Filter
        </Text>
      </Flex>
    
    
      <Flex title={"Clear Filters"}>
        <SvgRefresh
          width={18}
          height={18}
          onClick={filterRefresh}
          className={styles.filtersvg}
        />
      </Flex>
    </Flex>
    <div
      className={`${styles.drop_down_menus} ${
        showDropDown ? styles.show : ""
      }`}
    >
      <Flex className={styles.mtstyle}>
        
      <Text color="black" bold className={styles.jobTextStyle}>
      Job Type
    </Text>
    <Flex row center className={styles.filterstyle}  >
      {jobTypeData.map((jobList) => {
        return (
          <Flex row key={jobList.value} width={jobList.width}>
            <InputRadio
              label={jobList.value}
              checked={jobList.label === formik.values.jobType}
              onClick={() => formik.setFieldValue('jobType', jobList.label)}
            />
          </Flex>
        );
      })}
    </Flex>
      </Flex>
    
      <Flex className={styles.mtstyle}>
        <Flex className={styles.skillContainer} >
        <SelectTag
        labelBold
        label="Experience"
        value={formik.values.experience}
        options={experienceOption}
        onChange={(option) => {
          formik.setFieldValue('experience', option);
        }}
      />      
        </Flex>
      </Flex>
    
      <Flex className={styles.mtstyle}>
      <Text color="black" bold className={styles.qualificationTextStyle}>
      Qualification
    </Text>
    <Flex row center wrap>
      {qualificationOption.map((qualificationList) => {
        return (
          <Flex
            row
            key={qualificationList.value}
            className={styles.qualificationRadioStyle}
            width={qualificationList.width}
          >
            <InputCheckBox
              label={qualificationList.value}
              checked={qualificationList.checked}
              onChange={qualificationList.onChange}
            />
          </Flex>
        );
      })}
    </Flex>
      </Flex>
      <Flex className={styles.mtstyle}   >
        <div className={styles.skillContainer}>
              <SelectTag
                label="Skills"
                labelBold
                ref={selectInputRef}
                isMulti
                options={slicedOptions}
                onInputChange={(value) => setSkills(value)}
                onChange={(option) => {
                  formik.setFieldValue('skillValue', option);
                }}
                isSearchable
                isCreate
                value={formik.values.skillValue}
              />
            </div>
      </Flex>
     
      <Flex className={styles.mtstyle}>
        <div>
          <InputText
              ref={myRef}
              inputConatinerClass={styles.locantionStyle}
              label="Location"
              labelBold
              value={isSearch}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => enterKeyPress(e, handleLocation)}
              placeholder="Enter candidate location"
            />
        </div>
      </Flex>
      <div className={styles.mtstyle}> 
      <Flex row >
        <Flex>
          <label className={styles1.toggleswitch} >
          <input type="checkbox" checked={isRelocate}
          onChange={() => setRelocate(!isRelocate)} />
           <span className={styles1.switch} />
           </label>
      </Flex>
        <Flex style={{marginLeft:'15px'}}>
            {"  "}Willing to Relocate
        </Flex>
      </Flex>
  
      </div>
    
    
    </div>
    </div>
</>
     );
};

export default MyDataBaseFilter;

// <InputCheckBox
//                 label="Show candidates willing to relocate"
//                 checked={isRelocate}
//                 onChange={() => setRelocate(!isRelocate)}
//               />
// {data !== "" ? (
//   <Text className={styles.quickfil}>
//     {data}{" "}
//     <SvgIntomark className={styles.stylesvg} onClick={() => close()} />
//   </Text>
// ) : (
//   " "
// )}

// {  date !== ""   ? (
//   <Text className={styles.quickfil}>
//     {date}{" "}
//     <SvgIntomark
//       className={styles.stylesvg}
//       onClick={() => closedate()}
//     />
//   </Text>
// ) : (
//    " "
//   // " "
// )}
// {Title !== "" ? (
//   <Text className={styles.quickfil}>
//     {Title}{" "}
//     <SvgIntomark
//       className={styles.stylesvg}
//       onClick={() => closetitle()}
//     />
//   </Text>
// ) : (
//   ""
// )}

// {locationdata !== "" ? (
//   <Text className={styles.quickfil}>
//     {locationdata}{" "}
//     <SvgIntomark
//       className={styles.stylesvg}
//       onClick={() => closelocationdata()}
//     />
//   </Text>
// ) : (
//   ""
// )}



// <Card className={styles.overAll}>
// <Flex row center className={styles.filterStyle}>
//   <Text bold size={16}>Filters</Text>
//   <div
//     title="Refresh Filters"
//     className={styles.svgRefresh}
//     onClick={filterRefresh}
//     tabIndex={-1}
//     role={'button'}
//     onKeyPress={() => {}}
//   >
//     <SvgRefresh width={22} height={22} />
//   </div>
// </Flex>
// <Flex
//   columnFlex
//   className={styles.filterContainer}
//   maxHeight={window.innerHeight - 150}
// >
//   <Text color="black" bold className={styles.jobTextStyle}>
//     Job Type
//   </Text>
//   <Flex row center>
//     {jobTypeData.map((jobList) => {
//       return (
//         <Flex row key={jobList.value} width={jobList.width}>
//           <InputRadio
//             label={jobList.value}
//             checked={jobList.label === formik.values.jobType}
//             onClick={() => formik.setFieldValue('jobType', jobList.label)}
//           />
//         </Flex>
//       );
//     })}
//   </Flex>
//   <div className={styles.expContainer}>
//     <SelectTag
//       labelBold
//       label="Experience"
//       value={formik.values.experience}
//       options={experienceOption}
//       onChange={(option) => {
//         formik.setFieldValue('experience', option);
//       }}
//     />
//   </div>
//   <Text color="black" bold className={styles.qualificationTextStyle}>
//     Qualification
//   </Text>
//   <Flex row center wrap>
//     {qualificationOption.map((qualificationList) => {
//       return (
//         <Flex
//           row
//           key={qualificationList.value}
//           className={styles.qualificationRadioStyle}
//           width={qualificationList.width}
//         >
//           <InputCheckBox
//             label={qualificationList.value}
//             checked={qualificationList.checked}
//             onChange={qualificationList.onChange}
//           />
//         </Flex>
//       );
//     })}
//   </Flex>
//   <div className={styles.skillContainer}>
//     <SelectTag
//       label="Skills"
//       labelBold
//       ref={selectInputRef}
//       isMulti
//       options={slicedOptions}
//       onInputChange={(value) => setSkills(value)}
//       onChange={(option) => {
//         formik.setFieldValue('skillValue', option);
//       }}
//       isSearchable
//       isCreate
//       value={formik.values.skillValue}
//     />
//   </div>
//   <InputText
//     ref={myRef}
//     inputConatinerClass={styles.locantionStyle}
//     label="Location"
//     labelBold
//     value={isSearch}
//     onChange={(e) => setSearch(e.target.value)}
//     onKeyPress={(e) => enterKeyPress(e, handleLocation)}
//     placeholder="Enter candidate location"
//   />
//   <div className={styles.expContainer}>
//     <InputCheckBox
//       label="Show candidates willing to relocate"
//       checked={isRelocate}
//       onChange={() => setRelocate(!isRelocate)}
//     />
//   </div>
// </Flex>
// </Card>
