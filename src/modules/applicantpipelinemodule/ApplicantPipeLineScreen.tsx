import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Loader from '../../uikit/Loader/Loader';
import Button from '../../uikit/Button/Button';
import { AppDispatch, RootState } from '../../store';
import {
  AERO,
  CANDY_PINK,
  MEDIUM_PURPLE,
  PISTACHIO,
  SUNRAY,
  GRAY_BLACK,
} from '../../uikit/Colors/colors';
import { qualificationFilterHelper } from '../common/commonHelper';
import SvgSearch from '../../icons/SvgSearch';
import SvgLocation from '../../icons/SvgLocation';
import { InputSearch } from '../../uikit';
import InputText from '../../uikit/InputText/InputText';
import { myJobPostingDataMiddleWare } from '../myjobposting/store/middleware/myjobpostingmiddleware';
import PipelinePopup from './pipelinepopup';
import {
  applicantPipeLineDataMiddleWare,
  applicantPipeLineMiddleWare,
} from './store/middleware/applicantpipelinemiddleware';
import DndTitle from './DndTitle';
import ProfileView from './ProfileView';
import TotalApplicant from './TotalApplicant';
import JobTitleCard from './JobTitleCard';
import DndBoardScreen from './DndBoardScreen';
// eslint-disable-next-line import/no-cycle
import ApplicantPipeLineFilter from './ApplicantPipeLineFilter';
import styles from './applicantpipelinescreen.module.css';
import { JobDetailsEntity } from './applicantPipeLineTypes';
import { handleDownload } from './dndBoardHelper';

