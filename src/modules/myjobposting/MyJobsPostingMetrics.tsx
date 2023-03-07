import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import SvgMetrics from '../../icons/SvgMetrics';
import SvgActive from '../../icons/SvgActive';
import SvgDraft from '../../icons/SvgDraft';
import SvgInactive from '../../icons/SvgInactive';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import { FinalListEntity } from './myJobPostingTypes';
import styles from './myjobpostingscreen.module.css';

type Props = {
  list: FinalListEntity;
};

const MyJobsPostingMetrics = ({ list }: Props) => {
  return (
    <Flex row center middle className={styles.justify}>
      {list.jd_status__label_name === 'Active' && (
        <Flex columnFlex center className={styles.padding10}>
         <LinkWrapper to={`/job_view/${list.id}`}>
           <SvgMetrics width={21} height={21} />
        </LinkWrapper>
          <Text className={styles.font} bold>Metrics</Text>
        </Flex>
      )}
      {list.jd_status__label_name === 'Draft' && (
        <Flex columnFlex center className={styles.padding10}>
          <SvgMetrics width={21} height={21} fill={'#666'} />
          <Text className={styles.font} bold>Metrics</Text>
        </Flex>
      )}

      {list.jd_status__label_name === 'Inactive' && (
        <Flex columnFlex center className={styles.padding10}>
         <LinkWrapper to={`/job_view/${list.id}`}>
           <SvgMetrics width={21} height={21} />
        </LinkWrapper>
          <Text className={styles.font} bold>Metrics</Text>
        </Flex>
      )}
      {list.jd_status__label_name === 'Questionnaire' && (
        <Flex center  columnFlex className={styles.padding10}>
          <SvgMetrics width={21} height={21} fill={'#666'} />
          <Text className={styles.font}bold>Metrics</Text>
        </Flex>
      )}
      {list.jd_status__label_name === 'Preview' && (
        <Flex center  columnFlex className={styles.padding10}>
          <SvgMetrics width={21} height={21} fill={'#666'} />
          <Text className={styles.font}bold>Metrics</Text>
        </Flex>
      )}

      {list.jd_status__label_name === 'Active' && (
        <Flex center  columnFlex className={styles.padding10}>
          <SvgActive width={21} height={21} />
          <Text className={styles.font}bold>Active</Text>
        </Flex>
      )}
      {list.jd_status__label_name === 'Draft' && (
        <Flex center  columnFlex className={styles.padding10}>
          <SvgDraft width={21} height={21} />
          <Text className={styles.font}bold>Draft</Text>
        </Flex>
      )}

      {list.jd_status__label_name === 'Inactive' && (
        <Flex center  columnFlex className={styles.padding10}>
          <SvgInactive width={21} height={21} />
          <Text className={styles.font}bold>Inactive</Text>
        </Flex>
      )}
      {list.jd_status__label_name === 'Questionnaire' && (
        <Flex center  columnFlex className={styles.padding10}>
          <SvgDraft width={21} height={21} />
          <Text className={styles.font}bold>Draft</Text>
        </Flex>
      )}
      {list.jd_status__label_name === 'Preview' && (
        <Flex center  columnFlex className={styles.padding10}>
          <SvgDraft width={21} height={21} />
          <Text className={styles.font}bold>Draft</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default MyJobsPostingMetrics;
