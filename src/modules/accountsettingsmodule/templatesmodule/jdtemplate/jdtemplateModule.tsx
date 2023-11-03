import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Modal } from 'react-bootstrap'
import { AppDispatch, RootState } from '../../../../store'

import { Text, Flex, Button, Card, Toast, Loader } from '../../../../uikit'
import SvgAdd from '../../../../icons/SvgAdd'
import {  jddeleteMiddleWare } from '../../store/middleware/accountsettingmiddleware'
import SvgDotMenu from '../../../../icons/SvgDotMenu'
import SvgBack from '../../../../icons/SvgBack'

import { jdTemplatesApiMiddleWare } from '../../../createjdmodule/store/middleware/createjdmiddleware'
import CancelAndDeletePopup from '../../../common/CancelAndDeletePopup'
import ViewjdModal from './viewjdModal'
import styles from './jdtemplateModule.module.css'
import JDopenModal from './jdopenModal'



type jdProps = {
  handleBack: () => void;
};
const jdtemplateModule = ({ handleBack }: jdProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [itemvalue,setitemvalue]=useState<any>(null)

  const {
    jd_templates, job_title,isloading
  } = useSelector(
    ({
      jdTemplatesReducers,
    }: RootState) => {
      return {
        isloading : jdTemplatesReducers.isLoading,
        job_title: jdTemplatesReducers.job_title,
        jd_templates: jdTemplatesReducers.jd_templates,
      };
    },
  );
  const [isOpenJDModal, setOpenJDModal] = useState(false);
  const [opendelete,setopendelete]=useState(false);
  const [iddelete,setiddelete]=useState<any>()
  const [idview,setidview]=useState<any>()
  const [openview,setopenview]=useState(false);
  useEffect(() => {
    dispatch(jdTemplatesApiMiddleWare({ ds_role: '0' })).then((res) => {
      console.log("res=========", res)
    })
  }, [])
  const handleJdModal = () => {
    setOpenJDModal(!isOpenJDModal)
    if (itemvalue !== null){
      setitemvalue(null)
    }
  }

  function itemclose(){
    setitemvalue(null)
  }
 
  const closeview=()=>{
    setopenview(false)
  }
  const oneditfunction=(item:any)=>{
    handleJdModal();
    setitemvalue(item);
  }
  const onDeletefunction=(item:any)=>{
    setopendelete(true)
    setiddelete(item.id)
  }
  const conformdeletefun=()=>{
    console.log("iddelete",iddelete)
    const id = iddelete
    dispatch(jddeleteMiddleWare(id)).then((res)=>{
           if(res.payload.success===true)
           {
            setopendelete(false)
            dispatch(jdTemplatesApiMiddleWare({ ds_role: '0' }))
            Toast('Template deleted successfully', 'LONG', 'success');
           }
           else{
            Toast('Delete api faild', 'LONG', 'error');
           }
    })
  }
  const openviewfun=(item:any)=>{
    setopenview(true);
    setidview(item);
  }
  if(isloading){
    return<Loader/>
  }

  return (
    <>
    <Flex

      column
      className={styles.overflowContainer}
      style={{ padding: '0px 10px' }}
    >
{console.log('title',job_title.length,job_title)}
      <Flex row between className={styles.titleBar}>
        <Flex row center className={styles.title} onClick={() => handleBack()}>
          <SvgBack height={10} width={10} />
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
            <JDopenModal 
            open={true}
            handleJdModal={handleJdModal}
            itemvalue={itemvalue}
            itemclose = {itemclose}
            job_title={job_title}
             />
          </>
        )}

        {openview && (
          <ViewjdModal open={true} setidview={setidview}  idview={idview} closeview={closeview}/>
        )}


        
       
      </Flex>
      <Flex className={styles.aligncards} height={window.innerHeight - 207}>
        {console.log("res,", jd_templates)}
        {jd_templates.length !== 0 && (
          jd_templates.map((item) => (
            <Card className={styles.pipelineStructure} key={item.id}>
              <Flex row start between className={styles.rowGroup}>
                <Flex row className={styles.cardHeader} >
                  <Text bold className={styles.titleText} title={item.job_title}>{item.job_title}</Text>

                </Flex>
                <ActionsButton
                  onDelete={() => onDeletefunction(item)}
                  onEdit={() => oneditfunction(item)}
                />
              </Flex>
              <Flex
                column
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginTop: 10,
                  borderTop: '1px solid #c3c3c3',
                }}
              >
                <Button className={styles.btn2} onClick={() => openviewfun(item)}>
                  <Text bold color="theme">
                    View template
                  </Text>
                </Button>
              </Flex>
            </Card>
          ))
        )}
      </Flex>
  
    </Flex>
     { opendelete === true ? (
      <CancelAndDeletePopup
        btnCancel={() => setopendelete(false)}
        title={
          <Flex className={styles.popUpFlex}>
            <Flex column>
              <Flex>
                <Text size={13} style={{ marginLeft: '10px' }}>
                This action will permanently remove the template and its job description.
                </Text>
              </Flex>
            </Flex>
            <Flex>
              <Text
                size={13}
                style={{ marginLeft: '10px', marginTop: '2px' }}
              >
                Are you sure to proceed?
              </Text>
            </Flex>
          </Flex>
        }
        btnDelete={conformdeletefun}
        btnLeft="Cancel"
        btnRight="Delete"
        open={opendelete}
        
        // loader={deleteBtnLoader}
      />
    ) : (
      ''
    )}

  
    </>
  )
}


const ActionsButton = ({
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <Dropdown className="dropdownButton dropleft">

        <Dropdown.Toggle
          style={{
            borderColor: 'unset',
            backgroundColor: 'unset',
            boxShadow: 'none',
          }}
          id="dropdown-basic"
        >
          <SvgDotMenu height={10} width={10} fill="#581845" />
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ minWidth: '5rem' }}>

          <Dropdown.Item onClick={onEdit}>
            <Flex row center className={styles.dropDownListStyle}>
              <Text>Edit</Text>
            </Flex>
          </Dropdown.Item>
          <Dropdown.Item onClick={onDelete}>
            <Flex row center className={styles.dropDownListStyle}>
              <Text>Delete</Text>
            </Flex>
          </Dropdown.Item>

        </Dropdown.Menu>

      </Dropdown>
    </>
  );
};

export default jdtemplateModule