import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import _ from 'lodash';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Loader from '../../uikit/Loader/Loader';
import Button from '../../uikit/Button/Button';
import { AppDispatch, RootState } from '../../store';
import { SUNRAY } from '../../uikit/Colors/colors';
import { qualificationFilterHelper } from '../common/commonHelper';
import SvgSearch from '../../icons/SvgSearch';
import SvgLocation from '../../icons/SvgLocation';
import { InputSearch, Toast } from '../../uikit';
import InputText from '../../uikit/InputText/InputText';
import { myJobPostingDataMiddleWare } from '../myjobposting/store/middleware/myjobpostingmiddleware';
import { ERROR_MESSAGE } from '../constValue';
import SvgIntomark from '../../icons/SvgCancel';
import PipelinePopup from './pipelinepopup';
import {
  applicantPipeLineDataMiddleWare,
  applicantPipeLineMiddleWare,
  downloadApplicantsMiddleware,
  getKanbanStagesMiddleWare,
  kanbanUpdateMiddleWare,
} from './store/middleware/applicantpipelinemiddleware';
import DndTitle from './DndTitle';
import ProfileView from './ProfileView';
import TotalApplicant from './TotalApplicant';
import JobTitleCard from './JobTitleCard';
import DndBoardScreen from './DndBoardScreen';
import ApplicantPipeLineFilter, { ListValue } from './ApplicantPipeLineFilter';
import styles from './applicantpipelinescreen.module.css';
import {
  ApplicantEntity,
  ICardSelectionMap,
  JobDetailsEntity,
} from './applicantPipeLineTypes';
import { columnTypes, IStageColumn } from './dndBoardTypes';
import PipelinePopupTwo from './pipelinepopupTwo';

