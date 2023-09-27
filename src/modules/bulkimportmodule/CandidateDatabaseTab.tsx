import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import Totalcount from '../../globulization/TotalCount';
import SvgSearch from '../../icons/SvgSearch';
import { getBlur, getFocus, unlimitedHelper } from '../../uikit/helper';
import { Modal } from '../../uikit';
import Loader from '../../uikit/Loader/Loader';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Tabel from '../../uikit/Table/Table';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import SvgRefresh from '../../icons/SvgRefresh';
import Pangination from '../../uikit/Pagination/Pangination';
// import ProfileView from '../applicantpipelinemodule/ProfileView';
import ZitaMatchCandidateDrawer from '../zitamatchcandidatemodule/ZitaMatchCandidateDrawer';
import { CANCEL, ERROR_MESSAGE } from '../constValue';
import YesOrNoModal from '../common/YesOrNoModal';
import styles from './candidatedatabasetab.module.css';
import CandidateDatabase from './CandidateDatabase';
import { title } from './uploadedCandidateTable';
// import { EmpPoolEntity } from './bulkImportTypes';
import {
  bulkImportMiddleWare,
  bulkuploadedCandidatesMiddleWare,
  bulkuploadedParsingMiddleWare,
  uploadedProfileViewMiddleWare,
} from './store/middleware/bulkImportMiddleware';
import ParsingLoadingModal from './ParsingLoadingModal';
import ProfileViewModal from './ProfileViewModal';

type Tabs = 'total' | 'completed' | 'inCompleted';

type Props = {
  handleTotal: () => void;
  handleSubmit: () => void;
  handleCompleted: () => void;
  handleInCompeleted: () => void;
  searchValue: string;
  searchHandleChange: (a: any) => void;
  setKey: (arg: string) => void;
  // features_balance: number;
  setFeaturesBalance: (a: number | null) => void;
  isSearch: number;
  formik: any;
  setPageNumber: (a: number) => void;
  pageNumber: number;
};

