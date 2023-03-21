import { FormikProps } from 'formik';
import escapeRegExp from 'lodash/escapeRegExp'; // eslint-disable-line
import { useMemo, useRef, useState, useEffect } from 'react';
import SvgRefresh from '../../icons/SvgRefresh';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { enterKeyPress } from '../../uikit/helper';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { MAX_DISPLAYED_OPTIONS } from '../constValue';
import { experienceOption, jobTypeData, myDataSkillList } from './mock';
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

  const selectInputRef = useRef<any>();
  const myRef = useRef<any>();

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
// filterv refresh function
  const filterRefresh = () => {
    hanldeRefresh();
    setSearch('');
    setRelocate(false);
    formik.resetForm()
  };

  return (
    <Card className={styles.overAll}>
      <Flex row center className={styles.filterStyle}>
        <Text bold size={16}>Filters</Text>
        <div
          title="Refresh Filters"
          className={styles.svgRefresh}
          onClick={filterRefresh}
          tabIndex={-1}
          role={'button'}
          onKeyPress={() => {}}
        >
          <SvgRefresh width={22} height={22} />
        </div>
      </Flex>
      <Flex
        columnFlex
        className={styles.filterContainer}
        maxHeight={window.innerHeight - 150}
      >
        <Text color="black" bold className={styles.jobTextStyle}>
          Job Type
        </Text>
        <Flex row center>
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
        <div className={styles.expContainer}>
          <SelectTag
            labelBold
            label="Experience"
            value={formik.values.experience}
            options={experienceOption}
            onChange={(option) => {
              formik.setFieldValue('experience', option);
            }}
          />
        </div>
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
        <div className={styles.expContainer}>
          <InputCheckBox
            label="Show candidates willing to relocate"
            checked={isRelocate}
            onChange={() => setRelocate(!isRelocate)}
          />
        </div>
      </Flex>
    </Card>
  );
};

export default MyDataBaseFilter;
