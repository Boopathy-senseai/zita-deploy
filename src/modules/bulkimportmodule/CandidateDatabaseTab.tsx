import { useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SvgSearch from '../../icons/SvgSearch';
import { getBlur, getFocus, unlimitedHelper } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Tabel from '../../uikit/Table/Table';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import SvgRefresh from '../../icons/SvgRefresh';
import Pangination from '../../uikit/Pagination/Pangination';
import { AppDispatch } from '../../store';
import { CANCEL, ERROR_MESSAGE } from '../constValue';
import YesOrNoModal from '../common/YesOrNoModal';
import styles from './candidatedatabasetab.module.css';
import CandidateDatabase from './CandidateDatabase';
import { title } from './uploadedCandidateTable';
import { EmpPoolEntity } from './bulkImportTypes';
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
  emp_pool?: EmpPoolEntity[];
  total_count: number;
  completed: number;
  incompleted: number;
  handleTotal: () => void;
  handleSubmit: () => void;
  handleCompleted: () => void;
  handleInCompeleted: () => void;
  searchValue: string;
  searchHandleChange: (a: any) => void;
  setKey: (arg: string) => void;
  features_balance: number;
  setFeaturesBalance: (a: number | null) => void;
  isSearch: number;
  formik: any;
  setPageNumber: (a: number) => void;
  pageNumber: number;
  upDateloader: boolean;
};

const CandidateDatabaseTab = ({
  emp_pool,
  total_count,
  completed,
  incompleted,
  handleTotal,
  handleSubmit,
  handleCompleted,
  handleInCompeleted,
  searchValue,
  searchHandleChange,
  setKey,
  features_balance,
  setFeaturesBalance,
  isSearch,
  formik,
  setPageNumber,
  pageNumber,
  upDateloader,
}: Props) => {
  const [isParse, setParse] = useState(false);
  const [isTableLoader, setTableLoader] = useState(false);
  const [isImport, setImport] = useState<any>('');
  const [isFile, setFile] = useState<string>('');
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [isUpgrade, setUpgrade] = useState(false);
  const [isTab, setTab] = useState<Tabs>('total');
  const [isCandiTableLoader, setCandiTableLoader] = useState(false);
  const [isPageTab, setPageTab] = useState(total_count);
  const dispatch: AppDispatch = useDispatch();

  // Profile View Function
  const hanldeProfileView = (id: number) => {
    dispatch(uploadedProfileViewMiddleWare({ id })).then((res) => {
      setFile(res.payload.resume_file_path);
      setOpenProfile(true);
    });
  };

  const columns = useMemo(
    () =>
      title(
        hanldeProfileView,
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
  }, [isTab,upDateloader]);
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

  // Bulk Upload Parsing Function
  const hanldeParsing = () => {
    dispatch(bulkuploadedParsingMiddleWare()).then(() => {
      dispatch(bulkuploadedCandidatesMiddleWare({ page: 1 })).then(() => {
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

  const manageUser = () => {
    return window.location.replace(
      process.env.REACT_APP_HOME_URL + 'account/subscription/#headingOne',
    );
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

      <ProfileViewModal
        filePath={isFile}
        open={isOpenProfile}
        cancel={() => setOpenProfile(false)}
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
                setKey('1');
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

      <CandidateDatabase
        hanldeParsing={hanldeParsing}
        setParse={handleOpenParse}
        isBulkLoader={localStorage.getItem('bulk_loader')}
        setUpgrade={setUpgrade}
        candidatesLimit={features_balance}
      />

      <Flex row center className={styles.inputConatiner}>
        <InputText
          className={styles.inputWidth}
          inputConatinerClass={styles.inputStyle}
          placeholder={'Search candidates by name or email'}
          value={searchValue}
          onChange={searchHandleChange}
          id={'candidates__input'}
          actionRight={() => (
            <label htmlFor={'candidates__buttonFind'} style={{ margin: 0 }}>
              <SvgSearch />
            </label>
          )}
          onKeyPress={handleKeyPress}
        />
        <Button
          id="candidates__buttonFind"
          disabled={searchValue === '' ? true : false}
          onClick={handleSubmit}
        >
          Find Candidates
        </Button>
      </Flex>

      <Flex row center className={styles.filterStyle}>
        <Flex row center className={styles.marginLeft}>
          <Text bold={isTab === 'total'}>Total Candidates:</Text>
          {total_count === 0 ? (
            <Text bold={isTab === 'total'} className={styles.linkSpaceDefault}>
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
                    handleCompleted();
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
              <Text bold={isTab === 'inCompleted'}>Incomplete Profiles:</Text>
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
      </Flex>
      {isCandiTableLoader ? (
        <Flex center middle height={100}>
          <Loader withOutOverlay size={'medium'} />
        </Flex>
      ) : (
        <Tabel
          empty={
            isSearch === 1 ? 'No candidates imported yet' : 'No candidate found'
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
    </Flex>
  );
};

export default CandidateDatabaseTab;
