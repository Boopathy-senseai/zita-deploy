import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inviteToApplyApi } from '../../routes/apiRoutes';
import { AppDispatch, RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Toast from '../../uikit/Toast/Toast';
import ProfileNavBar from '../applicantprofilemodule/ProfileNavBar';
import {
  applicantAllMatchMiddleWare,
  applicantMatchMiddleWare,
  applicantNotesMiddleWare,
  applicantProfileInitialMiddleWare,
  applicantScoreMiddleWare,
  applicantStatusMiddleWare,
  messagesTemplatesMiddleWare,
} from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import CandiDateTabsLeft from '../candidatemodule/CandiDateTabsLeft';
import CandiDateTabsRight from '../candidatemodule/CandiDateTabsRight';
import { candidateMessageMiddleWare } from '../candidatemodule/store/middleware/candidateMiddleWare';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import { config, ERROR_MESSAGE, YES } from '../constValue';
import styles from '../candidatemodule/candidatescreen.module.css';
import CandiDateTabsLeftOne from '../candidatemodule/CandiDateTabsLeftOne';
import Text from '../../uikit/Text/Text';

var querystring = require('querystring');

type Props = {
  jobId: string | boolean;
  candidateId: string;
  activeState: number;
  setjobtitle?: any;
};

const ZitaMatchCandidateProfileView = ({
  jobId,
  candidateId,
  activeState,
  setjobtitle
}: Props) => {
  const [isInvitePopUp, setInvitePopUp] = useState(false);
  const [isInviteLoader, setInviteLoader] = useState(false);
  const [isTab, setTab] = useState(false);
  const [isNotesLoader, setNotesLoader] = useState(true);
  const [isoverall, setisoverall] = useState<any>(0);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (jobId !== '0') {
      setTab(true);
      dispatch(
        applicantProfileInitialMiddleWare({
          jd_id: jobId.toString(),
          can_id: candidateId,
        }),
      ).then((res) => {
        dispatch(
          applicantMatchMiddleWare({
            jd_id: res.payload.jd_id,
            can_id: res.payload.can_id,
          }),
        );
        dispatch(
          candidateMessageMiddleWare({
            jd_id: res.payload.jd_id,
            can_id: res.payload.can_id,
          }),
        );
        dispatch(messagesTemplatesMiddleWare());
        dispatch(applicantNotesMiddleWare({ can_id: res.payload.can_id })).then(
          () => {
            setNotesLoader(false);
          },
        );
        dispatch(applicantAllMatchMiddleWare({ can_id: res.payload.can_id }));
        dispatch(
          applicantScoreMiddleWare({
            jd_id: res.payload.jd_id,
            can_id: res.payload.can_id,
          }),
        );
        dispatch(
          applicantStatusMiddleWare({
            jd_id: res.payload.jd_id,
            can_id: res.payload.can_id,
          }),
        );
      });
    } else {
      setTab(false);
      dispatch(
        applicantProfileInitialMiddleWare({
          jd_id: jobId,
          can_id: candidateId,
        }),
      ).then((res) => {
        dispatch(applicantNotesMiddleWare({ can_id: res.payload.can_id })).then(
          () => {
            setNotesLoader(false);
          },
        );
        dispatch(applicantAllMatchMiddleWare({ can_id: res.payload.can_id }));
      });
    }
    // eslint-disable-next-line
  }, []);

  const { candidate_details, initialLoader, jd, match, jd_id, can_id, invite, matchLoader, job_details } =
    useSelector(
      ({
        applicantProfileInitalReducers,
        applicantMatchReducers,
        applicantStausReducers,
        candidatejdmatchReducers,
        applicantPipeLineReducers
      }: RootState) => {
        return {
          candidate_details: applicantProfileInitalReducers.candidate_details,
          initialLoader: applicantProfileInitalReducers.isLoading,
          jd: applicantProfileInitalReducers.jd,
          job_details: applicantPipeLineReducers.job_details,
          matchLoader: candidatejdmatchReducers.isLoading,
          match: applicantMatchReducers.match
            ? applicantMatchReducers.match
            : [],
          jd_id: applicantProfileInitalReducers.jd_id,
          can_id: applicantProfileInitalReducers.can_id,
          invite: applicantStausReducers.invite,
        };
      },
    );
  const hanldeInvitePopUp = () => {
    setInvitePopUp(true);
  };
  //Updating overall percentage
  const updatr_overall = (val) => {
    setisoverall(val)
  }
  const hanldeInviteClosePopUp = () => {
    setInvitePopUp(false);
  };
  const hanldeInvite = () => {
    hanldeInviteClosePopUp();
    alert("alert1")
    setInviteLoader(true);
    const data = querystring.stringify({
      jd_id,
      candi_id: can_id,
    });
    axios
      .post(inviteToApplyApi, data, config)
      .then(() => {
        setInviteLoader(false);

        Toast('Candidate invited successfully');
        dispatch(
          applicantStatusMiddleWare({
            jd_id,
            can_id,
          }),
        );
      })
      .catch(() => {
        setInviteLoader(false);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  const checkMatch = match && match?.length === 0 ? true : false;
  const profileMatch = checkMatch ? 0 : match[0].profile_match;
  if (initialLoader || isNotesLoader || matchLoader) {
    return (
      <Flex height={window.innerHeight - 60} center middle>
        <Loader withOutOverlay />
      </Flex>
    );
  }
  return (
    <Flex>
      {/* {isInviteLoader && <Loader />} */}

      {invite && invite.length === 0 && (
        <CancelAndDeletePopup
          title={`Invite will be sent as an email to ${candidate_details && candidate_details[0].first_name
            }. Are you sure to proceed?`}
          btnDelete={hanldeInvite}
          btnCancel={hanldeInviteClosePopUp}
          btnRight={YES}
          open={isInvitePopUp}
        />
      )}
      {invite && invite.length !== 0 && (
        <CancelAndDeletePopup
          title={
            <Flex className={styles.popTitle}>
              <Text>{`The candidate ${candidate_details && candidate_details[0].first_name
                } has already been invited for this job on ${getDateString(
                  invite[invite.length - 1].created_at,
                  'll',
                )}.`}</Text>
              <Text>Do you wish to invite again?</Text>
            </Flex>
          }
          btnDelete={hanldeInvite}
          btnCancel={hanldeInviteClosePopUp}
          btnRight={YES}
          open={isInvitePopUp}
        />
      )}

      <Flex flex={1} row className={styles.tabContainer}>
        {candidate_details &&
          candidate_details?.map((candiList, index) => {
            return (
              <Flex key={''} height={window.innerHeight} style={{ boxShadow: '2px 2px 2px #D7C7D2', marginRight: '5px' }}>
                <ProfileNavBar
                  key={index + candiList.first_name}
                  candiList={candiList}
                  isInvite={isTab}
                  inviteCall={hanldeInvitePopUp}
                  nonMatch={checkMatch}
                  applieddatecheck={true}
                  setjobtitle={setjobtitle}
                  withOutJD={isTab}
                  profile_match={profileMatch}
                  jdDetails={jd}
                  isProfileName
                  updatr_overall={updatr_overall}
                  isoverall={isoverall}
                />
              </Flex>
            );
          })}
        {!isTab ? (
          <Flex flex={12} className={styles.tabLeftFlex}>
            <CandiDateTabsLeftOne activeState={activeState} />
          </Flex>
        ) : (
          <Flex flex={6} className={styles.tabLeftFlex} >
            <CandiDateTabsLeft activeState={activeState} updatr_overall={updatr_overall} />
          </Flex>
        )}

        {/* {isTab && (
          <Flex flex={6} className={styles.tabRightFlex}>
            <CandiDateTabsRight />
          </Flex>
        )} */}
      </Flex>
    </Flex>
  );
};

export default ZitaMatchCandidateProfileView;
