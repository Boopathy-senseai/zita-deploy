import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import SvgAppliedIcon from '../../icons/SvgAppliedIcon';
import SvgHelp from '../../icons/SvgHelp';
import SvgInterested from '../../icons/SvgInterested';
import SvgInvite from '../../icons/SvgInvite';
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

const InviteContainer = ({
  inviteDisable,
  dataList,
  jobId,
  handleInviteView,
  handleApplicantView,
}: Props) => {
  return (
    <Flex columnFlex center middle width={'25%'} height={71}>
      {inviteDisable ? (
        <>
          <div
            title="Invite to Apply"
            className={cx('inviteStyle', { inviteDisable })}
          >
            <SvgInvite width={36} height={36} />
          </div>
          <Text color="gray" size={12}>
            Invite to Apply
          </Text>
        </>
      ) : (
        <>
          {!isEmpty(dataList.interested) && dataList.interested === false ? (
            <div className={cx('svgInviteNone')} title="Invite to Apply">
              <SvgInvite width={36} height={36} color="theme" />
            </div>
          ) : (
            <div
              tabIndex={-1}
              role={'button'}
              onKeyPress={() => {}}
              onClick={handleInviteView}
              className={cx({
                svgInvitePointer: isEmpty(dataList.applicant),
                svgInviteNone: !isEmpty(dataList.applicant),
              })}
              title="Invite to Apply"
            >
              <SvgInvite width={36} height={36} color="theme" />
            </div>
          )}

          {isEmpty(dataList.invite) ? (
            <Text color="gray" size={12}>
              {!isEmpty(dataList.applicant)
                ? 'You can’t send Invite'
                : 'Invite to Apply'}
            </Text>
          ): !isEmpty(dataList.invite) && !isEmpty(dataList.applicant) && (
            <Text color="gray" size={12}>
              You can’t send Invite
            </Text>
          )}

          {!isEmpty(dataList.interested) && dataList.interested === false ? (
            <Text color="gray" size={12}>
              You can’t send Invite
            </Text>
          ) : (
            <>
              {!isEmpty(dataList.invite) && isEmpty(dataList.applicant) && (
                <Text color="gray" size={12}>
                  Last Invited:{' '}
                  {dataList?.invite && getDateString(dataList.invite, 'll')}
                </Text>
              )}
            </>
          )}

{/* {!isEmpty(dataList.invite) && !isEmpty(dataList.applicant) && (
            <Text color="gray" size={12}>
              You can’t send Invite
            </Text>
          )} */}

          {!isEmpty(dataList.interested) && isEmpty(dataList.applicant) && (
            <Flex row center>
              <SvgInterested
                width={22}
                height={22}
                fill={dataList.interested ? SUCCESS : ERROR}
              />
              <Text color="gray" style={{ marginLeft: 4 }}>
                {dataList.interested ? 'Interested' : 'Not Interested'}
              </Text>
            </Flex>
          )}

          {!isEmpty(dataList.applicant) && (
            <Flex row center>
              <SvgAppliedIcon fill={SUCCESS} width={17} height={17} />
              <Link target={'_parent'} to={`/applicant_pipe_line/${jobId}`}>
                <Text
                  color="link"
                  bold
                  className={styles.appliedText}
                  onClick={handleApplicantView}
                >
                  Applied
                </Text>
              </Link>
              <div title="View the profile in Applicants Pipeline page.">
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