export type listValue = {
  value: string;
  label: string;
};
type ParamsType = {
  jdId: string;
};
const initial = {
  location: '',
};
type FormProps = {
  location: string[];
};
const ApplicantPipeLineScreen = ({ location }: FormProps) => {
  const { jdId } = useParams<ParamsType>();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [isMatchRadio, setMatchRadio] = useState('');
  const [isProfile, setProfile] = useState('');
  const [isBachelors, setBachelors] = useState(false);
  const [isDoctorate, setDoctorate] = useState(false);
  const [isMasters, setMasters] = useState(false);
  const [isAny, setAny] = useState(true);
  const [isOther, setOther] = useState(false);
  const [isSearch, setSearch] = useState('');
  const [isSkills, setSkills] = useState<any>();
  const [isSkillOption, setSkillOption] = useState<any>('');
  const [isExperience, setExperience] = useState('');
  const [isTotalFav, setTotalFav] = useState(false);
  const [isSortApplicant, setSortApplicant] = useState('match');
  const [isSortSortList, setSortSortList] = useState('match');
  const [isSortInterview, setSortInterview] = useState('match');
  const [isSortSelected, setSortSelected] = useState('match');
  const [isSortRejected, setSortRejected] = useState('match');
  const [isApplicantView, setApplicantView] = useState(false);
  const myRef = useRef<any>();
  //showpop
  const [showPipelinePopup, setShowPipelinePopup] = useState(false);
  const [cardSelection, setCardSelection] = useState<
    Map<
      string,
      {
        task: any;
        index: number;
        columnId: string;
        job_details: JobDetailsEntity;
      }
    >
  >(new Map());

  const favAdd = isTotalFav ? 'add' : '';

  const getAppliedView = localStorage.getItem('applied_view');

  useEffect(() => {
    dispatch(applicantPipeLineMiddleWare({ jd_id: jdId })).then(() => {
      dispatch(
        applicantPipeLineDataMiddleWare({
          jd_id: jdId,
        }),
      );
    });
  }, []);

  const {
    location_list,
    jd_id,
    interviewed,
    applicant,
    shortlisted,
    Test,
    selected,
    rejected,
    applicantDataLoader,
    favLoader,
    favSuccess,
    total_applicants,
    pipeLineLoader,
    outlook,
    google,
    job_details,
    updateLoader,
    zita_match_count,
    is_plan,
  } = useSelector(
    ({
      myJobPosingReducers,
      applicantPipeLineReducers,
      applicantPipeLineDataReducers,
      applicantFavReducers,
      applicantPipeLineUpdateReducers,
      permissionReducers,
    }: RootState) => {
      return {
        location_list: myJobPosingReducers.location_list,
        jd_id: applicantPipeLineReducers.jd_id,
        interviewed: applicantPipeLineDataReducers.interviewed,
        rejected: applicantPipeLineDataReducers.rejected,
        selected: applicantPipeLineDataReducers.selected,
        shortlisted: applicantPipeLineDataReducers.shortlisted,
        Test: applicantPipeLineDataReducers.shortlisted,
        applicant: applicantPipeLineDataReducers.applicant,
        applicantDataLoader: applicantPipeLineDataReducers.isLoading,
        favLoader: applicantFavReducers.isLoading,
        favSuccess: applicantFavReducers.success,
        total_applicants: applicantPipeLineDataReducers.total_applicants,
        pipeLineLoader: applicantPipeLineReducers.isLoading,
        google: applicantPipeLineDataReducers.google,
        outlook: applicantPipeLineDataReducers.outlook,
        job_details: applicantPipeLineReducers.job_details,
        updateLoader: applicantPipeLineUpdateReducers.isLoading,
        zita_match_count: applicantPipeLineReducers.zita_match_count,
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

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
  });
  useEffect(() => {
    dispatch(
      myJobPostingDataMiddleWare({
        location: formik.values.location,
      }),
    );
  }, [formik.values]);

  //card selection

  const handleCardSelection = (data: {
    task: any;
    index: number;
    columnId: string;
    job_details: JobDetailsEntity;
  }) => {
    console.log(data);
    const newCardSelection = new Map(cardSelection);
    if (cardSelection.has(data.task.id)) {
      newCardSelection.delete(data.task.id);
    } else {
      newCardSelection.set(data.task.id, data);
    }
    setCardSelection(newCardSelection);
  };
  const selectedCardsList = Array.from(cardSelection.values());

  const handleBulkExport = () => {
    cardSelection.forEach((doc) => {
      handleDownload(doc.task.file);
    });
  };

  // filter match function
  const hanldeMatch = (listValue: listValue) => {
    setMatchRadio(listValue.value);
  };

  const hanldeProfile = (listValue: listValue) => {
    setProfile(listValue.value);
  };
  // filter bachelor function
  const handleBachelor = () => {
    setBachelors(!isBachelors);
    setAny(false);
  };
  // filter doctorate function
  const handleDoctorate = () => {
    setDoctorate(!isDoctorate);
    setAny(false);
  };
  // filter master function
  const handleMaster = () => {
    setMasters(!isMasters);
    setAny(false);
  };
  // filter other function
  const handleOther = () => {
    setOther(!isOther);
    setAny(false);
  };

  // filter any function
  const handleAny = () => {
    setAny(!isAny);
    setBachelors(false);
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
    },
    {
      value: 'Masters',
      label: 'Master',
      checked: isMasters,
      onChange: handleMaster,
    },
    {
      value: 'Doctorate',
      label: 'Doctorate',
      checked: isDoctorate,
      onChange: handleDoctorate,
    },
    {
      value: 'Others',
      label: 'Other',
      checked: isOther,
      onChange: handleOther,
    },
    {
      value: 'any',
      label: 'Any Qualification',
      checked: isAny,
      onChange: handleAny,
    },
  ];
  useEffect(() => {
    if (
      isBachelors === false &&
      isDoctorate === false &&
      isMasters === false &&
      isOther === false
    ) {
      setAny(true);
    }
  }, [isBachelors, isDoctorate, isMasters, isOther]);

  const qaValue = qualificationFilterHelper(
    isAny,
    isBachelors,
    isDoctorate,
    isMasters,
    isOther,
  );
  const optionsList =
    isSkillOption &&
    isSkillOption.map((optionList: { value: string }) => {
      return optionList.value;
    });

  // filter api call
  useEffect(() => {
    dispatch(
      applicantPipeLineDataMiddleWare({
        jd_id: jdId,
        profile_match: isMatchRadio,
        candidate: isSearch,
        work_experience: isExperience,
        profile_view: isProfile,
        education_level: qaValue,
        skill_match: optionsList,
        fav: favAdd,
        sortApplicant: isSortApplicant,
        sortSortList: isSortSortList,
        sortInterview: isSortInterview,
        sortSelected: isSortSelected,
        sortRejected: isSortRejected,
      }),
    );
  }, [
    isSkillOption,
    isBachelors,
    isDoctorate,
    isMasters,
    isAny,
    isOther,
    isMatchRadio,
    isProfile,
    favLoader,
    isTotalFav,
    isSortApplicant,
    isSortInterview,
    isSortRejected,
    isSortSortList,
    isSortSelected,
    updateLoader,
  ]);

  // enter key submit api call
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      dispatch(
        applicantPipeLineDataMiddleWare({
          jd_id: jdId,
          profile_match: isMatchRadio,
          candidate: isSearch,
          work_experience: isExperience,
          profile_view: isProfile,
          education_level: qaValue,
          skill_match: optionsList,
          fav: favAdd,
          sortApplicant: isSortApplicant,
          sortSortList: isSortSortList,
          sortInterview: isSortInterview,
          sortSelected: isSortSelected,
          sortRejected: isSortRejected,
        }),
      );
    }
  };

  // search api call function
  const handleSearch = () => {
    dispatch(
      applicantPipeLineDataMiddleWare({
        jd_id: jdId,
        profile_match: isMatchRadio,
        candidate: isSearch,
        work_experience: isExperience,
        profile_view: isProfile,
        education_level: qaValue,
        skill_match: optionsList,
        fav: favAdd,
        sortApplicant: isSortApplicant,
        sortSortList: isSortSortList,
        sortInterview: isSortInterview,
        sortSelected: isSortSelected,
        sortRejected: isSortRejected,
      }),
    );
  };

  // filter experience function
  const handleExperience = (selectedValue: string) => {
    dispatch(
      applicantPipeLineDataMiddleWare({
        jd_id: jdId,
        profile_match: isMatchRadio,
        candidate: isSearch,
        work_experience: selectedValue,
        profile_view: isProfile,
        education_level: qaValue,
        skill_match: optionsList,
        fav: favAdd,
        sortApplicant: isSortApplicant,
        sortSortList: isSortSortList,
        sortInterview: isSortInterview,
        sortSelected: isSortSelected,
        sortRejected: isSortRejected,
      }),
    );
  };
  // filter fav function
  const filterTotalFav = () => {
    setTotalFav(!isTotalFav);
  };

  // filter refresh function
  const hanldeRefresh = () => {
    setDoctorate(false);
    setMasters(false);
    setAny(true);
    setBachelors(false);
    setOther(false);
    setSearch('');
    setMatchRadio('');
    setExperience('');
    setProfile('');
    setSkillOption('');
    dispatch(
      applicantPipeLineDataMiddleWare({
        jd_id: jdId,
        profile_match: '',
        candidate: '',
        work_experience: '',
        profile_view: '',
        education_level: '',
        skill_match: '',
        fav: favAdd,
        sortApplicant: isSortApplicant,
        sortSortList: isSortSortList,
        sortInterview: isSortInterview,
        sortSelected: isSortSelected,
        sortRejected: isSortRejected,
      }),
    );
  };

  // close popup
  const handleClosePipelinePopup = () => {
    setShowPipelinePopup(false);
  };
  // open popup
  const handleOpenPipelinePopup = () => {
    setShowPipelinePopup(true);
  };

  const data = [
    {
      title: 'New Applicants',
      left: '0px',
      borderColor: SUNRAY,
      total: applicant.length,
    },
    {
      title: 'Shortlisted',
      left: '0px',
      borderColor: AERO,
      total: shortlisted.length,
    },
    {
      title: 'Interviewed',
      left: '0px',
      borderColor: MEDIUM_PURPLE,
      total: interviewed.length,
    },
    {
      title: 'Offered',
      left: '0px',
      borderColor: PISTACHIO,
      total: selected.length,
    },
    {
      title: 'Rejected',
      left: '-6px',
      borderColor: CANDY_PINK,
      total: rejected.length,
    },
    // {
    //   title: 'Test',
    //   left: '-6px',
    //   borderColor: GRAY_BLACK,
    //   total: interviewed.length,
    // },
  ];
  const getAppliedCanId: any = localStorage.getItem('applied_can_id');
  const getAppliedJd: any = localStorage.getItem('applied_jd_id');

  useEffect(() => {
    if (getAppliedView === 'true') {
      setApplicantView(true);
    }
  }, [isApplicantView, getAppliedView]);

  return (
    <>
      {showPipelinePopup && (
        <PipelinePopup
          openPipelinePopup={showPipelinePopup}
          handleClosePipelinePopup={handleClosePipelinePopup}
        />
      )}
      <Flex row className={styles.overAll}>
        {applicantDataLoader && favSuccess === false && !favLoader && (
          <Loader />
        )}
        {pipeLineLoader && <Loader />}
        {getAppliedView === 'true' && (
          <ProfileView
            open={isApplicantView}
            cancel={() => {
              localStorage.setItem('applied_view', 'false');
              setApplicantView(false);
            }}
            jobId={getAppliedJd}
            candidateId={getAppliedCanId}
            inviteIconNone
          />
        )}
        {/* applicant filter */}
        <Flex className={styles.filterFlex}></Flex>
        <Flex
          columnFlex
          className={styles.dndBoardContainer}
          width={window.innerWidth - 10}
        >
          <Flex row className={styles.titleContainer}>
            <Text bold size={16} color="theme">
              Applicants Pipeline
            </Text>
            <JobTitleCard job_details={job_details} />
            <div className={styles.triangle}> </div>
          </Flex>
          {/* search bar and zita button */}
          <Flex row between marginBottom={15}>
            <Flex
              row
              style={{ position: 'relative' }}
              className={styles.searchbox}
            >
              <Flex row className={styles.searchstyle}>
                <Text className={styles.jobstext}>Candidates</Text>
                <Flex row className={styles.searchboxoverall}>
                  <InputText
                    ref={myRef}
                    actionRight={() => (
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                      <label
                        onClick={handleSearch}
                        htmlFor={'applicantpipelinefilters__search'}
                        style={{ margin: 0 }}
                      ></label>
                    )}
                    id="applicantpipelinefilters__search"
                    value={isSearch}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search candidate by name or email"
                    onKeyPress={handleKeyPress}
                    className={styles.boxstyle}
                  />
                  <Flex className={styles.middleline}></Flex>
                  <Flex className={styles.locationicon}>
                    <SvgLocation
                      width={18}
                      height={18}
                      fill={'#581845'}
                    ></SvgLocation>
                  </Flex>
                  <InputSearch
                    initialValue={formik.values.location}
                    placeholder="Enter job location"
                    options={location_list}
                    setFieldValue={formik.setFieldValue}
                    name="location"
                    style={styles.boxstyle}
                    labelBold
                    onkeyPress={(event) => {
                      {
                        if (event.key === SvgSearch) {
                          formik.setFieldValue('location', event.target.value);
                        }
                      }
                    }}
                  />

                  <Flex className={styles.searchicons} onClick={handleSearch}>
                    <SvgSearch
                      width={12}
                      height={12}
                      fill="#ffffff"
                    ></SvgSearch>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex>
              {zita_match_count === 0 ? (
                <Button disabled className={styles.btnStyle} types="primary">
                  View Zita Match
                </Button>
              ) : (
                <LinkWrapper replace to={`/zita_match_candidate/${jdId}`}>
                  <Button className={styles.btnStyle} types="primary">
                    View Zita Match
                  </Button>
                </LinkWrapper>
              )}
            </Flex>
          </Flex>
          <ApplicantPipeLineFilter
            isSkillOption={isSkillOption}
            isSkills={isSkills}
            isSearch={isSearch}
            setSearch={setSearch}
            handleKeyPress={handleKeyPress}
            isMatchRadio={isMatchRadio}
            hanldeMatch={hanldeMatch}
            isProfile={isProfile}
            hanldeProfile={hanldeProfile}
            handleExperience={handleExperience}
            setExperience={setExperience}
            setSkills={setSkills}
            setSkillOption={setSkillOption}
            qualificationOption={qualificationOption}
            hanldeRefresh={hanldeRefresh}
            handleSearch={handleSearch}
            isExperience={isExperience}
          />

          {applicant.length === 0 &&
          shortlisted.length === 0 &&
          selected.length === 0 &&
          rejected.length === 0 &&
          interviewed.length === 0 ? (
            <Flex middle center height={window.innerHeight - 236}>
              <Text color={'gray'}>No Applicants Found</Text>
            </Flex>
          ) : (
            <div>
              <TotalApplicant
                total={total_applicants}
                filterTotalFav={filterTotalFav}
                isTotalFav={isTotalFav}
                seletedCardsLength={cardSelection.size}
                onExport={handleBulkExport}
              />
              <div style={{ position: 'relative' }}>
                <DndTitle
                  data={data}
                  setSortApplicant={setSortApplicant}
                  setSortSortList={setSortSortList}
                  setSortInterview={setSortInterview}
                  setSortSelected={setSortSelected}
                  setSortRejected={setSortRejected}
                />
                <div
                  style={{ height: window.innerHeight - 236 }}
                  className={styles.scrollStyle}
                >
                  <DndBoardScreen
                    applicant={applicant}
                    shortlisted={shortlisted}
                    Test={shortlisted}
                    selected={selected}
                    rejected={rejected}
                    interviewed={interviewed}
                    jd_id={jd_id}
                    outlook={outlook}
                    google={google}
                    job_details={job_details}
                    onClick={handleCardSelection}
                    selectedCardList={selectedCardsList}
                  />
                </div>
              </div>
            </div>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default ApplicantPipeLineScreen;
