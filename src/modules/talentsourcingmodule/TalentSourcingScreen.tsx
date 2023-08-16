import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Pangination from '../../uikit/Pagination/Pangination';
import SingleButton from '../common/SingleButton';
import Toast from '../../uikit/Toast/Toast';
import { AppDispatch, RootState } from '../../store';
import { ERROR_MESSAGE } from '../constValue';

import { Text } from '../../uikit';
import Title from '../common/Title';
import Empty from '../common/Empty';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import TalentFilter from './TalentFilter';
import TalentAction from './TalentAction';
import TalentCardList from './TalentCardList';

import NoCountModal from './NoCountModal';
import styles from './talentsourcingscreen.module.css';
import {
  candidateViewMiddleWare,
  parsedTextMiddleWare,
  paymentCanceledMiddleWare,
  stripeMiddleWare,
  talentSourcingMiddleWare,
  talentSourcingsessionIdMiddleWare,
  unlockCandidateMiddleWare,
} from './store/middleware/talentSoucringMiddleware';
import { filterCondition, talentFilterHelper } from './talentFilterHelper'; // eslint-disable-line
import CandiViewModal from './CandiViewModal';
import ContactCreditsModal from './ContactCreditsModal';
import UnlockLoaderModal from './UnlockLoaderModal';
import CandidateSuccessModal from './CandidateSuccessModal';
import { DataEntity } from './talentSourcingTypes';

const cx = classNames.bind(styles);

export type experienceOptionsType = { value: string; label: string };

const TalentSourcingScreen = () => {
  const [isBachelors, setBachelors] = useState(false);
  const [isDoctorate, setDoctorate] = useState(false);
  const [isMasters, setMasters] = useState(false);
  const [isAny, setAny] = useState(true);
  const [isRelocate, setRelocate] = useState(false);
  const [isExperience, setExperience] = useState<experienceOptionsType>({
    label: 'All',
    value: 'all',
  });
  const [isSearchData, setSearchData] = useState<DataEntity[]>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isNoLimit, setNoLimit] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isNoPermission, setNoPermission] = useState(false);
  const [isContact, setContact] = useState(false);
  const [isSourceLimit, setSourceLimit] = useState(0);
  const [isCandidatesLimit, setCandidatesLimit] = useState('0');
  const [isCredit, setCredit] = useState(false);
  const [isShowPdf, setShowPdf] = useState(false);
  const [isCheckOutLoader, setCheckOutLoader] = useState(false);
  const [isNoCount, setNoCount] = useState(false);
  const [isCandiList, setCandiList] = useState<string[]>();
  const [isFind, setFind] = useState(true);
  const [isOther, setOther] = useState(false);
  const [isInitalCheckBox, setInitalCheckBox] = useState(false);
  const [isFree, setFree] = useState(false);
  const [isPdfLoader,setPdfLoader]=useState(false)
  const [isSubmitLoader,setSubmitLoader]=useState(false);
  const [isInitialLoader,setInitialLoader]=useState(true);
  const [visible,setvisible]=useState(false);
  const [show,setshow]=useState(false);
  const uselocation = useLocation();
  const history = useHistory();
  const [apply, setapply] = useState(false);
  const [change,setchange]=useState(false)
  const [cardloader,setcardloader]=useState(false)
  const [isCheck, setIsCheck] = useState<any>([]);

  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;
  const length: any = isSearchData?.length;
  const pageCount = Math.ceil(length / usersPerPage);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem('freeCheck','true');
    dispatch(talentSourcingMiddleWare()).then(() => {      
      setInitalCheckBox(true);
      setInitialLoader(false)
    });
  }, []);

  const update=(val)=>{
setshow(val)
  }
