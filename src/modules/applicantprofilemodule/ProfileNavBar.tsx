import classNames from 'classnames/bind';
import { saveAs } from 'file-saver';
import { ReactNode } from 'react';
import SvgDownload from '../../icons/SvgDownload';
import SvgInvite from '../../icons/SvgInvite';
import SvgLocation from '../../icons/SvgLocationapplicant';
import SvgMail from '../../icons/SvgMail';
import SvgLinkedIn from '../../icons/SvgLinkedIn';
// import LinkWrapper from '../../uikit/Link/LinkWrapper';
import SvgPhone from '../../icons/SvgPhones';
import SvgApplicantprofile from '../../icons/SvgApplicantprofile';
import SvgTopic from '../../icons/SvgTopic';
import SvgglobalGit from '../../icons/SvgglobalGit';

import { SECONDARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, notSpecified } from '../../uikit/helper';
import ProgressBar from '../../uikit/ProgressBar/ProgressBar';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import {
  CandidateDetailsEntity,
  JdEntity,
  PersonalInfoEntity,
} from './applicantProfileTypes';
import styles from './profilenavbar.module.css';

const cx = classNames.bind(styles);

type FontLableProps = {
  icon: ReactNode;
  label: string | number | null | undefined | string[];
  className?: string;
  bold?: boolean;
  title?: string;
};

