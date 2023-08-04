import { useSelector } from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgDone from '../../icons/SvgDone';
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
export interface DateEntity {
  not_matched_skills: [];
  not_matched_qualification: [];
}
export type MyJobFormProps = {
  Notmatch: DateEntity;
  data: string;
  // postedOn: DateEntity;
  // jobType: string;
  // location: string;
};
const MatchingAnalysisTab = () => {
  const {
    match,
    matchql,
    data,
    overall_percentage,
    Notmatchql,
    Notmatch,
    qualification_percent,
    skills_percent,
  } = useSelector(({ applicantMatchReducers }: RootState) => {
    return {
      match: applicantMatchReducers.match ? applicantMatchReducers.match : [],
      matchql: applicantMatchReducers.matched_data.matched_qualification,
      data: applicantMatchReducers.matched_data.matched_skills,
      overall_percentage: applicantMatchReducers.overall_percentage,
      Notmatch: applicantMatchReducers.not_matched_data.not_matched_skills,
      Notmatchql:
        applicantMatchReducers.not_matched_data.not_matched_qualification,
      qualification_percent: applicantMatchReducers.qualification_percent,
      skills_percent: applicantMatchReducers.skills_percent,
    };
  });
  console.log(overall_percentage, 'matchssssssss');
  const checkMatch =
    overall_percentage && overall_percentage === 0 ? true : false;
  const profileMatch = checkMatch ? 0 : overall_percentage;
  console.log(data, 'matchssddddddddssssss');
  console.log(Notmatch, 'matchssddddddddssssss');
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
          {data && (
            <Flex flex={1} className={styles.mapListContainer}>
              {/* {data.map((list, listIndex) => { */}

              <Flex
                // key={data}
                row
                center
                between
                className={styles.dataListStyle}
                // backgroundColor={colorCode[listIndex % colorCode.length]}
              >
                <Flex flex={3}>
                  <Text bold className={styles.titleStyle}>
                    skill
                  </Text>
                </Flex>
                <Flex flex={2}>
                  <Text bold>{skills_percent}%</Text>
                </Flex>
                <Flex flex={7}>
                  {data.map((list) => {
                    return (
                      <>
                        <Flex className={styles.valueListStyle} row center>
                          <div className={styles.svgStyle}>
                            <SvgDone />
                          </div>
                          <Text bold>{list} </Text>
                        </Flex>
                      </>
                    );
                  })}
                  {Notmatch.map((fix) => {
                    return (
                      <>
                        <Flex className={styles.valueListStyle} row center>
                          <Flex row>
                            <Flex className={styles.svgStyle}>
                              <SvgDone />
                            </Flex>
                            <Flex> {fix}</Flex> 
                          </Flex>
                        </Flex>{' '}
                      </>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
          )}
          {data && (
            <Flex flex={1} className={styles.mapListContainer}>
              {/* {data.map((list, listIndex) => { */}

              <Flex
                // key={data}
                row
                center
                between
                className={styles.dataListStyle}
                // backgroundColor={colorCode[listIndex % colorCode.length]}
              >
                <Flex flex={3}>
                  <Text bold className={styles.titleStyle}>
                    qualification
                  </Text>
                </Flex>
                <Flex flex={2}>
                  <Text bold>{qualification_percent}%</Text>
                </Flex>
                <Flex flex={7}>
                  {matchql.map((list) => {
                    return (
                      <>
                        <Flex className={styles.valueListStyle} row center>
                          <div className={styles.svgStyle}>
                            <SvgDone />
                          </div>
                          <Text bold>{list} </Text>
                        </Flex>
                      </>
                    );
                  })}
                  {Notmatchql.map((list) => {
                    return (
                      <>
                        <Flex className={styles.valueListStyle} row center>
                          <div className={styles.svgStyle}>
                            <SvgDone />
                          </div>
                          <Text bold>{list} </Text>
                        </Flex>{' '}
                      </>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
          )}
          
        </>
      )}
    </Flex>
  );
};

export default MatchingAnalysisTab;
