import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { saveAs } from 'file-saver';
import axios from 'axios';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import { getBlur, getDateString, getFocus } from '../../uikit/helper';
import Pangination from '../../uikit/Pagination/Pangination';
import { AppDispatch, RootState } from '../../store';
import { inviteToApplyApi, zitaMatchDownloadApi } from '../../routes/apiRoutes';
import Loader from '../../uikit/Loader/Loader';
import Toast from '../../uikit/Toast/Toast';
import {
  applicantPipeLineDataMiddleWare,
  applicantPipeLineMiddleWare,
} from '../applicantpipelinemodule/store/middleware/applicantpipelinemiddleware';
import { qualificationFilterHelper } from '../common/commonHelper';
import { config, ERROR_MESSAGE } from '../constValue';
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
import ZitaMatchDataCard from './ZitaMatchDataCard';

const cx = classNames.bind(styles);

var querystring = require('querystring');

type ParamsType = {
  jdId: string;
};

const ZitaMatchCandidate = () => {
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
  const [isJobType, setJobType] = useState('');
  const [isCandiStatus, setCandiStatus] = useState('');
  const [isRelocate, setRelocate] = useState(false);
  const [isLocation, setLocation] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<any>([]);
  const [isTotalFav, setTotalFav] = useState(false);
  const [isInviteLoader, setInviteLoader] = useState(false);
  const [isDownloadLoader, setDownLoadLoader] = useState(false);
  const [isPage, setPage] = useState(0);

  const favAdd = isTotalFav ? 'add' : '';

  useEffect(() => {
    dispatch(zitaMatchCandidateMiddleWare({ jd_id: jdId }));
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
  } = useSelector(
    ({
      zitaMatchCandidateReducers,
      zitaMatchDataCandidateReducers,
      applicantFavReducers,
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
      };
    },
  );

  const usersPerPage = 20;
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

  const handleExperience = (selectedValue: string) => {
    setIsCheck([]);
    dispatch(
      zitaMatchDataCandidateMiddleWare({
        jd_id: jdId,
        profile_match: isMatchRadio,
        fav: favAdd,
        candidate: isSearch,
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
  };

  const handleRelocate = () => {
    setRelocate(!isRelocate);
  };
  const handleLocation = () => {
    setLocation(!isLocation);
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

  if (
    isCheck.length === datas.length &&
    isCheckAll === false &&
    datas.length !== 0
  ) {
    setIsCheckAll(true);
  }
  useEffect(() => {
    dispatch(
      zitaMatchDataCandidateMiddleWare({
        jd_id: jdId,
        profile_match: isMatchRadio,
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
    setIsCheck([]);
  }, [
    isSkillOption,
    isBachelors,
    isDoctorate,
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
  ]);

  const hanldeRefresh = () => {
    window.location.reload();
  };

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
          Toast('Resume downloaded successfully');
        })
        .catch(() => {
          setDownLoadLoader(false);
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }
  };

  const hanldeFav = (can_id: number) => {
    dispatch(applicantFavoriteMiddleWare({ jd_id, can_id }));
  };

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

  const handleSetPagination = (a: number) => {
    getFocus('zitaaction__checkbox');
    setPage(a);
    getBlur('zitaaction__checkbox');
  };
console.log('applicants_count',applicants_count);

  return (
    <Flex row className={styles.overAll}>
      {zitaLoader && <Loader />}
      {initalLoader && <Loader />}
      {isDownloadLoader && <Loader />}
      {isInviteLoader && <Loader />}
      <div className={styles.filterOverAll}>
        <ZitaMatchFilters
          setSearch={setSearch}
          isSearch={isSearch}
          handleSearchSubmit={handleSearchSubmit}
          isMatchRadio={isMatchRadio}
          hanldeMatch={hanldeMatch}
          handleExperience={handleExperience}
          setExperience={setExperience}
          setSkills={setSkills}
          setSkillOption={setSkillOption}
          isSkills={isSkills}
          isJobType={isJobType}
          setJobType={setJobType}
          hanldeProfile={hanldeProfile}
          isProfile={isProfile}
          qualificationOption={qualificationOption}
          isCandiStatus={isCandiStatus}
          setCandiStatus={setCandiStatus}
          isRelocate={isRelocate}
          handleRelocate={handleRelocate}
          isLocation={isLocation}
          handleLocation={handleLocation}
          hanldeRefresh={hanldeRefresh}
        />
      </div>

      <Flex row className={cx('scollDiv')}>
        <Flex
          columnFlex
          height={'100%'}
          width={'100%'}
          className={styles.scrollBottom}
        >
          <Flex row center className={styles.titleContainer}>
            <Text bold size={16} color="black">
              Zita Match Candidates
            </Text>
            {applicants_count === 0 ? (
              <Button
                disabled={true}
                className={styles.btnStyle}
                types="secondary"
                onClick={handleApplicant}
              >
                Applicants Pipeline
              </Button>
            ) : (
              <Link to={`/applicant_pipe_line/${jd_id}`}>
                <Button
                  className={styles.btnStyle}
                  types="secondary"
                  onClick={handleApplicant}
                >
                  Applicants Pipeline
                </Button>
              </Link>
            )}
          </Flex>
          <JobTitleCard job_details={job_details} />
          {total_applicants !== 0 && (
            <ZitaAction
              total={total_applicants}
              filterTotalFav={filterTotalFav}
              isTotalFav={isTotalFav}
              handleSelectAll={handleSelectAll}
              isCheckAll={isCheckAll}
              hanldeDownload={hanldeDownload}
              isCheck={isCheck}
            />
          )}
          <div
            style={{
              height: window.innerHeight - 232,
              overflowY: 'scroll',
              paddingBottom: 16,
              paddingRight: 12,
            }}
          >
            <>
              {total_applicants === 0 && (
                <Flex height={'100%'} flex={1} center middle>
                  <Text color="gray">No Candidates Found</Text>
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
              {total_applicants > 20 && (
                <Flex middle className={styles.pagination}>
                  <Pangination
                    maxPages={pageCount - 1}
                    currentPage={isPage}
                    setCurrentPage={handleSetPagination}
                  />
                </Flex>
              )}
            </>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ZitaMatchCandidate;
