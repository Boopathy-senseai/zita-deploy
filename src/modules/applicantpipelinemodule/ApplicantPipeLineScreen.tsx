import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
} from '../../uikit/Colors/colors';
import { qualificationFilterHelper } from '../common/commonHelper';
import {
  applicantPipeLineDataMiddleWare,
  applicantPipeLineMiddleWare,
} from './store/middleware/applicantpipelinemiddleware';
import DndTitle from './DndTitle';
import ProfileView from './ProfileView';
import TotalApplicant from './TotalApplicant';
import JobTitleCard from './JobTitleCard';
import DndBoardScreen from './DndBoardScreen';
// eslint-disable-next-line
import ApplicantPipeLineFilter from './ApplicantPipeLineFilter';
import styles from './applicantpipelinescreen.module.css';

export type listValue = {
  value: string;
  label: string;
};
type ParamsType = {
  jdId: string;
};
const ApplicantPipeLineScreen = () => {
  const { jdId } = useParams<ParamsType>();
  const dispatch: AppDispatch = useDispatch();
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
    jd_id,
    interviewed,
    applicant,
    shortlisted,
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
  } = useSelector(
    ({
      applicantPipeLineReducers,
      applicantPipeLineDataReducers,
      applicantFavReducers,
      applicantPipeLineUpdateReducers,
    }: RootState) => {
      return {
        jd_id: applicantPipeLineReducers.jd_id,
        interviewed: applicantPipeLineDataReducers.interviewed,
        rejected: applicantPipeLineDataReducers.rejected,
        selected: applicantPipeLineDataReducers.selected,
        shortlisted: applicantPipeLineDataReducers.shortlisted,
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
      };
    },
  );

  const hanldeMatch = (listValue: listValue) => {
    setMatchRadio(listValue.label);
  };
  const hanldeProfile = (listValue: listValue) => {
    setProfile(listValue.label);
  };

  const handleBachelor = () => {
    setBachelors(!isBachelors);
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
    { value: 'Any', label: 'any', checked: isAny, onChange: handleAny },
    {
      value: 'Others',
      label: 'Other',
      checked: isOther,
      onChange: handleOther,
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
  const filterTotalFav = () => {
    setTotalFav(!isTotalFav);
  };

  const hanldeRefresh = () => {
    window.location.reload();
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
      left: '-1px',
      borderColor: AERO,
      total: shortlisted.length,
    },
    {
      title: 'Interviewed',
      left: '-3px',
      borderColor: MEDIUM_PURPLE,
      total: interviewed.length,
    },
    {
      title: 'Offered',
      left: '-4.8px',
      borderColor: PISTACHIO,
      total: selected.length,
    },
    {
      title: 'Rejected',
      left: '-6px',
      borderColor: CANDY_PINK,
      total: rejected.length,
    },
  ];
  const getAppliedCanId: any = localStorage.getItem('applied_can_id');
  const getAppliedJd: any = localStorage.getItem('applied_jd_id');

  useEffect(() => {
    if (getAppliedView === 'true') {
      setApplicantView(true);
    }
  }, [isApplicantView, getAppliedView]);

  return (
    <Flex row className={styles.overAll}>
      {applicantDataLoader && favSuccess === false && !favLoader && <Loader />}
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
      <Flex width={300} className={styles.filterFlex}>
        <ApplicantPipeLineFilter
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
        />
      </Flex>
      <Flex className={styles.dndBoardContainer}>
        <Flex row center className={styles.titleContainer}>
          <Text bold size={16} color="black">
            Applicants Pipeline
          </Text>
          {zita_match_count === 0 ? (
            <Button disabled className={styles.btnStyle} types="secondary">
              Zita Match Candidates
            </Button>
          ) : (
            <LinkWrapper replace to={`/zita_match_candidate/${jdId}`}>
              <Button className={styles.btnStyle} types="secondary">
                Zita Match Candidates
              </Button>
            </LinkWrapper>
          )}
        </Flex>
        <JobTitleCard job_details={job_details} />
        {applicant.length === 0 &&
        shortlisted.length === 0 &&
        selected.length === 0 &&
        rejected.length === 0 &&
        interviewed.length === 0 ? (
          <Flex flex={1} middle center height={window.innerHeight - 236}>
            <Text color={'gray'}>No Applicants Found</Text>
          </Flex>
        ) : (
          <div>
            <TotalApplicant
              total={total_applicants}
              filterTotalFav={filterTotalFav}
              isTotalFav={isTotalFav}
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
                  selected={selected}
                  rejected={rejected}
                  interviewed={interviewed}
                  jd_id={jd_id}
                  outlook={outlook}
                  google={google}
                />
              </div>
            </div>
          </div>
        )}
      </Flex>
    </Flex>
  );
};

export default ApplicantPipeLineScreen;
