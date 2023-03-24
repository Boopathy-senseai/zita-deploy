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
import Card from '../../uikit/Card/Card';
import InputText from '../../uikit/InputText/InputText';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
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
  handleLocation: () => void;
  hanldeRefresh: () => void;
  isExperience:any
};

const ZitaMatchFilters = ({
  setSearch,
  isSearch,
  handleSearchSubmit,
  hanldeMatch,
  isMatchRadio,
  handleExperience,
  setExperience,
  setSkills,
  setSkillOption,
  isSkills,
  isJobType,
  setJobType,
  isProfile,
  hanldeProfile,
  qualificationOption,
  isCandiStatus,
  setCandiStatus,
  isRelocate,
  handleRelocate,
  handleLocation,
  isLocation,
  hanldeRefresh,
  isExperience
}: Props) => {
  const selectInputRef = useRef<any>();
  const [isOut, setOut] = useState(false);
  const myRef = useRef<any>();

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

  return (
    <Card className={styles.cardConatiner}>
      <Flex>
        <Flex row center className={styles.filterStyle}>
          <Text color="black" bold size={16}>
            Filters
          </Text>
          <div title="Refresh Filters" className={styles.svgRefresh}>
            <SvgRefresh
              onClick={() => {
                selectInputRef.current.clearValue();
                hanldeRefresh();
              }}
              width={22}
              height={22}
            />
          </div>
        </Flex>
        <Flex
          columnFlex
          className={styles.scrollStyle}
          maxHeight={window.innerHeight - 150}
        >
          <InputText
            ref={myRef}
            value={isSearch}
            onChange={(e) => setSearch(e.target.value)}
            id="zitamatchfilters__search"
            placeholder="Search candidates by name or email"
            actionRight={() => (
              <label
                htmlFor={'zitamatchfilters__search'}
                style={{ margin: 0 }}
                onClick={handleSearchSubmit}
                tabIndex={-1}
                role={'button'} // eslint-disable-line
                onKeyPress={() => {}}
              >
                <SvgSearch />
              </label>
            )}
            onKeyPress={(e) => enterKeyPress(e, handleSearchSubmit)}
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
                  width={matchList.width}
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
          <div style={{ marginTop: 8, marginBottom: 16 }}>
            <SelectTag
              label="Experience"
              labelBold
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
          </div>

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
          />
          <Text color="black" bold className={styles.jobTextStyle}>
            Job Type
          </Text>
          <Flex row center>
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
          </Flex>
          <Text color="black" bold className={styles.profileTextStyle}>
            Profile
          </Text>
          <Flex row center>
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
          </Flex>
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
          <Text color="black" bold className={styles.candidateTextStyle}>
            Candidate Invite Status
          </Text>
          <Flex row center>
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
          </Flex>
          <div className={styles.relocateText}>
            <InputCheckBox
              label="Show candidates willing to relocate"
              checked={isRelocate}
              onClick={handleRelocate}
            />
          </div>
          <InputCheckBox
            label="Show candidates from job location"
            checked={isLocation}
            onClick={handleLocation}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ZitaMatchFilters;