const CandidateDatabaseTab = ({
  handleTotal,
  handleSubmit,
  handleCompleted,
  handleInCompeleted,
  searchValue,
  searchHandleChange,
  setKey,

  setFeaturesBalance,
  isSearch,
  formik,
  setPageNumber,
  pageNumber,
}: Props) => {
  const [isParse, setParse] = useState(false);
  const [isTableLoader, setTableLoader] = useState(false);
  const [isImport, setImport] = useState<any>('');
  const [isFile, setFile] = useState<string>('');
  // const [isPersonal, setPersonal] = useState<any>([]);
  // const [isAddDetail, setAddDetail] = useState<any>([]);
  const [isProfileView, setProfileView] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [isUpgrade, setUpgrade] = useState(false);
  const [isTab, setTab] = useState<Tabs>('total');
  const [isCandiTableLoader, setCandiTableLoader] = useState(false);
  const [isCanId, setCanId] = useState<any>([]);

  const dispatch: AppDispatch = useDispatch();
  const [model, setmodel] = useState(false);
  // const history=useHistory()
  // Profile View Function

  //  const hanldeEditProfileView = (id: number) => {
  //   setCanId(id);
  //   setOpenProfile(false);
  //   setProfileView(true);
  //    dispatch(uploadedProfileViewMiddleWare({ id })).then((res) => {
  //     setFile(res.payload.resume_file_path);
  //   });
  // };

  const hanldeEditProfileView = (id: number) => {
    setCanId(id);
    setProfileView(false);
    setOpenProfile(true);
    dispatch(uploadedProfileViewMiddleWare({ id })).then((res) => {
      setFile(res.payload.resume_file_path);
    });
  };
  // useEffect(() => {
  //   dispatch(bulkuploadedCandidatesMiddleWare({}));
  // }, []);

  useEffect(() => {
    if (searchValue === '') {
      dispatch(bulkuploadedCandidatesMiddleWare({}));
    }
  }, [searchValue]);

  const {
    emp_pool,
    total_count,
    completed,
    incompleted,
    features_balance,
    upDateloader,
  } = useSelector(
    ({ bulkUploadedCandidatesReducers, bulkImportReducers }: RootState) => {
      return {
        emp_pool: bulkUploadedCandidatesReducers.emp_pool,
        total_count: bulkUploadedCandidatesReducers.total_count,
        completed: bulkUploadedCandidatesReducers.completed,
        incompleted: bulkUploadedCandidatesReducers.incompleted,
        features_balance: bulkImportReducers.features_balance,
        upDateloader: bulkUploadedCandidatesReducers.isLoading,
      };
    },
  );
  const [isPageTab, setPageTab] = useState(total_count);

  const columns = useMemo(
    () =>
      title(
        hanldeEditProfileView,
        setFeaturesBalance,
        searchValue,
        isTab,
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

  // Pagination Function
  const handleSetPagination = (a: number) => {
    setPageNumber(a);
    setTableLoader(true);
    if (isTab === 'total') {
      dispatch(
        bulkuploadedCandidatesMiddleWare({
          page: a + 1,
          total: total_count,
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
    dispatch(bulkuploadedCandidatesMiddleWare({ page: 1 })).then(() => {
      getFocus('candidates__input');
      setPageNumber(0);
      getBlur('candidates__input');
      setCandiTableLoader(false);
    });
  };

  const hanldeSvgRefreshOnUpdate = (e: any) => {
    setOpenProfile(false);
    setCandiTableLoader(true);
    formik.setFieldValue('searchValue', '');
    setTab('total');
    e.preventDefault();
    dispatch(bulkuploadedCandidatesMiddleWare({ page: 1 })).then(() => {
      getFocus('candidates__input');
      setPageNumber(0);
      getBlur('candidates__input');
      setCandiTableLoader(false);
    });
  };
  // Bulk Upload Parsing Function
  const hanldeParsing = () => {
    dispatch(bulkuploadedParsingMiddleWare())
      .then(() => {
        dispatch(bulkuploadedCandidatesMiddleWare({ page: 1 })).then(() => {
          setPageNumber(0);
        });
        dispatch(bulkImportMiddleWare()).then((res) => {
          setFeaturesBalance(res.payload.features_balance);
        });
        setImport(localStorage.setItem('bulk_loader', 'false'));
        localStorage.setItem('isImport', 'true');
        setParse(false);
      })
      .then(() => {
        dispatch(bulkuploadedCandidatesMiddleWare({ page: 1 }));
      });
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

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  const value = emp_pool.length;
  const value1 = value > 4;
  const isBulkLoaderprocess = localStorage.getItem('bulk_loader');
  return (
    <Flex className={styles.candidatedatabase}>
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
      <ZitaMatchCandidateDrawer
        activeState={0}
        open={isProfileView}
        cancel={() => setProfileView(false)}
        jobId={'0'}
        candidateId={isCanId.toString()}
      />

      {isOpenProfile && (
        <ProfileViewModal
          filePath={isFile}
          open={isOpenProfile}
          canId={isCanId}
          // cancel={() => setOpenProfile(false)}
          refreshOnUpdate={(e: any) => hanldeSvgRefreshOnUpdate(e)}
        />
      )}
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
        css
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
      <Modal open={model}>
        <Flex
          style={{
            backgroundColor: '#ffffff',
            padding: '25px',
            height: '320px',
            width: '600px',
            borderRadius: '4px',
          }}
        >
          <CandidateDatabase
            setmodel={setmodel}
            hanldeParsing={hanldeParsing}
            setParse={handleOpenParse}
            isBulkLoader={localStorage.getItem('bulk_loader')}
            setUpgrade={setUpgrade}
            candidatesLimit={features_balance}
          />
        </Flex>
      </Modal>

      <Flex row between>
        <Flex row center className={styles.inputConatiner}>
          <InputText
            className={styles.inputWidth}
            inputConatinerClass={styles.inputStyle}
            placeholder={'Search candidates by name or email'}
            value={searchValue}
            onChange={searchHandleChange}
            id={'candidates__input'}
            actionRight={() => (
              <label style={{ margin: 0, marginTop: '3px' }}>
                <SvgSearch width={14} height={14} />
              </label>
            )}
            onKeyPress={handleKeyPress}
          />
          <Button
            disabled={searchValue === '' ? true : false}
            onClick={handleSubmit}
          >
            Find Candidates
          </Button>
        </Flex>
        <Flex className={styles.inputConatiner}>
          {isBulkLoaderprocess === 'true' ? (
            <Flex row>
              <Loader size="medium" withOutOverlay />
              <Text color="gray" style={{ marginLeft: 16 }}>
                Processing...
              </Text>
            </Flex>
          ) : (
            <Button onClick={() => setmodel(true)}>Bulk Import</Button>
          )}
        </Flex>
      </Flex>

      <Flex row center className={styles.filterStyle}>
        <Flex row center className={styles.marginLeft}>
          {total_count === 0 ? (
            <Text bold={isTab === 'total'} className={styles.linkSpaceDefault}>
              <Totalcount
                name="Total Candidates"
                numbers={total_count}
                click={total_count === 0 ? false : true}
              />
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
              style={{ cursor: 'pointer' }}
            >
              <Totalcount
                name="Total Candidates"
                numbers={total_count}
                click={total_count === 0 ? false : true}
              />
            </Text>
          )}
        </Flex>
        {total_count !== 0 && (
          <>
            <Flex row center className={styles.marginLeft}>
              {completed === 0 ? (
                <Text
                  bold={isTab === 'completed'}
                  className={styles.linkSpaceDefault}
                  style={{ cursor: 'pointer' }}
                >
                  <Totalcount
                    name="Completed Profiles"
                    numbers={completed}
                    click
                  />
                </Text>
              ) : (
                <Text
                  onClick={() => {
                    handleCompleted();
                    setTab('completed');
                  }}
                  bold={isTab === 'completed'}
                  color={'link'}
                  className={styles.linkSpace}
                  style={{ cursor: 'pointer' }}
                >
                  <Totalcount
                    name="Completed Profiles"
                    numbers={completed}
                    click
                  />
                </Text>
              )}
            </Flex>

            <Flex row center className={styles.inComplete}>
              {incompleted === 0 ? (
                <Text
                  bold={isTab === 'inCompleted'}
                  className={styles.linkSpaceDefault}
                  style={{ cursor: 'pointer' }}
                >
                  <Totalcount
                    name="Incomplete Profiles"
                    numbers={incompleted}
                    click={incompleted === 0 ? false : true}
                  />
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
                  style={{ cursor: 'pointer' }}
                >
                  <Totalcount
                    name="Incomplete Profiles"
                    numbers={incompleted}
                    click
                  />
                </Text>
              )}
            </Flex>
          </>
        )}
        {total_count > 0 && (
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
        )}
      </Flex>
      {isCandiTableLoader ? (
        <Flex center middle>
          <Loader size={'medium'} />
        </Flex>
      ) : (
        <Flex flex={1}>
          <Tabel
            empty={
              isSearch === 1
                ? 'No candidates imported yet'
                : 'No candidate found'
            }
            dataSource={emp_pool}
            columns={columns}
            isLoader={isTableLoader}
            pageCount={pageCount}
            pageNumber={pageNumber}
            handleSetPagination={handleSetPagination}
            isCandiTableLoader={isCandiTableLoader}
            isPageTab={isPageTab}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default CandidateDatabaseTab;
