import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgEdit } from '../../../../icons';
import SvgDelete from '../../../../icons/SvgDelete';
import { Button, Text, Flex, Toast } from '../../../../uikit';
import styles from '../emailtemplates/emailtable.module.css'
import { AppDispatch, RootState } from '../../../../store';
import { emailtemplatesdeleteMiddleWare, emailtemplatesgetMiddleWare } from '../../store/middleware/accountsettingmiddleware';
import Modal from '../../../../uikit/v2/Modal/Modal';
import SvgNoData from '../../../../icons/SvgNoData';
import TemplateDescriptionmodal from './templatedescriptionModal';

type props = {
  handleOpenEmailModal: () => void;
  itemvalue:any;
  setitemvalue:any;
  setTitle:any;
  setDescription:any;
  setSubject: any;
};



const Table = ({
  handleOpenEmailModal,
  itemvalue,
  setitemvalue,
  setTitle,
  setDescription,
  setSubject,
}:props) => {
  
  const dispatch: AppDispatch = useDispatch();
  const [isTempDescModal, setTempDescModal]=useState(false)
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [DeletePopupOpen,setDeletePopupOpen]=useState(false);
  const [isdelete,setdelete]=useState<any>();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const {
    data,
    role,
  } = useSelector(
    ({
      emailTemplateReducers,
    }: RootState) => {
      return {
        data: emailTemplateReducers.data,
        role: emailTemplateReducers.role,
      };
    },
  );

  const divStyle = {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': "1",
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height:"34px",
    borderTop:"0px"
  };

function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
  


  const handleTempDescModal = (template) => {
    setSelectedTemplate(template);
    setTempDescModal(!isTempDescModal)
    if (itemvalue !== null){
      setitemvalue(null)
    }
  }

  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false)
  }

  const editfunction=(item:any)=>{
    handleOpenEmailModal();
    setitemvalue(item);
  }
  
  const onDeletefunction=(item:any)=>{
   setDeletePopupOpen(true)
   setdelete(item.id)
  }

  const confirmdeletefun=()=>{
    const id = isdelete
    dispatch(emailtemplatesdeleteMiddleWare(id))
    .then((res)=>{
           if(res.payload.success===true)
           {
            setDeletePopupOpen(false)
            dispatch(emailtemplatesgetMiddleWare())
            Toast('Email template deleted successfully', 'LONG', 'success');
           }
           else{
            Toast('Delete api faild', 'LONG', 'error');
            setDeletePopupOpen(false)
           }
    })
  }
  useEffect (()=>{
    if(itemvalue!==null && itemvalue !== undefined){
      setTitle(itemvalue.name)
      setDescription(itemvalue.templates)
      setSubject(itemvalue.subject)
    }
    dispatch(emailtemplatesgetMiddleWare())
  },[])

  
  useEffect (()=>{
    dispatch(emailtemplatesgetMiddleWare())
    .then((res)=>{
      setEmailTemplates(res.payload.data);
    })
  },[])
  return (
      <Flex
        className="table-responsisssve "
        style={{ overflowY: 'scroll', display: 'flex' }}
      >
        <Flex>

          
        <table
          className="table"
          style={{ paddingLeft: 'none', marginBottom: '0rem' }}
        >
          <thead className={styles.stickyheader}>
            <tr>
              <th className={styles.padchange} style={{width:"20%", borderBottom:"0", borderTop:"0"}}>
                <Text color="theme" bold className={styles.tabborder1}>
                  Template Title
                </Text>
              </th>
              <th className={styles.padchange} style={{width:"30%", borderBottom:"0", borderTop:"0"}}>
                <Text color="theme" bold className={styles.tabborder1}>
                  Subject
                </Text>
              </th>
              <th className={styles.padchange} style={{width:"20%", borderBottom:"0", borderTop:"0"}}>
                <Text color="theme" bold className={styles.tabborder1}>
                  Created By
                </Text>
              </th>
              <th className={styles.padchange} style={{width:"20%", borderBottom:"0", borderTop:"0"}}>
                <Text color="theme" bold className={styles.tabborder1}>
                  Created On
                </Text>
              </th>
              <th className={styles.padchange} style={{width:"10%", borderBottom:"0", borderTop:"0"}}>
                <Text color="theme" bold className={styles.tabborder2}>
                  Actions
                </Text>
              </th>
            </tr>
          </thead>
          {data !== undefined  && data.map((template) => (
                <tbody key={template.id} style={{ paddingTop: 20 }} className={styles.tablebody}>
                  <tr>
                    <td className={styles.padchang}>
                      <Flex onClick={() => handleTempDescModal(template)}>
                        <Text bold color='theme'>
                          {template.name}
                        </Text>
                      </Flex>
                    </td>
                    <td className={styles.padchang}
                    style={divStyle}
                    >
                      {template.subject}
                    </td>
                    <td className={styles.padchang}>
                      {template.full_name}
                    </td>
                    <td className={styles.padchang}>
                      {formatDate(template.created_on)}
                    </td>

                    <td className={styles.padchang}>
                      <Flex row className={styles.actionBtnContainer}>
                        <Flex 
                        onClick={() => editfunction(template)} 
                        style={{ cursor: "pointer" }}>
                          <SvgEdit width={12} height={12} fill={'#581845'} />
                        </Flex>
                        <Flex onClick={(()=>onDeletefunction(template))} style={{ cursor: "pointer" }}>
                          <SvgDelete width={16} height={16} fill={'#581845'} />
                        </Flex>
                      </Flex>
                    </td>
                  </tr>
              </tbody>
              ))}
        </table>
        {emailTemplates?.length === 0 && 
                    <Flex className={styles.nodataavailicon}>
                    <Flex flex={8} center middle style={{ display: 'flex' }}>
                      <SvgNoData width={16} height={16} fill={'#888888'} />
                        <Text style={{ marginTop: '2px' }} size={13} color="placeholder">
                          No data available
                          </Text>
                          </Flex>
                      </Flex>}
        <Flex>

        {isTempDescModal && (
                <>
                <TemplateDescriptionmodal 
                    open={true}
                    handleTempDescModal={handleTempDescModal}
                    emailTemplates={emailTemplates} 
                    selectedTemplate={selectedTemplate}
                    />
              </>
              )}
        
        {DeletePopupOpen && (
                <>
                  <Modal open={true}>
                    <Flex className={styles.deletepopup}>
                    <Flex>
                      <Text>
                        This action will permenently remove the email template and its content.
                      </Text>
                      <Text>
                        Are you sure to proceed?
                      </Text>
                    </Flex>
                    <Flex className={styles.delBtnContainer}>
                      <Flex row center width={"140px"} style={{justifyContent:"space-between"}}>
                        <Button types='close' onClick={handleDeletePopupClose}>
                          Cancel
                        </Button>
                        <Button onClick={confirmdeletefun}>
                          Delete
                        </Button>
                        </Flex>
                    </Flex>
                    </Flex>
                  </Modal>
                </>
              )}
        </Flex>
        </Flex>
      </Flex>

  )}


export default Table;
