import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import escapeRegExp from 'lodash/escapeRegExp'; // eslint-disable-line
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgRefresh from '../../icons/SvgRefresh';
import SvgIntomark from '../../icons/Intomark';
import Card from '../../uikit/Card/Card';
import InputText from '../../uikit/InputText/InputText';

import InputRadio from '../../uikit/InputRadio/InputRadio';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import { Button, InputSwitch } from '../../uikit';
import SvgSearch from '../../icons/SvgSearch';
import { MAX_DISPLAYED_OPTIONS } from '../constValue';
import { enterKeyPress } from '../../uikit/helper';
import styles from './zitamatchfilters.module.css';
import {
  candidateInviteStatus,
  experienceOption,
  jobTypeData,
  matchOptions,
  profileData,
  skillList,
} from './mock';
import { SkillListEntity } from './zitaMatchCandidateTypes';

type Props = {
  isSearch: string;
  setSearch: (arg: string) => void;
  handleSearchSubmit: () => void;
  hanldeMatch: (listValue: SkillListEntity) => void;
  isMatchRadio: string;
  handleExperience: (selectedValue: string) => void;
  setExperience: Dispatch<SetStateAction<string>>;
  setSkills: Dispatch<any>;
  setSkillOption: Dispatch<any>;
  setchange?: any;
  isSkills: any;
  isJobType: string;
  setJobType: (arg: string) => void;
  isProfile: string;
  profilevalue: string;
  hanldeProfile: (listValue: SkillListEntity) => void;
  qualificationOption: {
    value: string;
    label: string;
    checked: boolean;
    onChange: () => void;
    width: number;
  }[];
  isCandiStatus: string;

  setCandiStatus: (arg: string) => void;
  isRelocate: boolean;
  setRelocate:any;
  setLocation:any;
  handleRelocate: () => void;
  isLocation: boolean;
  isOther: boolean;
  isBachelors: boolean;
  isDoctorate: boolean;
  isdiploma:boolean;
  isMasters: boolean;
  isAny: boolean;
  handleLocation: () => void;
  hanldeRefresh: () => void;
  handleradiovclear: () => void;
  handleexpclear: () => void;
  hanleprofileclear: () => void;
  hanlejobtypeclear: () => void;
  handleBachelor: () => void;
  handleDiploma: () => void;
  handleDoctorate: () => void;
  handleMaster: () => void;
  handleOther: () => void;
  isExperience: any;
  isSkillOption: Array<{ value: string; label: string }>;
};
// const RenderQuickFilter = (props: {
//   doc?: { label: string; value: any };
//   onClose: () => void;
// }) => {
//   const { doc, onClose } = props;
//   if (doc === undefined) {
//     return null;
//   }
//   if (doc && (doc.value === '' || doc.value === 'any')) {
//     return null;
//   }}

