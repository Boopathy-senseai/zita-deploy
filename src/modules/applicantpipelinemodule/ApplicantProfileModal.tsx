import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import { inviteToApplyApi } from '../../routes/apiRoutes';
import { config, ERROR_MESSAGE, YES } from '../constValue';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import Toast from '../../uikit/Toast/Toast';
import { AppDispatch, RootState } from '../../store';
import {
  CandidatejobidMatchMiddleWare,
  applicantAllMatchMiddleWare,
  applicantMatchMiddleWare,
  applicantNotesMiddleWare,
  applicantProfileInitialMiddleWare,
  applicantScoreMiddleWare,
  applicantStatusMiddleWare,
  calenderMiddleWare,
  messagesTemplatesMiddleWare,
} from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { getDateString } from '../../uikit/helper';
import ApplicantTabLeft from '../applicantprofilemodule/ApplicantTabLeft';
import ApplicantTabRight from '../applicantprofilemodule/ApplicantTabRight';
import ProfileNavBar from '../applicantprofilemodule/ProfileNavBar';
import ApplicantTabLeftOne from '../applicantprofilemodule/ApplicantTabLeftOne';
import ApplicantTabLeftTwo from '../applicantprofilemodule/ApplicantTabLeftTwo';
import ApplicantTabRightOne from '../applicantprofilemodule/ApplicantTabRightOne';
import styles from '../applicantprofilemodule/applicantprofilescreen.module.css';
import Text from '../../uikit/Text/Text';
import { interviewQuestionMiddleware } from '../applicantprofilemodule/store/middleware/interviewquestionMiddleware';

var querystring = require('querystring');

