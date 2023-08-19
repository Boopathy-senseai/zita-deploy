import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Drawer from '../../uikit/Drawer/Drawer';
import SvgLeft from '../../icons/SvgLeft';
import SvgshareIcon from '../../icons/SvgShareIconview';
import SvgNewTab from '../../icons/SvgNewTab';
import { GARY_3, LINK } from '../../uikit/Colors/colors';
import SvgJobselection from '../../icons/SvgJobselection';
import ZitaMatchCandidateProfileView from './ZitaMatchCandidateProfileView';
import styles from './candidatedrawer.module.css';


type Props = {
  open: boolean;
  cancel: () => void;
  jobId: string | boolean;
  candidateId: any;
  activeState: number;
};

const ZitaMatchCandidateDrawer = ({
  cancel,
  open,
  jobId,
  candidateId,
  activeState,
}: Props) => {
  const [jobtitle, setjobtitle] = useState<string>();
  const {
    jd,
  } = useSelector(
    ({
      applicantProfileInitalReducers,
    }: RootState) => {
      return {
        jd: applicantProfileInitalReducers.jd
      };
    },
  );
  return (
    <Drawer open={open}>
      <div className={styles.overAll}>
        <Flex row center between flex={1} className={styles.border}>
          <div
            className={'pointer'}
            onClick={cancel}
            tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
          >
             <SvgLeft fill={'#581845'} height={16} width={16} />
          </div>
          { jobtitle !==  undefined &&
            <Flex row>
              <Flex marginTop={2}>
                <SvgJobselection width={16} height={14} />
              </Flex>
              <Flex marginLeft={4}>
              {jd.job_title} - {jd.job_id}
              </Flex> 
              </Flex>}
          <LinkWrapper
            replace
            target={'_blank'}
            to={`/candidate_profile_view/${jobId}/${candidateId}`}
          >
            <Flex row center className={'pointer'} style={{cursor:'pointer'}}>
              <SvgshareIcon width={18} height={18} />
            </Flex>
          </LinkWrapper>
        </Flex>
        <div
          style={{
            // height: window.innerHeight - 42,
            // overflowY: "scroll",
            paddingBottom: 16,
          }}
        >
          <ZitaMatchCandidateProfileView
            jobId={jobId}
            setjobtitle={setjobtitle}
            candidateId={candidateId}
            activeState={activeState}
          />
        </div>
      </div>
    </Drawer>
  );
};

 export default ZitaMatchCandidateDrawer;
