import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import _ from 'lodash';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
import { Card, InputSearch, Modal, Toast } from '../../uikit';
import InputText from '../../uikit/InputText/InputText';
import { myJobPostingDataMiddleWare } from '../myjobposting/store/middleware/myjobpostingmiddleware';
import { ERROR_MESSAGE } from '../constValue';
import SvgIntomark from '../../icons/SvgCancel';

import {
  checkAuthMiddleware,
  jdMatchMiddleWare,
} from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { routesPath } from '../../routes/routesPath';
import {
  WeightagematchinggetMiddleWare,
  WeightagematchingpostMiddleWare,
  WeightagematchingscoreMiddleWare,
} from '../createjdmodule/store/middleware/createjdmiddleware';
import ComparativeModal from '../comparativeanalysis/RecommendationScreen';
import SvgRefresh from '../../icons/SvgRefresh';
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
  const [isDiploma, setDiploma] = useState(false);
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
  const [model, setmodel] = useState(false);
  const [cardSelection, setCardSelection] = useState<ICardSelectionMap>(
    new Map(),
  );

  const [change, setchange] = useState(false);
  const [aimodel, setaimodel] = useState(false);
  const [Comparmodel, setComparmodel] = useState(false);
  const [islodermatch, setloadermatch] = useState(false);
  const [Matching, setmatching] = useState<any>([]);
  const favAdd = isTotalFav ? 'add' : '';

  const getAppliedView = localStorage.getItem('applied_view');

  let formData = new FormData();

  const [isnextLoader, setnextLoader] = useState(false);

  const [rangeValueskill, setRangeValueskill] = useState<any>(20);
  const [rangeValuerolles, setRangeValuerolles] = useState<any>(20);
  const [rangeValueexperience, setRangeValueexperience] = useState<any>(20);
  const [rangeValueQualifications, setRangeValueQualifications] =
    useState<any>(10);
  const [rangeValueTechnical, setRangeValueTechnical] = useState<any>(20);
  const [rangeValueSoft, setRangeValueSoft] = useState<any>(10);

  const [rangeValueIndustry, setRangeValueIndustry] = useState<any>(20);
  const [rangeValueDomain, setRangeValueDomain] = useState<any>(20);
  const [rangeValueCertifications, setRangeValueCertifications] =
    useState<any>(20);
  const [rangeValueLocation, setRangeValueLocation] = useState<any>(10);
  const [rangeValueCultural, setRangeValueCultural] = useState<any>(20);
  const [rangeValueReferences, setRangeValueReferences] = useState<any>(10);

  const [technicalPercent, setTechnicalPercent] = useState(0);
  const [nonTechnicalPercent, setNonTechnicalPercent] = useState(0);

  const [totaltechnical, settotaltechnical] = useState(0);
  const [totalnontechnical, settotalnontechnical] = useState(0);

  // const updateTechnicalPercent = () => {
  //   const totalTechnicalPercent =
  //     rangeValueskill +
  //     rangeValuerolles +
  //     rangeValueexperience +
  //     rangeValueQualifications +
  //     rangeValueTechnical +
  //     rangeValueSoft;
  //   setTechnicalPercent(totalTechnicalPercent);
  //   settotaltechnical(totalTechnicalPercent)
  // };
  const updateTechnicalPercent = () => {
    const rangeValues = [
      rangeValueskill,
      rangeValuerolles,
      rangeValueexperience,
      rangeValueQualifications,
      rangeValueTechnical,
      rangeValueSoft,
    ];

    // Filter out empty or falsy values (you can add more conditions if needed)
    const validRangeValues = rangeValues.filter(
      (value) => value !== '' && value !== 0,
    );

    // Sum the valid values
    const totalTechnicalPercent = validRangeValues.reduce(
      (acc, value) => acc + value,
      0,
    );

    setTechnicalPercent(totalTechnicalPercent);
    settotaltechnical(totalTechnicalPercent);
  };

  // const updateNonTechnicalPercent = () => {
  //   const totalNonTechnicalPercent =
  //     rangeValueIndustry +
  //     rangeValueDomain +
  //     rangeValueCertifications +
  //     rangeValueLocation +
  //     rangeValueCultural +
  //     rangeValueReferences;
  //   setNonTechnicalPercent(totalNonTechnicalPercent);
  //   settotalnontechnical(totalNonTechnicalPercent);
  // };

  const updateNonTechnicalPercent = () => {
    const rangeValues = [
      rangeValueIndustry,
      rangeValueDomain,
      rangeValueCertifications,
      rangeValueLocation,
      rangeValueCultural,
      rangeValueReferences,
    ];

    // Filter out empty or falsy values (you can add more conditions if needed)
    const validRangeValues = rangeValues.filter(
      (value) => value !== '' && value !== 0,
    );

    // Sum the valid values
    const totalNonTechnicalPercent = validRangeValues.reduce(
      (acc, value) => acc + value,
      0,
    );

    setNonTechnicalPercent(totalNonTechnicalPercent);
    settotalnontechnical(totalNonTechnicalPercent);
  };

  useEffect(() => {
    updateTechnicalPercent();
    updateNonTechnicalPercent();
  }, [
    rangeValueskill,
    rangeValuerolles,
    rangeValueexperience,
    rangeValueQualifications,
    rangeValueTechnical,
    rangeValueSoft,
    rangeValueIndustry,
    rangeValueDomain,
    rangeValueCertifications,
    rangeValueLocation,
    rangeValueCultural,
    rangeValueReferences,
  ]); // Empty dependency array ensures this runs only once after initial render

  const nextfunction = () => {
    if (
      totaltechnical === 100 &&
      (totalnontechnical === 100 || totalnontechnical === 0)
    ) {
      const list = [
        {
          skills: rangeValueskill,
          roles: rangeValuerolles,
          exp: rangeValueexperience,
          qualification: rangeValueQualifications,
          tech_tools: rangeValueTechnical,
          soft_skills: rangeValueSoft,
          industry_exp: rangeValueIndustry,
          domain_exp: rangeValueDomain,
          certification: rangeValueCertifications,
          location: rangeValueLocation,
          cultural_fit: rangeValueCultural,
          ref: rangeValueReferences,
        },
      ];
      formData.append('tech', JSON.stringify(list));
      formData.append('jd_id', jdId);
      setnextLoader(true);
      dispatch(
        WeightagematchingpostMiddleWare({
          formData,
        }),
      ).then((res) => {
        if (res.payload.success === false) {
          setnextLoader(false);
          handleWeightageClose();
          Toast(
            'Sorry, there was a problem connecting to the API. Please try again later.',
            'LONG',
            'error',
          );
        } else {
          setnextLoader(false);
          handleWeightageClose();

          dispatch(WeightagematchingscoreMiddleWare(jd_id)).then((responce) => {
            if (responce.payload.success === true) {
              Toast('Weightage setting saved successfully', 'LONG');
              getApplicanPipelineData();
            } else {
              Toast(
                'Sorry, there was a problem connecting to the API. Please try again later.',
                'LONG',
                'error',
              );
            }
          });
        }
      });
    }
  };

  const technicalresetfunction = () => {
    setRangeValueskill(20);
    setRangeValuerolles(20);
    setRangeValueexperience(20);
    setRangeValueQualifications(10);
    setRangeValueTechnical(20);
    setRangeValueSoft(10);
  };

  const nontechnicalresetfunction = () => {
    setRangeValueIndustry(20);
    setRangeValueDomain(20);
    setRangeValueCertifications(20);
    setRangeValueLocation(10);
    setRangeValueCultural(20);
    setRangeValueReferences(10);
  };

  const handleRangeChange = (e: any) => {
    if (e.target.value === '') {
      setRangeValueskill('');
    } else {
      setRangeValueskill(parseInt(e.target.value));
      updateTechnicalPercent();
    }
  };
  const handleRangeChangerole = (e: any) => {
    if (e.target.value === '') {
      setRangeValuerolles('');
    } else {
      setRangeValuerolles(parseInt(e.target.value));
      updateTechnicalPercent();
    }
  };
  const handleRangeChangeexperience = (e: any) => {
    if (e.target.value === '') {
      setRangeValueexperience('');
    } else {
      setRangeValueexperience(parseInt(e.target.value));
      updateTechnicalPercent();
    }
  };
  const handleRangeChangequalifications = (e: any) => {
    if (e.target.value === '') {
      setRangeValueQualifications('');
    } else {
      setRangeValueQualifications(parseInt(e.target.value));
      updateTechnicalPercent();
    }
  };
  const handleRangeChangetechnical = (e: any) => {
    if (e.target.value === '') {
      setRangeValueTechnical('');
    } else {
      setRangeValueTechnical(parseInt(e.target.value));
      updateTechnicalPercent();
    }
  };
  const handleRangeChangesoft = (e: any) => {
    if (e.target.value === '') {
      setRangeValueSoft('');
    } else {
      setRangeValueSoft(parseInt(e.target.value));
      updateTechnicalPercent();
    }
  };

  const handleRangeChangeindustry = (e: any) => {
    if (e.target.value === '') {
      setRangeValueIndustry('');
    } else {
      setRangeValueIndustry(parseInt(e.target.value));
      updateNonTechnicalPercent();
    }
  };
  const handleRangeChangedomain = (e: any) => {
    if (e.target.value === '') {
      setRangeValueDomain('');
    } else {
      setRangeValueDomain(parseInt(e.target.value));
      updateNonTechnicalPercent();
    }
  };
  const handleRangeChangecertification = (e: any) => {
    if (e.target.value === '') {
      setRangeValueCertifications('');
    } else {
      setRangeValueCertifications(parseInt(e.target.value));
      updateNonTechnicalPercent();
    }
  };
  const handleRangeChangelocation = (e: any) => {
    if (e.target.value === '') {
      setRangeValueLocation('');
    } else {
      setRangeValueLocation(parseInt(e.target.value));
      updateNonTechnicalPercent();
    }
  };
  const handleRangeChangecultural = (e: any) => {
    if (e.target.value === '') {
      setRangeValueCultural('');
    } else {
      setRangeValueCultural(parseInt(e.target.value));
      updateNonTechnicalPercent();
    }
  };
  const handleRangeChangereferences = (e: any) => {
    if (e.target.value === '') {
      setRangeValueReferences('');
    } else {
      setRangeValueReferences(parseInt(e.target.value));
      updateNonTechnicalPercent();
    }
  };

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
    non_tech,
    tech,
    success,
    downloadState,
  } = useSelector(
    ({
      myJobPosingReducers,
      applicantPipeLineReducers,
      applicantPipeLineDataReducers,
      applicantFavReducers,
      weightageReducers,
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
        success: weightageReducers.success,
        non_tech: weightageReducers.non_tech,
        tech: weightageReducers.tech_skills,
      };
    },
  );

  // useEffect(() => {
  //   if (success === true) {
  //     setRangeValueskill(tech.skills);
  //     setRangeValuerolles(tech.roles);
  //     setRangeValueexperience(tech.exp);
  //     setRangeValueQualifications(tech.qualification);
  //     setRangeValueTechnical(tech.tech_tools);
  //     setRangeValueSoft(tech.soft_skills);

  //     setRangeValueIndustry(non_tech.industry_exp);
  //     setRangeValueDomain(non_tech.domain_exp);
  //     setRangeValueCertifications(non_tech.certification);
  //     setRangeValueLocation(non_tech.location);
  //     setRangeValueCultural(non_tech.cultural_fit);
  //     setRangeValueReferences(non_tech.ref);
  //   }

  //   dispatch(WeightagematchinggetMiddleWare(jdId))
  //   .then((res)=>{
  //     if (res.payload.success === false) {
  //       Toast(
  //         'Sorry, there was a problem connecting to the API. Please try again later.',
  //         'LONG',
  //         'error',
  //       );
  //     }
  //   })

  // }, [success])

  useEffect(() => {
    handlefunction();
  }, []);

  const handlefunction = () => {
    dispatch(WeightagematchinggetMiddleWare(jdId)).then((res) => {
      if (res.payload.success === true) {
        if (res.payload !== undefined) {
          setRangeValueskill(res.payload.tech_skills.skills);
          setRangeValuerolles(res.payload.tech_skills.roles);
          setRangeValueexperience(res.payload.tech_skills.exp);
          setRangeValueQualifications(res.payload.tech_skills.qualification);
          setRangeValueTechnical(res.payload.tech_skills.tech_tools);
          setRangeValueSoft(res.payload.tech_skills.soft_skills);
          setRangeValueIndustry(res.payload.non_tech.industry_exp);
          setRangeValueDomain(res.payload.non_tech.domain_exp);
          setRangeValueCertifications(res.payload.non_tech.certification);
          setRangeValueLocation(res.payload.non_tech.location);
          setRangeValueCultural(res.payload.non_tech.cultural_fit);
          setRangeValueReferences(res.payload.non_tech.ref);
        }
      }

      if (res.payload.success === false) {
        Toast(
          'Sorry, there was a problem connecting to the API. Please try again later.',
          'LONG',
          'error',
        );
      }
    });
  };

  const closefunction = () => {
    setRangeValueskill(tech.skills);
    setRangeValuerolles(tech.roles);
    setRangeValueexperience(tech.exp);
    setRangeValueQualifications(tech.qualification);
    setRangeValueTechnical(tech.tech_tools);
    setRangeValueSoft(tech.soft_skills);

    setRangeValueIndustry(non_tech.industry_exp);
    setRangeValueDomain(non_tech.domain_exp);
    setRangeValueCertifications(non_tech.certification);
    setRangeValueLocation(non_tech.location);
    setRangeValueCultural(non_tech.cultural_fit);
    setRangeValueReferences(non_tech.ref);
  };

  useEffect(() => {
    dispatch(checkAuthMiddleware());
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
    if (Comparmodel === true) {
      setComparmodel(true);
    }
  }, [Comparmodel]);

  useEffect(() => {
    if (!workflow_id) {
      setShowPipelinePopup(true);
    } else {
      dispatch(
        getKanbanStagesMiddleWare({ jd_id: parseInt(jd_id), workflow_id }),
      );
    }
  }, [workflow_id]);

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

  // select card //
  const select_candidate = (data, verify) => {
    if (verify === 1) {
      var selectdata = {
        candidate_id: data.task.candidate_id_id,
        first_name: data.task.first_name,
        last_name: data.task.last_name,
        email: data.task.email,
        profile_image: data.task.image,
      };
      setmatching([...Matching, selectdata]);
    } else if (verify === 0) {
      var NewArray = Matching.filter(
        (item) => item.candidate_id !== data.task.candidate_id_id,
      );

      setmatching(NewArray);
    } else if (verify === 2) {
      var arr = [];
      data.map((val) => {
        var selectdata1 = {
          candidate_id: val.candidate_id_id,
          first_name: val.first_name,
          last_name: val.last_name,
          email: val.email,
          profile_image: val.image,
        };
        arr.push(selectdata1);
      });
      setmatching([...Matching, ...arr]);
    } else if (verify === 3) {
      let uniqueIds = new Set(data.map((item) => item.candidate_id_id));
      let newArray1 = Matching.filter(
        (item) => !uniqueIds.has(item.candidate_id),
      );
      setmatching(newArray1);
    } else if (verify === 4) {
      var selectdata4 = {
        candidate_id: data.candidate_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        profile_image: data.profile_image,
      };
      setmatching([...Matching, selectdata4]);
    } else if (verify === 5) {
      var Newvalue = Matching.filter(
        (item) => item.candidate_id !== parseInt(data.candidate_id),
      );

      setmatching(Newvalue);
    } else if (verify === 6) {
      setmatching(data);
    }
  };

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
      select_candidate(data, 0);
      newCardSelection.delete(data.task.id);
    } else {
      select_candidate(data, 1);
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
    select_candidate(newList, 2);
    setCardSelection(newCardSelection);
  };
  const handleColumnUnselect = (data: IStageColumn) => {
    const { section, columnId } = data;
    const list = columns[columnId].items as any[];
    const newCardSelection = new Map(cardSelection);
    const newList = list.filter((doc) => cardSelection.has(doc.id));
    newList.forEach((task) => newCardSelection.delete(task.id));
    select_candidate(newList, 3);
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
  // filter diploma function
  const handleDiploma = () => {
    setDiploma(!isDiploma);
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
    setDiploma(false);
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
      value: 'Diploma',
      label: 'Diploma',
      checked: isDiploma,
      onChange: handleDiploma,
    },
    {
      value: 'Others',
      label: 'Other',
      checked: isOther,
      onChange: handleOther,
    },
    {
      value: 'any',
      label: 'Any',
      checked: isAny,
      onChange: handleAny,
    },
  ];
  useEffect(() => {
    if (
      isBachelors === false &&
      isDoctorate === false &&
      isMasters === false &&
      isOther === false &&
      isDiploma === false
    ) {
      setAny(true);
    }
  }, [isBachelors, isDoctorate, isDiploma, isMasters, isOther]);

  const qaValue = qualificationFilterHelper(
    isAny,
    isBachelors,
    isDoctorate,
    isDiploma,
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
    if (!change) {
      getApplicanPipelineData();
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
    favLoader,
    isTotalFav,
    isSortApplicant,
    change,
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
    if (change === false) {
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
    }
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
    setDiploma(false);
    setOther(false);
    setSearch('');
    formik.handleChange('location')('');
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
        // Toast(`Applicant ${destination.stage_name} successfully`);
        Toast(`Applicant moved successfully`);
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
    // if (val !== '') {
    //   return;
    // }
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
  const handleWeightageOpen = () => {
    handlefunction();
    setmodel(true);
  };
  const handleWeightageClose = () => {
    closefunction();
    setmodel(false);
  };
  const onComparative = () => {
    setaimodel(true);
    setComparmodel(true);
  };
  const updatemodel = (val, id) => {
    if (val === true) {
      setComparmodel(val);
    } else {
      if (id === 1) {
        setCardSelection(new Map());
        setmatching([]);
      }
      setComparmodel(val);
    }
  };

  return (
    <>
      {showPipelinePopup && showStagesPopup === null && (
        <PipelinePopup
          jd_id={parseInt(jdId)}
          openPipelinePopup={showPipelinePopup}
          onClose={() => {
            handleClosePipelinePopup();
            // history.goBack();
            history.push(routesPath.MY_JOB_POSTING);
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
            // history.goBack();
            history.push(routesPath.MY_JOB_POSTING);
          }}
          onSuccessClose={handleClosePipelinePopup}
          onNewPipeline={handleNewPipeline}
        />
      )}
      {/* <Flex row className={styles.overAll} style={{marginLeft:'12%'}}> */}
      <Flex row className={styles.overAll}>
        {applicantDataLoader || (favLoader && <Loader />)}
        {pipeLineLoader || (islodermatch && <Loader />)}
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
          // width={window.innerWidth - 220}
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
            <Flex row>
              <Flex>
                {/* <LinkWrapper > */}
                <Button
                  onClick={handleWeightageOpen}
                  className={styles.btnStyle}
                  types="secondary"
                >
                  Adjust Matching Criteria
                </Button>
                {/* </LinkWrapper> */}
              </Flex>
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
          <Modal open={model}>
            <Flex className={styles.weightagepopup}>
              <Flex className={styles.popupheading}>
                <Text size={14} bold>
                  Adjust Matching Criteria
                </Text>
              </Flex>
              <Flex className={styles.parent} mt-30>
                <Flex style={{ width: '49%' }}>
                  <Flex className={styles.progressbarstyle}>
                    {/* <Flex><Text bold style={{ paddingTop: "10px", paddingBottom: '10px' }}>Profile Compatibility Criteria</Text></Flex> */}
                    <Flex row center className={styles.techtitleblock}>
                      <Flex className={styles.techmatchtitle}>
                        <Text bold>Profile Compatibility Criteria</Text>
                      </Flex>
                      <Flex
                        title="Reset Technical Weightage"
                        className={styles.techresetbutton}
                      >
                        <SvgRefresh
                          width={18}
                          height={18}
                          onClick={technicalresetfunction}
                          className={styles.filtersvg}
                        />
                      </Flex>
                    </Flex>
                    <Flex
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                    >
                      <CircularProgressbar
                        value={technicalPercent}
                        text={`${technicalPercent}%`}
                        strokeWidth={10}
                        styles={buildStyles({
                          // Rotation of path and trail, in number of turns (0-1)
                          //rotation: 0.25,

                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          //  strokeLinecap: 'butt',

                          // Text size
                          textSize: '16px',

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,

                          // Can specify path transition in more detail, or remove it entirely
                          // pathTransition: 'none',

                          // Colors
                          pathColor: `rgba(0,190,75, ${
                            technicalPercent / 100
                          })`,
                          textColor: 'black',
                          trailColor: '#d6d6d6',

                          backgroundColor: '#3e98c7',
                        })}
                      />
                    </Flex>
                  </Flex>
                  <Flex>
                    <Flex className={styles.sliderstyle} marginTop={20}>
                      <Flex>
                        <Text>Technical Skills</Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={rangeValueskill === '' ? 0 : rangeValueskill}
                          className={styles.customrange}
                          onChange={handleRangeChange}
                          style={{
                            // Styling with violet color

                            width: '200px',
                            // Set the width as needed
                            color: 'white', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing
                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValueskill / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValueskill / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValueskill}
                            onChange={handleRangeChange}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width: rangeValueskill < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex className={styles.sliderstyle}>
                      <Flex>
                        <Text>Roles and Responsibilities </Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className={styles.customrange}
                          value={rangeValuerolles === '' ? 0 : rangeValuerolles}
                          onChange={handleRangeChangerole}
                          style={{
                            // Styling with violet color

                            width: '200px',
                            // Set the width as needed
                            color: 'violet', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing

                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValuerolles / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValuerolles / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValuerolles}
                            onChange={handleRangeChangerole}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width: rangeValuerolles < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex className={styles.sliderstyle}>
                      <Flex>
                        <Text>Experience</Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={
                            rangeValueexperience === ''
                              ? 0
                              : rangeValueexperience
                          }
                          className={styles.customrange}
                          onChange={handleRangeChangeexperience}
                          style={{
                            width: '200px', // Set the width as needed
                            color: 'violet', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing
                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValueexperience / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValueexperience / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValueexperience}
                            onChange={handleRangeChangeexperience}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width:
                                rangeValueexperience < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex className={styles.sliderstyle}>
                      <Flex>
                        <Text>Technical Tools and Languages </Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={
                            rangeValueTechnical === '' ? 0 : rangeValueTechnical
                          }
                          onChange={handleRangeChangetechnical}
                          className={styles.customrange}
                          style={{
                            // Styling with violet color
                            width: '200px', // Set the width as needed
                            color: 'violet', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing
                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValueTechnical / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValueTechnical / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValueTechnical}
                            onChange={handleRangeChangetechnical}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width: rangeValueTechnical < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex className={styles.sliderstyle}>
                      <Flex>
                        <Text>Soft Skills </Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className={styles.customrange}
                          value={rangeValueSoft === '' ? 0 : rangeValueSoft}
                          onChange={handleRangeChangesoft}
                          style={{
                            // Styling with violet color
                            width: '200px', // Set the width as needed
                            color: 'violet', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing
                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValueSoft / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValueSoft / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValueSoft}
                            onChange={handleRangeChangesoft}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width: rangeValueSoft < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex className={styles.sliderstyle}>
                      <Flex>
                        <Text>Qualifications</Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={
                            rangeValueQualifications === ''
                              ? 0
                              : rangeValueQualifications
                          }
                          className={styles.customrange}
                          onChange={handleRangeChangequalifications}
                          style={{
                            // Styling with violet color
                            width: '200px', // Set the width as needed
                            color: 'violet', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing
                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValueQualifications / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValueQualifications / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValueQualifications}
                            onChange={handleRangeChangequalifications}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width:
                                rangeValueQualifications < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex className={styles.sliderstyle}>
                      {totaltechnical !== 100 && (
                        <Text
                          style={{
                            display: 'flex',
                            alignSelf: 'flex-between',
                          }}
                          size={12}
                          color="error"
                        >
                          Profile compatibility criteria must equal 100
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                </Flex>

                <Flex className={styles.splitline}></Flex>

                <Flex className={styles.split}></Flex>

                <Flex style={{ width: '49%' }}>
                  <Flex className={styles.progressbarstyle}>
                    {/* <Flex><Text bold style={{ paddingTop: "10px", paddingBottom: '10px' }}>Enhanced Matching Criteria</Text></Flex> */}
                    <Flex row center className={styles.nontechtitleblock}>
                      <Flex className={styles.nontechmatchtitle}>
                        <Text bold>Enhanced Matching Criteria</Text>
                      </Flex>
                      <Flex
                        title="Reset Non-Technical Weightage"
                        className={styles.nontechresetbutton}
                      >
                        <SvgRefresh
                          width={18}
                          height={18}
                          onClick={nontechnicalresetfunction}
                          className={styles.filtersvg}
                        />
                      </Flex>
                    </Flex>
                    <Flex
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                    >
                      <CircularProgressbar
                        value={nonTechnicalPercent}
                        text={`${nonTechnicalPercent}%`}
                        strokeWidth={10}
                        styles={buildStyles({
                          textSize: '16px',
                          pathColor: `rgba(0,190,75, ${
                            nonTechnicalPercent / 100
                          })`,
                          textColor: 'black',
                          trailColor: '#d6d6d6',
                          backgroundColor: '#3e98c7',
                        })}
                      />
                    </Flex>
                  </Flex>

                  <Flex>
                    <Flex className={styles.sliderstyle} marginTop={20}>
                      <Flex>
                        <Text>Industry Specific Experience </Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={
                            rangeValueIndustry === '' ? 0 : rangeValueIndustry
                          }
                          className={styles.customrange}
                          onChange={handleRangeChangeindustry}
                          style={{
                            // Styling with violet color
                            width: '200px', // Set the width as needed
                            color: 'white', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing
                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValueIndustry / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValueIndustry / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValueIndustry}
                            onChange={handleRangeChangeindustry}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width: rangeValueIndustry < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex className={styles.sliderstyle}>
                      <Flex>
                        <Text>Domain Specific Experience </Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className={styles.customrange}
                          value={rangeValueDomain === '' ? 0 : rangeValueDomain}
                          onChange={handleRangeChangedomain}
                          style={{
                            // Styling with violet color
                            width: '200px', // Set the width as needed
                            color: 'violet', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing
                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValueDomain / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValueDomain / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValueDomain}
                            onChange={handleRangeChangedomain}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width: rangeValueDomain < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex className={styles.sliderstyle}>
                      <Flex>
                        <Text>Certifications </Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={
                            rangeValueCertifications === ''
                              ? 0
                              : rangeValueCertifications
                          }
                          className={styles.customrange}
                          onChange={handleRangeChangecertification}
                          style={{
                            // Styling with violet color
                            width: '200px', // Set the width as needed
                            color: 'violet', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing
                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValueCertifications / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValueCertifications / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValueCertifications}
                            onChange={handleRangeChangecertification}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width:
                                rangeValueCertifications < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex className={styles.sliderstyle}>
                      <Flex>
                        <Text>Cultural Fit</Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={
                            rangeValueCultural === '' ? 0 : rangeValueCultural
                          }
                          onChange={handleRangeChangecultural}
                          className={styles.customrange}
                          style={{
                            // Styling with violet color
                            width: '200px', // Set the width as needed
                            color: 'violet', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing
                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValueCultural / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValueCultural / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValueCultural}
                            onChange={handleRangeChangecultural}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width: rangeValueCultural < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex className={styles.sliderstyle}>
                      <Flex>
                        <Text>References and Recommendations </Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className={styles.customrange}
                          value={
                            rangeValueReferences === ''
                              ? 0
                              : rangeValueReferences
                          }
                          onChange={handleRangeChangereferences}
                          style={{
                            // Styling with violet color
                            width: '200px', // Set the width as needed
                            color: 'violet', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing
                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValueReferences / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValueReferences / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValueReferences}
                            onChange={handleRangeChangereferences}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width:
                                rangeValueReferences < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex className={styles.sliderstyle}>
                      <Flex>
                        <Text>Location Alignment </Text>
                      </Flex>
                      <Flex className={styles.innerstyle}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={
                            rangeValueLocation === '' ? 0 : rangeValueLocation
                          }
                          className={styles.customrange}
                          onChange={handleRangeChangelocation}
                          style={{
                            // Styling with violet color
                            width: '200px', // Set the width as needed
                            color: 'violet', // Violet color
                            WebkitAppearance: 'none', // Remove default styling in Webkit browsers
                            margin: '10px 0', // Add margin for spacing
                            cursor: 'pointer', // Show pointer cursor
                            background: `linear-gradient(to right, #d3d3d3 0%, #996666 ${
                              (rangeValueLocation / 100) * 100
                            }%, #d3d3d3 ${
                              (rangeValueLocation / 100) * 100
                            }%, #d3d3d3 100%)`,
                            borderRadius: '5px', // Add border radius
                          }}
                        />
                        <Flex style={{ marginLeft: '20px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={rangeValueLocation}
                            onChange={handleRangeChangelocation}
                            maxLength={3}
                            className={styles.scoreinputfield}
                            style={{
                              width: rangeValueLocation < 99 ? '40px' : '50px',
                            }}
                          ></input>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex className={styles.sliderstyle}>
                      {totalnontechnical !== 0 && totalnontechnical !== 100 && (
                        <Text
                          style={{
                            display: 'flex',
                            alignSelf: 'flex-between',
                          }}
                          size={12}
                          color="error"
                        >
                          Enhanced matching criteria must be equal to 0 or 100
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex row center className={styles.popbtnContainer}>
                <Flex></Flex>
                <Flex row>
                  <Flex className={styles.cancelBtn}>
                    <Button onClick={handleWeightageClose} types="close">
                      Cancel
                    </Button>
                  </Flex>
                  <Flex>
                    {isnextLoader ? (
                      <Flex className={styles.updateBtnLoader}>
                        <Loader size="small" withOutOverlay />
                      </Flex>
                    ) : (
                      <Button
                        // disabled={
                        //   totaltechnical !== 100 &&
                        //   totalnontechnical !== 0 &&
                        //   totalnontechnical > 100
                        // }
                        // disabled={(totaltechnical !== 100) && (totalnontechnical !== 100 && totalnontechnical !== 0)}
                        disabled={
                          totaltechnical === 100
                            ? totalnontechnical === 0 ||
                              totalnontechnical === 100
                              ? false
                              : true
                            : true
                        }
                        types="primary"
                        onClick={nextfunction}
                      >
                        Apply
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Modal>
          <ApplicantPipeLineFilter
            setchange={setchange}
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
            Matching={Matching}
            total={total_applicants}
            moveDisabled={getIsMultiMoveDisabled()}
            filterTotalFav={filterTotalFav}
            isTotalFav={isTotalFav}
            seletedCardsLength={cardSelection.size}
            onExport={handleBulkDownload}
            onMove={handleMove}
            onCSVDownload={handleCSVDownload}
            onComparative={onComparative}
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
      {aimodel && (
        <ComparativeModal
          Comparmodel={Comparmodel}
          updatemodel={updatemodel}
          Matching={Matching}
          job_details={job_details}
          select_candidate={select_candidate}
        />
      )}
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