type Props = {
  jobId: string;
  candidateId: string;
  inviteIconNone?: boolean;
  activeState?: number;
  setjobtitle?: any;
};
const ApplicantProfileModal = ({
  jobId,
  candidateId,
  inviteIconNone,
  activeState,
  setjobtitle,
}: Props) => {
  const [isInvitePopUp, setInvitePopUp] = useState(false);
  const [isTab, setTab] = useState(false);
  const [isInviteLoader, setInviteLoader] = useState(false);
  const [isNotesLoader, setNotesLoader] = useState(true);
  const [isNotesMeeting, setNotesMeeting] = useState(true)
  const [isoverall, setisoverall] = useState<any>(0);
  const dispatch: AppDispatch = useDispatch();

  //Updating overall percentage
  const updatr_overall = (val) => {
    setisoverall(val)
  }
  // initial api call
  useEffect(() => {
    if (jobId !== '0') {
      setTab(true);
      dispatch(
        applicantProfileInitialMiddleWare({
          jd_id: jobId,
          can_id: candidateId,
        }),
      ).then((res) => {
        dispatch(
          CandidatejobidMatchMiddleWare({
            jd_id: res.payload.jd_id,
            can_id: res.payload.can_id,
          }),
        );
        dispatch(applicantNotesMiddleWare({ can_id: res.payload.can_id })).then(() => {
          setNotesLoader(false);
        }
        )
        dispatch(applicantAllMatchMiddleWare({ can_id: res.payload.can_id }));
        dispatch(
          applicantScoreMiddleWare({
            jd_id: res.payload.jd_id,
            can_id: res.payload.can_id,
          }),
        );
        dispatch(messagesTemplatesMiddleWare());
        dispatch(calenderMiddleWare({ can_id: res.payload.can_id })).then((res1) => {
          if (res1.payload.even !== null) {
            setNotesMeeting(false)
          }
        })
        dispatch(
          applicantStatusMiddleWare({
            jd_id: res.payload.jd_id,
            can_id: res.payload.can_id,
          }),
        );
      });
    } else if (jobId === '0') {
      setTab(false);
      dispatch(
        applicantProfileInitialMiddleWare({ jd_id: 0, can_id: candidateId }),
      ).then((res) => {
        dispatch(applicantNotesMiddleWare({ can_id: res.payload.can_id })).then(() => {
          setNotesLoader(false);
        }
        )
        dispatch(applicantAllMatchMiddleWare({ can_id: res.payload.can_id }));
        dispatch(calenderMiddleWare({ can_id: res.payload.can_id })).then(() => {
          setNotesMeeting(false)
        })
      });
    }
  }, []);

  const {
    candidate_details,
    initialLoader,
    personalInfo,
    jd,
    match,
    jd_id,
    can_id,
    status_id,
    invite,
    job_details,
    source,
    stages,
    matchLoader,
  } = useSelector(
    ({
      applicantProfileInitalReducers,
      applicantMatchReducers,
      applicantStausReducers,
      candidatejdmatchReducers,
      applicantPipeLineReducers,
    }: RootState) => {
      return {
        candidate_details: applicantProfileInitalReducers.candidate_details,
        personalInfo: applicantProfileInitalReducers.personalInfo,
        initialLoader: applicantProfileInitalReducers.isLoading,
        jd: applicantProfileInitalReducers.jd,
        match: applicantMatchReducers.match ? applicantMatchReducers.match : [],
        jd_id: applicantProfileInitalReducers.jd_id,
        job_details: applicantPipeLineReducers.job_details,
        can_id: applicantProfileInitalReducers.can_id,
        matchLoader: candidatejdmatchReducers.isLoading,
        status_id: applicantProfileInitalReducers.status_id,
        invite: applicantStausReducers.invite,
        source: applicantProfileInitalReducers.source,
        stages: applicantStausReducers?.stages,
      };
    },
  );
  useEffect(() => {
    if (jd_id && can_id) {
      dispatch(interviewQuestionMiddleware({ jd_id, can_id })).then((res) => {
        if (res.payload.success === false) {
          Toast(
            'Sorry, there was a problem connecting to the API. Please try again later.',
            'LONG',
            'error',
          )
        }
      })
    }
  }, [jd_id, can_id]);
  if (initialLoader || matchLoader) {
    return (
      <Flex height={window.innerHeight - 60} center middle>
        <Loader />
      </Flex>
    );
  }
  const checkMatch = match && match.length === 0 ? true : false;
  const profileMatch = checkMatch ? 0 : match[0].profile_match;

  const hanldeInvitePopUp = () => {
    setInvitePopUp(true);
  };

  const hanldeInviteClosePopUp = () => {
    setInvitePopUp(false);
  };

  // invite api call function
  const hanldeInvite = () => {
    hanldeInviteClosePopUp();
    setInviteLoader(true);
    const data = querystring.stringify({
      jd_id,
      candi_id: can_id,
    });
    axios
      .post(inviteToApplyApi, data, config)
      .then(() => {
        setInviteLoader(false);
        Toast('Applicant invited successfully');
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
  return (
    <div>
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
      <Flex row className={styles.tabContainer}>
        <Flex height={window.innerHeight} style={{ boxShadow: '2px 2px 2px #D7C7D2', marginRight: '5px' }}>
          {candidate_details &&
            candidate_details?.map((candiList, index) => {
              return (
                <ProfileNavBar
                  key={index + candiList.first_name}
                  candiList={candiList}
                  jdDetails={jd}
                  setjobtitle={setjobtitle}
                  applieddatecheck={isTab && stages.length === 0 ? true : false}
                  availableity={isTab && stages.length !== 0 ? false : true}
                  profile_match={profileMatch}
                  nonMatch={checkMatch}
                  inviteCall={hanldeInvitePopUp}
                  isResume
                  withOutJD={isTab}
                  source={source}
                  inviteIconNone={inviteIconNone}
                  isoverall={isoverall}
                  updatr_overall={updatr_overall}
                />
              );
            })}
        </Flex>
        {!isTab ? (
          <Flex flex={12} className={styles.tabLeftFlex} marginTop={10}>
            <ApplicantTabLeftOne activeState={activeState} updatr_overall={updatr_overall} />
          </Flex>
        ) : (
          <Flex flex={7} className={styles.tabLeftFlex} marginTop={10}>
            {stages.length === 0 ? (
              <ApplicantTabLeftTwo activeState={activeState} updatr_overall={updatr_overall} />
            ) : (
              <ApplicantTabLeft activeState={activeState} updatr_overall={updatr_overall} />
            )}
          </Flex>
        )}

        {/* {isTab && (
          <Flex flex={5} className={styles.tabRightFlex}>
            {status_id?.length === 0 ? (
              <ApplicantTabRightOne />
            ) : (
              <ApplicantTabRight />
            )}
          </Flex>
        )} */}
      </Flex>
    </div>
  );
};

export default ApplicantProfileModal;
