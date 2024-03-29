import {
  useMemo,
  SetStateAction,
  Dispatch,
  useRef,
  useEffect,
  useState,
} from 'react';
import escapeRegExp from 'lodash/escapeRegExp';
import { MAX_DISPLAYED_OPTIONS } from '../constValue';
import { Button } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgRefresh from '../../icons/SvgRefresh';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import SvgIntomark from '../../icons/SvgCancel';
import {
  experienceOption,
  matchOptions,
  profileOptions,
  skillList,
} from './mock';
import styles from './applicantpipelinefilter.module.css';

export type ListValue = {
  value: string;
  label: string;
};

type Props = {
  isSkills: any;
  isSearch: string;
  setSearch: (arg: string) => void;
  handleKeyPress: (event: { key: string }) => void;
  isMatchRadio: string;
  hanldeMatch: (listValue: ListValue) => void;
  isProfile: string;
  hanldeProfile: (listValue: ListValue) => void;
  handleExperience: (selectedValue: string) => void;
  setExperience: Dispatch<SetStateAction<string>>;
  setSkills: Dispatch<any>;
  setSkillOption: Dispatch<any>;
  qualificationOption: {
    value: string;
    label: string;
    checked: boolean;
    onChange: () => void;
  }[];
  hanldeRefresh: () => void;
  handleSearch: () => void;
  isExperience: any;
  isSkillOption: Array<{ value: string; label: string }>;
  setchange?: any;
};

