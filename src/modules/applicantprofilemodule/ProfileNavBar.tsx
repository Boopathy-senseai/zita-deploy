import classNames from 'classnames/bind';
import { saveAs } from 'file-saver';
import { ReactNode } from 'react';
import SvgDownload from '../../icons/SvgDownload';
import SvgInvite from '../../icons/SvgInvite';
import SvgLocation from '../../icons/SvgLocation';
import SvgMail from '../../icons/SvgMail';
import SvgPhone from '../../icons/SvgPhone';
import SvgTopic from '../../icons/SvgTopic';
import { SECONDARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, notSpecified } from '../../uikit/helper';
import ProgressBar from '../../uikit/ProgressBar/ProgressBar';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import { CandidateDetailsEntity, JdEntity } from './applicantProfileTypes';
import styles from './profilenavbar.module.css';

const cx = classNames.bind(styles);

type FontLableProps = {
  icon: ReactNode;
  label: string | number | null | undefined;
  className?: string;
  bold?: boolean;
  title?: string;
};

const FontLable = ({ icon, label, className, bold, title }: FontLableProps) => {
  return (
    <Flex row center className={className} title={title}>
      {icon}
      <Text color="white" bold={bold} className={styles.useNameStyle}>
        {label}
      </Text>
    </Flex>
  );
};

const defaultProps = {
  inviteIconNone: false,
};
type Props = {
  nonMatch?: boolean;
  candiList: CandidateDetailsEntity;
  jdDetails: JdEntity;
  profile_match: number;
  isInvite?: boolean;
  inviteCall?: () => void;
  isResume?: boolean;
  withOutJD: boolean;
  source?: string;
  isProfileName?: boolean;
  inviteIconDisable?: boolean;
  inviteIconNone?: boolean;
} & typeof defaultProps;

const ProfileNavBar = ({
  nonMatch,
  candiList,
  jdDetails,
  profile_match,
  isInvite,
  inviteCall,
  isResume,
  withOutJD,
  source,
  isProfileName,
  inviteIconDisable,
  inviteIconNone,
}: Props) => {
  const handleDownload = () => {
    if (candiList.file) {
      saveAs(
        `${process.env.REACT_APP_HOME_URL}media/${candiList.file}`,
        `${candiList.file.replace('unlock/', 'candidate_profile_')}`,
      );
      Toast('Resume downloaded successfully', 'LONG', 'success');
    }
  };
  return (
    <Flex className={styles.overAll}>
      {isProfileName ? (
        <div className={styles.profile}>
          {isEmpty(candiList.last_name) ? (
            <Text size={50} bold color="white" transform="uppercase">
              {candiList.first_name.charAt(0)}
            </Text>
          ) : (
            <Text size={50} bold color="white" transform="uppercase">
              {candiList.first_name.charAt(0)}
              {candiList.last_name.charAt(0)}
            </Text>
          )}
        </div>
      ) : (
        <img
          alt="Profile"
          className={styles.imageStyle}
          src={`${process.env.REACT_APP_HOME_URL}media/${candiList.image}`}
        />
      )}

      <Flex flex={1} row between>
        <div className={styles.flexNameConatiner}>
          <Flex row center className={styles.marginBottom}>
            <Text bold color="white" size={16}>
              {candiList.first_name} {candiList.last_name}
            </Text>
            <div className={styles.svgDownloadStyle}>
              <div
                tabIndex={-1}
                role={'button'}
                onKeyPress={() => {}}
                title="Download Resume"
                onClick={handleDownload}
              >
                <SvgDownload fill={SECONDARY} width={19} height={19} />
              </div>
            </div>
            {isInvite && (
              <div
                title="Invite to Apply"
                onClick={inviteCall}
                tabIndex={-1}
                role={'button'}
                onKeyPress={() => {}}
                className={cx('inviteStyle', {
                  inviteIconClassName: inviteIconDisable,
                  inviteIconNone,
                })}
              >
                <SvgInvite color="yellow" />
              </div>
            )}
          </Flex>
          <Flex>
            <Flex row className={styles.marginStyleFlex}>
              <FontLable
                icon={<SvgLocation height={16} width={16} />}
                title={candiList.location}
                label={
                  !isResume
                    ? notSpecified(candiList.location)
                    : candiList.location && candiList.location.length > 14
                    ? `${notSpecified(candiList.location.slice(0, 14))} ...`
                    : notSpecified(candiList.location)
                }
                className={styles.fontLabelStyle}
                bold
              />
              {isResume && (
                <FontLable
                  icon={<SvgTopic height={18} width={16} />}
                  label={source}
                  bold
                  title={'Applicant Source'}
                />
              )}
            </Flex>
            <Flex row bottom className={styles.marginStyleFlexOne}>
              <FontLable
                icon={<SvgPhone height={16} width={16} />}
                label={
                  candiList.contact && candiList.contact.length > 14
                    ? `${notSpecified(candiList.contact.slice(0, 11))} ...`
                    : notSpecified(candiList.contact)
                }
                bold
                className={styles.fontLabelStyle}
              />
              <FontLable
                icon={
                  <div style={{ marginRight: 2 }}>
                    <SvgMail height={16} width={14} />
                  </div>
                }
                label={notSpecified(candiList.email)}
                bold
              />
            </Flex>
          </Flex>
        </div>
        {withOutJD && (
          <>
            {!nonMatch ? (
              <Flex row center>
                <Text color="white" bold>
                  Job Title: {jdDetails && jdDetails.job_title} | Job ID:{' '}
                  {jdDetails && jdDetails.job_id}
                </Text>
                <Flex className={styles.barStyle}>
                  <Flex middle flex={1}>
                    <ProgressBar
                      roundProgressHeight={65}
                      percentage={profile_match}
                    />
                  </Flex>
                  <Text color="white" bold className={styles.matchStyle}>
                    Match Score
                  </Text>
                </Flex>
              </Flex>
            ) : (
              <Flex columnFlex className={styles.nonMatchFlex}>
                <Text color="white" bold>
                  Job Title: {jdDetails && jdDetails.job_title} | Job ID:{' '}
                  {jdDetails && jdDetails.job_id}
                </Text>
                <Flex end>
                  <Text align="right" className={styles.nonMatch}>
                    Non-Match
                  </Text>
                </Flex>
              </Flex>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

ProfileNavBar.defaultProps = defaultProps;

export default ProfileNavBar;
