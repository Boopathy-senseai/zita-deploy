import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
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
        matchql:candidatejdmatchReducers.matched_data.matched_qualification,
        data:candidatejdmatchReducers.matched_data.matched_skills,
        overall_percentage:candidatejdmatchReducers.overall_percentage,
        Notmatch:candidatejdmatchReducers.not_matched_data.not_matched_skills,
        Notmatchql:candidatejdmatchReducers.not_matched_data.not_matched_qualification,
        qualification_percent: candidatejdmatchReducers.qualification_percent,
        skills_percent: candidatejdmatchReducers.skills_percent,
        overallskill:candidatejdmatchReducers.source.jd_skills,
        overallQualification:candidatejdmatchReducers.source.qualification,
        matchedlocation:candidatejdmatchReducers.matched_data.matched_location,
        notmatchedlocation:candidatejdmatchReducers.not_matched_data.not_matched_location,
        location:candidatejdmatchReducers.source.jd_location,
        location_percent:candidatejdmatchReducers.location_percent,
      };
    },
  );
  const [isCollapse, setCollapse] = useState(false);
  const [isloadings, setisloading] = useState(false);

  let formData = new FormData();   

  const [rangeValueskill, setRangeValueskill] = useState<any>(10);
  const [rangeValuerolles, setRangeValuerolles] = useState<any>(20);
  const [rangeValueexperience, setRangeValueexperience] = useState<any>(30);
  const [rangeValueQualifications, setRangeValueQualifications] = useState<any>(40);
  const [rangeValueTechnical, setRangeValueTechnical] = useState<any>(50);
  const [rangeValueSoft, setRangeValueSoft] = useState<any>(60);



  const [rangeValueIndustry, setRangeValueIndustry] = useState<any>(10);
  const [rangeValueDomain, setRangeValueDomain] = useState<any>(20);
  const [rangeValueCertifications, setRangeValueCertifications] = useState<any>(30);
  const [rangeValueLocation, setRangeValueLocation] = useState<any>(40);
  const [rangeValueCultural, setRangeValueCultural] = useState<any>(60);
  const [rangeValueReferences, setRangeValueReferences] = useState<any>(50);



  const [technicalPercent, setTechnicalPercent] = useState(0);
  const [nonTechnicalPercent, setNonTechnicalPercent] = useState(0);

  const[totaltechnical,settotaltechnical]=useState(0)
  const[totalnontechnical,settotalnontechnical]=useState(0);

  const updateTechnicalPercent = () => {
    const totalTechnicalPercent =
      rangeValueskill +
      rangeValuerolles +
      rangeValueexperience +
      rangeValueQualifications +
      rangeValueTechnical +
      rangeValueSoft;
    setTechnicalPercent(totalTechnicalPercent);
  };

  const updateNonTechnicalPercent = () => {
    const totalNonTechnicalPercent =
      rangeValueIndustry +
      rangeValueDomain +
      rangeValueCertifications +
      rangeValueLocation +
      rangeValueCultural +
      rangeValueReferences;
    setNonTechnicalPercent(totalNonTechnicalPercent);
  };

  useEffect(() => {
    updateTechnicalPercent();
    updateNonTechnicalPercent();
  }, []); // Empty dependency array ensures this runs only once after initial render


