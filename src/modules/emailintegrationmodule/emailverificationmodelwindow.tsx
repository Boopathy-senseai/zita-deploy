import React, { useState, useEffect } from 'react';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex';
import SvgVectorClose from '../../icons/SvgMailClose';
import Button from '../../uikit/Button/Button';
import styles from './emailverificationmodelwindow.module.css';
type Props = {
  data: { open: boolean; actions?: React.ReactNode };
  message: string;
  close: () => void;
};
const VerificationModel = ({ data, message, close }: Props) => {
  const handleClose = () => {
    close();
  };

  return (
    <div>
      <Modal open={data.open}>
        <Flex flex={6} column center className={styles.overAll}>
          <Flex> 
            <Text size={13} color="black" className={styles.insertStyles}>
              {message}
            </Text>
          </Flex>

          {!data.actions ? (
            <Flex row end marginTop={10} className={styles.borderLine}>
              <Button types={'primary'} onClick={handleClose}>
                OK
              </Button>
            </Flex>
          ) : (
            data.actions
          )}

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