//  const updatestate=(val)=>{
//     setstore(val)
//     setstore1(val)
//       }
    

  useEffect(() => {
    const getUrl = window.location.href;
    var url = new URL(getUrl);
    var cancel = url.searchParams.get('cancelled');
    var session_id = url.searchParams.get('session');
    const queryParams = new URLSearchParams(uselocation.search);

    if (cancel === 'source_credit') {
      dispatch(paymentCanceledMiddleWare({ cancelled: cancel }))
        .then(() => {
          if (queryParams.has('cancelled')) {
            queryParams.delete('cancelled');
            history.replace({
              search: queryParams.toString(),
            });
          }
        })
        .catch(() => {});
    } else if (cancel !== 'source_credit' && session_id) {
      dispatch(
        talentSourcingsessionIdMiddleWare({
          session_id,
        }),
      )
        .then((response) => {
          setSourceLimit(response.payload.source_limit);
          if (queryParams.has('session_id')) {
            queryParams.delete('session_id');
            history.replace({
              search: queryParams.toString(),
            });
          }
          if (response.payload.show_pop === 1) {
            setCredit(true);
          }
        })
        .catch(() => {
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }
  }, []);

  const {
    location,
    sourceLoader,
    searchData,
    searchLoader,
    unLockLoader,
    bulkUnlockLoader,
    bulkDownloadLoader,
    // candiViewLoader,
    stripeLoader,
    publicKey,
    candi_list,
    candiViewFile,
    plan,
    is_plan,
  } = useSelector(
    ({
      talentSourcingReducers,
      talentSourcingSearchReducers,
      talentUnlockCandidateReducers,
      bulkActionReducers,
      bulkDownloadActionReducers,
      candidateViewReducers,
      stripeReducers,
      permissionReducers,
    }: RootState) => {
      return {
        location: talentSourcingReducers.location,
        sourceLoader: talentSourcingReducers.isLoading,
        searchData: talentSourcingSearchReducers.data,
        searchLoader: talentSourcingSearchReducers.isLoading,
        unLockLoader: talentUnlockCandidateReducers.isLoading,
        bulkUnlockLoader: bulkActionReducers.isLoading,
        bulkDownloadLoader: bulkDownloadActionReducers.isLoading,
        candiViewLoader: candidateViewReducers.isLoading,
        publicKey: stripeReducers.publicKey,
        stripeLoader: stripeReducers.isLoading,
        candi_list: talentSourcingSearchReducers.candi_list,
        candiViewFile: candidateViewReducers.file,
        plan: talentSourcingSearchReducers.plan,
        is_plan: permissionReducers.is_plan,
      };
    },
  );

  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });

  useEffect(() => {
    if (isContact) {
      dispatch(stripeMiddleWare());
    }
  }, [isContact]);

  useEffect(() => {
    setCandiList(candi_list);
  }, [candi_list]);

  // store search data in local
  sessionStorage.setItem('storeSearchData', JSON.stringify(searchData));

  const getStoreSearchData = JSON.parse(
    sessionStorage.getItem('storeSearchData') || 'null',
  );

  const {
    searchBachelorsFilter,
    searchDoctorateFilter,
    searchMastersFilter,
    searchBachelorsMastersFilter,
    searchBachelorsDoctorateFilter,
    searchDoctorateMastersFilter,
    searchThreeFilter,
    searchRelocate,
    searchBachelorRelocate,
    searchMasterRelocate,
    searchDoctorateRelocate,
    searchBachelorMasterRelocate,
    searchBachelorDoctorateRelocate,
    searchMasterDoctorateRelocate,
    searchBachelorsMasterDoctorateRelocate,
    searchExperience,
    searchExperienceBachelor,
    searchExperienceDoctorateMaster,
    searchExperienceMaster,
    searchExperienceDoctorate,
    searchExperienceBachelorMaster,
    searchExperienceBachelorDoctorate,
    searchExperienceBachelorMasterDoctorate,
    searchExperienceRelocate,
    searchBachelorExperienceRelocate,
    searchDoctorateExperienceRelocate,
    searchMastersExperienceRelocate,
    searchMastersDoctorateExperienceRelocate,
    searchBachelorDoctorateExperienceRelocate,
    searchBachelorsMasterExperienceRelocate,
    searchBachelorsMasterDoctorateExperienceRelocate,
    searchUnselectCheckbox,
    searchUnCheckExperience,
    searchOther,
    searchOtherBachelor,
    searchOtherMasters,
    searchOtherDoctorate,
    searchOtherBachelorsMasters,
    searchOtherBachelorsDoctorate,
    searchOtherMastersDoctorate,
    searchOtherBachelorsMastersDoctorate,
    searchOtherExperience,
    searchOtherBachelorExperience,
    searchOtherMastersExperience,
    searchOtherDoctorateExperience,
    searchOtherBachelorsMastersExperience,
    searchOtherBachelorsDoctorateExperience,
    searchOtherMastersDoctorateExperience,
    searchOtherBachelorsMastersDoctorateExperience,
    searchOtherRelocate,
    searchOtherExperienceRelocate,
    searchOtherBachelorRelocate,
    searchOtherBachelorExperienceRelocate,
    searchOtherMastersRelocate,
    searchOtherMastersExperienceRelocate,
    searchOtherDoctorateRelocate,
    searchOtherDoctorateExperienceRelocate,
    searchOtherBachelorsMastersRelocate,
    searchOtherBachelorsMastersExperienceRelocate,
    searchOtherBachelorsDoctorateRelocate,
    searchOtherBachelorsDoctorateExperienceRelocate,
    searchOtherMastersDoctorateReloacate,
    searchOtherMastersDoctorateExperienceRelocate,
    searchOtherBachelorsMastersDoctorateRelocate,
    searchOtherBachelorsMastersDoctorateExperienceRelocate,
  } = talentFilterHelper(getStoreSearchData, isExperience);

  useEffect(() => {
   if(!change){
    filterCondition(
      setSearchData,
      isAny,
      isRelocate,
      isExperience,
      isMasters,
      isDoctorate,
      isBachelors,
      getStoreSearchData,
      searchExperienceRelocate,
      searchRelocate,
      searchExperienceBachelorMasterDoctorate,
      searchBachelorsMasterDoctorateRelocate,
      searchExperienceBachelorMaster,
      searchExperienceBachelorDoctorate,
      searchExperienceDoctorateMaster,
      searchThreeFilter,
      searchBachelorDoctorateRelocate,
      searchMasterDoctorateRelocate,
      searchBachelorMasterRelocate,
      searchExperienceBachelor,
      searchExperienceMaster,
      searchExperienceDoctorate,
      searchBachelorsMastersFilter,
      searchBachelorsDoctorateFilter,
      searchDoctorateMastersFilter,
      searchBachelorRelocate,
      searchMasterRelocate,
      searchDoctorateRelocate,
      searchBachelorsFilter,
      searchDoctorateFilter,
      searchMastersFilter,
      searchExperience,
      searchBachelorExperienceRelocate,
      searchDoctorateExperienceRelocate,
      searchMastersExperienceRelocate,
      searchBachelorsMasterExperienceRelocate,
      searchBachelorDoctorateExperienceRelocate,
      searchMastersDoctorateExperienceRelocate,
      searchBachelorsMasterDoctorateExperienceRelocate,
      searchUnselectCheckbox,
      searchUnCheckExperience,
      isOther,
      searchOther,
      searchOtherBachelor,
      searchOtherMasters,
      searchOtherDoctorate,
      searchOtherBachelorsMasters,
      searchOtherBachelorsDoctorate,
      searchOtherMastersDoctorate,
      searchOtherBachelorsMastersDoctorate,
      searchOtherExperience,
      searchOtherBachelorExperience,
      searchOtherMastersExperience,
      searchOtherDoctorateExperience,
      searchOtherBachelorsMastersExperience,
      searchOtherBachelorsDoctorateExperience,
      searchOtherMastersDoctorateExperience,
      searchOtherBachelorsMastersDoctorateExperience,
      searchOtherRelocate,
      searchOtherExperienceRelocate,
      searchOtherBachelorRelocate,
      searchOtherBachelorExperienceRelocate,
      searchOtherMastersRelocate,
      searchOtherMastersExperienceRelocate,
      searchOtherDoctorateRelocate,
      searchOtherDoctorateExperienceRelocate,
      searchOtherBachelorsMastersRelocate,
      searchOtherBachelorsMastersExperienceRelocate,
      searchOtherBachelorsDoctorateRelocate,
      searchOtherBachelorsDoctorateExperienceRelocate,
      searchOtherMastersDoctorateReloacate,
      searchOtherMastersDoctorateExperienceRelocate,
      searchOtherBachelorsMastersDoctorateRelocate,
      searchOtherBachelorsMastersDoctorateExperienceRelocate,
    );
  }}, [
    isAny,
    isBachelors,
    isDoctorate,
    isMasters,
    searchLoader,
    isRelocate,
    isExperience,
    isOther,
  ]);
  const planId = plan && plan[0] && plan[0].plan_id_id;

  // single unloack submit function
  const handleUnlockSubmit = (values: string) => {
    if (planId === 1) {
      setFree(true);
    }
    if (planId !== 1) {
      dispatch(
        unlockCandidateMiddleWare({
          key: values,
        }),
      )
        .then((response) => {
          if (response.payload.unlock_can_list) {
            dispatch(
              parsedTextMiddleWare({
                unlock_can_list: response.payload.unlock_can_list,
              }),
            );
            setCandiList(response.payload.candi_list);
            setSourceLimit(response.payload.source_limit);
            setCandidatesLimit(response.payload.candi_limit);
            if (
              response.payload.success === true &&
              response.payload.unlock_can_list.length !== 0
            ) {
              setSuccess(true);
            }
          }

          if (response.payload.success === 'no_limit') {
            setNoLimit(true);
          }
          if (response.payload.success === 'no_permission') {
            setNoPermission(true);
          }
          if (response.payload.success === 'no_count') {
            setNoCount(true);
          }
        })
        .catch(() => {
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }
  };

  const hanldeContactModal = () => {
    setNoLimit(false);
    setContact(true);
  };
// open resume function
  const handleCandidateView = (hashKey: string) => {
    setPdfLoader(true)
    setcardloader(true)
    dispatch(
      candidateViewMiddleWare({
        key: hashKey,
      }),
    )
      .then((response) => {
        if (response.payload.file) {
          setShowPdf(true);
        }
          setPdfLoader(false)    
          setcardloader(false)
      })
      .catch(() => {
        Toast(ERROR_MESSAGE, 'LONG', 'error');
        setPdfLoader(false)
        setcardloader(false)
      });
  };

  const handleNoCount = () => {
    setNoCount(false);
    sessionStorage.removeItem('storeSearchData')
    sessionStorage.setItem('superUserTab', '2');
    history.push('/account_setting/settings?planFocus=focus')
  };

  const getFocus = () => {
    document.getElementById('selectAll')?.focus();
  };

  const handleSetPage = (page: number) => {
   setshow(false)
   setIsCheck([])
    setPageNumber(page);
    getFocus();
  };

  const manageUser = () => {
    sessionStorage.removeItem('storeSearchData')
    sessionStorage.setItem('superUserTab', '2');
    history.push('/account_setting/settings?planFocus=focus')
  };

  const updatechckbox=()=>{
    filterCondition(
      setSearchData,
      isAny,
      isRelocate,
      isExperience,
      isMasters,
      isDoctorate,
      isBachelors,
      getStoreSearchData,
      searchExperienceRelocate,
      searchRelocate,
      searchExperienceBachelorMasterDoctorate,
      searchBachelorsMasterDoctorateRelocate,
      searchExperienceBachelorMaster,
      searchExperienceBachelorDoctorate,
      searchExperienceDoctorateMaster,
      searchThreeFilter,
      searchBachelorDoctorateRelocate,
      searchMasterDoctorateRelocate,
      searchBachelorMasterRelocate,
      searchExperienceBachelor,
      searchExperienceMaster,
      searchExperienceDoctorate,
      searchBachelorsMastersFilter,
      searchBachelorsDoctorateFilter,
      searchDoctorateMastersFilter,
      searchBachelorRelocate,
      searchMasterRelocate,
      searchDoctorateRelocate,
      searchBachelorsFilter,
      searchDoctorateFilter,
      searchMastersFilter,
      searchExperience,
      searchBachelorExperienceRelocate,
      searchDoctorateExperienceRelocate,
      searchMastersExperienceRelocate,
      searchBachelorsMasterExperienceRelocate,
      searchBachelorDoctorateExperienceRelocate,
      searchMastersDoctorateExperienceRelocate,
      searchBachelorsMasterDoctorateExperienceRelocate,
      searchUnselectCheckbox,
      searchUnCheckExperience,
      isOther,
      searchOther,
      searchOtherBachelor,
      searchOtherMasters,
      searchOtherDoctorate,
      searchOtherBachelorsMasters,
      searchOtherBachelorsDoctorate,
      searchOtherMastersDoctorate,
      searchOtherBachelorsMastersDoctorate,
      searchOtherExperience,
      searchOtherBachelorExperience,
      searchOtherMastersExperience,
      searchOtherDoctorateExperience,
      searchOtherBachelorsMastersExperience,
      searchOtherBachelorsDoctorateExperience,
      searchOtherMastersDoctorateExperience,
      searchOtherBachelorsMastersDoctorateExperience,
      searchOtherRelocate,
      searchOtherExperienceRelocate,
      searchOtherBachelorRelocate,
      searchOtherBachelorExperienceRelocate,
      searchOtherMastersRelocate,
      searchOtherMastersExperienceRelocate,
      searchOtherDoctorateRelocate,
      searchOtherDoctorateExperienceRelocate,
      searchOtherBachelorsMastersRelocate,
      searchOtherBachelorsMastersExperienceRelocate,
      searchOtherBachelorsDoctorateRelocate,
      searchOtherBachelorsDoctorateExperienceRelocate,
      searchOtherMastersDoctorateReloacate,
      searchOtherMastersDoctorateExperienceRelocate,
      searchOtherBachelorsMastersDoctorateRelocate,
      searchOtherBachelorsMastersDoctorateExperienceRelocate,
    )

  }

  useEffect(() => {
    setSearchData([]);
  }, []);

  // filter refresh function
  const handleRefresh=()=>{
    setBachelors(false)
    setAny(true)
    setDoctorate(false);
    setExperience({
      label: 'All',
      value: 'all',
    })
    setOther(false)
    setMasters(false);
    setRelocate(false)
  }
  
  if(isInitialLoader){
    return <Loader />
  }

 

    console.log("isSearchData",isSearchData);
    console.log("isFind",isFind);
    console.log("iSubmitLoaders",isSubmitLoader);
    console.log("isCheck+++++++++++++++++++++",isCheck,"showww",show);
    
  return (
    <>
    {console.log("changeeee",change)}
   {
    isSubmitLoader&&
    <Loader /> 
   }
    <Flex row className={styles.ribbon} between>
          

    <Flex marginTop={9} marginLeft={8} >
      <Text size={16} bold color="theme" >
      Talent Sourcing
      </Text>

    </Flex>
    <Flex >

      <div className={styles.triangle}></div>
    </Flex>

   </Flex>
    <Flex row className={styles.overAll}>
       
        {(sourceLoader||isPdfLoader||searchLoader||stripeLoader||isCheckOutLoader) && isSubmitLoader}
        <CancelAndDeletePopup
          title={
            'Please subscribe to any of the premium plans to buy credits and unlock candidates'
          }
          btnCancel={() => {
            setFree(false);
          }}
          btnDelete={() => {
            manageUser();
            setFree(false);
          }}
          btnRight={'Upgrade'}
          open={isFree}
        />
        <CandiViewModal
          open={isShowPdf}
          filePath={candiViewFile}
          cancel={() => setShowPdf(false)}
        />
        <UnlockLoaderModal
          title={
            'Downloading resumes... This might take a few minutes to process the files.'
          }
          open={bulkDownloadLoader}
        />
        <UnlockLoaderModal
          title={
            'Unlocking the profiles. Please wait until the process gets completed.'
          }
          open={unLockLoader || bulkUnlockLoader}
        />
        <ContactCreditsModal
          setCheckOutLoader={setCheckOutLoader}
          open={isContact}
          cancelBtnOnClick={() => setContact(false)}
          publicKey={publicKey}
        />

        <CancelAndDeletePopup
          title={
            'You do not have enough contact credits. Do you wish to buy credits to unlock contacts?'
          }
          btnRight={'Buy'}
          open={isNoLimit}
          btnCancel={() => {
            setNoLimit(false);
          }}
          btnDelete={() => {
            hanldeContactModal();
          }}
        />

        <NoCountModal
          title={`You don’t have enough contact credits to unlock`}
          subtitle={`Do you wish to buy?`}
          btnLeftTitle={'Cancel'}
          btnRightTitle={'Buy'}
          open={isNoCount}
          btnLeftOnclick={() => setNoCount(false)}
          btnRightOnclick={handleNoCount}
        />
        <CandidateSuccessModal
          open={isSuccess}
          btnOnclick={() => setSuccess(false)}
          credits={isSourceLimit}
        />
        <SingleButton
          btnTitle="OK"
          title={
            'Please contact your company admin to unlock contacts.'
          }
          open={isNoPermission}
          btnOnclick={() => setNoPermission(false)}
        />
        <SingleButton
          btnTitle="OK"
          title={`Contact credits purchased successfully. Your Available Contact Credits: ${isSourceLimit}`}
          open={isCredit}
          btnOnclick={() => setCredit(false)}
        />
        
        <Flex
          className={styles.titleContainer}
        
           
        >
          <div >
            <Flex className={styles.talentActionContainer}>
              <TalentAction
              update={update}
              val={show}
                setIsCheck={setIsCheck}
                setInitalCheckBox={setInitalCheckBox}
                setFind={setFind}
                setPageNumber={setPageNumber}
                setCandidatesLimit={setCandidatesLimit}
                setSourceLimit={setSourceLimit}
                location={location}
                setSubmitLoader={setSubmitLoader}
                setvisible={setvisible}
              />
            </Flex>
                
          { visible&& isSearchData !== null && (        
          <div className={cx('filterOverAll')}>
          <TalentFilter
                  setchange={setchange}
                  updatechckbox={updatechckbox}
                  apply={apply}
                  setapply={setapply}
                  isInitalCheckBox={isInitalCheckBox}
                  setOther={setOther}
                  isOther={isOther}
                  isBachelors={isBachelors}
                  isDoctorate={isDoctorate}
                  isMasters={isMasters}
                  isAny={isAny}
                  setBachelors={setBachelors}
                  setDoctorate={setDoctorate}
                  setMasters={setMasters}
                  setAny={setAny}
                  isRelocate={isRelocate}
                  
                  setRelocate={setRelocate}
                  isExperience={isExperience}
                  setExperience={setExperience}
                  setInitialPage={setPageNumber}
                  handleRefresh={handleRefresh}
                />
          </div> )}
             
            {(isSearchData?.length === 0 && isFind && !isSubmitLoader) && (
              <div className={styles.emptyStyle}>
                <Empty title="Please enter your search keywords in the required search field to find the candidates" />
              </div>
            )}
            {(isSearchData === null || isSearchData?.length === 0 && !isFind) && !isSubmitLoader && (
                <div className={styles.emptyStyle} style={{marginRight:'3%'}}>
                  <Empty title="No Candidate Found" />
                </div>
              )}
            {isSearchData?.length !== 0 && isSearchData !== null && isSubmitLoader !== true && (
             
              <TalentCardList
                handleSetPage={handleSetPage}
                pageNumber={pageNumber}
                isSubmitLoader={isSubmitLoader}
                update={update}
                val={show}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                setCandiList={setCandiList}
                setNoCount={setNoCount}
                candi_list={isCandiList}
                setNoLimit={setNoLimit}
                setNoPermission={setNoPermission}
                setSuccess={setSuccess}
                setCandidatesLimit={setCandidatesLimit}
                isCandidatesLimit={isCandidatesLimit}
                handleCandidateView={handleCandidateView}
                isRelocate={isRelocate}
                isExperience={isExperience}
                isBachelors={isBachelors}
                isDoctorate={isDoctorate}
                isMasters={isMasters}
                isAny={isAny}
                searchLoader={searchLoader}
               
                searchData={isSearchData}
                handleUnlockSubmit={handleUnlockSubmit}
                source_limit={isSourceLimit}
                setSourceLimit={setSourceLimit}
                planID={planId}
                setFree={setFree}
              />
             
            )}
            
          </div>
        
            {
              cardloader&&
              <Loader /> 
             }
      
          
        </Flex>
       
    </Flex>
    </>
  );
};

export default TalentSourcingScreen;