const nextfunction=()=>{

  
  
  const list = [{
    'skills': rangeValueskill,  
    'roles':rangeValuerolles,
    'exp':rangeValueexperience,
    'qualification':rangeValueQualifications,
    'tech_tools':rangeValueTechnical,
    'soft_skills':rangeValueSoft,
    'industry_exp':rangeValueIndustry,
    'domain_exp':rangeValueDomain,
    'certification':rangeValueCertifications,
    'location':rangeValueLocation,
    'cultural_fit':rangeValueCultural,
    'ref':rangeValueReferences

  }]
  formData.append("tech",JSON.stringify(list))
  formData.append("jd_id",jd_id) 
}


  const handleRangeChange = (e) => {
    setRangeValueskill(parseInt(e.target.value));
    console.log("target",e.target.value)
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
        
        <Flex between style={{padding:'16px 16px 0px 16px'}}>
              <Text bold style={{ fontSize: '14px', marginBottom: '5px' }}>
                Matching Analysis
              </Text>
            </Flex>

            <Flex row className={styles.btnwithContent}>
              <Flex>
                <Text>Adjust the weightage for job-candidate matching criteria</Text>
              </Flex>
              <Flex>
                <Button types="primary">
                  Adjust Matching Criteria
                </Button>
              </Flex>
            </Flex>
          
          <Flex row className={styles.overallScore}>
            <Flex>
              <Flex><Text size={13}>Overall Score:</Text></Flex>
                <Flex>
                  {/* Progress Bar */}
                    </Flex>
              </Flex>
            <Flex>
              <Text bold size={14} color="theme">View More Info</Text>
            </Flex>
          </Flex>
          <Flex className={styles.techcardstyles}>
          <Card>
          <Flex className={styles.progressbarstyle}>
            <Flex><Text bold>Technical Matching</Text></Flex>
            <Flex><Text bold>Score (100)</Text></Flex>
            <Flex><Text bold>Weightage</Text></Flex>
          </Flex>
      <Flex>
          <Flex className={styles.sliderstyle} marginTop={20}>
            <Flex style={{width: "27%"}}>
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
                  
                  width:'200px',
                  // Set the width as needed
                  color: 'white', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueskill / 100) * 100}%, #d3d3d3 ${(rangeValueskill / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                
                }}
              />
            </Flex>
            <Text style={{   padding:
                  rangeValueskill<10
                    ? '0px 10px 0px 27px'
                    : rangeValueskill >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueskill}</Text>
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
                  
                  width:'200px',
               // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing

                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValuerolles / 100) * 100}%, #d3d3d3 ${(rangeValuerolles / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
            </Flex>
            <Text style={{   padding:
                  rangeValuerolles<10
                    ? '0px 10px 0px 27px'
                    : rangeValuerolles >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValuerolles}</Text>
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
                  width:'200px',// Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueexperience / 100) * 100}%, #d3d3d3 ${(rangeValueexperience / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
            </Flex>
            <Text style={{   padding:
                  rangeValueexperience<10
                    ? '0px 10px 0px 27px'
                    : rangeValueexperience >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueexperience}</Text>
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
                  width:'200px',// Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueQualifications / 100) * 100}%, #d3d3d3 ${(rangeValueQualifications / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
            </Flex>
            <Text style={{   padding:
                  rangeValueQualifications<10
                    ? '0px 10px 0px 27px'
                    : rangeValueQualifications >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueQualifications}</Text>
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
                  width:'200px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueTechnical / 100) * 100}%, #d3d3d3 ${(rangeValueTechnical / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
            </Flex>
            <Text style={{   padding:
                  rangeValueTechnical<10
                    ? '0px 10px 0px 27px'
                    : rangeValueTechnical>= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueTechnical}</Text>
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
                  width:'200px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueSoft / 100) * 100}%, #d3d3d3 ${(rangeValueSoft / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
            </Flex>
            <Text style={{   padding:
                  rangeValueSoft<10
                    ? '0px 10px 0px 27px'
                    : rangeValueSoft >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueSoft}</Text>
          </Flex>

         <Flex className={styles.sliderstyle}>
          
          {totaltechnical!==100 &&
            <Text style={{
              display: "flex",
              alignSelf: 'flex-between'
            }} size={11} color="error">
                  Technical percentages must equal 100
            </Text>
          }
         </Flex>

</Flex>

        </Card>
        </Flex>
          </Flex>
      <Flex
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
      </Flex>
    </Flex>
  );
};

export default MatchingAnalysisTab;
