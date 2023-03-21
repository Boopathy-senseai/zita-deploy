import { useSelector } from 'react-redux';
import { jobSelect } from '../../../appRoutesPath';
import SvgCompany from '../../../icons/SvgCompany';
import SvgNewTab from '../../../icons/SvgNewTab';
import { RootState } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import { PRIMARY } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import { getDateString, isEmpty, unlimitedHelper } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Text from '../../../uikit/Text/Text';
import { mediaPath } from '../../constValue';
import styles from './profilecard.module.css';

const ProfileCard = () => {
  const {
    company_name,
    logo,
    user_info,
    plan,
    contact_count,
    job_count,
    candidate_count,
    career_page_url,
    permission,
  } = useSelector(({ dashboardEmpReducers, permissionReducers }: RootState) => {
    return {
      company_name: dashboardEmpReducers.company_name,
      logo: dashboardEmpReducers.logo,
      user_info: dashboardEmpReducers.user_info,
      plan: dashboardEmpReducers.plan,
      job_count: dashboardEmpReducers.job_count,
      candidate_count: dashboardEmpReducers.candidate_count,
      contact_count: dashboardEmpReducers.contact_count,
      career_page_url: dashboardEmpReducers.career_page_url,
      permission: permissionReducers.Permission,
      super_user: permissionReducers.super_user,
    };
  });

  const logoPath = isEmpty(logo) ? 'logo.png' : logo;

  return (
    <Flex flex={1} row className={styles.overAll}>
      <Flex flex={4}>
        <Card className={styles.profileCard}>
          <Flex row between marginLeft={16} marginRight={16}>
            <img
            // style={{objectFit: 'contain'}}
              alt="profile"
              src={mediaPath + logoPath}
              className={styles.profileImg}
            />
            <Flex marginTop={12}>
              <Flex end row center marginBottom={7}>
                <SvgCompany height={16} width={16} fill={PRIMARY} />
                <Text bold align="right" style={{ marginLeft: 8 }} size={16}>
                  {company_name}
                </Text>
              </Flex>

              <Text style={{ marginBottom: 7 }} align="right">
                {user_info.email}
              </Text>
              <Text align="right">
                Last Login on :{' '}
                {getDateString(user_info?.last_login, 'll hh:mm A')}
              </Text>
              <Text style={{ marginBottom: 7 }} align="right">
                Timezone: UTC
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
      <Flex columnFlex flex={2} marginLeft={16} marginRight={16}>
        <Card className={styles.profileCard}>
          <Text className={styles.borderBottom} bold color="theme">
            Subscription
          </Text>
          <Flex marginLeft={16} marginRight={16} marginTop={12}>
            {plan.plan_id_id === 1 ? (
              <Text style={{ marginBottom: 7 }}>Plan: Free Trial</Text>
            ) : (
              <Text style={{ marginBottom: 7 }}>
                Plan:{' '}
                {plan.plan_id_id === 2 || plan.plan_id_id === 3
                  ? 'Basic'
                  : 'Pro'}{' '}
                {plan.plan_id_id === 2 || plan.plan_id_id === 4
                  ? '(Monthly)'
                  : '(Annual)'}
              </Text>
            )}
            <Text>
              Renewal: {getDateString(plan.subscription_valid_till, 'll')}
            </Text>
          </Flex>
        </Card>
      </Flex>
      <Flex columnFlex flex={2} marginRight={16}>
        <Card className={styles.profileCard}>
          <Text className={styles.borderBottom} bold color="theme">
            Credits Availability
          </Text>
          <Flex marginLeft={16} marginRight={16} marginTop={8}>
            <Text style={{ marginBottom: 7 }}>
              Available Jobs Limit: {unlimitedHelper(job_count)}
            </Text>
            <Text style={{ marginBottom: 7 }}>
              Available Contact Credits: {contact_count}
            </Text>
            <Text>Candidates Limit: {unlimitedHelper(candidate_count)}</Text>
          </Flex>
        </Card>
      </Flex>
      <Flex columnFlex flex={2}>
        <Card className={styles.profileCard}>
          <Text className={styles.borderBottom} bold color="theme">
            Create Your Job
          </Text>
          <Flex
            center
            columnFlex
            marginLeft={16}
            marginRight={16}
            // marginTop={12}
            middle
            height={'100%'}
          >
            {permission.includes('create_post') && (
              <LinkWrapper to={jobSelect}>
                <Button style={{ marginBottom: 8 }}>Post Job</Button>
              </LinkWrapper>
            )}

            <LinkWrapper
              target={isEmpty(career_page_url) ? '_parent' : '_blank'}
              to={
                isEmpty(career_page_url)
                  ? `/account_setting/settings?tab=1`
                  : `/${career_page_url}/careers`
              }
            >
              <Button types="secondary">
                <Flex row center className={styles.pointer}>
                  <Text color="theme" bold style={{ marginRight: 8 }}>
                    Careers Page
                  </Text>
                  <SvgNewTab height={14} width={16} />
                </Flex>
              </Button>
            </LinkWrapper>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default ProfileCard;
