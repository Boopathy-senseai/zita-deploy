import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import SvgTrash from '../../icons/SvgTrash';
import { GARY_3 } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { AppDispatch } from '../../store';
import Toast from '../../uikit/Toast/Toast';
import Loader from '../../uikit/Loader/Loader';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import {
  bulkImportMiddleWare,
  bulkuploadedCandidatesMiddleWare,
  uploadedDeleteMiddleWare,
} from './store/middleware/bulkImportMiddleware';
import styles from './action.module.css';
import { EmpPoolEntity } from './bulkImportTypes';

const cx = classNames.bind(styles);

type Props = {
  value: EmpPoolEntity;
  setFeaturesBalance: (a: any) => void;
  searchValue: string;
  tabKey: string;
  total_count: number;
  completed: number;
  incompleted: number;
  pageNumber: number;
};

const Action = ({
  value,
  setFeaturesBalance,
  searchValue,
  tabKey,
  total_count,
  completed,
  incompleted,
  pageNumber,
}: Props) => {
  const [isLoader, setLoader] = useState(false);
  const [isPermanently, setPermanently] = useState(false);
  const [isCandidate, setCandidate] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  // Delete Table row Function
  const handleDelete = (e: any, id: number) => {
    e.preventDefault();
    setLoader(true);
    setPermanently(false);
    setCandidate(false);
    dispatch(uploadedDeleteMiddleWare({ id }))
      .then((response) => {
        dispatch(bulkImportMiddleWare()).then((res) => {
          setFeaturesBalance(res.payload.features_balance);
        });
        if (tabKey === 'total') {
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              total: total_count,
              page: pageNumber + 1,
            }),
          ).then(() => {
            setLoader(false);
            Toast('Candidate deleted successfully', 'SHORT', 'success');
          });
        }
        if (tabKey === 'completed') {
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              completed,
              page: pageNumber + 1,
            }),
          ).then(() => {
            setLoader(false);
            Toast('Candidate deleted successfully', 'SHORT', 'success');
          });
        }
        if (tabKey === 'inCompleted') {
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              incompleted,
              page: pageNumber + 1,
            }),
          ).then(() => {
            setLoader(false);
            Toast('Candidate deleted successfully', 'SHORT', 'success');
          });
        }
        return Promise.resolve(response);
      })
      .catch(() => {
        setLoader(false);
        Toast('Candidate deleted failed. Please try again', 'SHORT', 'error');
      });
  };

  // Open Delete Popup
  const handleOpenModal = () => {
    if (value.applicant === null && value.zita_match === null) {
      setPermanently(true);
    }
    if (value.applicant === null && value.zita_match !== null) {
      setCandidate(true);
    }
  };
  const zitaMatchValue = value.zita_match === 1 ? 'job' : 'jobs';
  return (
    <Flex middle>
      <CancelAndDeletePopup
        open={isPermanently}
        title="Do you wish to permanently delete this candidate from your database?"
        btnCancel={() => setPermanently(false)}
        btnDelete={(e) => handleDelete(e, value.id)}
      />
      <CancelAndDeletePopup
        open={isCandidate}
        title={`Candidate is matched for ${value.zita_match} ${zitaMatchValue}. Do you wish to permanently delete this candidate from your database?`}
        btnCancel={() => setCandidate(false)}
        btnDelete={(e) => handleDelete(e, value.id)}
      />
      {isLoader ? (
        <Loader withOutOverlay size="small" />
      ) : (
        <Fragment>
          {value.applicant !== null && (
            <div
              title="Candidate Applied for a Job."
              className={cx('pointerEvent')}
            >
              <SvgTrash fill={GARY_3} />
            </div>
          )}
          {value.applicant === null && (
            <div
              onClick={handleOpenModal}
              className={cx('pointer')}
              tabIndex={-1}
              role={'button'}
              onKeyPress={() => {}}
            >
              <SvgTrash fill={GARY_3} />
            </div>
          )}
        </Fragment>
      )}
    </Flex>
  );
};

export default Action;
