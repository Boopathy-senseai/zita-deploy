import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { AppDispatch } from '../../store';
import Loader from '../../components/Loader';
import SvgHeart from '../../icons/SvgHeart';
import SvgInvite from '../../icons/SvgInvite';
import SvgInviter from '../../icons/SvgInviter';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { isEmpty } from '../../uikit/helper';
import ProgressBar from '../../uikit/ProgressBar/ProgressBar';
import { MatchEntity, ApplicantEntity } from './applicantProfileTypes';
import { applicantFavoriteMiddleWare } from './store/middleware/applicantProfileMiddleware';
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
        ? '48%'
        : '48%',
    [],
  );

  const checkApplicantLable = useMemo(
    () =>
      match && match.length === 0 && applicant && applicant.length === 1
        ? '96%'
        : '96%',
    [],
  );
  // fav icon filter function
  const hanldeFavAction = (can_id: number, jd_id: number) => {
    setFavLoader(true);
    dispatch(applicantFavoriteMiddleWare({ can_id, jd_id }));
  };

  return (
    <Flex
      width={checkApplicant}
      columnFlex
      row
      between
      className={cx('listOverAllCommon', 'listOverAll')}
      style={{
        border: '1px solid #A5889C',
        borderRadius: '10px',
        padding: '8px',
        fontSize:'13px',display: 'flex',
        // alignItems:' center'
      }}
    >
      <Flex center className={styles.jobTitle} width={'84%'}>
        <Flex row style={{ whiteSpace:'nowrap',textOverflow:'ellipsis',
              overflow:' hidden',maxWidth:'170px' }} >
          <Text title={applicantTitle} style={{ whiteSpace:'nowrap',textOverflow:'ellipsis',
              overflow:' hidden',maxWidth:'170px',fontSize:'13px'}} textStyle="ellipsis">
            {applicantTitle} 
          </Text>
          
        </Flex>
        <Flex row center>
            <Text  className={styles.whiteSpace} style={{ fontSize:'13px'}}>
              {list.job_id}
            </Text>
          </Flex>
        <Flex row marginTop={5}>
          <Text style={{ fontSize:'13px'}}>Status :</Text>
          <Text bold color="success" style={{ margin: '0 3px' , fontSize:'13px'}}>{`Applied`}</Text>
        </Flex>
      </Flex>
      <Flex row end  >
        <div className={styles.countStyle1} style={{marginTop:'15px'}}>
          <Text color="white" style={{ fontSize: 14, marginTop: ' 2px' }}>
            {0}%
          </Text>
        </div>
        {/* <ProgressBar type="hr" percentage={list.profile_match} /> */}
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
    </Flex>
  );
};

export default ApplicantMatch;
