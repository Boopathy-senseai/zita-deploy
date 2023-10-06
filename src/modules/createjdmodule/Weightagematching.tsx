
import React, { useState } from 'react'
import { Range, getTrackBackground } from 'react-range';
import { Button, LinkWrapper, Text } from '../../uikit';
import { Flex } from '../../uikit'
import StepProgressBar from '../../uikit/StepProgressBar/StepProgressBar';
import styles from '../createjdmodule/weightagematching.module.css'
import SvgInfo from '../../icons/SvgInfo';
import { routesPath } from '../../routes/routesPath';
import { CANCEL } from '../constValue';

const Weightagematching = () => {


  const [rangeValueskill, setRangeValueskill] = useState(10);
  const [rangeValuerolles, setRangeValuerolles] = useState(20);
  const [rangeValueexperience, setRangeValueexperience] = useState(30);
  const [rangeValueQualifications, setRangeValueQualifications] = useState(40);
  const [rangeValueTechnical, setRangeValueTechnical] = useState(50);
  const [rangeValueSoft, setRangeValueSoft] = useState(60);



  const [rangeValueIndustry, setRangeValueIndustry] = useState(10);
  const [rangeValueDomain, setRangeValueDomain] = useState(20);
  const [rangeValueCertifications, setRangeValueCertifications] = useState(30);
  const [rangeValueLocation, setRangeValueLocation] = useState(40);
  const [rangeValueCultural, setRangeValueCultural] = useState(60);
  const [rangeValueReferences, setRangeValueReferences] = useState(50);




  const handleRangeChange = (e) => {
    setRangeValueskill(e.target.value);
  };
  const handleRangeChangerole = (e) => {
    setRangeValuerolles(e.target.value);
  };
  const handleRangeChangeexperience = (e) => {
    setRangeValueexperience(e.target.value);
  };
  const handleRangeChangequalifications = (e) => {
    setRangeValueQualifications(e.target.value);
  };
  const handleRangeChangetechnical = (e) => {
    setRangeValueTechnical(e.target.value);
  };
  const handleRangeChangesoft = (e) => {
    setRangeValueSoft(e.target.value);
  };


  const handleRangeChangeindustry = (e) => {
    setRangeValueIndustry(e.target.value);
  };
  const handleRangeChangedomain = (e) => {
    setRangeValueDomain(e.target.value);
  };
  const handleRangeChangecertification = (e) => {
    setRangeValueCertifications(e.target.value);
  };
  const handleRangeChangelocation = (e) => {
    setRangeValueLocation(e.target.value);
  };
  const handleRangeChangecultural = (e) => {
    setRangeValueCultural(e.target.value);
  };
  const handleRangeChangereferences = (e) => {
    setRangeValueReferences(e.target.value);
  };

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

          <Button types="primary">

            Reset

          </Button>

        </Flex>
      </Flex>
      <Flex className={styles.parent}>
        <Flex style={{ width: "50%" }}>

          <Flex className={styles.sliderstyle}>
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
                  width: '300px', // Set the width as needed
                  color: 'white', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueskill / 100) * 100}%, #d3d3d3 ${(rangeValueskill / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValueskill}</Text>
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
                  width: '300px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing

                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValuerolles / 100) * 100}%, #d3d3d3 ${(rangeValuerolles / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValuerolles}</Text>
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
                  // Styling with violet color
                  width: '300px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueexperience / 100) * 100}%, #d3d3d3 ${(rangeValueexperience / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValueexperience}</Text>
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
                  width: '300px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueQualifications / 100) * 100}%, #d3d3d3 ${(rangeValueQualifications / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValueQualifications}</Text>
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
                  width: '300px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueTechnical / 100) * 100}%, #d3d3d3 ${(rangeValueTechnical / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValueTechnical}</Text>
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
                  width: '300px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueSoft / 100) * 100}%, #d3d3d3 ${(rangeValueSoft / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValueSoft}</Text>
            </Flex>
          </Flex>
        </Flex>

        {/* nonds */}


        <Flex style={{ width: "50%" }}>
          <Flex className={styles.sliderstyle}>
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
                  width: '300px', // Set the width as needed
                  color: 'white', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueIndustry / 100) * 100}%, #d3d3d3 ${(rangeValueIndustry / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValueIndustry}</Text>
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
                  width: '300px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing

                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueDomain / 100) * 100}%, #d3d3d3 ${(rangeValueDomain / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValueDomain}</Text>
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
                  width: '300px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueCertifications / 100) * 100}%, #d3d3d3 ${(rangeValueCertifications / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValueCertifications}</Text>
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
                  width: '300px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueLocation / 100) * 100}%, #d3d3d3 ${(rangeValueLocation / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValueLocation}</Text>
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
                  width: '300px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueCultural / 100) * 100}%, #d3d3d3 ${(rangeValueCultural / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}
              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValueCultural}</Text>
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
                  width: '300px', // Set the width as needed
                  color: 'violet', // Violet color
                  WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                  margin: '10px 0', // Add margin for spacing
                  cursor: 'pointer', // Show pointer cursor
                  background: `linear-gradient(to right, #581845 0%, #581845 ${(rangeValueReferences / 100) * 100}%, #d3d3d3 ${(rangeValueReferences / 100) * 100}%, #d3d3d3 100%)`, // Add a gradient background
                  borderRadius: '5px', // Add border radius
                }}

              />
              <Text style={{ padding: "0px 20px 0px 20px" }}>{rangeValueReferences}</Text>
            </Flex>
          </Flex>


        </Flex>
      </Flex>

      <Flex row center end className={styles.bottombtnContainer}>
        <Flex row center>
        <LinkWrapper>
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
            <Button
              types="secondary"
              className={styles.draftBtn}
            >
              Save as draft
            </Button>
            <Button
            //   onClick={() => {
            //     onPristine();
            //     loaderfunctionnext();
            //     setDraftSave(false);
            //     setVacancies(true);
            //     hanldeErrorFocus();
            //     setTimeout(() => {
            //       handleSubmit();
            //     }, 200);
            //   }}
            >
              Next
            </Button>
        </Flex>
        </Flex>
    </div>


  )
}

export default Weightagematching
