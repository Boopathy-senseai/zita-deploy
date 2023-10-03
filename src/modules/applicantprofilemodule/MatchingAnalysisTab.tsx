import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { Card } from '../../uikit';
import SvgDone from '../../icons/SvgDone';
import SvgClose from '../../icons/Svgnotmatch';
import ProgressBar from '../../uikit/ProgressBar/ProgressBar';
import { GARY_7, WHITE } from '../../uikit/Colors/colors';
import { AppDispatch, RootState } from '../../store';
import Tab from '../../uikit/Tabs/Tab';
import { Loader } from '../../uikit';
import { Button, LinkWrapper } from '../../uikit';
import Tabs from '../../uikit/Tabs/Tabs';
import SvgAngle from '../../icons/SvgAngle';
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
import { CandidatejobidMatchMiddleWare } from './store/middleware/applicantProfileMiddleware';

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
    notmatchedlocation,
    matchedlocation,
    location,
    location_percent,
    ai_matching,
    aidata,
    jd_id,
    can_id,
  } = useSelector(
    ({
      applicantProfileInitalReducers,
      candidatejdmatchReducers,
    }: RootState) => {
      return {
        can_id: applicantProfileInitalReducers.can_id,
        jd_id: applicantProfileInitalReducers?.jd_id,
        isLoading: candidatejdmatchReducers.isLoading,
        ai_matching: candidatejdmatchReducers?.ai_matching,
        aidata: candidatejdmatchReducers?.data,
        match: candidatejdmatchReducers.match
          ? candidatejdmatchReducers.match
          : [],
        matchql:
          typeof candidatejdmatchReducers.matched_data.matched_qualification !==
            'undefined' &&
          candidatejdmatchReducers.matched_data.matched_qualification,
        data:
          typeof candidatejdmatchReducers.matched_data.matched_skills !==
            'undefined' && candidatejdmatchReducers.matched_data.matched_skills,
        overall_percentage:
          typeof candidatejdmatchReducers.overall_percentage !== 'undefined' &&
          candidatejdmatchReducers.overall_percentage,
        Notmatch:
          typeof candidatejdmatchReducers.not_matched_data
            .not_matched_skills !== 'undefined' &&
          candidatejdmatchReducers.not_matched_data.not_matched_skills,
        Notmatchql:
          typeof candidatejdmatchReducers.not_matched_data
            .not_matched_qualification !== 'undefined' &&
          candidatejdmatchReducers.not_matched_data.not_matched_qualification,
        qualification_percent: candidatejdmatchReducers.qualification_percent,
        skills_percent: candidatejdmatchReducers.skills_percent,
        overallskill:
          typeof candidatejdmatchReducers.source.jd_skills !== 'undefined' &&
          candidatejdmatchReducers.source.jd_skills,
        overallQualification:
          typeof candidatejdmatchReducers.source.qualification !==
            'undefined' && candidatejdmatchReducers.source.qualification,
        matchedlocation:
          typeof candidatejdmatchReducers.matched_data.matched_location !==
            'undefined' &&
          candidatejdmatchReducers.matched_data.matched_location,
        notmatchedlocation:
          typeof candidatejdmatchReducers.not_matched_data
            .not_matched_location !== 'undefined' &&
          candidatejdmatchReducers.not_matched_data.not_matched_location,
        location:
          typeof candidatejdmatchReducers.source.jd_location !== 'undefined' &&
          candidatejdmatchReducers.source.jd_location,
        location_percent:
          typeof candidatejdmatchReducers.location_percent !== 'undefined' &&
          candidatejdmatchReducers.location_percent,
      };
    },
  );
  const [isCollapse, setCollapse] = useState(false);
  const [isloadings, setisloading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState([]);
  const dispatch: AppDispatch = useDispatch();

  const handleToggleCollapse = (index) => {
    setExpandedIndex((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((prevIndex) => prevIndex !== index)
        : [...prevIndexes, index]
    );
  };
   
  useEffect(() => { 
    setExpandedIndex([]);
  }, []);

  useEffect(() => {
    if (isLoading === true) {
      setisloading(true);
    } else {
      setisloading(false);
    }
  });
  const dispatchhandling = () => {
    dispatch(
      CandidatejobidMatchMiddleWare({
        jd_id: jd_id,
        can_id: can_id,
        matching: true,
      }),
    );
  };
  const checkMatch = overall_percentage === 0 ? true : false;
  const profileMatch = checkMatch ? 0 : overall_percentage;
  const skillconvert = Math.round((skills_percent / 95) * 100);
  const qualificationconvert = (qualification_percent / 5) * 100;
  return (
    <Flex row flex={12} height={window.innerHeight - 120}>
      {isloadings && <Loader />}
      <Flex flex={6} className={styles.overAll}>
        <Flex row between style={{padding:'16px 16px 0px 16px'}}>
          <Flex>
            <Flex>
              <Text bold style={{ fontSize: '14px', marginBottom: '5px' }}>
                Matching Analysis
              </Text>
            </Flex>
            <Flex>
              <Text size={13}>
                Overall matching score for this candidate with the job
              </Text>
            </Flex>
          </Flex>
          {ai_matching ? (
            <Flex row between center marginBottom={10}>
              <ProgressBar
                verticalWidth={'100px'}
                roundProgressHeight={45}
                type="round"
                percentage={ Math.round(aidata && aidata[0].overall_percentage)}
              />
            </Flex>
          ) : (
            <Flex>
              <Button onClick={dispatchhandling}>AI Matching</Button>
            </Flex>
          )}
        </Flex>
        {!ai_matching ? (
          <>
            <Flex center style={{padding:'0px 16px 0px 16px'}}>
              <Flex
                row
                between
                marginTop={20}
                center
                className={styles.progressStyle}
                style={{
                  paddingBottom: '20px',

                  borderBottom: '1px solid #C3C3C3',
                }}
                flex={12}
              >
                <Flex flex={6} marginLeft={'50px'}>
                  <ProgressBar
                    verticalWidth={'100px'}
                    roundProgressHeight={70}
                    type="round"
                    percentage={profileMatch}
                  />
                </Flex>
                <Flex center>
                  <Flex row flex={6}>
                    <Flex marginRight={18} style={{ fontSize: '13px' }}>
                      Skills
                    </Flex>
                    <Flex marginLeft={'43.2px'}>
                      <ProgressBar
                        verticalWidth={'200px'}
                        type="hr"
                        percentage={skillconvert}
                        changingpercentageinmatching={skills_percent}
                      />
                    </Flex>
                  </Flex>
                  <Flex
                    row
                    marginTop={20}
                    style={{ bottom: '1px solid #C3C3C3' }}
                  >
                    <Flex marginRight={20} style={{ fontSize: '13px' }}>
                      Qualification
                    </Flex>
                    <Flex>
                      <ProgressBar
                        verticalWidth={'200px'}
                        type="hr"
                        percentage={qualificationconvert}
                        changingpercentageinmatching={qualification_percent}
                      />
                    </Flex>
                  </Flex>
                  {/* <Flex
                    row
                    between
                    marginTop={10}
                    style={{ bottom: '1px solid #C3C3C3' }}
                  >
                    <Flex marginRight={20} style={{ fontSize: '13px' }}>
                    Location 
                    </Flex>
                    <Flex>
                      <ProgressBar
                        verticalWidth={'200px'}
                        type="hr"
                        percentage={location_percent}
                      />
                    </Flex>
                  </Flex> */}
                </Flex>
              </Flex>
            </Flex>

            <Flex
              height={window.innerHeight - 295}
              style={{ overflow: 'scroll', display: 'flex',padding:'0px 16px 0px 16px'}}
            >
              {data && (
                <Flex className={styles.mapListContainer}>
                  <Flex row center between className={styles.dataListStyle}>
                    <Flex flex={3}>
                      <Text className={styles.titleStyle}>Skills</Text>
                    </Flex>
                    <Flex flex={2}>
                      <Text bold style={{ fontSize: '13px' }}>
                        {data ? data.length : 0}/
                        {overallskill ? overallskill.length : 0}
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
                                style={{
                                  color: '#333333',
                                  fontSize: '13px',
                                  textTransform: 'uppercase',
                                }}
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
                                  style={{
                                    color: '#333333',
                                    fontSize: '13px',
                                    textTransform: 'uppercase',
                                  }}
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
                <Flex className={styles.mapListContainer}>
                  <Flex
                    // key={data}
                    row
                    center
                    between
                    className={styles.dataListStyle}
                  >
                    <Flex flex={3}>
                      <Text className={styles.titleStyle}>Qualification</Text>
                    </Flex>
                    <Flex flex={2}>
                      <Text bold style={{ fontSize: '13px' }}>
                        {matchql ? matchql.length : 0}/
                        {overallQualification ? overallQualification.length : 0}
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
                                style={{
                                  color: '#333333',
                                  fontSize: '13px',
                                  textTransform: 'uppercase',
                                }}
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
                                style={{
                                  color: '#333333',
                                  fontSize: '13px',
                                  textTransform: 'uppercase',
                                }}
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
              {/* {data && (
                <Flex flex={1} className={styles.mapListContainer}>
                  {/* {data.map((list, listIndex) => {  

                  <Flex
                    // key={data}
                    row
                    center
                    between
                    className={styles.dataListStyle}
                    // backgroundColor={colorCode[listIndex % colorCode.length]}
                  >
                    <Flex flex={3}>
                      <Text className={styles.titleStyle}>Location</Text>
                    </Flex>
                    <Flex flex={2}>
                      <Text bold style={{ fontSize: '13px' }}>
                        {matchedlocation ? matchedlocation.length : 0}/
                        {location ? location.length : 0}
                      </Text>
                    </Flex>
                    <Flex flex={7}>
                      {matchedlocation.map((list) => {
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
                      {notmatchedlocation.map((list) => {
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
              )} */}
            </Flex>
          </>
        ) : (
          <>
            <Flex center middle></Flex>
            <Flex
              style={{
                borderBottom: '1px solid #C3C3C3',
                margin:'0px 16px'
              }}
            ></Flex>
            <Flex marginTop={7} style={{ overflow: 'scroll', display: 'flex',padding:'0px 0px 0px 16px' }}>
              {aidata && aidata[0].title !== '' && (
                <Flex
                  height={window.innerHeight - 155}
                  style={{ overflow: 'scroll', display: 'flex',padding:'0px 10px 0px 0px' }}
                >
                  {aidata &&
                    aidata.map((matchdata, index) => {
                      return (
                        <>
                          <Card className={styles.cardchanging}>
                            <Flex className={styles.mapListContainer}>
                              <Flex
                                row
                                center
                                between
                                className={styles.dataListStyleai}
                              >
                                <Flex flex={3} center>
                                  <Text className={styles.titleStyle}>
                                    {matchdata.title.replaceAll('_', ' ')}
                                  </Text>
                                </Flex>
                                <Flex row center>
                                  <Flex marginRight={20}>
                                    <ProgressBar
                                      matchingpercentage
                                      verticalWidth={'100px'}
                                      type="hr"
                                      percentage={matchdata.percentage}
                                    />
                                  </Flex>
                                  <Flex
                                    onClick={() => handleToggleCollapse(index)}
                                    center
                                    middle
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <SvgAngle
                                      width={12}
                                      height={12}
                                      fill="#581845"
                                      up={expandedIndex?.includes(index)}
                                    />
                                  </Flex>
                                </Flex>
                              </Flex>
                              {expandedIndex?.includes(index) && (
                                <Flex
                                  style={{
                                    flexWrap: 'wrap',
                                    overflow: ' hidden',
                                    textOverflow: 'clip',
                                    fontSize: 12,
                                  }}
                                  marginTop={5}
                                >
                                  <td
                                    className={styles.textwrap}
                                    dangerouslySetInnerHTML={{
                                      __html: matchdata.description,
                                    }}
                                  />
                                </Flex>
                              )}
                            </Flex>{' '}
                          </Card>
                        </>
                      );
                    })}
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
          paddingBottom: '10px',
        }}
      ></Flex>
      <Flex flex={6.4}>
        <AllMatchTab title={''} inviteMessage={''} />
      </Flex>
    </Flex>
  );
};

export default MatchingAnalysisTab;
