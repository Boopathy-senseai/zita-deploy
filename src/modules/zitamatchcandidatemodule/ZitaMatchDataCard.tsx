import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SvgAppliedIcon from '../../icons/SvgAppliedIcon';
import SvgHeart from '../../icons/SvgHeart';
import SvgHelp from '../../icons/SvgHelp';
import SvgInterested from '../../icons/SvgInterested';
import SvgInvite from '../../icons/SvgInvite';
import SvgNotesOne from '../../icons/SvgNotesOne';
import SvgView from '../../icons/SvgView';
import { AppDispatch } from '../../store';
import Card from '../../uikit/Card/Card';
import { ERROR, GARY_4, SUCCESS } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import {
  getDateString,
  isEmpty,
  lowerCase,
  notSpecified,
} from '../../uikit/helper';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import Text from '../../uikit/Text/Text';
import ProfileView from '../applicantpipelinemodule/ProfileView';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import { workYear } from '../common/commonHelper';
import ProfileWithPercentage from '../common/ProfileWithPercentage';
import { YES } from '../constValue';
import { zitaMatchDataCandidateMiddleWare } from './store/middleware/zitamatchcandidatemiddleware';
import ZitaMatchCandidateDrawer from './ZitaMatchCandidateDrawer';
import { DataEntity } from './zitaMatchCandidateTypes';
import styles from './zitamatchdatacard.module.css';

const cx = classNames.bind(styles);

