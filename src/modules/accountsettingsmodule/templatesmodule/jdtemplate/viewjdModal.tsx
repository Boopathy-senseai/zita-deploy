import React, { useState } from 'react'
import Modal from '../../../../uikit/Modal/Modal'
import { Flex, Button } from '../../../../uikit';
import Text from '../../../../uikit/Text/Text';
import SvgClose from '../../../../icons/SvgClose';

import styles from './viewjdModel.module.css'

type Props = {
  open:boolean;
  setidview:any
  idview:any
  closeview:()=>void;
}
const ViewjdModal = ({
  open,
  setidview,
  idview,
  closeview

}:Props) => {
  const parser = new DOMParser();
  const handlemessage = (values) => {
    
    const doc = parser.parseFromString(values, 'text/html');
    const textNodes = doc.querySelectorAll('body')[0].textContent;
    const texttrim = textNodes.trim();
    return texttrim;
   
  };
  return (
    <div>
      <Flex>
        <Modal open={open}>
          <Flex className={styles.descriptionpopup}>
            <Flex row center className={styles.popupheading}>
              <Flex>
                <Text bold size={14} className={styles.titletext}>
                  {idview.job_title}
                </Text>
              </Flex>
              <Flex  onClick={closeview}>
                <SvgClose
                  width={10}
                  height={10}
                  fill={'#888888'}
                  cursor={'pointer'}
                />
              </Flex>
            </Flex>
            <Flex>
            

              <Flex>
                <Flex height={window.innerHeight - 240} className={styles.overflow}>
                  <Text  style={{ margin: "5px 0px 2px 0px" }}>
                  <div className={styles.listalignment} dangerouslySetInnerHTML={{ __html: idview.job_description }} />
                  </Text>
                </Flex>
                <Flex>
                  {/* Email Content Description */}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Modal>
      </Flex>

      <Flex>
      </Flex>
    </div>
  )
}

export default ViewjdModal