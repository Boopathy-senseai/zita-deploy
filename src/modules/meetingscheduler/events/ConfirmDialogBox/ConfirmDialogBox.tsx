import React from 'react';
import Button from '../../../../uikit/Button/Button';
import Flex from '../../../../uikit/Flex/Flex';
import styles from './confirmationdialog.module.css';


const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <>
    <Flex className={styles.container} >
      <Flex row className={styles.message}>{message}</Flex>
      { message === 'Select Atleast One Availble Day' || message === 'Atleast One inteerview must be integrated to the Google Calendar' ? (
         <Flex row end>
         {/* <Button types={"primary"} className={styles.cancel} onClick={onCancel}>Cancel</Button> */}
         <Button  className={styles.button} onClick={onConfirm}>Ok</Button>
         </Flex>


      ) : (

        <Flex row end>
        <Button types={"primary"} className={styles.cancel} onClick={onCancel}>Cancel</Button>
        <Button  className={styles.button} onClick={onConfirm}>Confirm</Button>
        </Flex>
      )

      }
     
    </Flex>
    </>
  );
};

export default ConfirmationDialog;