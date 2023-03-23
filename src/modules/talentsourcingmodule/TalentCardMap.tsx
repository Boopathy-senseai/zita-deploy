import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';
import classNames from 'classnames/bind';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import SvgLock from '../../icons/SvgLock';
import { WHITE } from '../../uikit/Colors/colors';
import SvgUnlock from '../../icons/SvgUnlock';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import { colorCode } from '../constValue';
import styles from './talentcardlist.module.css';
import { DataEntity } from './talentSourcingTypes';

const cx = classNames.bind(styles);

type Props = {
  talentList: DataEntity;
  index: number;
  handleUnlockSubmit: (arg: string) => void;
  handleClick: (e: { target: { id: string; checked: boolean } }) => void;
  isCheck: DataEntity;
  handleCandidateView: (hashKey: string) => void;
  candi_list?: string[];
};

const notSpecified = (value: string, reLocate?: string) => {
  let initialValue;
  if (value === 'not_set' || reLocate === '0') {
    initialValue = 'Not Specified';
  } else {
    initialValue = value;
  }
  return initialValue;
};

const TalentCardMap = ({
  talentList,
  index,
  handleUnlockSubmit,
  handleClick,
  isCheck,
  handleCandidateView,
  candi_list,
}: Props) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1316px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 2560px)' });

  const [isColor, setColor] = useState<string[]>([]);

  useEffect(() => {
    setColor(colorCode);
  }, []);
  const checkVist = candi_list?.includes(talentList.id.toString())
    ? true
    : false;
  const windowSize = isLarge
    ? window.innerWidth / 3 - 130
    : window.innerWidth / 2 - 186;
  return (
    <div
      style={{
        width: isTablet ? '100%' : windowSize,
      }}
      className={styles.overAll}
    >
      <Card key={talentList.first_name + index} className={cx('cardConatiner')}>
        <Flex row top>
          <InputCheckBox
            key={talentList.candidate_hash}
            name={talentList.first_name}
            id={talentList.candidate_hash}
            onChange={handleClick}
            checked={isCheck.includes(talentList.candidate_hash)}
            disabled={checkVist}
          />
          <Flex row flex={1}>
            <Flex between row className={cx('profileOverAll')} flex={1}>
              <Flex flex={1}>
                <Flex flex={1} row className={cx('profileContainer')}>
                  <div
                    className={cx('profile')}
                    style={{
                      backgroundColor: isColor[index % isColor.length],
                    }}
                  >
                    <Text size={16} bold color="white" transform="uppercase">
                      {talentList.first_name.charAt(0)}
                    </Text>
                  </div>
                  <Flex flex={1}>
                    <Flex row center>
                      <Text bold style={{ marginRight: 2 }}>
                        {'Name:'}
                      </Text>
                      <Text
                        bold
                        transform="capitalize"
                        className={styles.pointer}
                        color="link"
                        onClick={() =>
                          handleCandidateView(talentList.candidate_hash)
                        }
                      >
                        {talentList.first_name}
                      </Text>
                    </Flex>
                    {talentList.work_experience === 'not_set' ? (
                      <Flex
                        row
                        center
                        title={`${talentList.hometown} | ${notSpecified(
                          talentList.work_experience,
                        )}`}
                        // wrap
                      >
                        <Text
                          color="gray"
                          size={12}
                          className={styles.ellipsis}
                        >
                          {talentList.hometown}
                        </Text>
                        <Text
                          color="gray"
                          size={12}
                          style={{ marginLeft: 1, marginRight: 2 }}
                        >
                          {' | '}
                        </Text>
                        <Text color="gray" size={12}>{`${notSpecified(
                          talentList.work_experience,
                        )}`}</Text>
                      </Flex>
                    ) : (
                      <>
                        {talentList.work_experience === '0-1' && (
                          <Flex
                            // wrap
                            row
                            center
                            title={`${talentList.hometown} | ${notSpecified(
                              talentList.work_experience,
                            )} Year`}
                          >
                            <Text
                              color="gray"
                              size={12}
                              className={styles.ellipsis}
                            >
                              {talentList.hometown}
                            </Text>
                            <Text
                              color="gray"
                              size={12}
                              style={{ marginLeft: 1, marginRight: 2 }}
                            >
                              {' | '}
                            </Text>
                            <Text color="gray" size={12}>{`${notSpecified(
                              talentList.work_experience,
                            )} Year`}</Text>
                          </Flex>
                        )}
                        {talentList.work_experience !== '0-1' && (
                          <Flex
                            // wrap
                            row
                            center
                            title={`${talentList.hometown} | ${notSpecified(
                              talentList.work_experience,
                            )} Years`}
                          >
                            <Text
                              color="gray"
                              size={12}
                              className={styles.ellipsis}
                            >
                              {talentList.hometown}
                            </Text>
                            <Text
                              color="gray"
                              size={12}
                              style={{ marginLeft: 1, marginRight: 2 }}
                            >
                              {' | '}
                            </Text>
                            <Text color="gray" size={12}>{`${notSpecified(
                              talentList.work_experience,
                            )} Years`}</Text>
                          </Flex>
                        )}
                      </>
                    )}

                    <Flex row center>
                      <Text size={12} color="gray" style={{ marginRight: 2 }}>
                        Last Active:
                      </Text>
                      <Text size={12} color="gray">
                        {moment(talentList.updated_on).fromNow()}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex>
                  <Flex row center className={cx('jobList')}>
                    <Text bold style={{ width: 62 }}>
                      Job Title:
                    </Text>
                    <Text
                      title={notSpecified(talentList.desired_job_title)}
                      color="black_1"
                      className={styles.jobTitle}
                    >
                      {notSpecified(talentList.desired_job_title)}
                    </Text>
                  </Flex>
                  <Flex row center className={cx('jobList')}>
                    <Text bold style={{ marginRight: 2 }}>
                      Qualification:
                    </Text>
                    <Text color="black_1">
                      {notSpecified(talentList.education_level)}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex width={220}>
                <Button
                  className={cx('unlockBtn', {
                    btnUnlocked: checkVist,
                    btnUnlock: !checkVist,
                  })}
                  onClick={() => handleUnlockSubmit(talentList.candidate_hash)}
                  disabled={checkVist}
                >
                  <Flex row center>
                    {!checkVist ? (
                      <SvgLock fill={WHITE} width={12} height={12} />
                    ) : (
                      <SvgUnlock fill={WHITE} width={12} height={12} />
                    )}
                    <Text color={'white'} bold style={{ marginLeft: 4 }}>
                      {checkVist ? 'Unlocked Contact' : 'Unlock Contact'}
                    </Text>
                  </Flex>
                </Button>
                <Flex className={styles.relocateContainer}>
                  <Flex row center className={cx('jobList')}>
                    <Text bold style={{ marginRight: 2 }}>
                      Willing to Relocate:
                    </Text>
                    {talentList.relocate === '1' ? (
                      <Text color="black_1">Yes</Text>
                    ) : (
                      <Text color="black_1">
                        {notSpecified(talentList.relocate, talentList.relocate)}
                      </Text>
                    )}
                  </Flex>
                  <Flex row center className={cx('jobList')}>
                    <Text bold style={{ marginRight: 2 }}>
                      Salary:
                    </Text>
                    {talentList.min_salary === 'Not Specified' &&
                    talentList.max_salary === 'Not Specified' ? (
                      <Text color="black_1">{talentList.min_salary}</Text>
                    ) : (
                      <Text color="black_1">
                        ${talentList.min_salary} - ${talentList.max_salary}
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default TalentCardMap;
