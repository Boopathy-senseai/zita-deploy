import React, { useState, useEffect } from 'react';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex';
import SvgVectorClose from '../../icons/SvgMailClose';
import Button from '../../uikit/Button/Button';
import styles from './emailverificationmodelwindow.module.css';
type Props = {
  data: boolean;
  message: string;
  close: () => void;
};
const VerificationModel = ({ data, message, close }: Props) => {
  const handleClose = () => {
    close();
  };

  return (
    <div>
      <Modal open={data}>
        <Flex flex={6} column center className={styles.overAll}>
          <Flex>
            <Flex marginBottom={5} row center>
              {/* <SvgCross width={14} height={14}/> */}
              <Text bold size={14} style={{ color: 'red'}}>
                Error
              </Text>
            </Flex>
            <Text size={14} color="black" className={styles.insertStyles}>
              {message}
            </Text>
          </Flex>

          <Flex row end marginTop={20} className={styles.borderLine}>
            <Button
              // className={styles.cancel}
              types={'primary'}
              onClick={handleClose}
            >
              OK
            </Button>
            {/* <Button className={styles.update} onClick={handleDeletePipelinePopup}>
            Delete
          </Button> */}
          </Flex>

          {/* <Flex style={{ padding: '5px 20px 20px 20px' }}>
            <Flex
              style={{
                justifyContent: 'center',
                position: 'relative',
                top: '100px',
              }}
            >
              <Text size={16} bold>
                {message}
              </Text>
            </Flex>
            <Flex end>
              <Button style={{ marginTop: '195px' }} onClick={handleClose}>
                Close
              </Button>
            </Flex>
          </Flex> */}
        </Flex>
      </Modal>
    </div>
  );
};
export default VerificationModel;
