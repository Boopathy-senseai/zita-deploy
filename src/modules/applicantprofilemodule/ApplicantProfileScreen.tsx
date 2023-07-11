import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../uikit/Loader/Loader';
import Flex from '../../uikit/Flex/Flex';
import Toast from '../../uikit/Toast/Toast';
import { getDateString, isEmpty } from '../../uikit/helper';
import { AppDispatch, RootState } from '../../store';
import { inviteToApplyApi } from '../../routes/apiRoutes';
import Text from '../../uikit/Text/Text';
import { permissionMiddleWare } from '../Login/store/middleware/loginMiddleWare';
import { config, ERROR_MESSAGE, YES } from '../constValue';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import ProfileNavBar from './ProfileNavBar';
import ApplicantTabLeft from './ApplicantTabLeft';
import ApplicantTabRight from './ApplicantTabRight';
import {
  applicantAllMatchMiddleWare,
  applicantMatchMiddleWare,
  applicantNotesMiddleWare,
  applicantProfileInitialMiddleWare,
  applicantScoreMiddleWare,
  applicantStatusMiddleWare,
  calenderMiddleWare,
  messagesTemplatesMiddleWare,
} from './store/middleware/applicantProfileMiddleware';
import ApplicantTabRightOne from './ApplicantTabRightOne';
import ApplicantTabLeftOne from './ApplicantTabLeftOne';
import ApplicantTabLeftTwo from './ApplicantTabLeftTwo';
import styles from './applicantprofilescreen.module.css';

var querystring = require('querystring');
type ParamsType = {
  jdId: string;
  candiId: string;
};
const ApplicantProfileScreen = () => {
  const { jdId, candiId } = useParams<ParamsType>();
  const history = useHistory();
  const [isInvitePopUp, setInvitePopUp] = useState(false);
  const [isTab, setTab] = useState(false);
  const [isInviteLoader, setInviteLoader] = useState(false);
  const [isLoader, setLoader] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const [isTabValue, setTabValue] = useState(0);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const isMessage: any = query.get('isMessage');

  useEffect(() => {
    if (!isEmpty(isMessage)) {
      setTabValue(5);
    }
  }, []);

  // initial api call
  useEffect(() => {
    dispatch(permissionMiddleWare())
    if (jdId !== '0' && candiId !== '0') {
      setTab(true);
      dispatch(
        applicantProfileInitialMiddleWare({ jd_id: jdId, can_id: candiId }),
      )
        .then((res) => {
          dispatch(
            applicantMatchMiddleWare({
              jd_id: res.payload.jd_id,
              can_id: res.payload.can_id,
            }),
          );
          dispatch(applicantNotesMiddleWare({ can_id: res.payload.can_id }));
          dispatch(applicantAllMatchMiddleWare({ can_id: res.payload.can_id }));
          dispatch(
            applicantScoreMiddleWare({
              jd_id: res.payload.jd_id,
              can_id: res.payload.can_id,
            }),
          );
          dispatch(messagesTemplatesMiddleWare());
          dispatch(calenderMiddleWare({ can_id: res.payload.can_id }));
          dispatch(
            applicantStatusMiddleWare({
              jd_id: res.payload.jd_id,
              can_id: res.payload.can_id,
            }),
          );
        })
        .then(() => {
          setLoader(false);
        });
    }
    if (jdId === '0' && candiId !== '0') {
      setTab(false);
      dispatch(
        applicantProfileInitialMiddleWare({ jd_id: jdId, can_id: candiId }),
      )
        .then((res) => {
          dispatch(applicantNotesMiddleWare({ can_id: res.payload.can_id }));
          dispatch(applicantAllMatchMiddleWare({ can_id: res.payload.can_id }));
          dispatch(calenderMiddleWare({ can_id: res.payload.can_id }));
        })
        .then(() => {
          setLoader(false);
        });
    }
  }, []);

  const {
    candidate_details,
    initialLoader,
    jd,
    match,
    jd_id,
    can_id,
    matchLoader,
    notesLoader,
    status_id,
    invite,
    source,
    is_plan
  } = useSelector(
    ({
      applicantProfileInitalReducers,
      applicantMatchReducers,
      applicantNotesReducers,
      applicantStausReducers,
      permissionReducers
    }: RootState) => {
      return {
        candidate_details: applicantProfileInitalReducers.candidate_details,
        initialLoader: applicantProfileInitalReducers.isLoading,
        jd: applicantProfileInitalReducers.jd,
        match: applicantMatchReducers.match ? applicantMatchReducers.match : [],
        jd_id: applicantProfileInitalReducers.jd_id,
        can_id: applicantProfileInitalReducers.can_id,
        matchLoader: applicantMatchReducers.isLoading,
        notesLoader: applicantNotesReducers.isLoading,
        status_id: applicantProfileInitalReducers.status_id,
        invite: applicantStausReducers.invite,
        source: applicantProfileInitalReducers.source,
        is_plan: permissionReducers.is_plan,
      };
    },
  );
  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });
  
  const checkMatch = match && match.length === 0 ? true : false;
  const profileMatch = checkMatch ? 0 : match[0].profile_match;

// invite popup open function
  const hanldeInvitePopUp = () => {
    setInvitePopUp(true);
  };
// invite popup close function
  const hanldeInviteClosePopUp = () => {
    setInvitePopUp(false);
  };
// invite submit function
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
        dispatch(applicantAllMatchMiddleWare({ can_id }));
      })
      .catch(() => {
        setInviteLoader(false);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  if (isLoader) {
    return <Loader />;
  }
  return (
    <div>
      {(initialLoader || matchLoader || notesLoader || isInviteLoader) && (
        <Loader />
      )}

      {invite && invite.length === 0 && (
        <CancelAndDeletePopup
          title={`Invite will be sent as an email to ${
            candidate_details && candidate_details[0].first_name
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
              <Text>{`The candidate ${
                candidate_details && candidate_details[0].first_name
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
      {candidate_details &&
        candidate_details?.map((candiList, index) => {
          return (
            <ProfileNavBar
              key={index + candiList.first_name}
              candiList={candiList}
              jdDetails={jd}
              profile_match={profileMatch}
              nonMatch={checkMatch}
              inviteCall={hanldeInvitePopUp}
              isInvite={status_id.length === 0}
              isResume
              withOutJD={isTab}
              source={source}
            />
          );
        })}
      <Flex flex={1} row className={styles.tabContainer}>
        {!isTab ? (
          <Flex flex={12} className={styles.tabLeftFlex}>
            <ApplicantTabLeftOne />
          </Flex>
        ) : (
          <Flex flex={7} className={styles.tabLeftFlex}>
            {status_id.length === 0 ? (
              <ApplicantTabLeftTwo activeState={isTabValue} />
            ) : (
              <ApplicantTabLeft activeState={isTabValue} />
            )}
          </Flex>
        )}

         {/* {isTab && (
          <Flex flex={5} className={styles.tabRightFlex}>
            {status_id.length === 0 ? (
              <ApplicantTabRightOne />
            ) : (
              <ApplicantTabRight />
            )}
          </Flex>
        )}  */}
      </Flex>
    </div>
  );
};

export default ApplicantProfileScreen;