type Props = {
  dataList: DataEntity;
  index: number;
  jobId: string;
  handleClick: (e: { target: { id: string; checked: boolean } }) => void;
  isCheck: DataEntity;
  hanldeFav: (arg: number) => void;
  hanldeInvite: (arg: number) => void;
  isProfile: string;
  favAdd: 'add' | '';
  isSearch: string;
  isExperience: string;
  isRelocate: boolean;
  qaValue: string;
  isCandiStatus: string;
  isJobType: string;
  isLocation: boolean;
  skillsOptionsList: any;
  isPage: number;
};
const ZitaMatchDataCard = ({
  dataList,
  index,
  jobId,
  isCheck,
  handleClick,
  hanldeFav,
  hanldeInvite,
  isProfile,
  favAdd,
  isSearch,
  isExperience,
  isRelocate,
  qaValue,
  isCandiStatus,
  isJobType,
  isLocation,
  skillsOptionsList,
  isPage,
}: Props) => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const dispatch: AppDispatch = useDispatch();
  const [isProfileView, setProfileView] = useState(false);
  const [isNotes, setNotes] = useState(false);
  const [isInvite, setInvite] = useState(false);
  const getCandiId=query.get('candi');

  useEffect(()=>{
    if(!isEmpty(getCandiId)){
      setProfileView(true);
    }
  },[])

  const handleProfileView = () => {
    if (isEmpty(dataList.applicant)) {
      setProfileView(true);
    }
  };
  const handleNotesView = () => {
    if (isEmpty(dataList.applicant)) {
      setNotes(true);
    }
  };
  

  const handleApplicantView = () => {
    localStorage.setItem('applied_view', 'true');
    localStorage.setItem('applied_can_id', dataList.id.toString());
    localStorage.setItem('applied_jd_id', jobId);
  };

  const handleInviteView = () => {
    setInvite(true);
  };
  const inviteSubmit = () => {
    setInvite(false);
    hanldeInvite(dataList.id);
  };

  const handleClose = () => {
    dispatch(
      zitaMatchDataCandidateMiddleWare({
        jd_id: jobId,
        profile_match: isProfile,
        fav: favAdd,
        candidate: isSearch,
        work_experience: isExperience,
        relocate: isRelocate ? '1' : '0',
        invite: isCandiStatus,
        profile_view: isProfile,
        education_level: qaValue,
        type_of_job: isJobType,
        preferred_location: isLocation ? '1' : '0',
        skill_match: skillsOptionsList,
        page: isPage + 1,
      }),
    );
    setProfileView(false);
    setNotes(false);
  };
  console.log('jobId',jobId);
  
  return (
    <Flex className={styles.cardwrap} >
      {isEmpty(dataList.candidate_id_id) && (
        <>
          <ZitaMatchCandidateDrawer
            activeState={0}
            open={isProfileView}
            cancel={handleClose}
            jobId={jobId}
            candidateId={dataList.id.toString()}
          />
          <ZitaMatchCandidateDrawer
            activeState={2}
            open={isNotes}
            cancel={handleClose}
            jobId={jobId}
            candidateId={dataList.id.toString()}
          />
        </>
      )}
      {!isEmpty(dataList.candidate_id_id) && (
        <>
          <ProfileView
            open={isProfileView}
            cancel={handleClose}
            jobId={jobId}
            candidateId={dataList.id.toString()}
          />
          <ProfileView
            activeState={4}
            open={isNotes}
            cancel={handleClose}
            jobId={jobId}
            candidateId={dataList.id.toString()}
          />
        </>
      )}

      {isEmpty(dataList.invite) && (
        <CancelAndDeletePopup
          open={isInvite}
          title={`Invite will be sent as an email to ${dataList.first_name}. Are you sure to proceed?`}
          btnDelete={inviteSubmit}
          btnCancel={() => setInvite(false)}
          btnRight={YES}
        />
      )}

      {!isEmpty(dataList.invite) && (
        <CancelAndDeletePopup
          open={isInvite}
          title={
            <Flex className={styles.popTitle}>
              <Text>{`The candidate ${
                dataList.first_name
              } has already been invited for this job on ${getDateString(
                dataList.invite,
                'll',
              )}.`}</Text>
              <Text>Do you wish to invite again?</Text>
            </Flex>
          }
          btnDelete={inviteSubmit}
          btnCancel={() => setInvite(false)}
          btnRight={YES}
        />
      )}

      {/* <Card className={styles.cardOverAll}>
        <Flex columnFlex row className={styles.cardHeight}>
          <Flex columnFlex top >
            <InputCheckBox
              onChange={handleClick}
              checked={isCheck.includes(dataList.id.toString())}
              key={dataList.id.toString()}
              name={dataList.first_name}
              id={dataList.id.toString()}
            />
          </Flex>
          
          <Flex flex={1} row width={'100%'}>
            <Flex row className={styles.profileFlex}>
              <ProfileWithPercentage
                isPercentage={true}
                index={index}
                dataList={dataList}
              />
              <Flex className={styles.nameContainer}>
                <Flex row center>
                  <Text
                    color={isEmpty(dataList.applicant) ? 'link' : 'gray'}
                    bold
                    title={dataList.first_name}
                    textStyle="ellipsis"
                    onClick={handleProfileView}
                  >
                    {dataList.first_name}
                  </Text>
                  <div
                    className={styles.svgViewStyle}
                    title={
                      !isEmpty(dataList.applicant_view)
                        ? 'Profile Viewed'
                        : 'Yet to View'
                    }
                  >
                    <SvgView
                      height={18}
                      width={18}
                      nonView={isEmpty(dataList.applicant_view)}
                    />
                  </div>
                  <div
                    title={
                      !isEmpty(dataList.fav)
                        ? 'Remove from Favourites'
                        : 'Add to Favourites'
                    }
                    onClick={() => hanldeFav(dataList.id)}
                    className="pointer"
                    tabIndex={-1}
                    role={'button'}
                    onKeyPress={() => {}}
                  >
                    <SvgHeart
                      height={18}
                      width={18}
                      filled={!isEmpty(dataList.fav)}
                    />
                  </div>
                </Flex>
                {dataList.work_exp === 'Not Specified' ? (
                  <Flex row center>
                    <Text
                      size={12}
                      color="gray"
                      textStyle="ellipsis"
                      style={{ maxWidth: '50%' }}
                      title={dataList.location}
                    >
                      {notSpecified(dataList.location)}
                    </Text>
                    <Text size={12} color="gray" style={{ marginLeft: 2 }}>
                      |{' Not Specified'}
                    </Text>
                  </Flex>
                ) : (
                  <Flex row center>
                    <Text
                      size={12}
                      color="gray"
                      textStyle="ellipsis"
                      style={{ maxWidth: '50%' }}
                      title={dataList.location}
                    >
                      {notSpecified(dataList.location)}
                    </Text>
                    <Text size={12} color="gray" style={{ marginLeft: 2 }}>
                      | {notSpecified(workYear(dataList.work_exp))}
                    </Text>
                  </Flex>
                )}

                <Text textStyle="ellipsis" size={12} color="gray">
                  {notSpecified(dataList.qualification)}
                </Text>
              </Flex>
            </Flex>

            <Flex className={styles.skillFlex}>
              <Text size={12} color="gray" className={styles.skillStyle}>
                <Text bold color="gray" size={12}>
                  Skills:{' '}
                </Text>
                {notSpecified(lowerCase(dataList.skills.replace(/,/g, ', ')))}
              </Text>
              <Flex
                row
                center
                className={isEmpty(dataList.applicant) ? styles.notesFlex : styles.notesDisableFlex}
                onClick={handleNotesView}
              >
                <SvgNotesOne height={14} width={14} />
                <Text size={12} bold color={isEmpty(dataList.applicant) ? 'link' : 'gray'} style={{ marginLeft: 4 }}>
                  Notes
                </Text>
              </Flex>
            </Flex>

            <Flex columnFlex middle center className={styles.inviteContainer}>
              {!isEmpty(dataList.interested) &&
              dataList.interested === false ? (
                <div className={cx('svgInviteNone')}>
                  <SvgInvite width={36} height={36} color="theme" />
                </div>
              ) : (
                <div
                  tabIndex={-1}
                  role={'button'}
                  onKeyPress={() => {}}
                  onClick={handleInviteView}
                  className={cx({
                    svgInvitePointer: isEmpty(dataList.applicant),
                    svgInviteNone: !isEmpty(dataList.applicant),
                  })}
                >
                  <SvgInvite width={36} height={36} color="theme" />
                </div>
              )}

              {isEmpty(dataList.invite) && (
                <Text color="gray" size={12}>
                  {!isEmpty(dataList.applicant)
                    ? 'You can’t send Invite'
                    : 'Invite to Apply'}
                </Text>
              )}

              {!isEmpty(dataList.interested) &&
              dataList.interested === false ? (
                <Text color="gray" size={12}>
                  You can’t send Invite
                </Text>
              ) : (
                <>
                  {!isEmpty(dataList.invite) && isEmpty(dataList.applicant) && (
                    <Text color="gray" size={12}>
                      Last Invited:{' '}
                      {dataList?.invite && getDateString(dataList.invite, 'll')}
                    </Text>
                  )}
                </>
              )}

              {!isEmpty(dataList.invite) && !isEmpty(dataList.applicant) && (
                <Text color="gray" size={12}>
                  You can’t send Invite
                </Text>
              )}

              {!isEmpty(dataList.interested) && isEmpty(dataList.applicant) && (
                <Flex row center>
                  <SvgInterested
                    width={22}
                    height={22}
                    fill={dataList.interested ? SUCCESS : ERROR}
                  />
                  <Text color="gray" style={{ marginLeft: 4 }}>
                    {dataList.interested ? 'Interested' : 'Not Interested'}
                  </Text>
                </Flex>
              )}

              {!isEmpty(dataList.applicant) && (
                <Flex row center>
                  <SvgAppliedIcon fill={SUCCESS} width={17} height={17} />
                  <Link target={'_parent'} to={`/applicant_pipe_line/${jobId}`}>
                    <Text
                      color="link"
                      bold
                      className={styles.appliedText}
                      onClick={handleApplicantView}
                    >
                      Applied
                    </Text>
                  </Link>
                  <div title="View the profile in Applicants Pipeline page.">
                    <SvgHelp width={16} height={16} fill={GARY_4} />
                  </div>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Card> */}

      <Card className={styles.cardOverAll}>
      <Flex columnFlex row className={styles.cardHeight}>
          <Flex columnFlex top >
          <InputCheckBox
              onChange={handleClick}
              checked={isCheck.includes(dataList.id.toString())}
              key={dataList.id.toString()}
              name={dataList.first_name}
              id={dataList.id.toString()}
            />
            </Flex>
             
          <Flex flex={1} row width={'100%'}>
             <Flex width="70%">
             <Flex row marginLeft={5}>
              <Flex>
              <ProfileWithPercentage
                isPercentage={true}
                index={index}
                dataList={dataList}
              />
              </Flex>
              <Flex>
                <Flex row>
                  <Flex>
                  <Text
                    color={isEmpty(dataList.applicant) ? 'link' : 'gray'}
                    bold
                    title={dataList.first_name}
                    textStyle="ellipsis"
                    onClick={handleProfileView}
                  >
                    {dataList.first_name}
                  </Text>
                  </Flex>
                  <Flex>
                  <div
                    className={styles.svgViewStyle}
                    title={
                      !isEmpty(dataList.applicant_view)
                        ? 'Profile Viewed'
                        : 'Yet to View'
                    }
                  >
                    <SvgView
                      height={18}
                      width={18}
                      nonView={isEmpty(dataList.applicant_view)}
                    />
                  </div>
                  </Flex>
                </Flex>
                <Flex>
                {dataList.work_exp === 'Not Specified' ? (
                  <Flex row center>
                    <Text
                      size={12}
                      color="gray"
                      
                      title={dataList.location}
                    >
                      {notSpecified(dataList.location)}
                    </Text>
                    <Text size={12} color="gray" style={{ marginLeft: 2 }}>
                      |{' Not Specified'}
                    </Text>
                  </Flex>
                ) : (
                  <Flex row center>
                    <Text
                      size={12}
                      color="gray"
                    
                      title={dataList.location}
                    >
                      {notSpecified(dataList.location)}
                    </Text>
                    {/* <Text size={12} color="gray" style={{ marginLeft: 2 }}>
                      | {notSpecified(workYear(dataList.work_exp))}
                    </Text> */}
                  </Flex>
                )}
                </Flex>
                <Flex row marginTop={2}>
                  <Flex>
                <Text textStyle="ellipsis" size={12} color="gray">
                  {notSpecified(dataList.qualification)}
                </Text></Flex>
                <Flex>
                <Text size={12} color="gray" style={{ marginLeft: 2 }}>
                      | {notSpecified(workYear(dataList.work_exp))}
                    </Text>
                </Flex>
                </Flex>
              </Flex>
             </Flex>
             <Flex marginLeft={10}>
              <Flex marginTop={5} >
              <Text size={12} color="gray" className={styles.skillStyle} textStyle="ellipsis"   style={{ maxWidth: '95%' }}>
                <Text bold color="gray" size={12} textStyle="ellipsis"   style={{ maxWidth: '90%' }}>
                  Skills:{' '}
                </Text>
                {notSpecified(lowerCase(dataList.skills.replace(/,/g, ', ')))}
              </Text>
              </Flex>
             <Flex
                row
                center
                className={isEmpty(dataList.applicant) ? styles.notesFlex : styles.notesDisableFlex}
                onClick={handleNotesView}
              >
                <SvgNotesOne height={14} width={14} />
                <Text size={12} bold color={isEmpty(dataList.applicant) ? 'link' : 'gray'} style={{ marginLeft: 4 }}>
                  Notes
                </Text>
              </Flex>
             
             </Flex>
             </Flex>
             <Flex width="30%" className={styles.border}>
             <Flex className={styles.fav} marginLeft={90}>
              <div
                    title={
                      !isEmpty(dataList.fav)
                        ? 'Remove from Favourites'
                        : 'Add to Favourites'
                    }
                    onClick={() => hanldeFav(dataList.id)}
                    className="pointer"
                    tabIndex={-1}
                    role={'button'}
                    onKeyPress={() => {}}
                  >
                    <SvgHeart
                      height={18}
                      width={18}
                      filled={!isEmpty(dataList.fav)}
                    />
                  </div>
              </Flex>
             <Flex columnFlex middle center className={styles.inviteContainer}>
              {!isEmpty(dataList.interested) &&
              dataList.interested === false ? (
                <div className={cx('svgInviteNone')}>
                  <SvgInvite width={36} height={36} color="theme" />
                </div>
              ) : (
                <div
                  tabIndex={-1}
                  role={'button'}
                  onKeyPress={() => {}}
                  onClick={handleInviteView}
                  className={cx({
                    svgInvitePointer: isEmpty(dataList.applicant),
                    svgInviteNone: !isEmpty(dataList.applicant),
                  })}
                >
                  <SvgInvite width={36} height={36} color="theme" />
                </div>
              )}

              {isEmpty(dataList.invite) && (
                <Text color="gray" size={12} >
                  {!isEmpty(dataList.applicant)
                    ? 'You can’t send Invite'
                    : 'Invite to Apply'}
                </Text>
              )}

              {!isEmpty(dataList.interested) &&
              dataList.interested === false ? (
                <Text color="gray" size={12}>
                  You can’t send Invite
                </Text>
              ) : (
                <>
                  {!isEmpty(dataList.invite) && isEmpty(dataList.applicant) && (
                    <Text color="gray" size={12} style={{paddingLeft:"7px"}}>
                      Last Invited:{' '}
                      {dataList?.invite && getDateString(dataList.invite, 'll')}
                    </Text>
                  )}
                </>
              )}

              {!isEmpty(dataList.invite) && !isEmpty(dataList.applicant) && (
                <Text color="gray" size={12}>
                  You can’t send Invite
                </Text>
              )}

              {!isEmpty(dataList.interested) && isEmpty(dataList.applicant) && (
                <Flex row center>
                  <SvgInterested
                    width={22}
                    height={22}
                    fill={dataList.interested ? SUCCESS : ERROR}
                  />
                  <Text color="gray" style={{ marginLeft: 4 }}>
                    {dataList.interested ? 'Interested' : 'Not Interested'}
                  </Text>
                </Flex>
              )}

              {!isEmpty(dataList.applicant) && (
                <Flex row center>
                  <SvgAppliedIcon fill={SUCCESS} width={17} height={17} />
                  <Link target={'_parent'} to={`/applicant_pipe_line/${jobId}`}>
                    <Text
                      color="link"
                      bold
                      className={styles.appliedText}
                      onClick={handleApplicantView}
                    >
                      Applied
                    </Text>
                  </Link>
                  <div title="View the profile in Applicants Pipeline page.">
                    <SvgHelp width={16} height={16} fill={GARY_4} />
                  </div>
                </Flex>
              )}
            </Flex>
             </Flex>

          </Flex>
            </Flex>
      </Card>
    </Flex>
  );
};

export default ZitaMatchDataCard;