const ApplicantPipeLineFilter = ({
  isSkills,
  isSearch,
  setSearch,
  setSkillOption,
  setSkills,
  handleKeyPress,
  qualificationOption,
  setExperience,
  isMatchRadio,
  hanldeMatch,
  isProfile,
  handleExperience,
  hanldeProfile,
  hanldeRefresh,
  handleSearch,
  isExperience,
  isSkillOption,
  setchange,
}: Props) => {
  const selectInputRef = useRef<any>();
  const myRef = useRef<any>();
  const [isOut, setOut] = useState(false);
  const [matchValue, setMatchValue] = useState<
    { label: string; value: any } | undefined
  >();
  const [profileValue, setProfileValue] = useState<
    { label: string; value: any } | undefined
  >();
  const [experienceValue, setExperienceValue] = useState<
    { label: string; value: any } | undefined
  >();
  const [qualificationValue, setQualificationValue] = useState<
    | {
        value: string;
        label: string;
        checked: boolean;
        onChange: () => void;
      }[]
    | undefined
  >();
  //const [skillValue, setSkillValue] = useState('');

  const [showDropDown, setShowDropDown] = useState(false);
  // const [isExp, setExp] = useState<any>(experienceOption[0]);
  const dropDownRef = useRef(null);

  const [match1, setmatch1] = useState<
    { label: string; value: any } | undefined
  >();
  const [profile1, setprofile1] = useState<
    { label: string; value: any } | undefined
  >();
  const [experience1, setexperience1] = useState<
    { label: string; value: any } | undefined
  >();
  const [qualification1, setqualification1] = useState<
    | {
        value: string;
        label: string;
        checked: boolean;
        onChange: () => void;
      }[]
    | undefined
  >();
  const [skill1, setskill1] = useState<{ value: string; label: string }[]>();
  const [hiddenskill1, sethiddenskill1] =
    useState<{ value: string; label: string }[]>();
  const [showskill1, setshowskill1] =
    useState<{ value: string; label: string }[]>();

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
  useEffect(() => {
    if (isSearch !== '') setOut(true);
  }, [isSearch]);

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target) && isOut) {
      handleSearch();
      setOut(false);
    }
  };
  const closeMatchValue = () => {
    hanldeMatch({
      value: '',
      label: '',
    });
    setMatchValue(undefined);
    setmatch1(undefined);
  };
  const closeProfileValue = () => {
    hanldeProfile({
      value: '',
      label: '',
    });
    setProfileValue(undefined);
    setprofile1(undefined);
  };
  const closeExperience = () => {
    setExperience('');
    setExperienceValue(undefined);
    setexperience1(undefined);
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
    const newOptions1 = [...qualificationValue];
    var gremove = qualification1.filter((obj) => obj.value !== doc.value);
    setqualification1(gremove);

    closeQualification(doc);
  };
  const closeSkillOption = (doc: { value: string; label: string }) => {
    const newOptions = [...isSkillOption];
    const indx = newOptions.indexOf(doc);
    if (indx !== -1) {
      newOptions.splice(indx, 1);
      setSkillOption(newOptions);
      setskill1(newOptions);
      setshowskill1(newOptions);
      if (showskill1.length < 5) {
        sethiddenskill1(undefined);
      }
      return;
    }
  };
  const isDefaultFilter = () => {
    const qualification = (qualification1 || []).filter(
      (doc) => doc.value !== 'any',
    );
    const skills = skill1 || [];
   
    if (
      (match1?.value === '' || match1 === undefined) &&
      (profile1?.value === '' || profile1 === undefined) &&
      (experience1?.value === '' || experience1 === undefined) &&
      qualification?.length === 0 &&
      skills?.length === 0
    ) {
      return true;
    }
    return false;
  };
  // const isDefaultFilter = () => {
  //   const qualification = (qualificationValue || []).filter(
  //     (doc) => doc.value !== 'any',
  //   );
  //   if (
  //     matchValue?.value === '' &&
  //     profileValue?.value === '' &&
  //     experienceValue?.value === '' &&
  //     qualification?.length === 0
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

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
    setMatchValue(matchOptions.find((option) => option.value === isMatchRadio));

    setProfileValue(
      profileOptions.find((option) => option.value === isProfile),
    );

    setExperienceValue(
      experienceOption.find((option) => option.value === isExperience),
    );

    setQualificationValue(
      qualificationOption.filter((option) => option.checked),
    );
  }, [isMatchRadio, isProfile, isExperience, qualificationOption]);

  const selectMatch = (data) => {
    hanldeMatch(data);
  };
  const selectProfile = (data) => {
    hanldeProfile(data);
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
    // if (doc && (doc.value === 'any')) {
    //   return <Text className={styles.quickfil}>{doc.label}</Text>;
    // }
    return (
      <Flex row noWrap center className={styles.quickfil}>
        <Text style={{ marginRight: '10px' }}>{doc.label}</Text>
        <SvgIntomark onClick={onClose} style={{ cursor: 'pointer' }} />
      </Flex>
    );
  };
  const showSkills = isSkillOption.slice(0, 4);
  const hiddenSkills = isSkillOption.slice(4, isSkillOption.length);
  // const showSkills1 =skill1.slice(0, 4);
  // const hiddenSkills1 = skill1.slice(4,skill1.length);
  const handlechange = () => {
    setShowDropDown(false);
    setmatch1(matchValue);
    setprofile1(profileValue);
    setexperience1(experienceValue);
    setqualification1(qualificationValue);
    setskill1(isSkillOption);
    sethiddenskill1(hiddenSkills);
    setshowskill1(showSkills);
    setchange(false);
    //     const showSkills1 =skill1.slice(0, 4);
    // const hiddenSkills1 = skill1.slice(4,skill1.length);
  };

  const handlefunction1 = () => {
    setexperience1(undefined);
    setskill1(undefined);
    setqualification1(undefined);
    setmatch1(undefined);
    setprofile1(undefined);
    sethiddenskill1(undefined);
  };
  return (
    <>
      <Flex row style={{ justifyContent: 'space-between' }}>
        <Flex row className={styles.quickFilters}>
          <Text size={13} style={{ whiteSpace: 'nowrap', marginTop: '3px' }}>
            Quick Filters :
          </Text>
          {isDefaultFilter() ? (
            <Text className={styles.quickfil}>{'All'}</Text>
          ) : (
            <Flex row wrap>
              <RenderQuickFilter doc={match1} onClose={closeMatchValue} />
              <RenderQuickFilter doc={profile1} onClose={closeProfileValue} />
              <RenderQuickFilter doc={experience1} onClose={closeExperience} />
              {console.log(qualification1,'qualification1qualification1')}
              {qualification1 &&
                qualification1.map((doc, index) => (
                  <RenderQuickFilter
                    key={index}
                    doc={{ label: doc.label, value: doc.value }}
                    onClose={() => handlefunction(doc)}
                  />
                ))}
              {skill1 &&
                showskill1.map((doc, index) => (
                  <RenderQuickFilter
                    key={index}
                    doc={{ label: doc.label, value: doc.value }}
                    onClose={() => closeSkillOption(doc)}
                  />
                ))}
              {hiddenskill1 && hiddenskill1.length > 0 && (
                <Text
                  className={styles.quickfil}
                >{`Skills : + ${hiddenskill1.length}`}</Text>
              )}
            </Flex>
          )}
        </Flex>
        <Flex>
          <div ref={dropDownRef} className={styles.drop_down}>
            <Flex row className={styles.drop_down_header}>
              <Flex
                onClick={() => {
                  setShowDropDown((value) => !value);
                }}
                width={"90%"}
                style={{cursor:"pointer"}}
              >
                <Text bold color="theme" size={13}>
                  View Filter
                </Text>
              </Flex>

              <Flex>
                <div title="Clear Filters" className={styles.svgRefresh}>
                  <SvgRefresh
                    width={18}
                    height={18}
                    onClick={(e) => {
                      selectInputRef.current.clearValue();
                      hanldeRefresh();
                      e.stopPropagation();
                      handlefunction1();
                    }}
                  />
                </div>
              </Flex>
            </Flex>
            <div
              className={`${styles.drop_down_menus} ${
                showDropDown ? styles.show : ''
              }`}
            >
              {/* match */}
              <Flex className={styles.mtstyle}>
                <Text bold className={styles.matchTextStyle}>
                  Match
                </Text>
                <Flex row center wrap>
                  {matchOptions.map((matchList) => {
                    return (
                      <Flex
                        row
                        key={matchList.label}
                        className={styles.matchRadioStyle}
                      >
                        <InputRadio
                          label={matchList.label}
                          checked={matchList.value === isMatchRadio}
                          onClick={() => (
                            selectMatch(matchList), setchange(true)
                          )}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
              {/* profile */}
              <Flex className={styles.mtstyle}>
                <Text bold className={styles.profileTextStyle}>
                  Profile
                </Text>
                <Flex row center wrap>
                  {profileOptions.map((profileList) => {
                    return (
                      <Flex
                        row
                        key={profileList.label}
                        className={styles.matchRadioStyle}
                      >
                        <InputRadio
                          label={profileList.label}
                          checked={profileList.value === isProfile}
                          onClick={() => (
                            selectProfile(profileList), setchange(true)
                          )}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
              {/* exp */}
              <Flex className={styles.mtstyle}>
                <Text bold className={styles.profileTextStyle}>
                  Experience
                </Text>
                <SelectTag
                  value={
                    experienceOption
                      ? experienceOption.find(
                          (option) => option.value === isExperience,
                        )
                      : ''
                  }
                  options={experienceOption}
                  onChange={(option) => {
                    setExperience(option.value);
                    setchange(true);
                    // selectExperienceValue(option.value);
                    handleExperience(option.value);
                  }}
                />
              </Flex>
              {/* qualification */}
              <Flex className={styles.mtstyle}>
                <Text bold className={styles.qualificationTextStyle}>
                  Qualification
                </Text>
                <Flex row center wrap>
                  {qualificationOption.map((qualificationList: any) => {
                    return (
                      <Flex
                        row
                        key={qualificationList.value}
                        className={styles.matchRadioStyle}
                      >
                        <InputCheckBox
                          label={qualificationList.label}
                          checked={qualificationList.checked}
                          onChange={qualificationList.onChange}
                          onClick={() => setchange(true)}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
              {/* skills */}
              <Flex className={styles.mtstyle}>
                <Text bold className={styles.profileTextStyle}>
                  Skills
                </Text>
                <SelectTag
                  ref={selectInputRef}
                  isMulti
                  options={slicedOptions}
                  onInputChange={(value) => setSkills(value)}
                  onChange={(option) => {
                    setSkillOption(option);
                    setchange(true);
                  }}
                  isSearchable
                  isCreate
                  value={isSkillOption}
                />
              </Flex>
              <div
                className={styles.appFilterContainer}
                // style={{
                //   padding: '6px',
                //   display: 'flex',
                //   justifyContent: 'center',
                //   alignItems: 'center',
                // }}
              >
                <Button className={styles.buyBtn} onClick={handlechange}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default ApplicantPipeLineFilter;
