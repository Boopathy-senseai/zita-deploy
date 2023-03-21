import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { RootState } from '../../store';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import Card from '../../uikit/Card/Card';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import report1 from '../../assets/images/report1.png';
import report2 from '../../assets/images/report2.png';
import styles from './reports.module.css';

const height = window.innerHeight - 70;
const Reports = () => {
  const history = useHistory();
  const { is_plan } = useSelector(({ permissionReducers }: RootState) => {
    return {
      is_plan: permissionReducers.is_plan,
    };
  });
  useEffect(() => {
    localStorage.setItem('freeCheck','true');
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });
  return (
    <div
      style={{
        height,
        overflowY: 'scroll',
      }}
    >
      <Flex className={styles.overAll} >
        <Text size={20} bold className={styles.pageTitle}>
          Reports
        </Text>

        <Flex className={styles.marginTop}>
          <Text size={18} bold>
            Candidates
          </Text>
          <Text>View all candidate-related reports here</Text>
        </Flex>
        <Flex row>
          <Flex flex={4}>
            <LinkWrapper  to={`reports/applicant-source`}>
                       <Card className={styles.cardOverAllReport}>
              <img src={report2} alt="Logo" className={styles.img} />
              <Text size={18} bold >
                Applicants Sourcing Report{' '}
              </Text>
              <Text className={styles.textStyle}>
                Get insights about the applicants sourced channels/job boards
                for the jobs
              </Text>
            </Card>
            </LinkWrapper>
          </Flex>
          <Flex flex={4}>
            <LinkWrapper  to={`reports/passive-candidate`}>
            <Card className={styles.cardOverAllReport}>
              <img src={report1} alt="Logo" className={styles.img} />
              <Text size={18} bold >
                Passive Candidate Sourcing Report
              </Text>
              <Text className={styles.textStyle}>
                Get insights about the candidates unlocked via Talent Sourcing
                and converted as applicants for jobs
              </Text>
            </Card>
              </LinkWrapper>
          </Flex>
          <Flex flex={4}> </Flex>
        </Flex>
        <Flex className={styles.marginTop}>
          <Text size={18} bold>
            Jobs
          </Text>
          <Text>View all job-related reports here</Text>
        </Flex>
        <Flex row>
          <Flex flex={4}>
            <LinkWrapper  to={`reports/job-metrics`}>
            <Card className={styles.cardOverAllReport}>
              <img src={report1} alt="Logo" className={styles.img} />
              <Text size={18} bold >
                Job Metrics{' '}
              </Text>
              <Text className={styles.textStyle}>
                Get entire insights about the job metrics like no. of views,
                applicants etc.
              </Text>
            </Card>
              </LinkWrapper>
          </Flex>
          <Flex flex={4}> </Flex>
          <Flex flex={4}> </Flex>
        </Flex>
        <Flex className={styles.marginTop}>
          <Text size={18} bold>
            Performance Report
          </Text>
          <Text>View all performance-related reports here</Text>
        </Flex>
        <Flex row>
          <Flex flex={4}>
            <LinkWrapper  to={`reports/sourcing-performance`}>
            <Card className={styles.cardOverAllReport}>
              <img src={report1} alt="Logo"  />
              <Text size={18} bold>
                Sourcing Performance Report{' '}
              </Text>
              <Text className={styles.textStyle}>
                Get insights about the JD Traffics and applicants conversion
                rate for the job
              </Text>
            </Card>
              </LinkWrapper  >
          </Flex>
          <Flex flex={4}> </Flex>
          <Flex flex={4}> </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Reports;
