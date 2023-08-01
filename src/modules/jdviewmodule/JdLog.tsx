import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Text from '../../uikit/Text/Text';
import { getDateString } from '../../uikit/helper';
import styles from './jdlog.module.css';
import { IntList,Jd} from './jdViewTypes';
// import { Jd } from './jdViewTypes';
type Props = {
  statusList: IntList;
  jdDetails: Jd;
};

const JdLog = ({ statusList,jdDetails }: Props) => {
  const statusandactive = [
    {
      title: 'Status',
      value: statusList.jd_status,
      url: '',
    },
    {
      title: 'Active For',
      value: statusList.active_for,
      url: '',
    },]
  const statusArray = [
    // {
    //   title: 'Status:',
    //   value: statusList.jd_status,
    //   url: '',
    // },
    // {
    //   title: 'Active For:',
    //   value: statusList.active_for,
    //   url: '',
    // },
    {
      title: 'Views',
      value: statusList.views,
      url: '',
    },
    {
      title: 'Zita Match',
      value: statusList.zita_match,
      url: '',
    },
    {
      title: 'Invited to Apply',
      value: statusList.invite,
      url: '',
    },
    {
      title: 'Applicants',
      value: statusList.applicants,
      url: '',
    },
 {
      title: 'Shortlisted',
      value: statusList.shortlisted,
      url: '',
    },

    {
      title: 'Offered',
      value: statusList.offered,
      url: '',
    },
    {
      title: 'Rejected',
      value: statusList.rejected,
      url: '',
    },
  ];
console.log('statusList',statusList);
  return (
    <Card className={styles.logStyle}>
      <Flex>
        <Text
          align="center"
          bold
          size={16}
          color="theme"
          className={styles.jdStatus}
        >
          JD Status Log
        </Text>
        <Flex className={styles.paddingstatus}>
        {statusandactive.map((list) => {
          return (
            <>
           
            {list.value === 0 ? (
              <Flex row center className={styles.listFlex1}>
                <Text color="theme" bold className={styles.titleStyle}>
                  {list.title}
                </Text>
                <Text>{list.value}</Text>
              </Flex>
            ) : (
              <Flex row center className={styles.listFlex1}>
                {list.title === 'Status' && (
                  <>
                <Text color="theme" bold className={styles.titleStyle}>
                  {list.title}
                </Text>
                {list.value ==="Active"&&
                  <Text style={{color:"green",fontWeight:"600"}} >{list.value}</Text> }   
                  {list.value ==="Inactive"&&
                  <Text style={{color:"red",fontWeight:"600"}} >{list.value}</Text> }   
                    {list.value ==="Draft"&&
                  <Text style={{color:"yellow",fontWeight:"600"}} >{list.value}</Text> }              
                </>
            )}  {list.title === 'Active For' && (
            <>
            { jdDetails.jd_status__label_name === 'Inactive' ?
               <>
                <Text color="theme" bold className={styles.titleStyle}>
                  Posted On                    </Text>
                   <Text style={{width:"100px",fontSize:"13px"}}>{getDateString(jdDetails.job_posted_on , 'll')}</Text>
                </>
                :
                  <>
                <Text color="theme" bold className={styles.titleStyle}>
                  {list.title}
                </Text>
                   <Text  style={{width:"100px",fontSize:"13px"}}>{list.value}</Text>
                </>
            }
            </>
            )} 
              </Flex>
            )}
          
          </>
          )
             })}
        </Flex>
        <Flex className={styles.flexproperty}>

          {statusArray.map((list) => {
            return (
              <>
                {list.value === 0 ? (
                  <Flex  row between end className={styles.listFlex}>
                       <Flex>
                    <Text color="theme" bold className={styles.titleStyle}>
                      {list.title}
                    </Text></Flex>
                     <Flex className={styles.circleflexover}>
                      <Text>{list.value}</Text>
                      </Flex>
                    
                  
                  </Flex>
                ) : (
                  <Flex  center className={styles.listFlex}>
                      {list.title === 'Views' && (
                      <>
                      <Flex row between end className={styles.box}>
                      
                       <Flex>
                    <Text color="theme" bold className={styles.titleStyle}>
                      {list.title}
                    </Text></Flex>
                    <Flex className={styles.circleflexover}>
                       <Text >{list.value}</Text>
                       </Flex>
                    </Flex>
                       
                    </>
                )}  {list.title === 'Zita Match' && (
                <>
                { jdDetails.jd_status__label_name === 'Inactive' ?
                      <>
                       <Flex  row between end className={styles.box}>
                       <Flex>
                    <Text color="theme" bold className={styles.titleStyle}>
                      {list.title}
                    </Text></Flex>
                       <Flex className={styles.circleflexover}>
                      <Text >{list.value}</Text>
                      </Flex>
                    
                    </Flex>
                      
                    </>
                    :
                      <>
                       <Flex row between end className={styles.box}>
                       <Flex>
                    <Text color="theme" bold className={styles.titleStyle}>
                      {list.title}
                    </Text>
                    </Flex>
                        <Flex>
                      <LinkWrapper to={`/zita_match_candidate/${jdDetails.id}`} target={'_parent'}>
                      <Flex className={styles.circleflexover}>
                      <Text color="link" bold>{list.value}</Text>
                      </Flex>
                    </LinkWrapper></Flex>
                   
                    </Flex>
                    </>
                  }
                  </>
                )}{list.title === 'Invited to Apply' && (
                      <>
                { jdDetails.jd_status__label_name === 'Inactive' ?
                      <>
                       <Flex row between end className={styles.box}>
                       <Flex>
                    <Text color="theme" bold className={styles.titleStyle}>
                      {list.title}
                    </Text>
                    </Flex>
                       <Flex className={styles.circleflexover}>
                       <Text >{list.value}</Text>
                       </Flex>
                     
                    </Flex>
                                       
                  
                    </>
                    :
                      <> <Flex row between end className={styles.box}>
                        <Flex>
                    <Text color="theme" bold className={styles.titleStyle}>
                      {list.title}
                    </Text>
                    </Flex>
                        <Flex>
                         <LinkWrapper to={`/zita_match_candidate/${jdDetails.id}`} target={'_parent'}>
                         <Flex className={styles.circleflexover}>
                      <Text color="link" bold>{list.value}</Text></Flex>
                    </LinkWrapper></Flex>
                    
                    </Flex>
                 
                    </>
                  }
                  </>
                )}{list.title === 'Applicants' && (
                      <>
                       <Flex row between end className={styles.box}>
                       <Flex>
                    <Text color="theme" bold className={styles.titleStyle}>
                      {list.title}
                    </Text></Flex>
                        <Flex>
                       <LinkWrapper to={`/applicant_pipe_line/${jdDetails.id}`} target={'_parent'}>
                       <Flex className={styles.circleflexover}>
                      <Text color="link" bold>{list.value}</Text></Flex>
                    </LinkWrapper></Flex>
                    
                    </Flex>
                      
                    </>
                )}
                {list.title === 'Shortlisted' && (
                      <>
                       <Flex row between end className={styles.box}>
                       <Flex>
                    <Text color="theme" bold className={styles.titleStyle}>
                      {list.title}
                    </Text>
                    </Flex>
                        <Flex>
                      <LinkWrapper to={`/applicant_pipe_line/${jdDetails.id}`} target={'_parent'}>
                      <Flex className={styles.circleflexover}>
                      <Text color="link" bold>{list.value}</Text></Flex>
                    </LinkWrapper></Flex>
                   
                    </Flex>
                       
                    </>
                )}{list.title === 'Offered' && (
                      <>
                       <Flex  row between end className={styles.box}>
                       <Flex>
                    <Text color="theme" bold className={styles.titleStyle}>
                      {list.title}
                    </Text>
                    </Flex>
                        <Flex>
                       <LinkWrapper to={`/applicant_pipe_line/${jdDetails.id}`} target={'_parent'}>
                       <Flex className={styles.circleflexover}>
                      <Text color="link" bold>{list.value}</Text></Flex>
                    </LinkWrapper></Flex>
                    
                    </Flex>
                   
                    </>
                )}{list.title === 'Rejected' && (
                      <>
                       <Flex row between end  className={styles.box}>
                       <Flex>
                    <Text color="theme" bold className={styles.titleStyle}>
                      {list.title}
                    </Text>
                    </Flex>
                        <Flex>
                       <LinkWrapper to={`/applicant_pipe_line/${jdDetails.id}`} target={'_parent'}>
                        <Flex className={styles.circleflexover}>
                      <Text color="link" bold>{list.value}</Text></Flex>
                    </LinkWrapper></Flex>
                   
                    </Flex>
                    
                    </>
                )}
                  </Flex>
                )}
              </>
            );
          })}
        </Flex>
      </Flex>
    </Card>
  );
};

export default JdLog;
