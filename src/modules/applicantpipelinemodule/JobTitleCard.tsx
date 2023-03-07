import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { JobDetailsEntity } from './applicantPipeLineTypes';
import styles from './jobtitlecard.module.css';

type TitleProps = {
  title: string;
  value: string;
};

const TitleLabel = ({ title, value }: TitleProps) => {
  return (
    <Flex row center className={styles.labelContainer}>
      <Text color="theme">{title}</Text>
      <Text className={styles.valueText}>{value}</Text>
    </Flex>
  );
};
type Props = {
  job_details: JobDetailsEntity;
};
const JobTitleCard = ({ job_details }: Props) => {
  return (
    <Card className={styles.cardStyle}>
      <Flex row center className={styles.overAll}>
        <TitleLabel
          title="Job Title:"
          value={`${job_details.job_title} - ${job_details.job_id}`}
        />
        {job_details.job_role__label_name !== 'Others' && (
          <TitleLabel
            title="Job Role:"
            value={job_details.job_role__label_name}
          />
        )}

        <TitleLabel
          title="Location:"
          value={`${job_details.city}, ${job_details.state}, ${job_details.country} `}
        />
      </Flex>
    </Card>
  );
};

export default JobTitleCard;
