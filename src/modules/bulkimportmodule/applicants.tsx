import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import SvgSearch from '../../icons/SvgSearch';
import { getBlur, getFocus, unlimitedHelper } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Button from '../../uikit/Button/Button';
import { Card, Modal } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Tabel from '../../uikit/Table/Table';
import Text from '../../uikit/Text/Text';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Toast from '../../uikit/Toast/Toast';
import SvgLocation from '../../icons/SvgLocation';
import SvgNewTab from '../../icons/SvgNewTab';
import SvgRefresh from '../../icons/SvgRefresh';
import SvgClose from '../../icons/SvgClose';
import Pangination from '../../uikit/Pagination/Pangination';
import { AppDispatch, RootState } from '../../store';
import ProfileView from '../applicantpipelinemodule/ProfileView';
import { CANCEL, ERROR_MESSAGE } from '../constValue';
import { LINK } from '../../uikit/Colors/colors';
import YesOrNoModal from '../common/YesOrNoModal';
import Totalcount from '../../globulization/TotalCount';
import { jdMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { dashBoardMiddleWare } from '../dashboardmodule/empdashboard/store/dashboardmiddleware';
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
  parser: string;
};
const initial: FormProps = {
  searchValue: '',
  jd_id: '',
  parser: '',
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
  const [model, setmodel] = useState(false);
  const [withoutjderror, setwithoutjderror] = useState(false);
  const [verify, setverify] = useState(false);

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
    dispatch(uploadedProfileViewMiddleWare({ id })).then((res) => {
      setFile(res.payload.resume_file_path);
    });
  };
  const handleSubmitWithJd = (values: FormProps) => {
    console.log(values);
    dispatch(
      bulkuploadedCandidatesMiddleWare({ search: searchValue, jd_id: isJdId }),
    )
      .then((res) => {
        if (res.payload.success === false) {
          Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
        }

        else {
          setSearch(res.payload.search);
        }
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

  const {

    Resume_parsing_count,
  } = useSelector(
    ({

      dashboardEmpReducers
    }: RootState) => {
      return {

        Resume_parsing_count: dashboardEmpReducers.Resume_parsing_count
      };
    },
  );

  const handleCompletedWithJd = () => {
    dispatch(
      bulkuploadedCandidatesMiddleWare({
        completed,
        search: searchValue,
        jd_id: isJdId,
        page: pageNumber + 1,
      }),
    )
      .then((res) => {
        if (res.payload.success === false) {
          Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
        }

        else {
          getFocus('candidates__input');
          setPageNumber(0);
          getBlur('candidates__input');
        }
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
      .then((res) => {
        if (res.payload.success === false) {
          Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
        }

        else {
          getFocus('candidates__input');
          setPageNumber(0);
          getBlur('candidates__input');
        }
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
      .then((res) => {
        if (res.payload.success === false) {
          Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
        }

        else {
          getFocus('candidates__input');
          setPageNumber(0);
          getBlur('candidates__input');
        }
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
        .then((res) => {
          if (res.payload.success === false) {
            Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
          }

          else {
            getFocus('candidates__input');
            getBlur('candidates__input');
            setTableLoader(false);
          }
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
        .then((res) => {
          if (res.payload.success === false) {
            Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
          }

          else {
            getFocus('candidates__input');
            getBlur('candidates__input');
            setTableLoader(false);
          }
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
        .then((res) => {
          if (res.payload.success === false) {
            Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
          }

          else {
            getFocus('candidates__input');
            getBlur('candidates__input');
            setTableLoader(false);
          }
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
        .then((res) => {
          if (res.payload.success === false) {
            Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
          }

          else {
            getFocus('candidates__input');
            getBlur('candidates__input');
            setTableLoader(false);
          }
        })
        .catch(() => {
          setTableLoader(false);
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }
  };

  useEffect(() => {
    if (searchValue === '' && isJdId !== '0') {
      dispatch(
        bulkuploadedCandidatesMiddleWare({ page: 1, jd_id: isJdId }),
      ).then((res) => {
        if (res.payload.success === false) {
          Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
        }

        else {
          getFocus('candidates__input');
          setPageNumber(0);
          getBlur('candidates__input');
          setCandiTableLoader(false);
        }
      });
    }
  }, [searchValue]);

  // Table Refresh Function
  const hanldeSvgRefresh = (e: any) => {
    setCandiTableLoader(true);
    formik.setFieldValue('searchValue', '');
    setTab('total');
    e.preventDefault();
    dispatch(bulkuploadedCandidatesMiddleWare({ page: 1, jd_id: isJdId })).then((res) => {
      if (res.payload.success === false) {
        Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
      }

      else {
        getFocus('candidates__input');
        setPageNumber(0);
        getBlur('candidates__input');
        setCandiTableLoader(false);
      }
    },
    );
  };

  useEffect(() => {
    dispatch(dashBoardMiddleWare()).then((res1) => {
      setcount(res1.payload.Resume_parsing_count)
    });

  }, []);


  const [count, setcount] = useState(Resume_parsing_count);
  const hanldeMatch = () => {
    setCandiTableLoader(true);
    const formData = new FormData();
    formData.append('jd_id', isJdId);
    dispatch(jdMatchMiddleWare({ jd_id: isJdId })).then((res) => {
      if (res.payload.success === false) {
        Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
      }
      else {
        dispatch(
          bulkuploadedCandidatesMiddleWare({ page: 1, jd_id: isJdId }),
        ).then((response) => {
          if (res.payload.success === false) {
            Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
          }

          else {
            setPageNumber(0);
            setCandiTableLoader(false);
          }
        });
      }
    });
  };

  // Bulk Upload Parsing Function
  const hanldeParsing = () => {
    dispatch(bulkuploadedParsingMiddleWare({ parser: formik.values.parser })).then((response) => {
      if(response.payload.success === false){ 
Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
          } 
      
      else {
      setcount(response.payload.ai_resume_balance_count)
      dispatch(
        bulkuploadedCandidatesMiddleWare({ page: 1, jd_id: isJdId }),
      ).then((res) => {
        if (res.payload.success === false) {
          Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
        }

        else {
          setPageNumber(0);
          dispatch(jdMatchMiddleWare({ jd_id: isJdId })).then((respond) => {
            if (respond.payload.success === false) {
              Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
            }
          })
        }
      });
      dispatch(bulkImportMiddleWare()).then((res) => {
        setFeaturesBalance(res.payload.features_balance);
      });
      setImport(localStorage.setItem('bulk_loader', 'false'));
      localStorage.setItem('isImport', 'true');
      setParse(false);
    }}).then(() => {
      dispatch(jdMatchMiddleWare({ jd_id: isJdId })).then((res) => {
        if (res.payload.success === false) {
          Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
        }
      })
    })
  };

  // Bulk Upload Parsing Function
  const hanldeApplicant = (jdId: string) => {
    setLoad(true);
    dispatch(bulkuploadedCandidatesMiddleWare({ page: 1, jd_id: jdId })).then((res) => {
      if (res.payload.success === false) {
        Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
      }

      else {
        setJob(res.payload.job);
        setUrl(res.payload.career_url);
        setSearch(res.payload.search);
        setPageNumber(0);
        setLoad(false);
      }
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
    setOpenProfile(false);
    setCandiTableLoader(true);
    formik.setFieldValue('searchValue', '');
    setTab('total');
    e.preventDefault();
    dispatch(bulkuploadedCandidatesMiddleWare({ page: 1, jd_id: isJdId })).then((res) => {
      if (res.payload.success === false) {
        Toast('Sorry, there was a problem connecting to the API. Please try again later.')
      }

      else {
        getFocus('candidates__input');
        setPageNumber(0);
        getBlur('candidates__input');
        setCandiTableLoader(false);
      }
    },
    );
  };
  const handleopenmodal = () => {
    if (Number(isJdId) !== 0) {
      setmodel(true)
    }
    if (Number(isJdId) === 0) {
      setwithoutjderror(true)
    }
  }
  useEffect(() => {
    if (isJdId) {
      setwithoutjderror(false)
    }
  }, [isJdId])
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      formik.handleSubmit();
    }
  };
  const update = () => {
    setverify(false);
  };


  const handlefunction = () => {
    setverify(true)
    formik.setFieldValue('parser', '0')
  }
  const handlefunction1 = () => {
    setverify(true)
    formik.setFieldValue('parser', '1')
  }
  const closemodel = () => {
    setverify(false);
    setmodel(false);
  };
  const isBulkLoaderprocess = localStorage.getItem('bulk_loader');
  const value = emp_pool.length;
  const value1 = value > 4;
  return (
    <Flex

      className={styles.Applicantdatabase}
    >
      {console.log("applicant formik:::::", formik.values)}
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
          refreshOnUpdate={(e: any) => hanldeSvgRefreshOnUpdate(e)}
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
              bold
            >
              log file
            </Text>{' '}
            to get the complete import details.
          </Text>
        }
      />

      <Modal open={model}>
        <Flex
          className={verify === true ? styles.bulkmodel : styles.verifymodel}
          style={{ height: formik.values.parser === '1' ? '363px' : '' }}

        >

          {verify === true ? (
            <ApplicantDatabase
              setmodel={setmodel}
              verifymodel={update}
              hanldeParsing={hanldeParsing}
              isjdId={isJdId}
              setParse={handleOpenParse}
              isBulkLoader={localStorage.getItem('bulk_loader')}
              setUpgrade={setUpgrade}
              candidatesLimit={features_balance}
              Resume_parsing_count={Resume_parsing_count}
              formik={formik.values.parser}
            />
          ) : (
            <Flex style={{ marginTop: '10px' }}>
              <Flex end onClick={() => closemodel()}>
                <SvgClose
                  width={10}
                  height={10}
                  fill={'#888888'}
                  cursor={'pointer'}
                />
              </Flex>
              <Text size={14}>
                Which parsing method would you like to use?
              </Text>
              <Flex column>
                <Flex
                  row
                  style={{ marginTop: '15px' }}
                >
                  <Flex>
                    <Card className={styles.overAll} >
                      <Text size={14} bold style={{ padding: '10px 0' }}>
                        Basic Parser
                      </Text>
                      <ul className={styles.dot}>
                        <li>
                          A foundational parsing system designed for general use.
                        </li>
                        <li>
                          Efficient for general use but might overlook intricate details occasionally.
                        </li>
                        <li>
                          May occasionally miss out on intricate details.
                        </li>
                      </ul>
                      <Button
                        onClick={handlefunction}
                      >
                        Select
                      </Button>
                    </Card>
                  </Flex>

                  <Flex style={{ paddingLeft: '30px' }}>
                    <Card className={styles.overAll}  >
                      <div className={`${styles.ribbon} ${styles.ribbonTopRight}`}><span className={styles.ribbontopright}>Paid</span></div>
                      <Text size={14} bold style={{ padding: '10px 0' }}>
                        Advanced AI Parser
                      </Text>
                      <ul className={styles.dot}>
                        <li>
                          Powered by cutting-edge artificial intelligence.
                        </li>
                        <li>
                          Offers superior accuracy and can understand complex structures.
                        </li>
                        <li>
                          ecommended for precision and comprehensive data extraction.
                        </li>
                      </ul>
                      <Button
                        onClick={handlefunction1}
                      >
                        Select
                      </Button>
                    </Card>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Modal>


      <Flex row between className={styles.inputConatinerApplicants}>
        <Flex row>
          <Text className={styles.importText}>Import applicants for*</Text>
          <Flex row>
            <Flex>
              <Flex className={styles.skillContainer}>
                <SelectTag
                  labelBold
                  options={jd_id}
                  noOptionsMessage={({ }) => 'No active jobs'}
                  placeholder="Select a job to import applicants"
                  getOptionValue={(option: { id: number }) => `${option.id}`}
                  getOptionLabel={(option: { job_title: string }) =>
                    option.job_title
                  }
                  onChange={(option) => {
                    setJdId(option.id.toString());
                    hanldeApplicant(option.id.toString());
                  }}
                />
              </Flex>  {withoutjderror && <Text color='error'>Select a job to import applicants</Text>}
            </Flex>
            <InputText
              className={styles.inputWidth}
              inputConatinerClass={styles.inputStyle}
              placeholder={'Search applicants by name or email'}
              value={searchValue}
              onChange={searchHandleChange}
              id={'applicant__input'}
              actionRight={() => (
                <label style={{ margin: 0, marginTop: "3px" }}>
                  <SvgSearch width={14} height={14} />
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

            {isUrl.length > 0 && (
              <Flex>
                <LinkWrapper
                  target={'_blank'}
                  to={`/${isUrl}/career_job_view/${isJob.id}/${isJob.job_title}`}
                >
                  <Flex row>
                    <Button
                      types="secondary"
                      className={styles.viewText}
                      style={{ marginTop: '0px' }}
                    >
                      View Job
                    </Button>
                  </Flex>
                </LinkWrapper>
              </Flex>
            )}
          </Flex>
        </Flex>

        {isBulkLoaderprocess === 'true' ? (
          <Flex row>
            <Loader size="medium" withOutOverlay />
            <Text color="gray" style={{ marginLeft: 16 }}>
              Processing...
            </Text>
          </Flex>
        ) : (
          <Flex>
            <Button onClick={handleopenmodal}>Bulk Import</Button>
          </Flex>
        )}
      </Flex>

      {!isLoad ? (
        <>
          <Flex row center className={styles.filterStyle}>
            <Flex row center className={styles.marginLeft}>
              {total_count === 0 ? (
                <Text
                  bold={isTab === 'total'}
                  className={styles.linkSpaceDefault}
                >
                  <Totalcount
                    name="Total Applicants"
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
                >
                  <Totalcount
                    name="Total Applicants"
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
                    >
                      <Totalcount
                        name="Completed Profiles"
                        numbers={completed}
                        click={completed === 0 ? false : true}
                      />
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
                      <Totalcount
                        name="Completed Profiles"
                        numbers={completed}
                        click={completed === 0 ? false : true}
                      />
                    </Text>
                  )}
                </Flex>

                <Flex row center className={styles.inComplete}>
                  {incompleted === 0 ? (
                    <Text
                      bold={isTab === 'inCompleted'}
                      className={styles.linkSpaceDefault}
                    >
                      <Totalcount
                        name=" Incomplete Profiles"
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
                    >
                      <Totalcount
                        name=" Incomplete Profiles"
                        numbers={incompleted}
                        click={incompleted === 0 ? false : true}
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
                onKeyPress={() => { }}
                className={styles.svgRefresh}
                onClick={(e) => {
                  hanldeSvgRefresh(e);
                }}
                title={'Refresh table'}
              >
                <SvgRefresh />
              </div>
            )}

            {emp_pool.length > 0 && (
              <Flex className={styles.svgRefresh}>
                <Button id="applicant__buttonFind" onClick={hanldeMatch}>
                  Match
                </Button>
              </Flex>
            )}
          </Flex>
          {/* <SvgSearch/> */}
          {isCandiTableLoader ? (
            <Flex center middle height={100}>
              <Loader withOutOverlay size={'medium'} />
            </Flex>
          ) : (
            <Flex flex={1} >
              <Tabel
                empty={
                  isSearch === 1
                    ? 'No applicants imported yet'
                    : 'No applicants found'
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
