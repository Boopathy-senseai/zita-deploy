import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import SvgLocation from '../../icons/SvgLocation';
import Text from '../../uikit/Text/Text';
import SvgJobTitles from '../../icons/SvgJobTitles';
import styles from './jobtitlecard.module.css';
import { JobDetails } from './zitaMatchCandidateTypes';

type TitleProps = {
  title: string;
  value: string;
  
};

const TitleLabel = ({ title, value }: TitleProps) => {
  return (
    <Flex row center className={styles.labelContainer}>
    {/* <Text color="theme">{title}</Text> */}
    <Text className={styles.valueText}>{value}</Text>
  </Flex>
  );
};
type Props = {
  job_details: JobDetails;
};
const JobTitleCard = ({ job_details }: Props) => {
  return (
      <Flex row center >
      <div style={{ marginBottom: '6px', display:"flex" }}>
        <SvgJobTitles />
      {/* </div> */}
      <TitleLabel
        title="Job Title:"
        value={`${job_details.job_title} - ${job_details.job_id}`}
      /></div>
      <div style={{display:"flex" }}>
        <SvgLocation width={16} height={16} fill="#581845" />
      
      <TitleLabel
        title="Location:"
        value={`${job_details.city}, ${job_details.state}, ${job_details.country} `}
      />
      </div>
    </Flex>
    
  );
};

export default JobTitleCard;
