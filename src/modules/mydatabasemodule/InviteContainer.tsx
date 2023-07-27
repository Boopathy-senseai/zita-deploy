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
      {console.log("VP",dataList.interested)}
      {inviteDisable ? (
        <>
        <div
          style={{width:'2px',height:'10px',color:'black'}}></div>
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
          {!isEmpty(dataList.interested) && dataList.interested === false ? (
            <div 
            className={cx({
              svgnointerested: !isEmpty(dataList.interested)
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
                // svgInviteNone: !isEmpty(dataList.applicant),
                svgInviteapplied: !isEmpty(dataList.applicant)
              })}
              title="Invite to Apply"
            >
              <SvgInvite width={28} height={28} color="theme" />
            </div>
          )}
          {/* {!isEmpty(dataList.applicant) &&
                    <div>
                      <SvgInvite width={28} height={28} color="theme" />
                    </div>
          } */}
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
              {!isEmpty(dataList.invite) && isEmpty(dataList.applicant) && (
                <Text 
                color="gray" size={11} className={styles.lastinvitetext}>
                  Last Invited:{' '}
                  {dataList?.invite && getDateString(dataList.invite, 'll')}
                </Text>
              )}
          {!isEmpty(dataList.interested) && dataList.interested === true ? (
            <Flex row center>
               <Text 
                color="gray" size={11} className={styles.lastinvitetext}>
                  Last Invited:{' '}
                  {dataList?.invite && getDateString(dataList.invite, 'll')}
                </Text>
          </Flex>
          ):(
            <div></div>
          )}
            </>
          )}

{/* {!isEmpty(dataList.invite) && !isEmpty(dataList.applicant) && (
            <Text color="gray" size={12}>
              You can’t send Invite
            </Text>
          )} */}

          {/* {!isEmpty(dataList.interested) && isEmpty(dataList.applicant) && (
            <Flex row center>
              <SvgInterested
                width={22}
                height={22}
                fill={dataList.interested ? ERROR : SUCCESS}
              />
              <Text color="gray" style={{ marginLeft: 4 }}>
                {dataList.interested ? 'Interested' : 'Not Interested'}
              </Text>
            </Flex>
          )} */}

            {/* {!isEmpty(dataList.interested) && isEmpty(dataList.applicant) && (
            <Flex row center>
              <SvgNotInterested
                width={22}
                height={22}
              />
              <Text color="gray" style={{ marginLeft: 4 }}>
                {dataList.interested ? 'Not Interested' : ''}
              </Text>
            </Flex>
          )} */}

          {!isEmpty(dataList.interested) && dataList.interested === true ? (
            <Flex row center
            className={styles.interestedrow}>
            <SvgInterested
              width={22}
              height={22}
              // fill={dataList.interested ? SUCCESS : ERROR}
            />
            <Text
              title={`Last Invited: ${dataList?.invite && getDateString(dataList.invite, 'll')}`}
              className={styles.interestedtext}>
              Interested
            </Text>
          </Flex>
          ) : (
            <>
            {!isEmpty(dataList.interested) && isEmpty(dataList.applicant) && (
            <Flex row center title='You can’t send Invite' className={styles.notinterested}>
              <SvgNotInterested width={17} height={17}/>
            <Text
              className={styles.notinterestedtext}>
              {!dataList.interested ? 'Not Interested' : ''}
            </Text>
          </Flex>
              )}
            </>
          )}
          {!isEmpty(dataList.applicant) && (
            <Flex row center className={styles.applied}>
              <div className={styles.svgapplied}><SvgAppliedIcon fill={SUCCESS} width={17} height={17} /></div>
              <Link target={'_parent'} to={`/applicant_pipe_line/${jobId}`}>
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
          )}
        </>
      )}
    </Flex>
  );
};

export default InviteContainer;
