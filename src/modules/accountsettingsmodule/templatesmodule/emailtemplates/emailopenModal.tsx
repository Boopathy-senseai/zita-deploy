import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../../uikit/Modal/Modal'
import { Button, Flex, InputText, Toast } from '../../../../uikit';
import Text from '../../../../uikit/Text/Text';
import styles from '../emailtemplates/emailopenmodal.module.css'
import RichText from '../../../common/RichText';
import { createemailtemplatepostMiddleWare, createjdtemplatepostMiddleWare, emailtemplatesgetMiddleWare } from '../../store/middleware/accountsettingmiddleware';
import { AppDispatch, RootState } from '../../../../store'
import { jdTemplatesApiMiddleWare } from '../../../createjdmodule/store/middleware/createjdmiddleware';


type Props = {
  open:boolean;
  handleOpenEmailModal:()=>void
  itemvalue:any;
  setEmailTemplates:any;
}


const Emailopenmodal = ({
  open,
  handleOpenEmailModal,
  itemvalue,
  setEmailTemplates,
}:Props) => {

  const dispatch: AppDispatch = useDispatch();

  const [isTitle, setTitle]=useState("")
  const [isSubject, setSubject]=useState("")
  const [isDescription, setDescription]=useState("")
  const [errordiscription,seterrordiscription]=useState(false)
  const [errortitle,seterrortitle]=useState(false)
  const [errorsubject, seterrorsubject]=useState(false)
  

  const parser = new DOMParser();
  const handlemessage = (values) => {
    
    const doc = parser.parseFromString(values, 'text/html');
    const textNodes = doc.querySelectorAll('body')[0].textContent;
    const texttrim = textNodes.trim();
    return texttrim;
   
  };

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

  const handleDescription = (e: any) => {
    setDescription(e)
    const description = e;
    const result=handlemessage(description)
    if (result.length > 2000) {
      seterrordiscription(true)
    } else {
      seterrordiscription(false)
    }
  }

  const addfunction=()=>{
    let formData = new FormData(); 
    if(itemvalue!==null)
    {
      formData.append('id',itemvalue.id);
    }
    formData.append('title',isTitle);
    formData.append('rich_text',isDescription)
    formData.append('subject',isSubject)
    dispatch(createemailtemplatepostMiddleWare({formData}))
    .then((res)=>{
      if(res.payload.success===true){
      if(itemvalue!==null){
        Toast('Template added Successfully.', 'LONG', 'success');
      }else{
        Toast('Template updated Successfully.', 'LONG', 'success');
      }}
      else{
        Toast('Email template api failed', 'LONG', 'error');
      } 
      })
      dispatch(emailtemplatesgetMiddleWare())
      handleOpenEmailModal();   
  }

  useEffect (()=>{
    if(itemvalue!==null && itemvalue !== undefined){
      setTitle(itemvalue.name)
      setDescription(itemvalue.templates)
      setSubject(itemvalue.subject)
      console.log("Description", itemvalue.templates )
    }
    dispatch(emailtemplatesgetMiddleWare())
  },[])

  return (
    <div>
        <Modal open={open}>
            <Flex className={styles.addtemplatePopup}>
                {itemvalue!==null?( 
                  <Text bold size={14} className={styles.titletext}>
                        Edit Template 
                      </Text>
                      ):(
                  <Text bold size={14} className={styles.titletext}>
                        Add Template
                      </Text>
                      )}
                
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
                  <Flex row style={{width: itemvalue!==null? "150px" : "130px" ,justifyContent: "space-between"}}>
                    <Button types='close' onClick={handleOpenEmailModal}>
                      Cancel
                    </Button>

                    {itemvalue!==null?( 
                      <Button 
                      onClick={addfunction}
                      >
                        Update
                      </Button>
                      ):(
                      <Button 
                      onClick={addfunction}
                      >
                        Add
                      </Button>
                      )}
                  </Flex>
                </Flex>
            </Flex>
        </Modal>
    </div>
  )
}

export default Emailopenmodal;

