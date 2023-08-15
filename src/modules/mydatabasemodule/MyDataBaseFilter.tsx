import { Formik, FormikProps } from 'formik';
import escapeRegExp from 'lodash/escapeRegExp'; // eslint-disable-line
import { useMemo, useRef, useState, useEffect } from 'react'; 
import { set } from 'react-hook-form';
import SvgIntomark from '../../icons/Intomark';
import SvgRefresh from '../../icons/SvgRefresh';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { InputSwitch } from '../../uikit';
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
  const [isqualification, setqualification]=useState([])
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
  const [skildata,setskildata]=useState([])
  const click=()=>{
    setShowDropDown(!showDropDown)
  }

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

  const handleselectskill=(option: any) => {
    formik.setFieldValue('skillValue', option);
    setskildata(option)
  }

  const hiddenSkills =skill.slice(4, skill.length);

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
  },[formik.values.jobType,formik.values.skillValue])

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
    setSkills('')
  };
  
  const closeexp = () => {
    setexperience('');
    formik.setFieldValue("experience","");
  }  
  const closequal = () => {
    setqual([]);
      // const obj=qualificationOption.map(name=>name.checked===true).findIndex(name=>name.);
    //  qualificationOption[objIndex].checked = false;
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
    const skillval = (id,val) => {

      console.log("rrr",val)
      var gremove = skildata.filter((obj) => obj.label !== val.label);

      setskildata(gremove);
      // if(skill.length===0){
      //   setskill([]);
      //   formik.setFieldValue("skillValue","");
      // }
      //   skill.splice(id,1) ;
      //   formik.values.skillValue=skill;
      //   setskill(formik.values.skillValue)
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
  },[qualificationOption])

    const closestatus1 = (id) => {
     const objIndex = qualificationOption.findIndex((obj,index)=> index === id);
     qualificationOption[objIndex].checked = false
     };

  const expe=formik.values.experience.label==="All";
  const job_type=isEmpty(formik.values.jobType);
  const locsrc=isEmpty(formik.values.locationSearch);
  const skillvul=formik.values.skillValue.length===0;
  const reloc=formik.values.reLocateValue==="0";
  const total=expe&&job_type&&locsrc&&skillvul&&reloc;


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
      <>
      {doc.label !=="any"?(
      <Text className={styles.quickfil}>
      {doc.label}{" "}
      <SvgIntomark className={styles.stylesvg} onClick={onClose} />
            </Text>
            ):(
              doc.label ==="any" &&(
                <Text className={styles.quickfil}>
                {"Any"}
                      </Text>
                      ) )
                    }
     </>      
    );
  };

  const closeSkillOption = (doc: { value: string; label: string }) => {
    const newOptions = [...skill];

    const indx = newOptions.indexOf(doc);
    if (indx !== -1) {
      newOptions.splice(indx, 1);
      setSkills(newOptions);
      return;
    }
  };
  const isDefaultFilter = () => {
    const qualification = (qualificationValue || []).filter(
      (doc) => doc.value !== 'any',
    );
    const skills = skill || [];
    if (
      qualification?.length === 0 &&
      skills?.length === 0
    ) {
      return true;
    }
    return false;
  };
 return (
<>
<Flex row>
<div className={styles.quickfilters}>
<Text size={13}className={""} style={{marginTop:"3px"}}>
        Quick Filters :
      </Text>
      {isDefaultFilter() ? (
            <Text className={styles.quickfil}>{'All'}</Text>
          ) : (
            <Flex row wrap style={{display:"contents"}}>
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
            ) : (
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
              {/* {skill &&
                showskills.map((doc, index) => (
                  <RenderQuickFilter
                    key={index}
                    doc={{ label: doc.label, value: doc.value }}
                    onClose={() => closeSkillOption(doc)}
                  />
                ))}
              {hiddenSkills && hiddenSkills.length > 0 && (
                <Text
                  className={styles.quickfil}
                >{`Skills : + ${hiddenSkills.length}`}</Text>
              )} */}
          {formik.values.skillValue.length === 0||skill.length=== 0?(
              null
            ) : (
              skildata.slice(0,4).map((skills,index) =>(
              <Text className={styles.quickfil} key={skills}>
                {skills.label}{" "}
                <SvgIntomark
                  className={styles.stylesvg}
                  onClick={() => skillval(index,skills)}
                />
              </Text>
              )))
              }
              {hiddenSkills && hiddenSkills.length > 0 && (
                <Text
                  className={styles.quickfil}
                >{`Skills : + ${hiddenSkills.length}`}</Text>
              )}
            </Flex>
          )}
      {/* {qualificationValue &&
        qualificationValue.map((doc, index) => (
          <RenderQuickFilter
            key={index}
            doc={{ label: doc.label, value: doc.value }}
            onClose={() => closeQualification(doc)}
          />
        ))}
            {formik.values.experience.label ==="All"|| experience===''?(
              null
            ) : (
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
            ) : (
              showskills.map((skills,index) =>(
              <Text className={styles.quickfil} key={skills}>
                {skills}{" "}
                <SvgIntomark
                  className={styles.stylesvg}
                  onClick={() => skillval(index)}
                />
              </Text>
              )))
              }
              {hiddenSkills && hiddenSkills.length > 0 && (
                <Text
                  className={styles.quickfil}
                >{`Skills : + ${hiddenSkills.length}`}</Text>
              )} */}
            
{isRelocate ?(
  <Text className={styles.quickfil}>
     {"Willing to Relocate"}{" "}
     <SvgIntomark
              className={styles.stylesvg}
              onClick={() => setRelocate(false)}
            />
   </Text>
) : (
null
)
}


</div>
    <div  ref={dropDownRef} className={styles.drop_down} style={{ zIndex: 1}}>
    <Flex
      row
      className={styles.drop_down_header}
    >
      <Flex style={{width:'90%'}}
      onClick={click} >
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
      <Text color="primary" size={14} bold className={styles.jobTextStyle}>
      Job Type
    </Text>
    <Flex row center className={styles.filterstyle}  >
      {jobTypeData.map((jobList) => {
        return (
          <Flex row key={jobList.value} width={jobList.width} marginBottom="8px">
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
        <Text color="primary" bold size={14} style={{marginBottom: "5px"}}>Experience</Text>
        <SelectTag
        labelBold
        // label="Experience"
        value={formik.values.experience}
        options={experienceOption}
        onChange={(option) => {
          formik.setFieldValue('experience', option);
        }}
      />      
        </Flex>
      </Flex>


     <Flex className={styles.mtstyle}>
      <Text color="primary" size={14} bold style={{marginBottom:"5px"}} className={styles.qualificationTextStyle}>
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
        {console.log("akak",skildata)}
        <div className={styles.skillContainer}>
        <Text color="primary" size={14} bold style={{marginBottom:"5px"}}>
      Skills
    </Text>
        <SelectTag
                // label="Skills"
                labelBold
                ref={selectInputRef}
                isMulti
                options={slicedOptions}
                onInputChange={(value) => setSkills(value)}
                onChange={handleselectskill}
                isSearchable
                isCreate
                value={formik.values.skillValue}
              />
              
            </div>
      </Flex>
     
      <Flex className={styles.mtstyle}>
        <div>
        <Text color="primary" size={14} bold style={{marginBottom:"5px"}}>
      Location
    </Text>
          <InputText
              ref={myRef}
              inputConatinerClass={styles.locantionStyle}
              // label="Location"
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
        <Flex className={styles.switch}>
          {/* <label className={styles1.toggleswitch} >
          <input type="checkbox" checked={isRelocate}
          onChange={() => setRelocate(!isRelocate)} />
           <span className={styles1.switch} />
           </label> */}
           <InputSwitch
            onClick={() => setRelocate(!isRelocate)}
            checked={isRelocate}
           />
      </Flex>
        <Text color= "primary" bold className={styles.toggletext}>
            Willing to Relocate
        </Text>
      </Flex>

     </div>
  
    </div>
    </div>
    </Flex>
</>
     );
};
export default MyDataBaseFilter;



 