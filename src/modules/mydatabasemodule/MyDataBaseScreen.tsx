import axios from 'axios';
import classNames from 'classnames/bind';
import { saveAs } from 'file-saver';
import { useFormik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import Totalcount from '../../globulization/TotalCount';
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
  const [change,setchange]=useState(false)

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
      label: 'Bachelors',
      checked: isBachelors,
      onChange: handleBachelor,
      width: 110,
      padding:10,
    },
    {
      value: 'Masters',
      label: 'Masters',
      checked: isMasters,
      onChange: handleMaster,
      width: 80,
      margin:8,
    },
    {
      value: 'Doctorate',
      label: 'Doctorate',
      checked: isDoctorate,
      onChange: handleDoctorate,
      width: 110,
    },
    {
      value: 'Others',
      label: 'Others',
      checked: isOther,
      onChange: handleOther,
      width: 80,
    },
    {
      value: 'Any Qualification',
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
    if(change===false){
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
    }
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
    change
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
// To Clear Search Bar
  const handleSearchClose = () => {
    setSearchValue("");
    formik.setFieldValue('searchValue', '');
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
        candidate: "",
        userType: tabKey,
        sort: isSortOptions.value,
        page: isPage + 1,
        applicant_only: formik.values.applicantOnly,
      }),
    );
  }
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
    setFav(!isFav)
  };
  useEffect(()=>{

  },[])
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

  console.log("changeeee+====",change)
  return (
    <>
    <Flex row className={styles.ribbon} between>
          

    <Flex className={styles.titleContainer}  >
      <Text size={16} bold color="theme" >
      Database
      </Text>

    </Flex>
    <Flex >
      <div className={styles.triangle}></div>
    </Flex>

   </Flex>
    <Flex row className={styles.overAll}>
      {initalLoader && <Loader  />}
      {/* {dataLoader && <Loader  />} */}
      {isInviteLoader && <Loader />}
      {isDownloadLoader && <Loader />}

    
      <div className={cx('tabsContainer')}>
        <MyDataBaseSearchAction jobTitle={job_title} formik={formik} 
        setSearchValue={setSearchValue} 
        isSearchValue={isSearchValue}
        handleSearchClose={handleSearchClose}/>
        <div className={cx('filterOverAll')} style={{paddingRight:"10px"}}>
        <MyDataBaseFilter
          setchange={setchange}
          formik={formik}
          filterFormik={formik}
          qualificationOption={qualificationOption}
          hanldeRefresh={hanldeRefresh}
          qaValue={qaValue}
          skillsOptionsList={skillsOptionsList}
          tabKey={tabKey}
          isPage={isPage}
          addFavFilter={addFavFilter}
          isSortOptions={isSortOptions}
          setSortOptions={setSortOptions}
        />
      </div> 
        <div className={styles.tabsStyle}>
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
    </>
  );
};

export default MyDataBaseScreen;


// <div ref={dropDownRef} className={styles.drop_down}>
// <Flex
//   row
//   className={styles.drop_down_header}
//   onClick={() => {
//     setShowDropDown((value) => !value);
//   }}
// >
//   <Flex>
//     <Text
//       bold
//       className={styles.filtername}
//       style={{ cursor: "Pointer",paddingTop:7,fontSize:14 }}
//     >
//       View Filter
//     </Text>
//   </Flex>


//   <Flex title={"Clear Filters"}>
//     <SvgRefresh
//       width={18}
//       height={18}
//       onClick={pageReload}
//       className={styles.filtersvg}
//     />
//   </Flex>
// </Flex>
// <div
//   className={`${styles.drop_down_menus} ${
//     showDropDown ? styles.show : ""
//   }`}
// >
//   <Flex className={styles.mtstyle}>
//     {/* <div className={styles.skillContainer}> */}
//     <Text className={styles.jobTextStyle}>Job ID</Text>
    
//     <InputSearch
//       style={styles.boxstyle}
//       initialValue={formik.values.jobId}
//       options={job_ids}
//       placeholder="Enter a job id"
//       // labelBold
//       setFieldValue={formik.setFieldValue}
//       inputRef={inputRef}
//       name="jobId"
//       // // eslint-disable-next-line jsx-a11y/no-autofocus
//       // autoFocus
//       onkeyPress={(event) => {
//         if (event.key === "Enter") {
//           formik.setFieldValue("jobId", event.target.value);
//         }
//       }} 
//     /> 
//     {console.log(formik.values.jobId)}
//   </Flex>

//   <Flex className={styles.mtstyle}>
//     <div className={styles.skillContainer}>
//       <Text className={styles.jobTextStyle} >Job Status</Text>
//       <Flex marginTop={5}>
//         {jobTypeData.map((jobList) => {
//           return (
//             <Flex
//               row
//               key={jobList.value}
//               width={jobList.width}
//               className={styles.matchRadioStyle}
//             >
//               <InputCheckBox
//                 className={styles.checkbox}
//                 label={jobList.value}
//                 checked={jobList.label === formik.values.jobType}
//                 onClick={() =>
//                   formik.setFieldValue("jobType", jobList.label)
//                 }
//               />
//             </Flex>
//           );
//         })}
//       </Flex>
//     </div>
//   </Flex>
  
//   <Flex className={styles.mtstyle}>
//     <div className={styles.inputmargin}>
//       <Text className={styles.jobTextStyle}>Job posted on</Text>
//       <div   className={styles.selectoptions} >
     
//       <SelectTag
//       linechange 
//        value={ 
//           postedOn
//             ?  postedOn.find(
//               (option) =>
//                 option.value === formik.values.postedOn.value
//             )
//             :  ' '
//         }  
//         options={postedOn}                
//         onChange={(options) => {
          
//         formik.setFieldValue("postedOn",options)
//         }} 
//       />
//       </div>
//     </div>
//   </Flex>
//   <Flex className={styles.mtstyle}   >
//     <div  >
//       <Text className={styles.jobTextStyle}>Job Title</Text>
      
//       <Flex className={styles.hoverbox}>
//       <InputSearch
//         initialValue={formik.values.jobTitle}
//         setFieldValue={formik.setFieldValue}
        
//         options={job_title}
//         placeholder="Enter a job title"
       
//         style={styles.boxstyle}
//         name="jobTitle"
        
//         onkeyPress={(event) => {
//           if (event.key === "Enter") {
//             formik.setFieldValue("jobTitle", event.target.value);
            
//           }
//         }} /> 
     
      
      
//       </Flex>
     
//     </div>
//   </Flex>
 
//   <Flex className={styles.mtstyle}>
//     <div>
//       <Text className={styles.jobTextStyle}>Location</Text>
//       <InputSearch 
//         initialValue={formik.values.location}
//         placeholder="Enter job location"
//         options={location_list}
//         setFieldValue={formik.setFieldValue}
//         name="location" 
//         style={styles.boxstyle}
//         onkeyPress={(event) => {
//           if (event.key === "Enter") {
//             formik.setFieldValue("location", event.target.value);
//           }
//         }}
//       />
//     </div>
//   </Flex>


// </div>
// </div>