import classNames from 'classnames/bind';
import SvgInterestedOne from '../../../icons/SvgInterestedOne';
import SvgMessage from '../../../icons/SvgMessage';
import SvgNotInterested from '../../../icons/SvgNotInterested';
import { GARY_4, LINK, PRIMARY } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import SvgAppliedIcon from '../../../icons/SvgAppliedIcon';
import { getDateString, isEmpty } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Text from '../../../uikit/Text/Text';
import {
  AppliedJobEntity,
  InvitesEntity,
  Setting,
} from './candidateDashBoardTypes';
import styles from './appliedjobstable.module.css';

const cx = classNames.bind(styles);

type ActionProps = {
  value: InvitesEntity;
  setting?: Setting;
};

const Actions = ({ value, setting }: ActionProps) => {
  return isEmpty(value.applied) ? (
    <>
      {value.job_status !== 'Inactive' ? (
        <Flex row center className={styles.actionsStyle}>
          <LinkWrapper
            onClick={() =>
              localStorage.setItem('careerJobTitle', value.job_title)
            }
            to={`/${setting?.career_page_url}/career_job_view/${value.jd_id_id}/${value.job_title}?applicationFocus=focus`}
          >
            <div title="Apply" style={{ padding: 4,position:'relative',top:-2 }}>
              <SvgAppliedIcon fill={PRIMARY} height={25} width={24} />
            </div>
          </LinkWrapper>
          <LinkWrapper
            onClick={() =>
              localStorage.setItem('careerJobTitle', value.job_title)
            }
            to={`/${setting?.career_page_url}/career_job_view/${value.jd_id_id}/${value.job_title}?interested=true&can_id=${value.candidate_id_id}`}
          >
            <div
              title="Interested"
              style={{ margin: '0 16px', padding: 4 ,position:'relative',top:-6}}
              className={cx({ svgSelectStyle: value.is_interested === true })}
            >
              <SvgInterestedOne fill={PRIMARY} />
            </div>
          </LinkWrapper>
          <LinkWrapper
            onClick={() =>
              localStorage.setItem('careerJobTitle', value.job_title)
            }
            to={`/${setting?.career_page_url}/career_job_view/${value.jd_id_id}/${value.job_title}?interested=false&can_id=${value.candidate_id_id}`}
          >
            <div
              title="Not Interested"
              style={{ padding: 4 }}
              className={cx({ svgSelectStyle: value.is_interested === false })}
            >
              <SvgNotInterested fill={PRIMARY} />
            </div>
          </LinkWrapper>
        </Flex>
      ) : (
        <Flex row center className={styles.actionsStyle}>
          <div title="Apply" style={{ padding: 4 ,position:'relative',top:-2}}>
            <SvgAppliedIcon fill={GARY_4} height={25} width={24} />
          </div>
          <div title="Interested" style={{ margin: '0 16px', padding: 4 ,position:'relative',top:-6}}>
            <SvgInterestedOne fill={GARY_4} />
          </div>

          <div style={{ padding: 4 }} title="Not Interested">
            <SvgNotInterested fill={GARY_4} />
          </div>
        </Flex>
      )}
    </>
  ) : (
    <Flex row center className={styles.actionsStyle}>
      <div
        title="Apply"
        className={cx({ svgSelectStyle: value.applied !== null })}
        style={{ padding: 4,position:'relative',top:-2 }}
      >
        <SvgAppliedIcon fill={GARY_4} height={25} width={24} />
      </div>
      <div title="Interested" style={{ margin: '0 16px', padding: 4,position:'relative',top:-6 }}>
        <SvgInterestedOne fill={GARY_4} />
      </div>
      <div title="Not Interested" style={{ padding: 4 }}>
        <SvgNotInterested fill={GARY_4} />
      </div>
    </Flex>
  );
};

const MessageAction = (
  jd_id_id: string,
  value: AppliedJobEntity | InvitesEntity,
  hanldeOpenChat: (b: string) => void,
  setRowIndex: (arg: number) => void,
  index: number,
  setJobTitle: (b: string) => void,
  isInvite?: boolean,
) => {
  return isInvite ? (
    <Flex middle center>
      <div style={{ position: 'relative' }}>
        {!isEmpty(value.count) && (
          <div className={styles.countStyle}>
            <Text color="white" style={{ fontSize: 8 }}>
              {value.count}
            </Text>
          </div>
        )}
        <SvgMessage fill={GARY_4} />
      </div>
    </Flex>
  ) : (
    <Flex
      middle
      center
      onClick={() => {
        hanldeOpenChat(jd_id_id);
        setRowIndex(index);
        setJobTitle(value.job_title);
      }}
    >
      <div className={styles.messgaeSvgConatiner}>
        {!isEmpty(value.count) && (
          <div className={styles.countStyle}>
            <Text color="white" style={{ fontSize: 8 }}>
              {value.count}
            </Text>
          </div>
        )}
        <SvgMessage fill={LINK} />
      </div>
    </Flex>
  );
};

