import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
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
import { InputSearch, Toast } from '../../uikit';
import InputText from '../../uikit/InputText/InputText';
import { myJobPostingDataMiddleWare } from '../myjobposting/store/middleware/myjobpostingmiddleware';
import { ERROR_MESSAGE } from '../constValue';
import PipelinePopup from './pipelinepopup';
import {
  applicantPipeLineDataMiddleWare,
  applicantPipeLineMiddleWare,
  applicantUpdateStatusMiddleWare,
} from './store/middleware/applicantpipelinemiddleware';
import DndTitle from './DndTitle';
import ProfileView from './ProfileView';
import TotalApplicant from './TotalApplicant';
import JobTitleCard from './JobTitleCard';
import DndBoardScreen from './DndBoardScreen';
import ApplicantPipeLineFilter, { ListValue } from './ApplicantPipeLineFilter';
import styles from './applicantpipelinescreen.module.css';
import { JobDetailsEntity } from './applicantPipeLineTypes';
import { handleDownload } from './dndBoardHelper';
import { columnTypes, IStageColumn } from './dndBoardTypes';
// import { columnOrder } from './initialData';

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
  const [showPipelinePopup, setShowPipelinePopup] = useState(true);
  const [cardSelection, setCardSelection] = useState<
    Map<
      string,
      {
        task: any;
        section: string;
        // index: number;
        columnId: string;
        // job_details: JobDetailsEntity;
      }
    >
  >(new Map());

  const favAdd = isTotalFav ? 'add' : '';

  const getAppliedView = localStorage.getItem('applied_view');

  //why this dispatch is being done??

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
    stages,
    applicants,
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
      templatePageReducers,
    }: RootState) => {
      return {
        location_list: myJobPosingReducers.location_list,
        jd_id: applicantPipeLineReducers.jd_id,
        applicants: {
          interviewed: applicantPipeLineDataReducers.interviewed,
          rejected: applicantPipeLineDataReducers.rejected,
          selected: applicantPipeLineDataReducers.selected,
          shortlisted: applicantPipeLineDataReducers.shortlisted,
          applicant: applicantPipeLineDataReducers.applicant,
        },
        stages: templatePageReducers.stages,
        // Test: applicantPipeLineDataReducers.shortlisted,

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
    section: string;
    index: number;
    columnId: string;
    job_details: JobDetailsEntity;
  }) => {
    const newCardSelection = new Map(cardSelection);
    if (cardSelection.has(data.task.id)) {
      newCardSelection.delete(data.task.id);
    } else {
      newCardSelection.set(data.task.id, {
        task: data.task,
        section: data.section,
        columnId: data.columnId,
      });
    }
    // console.log(newCardSelection)
    setCardSelection(newCardSelection);
  };
  // const selectedCardsList = Array.from(cardSelection.values());

  const handleBulkExport = () => {
    cardSelection.forEach((doc) => {
      handleDownload(doc.task.file);
    });
  };
  // select All columns
  const handleColumnSelect = (data: IStageColumn) => {
    const { section, columnId } = data;
    const list = columns[columnId].items as any[];
    const newCardSelection = new Map(cardSelection);
    const newList = list.filter((doc) => !cardSelection.has(doc.id));
    newList.forEach((task) =>
      newCardSelection.set(task.id, { task, section, columnId }),
    );
    setCardSelection(newCardSelection);
  };
  const handleColumnUnselect = (data: IStageColumn) => {
    const { section, columnId } = data;
    const list = columns[columnId].items as any[];
    const newCardSelection = new Map(cardSelection);
    const newList = list.filter((doc) => cardSelection.has(doc.id));
    newList.forEach((task) => newCardSelection.delete(task.id));
    setCardSelection(newCardSelection);
  };

  // filter match function
  const hanldeMatch = (listValue: ListValue) => {
    setMatchRadio(listValue.value);
  };

  const hanldeProfile = (listValue: ListValue) => {
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
  function getApplicanPipelineData() {
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

  // filter api call
  useEffect(() => {
    getApplicanPipelineData();
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

  // const data = [
  //   {
  //     title: 'New Applicants',
  //     left: '0px',
  //     borderColor: SUNRAY,
  //     total: applicants.applicant.length,
  //     section: 'applicant',
  //   },
  //   {
  //     title: 'Shortlisted',
  //     left: '0px',
  //     borderColor: AERO,
  //     total: applicants.shortlisted.length,
  //     section: 'shortlisted',
  //   },
  //   {
  //     title: 'Interviewed',
  //     left: '0px',
  //     borderColor: MEDIUM_PURPLE,
  //     total: applicants.interviewed.length,
  //     section: 'interviewed',
  //   },
  //   {
  //     title: 'Offered',
  //     left: '0px',
  //     borderColor: PISTACHIO,
  //     total: applicants.selected.length,
  //     section: 'selected',
  //   },
  //   {
  //     title: 'Rejected',
  //     left: '-6px',
  //     borderColor: CANDY_PINK,
  //     total: applicants.rejected.length,
  //     section: 'rejected',
  //   },
  //   // {
  //   //   title: 'Test',
  //   //   left: '-6px',
  //   //   borderColor: GRAY_BLACK,
  //   //   total: interviewed.length,
  //   // },
  // ];
  const getAppliedCanId: any = localStorage.getItem('applied_can_id');
  const getAppliedJd: any = localStorage.getItem('applied_jd_id');

  useEffect(() => {
    if (getAppliedView === 'true') {
      setApplicantView(true);
    }
  }, [isApplicantView, getAppliedView]);

  /// Column Drag & Drop

  // initial value
  const stageColumns = stages?.reduce((o, v) => {
    return {
      ...o,
      [v.id]: {
        columnId: v?.id,
        title: v?.title,
        items: applicants[v.id] || [],
        total: applicants[v.id]?.length,
        section: v?.id,
        left: '0px',
        borderColor: v?.color,
      },
    };
  }, {});
  const columnsFromBackend = {
    'column-1': {
      columnId: 'column-1',
      title: 'New Applicants',
      items: applicants?.applicant,
      total: applicants?.applicant.length,
      section: 'applicant',
      left: '0px',
      borderColor: SUNRAY,
    },
    ...stageColumns,
    // 'column-2': {
    //   title: 'Shortlisted',
    //   items: applicants.shortlisted,
    //   total: applicants.shortlisted.length,
    //   section: 'shortlisted',
    // },
    // 'column-3': {
    //   title: 'Interviewed',
    //   items: applicants.interviewed,
    //   total: applicants.interviewed.length,
    //   section: 'interviewed',
    // },
    // 'column-4': {
    //   title: 'Offered',
    //   items: applicants.selected,
    //   total: applicants.selected.length,
    //   section: 'selected',
    // },
    // 'column-5': {
    //   title: 'Rejected',
    //   items: applicants.rejected,
    //   total: applicants.rejected.length,
    //   section: 'rejected',
    // },
    // 'column-6': {
    //   title: 'Test',
    //   items: interviewed,
    //   total: interviewed.length,
    // },
  };

  //console.log(columnsFromBackend);

  const columnOrder = Object.keys(columnsFromBackend) || [];
  const allColumnsItemsLength = columnOrder
    ?.map((key) => columnsFromBackend[key].total as number)
    .reduce((t, v) => (t = t + v), 0);

  const [isAlert, setAlert] = useState<{
    source: string;
    destination: string;
    open: boolean;
    droppableId: string;
    taskId: any;
  } | null>(null);
  // const [isApplicant, setApplicant] = useState(false);
  // const [isShortList, setShortList] = useState(false);
  // const [isInterviewed, setInterviewed] = useState(false);
  // const [isOffered, setOffered] = useState(false);
  // const [isRejected, setRejected] = useState(false);

  // const [isUpdateId, setUpdateId] = useState<{
  //   droppableId: string;
  //   taskId: any;
  // } | null>(null);
  const [isNoLoader, setNoLoader] = useState(false);
  const [columns, setColumns] = useState<columnTypes>(columnsFromBackend || {});
  const [isIndex, setIndex] = useState<any>();

  useEffect(() => {
    if (applicants) setColumns(columnsFromBackend);
  }, [
    stages,
    applicants.applicant,
    applicants.interviewed,
    applicants.rejected,
    applicants.selected,
    applicants.shortlisted,
    isNoLoader,
  ]);

  const onDragStart = (start: { source: { droppableId: string } }) => {
    const homeIndex = columnOrder.indexOf(start.source.droppableId);
    setIndex(homeIndex);
    if (homeIndex === 3) {
      setIndex(columnOrder?.length + 5);
    }
  };

  // card drag function
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    setIndex(null);
    if (!destination) return;

    if (
      destination.droppableId === 'column-1' &&
      source.droppableId !== 'column-1'
    )
      return;
    if (
      destination.droppableId !== 'rejected' &&
      source.droppableId === 'rejected'
    )
      return;

    if (source.droppableId !== destination.droppableId) {
      setColumns(prevColumns => {
        const sourceColumn = prevColumns[source.droppableId];
        const destColumn = prevColumns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        if (
          columns[source.droppableId].section === 'applicant' ||
          columns[destination.droppableId].section === 'rejected'
        ) {
          setAlert({
            source: source.droppableId,
            destination: destination.droppableId,
            open: true,
            droppableId: destination.droppableId,
            taskId: removed.id,
          });
        } else {
          handleCardUpdate({ ...destination, taskId: removed.id });
        }

        return {
          ...prevColumns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        }
      });
      // setUpdateId({ droppableId: destination.droppableId, taskId: removed.id });

      // if (columns[destination.droppableId].section === 'shortlisted') {
      //   // setShortList(true);
      //   hanldeSortList();
      // }
      // if (columns[destination.droppableId].section === 'interviewed') {
      //   // setInterviewed(true);
      //   hanldeInterview();
      // }
      // if (columns[destination.droppableId].section === 'selected') {
      //   //setOffered(true);
      //   hanldeOffered();
      // }
      
    }
  };

  const handleCardUpdate = (destination: {
    droppableId: string;
    index: number;
    taskId: number;
  }) => {
    dispatch(
      applicantUpdateStatusMiddleWare({
        jd_id,
        applicant_id: destination.taskId,
        status:
          destination.droppableId !== 'selected'
            ? destination.droppableId
            : 'offered',
      }),
    )
      .then(() => {
        getApplicanPipelineData();
        Toast(`Applicant ${destination.droppableId} successfully`);
      })
      .catch(() => {
        setNoLoader(true);
        setTimeout(() => setNoLoader(false), 100);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };
  const hanldeAlertComplete = () => {
    const { taskId, droppableId } = isAlert;
    dispatch(
      applicantUpdateStatusMiddleWare({
        jd_id,
        applicant_id: taskId,
        status: droppableId !== 'selected' ? droppableId : 'offered',
      }),
    )
      .then(() => {
        setAlert(null);
        getApplicanPipelineData();
        Toast(`Applicant ${droppableId} successfully`);
      })
      .catch(() => {
        setNoLoader(true);
        setTimeout(() => setNoLoader(false), 100);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  // short list api call function
  // const hanldeSortList = () => {
  //   dispatch(
  //     applicantUpdateStatusMiddleWare({
  //       jd_id,
  //       applicant_id: isUpdateId.taskId,
  //       status: isUpdateId.droppableId,
  //     }),
  //   )
  //     .then(() => {
  //       setShortList(false);
  //       getApplicanPipelineData();
  //       Toast('Applicant shortlisted successfully');
  //     })
  //     .catch(() => {
  //       setNoLoader(true);
  //       setTimeout(() => setNoLoader(false), 100);
  //       Toast(ERROR_MESSAGE, 'LONG', 'error');
  //     });
  // };
  // // Interview api call function
  // const hanldeInterview = () => {
  //   dispatch(
  //     applicantUpdateStatusMiddleWare({
  //       jd_id,
  //       applicant_id: isUpdateId.taskId,
  //       status: isUpdateId.droppableId,
  //     }),
  //   )
  //     .then(() => {
  //       setInterviewed(false);
  //       getApplicanPipelineData();
  //       Toast('Applicant moved successfully');
  //     })
  //     .catch(() => {
  //       setNoLoader(true);
  //       setTimeout(() => setNoLoader(false), 100);
  //       Toast(ERROR_MESSAGE, 'LONG', 'error');
  //     });
  // };
  // // offered api call function
  // const hanldeOffered = () => {
  //   dispatch(
  //     applicantUpdateStatusMiddleWare({
  //       jd_id,
  //       applicant_id: isUpdateId.taskId,
  //       status: isUpdateId.droppableId,
  //     }),
  //   )
  //     .then(() => {
  //       setOffered(false);
  //       getApplicanPipelineData();
  //       Toast('Applicant offered successfully');
  //     })
  //     .catch(() => {
  //       setNoLoader(true);
  //       setTimeout(() => setNoLoader(false), 100);
  //       Toast(ERROR_MESSAGE, 'LONG', 'error');
  //     });
  // };
  // // reject api call function
  // const hanldeReject = () => {
  //   dispatch(
  //     applicantUpdateStatusMiddleWare({
  //       jd_id,
  //       applicant_id: isUpdateId.taskId,
  //       status: isUpdateId.droppableId,
  //     }),
  //   )
  //     .then(() => {
  //       setRejected(false);
  //       getApplicanPipelineData();
  //       Toast('Applicant rejected successfully');
  //     })
  //     .catch(() => {
  //       setNoLoader(true);
  //       setTimeout(() => setNoLoader(false), 100);
  //       Toast(ERROR_MESSAGE, 'LONG', 'error');
  //     });
  // };

  // popup cancel function
  const hanldeCancel = () => {
    setNoLoader(true);
    // setOffered(false);
    // setShortList(false);
    // setInterviewed(false);
    // setRejected(false);
    setAlert(null);
    setTimeout(() => setNoLoader(false), 100);
  };

  const handleMove = (droppableId: string) => {
    setColumns((previous) => {
      const selectedList = Array.from(cardSelection.values());
      const removedList = selectedList?.reduce((o, v) => {
        if (droppableId === v.columnId) {
          return {
            ...o,
            [v.columnId]: {
              ...previous[v.columnId],
              ...o[v.columnId],
            },
          };
        }
        /// Previous return data
        const previousItems =
          o[v.columnId]?.items || previous[v.columnId]?.items;
        const previousRemovedItems = previous[v.columnId]?.items.filter(
          (doc) => !previousItems.includes(doc),
        );
        /// Filter out previous existing ones
        let filteredList = previousItems.filter((doc) => {
          return doc.id !== v.task.id;
        });
        const newItems = [...filteredList];

        console.log(
          v.task.id,
          v.columnId,
          previousItems,
          previousRemovedItems,
          filteredList,
        );

        return {
          ...o,
          [v.columnId]: {
            ...previous[v.columnId],
            ...o[v.columnId],
            items: newItems,
            total: newItems.length,
          },
        };
      }, {}) as columnTypes;

      const movedList = getMovedList();

      function getMovedList() {
        const selectedItems = selectedList.map((doc) => doc.task);
        let filterItems = previous[droppableId].items.filter(
          (doc) => !selectedItems.includes(doc),
        );
        return [...filterItems, ...selectedItems];
      }

      return {
        ...previous,
        ...removedList,
        [droppableId]: {
          ...previous[droppableId],
          items: movedList,
          total: movedList.length,
        },
      };
    });

    setCardSelection(new Map());
  };

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

          {applicants.applicant.length === 0 &&
          applicants.shortlisted.length === 0 &&
          applicants.selected.length === 0 &&
          applicants.rejected.length === 0 &&
          applicants.interviewed.length === 0 ? (
            <Flex middle center height={window.innerHeight - 236}>
              <Text color={'gray'}>No Applicants Found</Text>
            </Flex>
          ) : (
            <div>
              <TotalApplicant
                total={total_applicants}
                allColumnsItemsLength={allColumnsItemsLength}
                filterTotalFav={filterTotalFav}
                isTotalFav={isTotalFav}
                seletedCardsLength={cardSelection.size}
                onExport={handleBulkExport}
                onMove={handleMove}
              />
              <div style={{ position: 'relative' }}>
                {columns && (
                  <DndTitle
                    data={columnOrder.map((key) => columns[key])}
                    setSortApplicant={setSortApplicant}
                    setSortSortList={setSortSortList}
                    setSortInterview={setSortInterview}
                    setSortSelected={setSortSelected}
                    setSortRejected={setSortRejected}
                    onSelectAll={handleColumnSelect}
                    onUnselectAll={handleColumnUnselect}
                    cardSelectionMap={cardSelection}
                  />
                )}
                <div
                  style={{ height: window.innerHeight - 236 }}
                  className={styles.scrollStyle}
                >
                  {columns && (
                    <DndBoardScreen
                      columns={columns}
                      // applicant={applicants.applicant}
                      // shortlisted={applicants.shortlisted}
                      // selected={applicants.selected}
                      // rejected={applicants.rejected}
                      // interviewed={applicants.interviewed}
                      jd_id={jd_id}
                      outlook={outlook}
                      google={google}
                      job_details={job_details}
                      onClick={handleCardSelection}
                      cardSelectionMap={cardSelection}
                      // isShortList={isShortList}
                      // isInterviewed={isInterviewed}
                      // isOffered={isOffered}
                      // isRejected={isRejected}
                      isAlert={isAlert}
                      // isUpdateId={isUpdateId.taskId}
                      isIndex={isIndex}
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                      // hanldeSortList={hanldeSortList}
                      // hanldeInterview={hanldeInterview}
                      // hanldeOffered={hanldeOffered}
                      // hanldeReject={hanldeReject}
                      hanldeAlertConfirm={hanldeAlertComplete}
                      hanldeCancel={hanldeCancel}
                    />
                  )}
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
