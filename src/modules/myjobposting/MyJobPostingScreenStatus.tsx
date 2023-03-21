import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import Card from '../../uikit/Card/Card';
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
    <Flex>
      <Text className={styles.screenStatus}>Screening Status</Text>

      <Card className={styles.screen}>
        <Flex row className={styles.justify}>
        {isEmpty(list.shortlisted) ? 

         <Flex center flex={4}className={styles.padding5}>
           
              <Text color={'gray'} bold>
                {shortlisted}
              </Text>
        
            <Text className={styles.fontScreen}bold>Shortlisted</Text>
          </Flex> 

          : 

           <Flex center flex={4}className={styles.padding5}>
            <LinkWrapper
              target={'_parent'}
              to={`/applicant_pipe_line/${list.id}`}
            >
              <Text color={'link' } bold>
                {shortlisted}
              </Text>
            </LinkWrapper>
            <Text className={styles.fontScreen}bold>Shortlisted</Text>
          </Flex>

        }
         

           {isEmpty(list.selected) ? 

         <Flex center flex={4}className={styles.padding5}>
           
              <Text color={'gray'} bold>
                {selected}
              </Text>
        
            <Text className={styles.fontScreen}bold>Offered</Text>
          </Flex> 

          : 

           <Flex center flex={4}className={styles.padding5}>
            <LinkWrapper
              target={'_parent'}
              to={`/applicant_pipe_line/${list.id}`}
            >
              <Text color={'link' } bold>
                {selected}
              </Text>
            </LinkWrapper>
            <Text className={styles.fontScreen}bold
            >Offered</Text>
          </Flex>

        }


           {isEmpty(list.rejected) ? 

         <Flex center flex={4}className={styles.padding5}>
           
              <Text color={'gray'} bold>
                {rejected}
              </Text>
        
            <Text className={styles.fontScreen}bold>Rejected</Text>
          </Flex> 

          : 

           <Flex center flex={4}className={styles.padding5}>
            <LinkWrapper
              target={'_parent'}
              to={`/applicant_pipe_line/${list.id}`}
            >
              <Text color={'link' } bold>
                {rejected}
              </Text>
            </LinkWrapper>
            <Text className={styles.fontScreen}bold>Rejected</Text>
          </Flex>

        }
        </Flex>
      </Card>
    </Flex>
  );
};

export default MyJobPostingScreenStatus;
