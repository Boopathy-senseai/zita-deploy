import { useState } from 'react';
import SvgAdd from '../../../../icons/SvgAdd';
import SvgBack from '../../../../icons/SvgBack';
import { Button, Text, Flex } from '../../../../uikit';
import styles from './emailtemplateScreen.module.css';
import Emailopenmodal from './emailopenModal';
import Table from './table';

type props = {
  handleBack: () => void;
  setTitle: any;
  setDescription:any;
  setEmailTemplates:any;
  setSubject: any;
};


const Emailtemplatescreen = ({ 
  handleBack,
  setTitle,
  setDescription,
  setEmailTemplates,
  setSubject,
 }: props) => {
  const [isOpenEmailModal, setOpenEmailModal]=useState(false)
  const [itemvalue,setitemvalue]=useState<any>(null)

  const handleOpenEmailModal = () => {
    setOpenEmailModal(!isOpenEmailModal)
    if (itemvalue !== null){
      setitemvalue(null)
    }
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
          <SvgBack height={10} width={10} />
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
          <Emailopenmodal 
            open={true}
            handleOpenEmailModal={handleOpenEmailModal} 
            itemvalue={itemvalue}
            setEmailTemplates={setEmailTemplates}
            />
          </>
        )}
        <Flex>
          <Table
            handleOpenEmailModal={handleOpenEmailModal}
            setitemvalue={setitemvalue}
            itemvalue={itemvalue} 
            setTitle={setTitle} 
            setDescription={setDescription}
            setSubject={setSubject}
            />
        </Flex>
    </Flex>
  );
};

export default Emailtemplatescreen;
