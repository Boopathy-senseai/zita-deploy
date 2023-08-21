import { Formik, FormikProps } from 'formik';
import escapeRegExp from 'lodash/escapeRegExp'; // eslint-disable-line
import { useMemo, useRef, useState, useEffect } from 'react';
import { set } from 'react-hook-form';
import SvgIntomark from '../../icons/Intomark';
import SvgRefresh from '../../icons/SvgRefresh';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { InputSwitch } from '../../uikit';
import { Button } from '../../uikit';
import { enterKeyPress, isEmpty } from '../../uikit/helper';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { MAX_DISPLAYED_OPTIONS } from '../constValue';
import { experienceOption, jobTypeData, myDataSkillList } from './mock';
import styles1 from './switch.module.css';
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
  setchange?: any;
};
const MyDataBaseFilter = ({
  formik,
  qualificationOption,
  hanldeRefresh,
  setchange,
}: Props) => {
  const [isSkills, setSkills] = useState<any>();
  const [isRelocate, setRelocate] = useState(false);
  const [isSearch, setSearch] = useState('');
  const [isOut, setOut] = useState(false);
  const [experience, setexperience] = useState('');
  const [present, setpresent] = useState(true);
  const [jobname, setjobname] = useState('');
  const [job, setjob] = useState(true);
  const [location, setlocation] = useState('');
  const [skill, setskill] = useState([]);
  const [qual, setqual] = useState([]);
  const [qual1, setqual1] = useState([]);
  const [isqualification, setqualification] = useState([]);

  const [newjobname, setnewjobname] = useState('');
  const [newexperience, setnewexperience] = useState('');
  const [newqual, setnewqual] = useState([]);
  const [newlocation, setnewlocation] = useState('');
  const [newskill, setnewskill] = useState([]);
  const [newrelocate, setnewrelocate] = useState(false);
  const [hiddenskills1, sethiddenskill1] = useState([]);

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
  const [skildata, setskildata] = useState([]);
  const click = () => {
    setShowDropDown(!showDropDown);
  };

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

  const handleselectskill = (option: any) => {
    formik.setFieldValue('skillValue', option);
    setskildata(option);
    setchange(true);
  };

  const hiddenSkills = skill.slice(4, skill.length);

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
  useEffect(() => {
    if (formik.values.jobType === '') {
      setjobname('');
    } else if (formik.values.jobType === '6') {
      setjobname('Permanent');
    } else if (formik.values.jobType === '3') {
      setjobname('Contract');
    }
  }, [formik.values.jobType, formik.values.skillValue]);

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
  useEffect(() => {
    if (formik.values.locationSearch !== '') {
      setlocation(formik.values.locationSearch);
    }
  }, [formik.values.locationSearch]);
  useEffect(() => {
    if (formik.values.skillValue.length !== 0) {
      setskill(
        formik.values.skillValue
          .filter((name) => name.value)
          .map((filter) => filter.value),
      );
    }
  }, [formik.values.skillValue]);
  useEffect(() => {
    if (formik.values.experience.value === ' ') {
      setexperience(' ');
      setpresent(false);
    } else if (formik.values.experience.value === '0-1') {
      setexperience(formik.values.experience.label);
    } else if (formik.values.experience.value === '1-2') {
      setexperience(formik.values.experience.label);
    } else if (formik.values.experience.value === '3-5') {
      setexperience(formik.values.experience.label);
    } else if (formik.values.experience.value === '6-10') {
      setexperience(formik.values.experience.label);
    } else if (formik.values.experience.value === '10+') {
      setexperience(formik.values.experience.label);
    }
  }, [formik.values.experience.value]);
  // filterv refresh function

  const filterRefresh = () => {
    hanldeRefresh();
    setSearch('');
    setRelocate(false);
    formik.resetForm()
    setSkills('')
    setnewjobname('')
    setnewexperience('')
    setexperience('')
    setnewqual([])
    setnewlocation('')
    setnewskill([])
    setnewrelocate(false)
    sethiddenskill1([])
    setskill([])
  };

  // close function
  const closeexp = () => {
    setexperience('');
    formik.setFieldValue('experience', '');
    setnewexperience('');
    setchange(false);
  };
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

  const handlefunction = (doc) => {
    {
      console.log('loggggggggggggg', doc);
    }
    var gremove = newqual.filter((obj) => obj.label !== doc.label);
    setnewqual(gremove);
    closeQualification(doc);
    setchange(false);
  };

  const closejob = () => {
    setjobname('');
    setnewjobname('');
    formik.setFieldValue('jobType', '');
    setchange(false);
  };

  const closerelocate = () => {
    setRelocate(false);
    setnewrelocate(false);
  };

  const locationsrh = () => {
    setlocation('');
    setnewlocation('');
    setSearch('');
    formik.setFieldValue('locationSearch', '');
    setchange(false);
  };
  const skillval = (id, val) => {
    console.log('rrr', val);
    var gremove = skildata.filter((obj) => obj.label !== val.label);
    setskildata(gremove);
    setnewskill(gremove);
    formik.setFieldValue('skillValue', gremove);
    setchange(false);
    if (skildata.length < 5) {
      sethiddenskill1(undefined);
    }
    // if(skill.length===0){
    //   setskill([]);
    //   formik.setFieldValue("skillValue","");
    // }
    //   skill.splice(id,1) ;
    //   formik.values.skillValue=skill;
    //   setskill(formik.values.skillValue)
  };
  const handlerelocate1 = () => {
    setRelocate(!isRelocate);
    setchange(true);
  };

  useEffect(() => {
    setQualificationValue(
      qualificationOption.filter((option) => option.checked),
    );
  }, [qualificationOption]);

  useEffect(() => {
    const ans = qualificationOption
      .filter((chek) => chek.checked !== false)
      .map((name) => name.value);
    if (qualificationOption.length !== 0 && ans.length !== 0) {
      setqual(ans);
    }
  }, [qualificationOption]);

  const closestatus1 = (id) => {
    const objIndex = qualificationOption.findIndex(
      (obj, index) => index === id,
    );
    qualificationOption[objIndex].checked = false;
  };

  const expe = formik.values.experience.label === 'All';
  const job_type = isEmpty(formik.values.jobType);
  const locsrc = isEmpty(formik.values.locationSearch);
  const skillvul = formik.values.skillValue.length === 0;
  const reloc = formik.values.reLocateValue === '0';
  const total = expe && job_type && locsrc && skillvul && reloc;

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

    return (
      <>
     {  console.log("doccccc",doc)}
      {doc.label !=="any"?(
      <Text className={styles.quickfil}>
      {doc.label}{" "}
      <SvgIntomark className={styles.stylesvg} onClick={onClose} />
            </Text>
            ):(
              setnewqual(null) )
                    }
     </>      
    );
  };

  const handlechange = () => {
    setShowDropDown(false);
    setnewjobname(jobname);
    setnewexperience(experience);
    setnewqual(qualificationValue);
    setnewlocation(location);
    setnewskill(skill);
    setnewrelocate(isRelocate);
    sethiddenskill1(hiddenSkills);
    setchange(false);
    console.log('5555555555555');
  };
  const handlerelocate = () => {
    setRelocate(!isRelocate);
    setchange(true);
  };

  const handlejoblist = (jobList: any) => {
    formik.setFieldValue('jobType', jobList);
    setchange(true);
  };

  const isDefaultFilter = () => {
    const skills = newskill || [];
    const qualification = newqual || [];
    if (
      (qualification?.length === 0 ) &&
      skills?.length === 0&&
      newjobname===''&&
      newexperience===''&&
      newlocation===''&&
      newrelocate!==true

    ) {
      return true;
    }
    return false;
  };
 return (
<>

<Flex row>
{console.log("newwwww",newjobname,isDefaultFilter(),newqual,qualificationValue,newskill)}
{console.log("olddddd",jobname)}
<div className={styles.quickfilters}>
<Text size={13}className={""} style={{marginTop:"3px"}}>
        Quick Filters :
      </Text>
      {newjobname===''?(
              null
            ): (
              <Text className={styles.quickfil}>
                {newjobname}{" "}
                <SvgIntomark
                  className={styles.stylesvg}
                  onClick={() => closejob()}
                />
              </Text>
            )
            }
  
            { newexperience===''?(
              null
            ) : (
              <Text className={styles.quickfil}>
              {newexperience}{" "}
              <SvgIntomark
                className={styles.stylesvg}
                onClick={() => closeexp()}
              />
            </Text>
            )
            }
            {isDefaultFilter() ? (
            <Text className={styles.quickfil}>{'All'}</Text>
          ) : (
            <Flex row wrap style={{display:"contents"}}>
      {newqual &&
        newqual.map((doc, index) => (
        
          <RenderQuickFilter
            key={index}
            doc={{ label: doc.label, value: doc.value }}
            onClose={() => handlefunction(doc)}
          />
        ))}
        
        {newskill.length=== 0?(
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
              {hiddenskills1 && hiddenskills1.length > 0 && (
                <Text
                  className={styles.quickfil}
                >{`Skills : + ${hiddenskills1.length}`}</Text>
              )}
            </Flex>
          )}
            
            {newlocation===''?(
              null
            ): (
              <Text className={styles.quickfil}>
                {newlocation}{" "}
                <SvgIntomark
                  className={styles.stylesvg}
                  onClick={() => locationsrh()}
                />
              </Text>
              
            )
            }
        
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
            
{newrelocate ?(
  <Text className={styles.quickfil}>
     {"Willing to Relocate"}{" "}
     <SvgIntomark
              className={styles.stylesvg}
              onClick={closerelocate}
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
      className={(styles.drop_down_header)}
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
      <Text color="primary" size={13} bold className={styles.jobTextStyle}>
      Job Type
    </Text>
    <Flex row center className={styles.filterstyle}  >
      {jobTypeData.map((jobList) => {
        return (
          <Flex row key={jobList.value} width={jobList.width} marginBottom="8px">
            <InputRadio
              label={jobList.value}
              checked={jobList.label === formik.values.jobType}
              onClick={()=>handlejoblist(jobList.label)}
            
            />
          </Flex>
        );
      })}
    </Flex>
      </Flex>

            <Flex className={styles.mtstyle}>
              <Flex className={styles.skillContainer}>
                <Text
                  color="primary"
                  bold
                  size={13}
                  style={{ marginBottom: '5px' }}
                >
                  Experience
                </Text>
                <SelectTag
                  labelBold
                  // label="Experience"
                  value={formik.values.experience}
                  options={experienceOption}
                  onChange={(option) => {
                    formik.setFieldValue('experience', option);
                    setchange(true);
                  }}
                />
              </Flex>
            </Flex>

            <Flex className={styles.mtstyle}>
              <Text
                color="primary"
                size={13}
                bold
                style={{ marginBottom: '5px' }}
                className={styles.qualificationTextStyle}
              >
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
                        onClick={() => setchange(true)}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
            <Flex className={styles.mtstyle}>
              {console.log('akak', skildata)}
              <div className={styles.skillContainer}>
                <Text
                  color="primary"
                  size={13}
                  bold
                  style={{ marginBottom: '5px' }}
                >
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
                <Text
                  color="primary"
                  size={13}
                  bold
                  style={{ marginBottom: '5px' }}
                >
                  Location
                </Text>
                <InputText
                  ref={myRef}
                  inputConatinerClass={styles.locantionStyle}
                  // label="Location"
                  labelBold
                  value={isSearch}
                  onChange={(e) => (setSearch(e.target.value), setchange(true))}
                  onKeyPress={(e) => enterKeyPress(e, handleLocation)}
                  placeholder="Enter candidate location"
                />
              </div>
            </Flex>
            <div className={styles.mtstyle}>
              <Flex row>
                <Flex className={styles.switch}>
                  {/* <label className={styles1.toggleswitch} >
          <input type="checkbox" checked={isRelocate}
          onChange={() => setRelocate(!isRelocate)} />
           <span className={styles1.switch} />
           </label> */}
           <InputSwitch
            onClick={handlerelocate1}
            checked={isRelocate}
           />
      </Flex>
        <Text color= "primary"  className={styles.toggletext}>
            Willing to Relocate
        </Text>
      </Flex>
     </div>
     <div className={styles.filterContainer} >
     <Button
     className={styles.buyBtn}
     onClick={handlechange}
   >
    Apply
   </Button>
   </div>
  
    </div>
    </div>
    </Flex>
</>
     );
};
export default MyDataBaseFilter;