const FontLable = ({ icon, label, className, bold, title }: FontLableProps) => {
  return (
    <Flex row center className={className} title={title}>
      {icon}
      <Text bold={bold} className={styles.useNameStyle}>
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
  // personal:PersonalInfoEntity;
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
  // profile download function
  const handleDownload = () => {
    if (candiList.file) {
      saveAs(
        `${process.env.REACT_APP_HOME_URL}media/${candiList.file}`,
        `${candiList.file.replace('unlock/', 'candidate_profile_')}`,
      );
      Toast('Resume downloaded successfully', 'LONG', 'success');
    }
  };
  const linkedin_url =
    candiList.linkedin_url !== null && candiList.linkedin_url !== ''
      ? candiList.linkedin_url
      : '';

  const url =
    linkedin_url.startsWith('http') === true
      ? linkedin_url
      : 'https://' + linkedin_url;
  return (
    <Flex column className={styles.overAll}>
      <Flex row middle style={{ position: 'relative' }}>
        {isProfileName || candiList.image === 'default.jpg' ? (
          <Flex className={styles.profile}>
            <div className={styles.countStyle}>
              <Text color="white" style={{ fontSize: 10, marginTop: ' 2px' }}>
                {profile_match}
              </Text>
            </div>
            {isEmpty(candiList.first_name) && (
              <Text size={30} bold transform="uppercase">
                NS
              </Text>
            )}
            {!isEmpty(candiList.first_name) && (
              <>
                {isEmpty(candiList.last_name) ? (
                  <Text size={30} bold transform="uppercase">
                    {candiList.first_name.charAt(0)}
                  </Text>
                ) : (
                  <Text size={30} bold transform="uppercase">
                    {candiList.first_name.charAt(0)}
                    {candiList.last_name.charAt(0)}
                  </Text>
                )}
              </>
            )}
          </Flex>
        ) : (
          <img
            style={{ objectFit: 'cover' }}
            alt="Profile"
            className={styles.imageStyle}
            src={`${process.env.REACT_APP_HOME_URL}media/${candiList.image}`}
          />
        )}
      </Flex>
      <Flex>
        <div>
          <Flex column className={styles.headerpart}>
            <Flex row center middle>
              <Text bold size={14} style={{ paddingRight: '10px' }}>
                {notSpecified(candiList.first_name)} {candiList.last_name}
              </Text>
              <div>
                <div
                  tabIndex={-1}
                  role={'button'}
                  onKeyPress={() => {}}
                  title="Download Resume"
                  onClick={handleDownload}
                >
                  <SvgApplicantprofile
                    fill={'#581845'}
                    width={18}
                    height={20}
                  />
                </div>
              </div>
              {candiList.linkedin_url !== null &&
                candiList.linkedin_url !== '' && (
                  <div className={styles.svgDownloadStyle}>
                    <a target={'_blank'} rel="noreferrer" href={url}>
                      <SvgLinkedIn fill={'#0288d1'} width={14.5} height={18} />
                    </a>
                  </div>
                )}
              {candiList.code_repo !== undefined && candiList.code_repo !== '' && (
                <div className={styles.svgDownloadStyle}>
                  <a target={'_blank'} rel="noreferrer" href={url}>
                    <SvgglobalGit fill={'#0288d1'} width={22} height={22} />
                  </a>
                </div>
              )}
              {console.log(candiList.code_repo, 'candiList.code_repo')}
              {/* <div><SvgglobalGit /></div> */}
              {/* {isInvite && (
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
                <SvgInvite color="#581845" />
              </div>
            )} */}
            </Flex>
            <Flex row middle style={{ fontsize: '13px', marginBottom: '10px' }}>
              {candiList.email}
            </Flex>
          </Flex>
          <Flex className={styles.headerpart1}>
            <Flex row style={{ marginTop: '10px' }}>
              <Flex style={{ marginRight: '10px' }}>
                <SvgPhone height={14} width={18} fill="#333333" />
              </Flex>
              {candiList.contact === null ? (
                <Flex style={{ paddingLeft: '2.2px' }}>Not Specified</Flex>
              ) : (
                <Flex>{candiList.contact}</Flex>
              )}
            </Flex>

            <Flex row style={{ marginTop: '5px', marginBottom: '10px' }}>
              <Flex style={{ marginRight: '10px' }}>
                <SvgLocation height={17} width={17} fill="#333333" />
              </Flex>
              {candiList.location === null ? (
                <Flex style={{ fontsize: '13px' }}>Not Specified</Flex>
              ) : (
                <Flex style={{ fontsize: '13px' }}> {candiList.location}</Flex>
              )}
            </Flex>
          </Flex>
          {isResume && (
            <Flex>
              <Flex className={styles.headingpart} marginTop={10}>
                Applicant Source
              </Flex>
              {source === null ? (
                <Flex className={styles.changingtext}>Not Specified</Flex>
              ) : (
                <Flex className={styles.changingtext}>{source}</Flex>
              )}
            </Flex>
          )}
          <Flex row flex={12}>
            <Flex flex={6}>
              <Flex className={styles.headingpart} marginTop={10}>
                Industry Type
              </Flex>
              {candiList.industry_type__label_name === undefined ? (
                <Flex className={styles.changingtext}>Not Specified</Flex>
              ) : (
                <Flex className={styles.changingtext}>
                  {candiList.industry_type__label_name}
                </Flex>
              )}
            </Flex>
            <Flex flex={6}>
              <Flex className={styles.headingpart} marginTop={10}>
                Job Type
              </Flex>
              {candiList.industry_type__label_name === undefined ? (
                <Flex className={styles.changingtext}>Not Specified</Flex>
              ) : (
                <Flex className={styles.changingtext}>
                  {candiList.type_of_job__label_name}
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex
            row
            flex={12}
            marginBottom={'10px'}
            className={styles.borderstyles}
          >
            <Flex flex={6}>
              <Flex className={styles.headingpart} marginTop={10}>
                Availability Date
              </Flex>
              {candiList.industry_type__label_name === undefined ? (
                <Flex className={styles.changingtext}>Not Specified</Flex>
              ) : (
                <Flex className={styles.changingtext}>
                  {candiList.exp_salary}
                </Flex>
              )}
            </Flex>
            <Flex flex={6}>
              <Flex className={styles.headingpart} marginTop={10}>
                Desired Salary
              </Flex>
              {candiList.industry_type__label_name === undefined ? (
                <Flex className={styles.changingtext}>Not Specified</Flex>
              ) : (
                <Flex className={styles.changingtext}>
                  {candiList.exp_salary}
                </Flex>
              )}
            </Flex>
          </Flex>
          {/* <Flex    className={styles.marginStyleFlexOne}> */}

          {/* <FontLable
            icon={
              <div style={{ marginRight: 2 }}>
                <SvgMail height={16} width={14} fill="#581845" />
              </div>
            }
            label={notSpecified(candiList.email)}
            bold
          /> */}
        </div>
        {/* {withOutJD && (
          <>
            {!nonMatch ? (
              <Flex center>
                {/* <Text bold>
                  Job Title: {jdDetails && jdDetails.job_title} | Job ID:{' '}
                  {jdDetails && jdDetails.job_id}
                </Text> */}
                {/* <Flex className={styles.barStyle}>
                  <Flex middle flex={1}>
                    <ProgressBar
                      roundProgressHeight={65}
                      percentage={profile_match}
                    />
                  </Flex>
                  <Text bold className={styles.matchStyle}>
                    Match Score
                  </Text>
                </Flex>
              </Flex>
            ) : (
              <Flex columnFlex className={styles.nonMatchFlex}> */}
                {/* <Text bold>
                  Job Title: {jdDetails && jdDetails.job_title} | Job ID:{' '}
                  {jdDetails && jdDetails.job_id}
                </Text> */}
                {/*  <Flex end>
                  <Text align="right" className={styles.nonMatch}>
                    Non-Match
                  </Text>
                </Flex>
              </Flex>
            )} */}
          {/* </>
        )} */}
      </Flex>
    </Flex>
  );
};

ProfileNavBar.defaultProps = defaultProps;

export default ProfileNavBar;
