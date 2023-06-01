import React, { useState, useEffect } from 'react';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex';
import SvgVectorClose from '../../icons/SvgMailClose';
import Button from '../../uikit/Button/Button';
import styles from './compose.module.css';

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
        <div
          style={{ width: '600px ', height: '300px', backgroundColor: 'white' }}
        >
          <Flex row between className={styles.topSection}>
            <Text color="white">Verification Model</Text>
            <Flex end style={{ marginTop: '5px', cursor: 'pointer' }}>
              <SvgVectorClose
                width={11}
                height={11}
                fill="#ffffff"
                viewBox="0 0 9 9"
                onClick={handleClose}
              />
            </Flex>
          </Flex>
          <Flex style={{ padding: '5px 20px 20px 20px' }}>
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
          </Flex>
        </div>
      </Modal>
    </div>
  );
};
export default VerificationModel;
