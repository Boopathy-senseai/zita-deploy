import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import SvgAppliedIcon from '../../icons/SvgAppliedIcon';
import SvgHelp from '../../icons/SvgHelp';
import SvgInterested from '../../icons/SvgInterested';
import SvgInvite from '../../icons/SvgInvite';
import SvgNotInterested from '../../icons/SvgNotInterested';
import { ERROR, GARY_4, SUCCESS } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { getDateString, isEmpty } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import styles from './invitecontainer.module.css';
import { DataEntity } from './myDataBaseTypes';

const cx = classNames.bind(styles);

type Props = {
  inviteDisable?: boolean;
  dataList: DataEntity;
  jobId: string | boolean;
  handleInviteView: () => void;
  handleApplicantView: () => void;
};

const sidebar=sessionStorage.getItem("EmpToggle");
const size=sidebar==="1"

const InviteContainer = ({
  inviteDisable,
  dataList,
  jobId,
  handleInviteView,
  handleApplicantView,
}: Props) => {
  return (
    <Flex columnFlex center middle className={styles.invitetoapplybutton}
      >
      {inviteDisable ? (
        <>
        {/* <div
          style={{width:'2px',height:'10px',color:'black'}}></div> */}
          {console.log("jjjjdjdjdjdjdjdj",(dataList))}
          <div
            title="Invite to Apply"
            className={cx('inviteStyle', { inviteDisable })}
          >
            <div>
            <SvgInvite width={28} height={28} />
            </div>
          </div>
          <Text  
          title="Please choose a job title to invite the candidate"
          color="black_1" size={11}
          className={styles.invitetext}>
            Invite to Apply
          </Text>
        </>
      ) : (
        <>
          {dataList.not_interested === false ? (
            <div 
            className={cx({
              svgnointerested: dataList.not_interested === false,
            })}
            title="Invite to Apply">
              <SvgInvite width={28} height={28} color="theme" />
            </div>
          ) : (
            <div
              tabIndex={-1}
              role={'button'}
              onKeyPress={() => {}}
              onClick={handleInviteView}
              className={cx({
                svgInvitePointer: isEmpty(dataList.applicant),
                svgInviteapplied: !isEmpty(dataList.applicant)
              })}
              title="Invite to Apply"
            >
              <SvgInvite width={28} height={28} color="theme" />
            </div>
          )}



          {isEmpty(dataList.invite) ? (
            <Text 
              color="black_1" size={11} 
              className={styles.invitebutton}>
              {!isEmpty(dataList.applicant)
                ? ''
                : 'Invite to Apply'}
            </Text>
          ): !isEmpty(dataList.invite) && !isEmpty(dataList.applicant) && (
            <Text color="gray" size={11}>
              {/* You can’t send Invite */}
            </Text>
          )}

          {!isEmpty(dataList.interested) === true ? (
            <Text color="gray" size={11}>
              {/* You can’t send Invite */}
            </Text>
          ) : (
            <>
              {!isEmpty(dataList.invite) && isEmpty(dataList.not_interested) && (
                <Flex className={styles.lastinviteset}>
                <Text 
                color="gray" size={11}
                className={cx({
                  nolastinvitetext: !isEmpty(dataList.applicant),
                  lastinvitetext: isEmpty(dataList.applicant)
                })}
                >
                  Last Invited 
                </Text>
                <Text 
                  className={cx({
                  nolastinvitetext: !isEmpty(dataList.applicant),
                  lastinvitetext: isEmpty(dataList.applicant)
                })} color="gray" size={11} style={{position:"relative", right: "4px"}} >
                {' '}{dataList?.invite && getDateString(dataList.invite, 'll')}
                </Text>
                </Flex>
              )}
          {!isEmpty(dataList.interested) && dataList.interested === true && (
            <Flex>
               <Text 
                color="gray" size={11} className={styles.lastinvitetext}>
                  Last Invited 
                </Text>
                <Text color="gray" size={11}>
                  {' '}{dataList?.invite && getDateString(dataList.invite, 'll')}
                  </Text>
            </Flex>
          )}
        </>
          )}
          {!isEmpty(dataList.applicant) ? (
            <Flex row center className={styles.applied}>
              <div className={styles.svgapplied}>
                <SvgAppliedIcon fill={SUCCESS} width={17} height={17} />
                </div>
              <Link target={'_blank'} to={`/applicant_pipe_line/${jobId}`}>
                <div>
                <Text
                  title="You can't send invite"
                  color="link"
                  bold
                  className={styles.appliedText}
                  onClick={handleApplicantView}
                >
                  Applied
                </Text>
                </div>
              </Link>
              <div title="View the profile in Applicants Pipeline page." style={{marginRight:"-20px"}}>
                <SvgHelp width={16} height={16} fill={GARY_4} />
              </div>
            </Flex>
          ):(
            dataList.interested === true ? (
              <Flex row center
              className={styles.interestedrow}>
              <SvgInterested
                width={18}
                height={18}
              />
              <Text
                title={`Last Invited: ${dataList?.invite && getDateString(dataList.invite, 'll')}`}
                className={styles.interestedtext}>
                Interested
              </Text>
            </Flex>
            
          ) : (dataList.not_interested === false && (
              <Flex row center title='You can’t send Invite' className={styles.notinterested}>
                <Flex className={styles.svgnoticon}>
                  <SvgNotInterested width={20} height={20}/>
                  </Flex>
              <Text
                className={styles.notinterestedtext}>
                {!dataList.interested ? 'Not Interested' : ''}
              </Text>
              </Flex>
                )

          ))}
        </>
      )}
    </Flex>
  );
};

export default InviteContainer;
