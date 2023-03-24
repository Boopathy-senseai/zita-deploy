import axios from 'axios';
import classNames from 'classnames/bind';
import { saveAs } from 'file-saver';
import { useFormik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { getDateString, isEmpty } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Toast from '../../uikit/Toast/Toast';
import SvgInfinity from '../../icons/SvgInfinity';
import { inviteToApplyApi, zitaMatchDownloadApi } from '../../routes/apiRoutes';
import { config, ERROR_MESSAGE } from '../constValue';
import MyDataBaseFilter from './MyDataBaseFilter'; // eslint-disable-line
import styles from './mydatabasescreen.module.css';
import { qualificationFilterHelper } from './myDataBaseScreenHelper';
import MyDataBaseSearchAction from './MyDataBaseSearchAction'; // eslint-disable-line
import MyDataBaseTabs from './MyDataBaseTabs'; // eslint-disable-line
import { SkillListEntity } from './myDataBaseTypes';
import {
  myDataBaseDataMiddleWare,
  myDataBaseInitalMiddleWare,
} from './store/middleware/mydatabasemiddleware';
import { experienceOption, sortOptions } from './mock';

var querystring = require('querystring');

const cx = classNames.bind(styles);

export type MyDataFormProps = {
  searchValue: string;
  locationSearch: string;
  reLocateValue: string;
  jobType: string;
  experience: SkillListEntity;
  skillValue: SkillListEntity[];
  jobTitle: string;
  applicantOnly: string;
};

const initial: MyDataFormProps = {
  searchValue: '',
  locationSearch: '',
  reLocateValue: '',
  jobType: '',
  experience: experienceOption[0],
  skillValue: [],
  jobTitle: '',
  applicantOnly: '0',
};

const MyDataBaseScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const getMydataBaseTabKey: any =
    sessionStorage.getItem('getMydataBaseTabKey') === null
      ? ''
      : sessionStorage.getItem('getMydataBaseTabKey');
  const [isBachelors, setBachelors] = useState(false);
  const [isDoctorate, setDoctorate] = useState(false);
  const [isMasters, setMasters] = useState(false);
  const [isAny, setAny] = useState(true);
  const [isOther, setOther] = useState(false);
  const [isPage, setPage] = useState(0);
  const [tabKey, setTabKey] = useState(getMydataBaseTabKey);
  const [isInviteLoader, setInviteLoader] = useState(false);
  const [isFav, setFav] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<any>([]);
  const [isDownloadLoader, setDownLoadLoader] = useState(false);
  const [isSortOptions, setSortOptions] = useState(sortOptions[0]);
  const [isSearchValue, setSearchValue] = useState<any>('');

  const addFavFilter = isFav ? 'add' : '';

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const getTab: any = query.get('tab');

  
  useEffect(() => {
    localStorage.setItem('freeCheck','true');
    dispatch(myDataBaseInitalMiddleWare());
  }, []);

  const {
    initalLoader,
    candidate_available,
    job_title,
    datas,
    dataLoader,
    totalCount,
    jobId,
    is_plan
  } = useSelector(
    ({ myDataBaseDataReducers, myDataBaseInitalReducers,permissionReducers }: RootState) => {
      return {
        initalLoader: myDataBaseInitalReducers.isLoading,
        candidate_available: myDataBaseInitalReducers.candidate_available,
        job_title: myDataBaseInitalReducers.job_title,
        datas: myDataBaseDataReducers.data,
        dataLoader: myDataBaseDataReducers.isLoading,
        totalCount: myDataBaseDataReducers.total_count,
        jobId: myDataBaseDataReducers.jd,
        is_plan: permissionReducers.is_plan,
      };
    },
  );

  useEffect(()=>{
    if(!isEmpty(getTab)){
      setTabKey(getTab)
      if (query.has('tab')) {
        query.delete('tab');
        history.replace({
          search: query.toString(),
        });
      }
    }
  },[])
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
      value: 'Others',
      label: 'Other',
      checked: isOther,
      onChange: handleOther,
      width: 110,
    },
    {
      value: 'Any',
      label: 'any',
      width: 110,
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

  const skillsOptionsList =
    formik.values.skillValue &&
    formik.values.skillValue.map((optionList: { value: string }) => {
      return optionList.value;
    });

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

  const handleCheckBoxClick = (e: {
    target: { id: string; checked: boolean };
  }) => {
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
    setIsCheck([]);
    dispatch(
      myDataBaseDataMiddleWare({
        jobTitle: formik.values.jobTitle,
        fav: addFavFilter,
        experience: formik.values.experience.value,
        educationLevel: qaValue,
        typeofJob: formik.values.jobType,
        location: formik.values.locationSearch,
        skill_match: skillsOptionsList,
        relocate: formik.values.reLocateValue,
        candidate: formik.values.searchValue,
        userType: tabKey,
        sort: isSortOptions.value,
        page: isPage + 1,
        applicant_only: formik.values.applicantOnly,
      }),
    );
  }, [
    formik.values,
    isAny,
    isBachelors,
    isDoctorate,
    isMasters,
    isOther,
    tabKey,
    isFav,
    isSortOptions,
    isPage,
  ]);

  // filter refresh function
  const hanldeRefresh = () => {
    setAny(true);
    setBachelors(false);
    setDoctorate(false);
    setMasters(false);
    setOther(false)
    formik.resetForm()
    setSearchValue('')
  };
