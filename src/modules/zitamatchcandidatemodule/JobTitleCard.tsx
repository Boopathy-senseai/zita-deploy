import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import styles from './jobtitlecard.module.css';
import { JobDetails } from './zitaMatchCandidateTypes';

type TitleProps = {
  title: string;
  value: string;
};

const TitleLabel = ({ title, value }: TitleProps) => {
  return (
    <Flex row center className={styles.labelContainer}>
      <Text color="theme">{title}</Text>
      <Text title={value} textStyle="ellipsis" className={styles.valueText}>
        {value}
      </Text>
    </Flex>
  );
};
type Props = {
  job_details: JobDetails;
};
const JobTitleCard = ({ job_details }: Props) => {
  return (
    <Card className={styles.cardStyle}>
      <Flex row center className={styles.overAll}>
        <TitleLabel
          title="Job Title:"
          value={`${job_details.job_title} - ${job_details.job_id}`}
        />
        {!isEmpty(job_details.profile) && (
          <TitleLabel title="Job Role:" value={job_details.profile} />
        )}
        <TitleLabel
          title="Location:"
          value={`${job_details.country}, ${job_details.state}, ${job_details.city}`}
        />
      </Flex>
    </Card>
  );
};

export default JobTitleCard;
