import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import StepProgressBar from '../../uikit/StepProgressBar/StepProgressBar';
import SvgTick from '../../icons/SvgTick';
import Loader from '../../uikit/Loader/Loader';
import { copyToClipboard, isEmpty } from '../../uikit/helper';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import { routesPath } from '../../routes/routesPath';
import SvgCopy from '../../icons/SvgCopy';
import { PRIMARY, SUCCESS } from '../../uikit/Colors/colors';
import { jdMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import PreviewTitle from './PreviewTitle';
import {
  dsOrNonDsGetdMiddleWare,
  jdPreviewMiddleWare,
  jdProfileMiddleWares,
  postJdMiddleWare,
  questionnaireForJdMiddleWare,
  selectDsorNonDsMiddleWare,
  whatjobsMiddleWare,
} from './store/middleware/createjdmiddleware';
import styles from './jdpreviewscreen.module.css';
import ApplicantQuestionnaireResult from './ApplicantQuestionnaireResult';
import StandardJobPosting from './StandardJobPosting';
type ParamsType = {
  jdId: string;
};

const JdPreviewScreen = () => {
  const { jdId } = useParams<ParamsType>();
  const [isOpen, setOpen] = useState(false);
  const [extarajobpost,setextarajobpost] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  // initial api call
  useEffect(() => {
    dispatch(jdPreviewMiddleWare({ jd_id: jdId }));
    dispatch(questionnaireForJdMiddleWare({ jd_id: jdId }));
    dispatch(dsOrNonDsGetdMiddleWare({ jd_id: jdId }));
    dispatch(selectDsorNonDsMiddleWare());
   
  }, []);

  const {
    profile,
    jdDetails,
    qualification,
    location,
    skills,
    questionnaire_for_jd,
    ds_role,
    company_detail,
    url,
    postLoader,
    feature,
    career_page_url,
    is_plan, 
    super_user
  } = useSelector(
    ({
      jdPreviewReducers,
      questionnaireForJdReducers,
      dsOrNonDsGetReducers,
      postReducers,
      selectDsorNonDsReducers,
      permissionReducers,
    }: RootState) => {
      return {
        jdDetails: jdPreviewReducers.jd,
        profile: jdPreviewReducers.profile,
        qualification: jdPreviewReducers.qualification,
        location: jdPreviewReducers.location,
        skills: jdPreviewReducers.skills,
        questionnaire_for_jd: questionnaireForJdReducers.questionnaire_for_jd,
        ds_role: dsOrNonDsGetReducers.ds_role,
        company_detail: jdPreviewReducers.company_detail,
        url: postReducers.url,
        postLoader: postReducers.isLoading,
        feature: selectDsorNonDsReducers.feature,
        career_page_url: jdPreviewReducers.career_page_url,
        is_plan: permissionReducers.is_plan,
        super_user: permissionReducers.super_user,
      };
    },

  ); 

  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });
const whatjob =(values) =>{
  setextarajobpost(values)
 
}
  // publish form submit
  
  
  const hanldePulish = () => {
    const formData = new FormData();
  formData.append('jd_id', jdId )
    if (isEmpty(career_page_url)) {
      if (isEmpty(company_detail.no_of_emp)) {
        sessionStorage.setItem('superUserTab', '1');
      } else {
        sessionStorage.setItem('superUserTab', '0');
      }
      history.push('/account_setting/settings');
    }

    else if(extarajobpost === 0) {
      dispatch(whatjobsMiddleWare({formData})); 

      dispatch(postJdMiddleWare({ jd_id: jdId})).then((res) => {

        if (res.payload.success) {
          setOpen(true);
          dispatch(jdMatchMiddleWare({ jd_id:jdId})) 
        }
      });
    }
   
    else if (extarajobpost === 1) { 

      dispatch(postJdMiddleWare({ jd_id: jdId })).then((res) => {
        if (res.payload.success) {
          setOpen(true);
          dispatch(jdMatchMiddleWare({ jd_id:jdId})) 
        }
      });
    }
  };
console.log("externaljob",extarajobpost)
  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 111}
    >
      {postLoader && <Loader />}
      <Flex row center className={styles.step} >
        <StepProgressBar titleclassName={styles.stepOne} roundFill barFilled />
        <StepProgressBar
          title="Applicant Questionnaire"
          titleclassName={styles.stepTwo}
          stepIndex="2"
          roundFill
          barFilled
        />
        <Flex columnFlex className={styles.step3Flex}>
          <div className={styles.round}>
            <Text bold size={16} color={'white'}>
              {3}
            </Text>
          </div>
          <Text bold className={styles.stepThree}>
            Preview & Post Job
          </Text>
        </Flex>
      </Flex>
      <Modal open={isOpen}>
        <Flex columnFlex className={styles.modalOverAll}>
          <Flex row center middle>
            <div style={{ marginRight: 8 }}>
              <SvgTick fill={SUCCESS} /> 
            </div>
            
            <Text>You have successfully posted the job</Text>
            <div
              tabIndex={-1}
              role={'button'}
              style={{ marginLeft: 8, cursor: 'pointer' }}
              onClick={() => copyToClipboard(url, 'Link Copied')}
              onKeyDown={() => {}}
              title="Copy the job posting URL from your careers page"
            >
            <SvgCopy width={12} height={14} fill={'#581845'} /> 
            </div>
          </Flex>
          <Text align="center" style={{ marginTop: 8 }}>
            Please{' '}
            <LinkWrapper
              to={routesPath.MY_JOB_POSTING}
              onClick={() => setOpen(false)}
            >
              <Text color="link" underLine bold>
                click here
              </Text>
            </LinkWrapper>{' '}
            to manage your jobs.
          </Text>
        </Flex>
      </Modal>
      <PreviewTitle
        jdDetails={jdDetails}
        profile={profile}
        location={location}
        qualification={qualification}
        skills={skills}
      />
      <ApplicantQuestionnaireResult
        data={questionnaire_for_jd}
        jdDetails={jdDetails}
        company_detail={company_detail}
      />
      <StandardJobPosting
        jdId={jdId}
        hanldePulish={hanldePulish}
        ds_role={ds_role}
        feature={feature} 
        whatjob={whatjob}
        super_user={super_user}
        postLoader={postLoader}
      />
    </Flex>
  );
};
export default JdPreviewScreen;