export const statusHelper = (value: string,invited:AppliedJobEntity) => {
  switch (value.toLocaleLowerCase()) {
    case 'applicant':
      return !isEmpty(invited.invited) ? 'Invited and Applied':'Applied';
    case 'rejected':
      return 'No longer considered';
    case 'offered':
      return 'Offered';
    // case 'interviewed':
    //   return 'Interviewed';
    default:
      return 'Under Review';
  }
};

export const inviteTitle = (
  setting: Setting | undefined,
  hanldeOpenChat: (b: string) => void,
  setRowIndex: (arg: number) => void,
  setJobTitle: (b: string) => void,
) => [
  {
    title: 'Job Title',
    dataIndex: 'job_title',
    key: 'job_title',
    render: (title: string, value: InvitesEntity) => {
      return value.job_status !== 'Inactive' ? (
        <LinkWrapper
          onClick={() =>
            localStorage.setItem('careerJobTitle', value.job_title)
          }
          to={`/${setting?.career_page_url}/career_job_view/${value.jd_id_id}/${value.job_title}`}
        >
          <Text bold size={12} color="link">
            {title}
          </Text>
        </LinkWrapper>
      ) : (
        <Text
          bold
          size={12}
          color="gray"
          title="This job is no longer available to view."
        >
          {title}
        </Text>
      );
    },
    flex: 3,
  },
  {
    title: 'Location',
    dataIndex: 'city',
    key: 'city',
    render: (_a: string, value: InvitesEntity) => {
      return value.job_status !== 'Inactive' ? (
        <Text size={12}>
          {value.city}, {value.state}, {value.country}
        </Text>
      ) : (
        <Text size={12} title="This job is no longer available to view.">
          {value.city}, {value.state}, {value.country}
        </Text>
      );
    },
    flex: 3,
  },
  {
    title: 'Invited On',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (date: string, value: InvitesEntity) => {
      return value.job_status !== 'Inactive' ? (
        <Text size={12}>{getDateString(date, 'll')}</Text>
      ) : (
        <Text size={12} title="This job is no longer available to view.">
          {getDateString(date, 'll')}
        </Text>
      );
    },
    flex: 2,
  },
  {
    title: 'Messages',
    dataIndex: 'jd_id_id',
    key: 'jd_id_id',
    render: (jd_id_id: string, value: InvitesEntity, index: number) => {
      return MessageAction(
        jd_id_id,
        value,
        hanldeOpenChat,
        setRowIndex,
        index,
        setJobTitle,
        value.job_status === 'Inactive',
      );
    },
    align: 'center',
    flex: 1.5,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (_a: string, value: InvitesEntity) => {
      return <Actions value={value} setting={setting} />;
    },
    flex: 3,
    align: 'center',
  },
];

export const appliedTitle = (
  setting: Setting | undefined,
  hanldeOpenChat: (b: string) => void,
  setRowIndex: (arg: number) => void,
  setJobTitle: (arg: string) => void,
) => [
  {
    title: 'Job Title',
    dataIndex: 'job_title',
    key: 'job_title',
    render: (title: string, value: AppliedJobEntity) => {
      return value.job_status !== 'Inactive' ? (
        <LinkWrapper
          onClick={() =>
            localStorage.setItem('careerJobTitle', value.job_title)
          }
          to={`/${setting?.career_page_url}/career_job_view/${value.jd_id_id}/${value.job_title}`}
        >
          <Text bold size={12} color="link">
            {title}
          </Text>
        </LinkWrapper>
      ) : (
        <Text
          title="This job is no longer available to view."
          bold
          size={12}
          color="gray"
        >
          {title}
        </Text>
      );
    },
    flex: 3,
  },
  {
    title: 'Location',
    dataIndex: 'city',
    key: 'city',
    render: (_a: string, value: AppliedJobEntity) => {
      return (
        <Text size={12}>
          {value.city}, {value.state}, {value.country}
        </Text>
      );
    },
    flex: 3,
  },
  {
    title: 'Applied On',
    dataIndex: 'created_on',
    key: 'created_on',
    render: (date: string) => {
      return <Text size={12}>{getDateString(date, 'll')}</Text>;
    },
    flex: 2,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string,value:AppliedJobEntity) => {
      return <Text size={12}>{statusHelper(status,value)}</Text>;
    },
    flex: 2,
  },
  {
    title: 'Messages',
    dataIndex: 'jd_id_id',
    key: 'jd_id_id',
    render: (jd_id_id: string, value: AppliedJobEntity, index: number) => {
      return MessageAction(
        jd_id_id,
        value,
        hanldeOpenChat,
        setRowIndex,
        index,
        setJobTitle,
      );
    },
    align: 'center',
    flex: 2,
  },
];
