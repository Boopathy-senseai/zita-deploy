import { Dispatch, SetStateAction, useEffect } from 'react';
import classNames from 'classnames/bind';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Card from '../../uikit/Card/Card';
import { pageReload } from '../../uikit/helper';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import SvgRefresh from '../../icons/SvgRefresh';
import styles from './talentfilter.module.css';
import { experienceOptions } from './mock';

type experienceOptionsType = {
  value: string;
  label: string;
};

const cx = classNames.bind(styles);

type Props = {
  isBachelors: boolean;
  isDoctorate: boolean;
  isMasters: boolean;
  isAny: boolean;
  setBachelors: (arg: boolean) => void;
  setDoctorate: (arg: boolean) => void;
  setMasters: (arg: boolean) => void;
  setAny: (arg: boolean) => void;
  isRelocate: boolean;
  setRelocate: (arg: boolean) => void;
  isExperience: experienceOptionsType;
  setExperience: Dispatch<SetStateAction<experienceOptionsType>>;
  setInitialPage: (arg: number) => void;
  isOther: boolean;
  setOther: (arg: boolean) => void;
  isInitalCheckBox: boolean;
};
const TalentFilter = ({
  isBachelors,
  isDoctorate,
  isMasters,
  isAny,
  setBachelors,
  setDoctorate,
  setMasters,
  setAny,
  isRelocate,
  setRelocate,
  isExperience,
  setExperience,
  setInitialPage,
  isOther,
  setOther,
  isInitalCheckBox,
}: Props) => {
  const handleBachelor = () => {
    setBachelors(!isBachelors);
    setAny(false);
    setInitialPage(0);
  };
  const handleDoctorate = () => {
    setDoctorate(!isDoctorate);
    setAny(false);
    setInitialPage(0);
  };
  const handleMaster = () => {
    setMasters(!isMasters);
    setAny(false);
    setInitialPage(0);
  };
  const handleOther = () => {
    setAny(false);
    setOther(!isOther);
    setInitialPage(0);
  };
  const handleAny = () => {
    setAny(!isAny);
    setBachelors(false);
    setDoctorate(false);
    setMasters(false);
    setOther(false);
    setInitialPage(0);
  };
  useEffect(() => {
    if (!isBachelors && !isDoctorate && !isMasters && !isOther) {
      setAny(true);
    }
  }, [isBachelors, isDoctorate, isMasters, isOther]);
  return (
    <Card className={cx('cardConatiner')}>
      <Flex row center className={styles.filterFlex}>
        <Text type="titleMedium" className={cx('filterTextStyle')}>
          Filters
        </Text>
        <div
          title={'Reset Filters'}
          onClick={pageReload}
          className={styles.pointer}
          tabIndex={-1}
          role={'button'}
          onKeyPress={() => {}}
        >
          <SvgRefresh />
        </div>
      </Flex>
      <Flex className={cx('qualificationConatiner')}>
        <Text type="titleSmall">Qualification</Text>
        <Flex row top className={cx('checkBoxContainer')}>
          <Flex className={cx('checkBoxContainerOne')}>
            <div className={cx('checkBoxOne')}>
              <InputCheckBox
                checked={isBachelors}
                label={'Bachelors'}
                onChange={handleBachelor}
                disabled={isInitalCheckBox}
              />
            </div>
            <InputCheckBox
              onChange={handleDoctorate}
              checked={isDoctorate}
              label="Doctorate"
              disabled={isInitalCheckBox}
            />
            <div style={{ paddingTop: 16 }}>
              <InputCheckBox
                label={'Others'}
                checked={isOther}
                onChange={handleOther}
                disabled={isInitalCheckBox}
              />
            </div>
          </Flex>
          <Flex>
            <div className={cx('checkBoxOne')}>
              <InputCheckBox
                onChange={handleMaster}
                checked={isMasters}
                label="Masters"
                disabled={isInitalCheckBox}
              />
            </div>
            <InputCheckBox
              onChange={handleAny}
              checked={isAny}
              label="Any"
              disabled={isInitalCheckBox}
            />
          </Flex>
        </Flex>
      </Flex>
      <div className={styles.padding16}>
        <SelectTag
          id={'talentfilter__experienceId'}
          defaultValue={{
            value: isExperience.value,
            label: isExperience.label,
          }}
          labelBold
          options={experienceOptions}
          label={'Experience'}
          onChange={(value) => setExperience(value)}
          isDisabled={isInitalCheckBox}
        />
        <div className={styles.showCheckBox}>
          <InputCheckBox
            onChange={() => setRelocate(!isRelocate)}
            checked={isRelocate}
            label={'Show candidates willing to relocate'}
            disabled={isInitalCheckBox}
          />
        </div>
      </div>
    </Card>
  );
};

export default TalentFilter;
