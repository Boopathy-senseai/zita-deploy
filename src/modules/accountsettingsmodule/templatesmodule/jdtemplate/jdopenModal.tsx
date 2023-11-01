import React, { useState } from 'react'
import Modal from '../../../../uikit/Modal/Modal'
import { Button, Flex, InputText } from '../../../../uikit'
import RichText from '../../../common/RichText'
import {Text} from '../../../../uikit'
import styles from '../jdtemplate/jdopenmodal.module.css'


type Props = {
    open:boolean;
    handleJdModal:()=>void
}

const JDopenModal = ({
    open,
    handleJdModal
}) => {
  return (
    <div>
        <Modal open={open}>
            <Flex className={styles.addtemplatePopup}>
                <Text bold size={14} className={styles.titletext}>
                    Add Template
                </Text>
                
                <Flex>
                  <Flex>
                  <InputText
                    label="Template Title"
                    labelBold
                    className={styles.templatetitleInput}
                    />
                  </Flex>

                  <Flex>
                    <Text bold color="theme" size={13}>
                       Job Description
                    </Text>
                  <RichText
                   // onFocus={handleOpenInput}
                   // onBlur={handleCloseInput}
                   // onInit={(_a: any, editor: any) => (editorRef.current = editor)}
                  //  initialValue={values.jobDescription}
                   height={200}
                   // onChange={() => {
         
                   // onDirty();
                   // }}
                   />
                  </Flex>
                </Flex>

                <Flex className={styles.btnContainer}>
                  <Flex row style={{width: "130px" ,justifyContent: "space-between"}}>
                    <Button types='close' onClick={handleJdModal}>
                      Cancel
                    </Button>
                    <Button>
                      Add
                    </Button>
                  </Flex>
                </Flex>
            </Flex>
        </Modal>
    </div>
  )
}

export default JDopenModal
