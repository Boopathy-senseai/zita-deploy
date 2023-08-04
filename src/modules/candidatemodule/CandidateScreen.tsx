import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { inviteToApplyApi } from '../../routes/apiRoutes';
import { AppDispatch, RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { getDateString, isEmpty } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
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
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import SvgJobselection from '../../icons/SvgJobselection';
import { config, ERROR_MESSAGE, YES } from '../constValue';
import { permissionMiddleWare } from '../Login/store/middleware/loginMiddleWare';
import styles from './candidatescreen.module.css';
import CandiDateTabsLeft from './CandiDateTabsLeft';
import CandiDateTabsLeftOne from './CandiDateTabsLeftOne';
import CandiDateTabsRight from './CandiDateTabsRight';
import { candidateMessageMiddleWare } from './store/middleware/candidateMiddleWare';

var querystring = require('querystring');
type ParamsType = {
  jdId: string;
  candiId: string;
};
const CandidateScreen = () => {
  const { jdId, candiId } = useParams<ParamsType>();
  const history = useHistory();
  const [isInvitePopUp, setInvitePopUp] = useState(false);
  const [isInviteLoader, setInviteLoader] = useState(false);
  const [jobtitle, setjobtitle] = useState<string>();
  const [isTab, setTab] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [isTabValue, setTabValue] = useState(0);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const isMessage: any = query.get('isMessage');

  useEffect(() => {
    if (!isEmpty(isMessage)) {
      setTabValue(3);
    }
  }, []);
  // initial api call
  useEffect(() => {
    dispatch(permissionMiddleWare());
    if (jdId !== '0' && candiId !== '0') {
      setTab(true);
      dispatch(
        applicantProfileInitialMiddleWare({ jd_id: jdId, can_id: candiId }),
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
        dispatch(applicantNotesMiddleWare({ can_id: res.payload.can_id }));
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
    }

    if (jdId === '0' && candiId !== '0') {
      setTab(false);
      dispatch(
        applicantProfileInitialMiddleWare({ jd_id: jdId, can_id: candiId }),
      ).then((res) => {
        dispatch(applicantNotesMiddleWare({ can_id: res.payload.can_id }));
        dispatch(applicantAllMatchMiddleWare({ can_id: res.payload.can_id }));
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
    invite,
    is_plan,
  } = useSelector(
    ({
      applicantProfileInitalReducers,
      applicantMatchReducers,
      applicantStausReducers,
      permissionReducers,
    }: RootState) => {
      return {
        candidate_details: applicantProfileInitalReducers.candidate_details,
        initialLoader: applicantProfileInitalReducers.isLoading,
        jd: applicantProfileInitalReducers.jd,
        match: applicantMatchReducers.match ? applicantMatchReducers.match : [],
        jd_id: applicantProfileInitalReducers.jd_id,
        can_id: applicantProfileInitalReducers.can_id,
        invite: applicantStausReducers.invite,
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

  // open invite popup function
  const hanldeInvitePopUp = () => {
    setInvitePopUp(true);
  };
  // close invite popup function
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

  const checkMatch = match && match.length === 0 ? true : false;
  const profileMatch = checkMatch ? 0 : match[0].profile_match;

  return (
    <Flex>
      <Flex>
        <Flex row center middle flex={1} className={styles.border}>
          {/* <Flex
              className={'pointer'}
              style={{ cursor: 'pointer' }}
              // onClick={cancel}
            >
              <SvgLeft fill={'#581845'} height={16} width={16} />
            </Flex> */}
            {console.log(jd_id,'jd_idjd_idjd_idjd_idjd_id')}
          {  jd_id !== null &&
            <Flex row>
              <Flex marginTop={2}>
                <SvgJobselection width={16} height={14} />
              </Flex>
              <Flex marginLeft={4}>
                {jobtitle} - {jd_id}
              </Flex>
            </Flex>
          }
        </Flex>
      </Flex>
      {initialLoader && <Loader />}
      {isInviteLoader && <Loader />}

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
      <Flex row>
        {candidate_details &&
          candidate_details?.map((candiList, index) => {
            return (
              <Flex
                key={''}
                height={window.innerHeight}
                style={{ boxShadow: '2px 2px 2px #D7C7D2', marginRight: '5px' }}
              >
                <ProfileNavBar
                  key={index + candiList.first_name}
                  candiList={candiList}
                  isInvite={isTab}
                  inviteCall={hanldeInvitePopUp}
                  nonMatch={checkMatch}
                  setjobtitle={setjobtitle}
                  withOutJD={isTab}
                  profile_match={profileMatch}
                  jdDetails={jd}
                  isProfileName
                />
              </Flex>
            );
          })}
        <Flex flex={1} row className={styles.tabContainer}>
          {!isTab ? (
            <Flex flex={12} className={styles.tabLeftFlex}>
              <CandiDateTabsLeftOne />
            </Flex>
          ) : (
            <Flex flex={6} className={styles.tabLeftFlex}>
              <CandiDateTabsLeft activeState={isTabValue} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CandidateScreen;
