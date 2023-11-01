import React, { useState } from 'react'
import { Text ,Flex,Button} from '../../../../uikit'
import SvgAdd from '../../../../icons/SvgAdd'
import SvgBack from '../../../../icons/SvgBack'
import styles from './jdtemplateModule.module.css'
import JDopenModal from './jdopenModal'

type jdProps = {
    handleBack: () => void;
  };
const jdtemplateModule = ({handleBack}:jdProps) => {
  const [isOpenJDModal, setOpenJDModal]=useState(false)

  const handleJdModal = () => {
      setOpenJDModal(!isOpenJDModal)
  }
  return (
    <Flex
        column
        className={styles.overflowContainer}
        style={{ padding: '0px 10px' }}
      >
        <Flex row between className={styles.titleBar}>
          <Flex row center className={styles.title} onClick={() => handleBack()}>
            <SvgBack height={14} width={14} />
            <Text color="theme" bold size={13} style={{ marginLeft: '5px' }}>
            Job Description Templates
            </Text>
          </Flex>

          <Button onClick={handleJdModal}>
            <Flex row center className={styles.pointer}>
              <SvgAdd height={10} width={10} fill="#FFFFFF" />
              <Text bold color="white" size={13} style={{ marginLeft: '10px' }}>
                Add Template
              </Text>
            </Flex>
          </Button>

          {isOpenJDModal && (
          <>
          <JDopenModal open={true} 
          handleJdModal={handleJdModal}/>
          </>
        )}
        </Flex>
      </Flex>
  )
}

export default jdtemplateModule