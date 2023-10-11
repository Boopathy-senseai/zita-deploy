
import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { useDispatch ,useSelector} from 'react-redux';

import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';

import { Button, LinkWrapper, Loader, Text, Toast } from '../../uikit';
import { Flex } from '../../uikit'

import StepProgressBar from '../../uikit/StepProgressBar/StepProgressBar';
import styles from '../createjdmodule/weightagematching.module.css'
import SvgInfo from '../../icons/SvgInfo';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { routesPath } from '../../routes/routesPath';

import { CANCEL } from '../constValue';
import { WeightagematchingpostMiddleWare,WeightagematchinggetMiddleWare } from './store/middleware/createjdmiddleware';


type ParamsType = {
  jd_id: string;
};


const Weightagematching = () => {
  const dispatch: AppDispatch = useDispatch();
  let formData = new FormData();   
  const { jd_id } = useParams<ParamsType>();

  
  const questionnairePath = (jd) => {
    return window.location.replace(
      window.origin + `/jobs/questionnaire/${jd}`,
    );
  };

  const [isBtnLoader, setBtnLoader] = useState(false)
  const [isnextLoader,setnextLoader]=useState(false)

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

  const[totaltechnical,settotaltechnical]=useState(0);
  const[totalnontechnical,settotalnontechnical]=useState(0);

  const [technicalError, setTechnicalError] = useState(false);


  const {
    non_tech,tech,success
  } = useSelector(
    ({
      weightageReducers,    
    }: RootState) => {
      return {
        
        success:weightageReducers.success,
        non_tech: weightageReducers.non_tech,
        tech: weightageReducers.tech_skills,
      };
    },
  );

  useEffect(()=>{
      if(success===true)
 {
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

    dispatch(WeightagematchinggetMiddleWare(jd_id));

  },[success])




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

  const updateNonTechnicalPercent = () => {
    const totalNonTechnicalPercent =
      rangeValueIndustry +
      rangeValueDomain +
      rangeValueCertifications +
      rangeValueLocation +
      rangeValueCultural +
      rangeValueReferences;
    setNonTechnicalPercent(totalNonTechnicalPercent);
    settotalnontechnical(totalNonTechnicalPercent)
  };

  useEffect(() => {
    updateTechnicalPercent();
    updateNonTechnicalPercent();
  }, [rangeValueskill,rangeValuerolles,rangeValueexperience,rangeValueQualifications,rangeValueTechnical,rangeValueSoft,rangeValueIndustry,rangeValueDomain,rangeValueCertifications,rangeValueLocation,rangeValueCultural,rangeValueReferences]); // Empty dependency array ensures this runs only once after initial render


const nextfunction=()=>{
  if(totalnontechnical===100 && totaltechnical===100){
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
  setnextLoader(true)
  dispatch(
    WeightagematchingpostMiddleWare({
       formData
    }),
  ).then((res) => {
    if (res.payload.success === false) {
      setnextLoader(false);
      Toast('Error saving weightage settings. Please try again.', 'LONG', 'error');
    }
    else {
      setnextLoader(false);
      questionnairePath(jd_id);
      console.log("res",res)
    }
  })}
}


  const handleRangeChange = (e:any) => {

    setRangeValueskill(parseInt(e.target.value));
    updateTechnicalPercent()

  };
  const handleRangeChangerole = (e:any) => {
    setRangeValuerolles(parseInt(e.target.value));
    updateTechnicalPercent()
  
  };
  const handleRangeChangeexperience = (e:any) => {
    setRangeValueexperience(parseInt(e.target.value));
    updateTechnicalPercent()
  };
  const handleRangeChangequalifications = (e:any) => {
    setRangeValueQualifications(parseInt(e.target.value));
    updateTechnicalPercent()
  };
  const handleRangeChangetechnical = (e:any) => {
    setRangeValueTechnical(parseInt(e.target.value));
    updateTechnicalPercent()
  };
  const handleRangeChangesoft = (e:any) => {
    setRangeValueSoft(parseInt(e.target.value));
    updateTechnicalPercent()
  };



  const handleRangeChangeindustry = (e:any) => {
    setRangeValueIndustry(parseInt(e.target.value));
    updateNonTechnicalPercent()
  };
  const handleRangeChangedomain = (e:any) => {
    setRangeValueDomain(parseInt(e.target.value));
    updateNonTechnicalPercent()
  };
  const handleRangeChangecertification = (e:any) => {
    setRangeValueCertifications(parseInt(e.target.value));
    updateNonTechnicalPercent()
  };
  const handleRangeChangelocation = (e:any) => {
    setRangeValueLocation(parseInt(e.target.value));
    updateNonTechnicalPercent()
  };
  const handleRangeChangecultural = (e:any) => {
    setRangeValueCultural(parseInt(e.target.value));
    updateNonTechnicalPercent()
  };
  const handleRangeChangereferences = (e:any) => {
    setRangeValueReferences(parseInt(e.target.value));
    updateNonTechnicalPercent()
  
  };
    
  
const resetfunction=()=>{
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
    // 'skills': rangeValueskill,  
    // 'roles':rangeValuerolles,
    // 'exp':rangeValueexperience,
    // 'qualification':rangeValueQualifications,
    // 'tech_tools':rangeValueTechnical,
    // 'soft_skills':rangeValueSoft,
    // 'industry_exp':rangeValueIndustry,
    // 'domain_exp':rangeValueDomain,
    // 'certification':rangeValueCertifications,
    // 'location':rangeValueLocation,
    // 'cultural_fit':rangeValueCultural,
    // 'ref':rangeValueReferences
    'skills': 20,  
    'roles':20,
    'exp':20,
    'qualification':10,
    'tech_tools':20,
    'soft_skills':10,
    'industry_exp':20,
    'domain_exp':20,
    'certification':20,
    'location':10,
    'cultural_fit':20,
    'ref':10
  }]
  formData.append("tech",JSON.stringify(list))
  formData.append("jd_id",jd_id) 

  dispatch(
    WeightagematchingpostMiddleWare({
       formData
    }),
  ).then((res) => { 
    console.log("res",res)
  })
}

