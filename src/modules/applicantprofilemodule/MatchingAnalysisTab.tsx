import { useSelector } from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import ProgressBar from '../../uikit/ProgressBar/ProgressBar';
import { GARY_7, WHITE } from '../../uikit/Colors/colors';
import { RootState } from '../../store';
import { removeUnderScores, lowerCase } from '../../uikit/helper';
import {
  MatchArray,
  MatchJobArray,
  MatchLocationArray,
  WithoutArray,
  WithoutJobArray,
  WithoutLocationArray,
} from './matchAnalysisTab';
import styles from './matchinganalysistab.module.css';

const colorCode = [WHITE, GARY_7];

const MatchingAnalysisTab = () => {
  const { match, data } = useSelector(
    ({ applicantMatchReducers }: RootState) => {
      return {
        match: applicantMatchReducers.match ? applicantMatchReducers.match : [],
        data: applicantMatchReducers.data,
      };
    },
  );

  const checkMatch = match && match.length === 0 ? true : false;
  const profileMatch = checkMatch ? 0 : match[0].profile_match;

  return (
    <Flex
      columnFlex
      height={window.innerHeight - 230}
      className={styles.overAll}
    >
      {checkMatch ? (
        <Flex flex={1} center middle>
          <Text color="gray">This candidate is not a match for this job</Text>
        </Flex>
      ) : (
        <>
          <Text color="theme" bold>
            Matching Analysis
          </Text>
          <Flex row center between className={styles.progressStyle}>
            <Text>Overall matching score for this candidate with the job</Text>
            <ProgressBar
              verticalWidth={'100px'}
              type="hr"
              percentage={profileMatch}
            />
          </Flex>

          {data && data.groups && (
            <Flex flex={1} className={styles.mapListContainer}>
              {data.groups.map((list, listIndex) => {
                return (
                  <Flex
                    key={list.name + listIndex}
                    row
                    center
                    between
                    className={styles.dataListStyle}
                    backgroundColor={colorCode[listIndex % colorCode.length]}
                  >
                    <Flex flex={3}>
                      <Text bold className={styles.titleStyle}>
                        {removeUnderScores(lowerCase(list.name))}
                      </Text>
                    </Flex>
                    <Flex flex={2}>
                      <Text bold>{Math.round(list.score * 100)}%</Text>
                    </Flex>
                    <Flex flex={7}>
                      <>
                        {Array.isArray(list['ns2:functionGapItem']) &&
                          list.name === 'JOB_TITLE' && (
                            <MatchJobArray
                              arrayValue={list['ns2:functionGapItem']}
                            />
                          )}

                        {!Array.isArray(list['ns2:functionGapItem']) &&
                          list.name === 'JOB_TITLE' && (
                            <WithoutJobArray
                              objValue={list['ns2:functionGapItem']}
                            />
                          )}
                      </>

                      <>
                        {Array.isArray(list['ns2:termGapItem']) &&
                          list.name === 'DOMAINS' && (
                            <MatchArray arrayValue={list['ns2:termGapItem']} />
                          )}

                        {!Array.isArray(list['ns2:termGapItem']) &&
                          list.name === 'DOMAINS' && (
                            <WithoutArray objValue={list['ns2:termGapItem']} />
                          )}
                      </>

                      <>
                        {Array.isArray(list['ns2:termGapItem']) &&
                          list.name === 'SECTORS' && (
                            <MatchArray arrayValue={list['ns2:termGapItem']} />
                          )}

                        {!Array.isArray(list['ns2:termGapItem']) &&
                          list.name === 'SECTORS' && (
                            <WithoutArray objValue={list['ns2:termGapItem']} />
                          )}
                      </>

                      <>
                        {Array.isArray(list['ns2:termGapItem']) &&
                          list.name === 'SKILLS' && (
                            <MatchArray arrayValue={list['ns2:termGapItem']} />
                          )}

                        {!Array.isArray(list['ns2:termGapItem']) &&
                          list.name === 'SKILLS' && (
                            <WithoutArray objValue={list['ns2:termGapItem']} />
                          )}
                      </>

                      <>
                        {Array.isArray(list['ns2:locationGapItem']) &&
                          list.name === 'LOCATION' && (
                            <>
                              <MatchLocationArray
                                arrayValue={list['ns2:locationGapItem']}
                              />
                            </>
                          )}

                        {!Array.isArray(list['ns2:locationGapItem']) &&
                          list.name === 'LOCATION' && (
                            <WithoutLocationArray
                              objValue={list['ns2:locationGapItem']}
                            />
                          )}
                      </>

                      <>
                        {Array.isArray(list['ns2:termGapItem']) &&
                          list.name === 'EDUCATION' && (
                            <MatchArray arrayValue={list['ns2:termGapItem']} />
                          )}

                        {!Array.isArray(list['ns2:termGapItem']) && list.name === 'EDUCATION' && (
                          <WithoutArray objValue={list['ns2:termGapItem']} />
                        )}
                      </>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
};

export default MatchingAnalysisTab;
