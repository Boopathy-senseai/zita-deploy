import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import styles from './overalljobactivities.module.css';

const OverallJobActivities = () => {
  const {
    rejected,
    selected,
    shortlisted,
    invite_to_apply,
    total_jobs,
    applicants,
    viewed,
  } = useSelector(({ dashboardEmpReducers }: RootState) => {
    return {
      rejected: dashboardEmpReducers.rejected,
      selected: dashboardEmpReducers.selected,
      shortlisted: dashboardEmpReducers.shortlisted,
      invite_to_apply: dashboardEmpReducers.invite_to_apply,
      applicants: dashboardEmpReducers.applicants,
      total_jobs: dashboardEmpReducers.total_jobs,
      viewed: dashboardEmpReducers.viewed,
    };
  });

  const data = [
    { title: 'Jobs Posted', vallue: total_jobs },
    { title: 'Unlocked', vallue: viewed },
    { title: 'Invited to Apply', vallue: invite_to_apply },
    { title: 'New Applicants', vallue: applicants },
    { title: 'Shortlisted', vallue: shortlisted },
    { title: 'Offered', vallue: selected },
    { title: 'Rejected', vallue: rejected },
  ];
  return (
    <Flex className={styles.overAll}>
      <Text bold size={16} style={{ marginBottom: 16 }}>
        Overall Job Activities
      </Text>
      <Flex row>
        {data.map((list, index) => {
          return (
            <Flex
              flex={1}
              key={list.title}
              marginRight={index + 1 === data.length ? 0 : 16}
            >
              <Card className={styles.cardStyle}>
                <Text align="center">{list.title}</Text>
                <Text
                  size={16}
                  style={{ marginTop: 16 }}
                  align="center"
                  color="theme"
                >
                  {list.vallue}
                </Text>
              </Card>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default OverallJobActivities;
