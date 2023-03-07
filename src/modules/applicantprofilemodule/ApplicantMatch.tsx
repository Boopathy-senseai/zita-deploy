import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { AppDispatch } from '../../store';
import Loader from '../../components/Loader';
import SvgHeart from '../../icons/SvgHeart';
import SvgInvite from '../../icons/SvgInvite';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { isEmpty } from '../../uikit/helper';
import ProgressBar from '../../uikit/ProgressBar/ProgressBar';
import { MatchEntity, ApplicantEntity } from './applicantProfileTypes';
import {
  applicantFavoriteMiddleWare,
  applicantAllMatchMiddleWare,
} from './store/middleware/applicantProfileMiddleware';
import styles from './allmatchtab.module.css';

const cx = classNames.bind(styles);

type Props = {
  list: ApplicantEntity;
  match: MatchEntity[];
  applicant?: ApplicantEntity[];
};

const ApplicantMatch = ({ list, match, applicant }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isFavLoader, setFavLoader] = useState(false);
  const applicantTitle = `${list.jd_title}`;
  const checkApplicant = useMemo(
    () =>
      match && match.length === 0 && applicant && applicant.length === 1
        ? '94%'
        : '50%',
    [],
  );

  const checkApplicantLable = useMemo(
    () =>
      match && match.length === 0 && applicant && applicant.length === 1
        ? '100%'
        : '96%',
    [],
  );

  const hanldeFavAction = (can_id: number, jd_id: number) => {
    setFavLoader(true);
    dispatch(applicantFavoriteMiddleWare({ can_id, jd_id }))
      .then(() => {
        dispatch(applicantAllMatchMiddleWare({ can_id })).then(() => {
          setFavLoader(false);
        });
      })
      .catch(() => {
        // setFavLoader(false);
      });
  };

  return (
    <Flex
      width={checkApplicant}
      columnFlex
      className={cx('listOverAllCommon', 'listOverAll')}
    >
      <Flex row center className={styles.jobTitle} width={'84%'}>
        <Text title={applicantTitle} textStyle="ellipsis">
          {applicantTitle}
        </Text>
        <Flex row center>
          <Text style={{ margin: '0 2px' }} className={styles.whiteSpace}>
            (Job ID: {list.job_id}) -
          </Text>
          <Text bold color="success">{`Applied`}</Text>
        </Flex>
      </Flex>
      <Flex row center width={checkApplicantLable}>
        <ProgressBar type="hr" percentage={0} />
        <div
          tabIndex={-1}
          role={'button'}
          onKeyPress={() => {}}
          onClick={() => hanldeFavAction(list.candidate_id_id, list.jd_id_id)}
          className={styles.favDiv}
          title={
            isEmpty(list.fav) ? 'Add to Favourites' : 'Remove from Favourites'
          }
        >
          {isFavLoader ? (
            <Loader withOutOverlay size="small" />
          ) : (
            <SvgHeart height={20} width={20} filled={!isEmpty(list.fav)} />
          )}
        </div>
        <div className={styles.svgInviteOne}>
          <SvgInvite />
        </div>
      </Flex>
    </Flex>
  );
};

export default ApplicantMatch;
