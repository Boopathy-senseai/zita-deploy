import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
// import LinkWrapper from '../../uikit/Link/LinkWrapper';
import SvgJobId from '../../icons/SvgJobId';
import SvgLocation from '../../icons/SvgLocation';
import SvgCalendar from '../../icons/SvgCalendar';
// import SvgCopy from '../../icons/SvgCopy';
import { FinalListEntity } from './myJobPostingTypes';
import styles from './myjobpostingscreen.module.css';
type Props = {
  list: FinalListEntity;
  domain: string;
  career_page_url: string
};

const MyJobsPostingData = ({ list,domain,career_page_url}: Props) => {

// const draft = list.is_ds_role  !== true ?  `/jobs/create_non_ds_edit/${list.id}` : `/jobs/create_ds_edit/${list.id}`;
 console.log(career_page_url,domain)

  return (
    <Flex>
      
     
       <Flex row center>
        <Flex className={styles.icon}>
        <SvgJobId width={15} height={15} />
        </Flex>
        <Text className={styles.font}>
  {list.job_id}
      </Text>
        </Flex>
        <Flex row top>
        <Flex className={styles.icontop}>
     <SvgLocation width={15} height={15} fill={'#581845'} />
        </Flex>
        <Text className={styles.font}>
  {list.location}
      </Text>
        </Flex>
     
      {list.jd_status__label_name === 'Active' && (
        <Flex row center>
        <Flex className={styles.icon}>
        {/* <SvgCalendar width={13} height={13} /> */}
        </Flex>
        <Text className={styles.font}>
   {getDateString(list.job_posted_on_date, 'll')}
      </Text>
        </Flex>
      
      )}
       {list.jd_status__label_name === 'Draft' && (
         <Flex row center>
        <Flex className={styles.icon}>
        <SvgCalendar width={13} height={13} />
        </Flex>
        <Text className={styles.font}>
       NA
      </Text>
        </Flex>
          )}
     
      {list.jd_status__label_name === 'Questionnaire' && (
        <Flex row center>
        <Flex className={styles.icon}>
        <SvgCalendar width={13} height={13} />
        </Flex>
        <Text className={styles.font}>
       NA
      </Text>
        </Flex>
      )}

      {list.jd_status__label_name === 'Inactive' || list.jd_status__label_name === 'Preview' ||(
         <Flex row center>
        <Flex className={styles.icon}>
        <SvgCalendar width={13} height={13} />
        </Flex>
        <Text className={styles.font}>
   {getDateString(list.job_posted_on_date, 'll')}
      </Text>
        </Flex>
          )}
    </Flex>
  );
};

export default MyJobsPostingData;
