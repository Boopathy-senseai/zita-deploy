import React, { useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import Modal from '../../uikit/Modal/Modal';
import Flex from '../../uikit/Flex/Flex';
import SvgVectorexpand from '../../icons/SvgMailExpand';
import SvgVectorMinimise from '../../icons/SvgMailMinimise';
import SvgVectorClose from '../../icons/SvgMailClose';
import { InputText, LabelWrapper } from '../../uikit';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import RichText from '../common/RichText';
import { SvgTrash } from '../../icons';
import styles from './compose.module.css';

type Props = {
  data: boolean;
  onClose: () => void;
};

const Newmessage = ({ data, onClose }: Props) => {
  const [model, setmodel] = useState(data);
  const [style, setstyle] = useState(0);
  const [openCc, setopenCc] = useState(false);
  const [openBcc, setopenBcc] = useState(false);
  const [datas, setdata] = useState([
    {
      value: 'Sridharchinnathambi96@gmail.com',
      label: 'Sridharchinnathambi96@gmail.com',
    },
    { value: 'sridharsense7ai.com', label: 'sridharsense7ai.com' },
    { value: 'sample@gmail.com', label: 'sample@gmail.com' },
    { value: 'test@gmail.com', label: 'test@gmail.com' },
    { value: 'model@gmail.com', label: 'model@gmail.com' },
    { value: 'value@gmail.com', label: 'value@gmail.com' },
    { value: 'signup@gmail.com', label: 'signup@gmail.com' },
    { value: 'mano@sangar.com', label: 'mano@sangar.com' },
  ]);

  const handleClose = () => {
    onClose();
    setstyle(0);
    setopenCc(false);
    setopenBcc(false);
  };

  const handleview = () => {
    setstyle(1);
  };

  const Minimise = () => {
    setstyle(2);
  };

  const openCC = () => {
    setopenCc(true);
  };

  const openBCC = () => {
    setopenBcc(true);
  };

  const sendmail = () => {
    alert('srsr');
  };

  return (
    <div>
      <div style={{ position: 'absolute', bottom: '0px', right: '0px' }}>
        <Modal open={data}>
          <div
            className={
              style === 1
                ? styles.modelmiddle
                : style === 2
                ? styles.minimised
                : styles.popup
            }
          >
            <Flex row between className={styles.topSection}>
              <Text color="white">New Email</Text>
              <Flex row between className={styles.optionMenu}>
                <Flex
                  style={{
                    marginTop: '15px',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <SvgVectorMinimise onClick={Minimise} />
                </Flex>
                <Flex
                  style={{
                    marginTop: '7px',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <SvgVectorexpand onClick={handleview} />
                </Flex>
                <Flex style={{ marginTop: '7px', cursor: 'pointer' }}>
                  <SvgVectorClose
                    width={11}
                    height={11}
                    fill="#ffffff"
                    viewBox="0 0 9 9"
                    onClick={handleClose}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex style={{ padding: '0px 10px 10px 10px' }}>
              <Flex row between className={styles.inputField}>
                <Flex row>
                  <div style={{ width: '550px' }}>
                    <SelectTag
                      label="TO"
                      labelBold
                      placeholder={''}
                      //  className={styles.searchinput}
                      //  ref={selectInputRef}
                      isMulti
                      isMail
                      options={datas}
                      // onInputChange={(value) => setSkills(value)}
                      // onChange={(option) => {
                      //   formik.setFieldValue('skillValue', option);
                      // }}
                      isSearchable
                      isCreate
                      // value={formik.values.skillValue}
                    />
                  </div>
                </Flex>
                <Flex row>
                  {!openCc ? (
                    <Flex marginRight={5} onClick={openCC}>
                      Cc
                    </Flex>
                  ) : (
                    ''
                  )}

                  {!openBcc ? <Flex onClick={openBCC}>Bcc</Flex> : ''}
                </Flex>
              </Flex>
              {openCc ? (
                <Flex row center className={styles.inputField}>
                  <Text>Cc</Text>
                  <InputText className={styles.inputStyle} />
                </Flex>
              ) : (
                ''
              )}

              {openBcc ? (
                <Flex row center className={styles.inputField}>
                  <Text>Bcc</Text>
                  <InputText className={styles.inputStyle} />
                </Flex>
              ) : (
                ''
              )}

              <Flex row center className={styles.inputField}>
                <Text>Subject</Text>
                <InputText className={styles.inputStyle} />
              </Flex>
              <div style={{ marginTop: '10px', padding: '5px' }}>
                <RichText height={350} />
              </div>
              <Flex row between center style={{ marginTop: '30px' }}>
                <Button onClick={() => sendmail()}>send</Button>
                <SvgTrash width={16} height={16} />
              </Flex>
            </Flex>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Newmessage;
