import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import SvgClose from '../../icons/SvgClose';
import SvgNewTab from '../../icons/SvgNewTab';
import SvgLeft from '../../icons/SvgLeft';
import SvgshareIcon from '../../icons/SvgShareIconview';
import SvgJobselection from '../../icons/SvgJobselection';
import { GARY_3, LINK } from '../../uikit/Colors/colors';
import Drawer from '../../uikit/Drawer/Drawer';
import Flex from '../../uikit/Flex/Flex';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Text from '../../uikit/Text/Text';
import { Loader } from '../../uikit';
import { applicantMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import ApplicantProfileModal from './ApplicantProfileModal';
import styles from './profileview.module.css';


type Props = {
  open: boolean;
  cancel: () => void;
  jobId: string;
  // jobtitle: string;
  candidateId: any;
  inviteIconNone?: boolean;
  activeState?: number;
};

const ProfileView = ({
  cancel,
  open,
  jobId,
  // jobtitle,
  candidateId,
  inviteIconNone,
  activeState,
}: Props) => {
  const [jobtitle, setjobtitle] = useState<string>();
  const dispatch: AppDispatch = useDispatch();
  // useEffect(()=>{
  //   if(Number(jobId) !== 0){
  // dispatch(
  //   applicantMatchMiddleWare({
  //     jd_id: Number(jobId),
  //     can_id: candidateId,
  //   }),
  // );}},[])
  return (
    <Drawer open={open}>
      <div className={styles.overAll}>
        <Flex row center between flex={1} className={styles.border}>
          <Flex
            className={'pointer'}
            style={{ cursor: 'pointer' }}
            onClick={cancel}
          >
            <SvgLeft fill={'#581845'} height={16} width={16} />
          </Flex> 
           {jobtitle !==  undefined && 
            <Flex row>
              <Flex marginTop={2}>
                <SvgJobselection width={16} height={14} />
              </Flex>
              <Flex marginLeft={4}>
                {jobtitle} - {jobId}
              </Flex>
            </Flex>
          }
          <LinkWrapper
            target={'_blank'}
            to={`/applicant_profile_view/${jobId}/${candidateId}`}
          >
            <Flex
              row
              center
              className={'pointer'}
              style={{ cursor: 'pointer' }}
              marginTop={1}
            >
              {/* <Text color="link" className={styles.openStyle}>
                Open profile in a new window
              </Text> */}
              <SvgshareIcon width={18} height={18} />
            </Flex>
          </LinkWrapper>
        </Flex>
        {/* <div className={styles.middle}></div> */}
        <div
          style={{
            paddingBottom: 16,
          }}
        >
          <ApplicantProfileModal
            setjobtitle={setjobtitle}
            jobId={jobId}
            candidateId={candidateId}
            inviteIconNone={inviteIconNone}
            activeState={activeState}
          />
        </div>
      </div>
    </Drawer>
  );
};
export default ProfileView;
 