type ParamsType = {
  jdId: string;
};
const initial = {
  location: '',
};
type FormProps = {};
const REJECTED_COLUMN = 'Rejected';
const NEW_APPLICANT_COLUMN = 'New Applicants';
const ApplicantPipeLineScreen = ({}: FormProps) => {
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
  const [isApplicantView, setApplicantView] = useState(false);
  const myRef = useRef<any>();
  //showpop
  const [showPipelinePopup, setShowPipelinePopup] = useState(false);
  const [cardSelection, setCardSelection] = useState<ICardSelectionMap>(
    new Map(),
  );

  const favAdd = isTotalFav ? 'add' : '';

  const getAppliedView = localStorage.getItem('applied_view');

  const {
    isLoading,
    location_list,
    jd_id,
    workflow_id,
    stages,
    locations,
    showStagesPopup,
    applicants,
    applicantDataLoader,
    favLoader,
    favSuccess,
    total_applicants,
    pipeLineLoader,
    outlook,
    google,
    job_details,
    // updateLoader,
    zita_match_count,
    is_plan,
    downloadState,
  } = useSelector(
    ({
      myJobPosingReducers,
      applicantPipeLineReducers,
      applicantPipeLineDataReducers,
      applicantFavReducers,
      // applicantPipeLineUpdateReducers,
      permissionReducers,
      templatePageReducers,
      kanbanStagesReducers,
      applicantPipelineDownloadReducers,
    }: RootState) => {
      return {
        isLoading: applicantPipeLineDataReducers.isLoading,
        location_list: myJobPosingReducers.location_list,
        jd_id: applicantPipeLineReducers.jd_id,
        workflow_id: applicantPipeLineDataReducers.workflow_id,
        applicants: applicantPipeLineDataReducers.applicants,
        stages: kanbanStagesReducers.stages,
        locations: applicantPipeLineDataReducers.locations,
        showStagesPopup: kanbanStagesReducers.selectPipeline,

        // Test: applicantPipeLineDataReducers.shortlisted,

        applicantDataLoader: applicantPipeLineDataReducers.isLoading,
        favLoader: applicantFavReducers.isLoading,
        favSuccess: applicantFavReducers.success,
        total_applicants: applicantPipeLineDataReducers.total_applicant,
        pipeLineLoader: applicantPipeLineReducers.isLoading,
        google: applicantPipeLineDataReducers.google,
        outlook: applicantPipeLineDataReducers.outlook,
        job_details: applicantPipeLineReducers.job_details,
        // updateLoader: applicantPipeLineUpdateReducers.isLoading,
        zita_match_count: applicantPipeLineReducers.zita_match_count,
        is_plan: permissionReducers.is_plan,
        downloadState: applicantPipelineDownloadReducers,
      };
    },
  );

  useEffect(() => {
    // dispatch(getKanbanStagesMiddleWare());
    dispatch(getKanbanStagesMiddleWare({ jd_id: parseInt(jdId) }));
    dispatch(applicantPipeLineMiddleWare({ jd_id: jdId })).then(() => {
      dispatch(
        applicantPipeLineDataMiddleWare({
          jd_id: jdId,
        }),
      );
    });
  }, []);

  useEffect(() => {
    if (!workflow_id) {
      setShowPipelinePopup(true);
    } else {
      dispatch(
        getKanbanStagesMiddleWare({ jd_id: parseInt(jd_id), workflow_id }),
      );
    }
  }, []);

  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {
      getApplicanPipelineData();
    },
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
    task: ApplicantEntity;
    section: number;
    index: number;
    columnId: number;
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
    setCardSelection(newCardSelection);
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
        sortSortList: isSortApplicant,
        sortInterview: isSortApplicant,
        sortSelected: isSortApplicant,
        sortRejected: isSortApplicant,
        location: formik.values.location || '',
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
    // updateLoader,
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
          sortSortList: isSortApplicant,
          sortInterview: isSortApplicant,
          sortSelected: isSortApplicant,
          sortRejected: isSortApplicant,
          location: formik.values.location || '',
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
        sortSortList: isSortApplicant,
        sortInterview: isSortApplicant,
        sortSelected: isSortApplicant,
        sortRejected: isSortApplicant,
        location: formik.values.location || '',
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
        sortSortList: isSortApplicant,
        sortInterview: isSortApplicant,
        sortSelected: isSortApplicant,
        sortRejected: isSortApplicant,
        location: formik.values.location,
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
        sortSortList: isSortApplicant,
        sortInterview: isSortApplicant,
        sortSelected: isSortApplicant,
        sortRejected: isSortApplicant,
        location: formik.values.location || '',
      }),
    );
  };

  // close popup
  const handleClosePipelinePopup = () => {
    setShowPipelinePopup(false);
  };

  const getAppliedCanId: any = localStorage.getItem('applied_can_id');
  const getAppliedJd: any = localStorage.getItem('applied_jd_id');
  const _debounceSearch = _.debounce(() => handleSearch(), 2000);

  useEffect(() => {
    if (getAppliedView === 'true') {
      setApplicantView(true);
    }
  }, [isApplicantView, getAppliedView]);

  // useEffect(() => {
  //   _debounceSearch();
  // }, [formik.values.location]);

  /// Column Drag & Drop

  // initial value
  const stageColumns = stages?.reduce((o, v) => {
    return {
      ...o,
      [v.id]: {
        ...v,
        columnId: v?.id,
        title: v?.stage_name,
        items: applicants[v.id] || [],
        total: (applicants[v.id] || [])?.length,
        section: v?.id,
        left: '0px',
      } as IStageColumn,
    };
  }, {});
  const columnsFromBackend = {
    [0]: {
      id: 0,
      columnId: 0,
      title: 'New Applicants',
      items: applicants[0] || [],
      total: (applicants[0] || []).length,
      section: 0,
      left: '0px',
      borderColor: SUNRAY,
      stage_color: SUNRAY,
      stage_name: 'New Applicants',
      stage_order: 0,
    } as IStageColumn,
    ...stageColumns,
  };

  const columnOrder = Object.keys(columnsFromBackend) || [];
  const allColumnsItemsLength = columnOrder
    ?.map((key) => columnsFromBackend[key].total as number)
    .reduce((t, v) => (t = t + v), 0);

  const getIsMultiMoveDisabled = () => {
    const selectedList = Array.from(cardSelection.values());
    const isSameColumn = selectedList
      .map((doc) => doc.columnId)
      .every((val, i, arr) => val === arr[0]);
    return allColumnsItemsLength === cardSelection.size && !isSameColumn;
  };

  const [isAlert, setAlert] = useState<{
    type: 'single' | 'bulk';
    source: string;
    destination: string;
    open: boolean;
    droppableId: number;
    taskId?: any;
    candidateId?: number;
  } | null>(null);
  const [isNoLoader, setNoLoader] = useState(false);
  const [columns, setColumns] = useState<columnTypes>(columnsFromBackend || {});
  const [isIndex, setIndex] = useState<any>();

  useEffect(() => {
    if (applicants) setColumns(columnsFromBackend);
  }, [stages, applicants, isNoLoader]);

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

    const sourceDropId = parseInt(source.droppableId);
    const destinationDropId = parseInt(destination.droppableId);

    if (destinationDropId === 0 && sourceDropId !== 0) return;
    if (
      columns[destinationDropId].stage_name !== REJECTED_COLUMN &&
      columns[sourceDropId].stage_name === REJECTED_COLUMN
    )
      return;

    if (sourceDropId !== destinationDropId) {
      setColumns((prevColumns) => {
        const sourceColumn = prevColumns[sourceDropId];
        const destColumn = prevColumns[destinationDropId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        if (
          columns[sourceDropId].stage_name === NEW_APPLICANT_COLUMN ||
          columns[destinationDropId].stage_name === REJECTED_COLUMN
        ) {
          setAlert({
            type: 'single',
            source: columns[sourceDropId].stage_name,
            destination: columns[destinationDropId].stage_name,
            open: true,
            droppableId: destinationDropId,
            taskId: removed.id,
            candidateId: removed.candidate_id_id,
          });
        } else {
          {console.log("**********!*!***!*!*!*!***!*!**!*!*!*!*")}
          handleCardUpdate({
            stage_name: columns[destinationDropId].stage_name,
            taskId: removed.id,
            candidateId: removed.candidate_id_id,
            droppableId: destinationDropId,
          });
        }

        return {
          ...prevColumns,
          [sourceDropId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        };
      });
    }
  };

  const handleCardUpdate = (destination: {
    stage_name: string;
    droppableId: number;
    taskId: number;
    candidateId: number;
  }) => {
    alert("2-handleCardUpdate")

    // dispatch(
    //   kanbanUpdateMiddleWare({
    //     jd_id: parseInt(jd_id),
    //     candidate_id: [destination.candidateId],
    //     stages: destination.stage_name,
    //   }),
    // )
    //   .then(() => {
    //     getApplicanPipelineData();
    //     // Toast(`Applicant ${destination.stage_name} successfully`);
    //     Toast(`Applicant moved successfully`);
    //   })
    //   .catch(() => {
    //     setNoLoader(true);
    //     setTimeout(() => setNoLoader(false), 100);
    //     Toast(ERROR_MESSAGE, 'LONG', 'error');
    //   });
  };

  const hanldeAlertComplete = () => {
    const { taskId, candidateId, droppableId, type } = isAlert;
    if (type === 'single') {
      alert("3-hanldeAlertComplete")
      dispatch(
        kanbanUpdateMiddleWare({
          jd_id: parseInt(jd_id),
          candidate_id: [candidateId],
          stages: getSTData(columns[droppableId]),
        }),
      )
        .then(() => {
          // getApplicanPipelineData();
          // Toast(`Applicant ${getSTData(columns[droppableId])} successfully`);
          Toast(`Applicant moved successfully`);
          setAlert(null);
        })
        .catch(() => {
          setNoLoader(true);
          setTimeout(() => setNoLoader(false), 100);
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }

    if (type === 'bulk') {
      performBulkMove(droppableId);
      setAlert(null);
    }
  };

  const getSelectedCandidateList = () => {
    const selectedList = Array.from(cardSelection.values());
    return selectedList.map((doc) => doc.task.candidate_id_id);
  };

  // popup cancel function
  const hanldeCancel = () => {
    setNoLoader(true);
    setAlert(null);
    setTimeout(() => setNoLoader(false), 100);
  };

  const handleMove = (droppableId: number) => {
    if (columns[droppableId].stage_name === REJECTED_COLUMN) {
      setAlert({
        type: 'bulk',
        source: '',
        destination: columns[droppableId].stage_name,
        open: true,
        droppableId,
      });
    } else {
      performBulkMove(droppableId);
    }
  };

  const performBulkMove = (droppableId: number) => {
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
        if (previous[v.columnId].stage_name === REJECTED_COLUMN) {
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
        const selectedItems = selectedList
          .filter(
            (doc) => previous[doc.columnId].stage_name !== REJECTED_COLUMN,
          )
          .map((doc) => doc.task);
        let filterItems = previous[droppableId].items.filter(
          (doc) => !selectedItems.includes(doc),
        );
        return [...filterItems, ...selectedItems];
      }
      console.log(removedList);
      updateBulkKanbanStage(droppableId, new Map(cardSelection));
      setCardSelection(new Map());
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
  };

  const updateBulkKanbanStage = (
    droppableId: number,
    map: ICardSelectionMap,
  ) => {
    const selectedList = Array.from(map.values());
    const candidateIdList = selectedList
      .filter((doc) => columns[doc.columnId].stage_name !== REJECTED_COLUMN)
      .map((doc) => doc.task.candidate_id_id);

    const stageIds = selectedList
      .filter((doc) => columns[doc.columnId].stage_name !== REJECTED_COLUMN)
      .map((doc) => doc.columnId);

    if (candidateIdList.length === 0) {
      return;
    }
    alert("1-updateBulkKanbanStage")
    dispatch(
      kanbanUpdateMiddleWare({
        jd_id: parseInt(jd_id),
        candidate_id: candidateIdList,
        stages: getSTData(columns[droppableId]),
      }),
    ).then(() => {
      if (stageIds.length > 0) {
        Toast('Applicants moved successfully', 'LONG');
      }
    });
  };
  function getSTData(data: IStageColumn) {
    const { stage_name } = data;
    return stage_name;
  }

  const handleNewPipeline = () => {
    sessionStorage.setItem('superUserTab', '7');
    sessionStorage.setItem('template', '2');
    sessionStorage.setItem('pipeline', '2');
    sessionStorage.setItem('wk_id', 'undefined');
    sessionStorage.setItem('button', '1');
    history.push('/account_setting/settings');
  };

  const handleSortColumn = (columnId: number, arg: string) => {
    setColumns((prevColumns) => {
      if (arg !== 'match') {
        const newItem = [...prevColumns[columnId].items];
        newItem.sort((a, b) => {
          if (arg === 'date') {
            return (
              new Date(b.created_on).getTime() -
              new Date(a.created_on).getTime()
            );
          }
          return a.name.localeCompare(b.name);
        });
        return {
          ...prevColumns,
          [columnId]: {
            ...prevColumns[columnId],
            items: newItem,
          },
        };
      }

      return {
        ...prevColumns,
        [columnId]: {
          ...prevColumns[columnId],
          items: applicants[columnId],
        },
      };
    });
  };

  /// Search ------------------->

  const onSearchChange = (e: React.ChangeEvent<any>) => {
    setSearch(e.target.value);
  };

  const onClearSearch = () => {
    setSearch('');
    dispatch(
      applicantPipeLineDataMiddleWare({
        jd_id: jdId,
        profile_match: isMatchRadio,
        candidate: '',
        work_experience: isExperience,
        profile_view: isProfile,
        education_level: qaValue,
        skill_match: optionsList,
        fav: favAdd,
        sortApplicant: isSortApplicant,
        sortSortList: isSortApplicant,
        sortInterview: isSortApplicant,
        sortSelected: isSortApplicant,
        sortRejected: isSortApplicant,
        location: formik.values.location || '',
      }),
    );
  };

  const onLocationChange = (val: any) => {
    if (val !== '') {
      return;
    }
    formik.handleChange('location')(val);
  };

  const onClearLocation = () => {
    formik.handleChange('location')('');
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
        sortSortList: isSortApplicant,
        sortInterview: isSortApplicant,
        sortSelected: isSortApplicant,
        sortRejected: isSortApplicant,
        location: '',
      }),
    );
  };

  const onLocationKeyPress = (event) => {
    if (event.key === 'Enter') {
      formik.setFieldValue('location', event.target.value);
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
          sortSortList: isSortApplicant,
          sortInterview: isSortApplicant,
          sortSelected: isSortApplicant,
          sortRejected: isSortApplicant,
          location: event.target.value,
        }),
      );
      event.target.blur();
    }
  };

  /// Download ------------>

  // useEffect(() => {
  //   if(downloadState.isLoading === false && )

  // },[downloadState])

  const handleBulkDownload = () => {
    const candidate_id = getSelectedCandidateList();
    dispatch(
      downloadApplicantsMiddleware({
        jd_id: jdId,
        download: 'download',
        candidate_id,
      }),
    );
  };

  const handleCSVDownload = () => {
    dispatch(
      downloadApplicantsMiddleware({ jd_id: jdId, csvdownload: 'csvdownload' }),
    );
  };

  return (
    <>
      {showPipelinePopup && showStagesPopup === null && (
        <PipelinePopup
          jd_id={parseInt(jdId)}
          openPipelinePopup={showPipelinePopup}
          onClose={() => {
            handleClosePipelinePopup();
            history.goBack();
          }}
          onSuccessClose={handleClosePipelinePopup}
          onNewPipeline={handleNewPipeline}
        />
      )}
      {showPipelinePopup && showStagesPopup && (
        <PipelinePopupTwo
          jd_id={parseInt(jdId)}
          openPipelinePopup={showPipelinePopup}
          onClose={() => {
            handleClosePipelinePopup();
            history.goBack();
          }}
          onSuccessClose={handleClosePipelinePopup}
          onNewPipeline={handleNewPipeline}
        />
      )}
      <Flex row className={styles.overAll}>
        {applicantDataLoader || (favLoader && <Loader />)}
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
          // width={window.innerWidth - 260}
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
              style={{ position: 'relative', overFlowX: 'auto' }}
              className={styles.searchbox}
            >
              <Flex row className={styles.searchstyle}>
                <Text className={styles.jobstext}>Applicants</Text>
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
                    onChange={onSearchChange}
                    // placeholder="Search candidate by name or email"
                    placeholder="Search by name or email"
                    onKeyPress={handleKeyPress}
                    className={styles.boxstyle}
                    style={{ marginLeft: '5px' }}
                  />
                  {isSearch.trim() !== '' && (
                    <button
                      className={styles.crossIcon}
                      onClick={onClearSearch}
                    >
                      <SvgIntomark width={14} height={14} fill="#888888" />
                    </button>
                  )}
                  <Flex className={styles.middleline}></Flex>
                  <Flex className={styles.locationicon}>
                    <SvgLocation width={18} height={18} fill={'#581845'} />
                  </Flex>
                  <InputSearch
                    initialValue={formik.values.location}
                    placeholder="Enter applicant location"
                    options={locations}
                    setFieldValue={formik.setFieldValue}
                    name="location"
                    style={styles.boxstyle}
                    labelBold
                    onChange={onLocationChange}
                    onkeyPress={onLocationKeyPress}
                  />
                  {formik.values.location.trim() !== '' && (
                    <button
                      className={styles.crossIcon}
                      onClick={onClearLocation}
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

          <TotalApplicant
            jd_id={parseInt(jdId)}
            columns={columns}
            total={total_applicants}
            moveDisabled={getIsMultiMoveDisabled()}
            filterTotalFav={filterTotalFav}
            isTotalFav={isTotalFav}
            seletedCardsLength={cardSelection.size}
            onExport={handleBulkDownload}
            onMove={handleMove}
            onCSVDownload={handleCSVDownload}
          />
          {isNotEmpty() ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'auto',
                height: '-webkit-fill-available',
              }}
            >
              {columns && (
                <DndTitle
                  columns={columnOrder
                    .map((key) => columns[key])
                    .sort((a, b) => a.stage_order - b.stage_order)}
                  setSortApplicant={handleSortColumn}
                  onSelectAll={handleColumnSelect}
                  onUnselectAll={handleColumnUnselect}
                  cardSelectionMap={cardSelection}
                />
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  flex: 1,
                  height: '-webkit-fill-available',
                }}
                className={styles.scrollStyle}
              >
                {columns && (
                  <DndBoardScreen
                    columns={Object.keys(columns)
                      .map((key) => columns[key])
                      .sort((a, b) => a.stage_order - b.stage_order)}
                    jd_id={jd_id}
                    outlook={outlook}
                    google={google}
                    job_details={job_details}
                    onClick={handleCardSelection}
                    cardSelectionMap={cardSelection}
                    isAlert={isAlert}
                    isIndex={isIndex}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    hanldeAlertConfirm={hanldeAlertComplete}
                    hanldeCancel={hanldeCancel}
                    onRefresh={getApplicanPipelineData}
                  />
                )}
              </div>
            </div>
          ) : (
            <Flex middle center height={window.innerHeight - 236}>
              <Text color={'gray'}>No Applicants Found</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      {isLoading && <Loader />}
    </>
  );

  function isNotEmpty() {
    const keys = Object.keys(applicants);
    if (keys.length !== 0) {
      return keys.map((key) => applicants[key].length === 0).includes(false);
    }
    return false;
  }
};

export default ApplicantPipeLineScreen;
