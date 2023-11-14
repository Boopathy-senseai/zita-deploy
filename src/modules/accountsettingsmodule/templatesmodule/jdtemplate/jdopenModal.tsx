import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../store'
import Modal from '../../../../uikit/Modal/Modal'
import { Button, Flex, InputText, Toast } from '../../../../uikit'
import RichText from '../../../common/RichText'
import { Text } from '../../../../uikit'
import styles from '../jdtemplate/jdopenmodal.module.css'
import { mentionnotes } from '../../../constValue'
import { isEmpty } from '../../../../uikit/helper'

import { createjdtemplatepostMiddleWare } from '../../store/middleware/accountsettingmiddleware'
import { jdTemplatesApiMiddleWare } from '../../../createjdmodule/store/middleware/createjdmiddleware'



type Props = {
  open: boolean;
  handleJdModal: () => void;
  itemvalue:any;
  itemclose : () => void;
  job_title:any
}

const JDopenModal = ({
  open,
  handleJdModal,
  itemvalue,
  itemclose,
  job_title
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  
  const [isTitle, setTitle] = useState("")
  const [isDescription, setDescription] = useState("")
  const [errordiscription, seterrordiscription] = useState(false)
  const [errortitle, seterrortitle] = useState(false)
  const [errorrequiredtitle, seterrorrequiredtitle] = useState(false)
  const [errorrequireddescription, seterrorrequireddescription] = useState(false)
  const [errorname,seterrorname]=useState(false);

  const handletitle = (e: any) => {
    //setTitle(e.target.value)
    const inputTitle = e.target.value.trim().toLowerCase();
    const jobTitlesLowercase = job_title.map(title => title.trim().toLowerCase());
  console.log("jobtitlenew",jobTitlesLowercase)
    var test1 = e.target.value.trim();
    if (test1.length !== 0) {
      setTitle(e.target.value);
    } else {
      setTitle(e.target.value.trim());
    }
    const title = e.target.value;
    if (title.length > 35) {
      seterrortitle(true)
    }
    else {
      seterrortitle(false)
    }
   
    if(job_title.length>1 && job_title!==undefined && job_title!==null){
    if(jobTitlesLowercase.includes(inputTitle))
    {
        seterrorname(true)
    }
    else{
      seterrorname(false)
    }
  }
  }

    useEffect (()=>{
      if(itemvalue!==null && itemvalue !== undefined){
        setTitle(itemvalue.job_title)
        setDescription(itemvalue.job_description)
      }
    },[])
  
  const parser = new DOMParser();
  const handlemessage = (values) => {
    
    const doc = parser.parseFromString(values, 'text/html');
    const textNodes = doc.querySelectorAll('body')[0].textContent;
    const texttrim = textNodes.trim();
    return texttrim;
   
  };

  const handleDescription = (e: any) => {
    //formik.setFieldValue('userMessage', e);
    setDescription(e)
    const description = e;
    const result=handlemessage(description)
    if (result.length > 5000) {
      seterrordiscription(true)
    } else {
      seterrordiscription(false)
    }
   
  }
  {console.log(isDescription,'lll')}
  const addfunction=()=>{
    if(isTitle.trim()==='')
    {
      seterrorrequiredtitle(true)
    }
    else{
      seterrorrequiredtitle(false)
    }
    const result=handlemessage(isDescription)
    if(result.trim()==='')
    {
      //alert('space')
      seterrorrequireddescription(true)
    }
    else{
      seterrorrequireddescription(false)
    }
    if(isTitle.trim()!=='' && isDescription.trim()!==''){
    let formData = new FormData(); 
    if(itemvalue!==null)
    {
      formData.append('id',itemvalue.id);
    }
    
    formData.append('title',isTitle);
    formData.append('description',isDescription)
    dispatch(createjdtemplatepostMiddleWare({formData}))
    .then((res)=>{
       if(res.payload.success===true){
      if(itemvalue!==null){
        Toast('Template update successfully', 'LONG', 'success');
      }else{
        Toast('Template saved successfully', 'LONG', 'success');
      }}
      else{
        Toast('Template api faild', 'LONG', 'error');
      } 
      dispatch(jdTemplatesApiMiddleWare({ ds_role: '0' }))})
      handleJdModal();   
  }
}
  return (
    
    <div>
      <Modal open={open}>
       
        <Flex className={styles.addtemplatePopup}>
        {itemvalue!==null?(<Text bold size={14} className={styles.titletext}>
            Update Template
          </Text>):( 
          <Text bold size={14} className={styles.titletext}>
            Add Template
          </Text>)}

          <Flex>
            <Flex>
              <InputText
                label="Template Title *"
              
                className={styles.templatetitleInput}
                maxLength={36}
                onChange={handletitle}
                value={isTitle}
                
              />
            </Flex>
            {errortitle && (
              <Text color='error'>Job description should not exceed 35 characters.</Text>
            )
            }
             {errorrequiredtitle&& (
              <Text color='error'>This field is required</Text>
            )
            }
             {errorname && (
              <Text color='error'> Job description title already exist</Text>
            )
            }
            <Flex marginTop={10}>
              <Text  color="theme" size={13}>
                Job Description *
              </Text>
              <RichText
              
                height={400}
                onChange={handleDescription}
                value={isDescription}
              />
            </Flex>
            {errordiscription && (
              <Text color='error'>Maximum limit of description is 5000</Text>
            )
            }
            {errorrequireddescription&& (
              <Text color='error'>This field is required</Text>
            )
            }
          
          </Flex>

          <Flex className={styles.btnContainer}>
            <Flex row >
              <Button types='close' onClick={handleJdModal} style={{marginRight:"5px"}} >
                Cancel
              </Button>
              {itemvalue!==null?( 
              <Button onClick={addfunction} disabled={errordiscription===true|| errortitle===true || errorname}>
                Update
              </Button>):(
              <Button onClick={addfunction} disabled={errordiscription===true|| errortitle===true|| errorname}>
                Add
              </Button>)}
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </div>
  )
}

export default JDopenModal
