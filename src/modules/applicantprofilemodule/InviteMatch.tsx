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
import SvgInviter from '../../icons/SvgInviter';
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
  candidateId?: any;
  applicant?: ApplicantEntity[];
  candidate_details: CandidateDetailsEntity[];
  inviteMessage: string;
};

const InviteMatch = ({
  list,
  match,
  candidateId,
  applicant,
  candidate_details,
  inviteMessage,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isInvitePopUp, setInvitePopUp] = useState(false);
  const [isFavLoader, setFavLoader] = useState(false);
  const [isInviteLoader, setInviteLoader] = useState(false);
  const [isDate, setDate] = useState('');
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

  // invite popup open function
  const hanldeInvitePopUp = () => {
    setInvitePopUp(true);
    setDate(list.invited);
  };

  // invite popup close function
  const hanldeInviteClosePopUp = () => {
    setInvitePopUp(false);
  };
  // invite api call function
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
        Toast(inviteMessage);
        dispatch(applicantAllMatchMiddleWare({ can_id: candidateId }));
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
        ? '48%'
        : '48%',
    [],
  );

  const checkMatchLabel = useMemo(
    () =>
      match && match.length === 1 && applicant && applicant.length === 0
        ? '96%'
        : '96%',
    [],
  );

  const matchTitle = `${list.jd_title}`;

  return (
    <>
      {isInviteLoader && <Loader />}
      {isEmpty(isDate) && (
        <CancelAndDeletePopup 
        width={'350px'}
          title={
            <Flex>
            <Text>{`Invite will be sent as an email to ${
            candidate_details && candidate_details[0].first_name
          }`}</Text>
        <Text>Are you sure to proceed?</Text></Flex>}
          btnDelete={() => hanldeInvite(list.jd_id_id, list.candidate_id_id)}
          btnCancel={hanldeInviteClosePopUp}
          btnRight={YES}
          open={isInvitePopUp}
        />
      )}
      {!isEmpty(isDate) && (
        <CancelAndDeletePopup
          title={
            <Flex className={styles.popTitle}>
              <Text>{`The candidate ${
                candidate_details && candidate_details[0].first_name
              } has already been invited for this job on ${getDateString(
                isDate,
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
        row
        between
        style={{
          border: '1px solid #A5889C',
          borderRadius: '10px',
          padding: '8px',
          display: 'flex',
    // alignItems:' center'
        }}
        marginRight={'10px'}
      >
        <Flex  className={styles.jobTitle}>
          <Flex
            row
            style={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: ' hidden',
              maxWidth: '170px',
            }}
          >
            <Text
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: ' hidden',
                maxWidth: '170px',
                fontSize: '13px',
              }}
              title={matchTitle}
              textStyle="ellipsis"
            >
              {matchTitle}
            </Text>
          </Flex> 
          <Text className={styles.whiteSpace} style={{ fontSize: '13px' }}>
            {' '}
            {list.job_id}
          </Text>
          <Flex marginTop={5}>
            {console.log(list.applicant,'list.applicantlist.applicant')}
            {!isEmpty(list.applicant) ? (
              <Flex row center>
                <Text style={{ fontSize: '13px' }}>Status :</Text>
                <Text
                  bold
                  color="success"
                  style={{ marginLeft: '3px', fontSize: '13px' }}
                >{`Applied`}</Text>
              </Flex>
            ) : (
              <Flex
                row
                onClick={hanldeInvitePopUp}
                style={{ cursor: 'pointer' }}
              >
                <SvgInviter />{' '}
                <Text
                  style={{
                    marginLeft: '10px',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                  bold
                  color="theme"
                >
                  Invite to apply
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex row end>
          <Flex middle marginTop ={'15px'}>
          <div
          
            className={cx({
              countStyle1: list.profile_match < 40,
              countStyle2: list.profile_match >= 40 && list.profile_match < 69,
              countStyle3: list.profile_match > 69,
            })}
          >
            <Text color="white" style={{ fontSize: 16, marginTop: ' 2px' }}>
              {list.profile_match}%
            </Text>
          </div>
          </Flex>
          <Flex>
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
          </Flex>
          {/* <div
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
            <SvgInviter />
          </div> */}
        </Flex>
      </Flex>
    </>
  );
};

export default InviteMatch;
