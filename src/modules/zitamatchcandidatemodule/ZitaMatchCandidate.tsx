import { useEffect, useState, useRef } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { saveAs } from 'file-saver';
import axios from 'axios';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import { getBlur, getDateString, getFocus, isEmpty } from '../../uikit/helper';
import Pangination from '../../uikit/Pagination/Pangination';
import { AppDispatch, RootState } from '../../store';
import { inviteToApplyApi, zitaMatchDownloadApi } from '../../routes/apiRoutes';
import Loader from '../../uikit/Loader/Loader';
import Toast from '../../uikit/Toast/Toast';
import { InputText } from '../../uikit';
import { enterKeyPress } from '../../uikit/helper';
import SvgSearch from '../../icons/SvgSearch';
import SvgLocation from '../../icons/SvgLocation';
import SvgNoCandidate from '../../icons/SvgNoCandidate';
import SvgIntomark from '../../icons/Intomark';
import {
  applicantPipeLineDataMiddleWare,
  applicantPipeLineMiddleWare,
} from '../applicantpipelinemodule/store/middleware/applicantpipelinemiddleware';
import { qualificationFilterHelper } from '../common/commonHelper';
import { config, ERROR_MESSAGE } from '../constValue';
import ProfileView from '../applicantpipelinemodule/ProfileView';
import { applicantFavoriteMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import ZitaMatchFilters from './ZitaMatchFilters';
import styles from './zitamatchcandidate.module.css';
import {
  zitaMatchCandidateMiddleWare,
  zitaMatchDataCandidateMiddleWare,
} from './store/middleware/zitamatchcandidatemiddleware';
import ZitaAction from './ZitaAction';
import JobTitleCard from './JobTitleCard';
import { SkillListEntity } from './zitaMatchCandidateTypes';
import { sortOptions } from './mock';
import ZitaMatchDataCard from './ZitaMatchDataCard';
import ZitaMatchCandidateDrawer from './ZitaMatchCandidateDrawer';

const cx = classNames.bind(styles);

var querystring = require('querystring');

type ParamsType = {
  jdId: string;
};

const ZitaMatchCandidate = () => {
  const myRef = useRef<any>();

  const selectInputRef = useRef<any>();
  const [isOut, setOut] = useState(false);
  const { jdId } = useParams<ParamsType>();
  const history = useHistory();
  const [location, setlocation] = useState('');
  const [profilevalue, setprofilevalue] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const [isMatchRadio, setMatchRadio] = useState('');
  const [isProfile, setProfile] = useState('');
  const [isBachelors, setBachelors] = useState(false);
  const [isDiploma, setisDiploma] = useState(false);
  const [isDoctorate, setDoctorate] = useState(false);
  const [isMasters, setMasters] = useState(false);
  const [isAny, setAny] = useState(true);
  const [isOther, setOther] = useState(false);
  const [isSearch, setSearch] = useState('');
  const [isSkills, setSkills] = useState<any>();
  const [isSkillOption, setSkillOption] = useState<any>('');
  const [isExperience, setExperience] = useState('');
  const [isJobType, setJobType] = useState('');
  const [isCandiStatus, setCandiStatus] = useState('');
  const [isRelocate, setRelocate] = useState(false);
  const [isLocation, setLocation] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [islocationsearch, setlocationsearch] = useState('');
  const [isCheck, setIsCheck] = useState<any>([]);
  const [isTotalFav, setTotalFav] = useState(false);
  const [isInviteLoader, setInviteLoader] = useState(false);
  const [isDownloadLoader, setDownLoadLoader] = useState(false);
  const [isProfileView, setProfileView] = useState(false);
  const [isPage, setPage] = useState(0);
  const [isSortOptions, setSortOptions] = useState(sortOptions[0]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const getCandiId = query.get('candi_id');

  const favAdd = isTotalFav ? 'add' : '';

  useEffect(() => {
    dispatch(zitaMatchCandidateMiddleWare({ jd_id: jdId })).then(() => {
      if (!isEmpty(getCandiId)) {
        setProfileView(true);
      }
    });
    dispatch(
      zitaMatchDataCandidateMiddleWare({
        jd_id: jdId,
      }),
    );
  }, []);

  const {
    jd_id,
    job_details,
    datas,
    total_applicants,
    favLoader,
    zitaLoader,
    initalLoader,
    applicants_count,
    is_plan,
  } = useSelector(
    ({
      zitaMatchCandidateReducers,
      zitaMatchDataCandidateReducers,
      applicantFavReducers,
      permissionReducers,
    }: RootState) => {
      return {
        jd_id: zitaMatchCandidateReducers.jd_id,
        job_details: zitaMatchCandidateReducers.job_details,
        datas: zitaMatchDataCandidateReducers.data,

        total_applicants: zitaMatchDataCandidateReducers.total_count,
        favLoader: applicantFavReducers.isLoading,
        zitaLoader: zitaMatchDataCandidateReducers.isLoading,
        initalLoader: zitaMatchCandidateReducers.isLoading,
        applicants_count: zitaMatchCandidateReducers.applicants_count,
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
  const usersPerPage = 15;
  const pageCount = Math.ceil(total_applicants / usersPerPage);

  const skillsOptionsList =
    isSkillOption &&
    isSkillOption.map((optionList: { value: string }) => {
      return optionList.value;
    });

  const filterTotalFav = () => {
    setTotalFav(!isTotalFav);
  };

  const handleSearchSubmit = () => {
    setIsCheck([]);

    dispatch(
      zitaMatchDataCandidateMiddleWare({
        jd_id: jdId,
        profile_match: isProfile,
        fav: favAdd,
        candidate: isSearch,
        location: islocationsearch,
        sort: isSortOptions.value,
        work_experience: isExperience,
        relocate: isRelocate ? '1' : '0',
        invite: isCandiStatus,
        profile_view: isProfile,
        education_level: qaValue,
        type_of_job: isJobType,
        preferred_location: isLocation ? '1' : '0',
        skill_match: skillsOptionsList,
        page: isPage + 1,
      }),
    );
  };

  const onClearSearch = () => {
    setSearch('');

    dispatch(
      zitaMatchDataCandidateMiddleWare({
        jd_id: jdId,
        profile_match: isProfile,
        fav: favAdd,
        candidate: '',
        location: islocationsearch,
        sort: isSortOptions.value,
        work_experience: isExperience,
        relocate: isRelocate ? '1' : '0',
        invite: isCandiStatus,
        profile_view: isProfile,
        education_level: qaValue,
        type_of_job: isJobType,
        preferred_location: isLocation ? '1' : '0',
        skill_match: skillsOptionsList,
        page: isPage + 1,
      }),
    );
  };

  const hanldeMatch = (listValue: SkillListEntity) => {
    setMatchRadio(listValue.label);
  };
  const hanldeProfile = (listValue: SkillListEntity) => {
    setProfile(listValue.label);
    setprofilevalue(listValue.value);
  };

  const handleBachelor = () => {
    setBachelors(!isBachelors);
    setAny(false);
  };
  const handleDiploma = () => {
    setisDiploma(!isDiploma);
    setAny(false);
  };

  const handleDoctorate = () => {
    setDoctorate(!isDoctorate);
    setAny(false);
  };

  const handleMaster = () => {
    setMasters(!isMasters);
    setAny(false);
  };

  const handleOther = () => {
    setOther(!isOther);
    setAny(false);
  };

  const handleAny = () => {
    setAny(!isAny);
    setBachelors(false);
    setisDiploma(false);
    setDoctorate(false);
    setMasters(false);
    setOther(false);
  };

  const qualificationOption = [
    {
      value: 'Bachelors',
      label: 'Bachelor',
      checked: isBachelors,
      onChange: handleBachelor,
      width: 110,
    },
    {
      value: 'Masters',
      label: 'Master',
      checked: isMasters,
      onChange: handleMaster,
      width: 110,
    },
    {
      value: 'Doctorate',
      label: 'Doctorate',
      checked: isDoctorate,
      onChange: handleDoctorate,
      width: 87,
    },
    {
      value: 'Diploma',
      label: 'Diploma',
      checked: isDiploma,
      onChange: handleDiploma,
      width: 110,
    },
    {
      value: 'Any',
      label: 'any',
      width: 110,
      checked: isAny,
      onChange: handleAny,
    },
    {
      value: 'Others',
      label: 'Other',
      checked: isOther,
      onChange: handleOther,
      width: 110,
    },
  ];

  useEffect(() => {
    if (
      isBachelors === false &&
      isDoctorate === false &&
      isMasters === false &&
      isDiploma === false &&
      isOther === false
    ) {
      setAny(true);
    }
  }, [isBachelors, isDoctorate, isMasters, isDiploma, isOther]);

  const qaValue = qualificationFilterHelper(
    isAny,
    isBachelors,
    isDoctorate,
    isDiploma,
    isMasters,
    isOther,
  );

  const handleExperience = (selectedValue: string) => {
    if (!change) {
      setIsCheck([]);
      dispatch(
        zitaMatchDataCandidateMiddleWare({
          jd_id: jdId,
          profile_match: isMatchRadio,
          fav: favAdd,
          candidate: isSearch,
          location: islocationsearch,
          sort: isSortOptions.value,
          work_experience: selectedValue,
          relocate: isRelocate ? '1' : '0',
          invite: isCandiStatus,
          profile_view: isProfile,
          education_level: qaValue,
          type_of_job: isJobType,
          preferred_location: isLocation ? '1' : '0',
          skill_match: skillsOptionsList,
          page: isPage + 1,
        }),
      );
    }
  };

  const handlesortby = (selectedValue: string) => {
    dispatch(
      zitaMatchDataCandidateMiddleWare({
        jd_id: jdId,
        profile_match: isProfile,
        fav: favAdd,
        candidate: isSearch,
        location: islocationsearch,
        sort: selectedValue,
        work_experience: isExperience,
        relocate: isRelocate ? '1' : '0',
        invite: isCandiStatus,
        profile_view: isProfile,
        education_level: qaValue,
        type_of_job: isJobType,
        preferred_location: isLocation ? '1' : '0',
        skill_match: skillsOptionsList,
        page: isPage + 1,
      }),
    );
  };

  const handleRelocate = () => {
    setRelocate(!isRelocate);
    setchange(true);
  };
  const handleLocation = () => {
    setLocation(!isLocation);

    setchange(true);
  };

  const candiList = datas.map((list) => {
    return list.id.toString();
  });

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(candiList);
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const onClearLocationsearch = () => {
    setlocationsearch('');
    dispatch(
      zitaMatchDataCandidateMiddleWare({
        jd_id: jdId,
        profile_match: isProfile,
        fav: favAdd,
        candidate: isSearch,
        location: '',
        sort: isSortOptions.value,
        work_experience: isExperience,
        relocate: isRelocate ? '1' : '0',
        invite: isCandiStatus,
        profile_view: isProfile,
        education_level: qaValue,
        type_of_job: isJobType,
        preferred_location: isLocation ? '1' : '0',
        skill_match: skillsOptionsList,
        page: isPage + 1,
      }),
    );
  };
  const datafun = () => {
    dispatch(
      zitaMatchDataCandidateMiddleWare({
        jd_id: jdId,
        profile_match: isMatchRadio,
        fav: favAdd,
        candidate: isSearch,
        location: islocationsearch,
        sort: isSortOptions.value,
        work_experience: isExperience,
        relocate: isRelocate ? '1' : '0',
        invite: isCandiStatus,
        profile_view: isProfile,
        education_level: qaValue,
        type_of_job: isJobType,
        preferred_location: isLocation ? '1' : '0',
        skill_match: skillsOptionsList,
        page: isPage + 1,
      }),
    );
    setIsCheck([]);
  };

  const handleClick = (e: { target: { id: string; checked: boolean } }) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item: any) => item !== id));
    }
  };

  useEffect(() => {
    if (isCheck && isCheck.length !== datas?.length) {
      setIsCheckAll(false);
    }
  }, [isCheck]);

  const [change, setchange] = useState(false);
  if (
    isCheck.length === datas.length &&
    isCheckAll === false &&
    datas.length !== 0
  ) {
    setIsCheckAll(true);
  }

  useEffect(() => {
    if (!change) {
      datafun();
    }
  }, [
    isSkillOption,
    isBachelors,
    isDoctorate,
    isDiploma,
    isMasters,
    isAny,
    isOther,
    isMatchRadio,
    isProfile,
    isJobType,
    isCandiStatus,
    isTotalFav,
    isRelocate,
    isLocation,
    favLoader,
    isInviteLoader,
    isPage,
    change,
  ]);
  // filter refesh function
  const hanldeRefresh = () => {
    setDoctorate(false);
    setMasters(false);
    setAny(true);
    setBachelors(false);
    setisDiploma(false);
    setOther(false);
    setSearch('');
    setlocationsearch('');
    setMatchRadio('');
    setExperience('');
    setProfile('');
    setSkillOption('');
    setJobType('');
    setCandiStatus('');
    setRelocate(false);
    setLocation(false);
    setSortOptions({ value: 'match', label: 'Match Score' });
    dispatch(
      zitaMatchDataCandidateMiddleWare({
        jd_id: jdId,
        profile_match: '',
        fav: favAdd,
        candidate: '',
        location: '',
        sort: 'match',
        work_experience: '',
        relocate: '0',
        invite: isCandiStatus,
        profile_view: '',
        education_level: '',
        type_of_job: '',
        preferred_location: '0',
        skill_match: '',
        page: isPage + 1,
      }),
    );
  };

  const handleradiovclear = () => {
    setMatchRadio('');
  };
  const wrapperRef = useRef(null);
  const handleexpclear = () => {
    if (!change) {
      setExperience('');
      dispatch(
        zitaMatchDataCandidateMiddleWare({
          jd_id: jdId,
          profile_match: isMatchRadio,
          fav: favAdd,
          candidate: isSearch,
          location: islocationsearch,
          sort: isSortOptions.value,
          work_experience: '',
          relocate: isRelocate ? '1' : '0',
          invite: isCandiStatus,
          profile_view: isProfile,
          education_level: qaValue,
          type_of_job: isJobType,
          preferred_location: isLocation ? '1' : '0',
          skill_match: skillsOptionsList,
          page: isPage + 1,
        }),
      );
    }
  };

  const hanleprofileclear = () => {
    setProfile('');
    setprofilevalue('');
  };

  const hanlejobtypeclear = () => {
    setJobType('');
  };
  // resume download function
  const hanldeDownload = () => {
    if (isCheck.length !== 0) {
      setDownLoadLoader(true);
      const data = querystring.stringify({
        jd: jd_id,
        candi_id: isCheck.toString(),
        download: 'download',
      });

      axios
        .post(zitaMatchDownloadApi, data, config)
        .then((response) => {
          setDownLoadLoader(false);
          if (response.data.file_path) {
            saveAs(
              window.location.protocol + '//' + response.data.file_path,
              `Candidates_Profiles_${getDateString(new Date(), 'll')}.zip`,
            );
          }
          Toast('Resume exported successfully');
        })
        .catch(() => {
          setDownLoadLoader(false);
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }
  };
  // filter fav function
  const hanldeFav = (can_id: number) => {
    dispatch(applicantFavoriteMiddleWare({ jd_id, can_id }));
  };
  // invite function
  const hanldeInvite = (can_id: number) => {
    setInviteLoader(true);
    const data = querystring.stringify({
      jd_id,
      candi_id: can_id,
    });
    axios
      .post(inviteToApplyApi, data, config)
      .then(() => {
        setInviteLoader(false);
        Toast('Candidate invited successfully');
      })
      .catch(() => {
        setInviteLoader(false);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  const handleApplicant = () => {
    dispatch(applicantPipeLineMiddleWare({ jd_id })).then((res) => {
      dispatch(
        applicantPipeLineDataMiddleWare({
          jd_id: res.payload.jd_id,
        }),
      );
    });
  };
  // useEffect(() => {
  //   if (isSearch !== '') setOut(true);
  // }, [isSearch]);

  // pagination function
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [isPage, pageCount]);

  const handleSetPagination = (a: number) => {
    // getFocus('zitaaction__checkbox');
    setPage(a);
    // getBlur('zitaaction__checkbox');
    if (datas.length !== 0) {
      getFocus(datas[0].id.toString());
      getBlur(datas[0].id.toString());
    }
  };

  // close applicant and candidate view function
  const handleClose = () => {
    dispatch(
      zitaMatchDataCandidateMiddleWare({
        jd_id: jdId,
        profile_match: isProfile,
        fav: favAdd,
        candidate: isSearch,
        work_experience: isExperience,
        relocate: isRelocate ? '1' : '0',
        invite: isCandiStatus,
        profile_view: isProfile,
        education_level: qaValue,
        type_of_job: isJobType,
        preferred_location: isLocation ? '1' : '0',
        skill_match: skillsOptionsList,
        page: isPage + 1,
      }),
    );

    if (query.has('candi_id')) {
      query.delete('candi_id');
      history.replace({
        search: query.toString(),
      });
    }
    setProfileView(false);
  };

  return (
    // <Flex row className={styles.overAll}>

    //   {!isEmpty(getCandiId) && (
    //     <ZitaMatchCandidateDrawer
    //       activeState={0}
    //       open={isProfileView}
    //       cancel={handleClose}
    //       jobId={jdId}
    //       candidateId={getCandiId}
    //     />
    //   )}
    //   {!isEmpty(getCandiId) && (
    //     <ProfileView
    //       open={isProfileView}
    //       cancel={handleClose}
    //       jobId={jdId}
    //       candidateId={getCandiId}
    //     />
    //   )}
    //   {zitaLoader && <Loader />}
    //   {initalLoader && <Loader />}
    //   {isDownloadLoader && <Loader />}
    //   {isInviteLoader && <Loader />}
    //   <div className={styles.filterOverAll}>

    //     <ZitaMatchFilters
    //       setSearch={setSearch}
    //       isSearch={isSearch}
    //       handleSearchSubmit={handleSearchSubmit}
    //       isMatchRadio={isMatchRadio}
    //       hanldeMatch={hanldeMatch}
    //       handleExperience={handleExperience}
    //       setExperience={setExperience}
    //       setSkills={setSkills}
    //       setSkillOption={setSkillOption}
    //       isSkills={isSkills}
    //       isJobType={isJobType}
    //       setJobType={setJobType}
    //       hanldeProfile={hanldeProfile}
    //       isProfile={isProfile}
    //       qualificationOption={qualificationOption}
    //       isCandiStatus={isCandiStatus}
    //       setCandiStatus={setCandiStatus}
    //       isRelocate={isRelocate}
    //       handleRelocate={handleRelocate}
    //       isLocation={isLocation}
    //       handleLocation={handleLocation}
    //       hanldeRefresh={hanldeRefresh}
    //       isExperience={isExperience}
    //     />
    //   </div>

    //   <Flex row className={cx('scollDiv')}>
    //     <Flex
    //       columnFlex
    //       height={'100%'}
    //       width={'100%'}

    //     >
    //       <Flex row center className={styles.titleContainer}>
    //         <Text bold size={16} color="black">
    //           Zita Match Candidates
    //         </Text>
    //         {applicants_count === 0 ? (
    //           <Button
    //             disabled={true}
    //             className={styles.btnStyle}
    //             types="primary"
    //             onClick={handleApplicant}
    //           >
    //             Applicants Pipeline
    //           </Button>
    //         ) : (
    //           <Link to={`/applicant_pipe_line/${jd_id}`}>
    //             <Button
    //               className={styles.btnStyle}
    //               types="primary"
    //               onClick={handleApplicant}
    //             >
    //               Applicants Pipeline
    //             </Button>
    //           </Link>
    //         )}
    //       </Flex>
    //       <JobTitleCard job_details={job_details} />
    //       {total_applicants !== 0 && (
    //         <ZitaAction
    //           total={total_applicants}
    //           filterTotalFav={filterTotalFav}
    //           isTotalFav={isTotalFav}
    //           handleSelectAll={handleSelectAll}
    //           isCheckAll={isCheckAll}
    //           hanldeDownload={hanldeDownload}
    //           isCheck={isCheck}
    //         />
    //       )}
    //       <div
    //         style={{
    //           height: window.innerHeight - 232,
    //           overflowY: 'scroll',
    //           paddingBottom: 16,
    //           paddingRight: 12,
    //         }}
    //       >
    //         <>
    //           {total_applicants === 0 && (
    //             <Flex height={'100%'} flex={1} center middle>
    //               <Text color="gray">No Candidates Found</Text>
    //             </Flex>
    //           )}

    //           {datas &&
    //             datas.map((dataList, index) => {
    //               return (
    //                 <ZitaMatchDataCard
    //                   hanldeFav={hanldeFav}
    //                   dataList={dataList}
    //                   key={index + dataList.first_name}
    //                   index={index}
    //                   jobId={jd_id}
    //                   isCheck={isCheck}
    //                   handleClick={handleClick}
    //                   hanldeInvite={hanldeInvite}
    //                   isProfile={isProfile}
    //                   favAdd={favAdd}
    //                   isSearch={isSearch}
    //                   isExperience={isExperience}
    //                   isRelocate={isRelocate}
    //                   isCandiStatus={isCandiStatus}
    //                   qaValue={qaValue}
    //                   isJobType={isJobType}
    //                   isLocation={isLocation}
    //                   skillsOptionsList={skillsOptionsList}
    //                   isPage={isPage}
    //                 />
    //               );
    //             })}
    //           {total_applicants > 20 && (
    //             <Flex middle className={styles.pagination}>
    //               <Pangination
    //                 maxPages={pageCount - 1}
    //                 currentPage={isPage}
    //                 setCurrentPage={handleSetPagination}
    //               />
    //             </Flex>
    //           )}
    //         </>
    //       </div>
    //     </Flex>
    //   </Flex>
    // </Flex>
    <Flex className={styles.overAll}>
      {!isEmpty(getCandiId) && (
        <ZitaMatchCandidateDrawer
          activeState={0}
          open={isProfileView}
          cancel={handleClose}
          jobId={jdId}
          candidateId={getCandiId}
        />
      )}
      {!isEmpty(getCandiId) && (
        <ProfileView
          open={isProfileView}
          cancel={handleClose}
          jobId={jdId}
          candidateId={getCandiId}
        />
      )}
      {favLoader !== true && zitaLoader && <Loader />}
      {initalLoader && <Loader />}
      {isDownloadLoader && <Loader />}
      {isInviteLoader && <Loader />}

      <Flex row className={styles.titleContainer}>
        <Text bold size={16} color="theme">
          Zita Match Candidates
        </Text>
        <JobTitleCard job_details={job_details} />
        <div className={styles.triangle}> </div>
      </Flex>

      <Flex row between marginBottom={15}>
        <Flex>
          <Flex
            row
            style={{ position: 'relative', overFlowX: 'auto' }}
            className={styles.searchbox}
          >
            <Flex row className={styles.searchstyle}>
              <Text className={styles.jobstext} style={{ fontSize: '13px' }}>
                Candidates
              </Text>
              <Flex row className={styles.searchboxoverall}>
                <InputText
                  ref={myRef}
                  value={isSearch}
                  className={styles.boxstyle}
                  onChange={(e) => setSearch(e.target.value)}
                  id="zitamatchfilters__search"
                  placeholder="Search candidate by name or email"
                  actionRight={() => (
                    <label
                      htmlFor={'zitamatchfilters__search'}
                      style={{ margin: 0 }}
                      //  onClick={handleSearchSubmit}
                      tabIndex={-1}
                      role={'button'} // eslint-disable-line
                    >
                      {isSearch.trim() !== '' && (
                        <button
                          className={styles.crossIcon}
                          onClick={onClearSearch}
                        >
                          <SvgIntomark width={14} height={14} fill="#888888" />
                        </button>
                      )}
                    </label>
                  )}
                  onKeyPress={(e) => enterKeyPress(e, handleSearchSubmit)}
                />
                <Flex className={styles.middleline}></Flex>
                <Flex className={styles.locationicon}>
                  <SvgLocation width={18} height={18} fill={'#581845'} />
                </Flex>
                <InputText
                  ref={myRef}
                  labelBold
                  value={islocationsearch}
                  onChange={(e) => setlocationsearch(e.target.value)}
                  onKeyPress={(e) => enterKeyPress(e, handleSearchSubmit)}
                  placeholder="Select candidate location"
                  className={styles.boxstyle}
                />{' '}
                {islocationsearch.trim() !== '' && (
                  <button
                    className={styles.crossIcon}
                    onClick={onClearLocationsearch}
                  >
                    <SvgIntomark width={14} height={14} fill="#888888" />
                  </button>
                )}
                <Flex className={styles.searchicons}>
                  <SvgSearch width={12} height={12} fill="#ffffff" />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          {applicants_count === 0 ? (
            <Button
              disabled={true}
              className={styles.btnStyle}
              types="primary"
              onClick={handleApplicant}
              style={{ marginRight: '10px' }}
            >
              Applicants Pipeline
            </Button>
          ) : (
            <Link to={`/applicant_pipe_line/${jd_id}`} target="blank">
              <Button
                className={styles.btnStyle}
                types="primary"
                onClick={handleApplicant}
                style={{ marginRight: '10px' }}
              >
                Applicants Pipeline
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>

      <Flex>
        <ZitaMatchFilters
          setchange={setchange}
          isSkillOption={isSkillOption}
          handleBachelor={handleBachelor}
          handleDoctorate={handleDoctorate}
          handleMaster={handleMaster}
          handleOther={handleOther}
          isBachelors={isBachelors}
          isdiploma={isDiploma}
          handleDiploma={handleDiploma}
          isDoctorate={isDoctorate}
          isMasters={isMasters}
          isOther={isOther}
          setLocation={setLocation}
          setRelocate={setRelocate}
          setSearch={setSearch}
          isSearch={isSearch}
          isAny={isAny}
          handleSearchSubmit={handleSearchSubmit}
          isMatchRadio={isMatchRadio}
          hanldeMatch={hanldeMatch}
          handleExperience={handleExperience}
          setExperience={setExperience}
          setSkills={setSkills}
          setSkillOption={setSkillOption}
          isSkills={isSkills}
          isJobType={isJobType}
          hanlejobtypeclear={hanlejobtypeclear}
          setJobType={setJobType}
          handleexpclear={handleexpclear}
          hanldeProfile={hanldeProfile}
          handleradiovclear={handleradiovclear}
          isProfile={isProfile}
          profilevalue={profilevalue}
          qualificationOption={qualificationOption}
          isCandiStatus={isCandiStatus}
          setCandiStatus={setCandiStatus}
          hanleprofileclear={hanleprofileclear}
          isRelocate={isRelocate}
          handleRelocate={handleRelocate}
          isLocation={isLocation}
          handleLocation={handleLocation}
          hanldeRefresh={hanldeRefresh}
          isExperience={isExperience}
        />
      </Flex>
      <Flex>
        <ZitaAction
          total={total_applicants}
          filterTotalFav={filterTotalFav}
          isTotalFav={isTotalFav}
          handleSelectAll={handleSelectAll}
          isCheckAll={isCheckAll}
          hanldeDownload={hanldeDownload}
          isCheck={isCheck}
          setSortOptions={setSortOptions}
          isSortOptions={isSortOptions}
          handlesortby={handlesortby}
        />
      </Flex>

      <div
        // className={styles.cards}
        ref={wrapperRef}
        style={{
          height: window.innerHeight - 303 + 54,
          overflowY: 'scroll',
          paddingRight: 0,
          paddingTop: 0,
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
        }}
      >
        {total_applicants === 0 && (
          <Flex
            height={'100%'}
            flex={1}
            center
            middle
            style={{ display: 'flex' }}
          >
            <SvgNoCandidate style={{ filter: 'opacity(0.6)' }} />
            <Text color="gray">No Candidate Found</Text>
          </Flex>
        )}

        {datas &&
          datas.map((dataList, index) => {
            return (
              <ZitaMatchDataCard
                hanldeFav={hanldeFav}
                dataList={dataList}
                key={index + dataList.first_name}
                index={index}
                jobId={jd_id}
                isCheck={isCheck}
                handleClick={handleClick}
                hanldeInvite={hanldeInvite}
                isProfile={isProfile}
                favAdd={favAdd}
                isSearch={isSearch}
                isExperience={isExperience}
                isRelocate={isRelocate}
                isCandiStatus={isCandiStatus}
                qaValue={qaValue}
                isJobType={isJobType}
                isLocation={isLocation}
                skillsOptionsList={skillsOptionsList}
                isPage={isPage}
              />
            );
          })}
        {total_applicants > 15 && (
          <Flex middle className={styles.pagination}>
            <Pangination
              maxPages={pageCount - 1}
              currentPage={isPage}
              setCurrentPage={handleSetPagination}
            />
          </Flex>
        )}
      </div>
    </Flex>
  );
};

export default ZitaMatchCandidate;
