import axios from 'axios';
import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import SvgTrash from '../../icons/SvgTrash';
import { GARY_3, LINK } from '../../uikit/Colors/colors';
import { uploadedCandidatesApi } from '../../routes/apiRoutes';
import Flex from '../../uikit/Flex/Flex';
import { AppDispatch } from '../../store';
import SvgView from '../../icons/SvgView';
import SvgMail from '../../icons/SvgMail';
import Toast from '../../uikit/Toast/Toast';
import { config } from '../constValue';
import Loader from '../../uikit/Loader/Loader';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import {
  bulkImportMiddleWare,
  bulkuploadedCandidatesMiddleWare,
  uploadedDeleteMiddleWare,
} from './store/middleware/bulkImportMiddleware';
import styles from './action.module.css';
// import { EmpPoolEntity } from './bulkImportTypes';
const cx = classNames.bind(styles);
var querystring = require('querystring');

type Props = {
  value: any;
  setFeaturesBalance: (a: any) => void;
  searchValue: string;
  hanldeProfileView: (arg: number) => void;
  applicant: boolean;
  tabKey: string;
  jdId?: string;
  total_count: number;
  completed: number;
  incompleted: number;
  pageNumber: number;
};

const Action = ({
  value,
  setFeaturesBalance,
  searchValue,
  hanldeProfileView,
  applicant,
  jdId,
  tabKey,
  total_count,
  completed,
  incompleted,
  pageNumber,
}: Props) => {
  const [isLoader, setLoader] = useState(false);
  const [isPermanently, setPermanently] = useState(false);
  const [isCandidate, setCandidate] = useState(false);
  const [isEmail, setEmail] = useState(false);

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
  // console.log(value.)
  const handleEmail = (e: any, id: number) => {
    e.preventDefault();
    setLoader(true);
    setEmail(false);
    const data = querystring.stringify({
      pk: id,
      name: 'sent_email',
      value: 'sent_email',
    });

    axios
      .post(uploadedCandidatesApi, data, config)
      .then((response) => {
        dispatch(bulkImportMiddleWare()).then((res) => {
          setFeaturesBalance(res.payload.features_balance);
        });
        if (tabKey === 'total') {
          if (jdId === undefined) {
            dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                total: total_count,
                page: pageNumber + 1,
              }),
            ).then(() => {
              setLoader(false);
              Toast('Email sent successfully', 'SHORT', 'success');
            });
          } else {
            dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                total: total_count,
                jd_id: jdId,
                page: pageNumber + 1,
              }),
            ).then(() => {
              setLoader(false);
              Toast('Email sent successfully', 'SHORT', 'success');
            });
          }
        }
        if (tabKey === 'completed') {
          if (jdId === undefined) {
            dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                completed,
                page: pageNumber + 1,
              }),
            ).then(() => {
              setLoader(false);
              Toast('Email sent successfully', 'SHORT', 'success');
            });
          } else {
            dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                completed,
                jd_id: jdId,
                page: pageNumber + 1,
              }),
            ).then(() => {
              setLoader(false);
              Toast('Email sent successfully', 'SHORT', 'success');
            });
          }
        }
        if (tabKey === 'inCompleted') {
          if (jdId === undefined) {
            dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                incompleted,
                page: pageNumber + 1,
              }),
            ).then(() => {
              setLoader(false);
              Toast('Email sent successfully', 'SHORT', 'success');
            });
          } else {
            dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                incompleted,
                jd_id: jdId,
                page: pageNumber + 1,
              }),
            ).then(() => {
              setLoader(false);
              Toast('Email sent successfully', 'SHORT', 'success');
            });
          }
        }
        return Promise.resolve(response);
      })
      .catch(() => {
        setLoader(false);
        Toast('Email failed. Please try again', 'SHORT', 'error');
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

  const handleOpenEmail = () => {
    setEmail(true);
  };
  const zitaMatchValue = value.zita_match === 1 ? 'job' : 'jobs';
  return (
    <Flex middle row>
      <CancelAndDeletePopup
        open={isPermanently}
        title="Do you wish to permanently delete this candidate from your database?"
        btnCancel={() => setPermanently(false)}
        btnDelete={(e) => handleDelete(e, value.id)}
      />
      <CancelAndDeletePopup
        open={isEmail}
        title={
          value.login_shared === false
            ? `Login credentials will be sent as an email to the applicant. Are your sure to proceed?`
            : `Login credentials already sent to the applicant. Do you want to send again?`
        }
        btnCancel={() => setEmail(false)}
        btnRight={'Send'}
        btnDelete={(e) => handleEmail(e, value.id)}
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
        <>
         <div
            title="Open profile"
            className={styles.svgExternal}
            onClick={() => {
              hanldeProfileView(value.id);
            }}
            tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
          >
            <SvgView fill={LINK} width={20} height={20} />
          </div>
          <Fragment>
            {!applicant && (
              <>
                {value.applicant !== null && (
                  <div
                    title="Candidate Applied for a Job."
                    className={cx('pointerEvent')}
                  >
                    <SvgTrash fill={GARY_3} width={20} height={20} />
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
                    <SvgTrash fill={GARY_3} width={20} height={20} />
                  </div>
                )}
              </>
            )}
          </Fragment>
         
          {applicant && (
            <>
              {value.login_shared === true ? (
                <div
                  title="Login credentials already sent to the applicant"
                  onClick={handleOpenEmail}
                  className={cx('pointer')}
                  tabIndex={-1}
                  role={'button'}
                  onKeyPress={() => {}}
                >
                  <SvgMail fill={LINK} width={20} height={20} />
                </div>
              ) : (
                <>
                  {(value.email !== null && value.first_name !== null)  ? (
                    <div
                      title="Login credentials not yet sent"
                      onClick={handleOpenEmail}
                      className={cx('pointer')}

                      tabIndex={-1}
                      role={'button'}
                      onKeyPress={() => {}}
                    >
                      <SvgMail fill={LINK} width={20} height={20} />
                    </div>
                  ) : (
                    <div
                      title="Add name and email to send the login credentials"
                      className={cx('pointerEvent')}
                    >
                      <SvgMail fill={GARY_3} width={20} height={20} />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </Flex>
  );
};

export default Action;