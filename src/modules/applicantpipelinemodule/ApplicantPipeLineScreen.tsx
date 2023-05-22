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
import { handleDownload } from './dndBoardHelper';
import { columnTypes, IStageColumn } from './dndBoardTypes';
import PipelinePopupTwo from './pipelinepopupTwo';
// import { columnOrder } from './initialData';

type ParamsType = {
  jdId: string;
};
const initial = {
  location: '',
};
type FormProps = {
  location_option: string[];
};
const REJECTED_COLUMN = 'Rejected';
const NEW_APPLICANT_COLUMN = 'New Applicants';
const ApplicantPipeLineScreen = ({ location_option = [] }: FormProps) => {
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
    location_list,
    jd_id,
    workflow_id,
    stages,
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
    }: RootState) => {
      return {
        location_list: myJobPosingReducers.location_list,
        jd_id: applicantPipeLineReducers.jd_id,
        workflow_id: applicantPipeLineDataReducers.workflow_id,
        applicants: applicantPipeLineDataReducers.applicants,
        stages: kanbanStagesReducers.stages,
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
  }, [workflow_id]);

  useEffect(() => {}, []);

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
        sortApplicant: isSortApplicant, /// TODO: handle this my love
        sortSortList: isSortApplicant,
        sortInterview: isSortApplicant,
        sortSelected: isSortApplicant,
        sortRejected: isSortApplicant,
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
      }),
    );
  };

  // close popup
  const handleClosePipelinePopup = () => {
    setShowPipelinePopup(false);
  };
  // // open popup
  // const handleOpenPipelinePopup = () => {
  //   setShowPipelinePopup(true);
  // };

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
    dispatch(
      kanbanUpdateMiddleWare({
        jd_id: parseInt(jd_id),
        candidate_id: [destination.candidateId],
        stages: destination.stage_name,
      }),
    )
      .then(() => {
        getApplicanPipelineData();
        Toast(`Applicant ${destination.stage_name} successfully`);
      })
      .catch(() => {
        setNoLoader(true);
        setTimeout(() => setNoLoader(false), 100);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  const hanldeAlertComplete = () => {
    const { taskId, candidateId, droppableId, type } = isAlert;
    if (type === 'single') {
      dispatch(
        kanbanUpdateMiddleWare({
          jd_id: parseInt(jd_id),
          candidate_id: [candidateId],
          stages: getSTData(columns[droppableId]),
        }),
      )
        .then(() => {
          // getApplicanPipelineData();
          Toast(`Applicant ${getSTData(columns[droppableId])} successfully`);
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

    updateBulkKanbanStage(droppableId, new Map(cardSelection));

    setCardSelection(new Map());
  };

  const updateBulkKanbanStage = (
    droppableId: number,
    map: ICardSelectionMap,
  ) => {
    const selectedList = Array.from(map.values());
    const candidateIdList = selectedList
      .filter((doc) => columns[doc.columnId].stage_name !== REJECTED_COLUMN)
      .map((doc) => doc.task.candidate_id_id);

    dispatch(
      kanbanUpdateMiddleWare({
        jd_id: parseInt(jd_id),
        candidate_id: candidateIdList,
        stages: getSTData(columns[droppableId]),
      }),
    );
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
    history.push('/account_setting/settings');
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
                    onChange={(e) => setSearch(e.target.value)}
                    // placeholder="Search candidate by name or email"
                    placeholder="Search by name or email"
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
                    placeholder="Enter applicant location"
                    options={location_option}
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
          <div>
            <TotalApplicant
              jd_id={parseInt(jdId)}
              // workflowId={0}
              total={total_applicants}
              allColumnsItemsLength={allColumnsItemsLength}
              filterTotalFav={filterTotalFav}
              isTotalFav={isTotalFav}
              seletedCardsLength={cardSelection.size}
              onExport={handleBulkExport}
              onMove={handleMove}
            />
            {isAllListEmpty() ? (
              <div style={{ position: 'relative' }}>
                {columns && (
                  <DndTitle
                    columns={columnOrder
                      .map((key) => columns[key])
                      .sort((a, b) => a.stage_order - b.stage_order)}
                    setSortApplicant={setSortApplicant}
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
                    />
                  )}
                </div>
              </div>
            ) : (
              <Flex middle center height={window.innerHeight - 236}>
                <Text color={'gray'}>No Applicants Found</Text>
              </Flex>
            )}
          </div>
        </Flex>
      </Flex>
    </>
  );

  function isAllListEmpty() {
    const keys = Object.keys(applicants);
    if (keys.length !== 0) {
      return keys.map((key) => applicants[key].length === 0).includes(false);
    }
    return true;
  }
};

export default ApplicantPipeLineScreen;
