import React, { useState } from 'react'
import Modal from '../../../../uikit/Modal/Modal'
import { Button, Flex, InputText } from '../../../../uikit';
import Text from '../../../../uikit/Text/Text';
import styles from '../emailtemplates/emailopenmodal.module.css'
import RichText from '../../../common/RichText';

type Props = {
  open:boolean;
  handleOpenEmailModal:()=>void
}


const Emailopenmodal = ({
  open,
  handleOpenEmailModal,
}:Props) => {

  const [isTitle, setTitle]=useState("")
  const [isSubject, setSubject]=useState("")
  const [isDescription, setDescription]=useState("")

  const handletitle = (e)=> {
    setTitle(e.target.value)
  }
  const handleSubject = (e)=> {
    setTitle(e.target.value)
  }
  const handleDescription = (e)=> {
    setTitle(e.target.value)
  }
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
                  <InputText
                    label="Subject Content"
                    labelBold
                    className={styles.subjectcontentInput}
                    />
                  </Flex>
                  <Flex>
                    <Text bold color="theme" size={13}>
                      Email Content
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
                    <Button types='close' onClick={handleOpenEmailModal}>
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

export default Emailopenmodal;
