import { useState } from 'react';
import SvgAdd from '../../../../icons/SvgAdd';
import SvgBack from '../../../../icons/SvgBack';
import { Button, Text, Flex } from '../../../../uikit';
import Modal from '../../../../uikit/Modal/Modal'
import SvgClose from '../../../../icons/SvgClose';
import styles from './emailtemplateScreen.module.css';
import Emailopenmodal from './emailopenModal';
import Table from './table';
import TemplateDescriptionmodal from './templatedescriptionModal';

type props = {
  handleBack: () => void;
  open: boolean;
  handleOpenDescripModal: ()=> void;
};


const Emailtemplatescreen = ({ handleBack, open, handleOpenDescripModal }: props) => {
  const [isOpenEmailModal, setOpenEmailModal]=useState(false)
  const [isOpenDeletePopup, setOpenDeletePopup]=useState(false)


  const handleOpenEmailModal = () => {
    setOpenEmailModal(!isOpenEmailModal)
  }

  const handleDeletePopupOpen = () => {
    setOpenDeletePopup(true)
  }

  const handleDeletePopupClose = () => {
    setOpenDeletePopup(false)
  }
  return (
    <Flex
      column
      className={styles.overflowContainer}
      style={{ padding: '0px 10px' }}
    >
      <Flex row between className={styles.titleBar}>
        <Flex
          row
          center
          className={styles.title}
          onClick={() => {
            handleBack();
          }}
        >
          <SvgBack height={14} width={14} />
          <Text color="theme" bold size={13} style={{ marginLeft: '5px' }}>
            Email Templates
          </Text>
        </Flex>

        <Button onClick={handleOpenEmailModal}>
          <Flex row center className={styles.pointer}>
            <SvgAdd height={10} width={10} fill="#FFFFFF" />
            <Text bold color="white" size={13} style={{ marginLeft: '10px' }}>
              Add Template
            </Text>
          </Flex>
        </Button>
      </Flex>
        {isOpenEmailModal && (
          <>
          <Emailopenmodal open={true}
          handleOpenEmailModal={handleOpenEmailModal}/>
          </>
        )}
        <Flex>
          <Table/>
        </Flex>
        
        {isOpenDeletePopup && (
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
                  <Button>
                    Delete
                  </Button>
                  </Flex>
              </Flex>
              </Flex>
            </Modal>
          </>
        )}
    </Flex>
  );
};

export default Emailtemplatescreen;
