import React, { useState } from 'react'
import Modal from '../../../../uikit/Modal/Modal'
import { Flex, Button } from '../../../../uikit';
import Text from '../../../../uikit/Text/Text';
import styles from '../emailtemplates/templatedescriptionmodal.module.css'
import SvgClose from '../../../../icons/SvgClose';

type Props = {
    open:boolean;
    handleTempDescModal:(template)=>void;
    emailTemplates: any[];
    selectedTemplate: any;
  }


const TemplateDescriptionmodal = ({
    open,
    handleTempDescModal,
    emailTemplates,
    selectedTemplate ,
}:Props) => {
   
    
    return (
    <div>
        <Flex>
        <Modal open={open}>
                        <Flex key={selectedTemplate.id} className={styles.descriptionpopup}>
                        <Flex row center className={styles.popupheading}>
                            <Flex>
                              <Text bold size={14} className={styles.titletext}>
                                {selectedTemplate.name}
                                </Text>
                            </Flex>
                            <Flex onClick={handleTempDescModal}>
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
                            <Text bold>
                                Subject Contant
                            </Text>
                            <Text>
                            {selectedTemplate.subject}
                            </Text>
                          </Flex>
                        <Flex>
                        <Flex>
                            <Text bold size={13} style={{margin: "5px 0px 2px 0px"}}>
                              Email Content
                            </Text>
                            <Text>
                              <div className={styles.listalignment} dangerouslySetInnerHTML={{ __html: selectedTemplate.templates }} />
                            </Text>
                          </Flex>
                        </Flex>
                        </Flex>
                    </Flex>
          {/* ))} */}
        </Modal>
        </Flex>

        <Flex>
        </Flex>
    </div>
  )
}

export default TemplateDescriptionmodal
