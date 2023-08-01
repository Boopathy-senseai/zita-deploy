import { useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import SvgSearch from '../../icons/SvgSearch';
import { getBlur, getFocus, unlimitedHelper } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Tabel from '../../uikit/Table/Table';
import Text from '../../uikit/Text/Text';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Toast from '../../uikit/Toast/Toast';
import SvgNewTab from '../../icons/SvgNewTab';
import SvgRefresh from '../../icons/SvgRefresh';
import Pangination from '../../uikit/Pagination/Pangination';
import { AppDispatch } from '../../store';
import ProfileView from '../applicantpipelinemodule/ProfileView';
import { CANCEL, ERROR_MESSAGE } from '../constValue';
import { LINK } from '../../uikit/Colors/colors';
import YesOrNoModal from '../common/YesOrNoModal';
import styles from './candidatedatabasetab.module.css';
import ApplicantDatabase from './applicantDatabase';
import { applicantTable } from './uploadedCandidateTable';
// import { EmpPoolEntity } from './bulkImportTypes';

import {
  bulkImportMiddleWare,
  bulkuploadedCandidatesMiddleWare,
  bulkuploadedParsingMiddleWare,
  uploadedProfileViewMiddleWare,
  bulkImportMatchMiddleWare,
} from './store/middleware/bulkImportMiddleware';
import ParsingLoadingModal from './ParsingLoadingModal';
import ProfileViewModal from './ProfileViewModal';

type Tabs = 'total' | 'completed' | 'inCompleted';
export type FormProps = {
  searchValue: string;
  jd_id: string;
};
const initial: FormProps = {
  searchValue: '',
  jd_id: '',
};

type Props = {
  emp_pool: any;
  total_count: number;
  completed: number;
  incompleted: number;
  searchValue: string;
  searchHandleChange: (a: any) => void;
  setKey: (arg: string) => void;
  features_balance: number;
  setFeaturesBalance: (a: number | null) => void;
  jd_id: any;
  setPageNumber: (a: number) => void;
  pageNumber: number;
  upDateloader: boolean;
};

const ApplicantsTab = ({
  emp_pool,
  total_count,
  completed,
  incompleted,
  searchValue,
  jd_id,
  searchHandleChange,
  setKey,
  features_balance,
  setFeaturesBalance,
  setPageNumber,
  pageNumber,
  upDateloader,
}: Props) => {
  const [isParse, setParse] = useState(false);
  const [isTableLoader, setTableLoader] = useState(false);
  const [isImport, setImport] = useState<any>('');

  const [isJdId, setJdId] = useState<string>('0');
  const [isCanId, setCanId] = useState<any>([]);
  const [isJob, setJob] = useState<any>([]);
  const [isUrl, setUrl] = useState<string>('');
  const [isFile, setFile] = useState<string>('');
  const [isSearch, setSearch] = useState(1);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [isUpgrade, setUpgrade] = useState(false);
  const [isProfileView, setProfileView] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [isTab, setTab] = useState<Tabs>('total');
  const [isCandiTableLoader, setCandiTableLoader] = useState(false);
  const [isPageTab, setPageTab] = useState(total_count);
  const dispatch: AppDispatch = useDispatch();

  // Profile View Function
  const hanldeEditProfileView = (id: number) => {
    setCanId(id);
    setOpenProfile(true);
    setProfileView(false);
     dispatch(uploadedProfileViewMiddleWare({ id })).then((res) => {
      setFile(res.payload.resume_file_path);
    });
  };

  const hanldeProfileView = (id: number) => {
    setCanId(id);
    setProfileView(false);
    setOpenProfile(true);
    // dispatch(uploadedProfileViewMiddleWare({ id })).then((res) => {
    //   setFile(res.payload.resume_file_path);
    // });
  };
  const handleSubmitWithJd = (values: FormProps) => {
    console.log(values)
    dispatch(
      bulkuploadedCandidatesMiddleWare({ search: searchValue, jd_id: isJdId }),
    )
      .then((response) => {
        setSearch(response.payload.search);
      })
      .catch(() => {
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmitWithJd,
    enableReinitialize: true,
  });

  const handleCompletedWithJd = () => {
    dispatch(
      bulkuploadedCandidatesMiddleWare({
        completed,
        search: searchValue,
        jd_id: isJdId,
        page: pageNumber + 1,
      }),
    )
      .then(() => {
        getFocus('candidates__input');
        setPageNumber(0);
        getBlur('candidates__input');
      })
      .catch(() => {
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  const handleInCompeleted = () => {
    dispatch(
      bulkuploadedCandidatesMiddleWare({
        incompleted,
        search: formik.values.searchValue,
        jd_id: isJdId,
        page: pageNumber + 1,
      }),
    )
      .then(() => {
        getFocus('candidates__input');
        setPageNumber(0);
        getBlur('candidates__input');
      })
      .catch(() => {
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };
  console.log(jd_id);
  const handleTotal = () => {
    dispatch(
      bulkuploadedCandidatesMiddleWare({
        total: total_count,
        search: formik.values.searchValue,
        jd_id: isJdId,
        page: pageNumber + 1,
      }),
    )
      .then(() => {
        getFocus('candidates__input');
        setPageNumber(0);
        getBlur('candidates__input');
      })
      .catch(() => {
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  if (isJdId === '0') {
    emp_pool = [];
    total_count = 0;
    completed = 0;
    incompleted = 0;
  }
  const columns = useMemo(
    () =>
      applicantTable(
        
        setFeaturesBalance,
        hanldeEditProfileView,
        searchValue,
        isTab,
        isJdId,
        total_count,
        completed,
        incompleted,
        pageNumber,
      ),
    [emp_pool],
  );

  useEffect(() => {
    if (isTab === 'total') {
      setPageTab(total_count);
    }
    if (isTab === 'completed') {
      setPageTab(completed);
    }
    if (isTab === 'inCompleted') {
      setPageTab(incompleted);
    }
  }, [isTab, upDateloader]);
  // Pagination
  const usersPerPage = 10;
  const pageCount = Math.ceil(isPageTab / usersPerPage);

  const handleCloseParse = () => {
    setParse(false);
    localStorage.setItem('bulk_loader', 'true');
  };

  const handleOpenParse = () => setParse(true);

  useEffect(() => {
    formik.setFieldValue('jd_id', isJdId);
  }, [isJdId]);
  // Pagination Function
  const handleSetPagination = (a: number) => {
    setPageNumber(a);
    setTableLoader(true);
    if (isTab === 'total') {
      dispatch(
        bulkuploadedCandidatesMiddleWare({
          page: a + 1,
          total: total_count,
          jd_id: isJdId,
          search: searchValue,
        }),
      )
        .then(() => {
          getFocus('candidates__input');
          getBlur('candidates__input');
          setTableLoader(false);
        })
        .catch(() => {
          setTableLoader(false);
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }
    if (isTab === 'total') {
      dispatch(
        bulkuploadedCandidatesMiddleWare({
          page: a + 1,
          total: total_count,
          jd_id: isJdId,
          search: searchValue,
        }),
      )
        .then(() => {
          getFocus('candidates__input');
          getBlur('candidates__input');
          setTableLoader(false);
        })
        .catch(() => {
          setTableLoader(false);
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }
    if (isTab === 'inCompleted') {
      dispatch(
        bulkuploadedCandidatesMiddleWare({
          page: a + 1,
          incompleted,
          jd_id: isJdId,
          search: searchValue,
        }),
      )
        .then(() => {
          getFocus('candidates__input');
          getBlur('candidates__input');
          setTableLoader(false);
        })
        .catch(() => {
          setTableLoader(false);
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }
    if (isTab === 'completed') {
      dispatch(
        bulkuploadedCandidatesMiddleWare({
          page: a + 1,
          completed,
          jd_id: isJdId,
          search: searchValue,
        }),
      )
        .then(() => {
          getFocus('candidates__input');
          getBlur('candidates__input');
          setTableLoader(false);
        })
        .catch(() => {
          setTableLoader(false);
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }
  };

  // Table Refresh Function
  const hanldeSvgRefresh = (e: any) => {
    setCandiTableLoader(true);
    formik.setFieldValue('searchValue', '');
    setTab('total');
    e.preventDefault();
    dispatch(bulkuploadedCandidatesMiddleWare({ page: 1, jd_id: isJdId })).then(
      () => {
        getFocus('candidates__input');
        setPageNumber(0);
        getBlur('candidates__input');
        setCandiTableLoader(false);
      },
    );
  };

  const hanldeMatch = () => {
    setCandiTableLoader(true);
    const formData = new FormData();
    formData.append('jd_id', isJdId);
    dispatch(bulkImportMatchMiddleWare({ formData })).then(() => {
      dispatch(
        bulkuploadedCandidatesMiddleWare({ page: 1, jd_id: isJdId }),
      ).then(() => {
        setPageNumber(0);
        setCandiTableLoader(false);
      });
    });
  };

  // Bulk Upload Parsing Function
  const hanldeParsing = () => {
    dispatch(bulkuploadedParsingMiddleWare()).then(() => {
      dispatch(
        bulkuploadedCandidatesMiddleWare({ page: 1, jd_id: isJdId }),
      ).then(() => {
        setPageNumber(0);
      });
      dispatch(bulkImportMiddleWare()).then((res) => {
        setFeaturesBalance(res.payload.features_balance);
      });
      setImport(localStorage.setItem('bulk_loader', 'false'));
      localStorage.setItem('isImport', 'true');
      setParse(false);
    });
  };

  // Bulk Upload Parsing Function
  const hanldeApplicant = (jdId: string) => {
    setLoad(true);
    dispatch(bulkuploadedCandidatesMiddleWare({ page: 1, jd_id: jdId })).then(
      (res) => {
        setJob(res.payload.job);
        setUrl(res.payload.career_url);
        setSearch(res.payload.search);
        setPageNumber(0);
        setLoad(false);
      },
    );
  };

  const manageUser = () => {
    sessionStorage.setItem('superUserTab', '2');
    // window.location.replace()
    window.location.replace(
      window.location.origin + '/account_setting/settings?planFocus=focus',
    );
    // history.push('/account_setting/settings?planFocus=focus');
  };

  const handleCloseImportModal = () => {
    setImport(localStorage.setItem('isImport', 'false'));
  };

  useEffect(() => {
    setImport(localStorage.getItem('isImport'));
  });
  
  const hanldeSvgRefreshOnUpdate = (e: any) => {
    setOpenProfile(false)
    setCandiTableLoader(true);
    formik.setFieldValue('searchValue', '');
    setTab('total');
    e.preventDefault();
    dispatch(bulkuploadedCandidatesMiddleWare({ page: 1, jd_id: isJdId })).then(
      () => {
        getFocus('candidates__input');
        setPageNumber(0);
        getBlur('candidates__input');
        setCandiTableLoader(false);
      },
    );
  };
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      formik.handleSubmit();
    }
  };

  return (
    <Flex>
      <YesOrNoModal
        title={
          <Text style={{ width: 580, marginLeft: 12 }}>
            Your available candidates limit is{' '}
            {unlimitedHelper(features_balance)}. You are importing more resumes
            than your available candidates limit. Please change your plan to
            proceed further.
          </Text>
        }
        btnLeftOnclick={() => setUpgrade(false)}
        btnRightOnclick={manageUser}
        btnLeftTitle={CANCEL}
        btnRightTitle={'Upgrade'}
        open={isUpgrade}
      />
      {isOpenProfile && (
        <ProfileViewModal
          filePath={isFile}
          open={isOpenProfile}
          canId={isCanId}
          jdId={isJdId}
          hanldeProfileView={hanldeProfileView}
          // cancel={() => setOpenProfile(false)}
          refreshOnUpdate={(e:any) => hanldeSvgRefreshOnUpdate(e)}
        />
      )}

      <ProfileView
        open={isProfileView}
        cancel={() => setProfileView(false)}
        jobId={isJdId}
        // bulkId={isCanId} 
        candidateId={isCanId.toString()}
        inviteIconNone={true}
        // hanldeEditProfileView={hanldeEditProfileView}
      />
      <ParsingLoadingModal
        loader
        title={'Parsing and loading resumes in background.....'}
        open={isParse}
        close={handleCloseParse}
        des={
          <Text className={styles.des}>
            {`This might take a few minutes to process the files. We'll notify you
            by email when completed. Moving away from this page will not stop
            the process.`}
          </Text>
        }
      />

      <ParsingLoadingModal
        info
        title={'Resumes imported successfully....'}
        open={isImport === 'true' ? true : false}
        close={handleCloseImportModal}
        des={
          <Text>
            Your available candidates limits are{' '}
            {unlimitedHelper(features_balance)}. Please check on the{' '}
            <Text
              onClick={() => {
                setKey('2');
                handleCloseImportModal();
              }}
              color="link"
            >
              log file
            </Text>{' '}
            to get the complete import details.
          </Text>
        }
      />
      <Flex row className={styles.SelectTagRow}>
        <Text className={styles.importText}>Import applicants for</Text>
        <div className={styles.skillContainer}>
          <SelectTag
            labelBold
            options={jd_id}
            noOptionsMessage={({}) => 'No active jobs'}
            placeholder="Select a job to import applicants"
            getOptionValue={(option: { id: number }) => `${option.id}`}
            getOptionLabel={(option: { job_title: string }) => option.job_title}
            onChange={(option) => {
              setJdId(option.id.toString());
              hanldeApplicant(option.id.toString());
            }}
          />
        </div>
        {isUrl.length > 0 && (
          <Flex row center>
            <LinkWrapper
              target={'_blank'}
              to={`/${isUrl}/career_job_view/${isJob.id}/${isJob.job_title}`}
            >
              <Flex row>
                <Text bold color="link" className={styles.viewText}>
                  View Job
                </Text>
                <Flex className={styles.careerPage}>
                  <SvgNewTab fill={LINK} height={15} width={15} />
                </Flex>
              </Flex>
            </LinkWrapper>
          </Flex>
        )}
      </Flex>
      <ApplicantDatabase
        hanldeParsing={hanldeParsing}
        isjdId={isJdId}
        setParse={handleOpenParse}
        isBulkLoader={localStorage.getItem('bulk_loader')}
        setUpgrade={setUpgrade}
        candidatesLimit={features_balance}
      />

      <Flex row center className={styles.inputConatinerApplicants}>
        <InputText
          className={styles.inputWidth}
          inputConatinerClass={styles.inputStyle}
          placeholder={'Search applicants by name or email'}
          value={searchValue}
          onChange={searchHandleChange}
          id={'applicant__input'}
          actionRight={() => (
            <label htmlFor={'applicant__buttonFind'} style={{ margin: 0 }}>
              <SvgSearch />
            </label>
          )}
          onKeyPress={handleKeyPress}
        />
        <Button
          id="applicant__buttonFind"
          disabled={searchValue === '' ? true : false}
          onClick={formik.handleSubmit}
        >
          Find Applicants
        </Button>
      </Flex>

      {!isLoad ? (
        <>
          <Flex row center className={styles.filterStyle}>
            <Flex row center className={styles.marginLeft}>
              <Text bold={isTab === 'total'}>Total Applicants:</Text>
              {total_count === 0 ? (
                <Text
                  bold={isTab === 'total'}
                  className={styles.linkSpaceDefault}
                >
                  {total_count}
                </Text>
              ) : (
                <Text
                  onClick={() => {
                    handleTotal();
                    setTab('total');
                  }}
                  bold={isTab === 'total'}
                  className={styles.linkSpace}
                  color={'link'}
                >
                  {total_count}
                </Text>
              )}
            </Flex>
            {total_count !== 0 && (
              <>
                <Flex row center className={styles.marginLeft}>
                  <Text bold={isTab === 'completed'}>Completed Profiles:</Text>
                  {completed === 0 ? (
                    <Text
                      bold={isTab === 'completed'}
                      className={styles.linkSpaceDefault}
                    >
                      {completed}
                    </Text>
                  ) : (
                    <Text
                      onClick={() => {
                        handleCompletedWithJd();
                        setTab('completed');
                      }}
                      bold={isTab === 'completed'}
                      color={'link'}
                      className={styles.linkSpace}
                    >
                      {completed}
                    </Text>
                  )}
                </Flex>

                <Flex row center className={styles.inComplete}>
                  <Text bold={isTab === 'inCompleted'}>
                    Incomplete Profiles:
                  </Text>
                  {incompleted === 0 ? (
                    <Text
                      bold={isTab === 'inCompleted'}
                      className={styles.linkSpaceDefault}
                    >
                      {incompleted}
                    </Text>
                  ) : (
                    <Text
                      color={'link'}
                      onClick={() => {
                        handleInCompeleted();
                        setTab('inCompleted');
                      }}
                      bold={isTab === 'inCompleted'}
                      className={styles.linkSpace}
                    >
                      {incompleted}
                    </Text>
                  )}
                </Flex>
              </>
            )}
            <div
              tabIndex={-1}
              role={'button'}
              onKeyPress={() => {}}
              className={styles.svgRefresh}
              onClick={(e) => {
                hanldeSvgRefresh(e);
              }}
              title={'Refresh table'}
            >
              <SvgRefresh />
            </div>
            {emp_pool.length> 0  && (
              <Flex className={styles.svgRefresh}>
                <Button id="applicant__buttonFind" onClick={hanldeMatch}>
                  Match
                </Button>
              </Flex>
            )}
          </Flex>
          {isCandiTableLoader ? (
            <Flex center middle height={100}>
              <Loader withOutOverlay size={'medium'} />
            </Flex>
          ) : (
            <Tabel
              empty={
                isSearch === 1
                  ? 'No applicants imported yet'
                  : 'No applicants found'
              }
              dataSource={emp_pool}
              columns={columns}
              isLoader={isTableLoader}
            />
          )}

          {!isCandiTableLoader && isPageTab > 10 && (
            <Flex middle className={styles.pagination}>
              <Pangination
                maxPages={pageCount - 1}
                currentPage={pageNumber}
                setCurrentPage={handleSetPagination}
              />
            </Flex>
          )}
        </>
      ) : (
        <Flex center middle height={100}>
          <Loader withOutOverlay size={'medium'} />
        </Flex>
      )}
    </Flex>
  );
};

export default ApplicantsTab;