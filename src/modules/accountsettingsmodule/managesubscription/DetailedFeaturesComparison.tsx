import SvgRoundClose from '../../../icons/SvgRoundClose';
import SvgTick from '../../../icons/SvgTick';
import { ERROR, SUCCESS } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import styles from './detailedfeaturescomparison.module.css';

const DetailedFeaturesComparison = () => {
  return (
    <Flex columnFlex width={770} marginBottom={20}>
      <Flex row center className={styles.titleFlex}>
        <Flex flex={6}>
          <div />
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>FREE TRIAL</Text>
          <Text>(14 Days)</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>BASIC</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>PRO</Text>
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>No. of Users</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>1</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>1</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>1</Text>
        </Flex>
      </Flex>
      <Flex row center className={styles.borderNone}>
        <Flex flex={6}>
          <Text>Branded Careers Page</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex center className={styles.singleTile}>
        <Text style={{ marginLeft: 8 }}>
          JOB CREATION & POSTING
        </Text>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>JD Parser</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>JD Templates Library</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Custom Screening Questions</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>No. of Active Jobs</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>1</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>3</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>Unlimited</Text>
        </Flex>
      </Flex>
      <Flex row center className={styles.borderNone}>
        <Flex flex={6}>
          <Text>External Posting</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgRoundClose fill={ERROR} height={22} width={22} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex center className={styles.singleTile}>
        <Text style={{ marginLeft: 8 }}>
          CANDIDATE SOURCING
        </Text>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Candidate Storage</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>100</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>15,000</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>Unlimited</Text>
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>World Class CV Parser</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>7 M + Resume Access(US & Canada Only)</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Drag & Drop Resumes</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderNone}>
        <Flex flex={6}>
          <Text>Import Your Own Database</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex center className={styles.singleTile}>
        <Text style={{ marginLeft: 8 }}>
          HUMAN-LIKE AI MATCHING
        </Text>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>AI Candidate Matching</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Smart Filters</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Zita Profile View</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderNone}>
        <Flex flex={6}>
          <Text>Candidate Feedback Notes</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>

      <Flex center className={styles.singleTile}>
        <Text style={{ marginLeft: 8 }}>
          CANDIDATE COMMUNICATION
        </Text>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Invite to Apply</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>In-Built Platform Messaging</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderNone}>
        <Flex flex={6}>
          <Text>Email Notification</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex center className={styles.singleTile}>
        <Text style={{ marginLeft: 8 }}>
          REPORTS
        </Text>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Dashboard</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>Basic</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>Advanced</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <Text>Advanced</Text>
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Sourcing Report</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgRoundClose fill={ERROR} height={22} width={22} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Sourcing Performance Report</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgRoundClose fill={ERROR} height={22} width={22} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Passive Candidate Sourcing Report</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgRoundClose fill={ERROR} height={22} width={22} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderNone}>
        <Flex flex={6}>
          <Text>Job Metrics Report</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgRoundClose fill={ERROR} height={22} width={22} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>

      <Flex center className={styles.singleTile}>
        <Text style={{ marginLeft: 8 }}>
          SUPPORT
        </Text>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Online Resources</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderBottom}>
        <Flex flex={6}>
          <Text>Email Support</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
      <Flex row center className={styles.borderNone}>
        <Flex flex={6}>
          <Text>Online Support</Text>
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
        <Flex columnFlex center flex={2}>
          <SvgTick fill={SUCCESS} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DetailedFeaturesComparison;
