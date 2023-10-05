import React from 'react'
import { Flex } from '../../uikit'
import StepProgressBar from '../../uikit/StepProgressBar/StepProgressBar';
import styles from '../createjdmodule/weightagematching.module.css'

const Weightagematching = () => {
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
    </div>
  )
}

export default Weightagematching
