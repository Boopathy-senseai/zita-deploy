import { useState } from 'react';
import { SvgEdit } from '../../../../icons';
import SvgDelete from '../../../../icons/SvgDelete';
import { Button, Text, Flex } from '../../../../uikit';
import styles from '../emailtemplates/table.module.css'
import TemplateDescriptionmodal from './templatedescriptionModal';

type props = {
  handleBack: () => void;
};



const Table = () => {
  
  const [isTempDescModal, setTempDescModal]=useState(false)
  
  const handleTempDescModal = () => {
    setTempDescModal(!isTempDescModal)
  }

  return (

<Flex
  className="table-responsisssve "
  style={{ overflowY: 'scroll', display: 'flex' }}
  // height={len_list !== 0 && window.innerHeight - 220}
>
  <table
    className="table"
    style={{ paddingLeft: 'none', marginBottom: '0rem' }}
  >
    <thead className={styles.stickyheader}>
      <tr>
        <th className={styles.padchange} style={{width:"40%"}}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Template Title
          </Text>
        </th>
        <th className={styles.padchange} style={{width:"15%"}}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Subject
          </Text>
        </th>
        <th className={styles.padchange} style={{width:"15%"}}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Created By
          </Text>
        </th>
        <th className={styles.padchange} style={{width:"15%"}}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Created On
          </Text>
        </th>
        <th className={styles.padchange} style={{width:"15%"}}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Actions
          </Text>
        </th>
      </tr>
    </thead>
    <tbody style={{ paddingTop: 20 }} className={styles.tablebody}>
      <tr style={{ height: 50 }}>
        <td className={styles.padchang}>
          <Flex onClick={handleTempDescModal}>
            <Text bold color='theme'>
              Template Description
            </Text>
          </Flex>
        </td>
        <td className={styles.padchang}>
          Subject
        </td>
        <td className={styles.padchang}>
          Created by
        </td>
        <td className={styles.padchang}>
          Created On
        </td>
        <td className={styles.padchang}>
        <Flex row className={styles.actionBtnContainer}>
            <SvgEdit width={12} height={12} fill={'#581845'} />
            <SvgDelete width={16} height={16} fill={'#581845'} />
        </Flex>
        </td>
      </tr>
    </tbody>
    {/* </Flex> */}
  </table>
  <Flex>
  {isTempDescModal && (
          <>
          <TemplateDescriptionmodal open={true} handleTempDescModal={handleTempDescModal}/>
        </>
        )}
  </Flex>
</Flex>

  )}


export default Table;