const saveasdraftfunction=()=>{
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

  dispatch(
    WeightagematchingpostMiddleWare({
       formData
    }),
  ).then((res) => {
    if (res.payload.success === false) {
      Toast('Error saving weightage settings. Please try again.', 'LONG', 'error');
    }
    else {     
     // Toast('Weightage settings saved successfully!', 'LONG');
      console.log("res", res)
    }
  })
}


  return (


    <div>

      <Flex row center className={styles.step}>
        <StepProgressBar roundFill />
        <StepProgressBar
          title="Match Weightage"
          titleclassName={styles.stepTwo}
          stepIndex="2"
          roundFill
        />
        <StepProgressBar
          title="Applicant Questionnaire"
          titleclassName={styles.stepThree}
          stepIndex="3"
        />
        <StepProgressBar
          title="Preview & Post Job"
          titleclassName={styles.stepFour}
          stepIndex="4"
        />
      </Flex>

      <Flex row center className={styles.btnContainer}>
        <Flex row center>
          <Text>
            Adjust the weightage for job-candidate matching  criteria

          </Text>
          <Flex marginLeft={7}><SvgInfo height={15} width={15} fill={"#FFC203"} />
          </Flex>

        </Flex>
        <Flex>

          <Button types="primary" onClick={resetfunction}>

            Reset

          </Button>

        </Flex>
      </Flex>
      
      <Flex className={styles.parent} mt-30>
        
        <Flex style={{ width: "49%" }}>
          <Flex className={styles.progressbarstyle}>
            <Flex><Text style={{paddingTop:"10px" ,paddingBottom:'10px'}}>Technical Matching</Text></Flex>
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
<Flex marginRight={65} marginLeft={65}>
          <Flex className={styles.sliderstyle} marginTop={20}>
            <Flex>
              <Text>Skills</Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
                max="100"
                value={rangeValueskill}
                className={styles.customrange}
                onChange={handleRangeChange}
                style={{
                  // Styling with violet color
                  
                  width:'200px',
                  // Set the width as needed
                  color: 'white', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browser
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueskill / 100) * 100}%, #581845 ${(rangeValueskill / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                
                }}
              />
              <Text style={{   padding:
                  rangeValueskill<10
                    ? '0px 10px 0px 27px'
                    : rangeValueskill >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueskill}</Text>
            </Flex>
          </Flex>


  
          <Flex className={styles.sliderstyle}>
            <Flex>
              <Text>Roles and Responsibilities </Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
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
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValuerolles / 100) * 100}%, #581845 ${(rangeValuerolles / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{   padding:
                  rangeValuerolles<10
                    ? '0px 10px 0px 27px'
                    : rangeValuerolles >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValuerolles}</Text>
            </Flex>
          </Flex>
       


          <Flex className={styles.sliderstyle}>
            <Flex>
              <Text>Experience</Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
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
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueexperience / 100) * 100}%, #581845 ${(rangeValueexperience / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
              <Text style={{   padding:
                  rangeValueexperience<10
                    ? '0px 10px 0px 27px'
                    : rangeValueexperience >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueexperience}</Text>
            </Flex>
          </Flex>



         


          <Flex className={styles.sliderstyle}>
            <Flex>
              <Text>Technical Tools and Languages </Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
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
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueTechnical / 100) * 100}%, #581845 ${(rangeValueTechnical / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
              <Text style={{   padding:
                  rangeValueTechnical<10
                    ? '0px 10px 0px 27px'
                    : rangeValueTechnical>= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueTechnical}</Text>
            </Flex>
          </Flex>


      
            <Flex className={styles.sliderstyle}>
            <Flex>
              <Text>Soft Skills </Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
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
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueSoft / 100) * 100}%, #581845 ${(rangeValueSoft / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{   padding:
                  rangeValueSoft<10
                    ? '0px 10px 0px 27px'
                    : rangeValueSoft >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueSoft}</Text>
            </Flex>
          </Flex>

            
         <Flex className={styles.sliderstyle}>
            <Flex>
              <Text>Qualifications</Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
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
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueQualifications / 100) * 100}%, #581845 ${(rangeValueQualifications / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{   padding:
                  rangeValueQualifications<10
                    ? '0px 10px 0px 27px'
                    : rangeValueQualifications >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueQualifications}</Text>
            </Flex>
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

        </Flex>

        {/* nonds */}
        <Flex className={styles.splitline}>

        </Flex>