const ZitaMatchFilters = ({
  setSearch,
  isSearch,
  handleSearchSubmit,
  hanldeMatch,
  handleOther,
  handleMaster,
  handleDiploma,
  handleDoctorate,
  handleBachelor,
  isMasters,
  isDoctorate,
  isBachelors,
  isOther, 
  isdiploma, 
  isSkillOption,
  isAny,
  isMatchRadio,
  handleExperience,
  setExperience,
  setSkills,
  setSkillOption,
  isSkills,
  isJobType,
  setJobType,
  isProfile,
  profilevalue,
  hanldeProfile,
  qualificationOption,
  isCandiStatus,
  setCandiStatus,
  hanlejobtypeclear,
  isRelocate,
  handleRelocate,
  handleLocation,
  isLocation,
  hanldeRefresh,
  handleradiovclear,
  hanleprofileclear,
  handleexpclear,
  isExperience,
  setchange,
  setLocation,
  setRelocate
}: Props) => {
  const selectInputRef = useRef<any>();
  const dropDownRef = useRef(null);
  const [isOut, setOut] = useState(false);
  const [match, setmatch] = useState('');

  const [getexperience, setexperience] = useState('');
  const [jobtype, setjobtype] = useState('');
  const [profile, setprofilevalue] = useState('');

  useEffect(() => {
    setmatch(isMatchRadio);
    setexperience(isExperience);
    setjobtype(isJobType);
    setprofilevalue(isProfile);
  }, [isMatchRadio, isJobType, isProfile, isExperience]);


  const [applimatch, setapplimatch] = useState('');
  const [appliexp, setappliexp] = useState('');
  const [applijobtype, setapplijobtype] = useState('');
  const [applieprofilevalue, setappliprofilevalue] = useState('');
  const [appliecandidate, setapplicandidate] = useState('');
  const [applieismaster, setapplieismaster] = useState(false);
  const [applieisdoctorate, setapplieisdoctorate] = useState(false);
  const [applieisbachelor, setapplieisbachelor] = useState(false);
  const [isDiploma, setapplieisDiploma] = useState(false);
  const [applieisother, setapplieisother] = useState(false);
  const [applieisany, setapplieisany] = useState(true);
  const [applieisrelocate, setapplieisrelocate] = useState(false);
  const [applieislocation, setapplieislocation] = useState(false);

  const myRef = useRef<any>();
  const [showDropDown, setShowDropDown] = useState(false);
  const filteredOptions = useMemo(() => {
    if (!isSkills) {
      return skillList;
    }
    const matchByStart = [];
    const matchByInclusion = [];
    const regByInclusion = new RegExp(escapeRegExp(isSkills), 'i');
    const regByStart = new RegExp(`^${escapeRegExp(isSkills)}`, 'i');
    for (const option of skillList) {
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
  const closematch = () => {
    handleradiovclear();
    setmatch('');
    setapplimatch('');
  };
  const closeexp = () => {
    handleexpclear();
    setexperience('');
    setappliexp('');
  };
  const closeprofile = () => {
    hanleprofileclear();
    setprofilevalue('');
    setappliprofilevalue('');
  };
  const closejobtype = () => {
    hanlejobtypeclear();
    setjobtype('');
    setapplijobtype('');
  };
  const closestatus = () => {
    setapplicandidate('');
    setCandiStatus('');
  };
  useEffect(() => {
    if (isSearch !== '') setOut(true);
  }, [isSearch]);

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target) && isOut) {
      handleSearchSubmit();
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

  const closerelocate = () => {
    setapplieisrelocate(false);
    setRelocate(false);
  };

  const closelocation = () => {
    setapplieislocation(false);
    setLocation(false);
   // handleLocation();
  };
  const sixty = '<= 60';
  const one = '> 90';
  const two = '> 80';
  const three = '> 70';
  const four = '> 60';
  const showSkills = isSkillOption.slice(0, 4);
  const hiddenSkills = isSkillOption.slice(4, isSkillOption.length);
  const [skill, setskill] = useState<{ value: string; label: string }[]>([]);
  const [hiddenSkills1, sethiddenSkills1] = useState<{ value: string; label: string }[]>();
  const [showskill1, setshowskill1] =
  useState<{ value: string; label: string }[]>();  


  // const closeSkillOption = (doc: { value: string; label: string }) => {
  //   const newOptions = [...isSkillOption];
  //   const indx = newOptions.indexOf(doc);
  //   if (indx !== -1) {
  //     newOptions.splice(indx, 1);
  //     setSkillOption(newOptions);
  //     setskill(newOptions);
  //     setshowskill1(newOptions);
  //     if (setshowskill1.length < 5) {
  //       sethiddenSkills1(undefined);
  //     }
        
  //     return;
  //   }
  // };
  const closeSkillOption = (doc: { value: string; label: string }) => {
    const newOptions = [...isSkillOption];
    const indx = newOptions.indexOf(doc);
    if (indx !== -1) {
  newOptions.splice(indx, 1);
  setSkillOption(newOptions);
  //setchange(true);

  // Now, update the showSkills and hiddenSkills1 based on the newOptions
  const showSkillsUpdated = newOptions.slice(0, 4);
  const hiddenSkillsUpdated = newOptions.slice(4);

  setskill(showSkillsUpdated);
  setshowskill1(showSkillsUpdated);

  if (hiddenSkillsUpdated.length === 0) {
    sethiddenSkills1(undefined);
  } else {
    sethiddenSkills1(hiddenSkillsUpdated);
  }

  return;
}
};
 

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
      <Flex row noWrap center className={styles.quickfil}>
        <Text style={{ marginRight: '10px' }}>{doc.label}</Text>
        <SvgIntomark onClick={onClose} style={{ cursor: 'pointer' }} />
      </Flex>
    );
  };
  const transverdata = () => {
    setapplimatch(match);
    setappliexp(getexperience);
    setapplijobtype(jobtype);
    setappliprofilevalue(profile);
    setapplicandidate(isCandiStatus);
    setapplieismaster(isMasters);
    setapplieisdoctorate(isDoctorate);
    setapplieisother(isOther);
    setapplieisbachelor(isBachelors);
    setapplieisDiploma(isdiploma)
    setapplieisany(isAny);
    setapplieisrelocate(isRelocate);
    setapplieislocation(isLocation);
    setskill(showSkills);
    setShowDropDown((value) => !value);
    setchange(false);
    setshowskill1(showSkills);
    sethiddenSkills1(hiddenSkills)
   // sethiddenSkills2(hiddenSkills.length)
  }
  const clearall=()=>{
    
    setapplimatch("");
    setappliexp("");
    setapplijobtype("");
    setappliprofilevalue("");
    setapplicandidate("");
    setapplieismaster(false);
    setapplieisdoctorate(false);
    setapplieisother(false);
    setapplieisbachelor(false);
    setapplieisDiploma(false)
    setapplieisany(true);
    setapplieisrelocate(false);
    setapplieislocation(false);
    setskill([]);
  }


  useEffect(() => {
    if (
      applieisbachelor===false &&
      applieisdoctorate===false&&
      applieismaster===false&&
      applieisother===false&&
      isDiploma === false
    ) {
      setapplieisany(true);
    }
  }, [isBachelors, isDoctorate, isMasters,isdiploma, isOther]); 
  return (
    <Flex row style={{ justifyContent: 'space-between' }}>

      <Flex row wrap>
      <Text size={13} style={{ whiteSpace: 'nowrap', marginTop: '3px' }}>
            Quick Filters :
          </Text>
        {
          // applimatch === "" && appliexp === "" && applijobtype === "" && applieprofilevalue === "" &&  appliecandidate === "" && applieisany === true && applieisrelocate === false && applieislocation === false && skill.length === 0
          applimatch === '' &&
          appliexp === '' &&
          applijobtype === '' &&
          applieprofilevalue === '' &&
          appliecandidate === '' &&
          applieisrelocate === false &&
          applieislocation === false &&
          applieisany === true&&
          skill.length===0
          
          ?
          (
            
            <Text className={styles.quickfil}>All</Text>
          ) : (
            <>
              {applimatch === '0-60' && (
                <Text className={styles.quickfil}>
                  {sixty}
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closematch()}
                  />
                </Text>
              )}
              {applimatch === '91-100' && (
                <Text className={styles.quickfil}>
                  {one}
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closematch()}
                  />
                </Text>
              )}
              {applimatch === '81-100' && (
                <Text className={styles.quickfil}>
                  {two}
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closematch()}
                  />
                </Text>
              )}
              {applimatch === '71-100' && (
                <Text className={styles.quickfil}>
                  {three}
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closematch()}
                  />
                </Text>
              )}
              {applimatch === '61-100' && (
                <Text className={styles.quickfil}>
                  {four}
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closematch()}
                  />
                </Text>
              )}
              {appliexp === '10-30' && (
                <Text className={styles.quickfil}>
                  10+ Years
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closeexp()}
                  />
                </Text>
              )}
              {appliexp === '0-1' && (
                <Text className={styles.quickfil}>
                  1 Year
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closeexp()}
                  />
                </Text>
              )}
              {appliexp === '1-2' && (
                <Text className={styles.quickfil}>
                  1-2 Years
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closeexp()}
                  />
                </Text>
              )}
              {appliexp === '2-3' && (
                <Text className={styles.quickfil}>
                  2-3 Years
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closeexp()}
                  />
                </Text>
              )}
              {appliexp === '3-5' && (
                <Text className={styles.quickfil}>
                  3-5 Years
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closeexp()}
                  />
                </Text>
              )}
              {appliexp === '6-10' && (
                <Text className={styles.quickfil}>
                  6-10 Years
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closeexp()}
                  />
                </Text>
              )}
              {applieprofilevalue !== '' && applieprofilevalue !== 'Both' && (
                <Text className={styles.quickfil}>
                  {profilevalue}
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closeprofile()}
                  />
                </Text>
              )}

              {applijobtype === '3' && (
                <Text className={styles.quickfil}>
                  Contract
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closejobtype()}
                  />
                </Text>
              )}
              {applijobtype === '6' && (
                <Text className={styles.quickfil}>
                  Permanent
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closejobtype()}
                  />
                </Text>
              )}
              {appliecandidate === '1' && (
                <Text className={styles.quickfil}>
                  Invited
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closestatus()}
                  />
                </Text>
              )}
              {appliecandidate === '0' && (
                <Text className={styles.quickfil}>
                  Uninvited
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closestatus()}
                  />
                </Text>
              )}
              {applieismaster === true && (
                <Text className={styles.quickfil}>
                  Masters
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => (handleMaster(), setapplieismaster(false))}
                  />
                </Text>
              )}
              {applieisdoctorate === true && (
                <Text className={styles.quickfil}>
                  Doctorate
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => (
                      handleDoctorate(), setapplieisdoctorate(false)
                    )}
                  />
                </Text>
              )}
              {applieisbachelor === true && (
                <Text className={styles.quickfil}>
                  Bachelors
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => (
                      handleBachelor(), setapplieisbachelor(false)
                    )}
                  />
                </Text>
              )} 
              {isDiploma === true && (
                <Text className={styles.quickfil}>
                   Diploma
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => (
                      handleDiploma(), setapplieisDiploma(false)
                    )}
                  />
                </Text>
              )}
              {applieisother === true && (
                <Text className={styles.quickfil}>
                  Others
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => (handleOther(), setapplieisother(false))}
                  />
                </Text>
              )}
              {applieisrelocate === true && (
                <Text className={styles.quickfil}>
                  Willing to relocate
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closerelocate()}
                  />
                </Text>
              )}
              {applieislocation === true && (
                <Text className={styles.quickfil}>
                  Job Location
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closelocation()}
                  />
                </Text>
              )}

              {skill &&
                showskill1.map((doc, index) => (
                  <RenderQuickFilter
                    key={index}
                    doc={{ label: doc.label, value: doc.value }}
                    onClose={() => closeSkillOption(doc)}
                  />
                ))}
              {hiddenSkills1 && hiddenSkills1.length>0 && hiddenSkills.length > 0 && (
                <Text
                  className={styles.quickfil}
                >{`Skills : + ${hiddenSkills1.length}`}</Text>
              )}
            </>
          )
        }
      </Flex>
      <Flex>
        <div ref={dropDownRef} className={styles.drop_down}>
          <Flex
            row
            center
            className={styles.drop_down_header}
            onClick={() => {
              setShowDropDown((value) => !value);
            }}
          >
            <Text bold color="theme" size={13}>
              View Filter
            </Text>
            <div title="Clear Filters" className={styles.svgRefresh}>
              <SvgRefresh
                width={18}
                height={18}
                onClick={(e) => {
                  selectInputRef.current.clearValue();
                  clearall();
                  hanldeRefresh();
                  e.stopPropagation();
                }}
              />
            </div>
          </Flex>
          <div
            className={`${styles.drop_down_menus} ${
              showDropDown ? styles.show : ''
            }`}
          >
            <Flex className={styles.mtstyle}>
              <Text bold className={styles.matchTextStyle}>
                Match Score
              </Text>
              <Flex row center wrap>
                {matchOptions.map((matchList) => {
                  return (
                    <Flex
                      row
                      key={matchList.value}
                      className={styles.matchRadioStyle}
                    >
                      <InputRadio
                        label={matchList.value}
                        checked={matchList.label === isMatchRadio}
                        onClick={() => (
                          hanldeMatch(matchList), setchange(true)
                        )}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>

            <Flex className={styles.mtstyleexp}>
              <div style={{ marginTop: 8, marginBottom: 16 }}>
                <Text
                  bold
                  className={styles.jobTextStyle}
                  style={{ marginBottom: '5px' }}
                >
                  Experience
                </Text>
                <div style={{ marginTop: '5px' }}>
                  <SelectTag
                    labelBold
                    value={
                      experienceOption
                        ? experienceOption.find(
                            (option: any) => option.value === isExperience,
                          )
                        : ''
                    }
                    options={experienceOption}
                    onChange={(option) => {
                      setExperience(option.value);
                      setchange(true);
                      handleExperience(option.value);
                    }}
                  />
                </div>
              </div>
            </Flex>

            <Flex className={styles.mtstyle}>
              <Text
                bold
                className={styles.jobTextStyle}
                style={{ marginBottom: '5px' }}
              >
                Skills
              </Text>
              <SelectTag
                isCreate
                isSearchable
                labelBold
                ref={selectInputRef}
                isMulti
                options={slicedOptions}
                onInputChange={(value) => setSkills(value)}
                onChange={(option) => {
                  setSkillOption(option);
                  setchange(true);
                }}
                value={isSkillOption}
              />
            </Flex>

            <Flex className={styles.mtstyle}>
              <Text bold className={styles.jobTextStyle}>
                Job Type
              </Text>
              <Flex row center className={styles.wrap} marginTop={3}>
                {jobTypeData.map((jobList) => {
                  return (
                    <Flex
                      row
                      key={jobList.value}
                      className={styles.jobTypeRadioStyle}
                      width={jobList.width}
                    >
                      <InputRadio
                        label={jobList.value}
                        checked={jobList.label === isJobType}
                        onClick={() => (
                          setJobType(jobList.label), setchange(true)
                        )}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>

            <Flex className={styles.mtstyle}>
              <Text bold className={styles.profileTextStyle}>
                Profile
              </Text>
              <Flex row center className={styles.wrap}>
                {profileData.map((profileList) => {
                  return (
                    <Flex
                      row
                      key={profileList.value}
                      className={styles.profileRadioStyle}
                      width={profileList.width}
                    >
                      <InputRadio
                        label={profileList.value}
                        checked={profileList.label === isProfile}
                        onClick={() => (
                          hanldeProfile(profileList), setchange(true)
                        )}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>

            <Flex className={styles.mtstyle}>
              <Text bold className={styles.qualificationTextStyle}>
                Qualification
              </Text>
              <Flex row center className={styles.wrap}>
                {qualificationOption.map((qualificationList) => {
                  return (
                    <Flex
                      row
                      key={qualificationList.value}
                      className={styles.qualificationRadioStyle}
                      width={90}
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
              <Text bold className={styles.candidateTextStyle}>
                Candidate Invite Status
              </Text>
              <Flex row center className={styles.wrap} marginTop={2}>
                {candidateInviteStatus.map((statusList) => {
                  return (
                    <Flex
                      row
                      key={statusList.value}
                      className={styles.profileRadioStyle}
                      width={statusList.width}
                    >
                      <InputRadio
                        label={statusList.value}
                        checked={statusList.label === isCandiStatus}
                        onClick={() => (
                          setCandiStatus(statusList.label), setchange(true)
                        )}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>

            <Flex row className={styles.mtstyle}>
              {/* <div className={styles.relocateText}>
            <InputCheckBox
              label="Show candidates willing to relocate"
              checked={isRelocate}
              onClick={handleRelocate}
            />
          </div> */}
              <Flex className={styles.switch}>
                <InputSwitch onClick={handleRelocate} checked={isRelocate} />
              </Flex>
              <Flex className={styles.toggletext}>Willing to relocate</Flex>
            </Flex>

            <Flex row className={styles.mtstyle}>
              {/* <InputCheckBox
            label="Show candidates from job location"
            checked={isLocation}
            onClick={handleLocation}
          /> */}
              <Flex className={styles.switch}>
                <InputSwitch onClick={handleLocation} checked={isLocation} />
              </Flex>
              <Flex className={styles.toggletext}>From job location</Flex>
            </Flex>
            <div
              // style={{
              //   padding: '6px',
              //   display: 'flex',
              //   justifyContent: 'center',
              //   alignItems: 'center',
              // }}
              className={styles.zitaFilterContainer}
            >
              <Flex>
                <Button onClick={transverdata}>Apply</Button>
              </Flex>
            </div>
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default ZitaMatchFilters;
