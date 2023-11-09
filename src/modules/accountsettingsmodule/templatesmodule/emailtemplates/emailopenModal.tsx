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
  emailTemplates:any;
  isTitleAlreadyExists:any;
  isSubjectAlreadyExists:any;
}


const Emailopenmodal = ({
  open,
  handleOpenEmailModal,
  itemvalue,
  setEmailTemplates,
  emailTemplates,
  isTitleAlreadyExists, 
  isSubjectAlreadyExists,
}:Props) => {

  const dispatch: AppDispatch = useDispatch();

  const [isTitle, setTitle]=useState("")
  const [isSubject, setSubject]=useState("")
  const [isDescription, setDescription]=useState("")
  const [errordiscription,seterrordiscription]=useState(false)
  const [errortitle,seterrortitle]=useState(false)
  const [errorsubject, seterrorsubject]=useState(false)
  const [TitleError, setTitleError]=useState(false)
  const [SubjectError, setSubjectError]=useState(false)
  const [DescError, setDescError]=useState(false)
  const [TitleExist,setTitleExist]=useState(false)
  const [SubjectExist,setSubjectExist]=useState(false)

  const {
    data,
  } = useSelector(
    ({
      emailTemplateReducers,
    }: RootState) => {
      return {
        data: emailTemplateReducers.data,
      };
    },
  );
  

  const parser = new DOMParser();
  const handlemessage = (values) => {
    
    const doc = parser.parseFromString(values, 'text/html');
    const textNodes = doc.querySelectorAll('body')[0].textContent;
    const texttrim = textNodes.trim();
    return texttrim;
   
  };

  const htmlToPlainText = (html) => {
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  // Convert HTML content to plain text
  const plainTextDescription = htmlToPlainText(isDescription);

  // const handletitle = (e:any)=> {
  //   setTitle(e.target.value)
  //   const title=e.target.value.trim();;
  //   if(title.length>35){
  //     seterrortitle(true)
  //   }
  //   else{
  //     seterrortitle(false)
  //   }
  // }

  // const handletitle = (e: any) => {
  //   const title = e.target.value.trim(); // This trims leading and trailing spaces
  //   setTitle(title);
  
  //   if (title.length > 35) {
  //     seterrortitle(true);
  //   } else {
  //     seterrortitle(false);
  //   }
  // }
  // const handletitle = (e: any) => {
  //   const inputValue = e.target.value;
  //   const title = inputValue.trimStart();
  //   setTitle(title);
  //   if (title.length > 35) {
  //     seterrortitle(true);
  //   } else {
  //     seterrortitle(false);
  //   }
  // }
  const handletitle = (e: any) => {

    const inputValue = e.target.value;
    const title = inputValue.trimStart();    
    const titleAlreadyExists = data.some(template => template.name === title);
    setTitle(title);
    if (title.length > 35) {
      seterrortitle(true);
    } else {
      seterrortitle(false);
    }
  
    if (titleAlreadyExists) {
      setTitleExist(true);
    } else {
      setTitleExist(false);
    }
  }

  const handleSubject = (e: any) => {
    const inputValue = e.target.value;
    const subject = inputValue.trimStart();
    const subjectAlreadyExists = data.some(template => template.subject === subject);
    setSubject(subject);
    if (subject.length>250) {
      seterrorsubject(true)      
    } else {
      seterrorsubject(false)
    }
    if (subjectAlreadyExists) {
      setSubjectExist(true)      
    } else {
      setSubjectError(false)
    }
  }

  // const handleSubject = (e:any)=> {
  //   setSubject(e.target.value)
  //   const subject=e.target.value;
  //   if(subject.length>250){
  //     seterrorsubject(true)
  //   }
  //   else{
  //     seterrorsubject(false)
  //   }
  // }

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
    // if(isTitle==='')
    // {
    //   setTitleError(true)
    // } else {
    //   setTitleError(false)
    // }
    // if(isSubject===''){
    //   setSubjectError(true)
    // }
    // else{
    //   setSubjectError(false)
    // }
    // if(isDescription===''){
    //   setDescError(true)
    // }
    // else{
    //   setDescError(false)
    // }
    // const result=handlemessage(isDescription)
    // if(result.trim()==='')
    // {
    //   setDescError(true)
    // }
    // else{
    //   setDescError(false)
    // }
    if (isTitle.trim()==='' && isDescription.trim()==='' &&  isSubject.trim()==='') {
      setTitleError(true)
      setSubjectError(true) 
      setDescError(true)     
    }
    if (isTitle.trim()!=='' && isDescription.trim()!=='' &&  isSubject.trim()!=='') {
      let formData = new FormData(); 
      if(itemvalue!==null)
      {
        formData.append('id',itemvalue.id);
      }
      formData.append('title',isTitle);
      formData.append('rich_text',isDescription)
      formData.append('subject',isSubject)
      formData.append('text',plainTextDescription)
      dispatch(createemailtemplatepostMiddleWare({formData}))
      .then((res)=>{
        if(res.payload.success===true){
        if(itemvalue!==null){
          Toast('Template updated Successfully.', 'LONG', 'success');
        }else{
          Toast('Template added Successfully.', 'LONG', 'success');
        }}
        else{
          Toast('Email template api failed', 'LONG', 'error');
        } 
        dispatch(emailtemplatesgetMiddleWare())
        })
        handleOpenEmailModal();  
    } 
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
          {console.log("isTitleisTitle", isTitle)}
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
                    maxLength={36}
                    />
                  </Flex>
                {errortitle&&(
                  <Text color='error'>Template title should not exceed 35 characters.</Text>
                )}
                {TitleError&& (
                  <Text color='error'>This field is required</Text>
                  )}
                  {TitleExist&& (
                    <Text color="error">Template name already exist</Text>
                  )}

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
                      <Text color='error'>Subject content should not exceed 250 characters.</Text>
                    )}
                    {SubjectError&& (
                      <Text color='error'>This field is required</Text>
                      )}
                    {SubjectExist&& (
                      <Text color='error'>Subject is already exist</Text>
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
                    <Text color='error'>Email content should not exceed 250 characters.</Text>
                  )}
                  {DescError&& (
                    <Text color='error'>This field is required</Text>
                    )}
                </Flex>

                <Flex className={styles.btnContainer}>
                  <Flex row style={{width: itemvalue!==null? "150px" : "130px" ,justifyContent: "space-between"}}>
                    <Button types='close' onClick={handleOpenEmailModal}>
                      Cancel
                    </Button>

                    {itemvalue!==null?( 
                      <Button 
                      onClick={addfunction}
                      disabled={!isTitle.trim() || !isSubject.trim() || !isDescription.trim() && isSubjectAlreadyExists && isTitleAlreadyExists} 
                      >
                        Update
                      </Button>
                      ):(
                      <Button 
                      onClick={addfunction}
                      disabled={!isTitle.trim() || !isSubject.trim() || !isDescription.trim() && isSubjectAlreadyExists && isTitleAlreadyExists} 
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

