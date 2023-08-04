import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgDone from '../../icons/SvgDone';
import SvgClose from '../../icons/Svgnotmatch';
import ProgressBar from '../../uikit/ProgressBar/ProgressBar';
import { GARY_7, WHITE } from '../../uikit/Colors/colors';
import { RootState } from '../../store';
import Tab from '../../uikit/Tabs/Tab';
import { Loader } from '../../uikit';
import Tabs from '../../uikit/Tabs/Tabs';
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
import AllMatchTab from './AllMatchTab';

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
    overallskill,
    isLoading,
    overallQualification,
  } = useSelector(({ applicantMatchReducers }: RootState) => {
    return {
      isLoading:applicantMatchReducers.isLoading,
      match: applicantMatchReducers.match ? applicantMatchReducers.match : [],
      matchql:
        typeof applicantMatchReducers.matched_data.matched_qualification !==
          'undefined' &&
        applicantMatchReducers.matched_data.matched_qualification,
      data:
        typeof applicantMatchReducers.matched_data.matched_skills !==
          'undefined' && applicantMatchReducers.matched_data.matched_skills,
      overall_percentage:
        typeof applicantMatchReducers.overall_percentage !== 'undefined' &&
        applicantMatchReducers.overall_percentage,
      Notmatch:
        typeof applicantMatchReducers.not_matched_data.not_matched_skills !==
          'undefined' &&
        applicantMatchReducers.not_matched_data.not_matched_skills,
      Notmatchql:
        typeof applicantMatchReducers.not_matched_data
          .not_matched_qualification !== 'undefined' &&
        applicantMatchReducers.not_matched_data.not_matched_qualification,
      qualification_percent: applicantMatchReducers.qualification_percent,
      skills_percent: applicantMatchReducers.skills_percent,
      overallskill:
        typeof applicantMatchReducers.source.jd_skills !== 'undefined' &&
        applicantMatchReducers.source.jd_skills,
      overallQualification:
        typeof applicantMatchReducers.source.qualification !== 'undefined' &&
        applicantMatchReducers.source.qualification,
    };
  }); 
  const [isloadings,setisloading] = useState(false)
  useEffect(()=>{
    if(isLoading === true){
    setisloading(true)}
    else{
      setisloading(false) 
    }
  })
  const checkMatch =
    overall_percentage && overall_percentage === 0 ? true : false;
  const profileMatch = checkMatch ? 0 : overall_percentage;
  return (
    <Flex row flex={12} height={window.innerHeight - 120}>
       {isloadings && <Loader />}
      <Flex
        flex={6}
        className={styles.overAll}
      >
        <Text bold style={{ fontSize: '14px',marginBottom:'5px'}}>
        Matching Analysis
      </Text>
        {checkMatch ? (
          <Flex flex={1} center middle>
            <Text color="gray">This candidate is not a match for this job</Text>
          </Flex>
        ) : (
          <>
            <Flex center>
              <Flex>
                <Text size={14}>
                  Overall matching score for this candidate with the job
                </Text>
              </Flex> 
              <Flex row between marginTop={20} center className={styles.progressStyle} style={{
                paddingBottom: '20px',

                borderBottom: '1px solid #C3C3C3',
              }} flex={12}>
                <Flex flex={6} marginLeft={'50px'}>
                <ProgressBar
                  verticalWidth={'100px'}
                  roundProgressHeight={70}
                  type="round"
                   percentage={profileMatch} 
                />
                </Flex>
                <Flex
              center 
            >
              <Flex row flex={6}>
                <Flex marginRight={18} style={{ fontSize: '13px' }}>
                  Skill
                </Flex>
                <Flex marginLeft={51}>
                  <ProgressBar
                    verticalWidth={'200px'}
                    type="hr"
                    percentage={skills_percent}
                  />
                </Flex> 
              </Flex>
              <Flex row marginTop={20} style={{ bottom: '1px solid #C3C3C3' }}>
                <Flex marginRight={20} style={{ fontSize: '13px' }}>
                  Qualification
                </Flex>
                <Flex>
                  <ProgressBar
                    verticalWidth={'200px'}
                    type="hr"
                    percentage={qualification_percent}
                  />
                </Flex>
              </Flex>
            </Flex>
              </Flex>
            </Flex>
            
<Flex height={window.innerHeight - 275} style={{overflow:'scroll',display:'flex'}}>
            {data && (
              <Flex   className={styles.mapListContainer}> 
                <Flex 
                  row
                  center
                  between
                  className={styles.dataListStyle} 
                >
                  <Flex flex={3}>
                    <Text className={styles.titleStyle}>Skill</Text>
                  </Flex>
                  <Flex flex={2}>
                    <Text bold style={{ fontSize: '13px' }}>
                    {data ? data.length : 0}/{overallskill ? overallskill.length : 0}
                     
                    </Text>
                  </Flex>
                  <Flex flex={7}>
                    {data.map((list) => {
                      return (
                        <>
                          <Flex className={styles.valueListStyle} row center>
                            <div className={styles.svgStyle}>
                              <SvgDone />
                            </div>
                            <Text
                              style={{ color: '#333333', fontSize: '13px' }}
                            >
                              {list}{' '}
                            </Text>
                          </Flex>
                        </>
                      );
                    })}
                    {Notmatch.map((fix) => {
                      return (
                        <>
                          <Flex className={styles.valueListStyle} row center>
                            <Flex row center>
                              <Flex className={styles.svgStyle}>
                                <SvgClose fill="#ED4857" />
                              </Flex>
                              <Text
                                style={{ color: '#333333', fontSize: '13px' }}
                              >
                                {' '}
                                {fix}
                              </Text>
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
                    <Text className={styles.titleStyle}>Qualification</Text>
                  </Flex>
                  <Flex flex={2}> 
                    <Text bold style={{ fontSize: '13px' }}>
                     
                      {matchql ? matchql.length : 0}/{overallQualification ? overallQualification.length : 0}
                    </Text>
                  </Flex>
                  <Flex flex={7}>
                    {matchql.map((list) => {
                      return (
                        <>
                          <Flex className={styles.valueListStyle} row center>
                            <div className={styles.svgStyle}>
                              <SvgDone />
                            </div>
                            <Text
                              style={{ color: '#333333', fontSize: '13px' }}
                            >
                              {list}{' '}
                            </Text>
                          </Flex>
                        </>
                      );
                    })}
                    {Notmatchql.map((list) => {
                      return (
                        <>
                          <Flex className={styles.valueListStyle} row center>
                            <Flex className={styles.svgStyle}>
                              <SvgClose fill="#ED4857" />
                            </Flex>
                            <Text
                              style={{ color: '#333333', fontSize: '13px' }}
                            >
                              {list}{' '}
                            </Text>
                          </Flex>{' '}
                        </>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>
             
            )}
             </Flex>
          </>
        )}
      </Flex>
      <Flex
       height={window.innerHeight - 115}
       style={{
         border: '0.3px solid #C3C3C3',
         width: '1px',
         margin: '15px 5px 10px 5px',
         paddingTop: '10px',
         paddingBottom:'10px'
       }}
      ></Flex>
      <Flex flex={6.4}>
        <AllMatchTab title={''} inviteMessage={''} />
      </Flex>
    </Flex>
  );
};

export default MatchingAnalysisTab;
