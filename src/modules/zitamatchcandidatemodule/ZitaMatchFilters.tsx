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
import { InputSwitch } from '../../uikit';
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
  handleRelocate: () => void;
  isLocation: boolean;
  isOther: boolean;
  isBachelors: boolean;
  isDoctorate: boolean;
  isMasters: boolean;
  isAny: boolean;
  handleLocation: () => void;
  hanldeRefresh: () => void;
  handleradiovclear: () => void;
  handleexpclear: () => void;
  hanleprofileclear: () => void;
  hanlejobtypeclear: () => void;
  handleBachelor: () => void;
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
  handleDoctorate,
  handleBachelor,
  isMasters,
  isDoctorate,
  isBachelors,
  isOther,
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
  isExperience
}: Props) => {
  const selectInputRef = useRef<any>();
  const dropDownRef = useRef(null);
  const [isOut, setOut] = useState(false);
  const [match, setmatch] = useState("");

  const [getexperience, setexperience] = useState("");
  const [jobtype, setjobtype] = useState("");
  const [profile, setprofilevalue] = useState("");

  useEffect(() => {
    setmatch(isMatchRadio);
    setexperience(isExperience);
    setjobtype(isJobType);
    setprofilevalue(isProfile);
  }, [isMatchRadio, isJobType, isProfile, isExperience]);
  console.log(isSkills, 'jjjoppk')
  console.log(profile, 'oppk')

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
    setmatch("");
  }
  const closeexp = () => {
    handleexpclear();
    setexperience("");
  }
  const closeprofile = () => {
    hanleprofileclear();
    setprofilevalue("");
  }
  const closejobtype = () => {
    hanlejobtypeclear();
    setjobtype("");

  }
  const closestatus = () => {
    setCandiStatus("");
  }
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
      console.log(isSkillOption, 'matchjjjkkk;232')
    };
  });
  const sixty = "<= 60"
  const one = "> 90"
  const two = "> 80"
  const three = "> 70"
  const showSkills = isSkillOption.slice(0, 4);
  const hiddenSkills = isSkillOption.slice(4, isSkillOption.length);
  const closeSkillOption = (doc: { value: string; label: string }) => {
    const newOptions = [...isSkillOption];
    const indx = newOptions.indexOf(doc);
    if (indx !== -1) {
      newOptions.splice(indx, 1);
      setSkillOption(newOptions);
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
        <Text style={{ marginRight: '10px' }}>
          {doc.label}
        </Text>
        <SvgIntomark onClick={onClose} style={{ cursor: 'pointer' }} />
      </Flex>
    );
  };

  return (
    // <Card className={styles.cardConatiner}>
    //   <Flex>
    //     <Flex row center className={styles.filterStyle}>
    //       <Text color="black" bold size={16}>
    //         Filters
    //       </Text>
    //       <div title="Refresh Filters" className={styles.svgRefresh}>
    //         <SvgRefresh
    //           onClick={() => {
    //             selectInputRef.current.clearValue();
    //             hanldeRefresh();
    //           }}
    //           width={22}
    //           height={22}
    //         />
    //       </div>
    //     </Flex>
    //     <Flex
    //       columnFlex
    //       className={styles.scrollStyle}
    //       maxHeight={window.innerHeight - 150}
    //     >
    //       <InputText
    //         ref={myRef}
    //         value={isSearch}
    //         onChange={(e) => setSearch(e.target.value)}
    //         id="zitamatchfilters__search"
    //         placeholder="Search candidates by name or email"
    //         actionRight={() => (
    //           <label
    //             htmlFor={'zitamatchfilters__search'}
    //             style={{ margin: 0 }}
    //             onClick={handleSearchSubmit}
    //             tabIndex={-1}
    //             role={'button'} // eslint-disable-line
    //             onKeyPress={() => {}}
    //           >
    //             <SvgSearch />
    //           </label>
    //         )}
    //         onKeyPress={(e) => enterKeyPress(e, handleSearchSubmit)}
    //       />
    //       <Text color="black" bold className={styles.matchTextStyle}>
    //         Match
    //       </Text>
    //       <Flex row center wrap>
    //         {matchOptions.map((matchList) => {
    //           return (
    //             <Flex
    //               row
    //               key={matchList.value}
    //               className={styles.matchRadioStyle}
    //               width={matchList.width}
    //             >
    //               <InputRadio
    //                 label={matchList.value}
    //                 checked={matchList.label === isMatchRadio}
    //                 onClick={() => hanldeMatch(matchList)}
    //               />
    //             </Flex>
    //           );
    //         })}
    //       </Flex>
    //       <div style={{ marginTop: 8, marginBottom: 16 }}>
    //         <SelectTag
    //           label="Experience"
    //           labelBold
    //           value={
    //             experienceOption
    //               ? experienceOption.find((option:any) => option.value === isExperience)
    //               : ''
    //           } 
    //           options={experienceOption}
    //           onChange={(option) => {
    //             setExperience(option.value);
    //             handleExperience(option.value);
    //           }}
    //         />
    //       </div>

    //       <SelectTag
    //         isCreate
    //         isSearchable
    //         label="Skills"
    //         labelBold
    //         ref={selectInputRef}
    //         isMulti
    //         options={slicedOptions}
    //         onInputChange={(value) => setSkills(value)}
    //         onChange={(option) => {
    //           setSkillOption(option);
    //         }}
    //       />
    //       <Text color="black" bold className={styles.jobTextStyle}>
    //         Job Type
    //       </Text>
    //       <Flex row center>
    //         {jobTypeData.map((jobList) => {
    //           return (
    //             <Flex
    //               row
    //               key={jobList.value}
    //               className={styles.jobTypeRadioStyle}
    //               width={jobList.width}
    //             >
    //               <InputRadio
    //                 label={jobList.value}
    //                 checked={jobList.label === isJobType}
    //                 onClick={() => setJobType(jobList.label)}
    //               />
    //             </Flex>
    //           );
    //         })}
    //       </Flex>
    //       <Text color="black" bold className={styles.profileTextStyle}>
    //         Profile
    //       </Text>
    //       <Flex row center>
    //         {profileData.map((profileList) => {
    //           return (
    //             <Flex
    //               row
    //               key={profileList.value}
    //               className={styles.profileRadioStyle}
    //               width={profileList.width}
    //             >
    //               <InputRadio
    //                 label={profileList.value}
    //                 checked={profileList.label === isProfile}
    //                 onClick={() => hanldeProfile(profileList)}
    //               />
    //             </Flex>
    //           );
    //         })}
    //       </Flex>
    //       <Text color="black" bold className={styles.qualificationTextStyle}>
    //         Qualification
    //       </Text>
    //       <Flex row center wrap>
    //         {qualificationOption.map((qualificationList) => {
    //           return (
    //             <Flex
    //               row
    //               key={qualificationList.value}
    //               className={styles.qualificationRadioStyle}
    //               width={qualificationList.width}
    //             >
    //               <InputCheckBox
    //                 label={qualificationList.value}
    //                 checked={qualificationList.checked}
    //                 onChange={qualificationList.onChange}
    //               />
    //             </Flex>
    //           );
    //         })}
    //       </Flex>
    //       <Text color="black" bold className={styles.candidateTextStyle}>
    //         Candidate Invite Status
    //       </Text>
    //       <Flex row center>
    //         {candidateInviteStatus.map((statusList) => {
    //           return (
    //             <Flex
    //               row
    //               key={statusList.value}
    //               className={styles.profileRadioStyle}
    //               width={statusList.width}
    //             >
    //               <InputRadio
    //                 label={statusList.value}
    //                 checked={statusList.label === isCandiStatus}
    //                 onClick={() => setCandiStatus(statusList.label)}
    //               />
    //             </Flex>
    //           );
    //         })}
    //       </Flex>
    //       <div className={styles.relocateText}>
    //         <InputCheckBox
    //           label="Show candidates willing to relocate"
    //           checked={isRelocate}
    //           onClick={handleRelocate}
    //         />
    //       </div>
    //       <InputCheckBox
    //         label="Show candidates from job location"
    //         checked={isLocation}
    //         onClick={handleLocation}
    //       />
    //     </Flex>
    //   </Flex>
    // </Card>
    <Flex row style={{ justifyContent: 'space-between' }}>
      <Flex row wrap>
      <Text style={{ whiteSpace: 'nowrap', marginTop: '3px' }}>
            Quick Filters :
          </Text>
        {
          match === "" && getexperience === "" && jobtype === "" && profile === "" && isCandiStatus === "" && isAny === true && isRelocate === false && isLocation === false && isSkillOption.length === 0 ? (
            <Text className={styles.quickfil}>All</Text>
          ) : (
            <>

              {match === "0-60" &&

                <Text className={styles.quickfil}>{sixty}
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closematch()
                    }
                  /></Text>
              }
              {match === "91-100" &&

                <Text className={styles.quickfil}>{one}
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closematch()
                    }
                  /></Text>
              }
              {match === "81-100" &&

                <Text className={styles.quickfil}>{two}
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closematch()
                    }
                  /></Text>
              }
              {match === "71-100" &&

                <Text className={styles.quickfil}>{three}
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closematch()
                    }
                  /></Text>
              }
              {
                isExperience !== "" &&
                <Text className={styles.quickfil}>{isExperience} Years
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closeexp()
                    }
                  /></Text>
              }
              {
                profilevalue !== "" &&
                <Text className={styles.quickfil}>{profilevalue}
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closeprofile()
                    }
                  /></Text>
              }

              {
                jobtype === "3" &&
                <Text className={styles.quickfil}>Contact
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closejobtype()
                    }
                  /></Text>
              }
              {
                jobtype === "6" &&
                <Text className={styles.quickfil}>Permanent
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closejobtype()
                    }
                  /></Text>
              }
              {
                isCandiStatus === "1" &&
                <Text className={styles.quickfil}>Invited
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closestatus()
                    }
                  /></Text>
              }
              {
                isCandiStatus === "0" &&
                <Text className={styles.quickfil}>UnInvited
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => closestatus()
                    }
                  /></Text>
              }
              {
                isMasters === true &&
                <Text className={styles.quickfil}>Masters
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => handleMaster()
                    }
                  /></Text>
              }
              {
                isDoctorate === true &&
                <Text className={styles.quickfil}>Doctorate
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => handleDoctorate()
                    }
                  /></Text>
              }
              {
                isBachelors === true &&
                <Text className={styles.quickfil}>Bachelors
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => handleBachelor()
                    }
                  /></Text>
              }
              {
                isOther === true &&
                <Text className={styles.quickfil}>Other
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => handleOther()
                    }
                  /></Text>
              }
              {
                isRelocate === true &&
                <Text className={styles.quickfil}>Relocate
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => handleRelocate()
                    }
                  /></Text>
              }
              {
                isLocation === true &&
                <Text className={styles.quickfil}>Job Location
                  <SvgIntomark
                    className={styles.stylesvg}
                    onClick={() => handleLocation()
                    }
                  /></Text>
              }

              {isSkillOption &&
                showSkills.map((doc, index) => (
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

            <Text bold color="theme" size={14}>
              View Filter
            </Text>
            <div title="Clear Filters" className={styles.svgRefresh}>
              <SvgRefresh
                width={18}
                height={18}
                onClick={(e) => {
                  selectInputRef.current.clearValue();
                  hanldeRefresh();
                  e.stopPropagation();
                }}
              />
            </div>
          </Flex>
          <div
            className={`${styles.drop_down_menus} ${showDropDown ? styles.show : ''
              }`}
          >
            <Flex className={styles.mtstyle}>
              <Text color="theme" bold className={styles.matchTextStyle}>
                Match
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
                        onClick={() => hanldeMatch(matchList)}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>

            <Flex className={styles.mtstyle}>
              <div style={{ marginTop: 8, marginBottom: 16 }}>
                <SelectTag
                  label="Experience"
                  labelBold
                  value={
                    experienceOption
                      ? experienceOption.find((option: any) => option.value === isExperience)
                      : ''
                  }
                  options={experienceOption}
                  onChange={(option) => {
                    setExperience(option.value);
                    handleExperience(option.value);
                  }}
                />
              </div></Flex>

            <Flex className={styles.mtstyle}>
              <SelectTag
                isCreate
                isSearchable
                label="Skills"
                labelBold
                ref={selectInputRef}
                isMulti
                options={slicedOptions}
                onInputChange={(value) => setSkills(value)}
                onChange={(option) => {
                  setSkillOption(option);
                }}
              /></Flex>

            <Flex className={styles.mtstyle}>
              <Text color="theme" bold className={styles.jobTextStyle}>
                Job Type
              </Text>
              <Flex row center className={styles.wrap}>
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
                        onClick={() => setJobType(jobList.label)}
                      />
                    </Flex>
                  );
                })}
              </Flex></Flex>


            <Flex className={styles.mtstyle}>
              <Text color="theme" bold className={styles.profileTextStyle}>
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
                        onClick={() => hanldeProfile(profileList)}
                      />
                    </Flex>
                  );
                })}
              </Flex></Flex>

            <Flex className={styles.mtstyle}>
              <Text color="theme" bold className={styles.qualificationTextStyle}>
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
                      />
                    </Flex>
                  );
                })}
              </Flex></Flex>


            <Flex className={styles.mtstyle}>
              <Text color="theme" bold className={styles.candidateTextStyle} >
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
                        onClick={() => setCandiStatus(statusList.label)}
                      />
                    </Flex>
                  );
                })}
              </Flex></Flex>

            <Flex row className={styles.mtstyle}>
              {/* <div className={styles.relocateText}>
            <InputCheckBox
              label="Show candidates willing to relocate"
              checked={isRelocate}
              onClick={handleRelocate}
            />
          </div> */}
              <Flex className={styles.switch}>

                <InputSwitch
                  onClick={handleRelocate}
                  checked={isRelocate}
                />
              </Flex>
              <Flex className={styles.toggletext}>
                Show candidates willing to relocate
              </Flex>
            </Flex>

            <Flex row className={styles.mtstyle}>
              {/* <InputCheckBox
            label="Show candidates from job location"
            checked={isLocation}
            onClick={handleLocation}
          /> */}
              <Flex className={styles.switch}>

                <InputSwitch
                  onClick={handleLocation}
                  checked={isLocation}
                />
              </Flex>
              <Flex className={styles.toggletext}>
                Show candidates from job location
              </Flex>

            </Flex>


          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default ZitaMatchFilters;
