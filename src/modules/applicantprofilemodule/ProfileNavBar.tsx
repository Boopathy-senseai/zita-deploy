import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import getSymbolFromCurrency from 'currency-symbol-map';
import StarRatingComponent from 'react-star-rating-component';
import { inviteToApplyApi } from '../../routes/apiRoutes';
import { AppDispatch, RootState } from '../../store';
import { ERROR_MESSAGE, YES, config } from '../constValue';
import Avatar, { getUserInitials } from '../../uikit/Avatar';
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
import SvgRadioWithLine from '../../icons/SvgRadioWithLine';
import SvgRadioWithOutOutLine from '../../icons/SvgRadioWithOutOutLine';
import { SECONDARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { Button, LinkWrapper } from '../../uikit';
import { InputCheckBox, InputRadio } from '../../uikit';
import { getDateString, isEmpty, notSpecified } from '../../uikit/helper';
import ProgressBar from '../../uikit/ProgressBar/ProgressBar';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import {
  CandidateDetailsEntity,
  JdEntity,
  PersonalInfoEntity,
} from './applicantProfileTypes';
import styles from './profilenavbar.module.css';
// import { applicantProfileInitalReducers } from './store/reducer/applicantProfileReducer';
import {
  applicantScoreMiddleWare,
  applicantStatusMiddleWare,
  applicantAllMatchMiddleWare,
  applicantMatchMiddleWare,
} from './store/middleware/applicantProfileMiddleware';
var querystring = require('querystring');
const cx = classNames.bind(styles);

type FontLableProps = {
  icon: ReactNode;
  label: string | number | null | undefined | string[];
  className?: string;
  bold?: boolean;
  title?: string;
  inviteMessage: string;
};

const FontLable = ({
  icon,
  label,
  className,
  bold,
  title,
  inviteMessage,
}: FontLableProps) => {
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
  applieddatecheck?: boolean;
  inviteCall?: () => void;
  isResume?: boolean;
  withOutJD: boolean;
  source?: string;
  isProfileName?: boolean;
  inviteIconDisable?: boolean;
  inviteIconNone?: boolean;
  setjobtitle?: any;
  availableity?:any;
} & typeof defaultProps;

const ProfileNavBar = ({
  nonMatch,
  candiList,
  jdDetails,
  profile_match,
  isInvite,
  inviteCall,
  applieddatecheck,
  isResume,
  withOutJD,
  setjobtitle,
  availableity,
  source,
  isProfileName,
  inviteIconDisable,
  inviteIconNone,
}: Props) => {
  // profile download function
  const dispatch: AppDispatch = useDispatch();
  const [checkingstatus, setcheckingstatus] = useState('');
  const [interviewstatus, setinterviewstatus] = useState(Number);
  const [isInvitePopUp, setInvitePopUp] = useState(false);
  const [isDate, setDate] = useState('');
  if (jdDetails !== null && setjobtitle) {
    const state = jdDetails.job_id;
    setjobtitle(state);
  }

  const handleDownload = () => {
    if (candiList.file) {
      saveAs(
        `${process.env.REACT_APP_HOME_URL}media/${candiList.file}`,
        `${candiList.file.replace('unlock/', 'candidate_profile_')}`,
      );
      Toast('Resume downloaded successfully', 'LONG', 'success');
    }
  };

  const {
    match,
    stages,
    interview,
    can_id,
    invite,
    jd_id,
    datas,
    total_exp,
    personalInfo,
    candidate_details,
    overall_percentage,
  } = useSelector(
    ({
      applicantStausReducers,
      applicantScoreReducers,
      applicantAllMatchReducers,
      applicantMatchReducers,
      applicantProfileInitalReducers,
      zitaMatchDataCandidateReducers,
      candidatejdmatchReducers,
    }: RootState) => {
      return {
        match:
          applicantAllMatchReducers.match !== undefined &&
          applicantAllMatchReducers.match,
        overall_percentage: applicantMatchReducers.overall_percentage,
        candidate_details: applicantProfileInitalReducers.candidate_details,
        stages: applicantStausReducers?.stages,
        can_id: applicantProfileInitalReducers.can_id,
        datas: zitaMatchDataCandidateReducers.data,
        total_exp: applicantProfileInitalReducers.total_exp,
        jd_id: applicantProfileInitalReducers?.jd_id,
        invite: applicantStausReducers?.invite,
        interview:
          typeof applicantScoreReducers.interview !== 'undefined' &&
          applicantScoreReducers.interview.length === 0
            ? [
                {
                  candidate_id_id: 0,
                  jd_id_id: 0,
                  rating: 0,
                  img_name: '',
                  first_name: '',
                  comments: '',
                  created_at: '',
                  last_name: '',
                },
              ]
            : applicantScoreReducers.interview,
        personalInfo: applicantProfileInitalReducers.personalInfo
          ? applicantProfileInitalReducers.personalInfo
          : [
              {
                application_id: 0,
                user_id_id: 0,
                firstname: '',
                lastname: '',
                email: '',
                contact_no: 0,
                country_id: 0,
                state_id: 0,
                city_id: 0,
                zipcode: '',
                Date_of_birth: 0,
                linkedin_url: '',
                career_summary: '',
                gender_id: 0,
                updated_at: '',
                code_repo: '',
                visa_sponsorship: false,
                remote_work: false,
                type_of_job_id: 0,
                available_to_start_id: 0,
                industry_type_id: 0,
                curr_gross: '',
                current_currency: '',
                exp_gross: 0,
                salary_negotiable: false,
                current_country_id: 0,
                current_state_id: 0,
                current_city_id: 0,
                current1_country: '',
                current2_country: '',
                current3_country: '',
                relocate: false,
                current_city__name: '',
                current_country__name: '',
                current_state__name: '',
                type_of_job__label_name: '',
                available_to_start__label_name: '',
                industry_type__label_name: '',
                country__name: '',
                city__name: '',
                state__name: '',
              },
            ],
      };
    },
  ); 
  console.log(candidate_details[0].interested,'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
  useEffect(() => {
    dispatch(applicantScoreMiddleWare({ jd_id, can_id }));
  }, []);
  useEffect(() => {
    if (stages.length === 0) {
      setcheckingstatus('');
    }
    if (stages.length === 1) {
      setcheckingstatus(stages[0].stage_id__stage_name);
    }
    if (stages.length === 2) {
      setcheckingstatus(stages[1].stage_id__stage_name);
    }
    if (stages.length === 3) {
      setcheckingstatus(stages[2].stage_id__stage_name);
    }
    if (stages.length === 4) {
      setcheckingstatus(stages[3].stage_id__stage_name);
    }
  }, [stages]);
  const linkedin_url =
    candiList.linkedin_url !== null && candiList.linkedin_url !== ''
      ? candiList.linkedin_url
      : '';

  const url =
    linkedin_url.startsWith('http') === true
      ? linkedin_url
      : 'https://' + linkedin_url;

  useEffect(() => {
    const ratingValue =
      interview && interview[interview.length - 1].rating
        ? interview[interview.length - 1].rating
        : 0;
    setinterviewstatus(ratingValue);
  }, [interview]); 
  const date = isEmpty(candidate_details[0].created_on)
    ? ''
    : candidate_details[0].created_on.slice(
        0,
        candidate_details[0].created_on.indexOf('T'),
      );
  const getFresher =
    total_exp &&
    total_exp[0].total_exp_year === 0 &&
    total_exp &&
    total_exp[0].total_exp_year === 0
      ? true
      : false;
  const totalYear =
    total_exp && total_exp[0].total_exp_year !== 0
      ? total_exp && total_exp[0].total_exp_year > 1
        ? `${total_exp[0].total_exp_year} Years`
        : `${total_exp[0].total_exp_year} Year`
      : '';

  const totalMonths =
    total_exp && total_exp[0].total_exp_month !== 0
      ? total_exp && total_exp[0].total_exp_month > 1
        ? `${total_exp[0].total_exp_month} Months`
        : `${total_exp[0].total_exp_month} Month`
      : '';
  const handlefunct = () => {
    setInvitePopUp(true);
    setDate(match[0].invited);
  };
  const hanldeInviteClosePopUp = () => {
    setInvitePopUp(false);
  };
  const perAnnumExpGross = isEmpty(personalInfo[0].exp_gross)
    ? ''
    : `Per Annum ${
        personalInfo[0].salary_negotiable === false ? '' : '- Negotiable'
      }`;

  const expGross =
    notSpecified(personalInfo[0].exp_gross) !== 'Not Specified'
      ? `${getSymbolFromCurrency(personalInfo[0].current_currency)} ${
          personalInfo[0].exp_gross
        } ${perAnnumExpGross}`
      : notSpecified(personalInfo[0].exp_gross);

  const hanldeInvite = (jdId: number, candId: number) => {
    hanldeInviteClosePopUp();
    // setInviteLoader(true);
    const data = querystring.stringify({
      jd_id: jdId,
      candi_id: candId,
    });
    axios
      .post(inviteToApplyApi, data, config)
      .then(() => {
        // setInviteLoader(false);
        Toast('Candidate invited successfully');
        dispatch(applicantAllMatchMiddleWare({ can_id: candId }));
        dispatch(
          applicantStatusMiddleWare({
            jd_id: jdId.toString(),
            can_id: candId.toString(),
          }),
        );
      })
      .catch(() => {
        // setInviteLoader(false);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };
  return (
    <>
      {invite?.length === 0 && (
        <CancelAndDeletePopup
          title={`Invite will be sent as an email to ${
            candidate_details && candidate_details[0].first_name
          }. Are you sure to proceed?`}
          btnDelete={() =>
            hanldeInvite(Number(jd_id), match[0]?.candidate_id_id)
          }
          btnCancel={hanldeInviteClosePopUp}
          btnRight={YES}
          open={isInvitePopUp}
        />
      )}
      {invite?.length !== 0 && (
        <CancelAndDeletePopup
          title={
            <Flex className={styles.popTitle}>
              <Text>{`The candidate ${
                candidate_details && candidate_details[0].first_name
              } has already been invited for this job on ${getDateString(
                invite && invite[invite?.length - 1].created_at,
                'll',
              )}.`}</Text>
              <Text>Do you wish to invite again?</Text>
            </Flex>
          }
          btnDelete={() =>
            hanldeInvite(Number(jd_id), match[0]?.candidate_id_id)
          }
          btnCancel={hanldeInviteClosePopUp}
          btnRight={YES}
          open={isInvitePopUp}
        />
      )}
      <Flex column className={styles.overAll}>
        <Flex style={{ padding: '0px 8px 0px 8px' }}>
          <Flex row middle style={{ position: 'relative', marginTop: '20px' }}>
            <Flex className={styles.profile}>
              <Avatar
                className={styles.profile}
                style={{ fontSize: '26px', textTransform: 'uppercase' }}
                avatar={
                  candiList.image && candiList.image !== 'default.jpg'
                    ? `${process.env.REACT_APP_HOME_URL}media/${candiList.image}`
                    : undefined
                }
                initials={getUserInitials({
                  firstName: candiList.first_name,
                  lastName: candiList.last_name,
                })}
              />
              {jd_id !== null && (
                <div
                  className={cx({
                    countStyle1: overall_percentage < 40,
                    countStyle2: overall_percentage >= 40 && profile_match < 69,
                    countStyle3: overall_percentage > 69,
                  })}
                >
                  <Text
                    color="white"
                    style={{ fontSize: 10, marginTop: ' 2px' }}
                  >
                    {overall_percentage}
                  </Text>
                </div>
              )}
              {/* {isEmpty(candiList.first_name) && (
                <Text size={30} bold transform="uppercase">
                  NS
                </Text>
              )} */}
            </Flex>
            {/* {!isEmpty(candiList.first_name) && (
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
              )} */}
            {/* 
          ) : (
            <Flex>
              <img
                style={{ objectFit: 'cover' }}
                alt="Profile"
                className={styles.profileimg}
                src={`${process.env.REACT_APP_HOME_URL}media/${candiList.image}`}
              />
            </Flex> */}
          </Flex>
          {jd_id === undefined || jd_id === null || stages.length === 0 ? (
            ''
          ) : (
            <Flex middle center style={{ cursor: 'default' }}>
              <StarRatingComponent
                className={styles.starstyle}
                name="rate1"
                starCount={5}
                value={interviewstatus}
              />
            </Flex>
          )}

          <Flex column className={styles.headerpart}>
            <Flex row center middle>
              <Text bold size={14} style={{ paddingRight: '10px' }}>
                {notSpecified(candiList.first_name)} {candiList.last_name}
              </Text>
              {/*   <div>
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
              </div> */}
              {/* {candiList.linkedin_url !== null &&
                candiList.linkedin_url !== '' && (
                  <div className={styles.svgDownloadStyle}>
                    <a target={'_blank'} rel="noreferrer" href={url}>
                      <SvgLinkedIn fill={'#0288d1'} width={14.5} height={18} />
                    </a>
                  </div>
                )} */}
              {/* {candiList.code_repo !== undefined && candiList.code_repo !== '' && (
                <div className={styles.svgDownloadStyle}>
                  <a target={'_blank'} rel="noreferrer" href={url}>
                    <SvgglobalGit fill={'#0288d1'} width={22} height={22} />
                  </a>
                </div>
              )} */}
            </Flex>
            <Flex row middle style={{ fontsize: '13px', marginBottom: '10px' }}>
              {candiList.email}
            </Flex>
          </Flex>

          <Flex className={styles.headerpart1}>
            <Flex row style={{ marginTop: '10px' }} marginLeft={5}>
              <div
                tabIndex={-1}
                role={'button'}
                onKeyPress={() => {}}
                style={{ display: 'flex', alignItems: 'center' }}
                title="Download Resume"
                onClick={handleDownload}
              >
                <SvgApplicantprofile fill={'#581845'} width={20} height={25} />
                <Flex>
                  {' '}
                  <Text
                    bold
                    color="theme"
                    style={{ cursor: 'pointer', fontSize: '13px' }}
                  >
                    Download Resume
                  </Text>
                </Flex>
              </div>
            </Flex>
            <Flex row>
              <Flex style={{ marginRight: '10px' }}>
                <SvgPhone height={14} width={18} fill="#581845" />
              </Flex>
              {candiList.contact === null ||
              candiList.contact === undefined ||
              candiList.contact === '' ? (
                <Flex style={{ paddingLeft: '2.2px' }}>Not Specified</Flex>
              ) : (
                <Flex>{candiList.contact}</Flex>
              )}
            </Flex>

            <Flex row style={{ marginTop: '5px', marginBottom: '10px' }}>
              <Flex style={{ marginRight: '10px' }}>
                <SvgLocation height={17} width={17} fill="#581845" />
              </Flex>
              {console.log(
                personalInfo[0].city__name,
                'personalInfo[0].city__namepersonalInfo[0].city__name',
              )}
              {personalInfo[0].city__name === null ||
              personalInfo[0].city__name === '' ? (
                <Flex style={{ fontsize: '13px' }}>Not Specified</Flex>
              ) : (
                <Flex row>
                  {personalInfo[0].city__name !== undefined &&
                    personalInfo[0].city__name !== null && (
                      <Flex style={{ fontsize: '13px' }}>
                        {' '}
                        {personalInfo[0].city__name},
                      </Flex>
                    )}
                  {personalInfo[0].state__name !== undefined &&
                    personalInfo[0].state__name !== null && (
                      <Flex style={{ fontsize: '13px' }}>
                        {' '}
                        {personalInfo[0].state__name},
                      </Flex>
                    )}
                  {personalInfo[0].country__name !== undefined &&
                    personalInfo[0].country__name !== null && (
                      <Flex style={{ fontsize: '13px' }}>
                        {' '}
                        {personalInfo[0].country__name}
                      </Flex>
                    )}
                </Flex>
              )}
            </Flex>
          </Flex>
          {(candiList.linkedin_url !== null && candiList.linkedin_url !== '') ||
          (candiList.code_repo !== undefined && candiList.code_repo !== '') ? (
            <Flex row className={styles.headerpart1}>
              <Flex
                className={styles.headingpart}
                marginTop={10}
                marginBottom={10}
              >
                Social media
              </Flex>
              <Flex
                row
                center
                middle
                style={{ marginTop: '6px', marginLeft: '10px' }}
              >
                {candiList.linkedin_url !== null &&
                  candiList.linkedin_url !== '' && (
                    <div
                      className={styles.svgDownloadStyle}
                      style={{
                        marginBottom: 10,
                        paddingTop: '4px',
                        marginRight: '10px',
                      }}
                    >
                      <a target={'_blank'} rel="noreferrer" href={url}>
                        <SvgLinkedIn
                          fill={'#0288d1'}
                          width={17.5}
                          height={22}
                        />
                      </a>
                    </div>
                  )}
                {candiList.code_repo !== undefined &&
                  candiList.code_repo !== '' && (
                    <div
                      className={styles.svgDownloadStyle}
                      style={{ marginBottom: 10 }}
                    >
                      <a target={'_blank'} rel="noreferrer" href={url}>
                        <SvgglobalGit
                          fill={'#0288d1'}
                          width={26.5}
                          height={26.5}
                        />
                      </a>
                    </div>
                  )}
              </Flex>
            </Flex>
          ) : (
            ''
          )}
        </Flex>
        <Flex
          style={{ overflow: 'scroll', padding: '0px 0px 0px 8px' }}
          height={window.innerHeight - 320}
        >
          <Flex>
            <Flex row flex={12}>
              <Flex flex={6}>
                <Flex
                  className={styles.headingpart}
                  marginTop={10}
                  style={{ display: 'flex' }}
                >
                  Qualification
                </Flex>
                {candiList.qualification === null ||
                candiList.qualification === undefined ||
                candiList.qualification === '' ? (
                  <Flex className={styles.changingtext}>
                    <Text className={styles.changingtext}>Not Specified</Text>
                  </Flex>
                ) : (
                  <Flex
                    className={styles.changingtext}
                    title={candiList.qualification}
                  >
                    <Text className={styles.changingtext}>
                      {candiList.qualification}
                    </Text>
                  </Flex>
                )}
              </Flex>
              {isResume && (
                <Flex flex={6}>
                  <Flex className={styles.headingpart} marginTop={10}>
                    Applicant Source
                  </Flex>
                  {source === null || source === undefined || source === '' ? (
                    <Flex className={styles.changingtext}>
                      <Text className={styles.changingtext}>Not Specified</Text>
                    </Flex>
                  ) : (
                    <Flex className={styles.changingtext} title={source}>
                      <Text className={styles.changingtext}>{source}</Text>
                    </Flex>
                  )}
                </Flex>
              )}
            </Flex>
            <Flex row flex={12} style={{ paddingBottom: '10px' }}>
              <Flex flex={6}>
                <Flex className={styles.headingpart} marginTop={10}>
                  Experience
                </Flex>
                {total_exp === undefined || total_exp === null ? (
                  <Flex className={styles.changingtext}>
                    <Text className={styles.changingtext}>Not Specified</Text>
                  </Flex>
                ) : (
                  <Flex
                    className={styles.changingtext}
                    title={
                      getFresher ? 'Fresher' : `${totalYear} ${totalMonths}`
                    }
                  >
                    <Text className={styles.changingtext}>
                      {' '}
                      {getFresher ? 'Fresher' : `${totalYear} ${totalMonths}`}
                    </Text>
                  </Flex>
                )}
              </Flex> 
              {!applieddatecheck && Number(jd_id) !== 0 ? (
                <Flex flex={6}>
                  <Flex className={styles.headingpart} marginTop={10}>
                    Applied Date
                  </Flex>
                  {date === '' ? (
                    <Flex className={styles.changingtext}>
                      <Text className={styles.changingtext}>Not Specified</Text>
                    </Flex>
                  ) : (
                    <Flex className={styles.changingtext} title={getDateString(date, 'll')}>
                      <Text className={styles.changingtext}>{getDateString(date, 'll')}</Text>
                    </Flex>
                  )}
                </Flex>
              ) : Number(jd_id) !== 0 ? (
                <Flex flex={6}>
                  <Flex className={styles.headingpart} marginTop={10}>
                  Invited Date
                  </Flex>
                  {invite.length === 0 ? (
                    <Flex className={styles.changingtext}>
                      <Text className={styles.changingtext}>Not Invited Yet</Text>
                    </Flex>
                  ) : (
                    <Flex
                      className={styles.changingtext}
                      title={invite[invite.length - 1].created_at}
                    >
                      <Text className={styles.changingtext}>
                      {getDateString(
             invite &&
             invite.length &&new Date(invite[invite.length - 1].created_at),
              'll')}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              ) : (
                ''
              )}
            </Flex>
           {!applieddatecheck && Number(jd_id) !== 0 &&<Flex row flex={12} style={{ borderTop: '1px solid #C3C3C3' }}>
              <Flex flex={6}>
                <Flex className={styles.headingpart} marginTop={10}>
                  Willing to Relocate
                </Flex>
                {personalInfo[0].relocate === null ||
                personalInfo[0].relocate === undefined ? (
                  <Flex className={styles.changingtext}>
                    <Text className={styles.changingtext}>Not Specified</Text>
                  </Flex>
                ) : (
                  <Flex
                    className={styles.changingtext}
                    title={personalInfo[0].relocate === true ? 'Yes' : 'No'}
                  >
                    {personalInfo[0].relocate === true ? 'Yes' : 'No'}
                  </Flex>
                )}
              </Flex>
              <Flex flex={6}>
                <Flex className={styles.headingpart} marginTop={10}>
                  Job Type
                </Flex>
                {personalInfo[0].type_of_job__label_name === undefined ||
                personalInfo[0].type_of_job__label_name === null ||
                personalInfo[0].type_of_job__label_name === '' ? (
                  <Flex className={styles.changingtext}>
                    <Text className={styles.changingtext}>Not Specified</Text>
                  </Flex>
                ) : (
                  <Flex
                    className={styles.changingtext}
                    title={personalInfo[0].type_of_job__label_name}
                  >
                    <Text
                      className={styles.changingtext}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {personalInfo[0].type_of_job__label_name}
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Flex>}
            {!applieddatecheck && Number(jd_id) !== 0 && <Flex row flex={12} marginBottom={'10px'}>
              <Flex flex={6}>
                <Flex className={styles.headingpart} marginTop={10}>
                  Expected Salary
                </Flex>
                {candiList.exp_salary === undefined ||
                candiList.exp_salary === null ||
                candiList.exp_salary === '' ? (
                  <Flex className={styles.changingtext}>
                    <Text className={styles.changingtext}>Not Specified</Text>
                  </Flex>
                ) : (
                  <Flex
                    className={styles.changingtext}
                    title={expGross.toString()}
                  >
                    <Text className={styles.changingtext}>{expGross}</Text>
                  </Flex>
                )}
              </Flex>
              {!applieddatecheck && !availableity &&
              <Flex flex={6}>
                <Flex className={styles.headingpart} marginTop={10}>
                  Availability
                </Flex>
                {console.log(personalInfo[0].available_to_start__label_name,'personalInfo[0].available_to_start__label_namepersonalInfo[0].available_to_start__label_name')}
                {personalInfo[0].available_to_start__label_name === null ? (
                  <Flex className={styles.changingtext}>
                    <Text className={styles.changingtext}>Not Specified</Text>
                  </Flex>
                ) : (
                  <Flex
                    className={styles.changingtext}
                    title={personalInfo[0].available_to_start__label_name}
                  >
                    <Text className={styles.changingtext}>
                      {personalInfo[0].available_to_start__label_name}
                    </Text>
                  </Flex>
                )}
              </Flex>}
            </Flex>}
            {!applieddatecheck && Number(jd_id) !== 0 &&<Flex style={{ paddingBottom: '10px' }}>
              <Flex className={styles.headingpart}>Industry Type</Flex>
              {personalInfo[0].industry_type__label_name === undefined ||
              personalInfo[0].industry_type__label_name === null ||
              personalInfo[0].industry_type__label_name === '' ? (
                <Flex>
                  {' '}
                  <Text className={styles.changingtext}>Not Specified</Text>
                </Flex>
              ) : (
                <Flex
                  className={styles.changingtexts}
                  title={personalInfo[0].industry_type__label_name}
                >
                  <Text className={styles.changingtext}>
                    {personalInfo[0].industry_type__label_name}
                  </Text>
                </Flex>
              )}
            </Flex>}

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
            {console.log(stages[0], 'stages[0]stages[0]stages[0]')}
            {stages[0] === undefined ? (
              <>
                {jd_id !== '' && jd_id !== undefined && jd_id !== null && (
                  <Flex center middle className={styles.borderstyles}>
                    <Button onClick={() => setInvitePopUp(true)}
                    disabled={candidate_details[0].interested === false}
                    >
                      Invited to Apply
                    </Button>{' '}
                  </Flex>
                )}
              </>
            ) : (
              <>
                {jd_id !== null && (
                  <Flex className={styles.borderstyles} marginBottom={10}>
                    <Flex marginBottom={5}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#581845',
                          fontWeight: 600,
                        }}
                      >
                        Screening Status
                      </Text>
                    </Flex>
                    <Flex
                      row
                      between
                      style={{
                        border: '1px solid #A5889C',
                        padding: '10px',
                        borderRadius: '5px',
                      }}
                    >
                      <Flex title="Applied">
                        {checkingstatus === 'Applied' ? (
                          <SvgRadioWithLine fill="#581845" />
                        ) : (
                          <SvgRadioWithOutOutLine fill="#581845" />
                        )}
                      </Flex>
                      <Flex style={{ color: '#80C0D0' }} title="Shortlisted">
                        {checkingstatus === 'Shortlisted' ? (
                          <SvgRadioWithLine fill="#80C0D0" />
                        ) : (
                          <SvgRadioWithOutOutLine fill="#80C0D0" />
                        )}
                      </Flex>
                      {console.log(
                        checkingstatus,
                        'checkingstatuscheckingstatuscheckingstatus',
                      )}
                      <Flex title="Under Assessment">
                        {checkingstatus !== 'Applied' &&
                        checkingstatus !== 'Shortlisted' &&
                        checkingstatus !== 'Offered' &&
                        checkingstatus !== 'Rejected' ? (
                          <SvgRadioWithLine fill="#ffc203" />
                        ) : (
                          <SvgRadioWithOutOutLine fill="#ffc203" />
                        )}
                      </Flex>
                      <Flex title="Offered">
                        {checkingstatus === 'Offered' ? (
                          <SvgRadioWithLine fill="#00BE4B" />
                        ) : (
                          <SvgRadioWithOutOutLine fill="#00BE4B" />
                        )}
                      </Flex>
                      <Flex title="Rejected">
                        {checkingstatus === 'Rejected' ? (
                          <SvgRadioWithLine fill="#ED4857" />
                        ) : (
                          <SvgRadioWithOutOutLine fill="#ED4857" />
                        )}
                      </Flex>
                    </Flex>
                  </Flex>
                )}
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

ProfileNavBar.defaultProps = defaultProps;

export default ProfileNavBar;
