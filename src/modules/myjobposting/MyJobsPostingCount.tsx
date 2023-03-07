import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import { FinalListEntity } from './myJobPostingTypes';
import styles from './myjobpostingscreen.module.css';

type Props = {
  list: FinalListEntity;
};

const MyJobsPostingCount = ({ list }: Props) => {
  const zita_match = isEmpty(list.zita_match) ? '0' : list.zita_match;
  const invite_to_apply = isEmpty(list.invite_to_apply)
    ? '0'
    : list.invite_to_apply;
  const applicant = isEmpty(list.applicant) ? '0' : list.applicant;




  return (
    <Flex row center className={styles.justify}>

      {isEmpty(list.zita_match) ?  

        <Flex center column className={styles.margin}>
     
          <Text color={'gray'} bold>
            {zita_match}
          </Text>
      
        <Text className={styles.font} bold>Zita Match</Text>
      </Flex> 

      : 

       <Flex center column className={styles.margin}>
      {list.jd_status__label_name === 'Inactive' ? 
        <>
      
          <Text color={'gray'} bold >
            {zita_match}
          </Text>
      

        <Text className={styles.font}bold> Zita Match</Text>
      </>
      :

      <>
        <LinkWrapper target={'_parent'} to={`/zita_match_candidate/${list.id}`}>
          <Text color={'link'} bold>
            {zita_match}
          </Text>
        </LinkWrapper>
        <Text className={styles.font}bold>Zita Match</Text>
      </>
        }



      </Flex>}


   {isEmpty(list.invite_to_apply) ?  

      <Flex center column className={styles.margin}>
          <Text color={isEmpty(list.invite_to_apply) ? 'gray' : 'link'} bold>
            {invite_to_apply}
          </Text>
        <Text className={styles.font} bold> Invited to Apply</Text>
      </Flex>
     : 

  <Flex center column className={styles.margin}>
  {list.jd_status__label_name === 'Inactive' ? 
    <>
      
          <Text color={'gray'} bold>
            {invite_to_apply}
          </Text>

        <Text className={styles.font}bold> Invited to Apply</Text>
      </>
      :

      <Flex center column className={styles.margin}>
        <LinkWrapper target={'_parent'} to={`/zita_match_candidate/${list.id}`}>
          <Text color={'link'} bold>
            {invite_to_apply}
          </Text>
        </LinkWrapper>
        <Text className={styles.font} bold>Invited to Apply</Text>
      </Flex>
        }

      </Flex>
      }

 {isEmpty(list.applicant) ?  
      <Flex center column className={styles.margin}>
       
          <Text color={isEmpty(list.applicant) ? 'gray' : 'link'} bold>
            {applicant}
          </Text>
  
        <Text className={styles.font} bold>Applicants</Text>
      </Flex>
      
 : 

  <Flex center column className={styles.margin}>
        <LinkWrapper target={'_parent'} to={`/applicant_pipe_line/${list.id}`}>
          <Text color={isEmpty(list.applicant) ? 'gray' : 'link'} bold>
            {applicant}
          </Text>
        </LinkWrapper>
        <Text className={styles.font}bold>Applicants</Text>
      </Flex>

    }

    </Flex>
  );
};

export default MyJobsPostingCount;
