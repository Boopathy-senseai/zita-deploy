import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ProgressBar from "@ramonak/react-progress-bar";
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
  const [valtech,setvaltech] = useState(outputtech.length >0 ? outputtech : [])
  const [valnontech,setvalnontech] = useState(outputnontech.length > 0 ? outputnontech : [])
  useEffect(() => {
    if (success === true) {
      setRangeValueskill(tech.skills);
      setRangeValuerolles(tech.roles);
      setRangeValueexperience(tech.exp);
      setRangeValueQualifications(tech.qualification);
      setRangeValueTechnical(tech.tech_tools);
      setRangeValueSoft(tech.soft_skills);



      setRangeValueIndustry(non_tech.industry_exp);
      setRangeValueDomain(non_tech.domain_exp);
      setRangeValueCertifications(non_tech.certification);
      setRangeValueLocation(non_tech.location);
      setRangeValueCultural(non_tech.cultural_fit);
      setRangeValueReferences(non_tech.ref);
    }
    dispatch(WeightagematchinggetMiddleWare(jd_id))
    .then((res)=>{
      if (res.payload.success === false) {
        Toast(
          'Sorry, there was a problem connecting to the API. Please try again later.',
          'LONG',
          'error',
        );
      }
    })
  }, [success])


  useEffect(()=>{
    if(valtech === undefined && valnontech === undefined){
      alert("suceess")
      setvaltech(outputtech)
      setvalnontech(outputnontech)
    }
  },[valtech,valnontech])


    const [isViewMoreClicked, setIsViewMoreClicked] = useState(false);

    const handleViewMoreClick = () => {
      setIsViewMoreClicked(true);
    };

    const handleViewLessClick = () => {
      setIsViewMoreClicked(false);
    };
  const [isCollapse, setCollapse] = useState(false);
  const [isloadings, setisloading] = useState(false);

  let formData = new FormData();
  const [isnextLoader, setnextLoader] = useState(false)

  const [rangeValueskill, setRangeValueskill] = useState<any>(20);
  const [rangeValuerolles, setRangeValuerolles] = useState<any>(20);
  const [rangeValueexperience, setRangeValueexperience] = useState<any>(20);
  const [rangeValueQualifications, setRangeValueQualifications] = useState<any>(10);
  const [rangeValueTechnical, setRangeValueTechnical] = useState<any>(20);
  const [rangeValueSoft, setRangeValueSoft] = useState<any>(10);



  const [rangeValueIndustry, setRangeValueIndustry] = useState<any>(20);
  const [rangeValueDomain, setRangeValueDomain] = useState<any>(20);
  const [rangeValueCertifications, setRangeValueCertifications] = useState<any>(20);
  const [rangeValueLocation, setRangeValueLocation] = useState<any>(10);
  const [rangeValueCultural, setRangeValueCultural] = useState<any>(20);
  const [rangeValueReferences, setRangeValueReferences] = useState<any>(10);



  const [technicalPercent, setTechnicalPercent] = useState(0);
  const [nonTechnicalPercent, setNonTechnicalPercent] = useState(0);

  const [totaltechnical, settotaltechnical] = useState(0)
  const [totalnontechnical, settotalnontechnical] = useState(0);

  const [model, setmodel] = useState(false)
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);

  const [islodermatch,setloadermatch]=useState(false);

  const handleWeightageOpen = () => {
    setmodel(true)
  }
  const handleWeightageClose = () => {
    setmodel(false)
  }

  const updateTechnicalPercent = () => {
    const totalTechnicalPercent =
      rangeValueskill +
      rangeValuerolles +
      rangeValueexperience +
      rangeValueQualifications +
      rangeValueTechnical +
      rangeValueSoft;
    setTechnicalPercent(totalTechnicalPercent);
    settotaltechnical(totalTechnicalPercent)
  };
  const text2="The candidate has experience in performing general ledger management duties, reconciling bank statements, recording journal entries, and preparing financial statements.The candidate has experience in performing general ledger management duties, reconciling bank statements, recording journal entries, and preparing financial statements.The candidate has experience in performing general ledger management duties, reconciling bank statements, recording journal entries, and preparing financial statements."

  const updateNonTechnicalPercent = () => {
    const totalNonTechnicalPercent =
      rangeValueIndustry +
      rangeValueDomain +
      rangeValueCertifications +
      rangeValueLocation +
      rangeValueCultural +
      rangeValueReferences;
    setNonTechnicalPercent(totalNonTechnicalPercent);
    settotalnontechnical(totalNonTechnicalPercent);
  };


  useEffect(() => {
    updateTechnicalPercent();
    updateNonTechnicalPercent();
  }, [rangeValueskill, rangeValuerolles, rangeValueexperience, rangeValueQualifications, rangeValueTechnical, rangeValueSoft, rangeValueIndustry, rangeValueDomain, rangeValueCertifications, rangeValueLocation, rangeValueCultural, rangeValueReferences]); // Empty dependency array ensures this runs only once after initial render



  const nextfunction = () => {
    if (totalnontechnical === 100 && totaltechnical === 100) {
      const list = [{
        'skills': rangeValueskill,
        'roles': rangeValuerolles,
        'exp': rangeValueexperience,
        'qualification': rangeValueQualifications,
        'tech_tools': rangeValueTechnical,
        'soft_skills': rangeValueSoft,
        'industry_exp': rangeValueIndustry,
        'domain_exp': rangeValueDomain,
        'certification': rangeValueCertifications,
        'location': rangeValueLocation,
        'cultural_fit': rangeValueCultural,
        'ref': rangeValueReferences
      }]
      formData.append("tech", JSON.stringify(list))
      formData.append("jd_id", jd_id)
      setnextLoader(true)
      dispatch(
        WeightagematchingpostMiddleWare({
          formData
        }),
      ).then((res) => {
        if (res.payload.success === false) {

          setnextLoader(false);
          handleWeightageClose();
          Toast(
            'Sorry, there was a problem connecting to the API. Please try again later.',
            'LONG',
            'error',
          )
        }
        else {
          setnextLoader(false);
          handleWeightageClose();
          setloadermatch(true)
          axios.get(`${Bothcandidateidjobid}?jd_id=${jd_id}&can_id=${can_id}&matching=True`)
          .then((r) => {
            if(r.data.error===true)
            {
              alert('eeee')
              // setvaltech([])
              // setvalnontech([])
              Toast(
                'Sorry, there was a problem connecting to the API. Please try again later.',
                'LONG',
                'error',
              )
              setloadermatch(false)
            }
            if (r.data) {
              console.log("resss----->",r)
              setvaltech(r.data.technical)
              setvalnontech(r.data.non_technical)
              setloadermatch(false)
            }

      });
          Toast('Weightage settings saved successfully!', 'LONG');
        }
      })
    }
  }


  const resetfunction = () => {
    setRangeValueskill(20);
    setRangeValuerolles(20);
    setRangeValueexperience(20);
    setRangeValueQualifications(10);
    setRangeValueTechnical(20);
    setRangeValueSoft(10);
    setRangeValueIndustry(20);
    setRangeValueDomain(20);
    setRangeValueCertifications(20);
    setRangeValueLocation(10);
    setRangeValueCultural(20)
    setRangeValueReferences(10);

    const list = [{
      'skills': 20,
      'roles': 20,
      'exp': 20,
      'qualification': 10,
      'tech_tools': 20,
      'soft_skills': 10,
      'industry_exp': 20,
      'domain_exp': 20,
      'certification': 20,
      'location': 10,
      'cultural_fit': 20,
      'ref': 10
    }]
    formData.append("tech", JSON.stringify(list))
    formData.append("jd_id", jd_id)

    dispatch(
      WeightagematchingpostMiddleWare({
        formData
      }),
    ).then((res) => {
      if (res.payload.success === false) {
        handleWeightageClose();
        Toast(
          'Sorry, there was a problem connecting to the API. Please try again later.',
          'LONG',
          'error',
        )
      }
      else {
        // handleWeightageClose();
        setloadermatch(true)
        axios.get(`${Bothcandidateidjobid}?jd_id=${jd_id}&can_id=${can_id}&matching=True`)
        .then((r) => {
         
          if(r.data.error===true)
          {
           // alert('eeee')
            Toast(
              'Sorry, there was a problem connecting to the API. Please try again later.',
              'LONG',
              'error',
            )
            setloadermatch(false)
          }
          if (r.data.technical) {
            console.log("resss----->",r)
            setvaltech(r.data.technical)
            setvalnontech(r.data.non_technical)
            setloadermatch(false)
          }
        

    });
        Toast('Weightage settings saved successfully!', 'LONG');

      }
    })
  }



  const handleRangeChange = (e) => {
    setRangeValueskill(parseInt(e.target.value));
    updateTechnicalPercent()
  };
  const handleRangeChangerole = (e) => {


    setRangeValuerolles(parseInt(e.target.value));
    updateTechnicalPercent()
  };
  const handleRangeChangeexperience = (e) => {
    setRangeValueexperience(parseInt(e.target.value));
    updateTechnicalPercent()
  };
  const handleRangeChangequalifications = (e) => {
    setRangeValueQualifications(parseInt(e.target.value));
    updateTechnicalPercent()
  };
  const handleRangeChangetechnical = (e) => {
    setRangeValueTechnical(parseInt(e.target.value));
    updateTechnicalPercent()
  };
  const handleRangeChangesoft = (e) => {
    setRangeValueSoft(parseInt(e.target.value));
    updateTechnicalPercent()
  };



  const handleRangeChangeindustry = (e) => {
    setRangeValueIndustry(parseInt(e.target.value));
    updateNonTechnicalPercent()
  };
  const handleRangeChangedomain = (e) => {
    setRangeValueDomain(parseInt(e.target.value));
    updateNonTechnicalPercent()
  };
  const handleRangeChangecertification = (e) => {
    setRangeValueCertifications(parseInt(e.target.value));
    updateNonTechnicalPercent()
  };
  const handleRangeChangelocation = (e) => {
    setRangeValueLocation(parseInt(e.target.value));
    updateNonTechnicalPercent()
  };
  const handleRangeChangecultural = (e) => {
    setRangeValueCultural(parseInt(e.target.value));
    updateNonTechnicalPercent()
  };
  const handleRangeChangereferences = (e) => {
    setRangeValueReferences(parseInt(e.target.value));
    updateNonTechnicalPercent()
  };


  const [expandedIndex2, setExpandedIndex2] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState([]);
  const dispatch: AppDispatch = useDispatch();

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
  const percentvalue = 75
  const [isShowMoreInfo, setShowMoreInfo] = useState(false);

  const handleMoreInfo = () => {
    setShowMoreInfo(true)
  }
  const handleLessInfo = () => {
    setShowMoreInfo(false)
  }


  const checkMatch = overall_percentage === 0 ? true : false;
  const profileMatch = checkMatch ? 0 : overall_percentage;
  const skillconvert = Math.round((skills_percent / 95) * 100);
  const qualificationconvert = (qualification_percent / 5) * 100;
  return (
    <>

      {console.log("technical", valnontech,"outputnontech",outputnontech)}
      {console.log("technical1--->", valtech,"outputtech",outputtech)}

      {isloadings || islodermatch && <Loader />}
      <Tabs>
        <Tab title='Matching Analysis'>
    <Flex row flex={12} height={window.innerHeight - 120}>
            <Flex flex={6} className={styles.overAll}>

              <Flex row between style={{ padding: '16px 16px 0px 16px' }}>
                <Text bold style={{ fontSize: '14px', marginBottom: '5px' }}>
                  Matching Analysis
                </Text>
                <Flex>
                  <Button onClick={handleWeightageOpen} types="primary">
                    Adjust Matching Criteria
                  </Button>
                </Flex>
              </Flex>

              <Flex row className={styles.btnwithContent}>
                <Flex row>
                  <Flex>
                    <Text>Adjust the weightage for job-candidate matching criteria</Text>
                  </Flex>
                  <Flex marginLeft={7}>
                    <label
                      onMouseEnter={() => setInfoPopupOpen(true)}
                      onMouseLeave={() => setInfoPopupOpen(false)}
                      className={styles.InfoiconchangeStyle}
                    >
                      <SvgModuleicon />
                    </label>
                  </Flex>
                </Flex>
                <Flex >
                  {isInfoPopupOpen && (
                    <Card className={styles.cardfront1}>
                      <Flex>
                        <Text>Info</Text>
                      </Flex>
                    </Card>
                  )}
                </Flex>
              </Flex>
              <Flex row className={styles.overallScore}>
                <Flex row>
                  <Flex><Text size={13}>Overall Score:</Text></Flex>
                  <Flex style={{ paddingLeft: "8px" }}>
                    <ProgressBar
                      completed={overall_percentage}
                      bgColor={
                        overall_percentage < 40 ? "#FF0000"
                          : overall_percentage >= 40 && overall_percentage < 69 ? "#FFC203"
                            : overall_percentage > 69 && "#96E596"
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
                      <Text size={13} bold color="primary">{overall_percentage}%</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex>
                </Flex>
              </Flex>

            
                <Flex
                  height={window.innerHeight - 184}
                  style={{ overflow: "scroll", padding: "10px 0px 10px 0px" }}
                className={outputnontech.length<=0?(outputtech.length<=0?(styles.nodata):("")):("")}
                >
                  {/* Technical */}
                { valtech && valtech.length>0 && valnontech && valnontech.length>0 ?(<>
                
                  <Flex className={styles.techcardstyles}>
                    <Card>
                    {valtech.length>0 ?(
                      <Flex style={{ padding: "25px" }}>
                        <Flex row marginBottom={10}>
                          <Flex style={{width:"20%"}}>
                            <Text bold>Technical Matching</Text>
                          </Flex>
                          <Flex style={{width:'20%'}}>
                            <Text bold>Score (100)</Text>
                          </Flex>
                          <Flex center style={{width:'20%', display: "flex"}}>
                            <Text bold>Weightage</Text>
                          </Flex>
                          <Flex style={{width:'40%'}}>
                            <Text bold>Description</Text>
                          </Flex>
                        {/* </Flex> */}
                        </Flex>
                        <Flex>
                          <div>

                            {valtech.map((skill, index) => (
                              <Flex className={styles.innerSliderbarStyle} key={index}>

                                    <Flex className={styles.infohead1}>
                                      <Text>{skill.title}</Text>
                                    </Flex>

                                    <Flex className={styles.infohead2}>
                                      <ProgressBar
                                        completed={`${skill.percentage}`}
                                        bgColor="#581845"
                                        width="200px"
                                        height='6px'
                                        borderRadius='4px'
                                        labelColor="black"
                                        labelAlignment="outside"
                                        labelClassName={
                                          rangeValueskill < 10
                                            ? styles.labelpadding
                                            : rangeValueskill >= 100
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
                                  {skill.percentage === 0 ? (<Text> No Data Available</Text>
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
                                              onClick={() => handleToggleCollapse(index)}
                                              style={{ cursor: "pointer" }}>

                                              <Text bold> View Less</Text>
                                            </Flex></>
                                        ) : (
                                          <>
                                            {skill.description.length >175 ? (
                                              <>
                                                <Flex  >
                                                <Text className={styles.textellipces}>{skill.description}</Text>
                                                </Flex>
                                                <Flex
                                                  onClick={() => handleToggleCollapse(index)}
                                                  style={{ cursor: "pointer" }}>
                                                  <Text bold>View More</Text>
                                                </Flex></>) : (<>
                                                  <Flex >
                                                    {skill.description}
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
                      ):( 
                      <Text>No Data Available</Text>
                      )}
                    </Card>
                  </Flex>

                  <Flex style={{ height: "20px" }}></Flex>
                  {/* Non-Technical */}
                  <Flex className={styles.nontechcardstyles}>
                    <Card>
                    
                      {valnontech.length>0 ?(
                      <Flex style={{ padding: "25px" }}>
                        <Flex row marginBottom={10}>
                          {/* <Flex>
                            <Text bold>Non-Technical Matching</Text>
                          </Flex> */}
                          <Flex style={{width:"20%"}}>
                            <Text bold>Non-Technical Matching</Text>
                          </Flex>
                          <Flex style={{width:'20%'}}>
                            <Text bold>Score (100)</Text>
                          </Flex>
                          <Flex center style={{width:'20%', display: "flex"}}>
                            <Text bold>Weightage</Text>
                          </Flex>
                          <Flex style={{width:'40%'}}>
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
                                        width="200px"
                                        height='6px'
                                        borderRadius='4px'
                                        labelColor="black"
                                        labelAlignment="outside"
                                        labelClassName={
                                          rangeValueskill < 10
                                            ? styles.labelpadding
                                            : rangeValueskill >= 100
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
                                  {skill.percentage === 0 ? (<Text> No Data Available</Text>
                                  ) : (
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
                                              onClick={() => handleToggleCollapse2(index)}
                                              style={{ cursor: "pointer" }}>

                                              <Text bold> View Less</Text>
                                            </Flex></>
                                        ) : (
                                          <>
                                            {skill.description.length>175 ? (
                                              <>
                                                <Flex >
                                                  <Text  className={styles.textellipces}>
                                                  {skill.description}</Text>
                                                </Flex>
                                                <Flex
                                                  onClick={() => handleToggleCollapse2(index)}
                                                  style={{ cursor: "pointer" }}>
                                                  <Text bold>View More</Text>
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

                        </Flex>
                      </Flex>):(
                        <Flex>
                          <Text>No Data Available</Text>
                        </Flex>
                      )}
                    </Card>
                  </Flex></>):(<Flex className={styles.rarecase}>
                    <Flex>
                    <SvgNoData width={16} height={16} fill={"#888"} />
                      </Flex>
                      <Flex marginTop={3}>
                      <Text>
                        No data available.
                      </Text></Flex>
                    
                    </Flex>)}
                </Flex>
            
                <Modal open={model}>
              <Flex className={styles.weightagepopup}>
                <Flex className={styles.popupheading}>
                  <Text size={14} bold>Adjust Matching Criteria</Text>
                </Flex>
                <Flex className={styles.parent} mt-30>
                  <Flex style={{ width: "49%" }}>
                    <Flex className={styles.progressbarstyle}>
                      <Flex><Text bold style={{ paddingTop: "10px", paddingBottom: '10px' }}>Technical Matching</Text></Flex>
                      <Flex style={{
                        width: "100px",
                        height: "100px"

                      }}>
                        <CircularProgressbar
                          value={technicalPercent}
                          text={`${technicalPercent}%`}
                          strokeWidth={10}
                          styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            //rotation: 0.25,

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            //  strokeLinecap: 'butt',

                            // Text size
                            textSize: '16px',

                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,

                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',

                            // Colors
                            pathColor: `rgba(0,190,75, ${technicalPercent / 100})`,
                            textColor: 'black',
                            trailColor: '#d6d6d6',

                            backgroundColor: '#3e98c7',

                          })}
                        />
                      </Flex>
                    </Flex>
                    <Flex>
                      <Flex className={styles.sliderstyle} marginTop={20}>
                        <Flex>
                          <Text>Skills</Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={rangeValueskill}
                            className={styles.customrange}
                            onChange={handleRangeChange}
                            style={{
                              // Styling with violet color

                              width: '200px',
                              // Set the width as needed
                              color: 'white', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing
                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValueskill / 100) * 100}%, #d3d3d3 ${(rangeValueskill / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                              height:"10px",


                            }}
                          />
                          <Text style={{
                            padding:
                              rangeValueskill < 10
                                ? '0px 10px 0px 27px'
                                : rangeValueskill >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          }}>{rangeValueskill}</Text>
                        </Flex>
                      </Flex>


                      <Flex className={styles.sliderstyle}>
                        <Flex>
                          <Text>Roles and Responsibilities </Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            className={styles.customrange}
                            value={rangeValuerolles}
                            onChange={handleRangeChangerole}
                            style={{
                              // Styling with violet color

                              width: '200px',
                              // Set the width as needed
                              color: 'violet', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing

                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValuerolles / 100) * 100}%, #d3d3d3 ${(rangeValuerolles / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                            }}

                          />
                          <Text style={{
                            padding:
                              rangeValuerolles < 10
                                ? '0px 10px 0px 27px'
                                : rangeValuerolles >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          }}>{rangeValuerolles}</Text>
                        </Flex>
                      </Flex>


                      <Flex className={styles.sliderstyle}>
                        <Flex>
                          <Text>Experience</Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={rangeValueexperience}
                            className={styles.customrange}
                            onChange={handleRangeChangeexperience}
                            style={{
                              width: '200px',// Set the width as needed
                              color: 'violet', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing
                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValueexperience / 100) * 100}%, #d3d3d3 ${(rangeValueexperience / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                            }}
                          />
                          <Text style={{
                            padding:
                              rangeValueexperience < 10
                                ? '0px 10px 0px 27px'
                                : rangeValueexperience >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          
                          }}>{rangeValueexperience}</Text>
                        </Flex>
                      </Flex>






                      <Flex className={styles.sliderstyle}>
                        <Flex>
                          <Text>Technical Tools and Languages </Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={rangeValueTechnical}
                            onChange={handleRangeChangetechnical}
                            className={styles.customrange}
                            style={{
                              // Styling with violet color
                              width: '200px', // Set the width as needed
                              color: 'violet', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing
                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValueTechnical / 100) * 100}%, #d3d3d3 ${(rangeValueTechnical / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                            }}
                          />
                          <Text style={{
                            padding:
                              rangeValueTechnical < 10
                                ? '0px 10px 0px 27px'
                                : rangeValueTechnical >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          }}>{rangeValueTechnical}</Text>
                        </Flex>
                      </Flex>


                      <Flex className={styles.sliderstyle}>
                        <Flex>
                          <Text>Soft Skills </Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            className={styles.customrange}
                            value={rangeValueSoft}
                            onChange={handleRangeChangesoft}
                            style={{
                              // Styling with violet color
                              width: '200px', // Set the width as needed
                              color: 'violet', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing
                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValueSoft / 100) * 100}%, #d3d3d3 ${(rangeValueSoft / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                            }}

                          />
                          <Text style={{
                            padding:
                              rangeValueSoft < 10
                                ? '0px 10px 0px 27px'
                                : rangeValueSoft >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          }}>{rangeValueSoft}</Text>
                        </Flex>
                      </Flex>
                      <Flex className={styles.sliderstyle}>
                        <Flex>
                          <Text>Qualifications</Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={rangeValueQualifications}
                            className={styles.customrange}
                            onChange={handleRangeChangequalifications}
                            style={{
                              // Styling with violet color
                              width: '200px',// Set the width as needed
                              color: 'violet', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing
                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValueQualifications / 100) * 100}%, #d3d3d3 ${(rangeValueQualifications / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                            }}

                          />
                          <Text style={{
                            padding:
                              rangeValueQualifications < 10
                                ? '0px 10px 0px 27px'
                                : rangeValueQualifications >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          }}>{rangeValueQualifications}</Text>
                        </Flex>
                      </Flex>
                      <Flex className={styles.sliderstyle}>

                        {totaltechnical !== 100 &&
                          <Text style={{
                            display: "flex",
                            alignSelf: 'flex-between'
                          }} size={11} color="error">
                            Technical percentages must equal 100
                          </Text>
                        }
                      </Flex>

                    </Flex>

                  </Flex>

                  <Flex className={styles.splitline}>

                  </Flex>

                  <Flex className={styles.split}>

                  </Flex>


                  <Flex style={{ width: "49%" }}>


                    <Flex className={styles.progressbarstyle}>

                      <Flex><Text bold style={{ paddingTop: "10px", paddingBottom: '10px' }}>Non-Technical Matching</Text></Flex>
                      <Flex style={{
                        width: "100px",
                        height: "100px"
                      }}>
                        <CircularProgressbar
                          value={nonTechnicalPercent}
                          text={`${nonTechnicalPercent}%`}
                          strokeWidth={10}
                          styles={buildStyles({
                            textSize: '16px',
                            pathColor: `rgba(0,190,75, ${nonTechnicalPercent / 100})`,
                            textColor: 'black',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                          })}
                        />
                      </Flex>
                    </Flex>

                    <Flex>
                      <Flex className={styles.sliderstyle} marginTop={20}>
                        <Flex>
                          <Text>Industry Specific Experience </Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={rangeValueIndustry}
                            className={styles.customrange}
                            onChange={handleRangeChangeindustry}
                            style={{
                              // Styling with violet color
                              width: '200px', // Set the width as needed
                              color: 'white', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing
                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValueIndustry / 100) * 100}%, #d3d3d3 ${(rangeValueIndustry / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                              height:"10px"
                            }}
                          />
                          <Text style={{
                            padding:
                              rangeValueIndustry < 10
                                ? '0px 10px 0px 27px'
                                : rangeValueIndustry >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          }}>{rangeValueIndustry}</Text>
                        </Flex>
                      </Flex>

                      <Flex className={styles.sliderstyle}>
                        <Flex>
                          <Text>Domain Specific Experience  </Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            className={styles.customrange}
                            value={rangeValueDomain}
                            onChange={handleRangeChangedomain}
                            style={{
                              // Styling with violet color
                              width: '200px', // Set the width as needed
                              color: 'violet', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing
                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValueDomain / 100) * 100}%, #d3d3d3 ${(rangeValueDomain / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                            }}

                          />
                          <Text style={{
                            padding:
                              rangeValueDomain < 10
                                ? '0px 10px 0px 27px'
                                : rangeValueDomain >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          }}>{rangeValueDomain}</Text>
                        </Flex>
                      </Flex>


                      <Flex className={styles.sliderstyle}>
                        <Flex>
                          <Text>Certifications </Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={rangeValueCertifications}
                            className={styles.customrange}
                            onChange={handleRangeChangecertification}
                            style={{
                              // Styling with violet color
                              width: '200px', // Set the width as needed
                              color: 'violet', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing
                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValueCertifications / 100) * 100}%, #d3d3d3 ${(rangeValueCertifications / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                            }}
                          />
                          <Text style={{
                            padding:
                              rangeValueCertifications < 10
                                ? '0px 10px 0px 27px'
                                : rangeValueCertifications >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          }}>{rangeValueCertifications}</Text>
                        </Flex>
                      </Flex>

                      <Flex className={styles.sliderstyle}>
                        <Flex>
                          <Text>Cultural Fit</Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={rangeValueCultural}
                            onChange={handleRangeChangecultural}
                            className={styles.customrange}
                            style={{
                              // Styling with violet color
                              width: '200px', // Set the width as needed
                              color: 'violet', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing
                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValueCultural / 100) * 100}%, #d3d3d3 ${(rangeValueCultural / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                            }}
                          />
                          <Text style={{
                            padding:
                              rangeValueCultural < 10
                                ? '0px 10px 0px 27px'
                                : rangeValueCultural >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          }}>{rangeValueCultural}</Text>
                        </Flex>
                      </Flex>


                      <Flex className={styles.sliderstyle}>
                        <Flex>
                          <Text>References and Recommendations </Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            className={styles.customrange}
                            value={rangeValueReferences}
                            onChange={handleRangeChangereferences}
                            style={{
                              // Styling with violet color
                              width: '200px', // Set the width as needed
                              color: 'violet', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing
                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValueReferences / 100) * 100}%, #d3d3d3 ${(rangeValueReferences / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                            }}

                          />
                          <Text style={{
                            padding:
                              rangeValueReferences < 10
                                ? '0px 10px 0px 27px'
                                : rangeValueReferences >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          }}>{rangeValueReferences}</Text>
                        </Flex>
                      </Flex>
                      <Flex className={styles.sliderstyle}>
                        <Flex>
                          <Text>Location Alignment </Text>
                        </Flex>
                        <Flex className={styles.innerstyle}>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={rangeValueLocation}
                            className={styles.customrange}
                            onChange={handleRangeChangelocation}
                            style={{
                              // Styling with violet color
                              width: '200px', // Set the width as needed
                              color: 'violet', // Violet color
                              WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                              margin: '10px 0', // Add margin for spacing
                              cursor: 'pointer', // Show pointer cursor
                              background: `linear-gradient(to right, #d3d3d3 0%, #581845 ${(rangeValueLocation / 100) * 100}%, #d3d3d3 ${(rangeValueLocation / 100) * 100}%, #d3d3d3 100%)`,
                              borderRadius: '5px', // Add border radius
                            }}

                          />
                          <Text style={{
                            padding:
                              rangeValueLocation < 10
                                ? '0px 10px 0px 27px'
                                : rangeValueLocation >= 100
                                  ? '0px 10px 0px 12px'
                                  : '0px 10px 0px 20px',
                          }}>{rangeValueLocation}</Text>
                        </Flex>
                      </Flex>
                      <Flex className={styles.sliderstyle}>


                        {totalnontechnical !== 100 &&
                          <Text style={{
                            display: "flex",
                            alignSelf: 'flex-between'
                          }} size={11} color="error">
                            Non-Technical percentages must equal 100
                          </Text>
                        }
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex row center className={styles.popbtnContainer}>

                  <Flex>
                    <Button types="secondary" onClick={resetfunction}>Reset</Button>
                  </Flex>
                  <Flex row>
                    <Flex className={styles.cancelBtn}>
                      <Button onClick={handleWeightageClose} types="close">
                        Cancel
                      </Button>
                    </Flex>
                    <Flex>
                      {isnextLoader ? (
                        <Flex className={styles.updateBtnLoader}>
                          <Loader size="small" withOutOverlay />
                        </Flex>
                      ) : (

                        <Button types="primary" onClick={nextfunction}>
                          Apply
                        </Button>)}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Modal>
            </Flex>
    </Flex>
        </Tab>
        <Tab title='All Matching Jobs'>
        <Flex flex={6.4}>
        <AllMatchTab title={''} inviteMessage={''} />
      </Flex>
        </Tab>
      </Tabs>

      {/* <Flex
        height={window.innerHeight - 115}
        style={{
          border: '0.3px solid #C3C3C3',
          width: '0.5px',
          margin: '15px 5px 10px 5px',
          paddingTop: '10px',
          paddingBottom: '10px',

        }}
      ></Flex>
      <Flex flex={6.4}>
        <AllMatchTab title={''} inviteMessage={''} />
      </Flex> */}
      </>
  );
};

export default MatchingAnalysisTab;