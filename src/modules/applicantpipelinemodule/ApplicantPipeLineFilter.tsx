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
  isExperience:any;
  isSkillOption:any
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
  isSkillOption
}: Props) => {
  const selectInputRef = useRef<any>();
  const myRef = useRef<any>();
  const [isOut, setOut] = useState(false);
  // const [isExp, setExp] = useState<any>(experienceOption[0]);

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

  return (
    <Card className={styles.cardConatiner}>
      <Flex>
        <Flex row center className={styles.filterStyle}>
          <Text color="black" bold size={16}>
            Filters
          </Text>
          <div title="Refresh Filters">
            <SvgRefresh
              onClick={() => {
                selectInputRef.current.clearValue();
                // setExp(experienceOption[0]);
                hanldeRefresh();
              }}
              className={styles.svgRefresh}
              width={22}
              height={22}
            />
          </div>
        </Flex>
        <Flex
          columnFlex
          height={window.innerHeight - 10}
          className={styles.scrollFlex}
        >
          <InputText
            ref={myRef}
            actionRight={() => (
              <label
                onClick={handleSearch}
                htmlFor={'applicantpipelinefilters__search'}
                style={{ margin: 0 }}
              >
                <SvgSearch />
              </label>
            )}
            id="applicantpipelinefilters__search"
            value={isSearch}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate by name or email"
            onKeyPress={handleKeyPress}
          />
          <Text color="black" bold className={styles.matchTextStyle}>
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
          <Text color="black" bold className={styles.profileTextStyle}>
            Experience
          </Text>
          <SelectTag
            value={
              experienceOption
                ? experienceOption.find((option:any) => option.value === isExperience)
                : ''
            }
            options={experienceOption}
            onChange={(option) => {
              setExperience(option.value);
              handleExperience(option.value);
            }}
          />
          <Text color="black" bold className={styles.profileTextStyle}>
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
          <Text color="black" bold className={styles.profileTextStyle}>
            Profile
          </Text>
          <Flex row center wrap>
            {profileOptions.map((profileList) => {
              return (
                <Flex
                  row
                  key={profileList.value}
                  className={styles.matchRadioStyle}
                >
                  <InputRadio
                    label={profileList.value}
                    checked={profileList.label === isProfile}
                    onClick={() => hanldeProfile(profileList)}
                  />
                </Flex>
              );
            })}
          </Flex>
          <Text color="black" bold className={styles.qualificationTextStyle}>
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
                    label={qualificationList.value}
                    checked={qualificationList.checked}
                    onChange={qualificationList.onChange}
                  />
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ApplicantPipeLineFilter;
