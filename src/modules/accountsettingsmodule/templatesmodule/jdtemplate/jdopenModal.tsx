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
}

const JDopenModal = ({
  open,
  handleJdModal,
  itemvalue,
  itemclose
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  
  const [isTitle, setTitle] = useState("")
  const [isDescription, setDescription] = useState("")
  const [errordiscription, seterrordiscription] = useState(false)
  const [errortitle, seterrortitle] = useState(false)
  const handletitle = (e: any) => {
    setTitle(e.target.value)
    const title = e.target.value;
    if (title.length > 25) {
      seterrortitle(true)
    }
    else {
      seterrortitle(false)
    }
  }

    useEffect (()=>{
      if(itemvalue!==null && itemvalue !== undefined){
        setTitle(itemvalue.job_title)
        setDescription(itemvalue.job_description)
      }
      dispatch(jdTemplatesApiMiddleWare({ ds_role: '0' })).then((res)=>{
        console.log("res=========",res)
      })
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
    formData.append('description',isDescription)
    dispatch(createjdtemplatepostMiddleWare({formData}))
    .then((res)=>{
       if(res.payload.success===true){
      if(itemvalue!==null){
        Toast('Jd Update successfully', 'LONG', 'success');
      }else{
        Toast('Jd template saved successfully', 'LONG', 'success');
      }}
      else{
        Toast('Jd template api faild', 'LONG', 'error');
      } 
      dispatch(jdTemplatesApiMiddleWare({ ds_role: '0' }))})
      handleJdModal();   
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
                label="Template Title"
                labelBold
                className={styles.templatetitleInput}
                maxLength={26}
                onChange={handletitle}
                value={isTitle}
              />
            </Flex>
            {errortitle && (
              <Text color='error'>Maximum limit of title is 25</Text>
            )
            }
            <Flex>
              <Text bold color="theme" size={13}>
                Job Description
              </Text>
              <RichText

                height={200}
                onChange={handleDescription}
                value={isDescription}
              />
            </Flex>
            {errordiscription && (
              <Text color='error'>Maximum limit of description is 2000</Text>
            )
            }
          
          </Flex>

          <Flex className={styles.btnContainer}>
            <Flex row >
              <Button types='close' onClick={handleJdModal} style={{marginRight:"5px"}}>
                Cancel
              </Button>
              {itemvalue!==null?( 
              <Button onClick={addfunction}>
                Update
              </Button>):(
              <Button onClick={addfunction}>
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
