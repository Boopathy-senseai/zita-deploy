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
  const [errordiscription,seterrordiscription]=useState(false)
  const [errortitle,seterrortitle]=useState(false)
  const [errorsubject, seterrorsubject]=useState(false)
  const handletitle = (e:any)=> {
    setTitle(e.target.value)
    const title=e.target.value;
    if(title.length>25){
      seterrortitle(true)
    }
    else{
      seterrortitle(false)
    }
  }
  const handleSubject = (e:any)=> {
    setSubject(e.target.value)
    const subject=e.target.value;
    if(subject.length>250){
      seterrorsubject(true)
    }
    else{
      seterrorsubject(false)
    }
  }
  const handleDescription = (e:any)=> {
    setDescription(e.target.value)
    const description=e.target.value;
    if(description.length>2000)
    {
           seterrordiscription(true)
    }else{
      seterrordiscription(false)
    }
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
                    onChange={handletitle}
                    value={isTitle}
                    maxLength={26}
                    />
                  </Flex>
                {errortitle&&(
                  <Text color='error'>Maximum limit of title is 25</Text>
                )
                }

                  <Flex marginTop={5}>
                  <InputText
                    label="Subject Content"
                    labelBold
                    className={styles.subjectcontentInput}
                    onChange={handleSubject}
                    value={isSubject}
                    maxLength={251}
                    />
                    {errorsubject && (
                      <Text color='error'>Maximum limit of subject content is 250</Text>
                    )}
                  </Flex>
                  <Flex>
                    <Text bold color="theme" size={13} style={{margin: "5px 0px 2px 0px"}}>
                      Email Content
                    </Text>
                  <RichText        
                   height={200}
                   onChange={handleDescription}
                   value={isDescription}
                   />
                  </Flex>
                  {errordiscription&&(
                  <Text color='error'>Maximum limit of description is 2000</Text>
                )
                }
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
