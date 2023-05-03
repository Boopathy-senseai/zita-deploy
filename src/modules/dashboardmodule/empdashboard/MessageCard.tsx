import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SvgChat from '../../../icons/SvgChat';
import SvgMessagechat from '../../../icons/SvgMessagechat';
import SvgMessageIcon from '../../../icons/SvgMessageIcon';
import SvgNomessage from '../../../icons/SvgNomessage';
import SvgMessage from '../../../icons/SvgMessage';
import { RootState } from '../../../store';
import Card from '../../../uikit/Card/Card';
import { PRIMARY } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import ProfileView from '../../applicantpipelinemodule/ProfileView';
import { mediaPath } from '../../constValue';
// import ZitaMatchCandidateDrawer from '../../zitamatchcandidatemodule/ZitaMatchCandidateDrawer';
import { MessageEntity } from './DashBoardTypes';
import styles from './messagecard.module.css';

const MessageCard = () => {
  const [isJd, setJd] = useState<any>('0');
  const [isCandi, setCandi] = useState<any>();
  const [isApplicantProfile, setApplicantProfile] = useState(false);
  // const [isCandidateProfile, setCandidateProfile] = useState(false);

  const { message, message_count } = useSelector(
    ({ dashboardEmpMessageReducers }: RootState) => {
      return {
        message: dashboardEmpMessageReducers.message,
        message_count: dashboardEmpMessageReducers.message_count,
      };
    },
  );

  const unique: MessageEntity[] = [];
    message.map((x) =>
      unique.filter((a: any) => a.jd === x.jd).length > 0
        ? null
        : unique.push(x),
    );


  return (
    <Card className={styles.overAll}>
      <ProfileView
        open={isApplicantProfile}
        cancel={() => {
          setApplicantProfile(false);
        }}
        jobId={isJd}
        candidateId={isCandi}
        inviteIconNone
        activeState={5}
      />
      {/* <ZitaMatchCandidateDrawer
        activeState={5}
        open={isCandidateProfile}
        cancel={() => {
          setCandidateProfile(false);
        }}
        jobId={isJd}
        candidateId={isCandi}
      /> */}
      <Flex row center className={styles.msgText} between>
        
        <Text bold size={16} color="theme" style={{ marginRight: 16 }}>
          Messages
        </Text>
        
        <Flex>
        <div style={{ position: 'relative' }}>
          {message_count !== 0 && (
            <div className={styles.countStyle}>
              <Text color="white" style={{ fontSize: 8 }}>
                {message_count}
              </Text>
            </div>
          )}
        </div>
      <SvgMessageIcon width={16} height={16} /></Flex>
      </Flex>
      <Flex marginLeft={5} marginRight={5} className={styles.line} >

      </Flex>

      <Flex columnFlex className={styles.scrollStyle}>
        {message.length === 0 ? (
          <Flex columnFlex flex={1} center middle className={styles.noContent}>
            {/* <SvgMessagechat fill={"#581845"}> </SvgMessagechat> */}
            <SvgNomessage/>
            
            
            <Text color="gray">No Messages Received</Text>
          </Flex>
        ) : (
          unique && unique
            .map((list, index) => (
              <Flex className={styles.borderbottom}
                key={list.first_name + index}
                
              >
                <Flex row between>
                  <Flex row>
                    <img
                      style={{ objectFit: 'contain' }}
                      src={mediaPath + list.profile_pic}
                      alt="profile"
                      className={styles.profileStyle}
                    />
                    <Flex>
                      {list.can_source === 'applicant' ? (
                        <Text style={{color:'#581845',marginLeft:7}}
                          onClick={() => {
                            setJd(list.jd_id_id);
                            setCandi(list.can_id);
                            setApplicantProfile(true);
                          }}
                          color="link"
                          bold
                        >
                          {list.first_name} {list.last_name}
                        </Text>
                      ) : (
                        <Text
                          onClick={() => {
                            setJd(list.jd_id_id);
                            setCandi(list.can_id);
                            setApplicantProfile(true);
                          }}
                          color="link"
                          bold
                          style={{color:'#581845',marginLeft:7}}
                        >
                          {list.first_name} {list.last_name}
                        </Text>
                      )}

                      <Text style={{ marginLeft:7}} className={styles.messagesizereducer}>{list.message}</Text>
                    </Flex>
                  </Flex>
                  <Text>{moment(list.date_created).fromNow()}</Text>
                </Flex>
              </Flex>
            ))
            .reverse()
        )}
      </Flex>
    </Card>
  );
};

export default MessageCard;