<Flex className={styles.split}>

</Flex>


        <Flex style={{ width: "49%" }}>

          
          <Flex className={styles.progressbarstyle}>
            
            <Flex><Text style={{paddingTop:"10px" ,paddingBottom:'10px'}}>Non-Technical Matching</Text></Flex>
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
                  pathColor: `rgba(0,190,75, ${ nonTechnicalPercent / 100})`,
                  textColor: 'black',
                  trailColor: '#d6d6d6',   
                  backgroundColor: '#3e98c7',
                })}
              />
            </Flex>
          </Flex>

<Flex marginLeft={65} marginRight={65}>
          <Flex className={styles.sliderstyle} marginTop={20}>
            <Flex>
              <Text>Industry Specific Experience </Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
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
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueIndustry / 100) * 100}%, #581845 ${(rangeValueIndustry / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
              <Text style={{   padding:
                  rangeValueIndustry<10
                    ? '0px 10px 0px 27px'
                    : rangeValueIndustry >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueIndustry}</Text>
            </Flex>
          </Flex>

          <Flex className={styles.sliderstyle}>
            <Flex>
              <Text>Domain Specific Experience  </Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
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
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueDomain / 100) * 100}%, #581845 ${(rangeValueDomain / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{   padding:
                  rangeValueDomain<10
                    ? '0px 10px 0px 27px'
                    : rangeValueDomain >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueDomain}</Text>
            </Flex>
          </Flex>


          <Flex className={styles.sliderstyle}>
            <Flex>
              <Text>Certifications </Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
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
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueCertifications / 100) * 100}%, #581845 ${(rangeValueCertifications / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
              <Text style={{   padding:
                  rangeValueCertifications<10
                    ? '0px 10px 0px 27px'
                    : rangeValueCertifications>= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueCertifications}</Text>
            </Flex>
          </Flex>


         


          <Flex className={styles.sliderstyle}>
            <Flex>
              <Text>Cultural Fit</Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
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
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueCultural / 100) * 100}%, #581845 ${(rangeValueCultural / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
              <Text style={{   padding:
                  rangeValueCultural<10
                    ? '0px 10px 0px 27px'
                    : rangeValueCultural >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueCultural}</Text>
            </Flex>
          </Flex>


          <Flex className={styles.sliderstyle}>
            <Flex>
              <Text>References and Recommendations </Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
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
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueReferences / 100) * 100}%, #581845 ${(rangeValueReferences / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{   padding:
                  rangeValueReferences<10
                    ? '0px 10px 0px 27px'
                    : rangeValueReferences >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueReferences}</Text>
            </Flex>
          </Flex>
           
          <Flex className={styles.sliderstyle}>
            <Flex>
              <Text>Location Alignment </Text>
            </Flex>
            <Flex className={styles.innerstyle}>
              <input
                type="range"
                min="5"
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
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueLocation / 100) * 100}%, #581845 ${(rangeValueLocation / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{   padding:
                  rangeValueLocation<10
                    ? '0px 10px 0px 27px'
                    : rangeValueLocation >= 100
                    ? '0px 10px 0px 12px'
                    : '0px 10px 0px 20px',}}>{rangeValueLocation}</Text>
            </Flex>
          </Flex>


          <Flex className={styles.sliderstyle}>
          {totalnontechnical!==100 &&
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

      
      <Flex row center end className={styles.bottombtnContainer} marginTop={110} >
        <Flex row center>
          <LinkWrapper    to={`/jobs/create_non_ds_edit/${jd_id}`}>
            <Button types="secondary">{'Back'}</Button>
          </LinkWrapper>
        </Flex>
        <Flex row center>
          <LinkWrapper
            to={routesPath.MY_JOB_POSTING}
          >
            <Button className={styles.cancelbtn} types="close">
              {CANCEL}
            </Button>
          </LinkWrapper>
          {/* <Button
            types="secondary"
            className={styles.draftBtn}
          >
            Save as draft
          </Button> */}
             {isBtnLoader ? (
            <Flex className={styles.updateBtnLoader}>
              <Loader size="small" withOutOverlay />
            </Flex>
          ) : (
            <LinkWrapper   
            to={routesPath.MY_JOB_POSTING}
            onClick={()=>{
              setBtnLoader(true);
              saveasdraftfunction();
            }}
          >
            <Button 
            types="secondary" className={styles.draftBtn}>
              Save as draft
            </Button>
          </LinkWrapper>)}
       
          {isnextLoader ? (
            <Flex className={styles.updateBtnLoader}>
              <Loader size="small" withOutOverlay />
            </Flex>
          ) : (
       
          <Button
             onClick={() => {
              nextfunction()
             
             }}
          >
            Next
          </Button>)}
        </Flex>
      </Flex>
    </div>


  )
}

export default Weightagematching
