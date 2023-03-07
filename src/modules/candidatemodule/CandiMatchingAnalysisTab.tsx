import { useSelector } from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import ProgressBar from '../../uikit/ProgressBar/ProgressBar';
import { GARY_7, WHITE } from '../../uikit/Colors/colors';
import { RootState } from '../../store';
import { lowerCase, removeUnderScores } from '../../uikit/helper';
import SvgDone from '../../icons/SvgDone';
import SvgBlock from '../../icons/SvgBlock';
import styles from './candimatchinganalysistab.module.css';

const colorCode = [WHITE, GARY_7];
const CandiMatchingAnalysisTab = () => {
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
      <Text color="theme" bold>
        Matching Analysis
      </Text>
      {checkMatch ? (
        <Flex flex={1} center middle>
          <Text color="gray">
            No matching data available for this candidate
          </Text>
        </Flex>
      ) : (
        <>
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
                const array1 = data['groups'][0]['ns2:functionGapItem'];
                const array2 = data['groups'][1]['ns2:termGapItem'];
                const array3 = data['groups'][2]['ns2:termGapItem'];
                const array4 = data['groups'][3]['ns2:termGapItem'];
                const array5 = data['groups'][4]['ns2:locationGapItem'];
                const array6 = data['groups'][5]['ns2:termGapItem'];

                return (
                  <Flex
                    key={list.name + listIndex}
                    row
                    center
                    between
                    className={styles.dataListStyle}
                    backgroundColor={colorCode[listIndex % colorCode.length]}
                  >
                    <Flex flex={1}>
                      <Text bold className={styles.titleStyle}>
                        {removeUnderScores(lowerCase(list.name))}
                      </Text>
                    </Flex>
                    <Flex flex={1}>
                      <Text bold>{Math.round(list.score * 100)}%</Text>
                    </Flex>
                    <Flex flex={1}>
                      {list.name === 'JOB_TITLE' && (
                        <Flex className={styles.valueStyle}>
                          <Flex row center className={styles.valueListStyle}>
                            <div className={styles.svgStyle}>
                              {array1?.status === 'FOUND' ? (
                                <SvgDone />
                              ) : (
                                <SvgBlock />
                              )}
                            </div>
                            <Text bold>
                              {array1.value?.function?.preferredLabels?.label}
                            </Text>
                          </Flex>
                        </Flex>
                      )}

                      {list.name === 'DOMAINS' && (
                        <Flex className={styles.valueStyle}>
                          {array2 &&
                            array2.map((valueList: any, index: any) => {
                              return (
                                <Flex
                                  key={index}
                                  className={styles.valueListStyle}
                                  row
                                  center
                                >
                                  <div className={styles.svgStyle}>
                                    {valueList?.status === 'FOUND' ? (
                                      <SvgDone />
                                    ) : (
                                      <SvgBlock />
                                    )}
                                  </div>
                                  <Text bold>
                                    {valueList.value?.preferredLabels?.label}
                                  </Text>
                                </Flex>
                              );
                            })}
                        </Flex>
                      )}
                      {/* {list.name === "SECTORS" && (
                        <Flex className={styles.valueStyle}>
                          {array3 &&
                            array3.map((valueList: any, index: any) => {
                              return (
                                <Flex
                                  key={index}
                                  className={styles.valueListStyle}
                                  row
                                  center
                                >
                                  <div className={styles.svgStyle}>
                                    {valueList?.status === "FOUND" ? (
                                      <SvgDone />
                                    ) : (
                                      <SvgBlock />
                                    )}
                                  </div>
                                  <Text bold>
                                    {valueList.value?.preferredLabels?.label}
                                  </Text>
                                </Flex>
                              );
                            })}
                        </Flex>
                      )} */}

                      {list.name === 'SECTORS' && (
                        <Flex className={styles.valueStyle}>
                          <Flex className={styles.valueListStyle} row center>
                            <div className={styles.svgStyle}>
                              {array3?.status === 'FOUND' ? (
                                <SvgDone />
                              ) : (
                                <SvgBlock />
                              )}
                            </div>
                            <Text bold>
                              {array3.value?.preferredLabels?.label}
                            </Text>
                          </Flex>
                        </Flex>
                      )}

                      {list.name === 'SKILLS' && (
                        <Flex className={styles.valueStyle}>
                          {array4 &&
                            array4.map((valueList: any, index: number) => {
                              return (
                                <Flex
                                  key={index}
                                  className={styles.valueListStyle}
                                  row
                                  center
                                >
                                  <div className={styles.svgStyle}>
                                    {valueList?.status === 'FOUND' ? (
                                      <SvgDone />
                                    ) : (
                                      <SvgBlock />
                                    )}
                                  </div>
                                  <Text bold>
                                    {valueList.value?.preferredLabels?.label}
                                  </Text>
                                </Flex>
                              );
                            })}
                        </Flex>
                      )}
                      {list.name === 'LOCATION' && array5 && (
                        <Flex className={styles.valueStyle}>
                          <Flex row center className={styles.valueListStyle}>
                            <div className={styles.svgStyle}>
                              {array5?.status === 'FOUND' ? (
                                <SvgDone />
                              ) : (
                                <SvgBlock />
                              )}
                            </div>
                            <Text bold>
                              {array5?.term?.preferredLabels?.label}
                            </Text>
                          </Flex>
                        </Flex>
                      )}
                      {list.name === 'EDUCATION' && array6 && (
                        <Flex className={styles.valueStyle}>
                          <Flex row center className={styles.valueListStyle}>
                            <div className={styles.svgStyle}>
                              {array6?.status === 'FOUND' ? (
                                <SvgDone />
                              ) : (
                                <SvgBlock />
                              )}
                            </div>
                            <Text bold>
                              {array6?.value?.preferredLabels?.label}
                            </Text>
                          </Flex>
                        </Flex>
                      )}
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

export default CandiMatchingAnalysisTab;
