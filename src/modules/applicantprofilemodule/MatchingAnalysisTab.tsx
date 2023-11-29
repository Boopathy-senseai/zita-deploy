import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ProgressBar from "@ramonak/react-progress-bar";
import { useMediaQuery } from 'react-responsive';

import { Bothcandidateidjobid } from '../../routes/apiRoutes';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { Card, Modal, Toast } from '../../uikit';
import SvgDone from '../../icons/SvgDone';
import SvgClose from '../../icons/Svgnotmatch';
import { GARY_7, WHITE } from '../../uikit/Colors/colors';

import { AppDispatch, RootState } from '../../store';
import Tab from '../../uikit/Tabs/Tab';
import { Loader } from '../../uikit';
import { Button, LinkWrapper } from '../../uikit';
import Tabs from '../../uikit/Tabs/Tabs';
import SvgAngle from '../../icons/SvgAngle';
import SvgNoData from '../../icons/SvgNoData';
import SvgModuleicon from '../../icons/SvgModuleicon';

import { removeUnderScores, lowerCase } from '../../uikit/helper';
import { WeightagematchinggetMiddleWare, WeightagematchingpostMiddleWare } from '../createjdmodule/store/middleware/createjdmiddleware';
import SvgUpArrow from '../../icons/SvgArrowUp';
import SvgArrowDown1 from '../../icons/SvgArrowDown1';
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
type Props = {
  updatr_overall?: (val: any) => void;
}
const MatchingAnalysisTab = ({ updatr_overall }: Props) => {


  const {
    match,
    matchql,
    data,
    overall_percentage,
    non_tech_percentage,
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
    tech,
    success,
    non_tech,
    outputtech,
    outputnontech,

  } = useSelector(
    ({
      applicantProfileInitalReducers,
      candidatejdmatchReducers,
      weightageReducers,
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
        matchql: candidatejdmatchReducers.matched_data.matched_qualification,
        data: candidatejdmatchReducers.matched_data.matched_skills,
        overall_percentage: candidatejdmatchReducers.overall_percentage,
        non_tech_percentage:candidatejdmatchReducers.non_tech_percentage,
        Notmatch: candidatejdmatchReducers.not_matched_data.not_matched_skills,
        Notmatchql: candidatejdmatchReducers.not_matched_data.not_matched_qualification,
        qualification_percent: candidatejdmatchReducers.qualification_percent,
        skills_percent: candidatejdmatchReducers.skills_percent,
        overallskill: candidatejdmatchReducers.source.jd_skills,
        overallQualification: candidatejdmatchReducers.source.qualification,
        matchedlocation: candidatejdmatchReducers.matched_data.matched_location,
        notmatchedlocation: candidatejdmatchReducers.not_matched_data.not_matched_location,
        location: candidatejdmatchReducers.source.jd_location,
        location_percent: candidatejdmatchReducers.location_percent,
        success: weightageReducers.success,
        non_tech: weightageReducers.non_tech,

        tech: weightageReducers.tech_skills,
        outputnontech: candidatejdmatchReducers.non_technical,
        outputtech: candidatejdmatchReducers.technical,

      };
    },
  );
  console.log(overall_percentage, '2222333overall_percentageoverall_percentage')
  const [valtech, setvaltech] = useState(outputtech.length > 0 ? outputtech : [])
  const [valnontech, setvalnontech] = useState(outputnontech.length > 0 ? outputnontech : [])



  const [isViewMoreClicked, setIsViewMoreClicked] = useState(false);

  const handleViewMoreClick = () => {
    setIsViewMoreClicked(true);
  };

  const handleViewLessClick = () => {
    setIsViewMoreClicked(false);
  };
  const [isCollapse, setCollapse] = useState(false);
  const [isloadings, setisloading] = useState(false);

  const isTablet = useMediaQuery({ query: '(max-width: 1000px)' });
  const normal= useMediaQuery({ query: '(min-width: 1000px) and (max-width: 1411px)' });
  
  let formData = new FormData();
  const [isnextLoader, setnextLoader] = useState(false)


  const [model, setmodel] = useState(false)
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);

  const [islodermatch, setloadermatch] = useState(false);

  const [overallpercent, setoverallpercent] = useState<any>();


  useEffect(() => {
    setoverallpercent(overall_percentage)
    setvaltech(outputtech)
    setvalnontech(outputnontech)
  }, [])

 

  const [expandedIndex2, setExpandedIndex2] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState([]);
  const dispatch: AppDispatch = useDispatch();

  function calculateLineCount(text, lineHeight, maxWidth) {
    // Create a temporary element to measure the text
    const tempElement = document.createElement("div");
    tempElement.style.position = "absolute";
    tempElement.style.whiteSpace = "pre-wrap";
    tempElement.style.wordWrap = "break-word";
    tempElement.style.lineHeight = `${lineHeight}px`;
    tempElement.style.width = `${maxWidth}px`;
    tempElement.innerHTML = text;
  
    // Append the temporary element to the document
    document.body.appendChild(tempElement);
  
    // Calculate the number of lines based on the height of the element
    const lineCount = Math.ceil(tempElement.clientHeight / lineHeight);
  
    // Remove the temporary element
    document.body.removeChild(tempElement);
  
    return lineCount;
  }
  

  const handleToggleCollapse = (index) => {
    setExpandedIndex((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((prevIndex) => prevIndex !== index)
        : [...prevIndexes, index]
    );
  };
  const handleToggleCollapse2 = (index) => {
    setExpandedIndex2((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((prevIndex) => prevIndex !== index)
        : [...prevIndexes, index]
    );
  };

  useEffect(() => {
    setExpandedIndex([]);
    setExpandedIndex2([]);
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

  return (
    <>
{console.log('nontechp',non_tech_percentage)}

      {isloadings || islodermatch && <Loader />}
      <Tabs>
        <Tab title='Score Analysis'>
          <Flex row flex={12} height={window.innerHeight - 120}>
            <Flex flex={6} className={styles.overAll}>

              <Flex row between style={{ padding: '10px 10px 0px 10px' }}>
                <Text bold style={{ fontSize: '14px', marginBottom: '5px' }}>
                  Score Analysis
                </Text>
                <Flex row className={styles.overallScore}>
                <Flex row>
                  <Flex>
                    <Text size={13}>Profile Compatibility Score:</Text>
                    </Flex>
                    <Flex style={{ paddingLeft: "8px" }}>
                    <ProgressBar
                      completed={overallpercent}
                      bgColor={
                        overallpercent < 40 ? "#FF0000"
                          : overallpercent >= 40 && overallpercent < 69 ? "#FFC203"
                            : overallpercent > 69 && "#96E596"
                      }
                      width="200px"
                      borderRadius='4px'
                      labelColor="black"
                      labelSize="13px"
                      labelAlignment="center"
                      labelClassName={styles.progressbarlabel}
                      isLabelVisible={true}
                    >
                    </ProgressBar>
                    <Flex
                      style={{
                        position: 'absolute',
                        color: 'black',
                        width: "200px",
                        justifyContent: "center"
                      }}
                    >
                      <Text size={13} bold color="primary">{overallpercent}</Text>
                    </Flex>
                      </Flex>
                </Flex>
                <Flex>
                <Flex row style={{paddingLeft: "20px"}}>
                  <Flex>
                    <Text size={13}>Enhanced Matching Score:</Text>
                    </Flex>
                    <Flex style={{ paddingLeft: "8px" }}>
                    <ProgressBar
                      completed={non_tech_percentage}
                      bgColor={
                        non_tech_percentage < 40 ? "#FF0000"
                          : non_tech_percentage >= 40 && non_tech_percentage < 69 ? "#FFC203"
                            : non_tech_percentage > 69 && "#96E596"
                      }
                      width="200px"
                      borderRadius='4px'
                      labelColor="black"
                      labelSize="13px"
                      labelAlignment="center"
                      labelClassName={styles.progressbarlabel}
                      isLabelVisible={true}
                    >
                    </ProgressBar>
                    <Flex
                      style={{
                        position: 'absolute',
                        color: 'black',
                        width: "200px",
                        justifyContent: "center"
                      }}
                    >
                      <Text size={13} bold color="primary">{non_tech_percentage}</Text>
                    </Flex>
                      </Flex>
                </Flex>
                </Flex>
              
              </Flex>
              </Flex>

              <Flex row className={styles.btnwithContent}>
                <Flex row className={styles.aligncenter}>
                  <Flex>
                    <Text>Detailed Candidate Score Analysis Aligned with Job Requirements</Text>
                  </Flex>
                  
                </Flex>
                <Flex >
                  {isInfoPopupOpen && (
                    <Card className={styles.cardfront1}>
                      <Flex>
                      <Flex row center className={styles.infotitle}>
                        <SvgModuleicon />{' '}
                        <Text className={styles.moreinformation}>
                          More Information
                        </Text>{' '}
                      </Flex>
                      <Flex>
                      <Text color="gray" size={13}>You can assign and adjust weights to the each criteria based on the specific Job description.</Text>
                      <Text color="gray" size={13}>The weightage you assign for each criterion in the Technical Matching section is considered for job matching. </Text>
                      <Text color="gray" size={13}>Higher weights indicate greater importance.</Text>
                      </Flex> 
                      </Flex>
                    </Card>
                  )}
                </Flex>
              </Flex>
              {/* <Flex row className={styles.overallScore}>
                <Flex row>
                  <Flex>
                    <Text size={13}>Technical Score:</Text>
                    </Flex>
                    <Flex style={{ paddingLeft: "8px" }}>
                    <ProgressBar
                      completed={overallpercent}
                      bgColor={
                        overallpercent < 40 ? "#FF0000"
                          : overallpercent >= 40 && overallpercent < 69 ? "#FFC203"
                            : overallpercent > 69 && "#96E596"
                      }
                      width="200px"
                      borderRadius='4px'
                      labelColor="black"
                      labelSize="13px"
                      labelAlignment="center"
                      labelClassName={styles.progressbarlabel}
                      isLabelVisible={true}
                    >
                    </ProgressBar>
                    <Flex
                      style={{
                        position: 'absolute',
                        color: 'black',
                        width: "200px",
                        justifyContent: "center"
                      }}
                    >
                      <Text size={13} bold color="primary">{overallpercent}</Text>
                    </Flex>
                      </Flex>
                </Flex>
                <Flex>
                <Flex row style={{paddingLeft: "20px"}}>
                  <Flex>
                    <Text size={13}>Non-Technical Score:</Text>
                    </Flex>
                    <Flex style={{ paddingLeft: "8px" }}>
                    <ProgressBar
                      completed={non_tech_percentage}
                      bgColor={
                        non_tech_percentage < 40 ? "#FF0000"
                          : non_tech_percentage >= 40 && non_tech_percentage < 69 ? "#FFC203"
                            : non_tech_percentage > 69 && "#96E596"
                      }
                      width="200px"
                      borderRadius='4px'
                      labelColor="black"
                      labelSize="13px"
                      labelAlignment="center"
                      labelClassName={styles.progressbarlabel}
                      isLabelVisible={true}
                    >
                    </ProgressBar>
                    <Flex
                      style={{
                        position: 'absolute',
                        color: 'black',
                        width: "200px",
                        justifyContent: "center"
                      }}
                    >
                      <Text size={13} bold color="primary">{non_tech_percentage}</Text>
                    </Flex>
                      </Flex>
                </Flex>
                </Flex>
              
              </Flex> */}


              <Flex
                height={window.innerHeight - 224}
                style={{ overflow: "scroll", padding: "10px 10px 10px 10px" }}
                className={outputnontech.length <= 0 ? (outputtech.length <= 0 ? (styles.nodata) : ("")) : ("")}
              >
                {/* Technical */}
                {valtech && valtech.length > 0 && valnontech && valnontech.length > 0 ? (<>

                  <Flex className={styles.techcardstyles}>
                    <Card>
                      {valtech.length > 0 ? (
                        <Flex style={{ padding: "15px" }}>
                          <Flex row marginBottom={10}>
                            <Flex style={{ width: "20%" }}>
                              <Text bold>Profile Compatibility Criteria</Text>
                            </Flex>
                            <Flex style={{ width: '20%' }}>
                              <Text bold>Score (100)</Text>
                            </Flex>
                            <Flex center style={{ width: '20%', display: "flex" }}>
                              <Text bold>Weightage</Text>
                            </Flex>
                            <Flex style={{ width: '40%' }}>
                              <Text bold>Description</Text>
                            </Flex>
                            {/* </Flex> */}
                          </Flex>
                          <Flex>
                            <div>

                              {valtech.map((skill, index) => (
                                <Flex className={styles.innerSliderbarStyle} key={index}>

                                  <Flex className={styles.infohead1}>
                                    {
                                      skill.title==='Skills'?(<Text>Technical skills</Text>):(<Text>{skill.title}</Text>)
                                    }
                                    
                                  </Flex>

                                  <Flex className={styles.infohead2}>
                                    <ProgressBar
                                      completed={`${skill.percentage}`}
                                      bgColor="#581845"
                                      width="100%"
                                      height='6px'
                                      borderRadius='4px'
                                      labelColor="black"
                                      labelAlignment="outside"
                                      labelClassName={
                                        skill.percentage < 10
                                          ? styles.labelpadding
                                          : skill.percentage >= 100
                                            ? styles.labelpadding2
                                            : styles.labelpadding3}
                                    >
                                    </ProgressBar>
                                  </Flex>

                                  <Flex className={styles.infohead3}>
                                    <Text>
                                      {skill.skill_percentage}
                                    </Text>
                                  </Flex>

                                  <Flex
                                    width={"40%"}
                                  >
                                    {/* ChatGPT Content */}
                                    {skill.percentage === 0 ? (<Text> No Information Available</Text>
                                    ) : (
                                      <Flex >
                                        {
                                          expandedIndex?.includes(index) ? (
                                            <>
                                              <Flex>
                                                <Text>
                                                  {skill.description}

                                                </Text>
                                              </Flex>
                                              <Flex
                                              row
                                              center
                                                onClick={() => handleToggleCollapse(index)}
                                                style={{ cursor: "pointer" }}>

                                                <Flex><Text color= "theme" bold> View Less</Text></Flex>
                                                <Flex width={5}></Flex>
                                                <Flex>
                                                  <SvgUpArrow
                                                  width={10}
                                                  height={10}
                                                  fill={"#581845"}/>
                                                </Flex>
                                              </Flex></>
                                          ) : (
                                            <>
                                              {calculateLineCount(skill.description,5,500) > 2 ? (
                                                <>
                                                
                                                  <Flex  >
                                                    <Text className={styles.textellipces}>{skill.description}</Text>
                                                  </Flex>
                                                  <Flex
                                                  row
                                                  center
                                                    onClick={() => handleToggleCollapse(index)}
                                                    style={{ cursor: "pointer" }}>
                                                    <Flex><Text color="theme" bold>View More</Text></Flex>
                                                    <Flex width={5}></Flex>
                                                    <Flex>
                                                      <SvgArrowDown1
                                                      width={10}
                                                      height={10}
                                                      fill={"581845"}/>
                                                    </Flex>
                                                  </Flex></>) : (<>
                                                    <Flex >
                                                      <Text>
                                                      {skill.description}
                                                      </Text>
                                                    
                                                    </Flex>
                                                  </>)
                                              }
                                            </>)
                                        }
                                      </Flex>)

                                    }

                                  </Flex>

                                </Flex>))}

                            </div>


                          </Flex>
                        </Flex>
                      ) : (
                        <Text>No Data Available</Text>
                      )}
                    </Card>
                  </Flex>

                  <Flex style={{ height: "20px" }}></Flex>
                  {/* Non-Technical */}
                  <Flex className={styles.nontechcardstyles}>
                    <Card>

                      {valnontech.length > 0 ? (
                        <Flex style={{ padding: "15px" }}>
                          <Flex row marginBottom={10}>
                            {/* <Flex>
                            <Text bold>Non-Technical Matching</Text>
                          </Flex> */}
                            <Flex style={{ width: "20%" }}>
                              <Text bold>Enhanced Matching Criteria</Text>
                            </Flex>
                            <Flex style={{ width: '20%' }}>
                              <Text bold>Score (100)</Text>
                            </Flex>
                            <Flex center style={{ width: '20%', display: "flex" }}>
                              <Text bold>Weightage</Text>
                            </Flex>
                            <Flex style={{ width: '40%' }}>
                              <Text bold>Description</Text>
                            </Flex>
                          </Flex>
                          <Flex>


                            {valnontech.map((skill, index) => (
                              <Flex className={styles.innerSliderbarStyle} key={index}>

                                <Flex className={styles.infohead1}>
                                  <Text>{skill.title}</Text>
                                </Flex>

                                <Flex className={styles.infohead2}>
                                  <ProgressBar
                                    completed={`${skill.percentage}`}
                                    bgColor="#581845"
                                    width="100%"
                                    height='6px'
                                    borderRadius='4px'
                                    labelColor="black"
                                    labelAlignment="outside"
                                    labelClassName={
                                      skill.percentage < 10
                                        ? styles.labelpadding
                                        : skill.percentage >= 100
                                          ? styles.labelpadding2
                                          : styles.labelpadding3}
                                  >
                                  </ProgressBar>
                                </Flex>

                                <Flex className={styles.infohead3}>
                                  <Text>
                                    {skill.skill_percentage}
                                  </Text>
                                </Flex>

                                {/* </Flex> */}
                                {/* </Flex> */}
                                <Flex
                                  width={"40%"}
                                >
                                  {/* ChatGPT Content */}
                                  {skill.percentage === 0 ? (<Text> No Information Available</Text>
                                  ) : (
                                    skill.description === "" ? 
                                    <Flex>
                                      <Text>
                                        No Information Available</Text>
                                      </Flex> 
                                      : 
                                    <Flex >
                                    {
                                      expandedIndex2?.includes(index) ? (
                                        <>
                                          <Flex>
                                            <Text>
                                              {skill.description}
                                            </Text>
                                          </Flex>
                                          <Flex
                                          row
                                          center
                                            onClick={() => handleToggleCollapse2(index)}
                                            style={{ cursor: "pointer" }}>
                                          <Flex><Text color= "theme" bold> View Less</Text></Flex>
                                              <Flex width={5}></Flex>
                                              <Flex>
                                                <SvgUpArrow
                                                width={10}
                                                height={10}
                                                fill={"#581845"}/>
                                              </Flex>
                                          </Flex></>
                                      ) : (
                                        <>
                                          {skill.description.length > 155 ? (
                                            <>
                                              <Flex >
                                                <Text className={styles.textellipces}>
                                                  {skill.description}</Text>
                                              </Flex>
                                              <Flex
                                              row
                                              center
                                                onClick={() => handleToggleCollapse2(index)}
                                                style={{ cursor: "pointer" }}>
                                                  <Flex><Text color="theme" bold>View More</Text></Flex>
                                                  <Flex width={5}></Flex>
                                                  <Flex>
                                                    <SvgArrowDown1
                                                    width={10}
                                                    height={10}
                                                    fill={"581845"}/>
                                                  </Flex>
                                              </Flex></>) : (<>
                                                <Flex >
                                                  <Text>
                                                    {skill.description}
                                                  </Text>
                                                </Flex>
                                              </>)
                                          }
                                        </>)
                                    }
                                  </Flex>
                                  )

                                  }

                                </Flex>

                              </Flex>))}

                          </Flex>
                        </Flex>) : (
                        <Flex>
                          <Text>No Data Available</Text>
                        </Flex>
                      )}
                    </Card>
                  </Flex></>) : (<Flex className={styles.rarecase}>
                    <Flex>
                      <SvgNoData width={16} height={16} fill={"#888"} />
                    </Flex>
                    <Flex marginTop={3}>
                      <Text>
                        No data available.
                      </Text></Flex>

                  </Flex>)}
              </Flex>

            </Flex>
          </Flex>
        </Tab>
        <Tab title='All Matching Jobs'>
          <Flex flex={6.4}>
            <AllMatchTab title={''} inviteMessage={''} />
          </Flex>
        </Tab>
      </Tabs>

    </>
  );
};

export default MatchingAnalysisTab;