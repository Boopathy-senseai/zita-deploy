import { useMemo, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import SvgInvite from '../../icons/SvgInvite';
import { inviteToApplyApi } from '../../routes/apiRoutes';
import { AppDispatch } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgHeart from '../../icons/SvgHeart';
import Loader from '../../uikit/Loader/Loader';
import ProgressBar from '../../uikit/ProgressBar/ProgressBar';
import { getDateString, isEmpty } from '../../uikit/helper';
import Toast from '../../uikit/Toast/Toast';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import { config, ERROR_MESSAGE, YES } from '../constValue';
import styles from './allmatchtab.module.css';
import {
  ApplicantEntity,
  CandidateDetailsEntity,
  InviteEntity,
  MatchEntityOne,
} from './applicantProfileTypes';
import {
  applicantAllMatchMiddleWare,
  applicantFavoriteMiddleWare,
  applicantStatusMiddleWare,
} from './store/middleware/applicantProfileMiddleware';

var querystring = require('querystring');
const cx = classNames.bind(styles);

type Props = {
  list: MatchEntityOne;
  match: MatchEntityOne[];
  invite?: InviteEntity[];
  applicant?: ApplicantEntity[];
  candidate_details: CandidateDetailsEntity[];
};

const InviteMatch = ({
  list,
  match,
  invite,
  applicant,
  candidate_details,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isInvitePopUp, setInvitePopUp] = useState(false);
  const [isFavLoader, setFavLoader] = useState(false);
  const [isInviteLoader, setInviteLoader] = useState(false);

  const hanldeFavAction = (can_id: number, jd_id: number) => {
    setFavLoader(true);
    dispatch(applicantFavoriteMiddleWare({ can_id, jd_id }))
      .then(() => {
        dispatch(applicantAllMatchMiddleWare({ can_id })).then(() => {
          setFavLoader(false);
        });
      })
      .catch(() => {});
  };

  const hanldeInvitePopUp = () => {
    setInvitePopUp(true);
  };

  const hanldeInviteClosePopUp = () => {
    setInvitePopUp(false);
  };

  const hanldeInvite = (jdId: number, candId: number) => {
    hanldeInviteClosePopUp();
    setInviteLoader(true);
    const data = querystring.stringify({
      jd_id: jdId,
      candi_id: candId,
    });
    axios
      .post(inviteToApplyApi, data, config)
      .then(() => {
        setInviteLoader(false);
        Toast('Applicant invited successfully');
        dispatch(
          applicantStatusMiddleWare({
            jd_id: jdId.toString(),
            can_id: candId.toString(),
          }),
        );
      })
      .catch(() => {
        setInviteLoader(false);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  const checkMatch = useMemo(
    () =>
      match && match.length === 1 && applicant && applicant.length === 0
        ? '94%'
        : '50%',
    [],
  );

  const checkMatchLabel = useMemo(
    () =>
      match && match.length === 1 && applicant && applicant.length === 0
        ? '100%'
        : '96%',
    [],
  );

  const matchTitle = `${list.jd_title}`;

  return (
    <>
      {isInviteLoader && <Loader />}
      {invite && invite.length === 0 && (
        <CancelAndDeletePopup
          title={`Invite will be sent as an email to ${
            candidate_details && candidate_details[0].first_name
          }. Are you sure to proceed?`}
          btnDelete={() => hanldeInvite(list.jd_id_id, list.candidate_id_id)}
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
          btnDelete={() => hanldeInvite(list.jd_id_id, list.candidate_id_id)}
          btnCancel={hanldeInviteClosePopUp}
          btnRight={YES}
          open={isInvitePopUp}
        />
      )}
      <Flex
        width={checkMatch}
        className={cx('listOverAllCommon', 'listOverAll')}
        columnFlex
      >
        <Flex width={checkMatchLabel} row center className={styles.jobTitle}>
          <Text
            style={{ whiteSpace: 'nowrap' }}
            title={matchTitle}
            textStyle="ellipsis"
          >
            {matchTitle}
          </Text>
          <Text className={styles.whiteSpace}>(Job ID: {list.job_id})</Text>
          {!isEmpty(list.applicant) && (
            <Flex row center>
              <Text style={{ margin: '0 2px' }}>-</Text>
              <Text bold color="success">{` Applied`}</Text>
            </Flex>
          )}
        </Flex>
        <Flex row center width={checkMatchLabel}>
          <ProgressBar type="hr" percentage={list.profile_match} />
          <div
            className={styles.favDiv}
            title={
              isEmpty(list.fav) ? 'Add to Favourites' : 'Remove from Favourites'
            }
            onClick={() => hanldeFavAction(list.candidate_id_id, list.jd_id_id)}
            tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
          >
            {isFavLoader ? (
              <Loader withOutOverlay size="small" />
            ) : (
              <SvgHeart height={20} width={20} filled={!isEmpty(list.fav)} />
            )}
          </div>
          <div
            className={cx({
              svgInvite: isEmpty(list.applicant),
              svgInviteOne: !isEmpty(list.applicant),
            })}
            onClick={hanldeInvitePopUp}
            tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
            title="Invite to Apply"
          >
            <SvgInvite />
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default InviteMatch;
