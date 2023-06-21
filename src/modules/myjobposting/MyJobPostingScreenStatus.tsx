// import { Table } from 'react-bootstrap';

import Text from '../../uikit/Text/Text';

import Flex from '../../uikit/Flex/Flex';
// import Card from '../../uikit/Card/Card';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import { isEmpty } from '../../uikit/helper';
import styles from './myjobpostingscreen.module.css';
import { FinalListEntity } from './myJobPostingTypes';

type Props = {
  list: FinalListEntity;
};

const MyJobPostingScreenStatus = ({ list }: Props) => {
  const shortlisted = isEmpty(list.shortlisted) ? '0' : list.shortlisted;
  const selected = isEmpty(list.selected) ? '0' : list.selected;
  const rejected = isEmpty(list.rejected) ? '0' : list.rejected;

  return (
    <Flex className={styles.screenstatu}>
      {/* <Text className={styles.screenStatus}>Screening Status</Text> */}

     
       
        <ul className={styles.ulstyle1}>  
        {isEmpty(list.shortlisted) ? 

         <li style={{color:"#FCC203",fontSize:20}} className={styles.shortlist}>
           {/* <LinkWrapper
              target={'_parent'}
              to={`/applicant_pipe_line/${list.id}`}
            > */}
              <Text className={styles.styletexts} >
                {shortlisted}
              </Text> 
            <Text className={styles.fontScreen}>Shortlisted</Text>
            {/* </LinkWrapper> */}
          </li> 

          :

           <li style={{color:"#FCC203",fontSize:20}} className={styles.shortlist} >
            <LinkWrapper
              target={'_parent'}
              to={`/applicant_pipe_line/${list.id}`}
            >
              <Text className={styles.styletext} >
                {shortlisted}
              </Text>
            <Text className={styles.fontScreens}bold>Shortlisted</Text>

            </LinkWrapper>

          </li>

        }
        </ul>

       <ul className={styles.ulstyle2}>
           {isEmpty(list.selected) ? 

         <li style={{color:"#00BE4B",fontSize:20}}>
           {/* <LinkWrapper
              target={'_parent'}
              to={`/applicant_pipe_line/${list.id}`}
            > */}
              <Text className={styles.styletexts}>
                {selected}
              </Text>
              
        
            <Text className={styles.fontScreen} style={{color:"#581845",width:8,height:8}}>Offered</Text>
            {/* </LinkWrapper> */}

          </li> 

          : 

           <li style={{color:"#00BE4B",fontSize:20}}   >
            <LinkWrapper
              target={'_parent'}
              to={`/applicant_pipe_line/${list.id}`}
            >
              <Text className={styles.styletext}>
                {selected}
              </Text>
              <Text className={styles.fontScreens} style={{color:"#581845",width:8,height:8}}
            >Offered</Text>
            </LinkWrapper>
           
          </li>

        }
        </ul>

<ul className={styles.ulstyle3}>
           {isEmpty(list.rejected) ? 

         <li style={{color:"#FF0000",fontSize:20}}>
           {/* <LinkWrapper
              target={'_parent'}
              to={`/applicant_pipe_line/${list.id}`}
            > */}
              {/* <Text className={styles.styletext}>
                {rejected}
              </Text> */}
              <Text className={styles.styletexts}>
                {rejected}
              </Text>
        
            <Text className={styles.fontScreen}bold>Rejected</Text>
            {/* </LinkWrapper> */}

          </li> 

          : 

           <li  style={{color:"#FF0000",fontSize:20}}>
            <LinkWrapper
              target={'_parent'}
              to={`/applicant_pipe_line/${list.id}`}
            >
              <Text className={styles.styletext}>
                {rejected}
              </Text>
            <Text className={styles.fontScreens}bold>Rejected</Text>

            </LinkWrapper>
          </li>

        }
</ul>
        </Flex>
        
        
    
  );
};

export default MyJobPostingScreenStatus;
