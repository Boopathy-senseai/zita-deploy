import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../store';
import Flex from '../../../uikit/Flex/Flex';
import { getFocus, isEmpty } from '../../../uikit/helper';
import Loader from '../../../uikit/Loader/Loader';
import Text from '../../../uikit/Text/Text';
import { applicantMessagesMiddleWare } from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import AppliedJobsTable from './AppliedJobsTable';
import styles from './candidatedashboardscreen.module.css';
import InvitedJobsTable from './InvitedJobsTable';
import Messages from './Messages';
import { dashBoardMiddleWare } from './store/middleware/dashboardmiddleware';
import UploadProfileCard from './UploadProfileCard';

const CandidateDashBoardScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(true);
  const [isJdId, setJdId] = useState('');
  const [isJobTitle, setJobTitle] = useState('');
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const jobId: any = query.get('jd_id');

  // initial api call for dashboard
  useEffect(() => {
    dispatch(dashBoardMiddleWare()).then((res) => {
      setLoader(false);
      if (!isEmpty(jobId)) {
        setJdId(jobId);
        dispatch(
          applicantMessagesMiddleWare({
            chatname: res.payload.chatname,
            jd_id: jobId,
          }),
        ).then(() => {
          dispatch(dashBoardMiddleWare());
        });
      }
    });
  }, []);

  // loop 5 sec once dashboard api and message api
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoader === false) {
        dispatch(dashBoardMiddleWare());
      }
      if (!isEmpty(isJdId)) {
        dispatch(applicantMessagesMiddleWare({ chatname, jd_id: isJdId })).then(
          () => {
            dispatch(dashBoardMiddleWare());
          },
        );
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isLoader, isJdId]);

  const {
    invites,
    applied_job,
    user_info,
    setting,
    chatname,
    message,
    company_detail,
    profile,
  } = useSelector(
    ({ dashboardReducers, applicantMessageReducers }: RootState) => {
      return {
        invites: dashboardReducers.invites,
        applied_job: dashboardReducers.applied_job,
        user_info: dashboardReducers.user_info,
        setting: dashboardReducers.setting,
        message: applicantMessageReducers.message,
        chatname: dashboardReducers.chatname,
        company_detail: dashboardReducers.company_detail,
        profile: dashboardReducers.profile,
      };
    },
  );

  const checkAppliedJobLength = applied_job && applied_job?.length !== 0;

  // open list chat box
  const hanldeOpenChat = (id: string) => {
    dispatch(applicantMessagesMiddleWare({ chatname, jd_id: id }));
    getFocus('message_top_bar');
    setJdId(id);
  };

  const noValue =
    applied_job && applied_job?.length === 0 && invites && invites.length === 0;
  const recruiter_id_id: any = company_detail && company_detail.recruiter_id_id;

  if (isLoader) {
    return <Loader />;
  }

  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 84}
    >
      <Text bold size={20}>
        My Dashboard
      </Text>
      <UploadProfileCard user_info={user_info} profile={profile} />
      <Flex row marginTop={40}>
        <Flex columnFlex flex={7}>
          {checkAppliedJobLength && (
            <div style={{ marginBottom: 30 }}>
              <AppliedJobsTable
                applied_job={applied_job}
                setting={setting}
                hanldeOpenChat={hanldeOpenChat}
                setJobTitle={setJobTitle}
              />
            </div>
          )}
          <InvitedJobsTable
            invites={invites}
            setting={setting}
            hanldeOpenChat={hanldeOpenChat}
            setJobTitle={setJobTitle}
          />
        </Flex>
        <Flex flex={5}>
          <Messages
            isJobTitle={isJobTitle}
            showEmptyMessgae={noValue}
            chatname={chatname}
            jd_id={isJdId}
            message={message}
            recruiter_id_id={recruiter_id_id}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CandidateDashBoardScreen;