// invite function
  const hanldeInvite = (can_id: number) => {
    setInviteLoader(true);
    const data = querystring.stringify({
      jd_id: jobId,
      candi_id: can_id,
    });
    axios
      .post(inviteToApplyApi, data, config)
      .then(() => {
        dispatch(
          myDataBaseDataMiddleWare({
            jobTitle: formik.values.jobTitle,
            fav: addFavFilter,
            experience: formik.values.experience.value,
            educationLevel: qaValue,
            typeofJob: formik.values.jobType,
            location: formik.values.locationSearch,
            skill_match: skillsOptionsList,
            relocate: formik.values.reLocateValue,
            candidate: formik.values.searchValue,
            userType: tabKey,
            sort: isSortOptions.value,
            page: isPage + 1,
            applicant_only: formik.values.applicantOnly,
          }),
        ).then(() => {
          setInviteLoader(false);
          Toast('Candidate invited successfully');
        });
      })
      .catch(() => {
        setInviteLoader(false);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };
// fav filter function
  const handleFav = () => {
    setFav(!isFav);
  };
// resume download function
  const hanldeDownload = () => {
    if (isCheck.length !== 0) {
      setDownLoadLoader(true);
      const data = querystring.stringify({
        jd: jobId,
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

  return (
    <Flex row className={styles.overAll}>
      {initalLoader && <Loader />}
      {dataLoader && <Loader />}
      {isInviteLoader && <Loader />}
      {isDownloadLoader && <Loader />}

      <div className={cx('filterOverAll')}>
        <MyDataBaseFilter
          formik={formik}
          qualificationOption={qualificationOption}
          hanldeRefresh={hanldeRefresh}
        />
      </div>
      <div className={cx('tabsContainer')}>
        <MyDataBaseSearchAction jobTitle={job_title} formik={formik} 
        setSearchValue={setSearchValue} 
        isSearchValue={isSearchValue}/>
        <div className={styles.tabsStyle}>
          <Flex row center className={styles.infiStyle}>
            <Text bold>Candidates Limit:{candidate_available}</Text>
            {isEmpty(candidate_available) && (
              <div
                className={styles.svgInfy}
                title="Unlimited Candidate Storage"
              >
                <SvgInfinity />
              </div>
            )}
          </Flex>
          <MyDataBaseTabs
            totalCount={totalCount}
            data={datas}
            tabKey={tabKey}
            setTabKey={setTabKey}
            filterFormik={formik}
            qaValue={qaValue}
            skillsOptionsList={skillsOptionsList}
            jobId={jobId}
            hanldeInvite={hanldeInvite}
            isFav={isFav}
            handleFav={handleFav}
            handleSelectAll={handleSelectAll}
            isCheckAll={isCheckAll}
            isCheck={isCheck}
            handleCheckBoxClick={handleCheckBoxClick}
            hanldeDownload={hanldeDownload}
            setSortOptions={setSortOptions}
            isSortOptions={isSortOptions}
            isPage={isPage}
            setPage={setPage}
            addFavFilter={addFavFilter}
          />
        </div>
      </div>
    </Flex>
  );
};

export default MyDataBaseScreen;
