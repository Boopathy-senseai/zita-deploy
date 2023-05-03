/* eslint-disable */
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
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgRefresh from '../../icons/SvgRefresh';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import Card from '../../uikit/Card/Card';
import SvgSearch from '../../icons/SvgSearch';
import { listValue } from './ApplicantPipeLineScreen';
import {
  experienceOption,
  matchOptions,
  profileOptions,
  skillList,
} from './mock';
import styles from './applicantpipelinefilter.module.css';
import SvgClose from '../../icons/SvgClose';
import SvgIntomark from '../../icons/SvgCancel';

type Props = {
  isSkills: any;
  isSearch: string;
  setSearch: (arg: string) => void;
  handleKeyPress: (event: { key: string }) => void;
  isMatchRadio: string;
  hanldeMatch: (listValue: listValue) => void;
  isProfile: string;
  hanldeProfile: (listValue: listValue) => void;
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
  };
  const closeProfileValue = () => {
    hanldeProfile({
      value: '',
      label: '',
    });
    setProfileValue(undefined);
  };
  const closeExperience = () => {
    setExperience(''), setExperienceValue(undefined);
  };
  const closeQualification = (doc: {
    value: string;
    label: string;
    checked: boolean;
    onChange: () => void;
  }) => {
    doc.onChange();
  };
  const closeSkillOption = (doc: { value: string; label: string }) => {
    const newOptions = [...isSkillOption];
    const indx = newOptions.indexOf(doc);
    if (indx !== -1) {
      newOptions.splice(indx, 1);
      setSkillOption(newOptions);
      return;
    }
  };
  const isDefaultFilter = () => {
    const qualification = (qualificationValue || []).filter(
      (doc) => doc.value !== 'any',
    );
    const skills = isSkillOption || [];
    if (
      matchValue?.value === '' &&
      profileValue?.value === '' &&
      experienceValue?.value === '' &&
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
        <Text style={{ marginRight: '10px', marginBottom: '2px' }}>
          {doc.label}
        </Text>
        <SvgIntomark onClick={onClose} />
      </Flex>
    );
  };
  const showSkills = isSkillOption.slice(0, 4);
  const hiddenSkills = isSkillOption.slice(4, isSkillOption.length);
  return (
    <>
      <Flex row style={{ justifyContent: 'space-between' }}>
        <Flex row className={styles.quickFilters}>
          <Text>Quick Filters :</Text>
          {isDefaultFilter() ? (
            <Text className={styles.quickfil}>{'All'}</Text>
          ) : (
            <Flex row wrap>
              <RenderQuickFilter doc={matchValue} onClose={closeMatchValue} />
              <RenderQuickFilter
                doc={profileValue}
                onClose={closeProfileValue}
              />
              <RenderQuickFilter
                doc={experienceValue}
                onClose={closeExperience}
              />
              {qualificationValue &&
                qualificationValue.map((doc) => (
                  <RenderQuickFilter
                    doc={{ label: doc.label, value: doc.value }}
                    onClose={() => closeQualification(doc)}
                  />
                ))}
              {isSkillOption &&
                showSkills.map((doc) => (
                  <RenderQuickFilter
                    doc={{ label: doc.label, value: doc.value }}
                    onClose={() => closeSkillOption(doc)}
                  />
                ))}
              {hiddenSkills && hiddenSkills.length > 0 && (
                <Text
                  className={styles.quickfil}
                >{`Skills : + ${hiddenSkills.length}`}</Text>
              )}
            </Flex>
          )}
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
              <SvgRefresh
                width={18}
                height={18}
                onClick={() => {
                  selectInputRef.current.clearValue();
                  hanldeRefresh();
                }}
              />
            </Flex>
            <div
              className={`${styles.drop_down_menus} ${
                showDropDown ? styles.show : ''
              }`}
            >
              {/* match */}
              <Flex className={styles.mtstyle}>
                <Text color="theme" bold className={styles.matchTextStyle}>
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
                          onClick={() => selectMatch(matchList)}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
              {/* profile */}
              <Flex className={styles.mtstyle}>
                <Text color="theme" bold className={styles.profileTextStyle}>
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
                          onClick={() => selectProfile(profileList)}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
              {/* exp */}
              <Flex className={styles.mtstyle}>
                <Text color="theme" bold className={styles.profileTextStyle}>
                  Experience
                </Text>
                <SelectTag
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
                    // selectExperienceValue(option.value);
                    //handleExperience(option.value);
                  }}
                />
              </Flex>
              {/* qualification */}
              <Flex className={styles.mtstyle}>
                <Text
                  color="theme"
                  bold
                  className={styles.qualificationTextStyle}
                >
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
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
              {/* skills */}
              <Flex className={styles.mtstyle}>
                <Text color="theme" bold className={styles.profileTextStyle}>
                  Skills
                </Text>
                <SelectTag
                  ref={selectInputRef}
                  isMulti
                  options={slicedOptions}
                  onInputChange={(value) => setSkills(value)}
                  onChange={(option) => {
                    setSkillOption(option);
                  }}
                  isSearchable
                  isCreate
                  value={isSkillOption}
                />
              </Flex>
            </div>
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default ApplicantPipeLineFilter;
