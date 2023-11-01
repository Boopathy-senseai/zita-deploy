import { Button, Text, Flex } from '../../../../uikit';

type props = {
  handleBack: () => void;
};
const Emailtemplatescreen = () => {


  return (

<Flex
  className="table-responsisssve "
  style={{ overflowY: 'scroll', display: 'flex' }}
  height={len_list !== 0 && window.innerHeight - 220}
>
  <table
    className="table"
    style={{ paddingLeft: 'none', marginBottom: '0rem' }}
  >
    <thead className={styles.stickyheader}>
      <tr>
        <th className={styles.padchange}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Job Title
          </Text>
        </th>
        <th className={styles.padchange} style={{ width: '130px' }}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Job ID
          </Text>
        </th>
        <th className={styles.padchange} style={{ width: '235px' }}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Location
          </Text>
        </th>
        <th className={styles.padchange} style={{ width: '88px' }}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Zita Match
          </Text>
        </th>
        <th className={styles.padchange} style={{ width: '124px' }}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Invited to Apply
          </Text>
        </th>
        <th className={styles.padchange} style={{ width: '90px' }}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Applicants
          </Text>
        </th>{' '}
        <th className={styles.padchange} style={{ width: '135px' }}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Screening Status
          </Text>
        </th>
        {/* <th className="text-center" scope="col">
                <Text color="theme" bold className={styles.tabeboarder}>
                  Metric
                </Text>
              </th> */}
        <th className={styles.padchange} style={{ width: '70px' }}>
          <Text color="theme" bold className={styles.tabeboarder}>
            Status
          </Text>
        </th>
        <th className={styles.padchange} style={{ width: '100px' }}>
          <Text color="theme" bold className={styles.tableboarder}>
            Posted on
          </Text>
        </th>
      </tr>
    </thead>
    <tbody style={{ paddingTop: 20 }} className={styles.tablebody}></tbody>
    {/* </Flex> */}
  </table>
</Flex>;

  )}


