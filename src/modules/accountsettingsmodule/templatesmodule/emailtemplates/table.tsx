import { Button, Text, Flex } from '../../../../uikit';
import styles from '../emailtemplates/table.module.css'
type props = {
  handleBack: () => void;
};
const Table = () => {


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
    <tbody style={{ paddingTop: 20 }} className={styles.tablebody}></tbody>
    {/* </Flex> */}
  </table>
</Flex>

  )}


export default Table;
