import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import StarsRating from 'react-star-rate';
import { useForm } from 'react-hook-form';
import {
  Button,
  ErrorMessage,
  InputCheckBox,
  InputRadio,
  InputText,
  Loader,
  Modal,
  StarRating,
} from '../../uikit';
import { AppDispatch, RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { userProfileMiddleWare } from '../accountsettingsmodule/userprofilemodule/store/middleware/userprofilemiddleware';
import InterviewQustioncard from './InterviewQuestioncard';
import InterviewScorecardTab from './InterviewScorecardTab';
import styles from './screeningstatustab.module.css';
import { hireList } from './mock';
import {
  evaluateQuestionMiddleware,
  interviewQuestionMiddleware,
} from './store/middleware/interviewquestionMiddleware';
import QuestionCard from './questionsCard';

import { EvaluateInterviewInput, Question } from './interviewerQuestionType';
import EvaluateModal from './EvaluateModal';
import Interviewmodalpopup from './InterviewModalpopup';

const cx = classNames.bind(styles);

type Props = {
  title: string;
  issingletab: boolean;
  jd_id: string;
  can_id: string;
  interview_id: string;
};
const ScreeningStatusTab = ({
  title,
  issingletab,
  jd_id,
  can_id,
  interview_id,
}: Props) => {
  // const form: QuestionForm = { question: '' };
  const dispatch: AppDispatch = useDispatch();
  const [addQuestion, setaddQuestion] = useState(false);
  const [isPostLoader, setPostLoader] = useState(false);
  const [isaddqustion, setAddquestion] = useState(false);
  const [isgeneratequestion, setgeneratequestion] = useState(false);
  const [isregeneratequestion, setregeneratequestion] = useState(false);
  const [generatedquestion, setgeneratedquestion] = useState<any>([])
  const [evaluatePopup, setEvaluatePopup] = useState<{
    open: boolean;
    data: Question[];
    interview_id: number;
  } | null>(null);
  const [isQuestionLoader, setQuestionLoader] = useState(false);

  useEffect(() => {
    dispatch(userProfileMiddleWare());
  }, []);
  const {
    stages,
    invite,
    user,
    candidate_details,
    questions,
    question_loading,
    question_error,
    interviews,
    no_of_interview,
    interviewData,
    genearate,
  } = useSelector(
    ({
      applicantStausReducers,
      userProfileReducers,
      applicantProfileInitalReducers,
      interviewerQuestionReducers,
    }: RootState) => {
      return {
        stages: applicantStausReducers?.stages,
        invite: applicantStausReducers?.invite,
        user: userProfileReducers.user,
        candidate_details: applicantProfileInitalReducers.candidate_details,
        questions: interviewerQuestionReducers.data,
        interviews: interviewerQuestionReducers.interviews,
        no_of_interview: interviewerQuestionReducers.no_of_interview,
        question_loading: interviewerQuestionReducers.isLoading,
        question_error: interviewerQuestionReducers.error,
        genearate: interviewerQuestionReducers?.generateQuestionsState,
        interviewData: interviewerQuestionReducers.data,
      };
    },
  );

  useEffect(() => {
    setgeneratedquestion(interviewData)
  }, [interviewData])
  const toggleStage = () => {
    setaddQuestion(!addQuestion);
    // formik.setFieldValue('title', '');
    // formik.resetForm();
  };
  // const formik = useForm<EvaluateInterviewInput>({
  //   initialValues: { id: undefined,  },
  //   // initialValidation: true,
  //   // onSubmit: () => {
  //   //   toggleStage();
  //   //   formik.resetForm();
  //   // },
  // });

  // const handleKeyPress = (event: { key: string }) => {
  //   if (event.key === 'Enter') {
  //     formik.handleSubmit();
  //   }
  // };
  const handleCancel = () => {
    setEvaluatePopup(null);
  };

  const handleEvaluateInterview = () => {
    dispatch(
      evaluateQuestionMiddleware({
        jd_id,
        can_id,
        scorecard : JSON.stringify([]),
        interview_id,
        commands: '',
        recommend: 0,
      }),
    ).then(() => {
      setEvaluatePopup(null);
    });
  };
  const getNumberOfInterviews = (key) => {
    return no_of_interview?.filter((interview) => interview.id === Number(key));
  };

  function AddnewQuestion(formvalue){
    setAddquestion(false)
    const addnewquestion = []
    formvalue.levellist.map((value,index)=>{
        const ques = {"id":"0","question":value.levelvalue.question,"type":value.levelvalue.questiontype,"level":value.levelvalue.difficulty}
        addnewquestion.push(ques)
    })
    alert(interview_id)   
    dispatch(evaluateQuestionMiddleware({
      jd_id:jd_id,
      can_id:can_id,
      scorecard : JSON.stringify(addnewquestion),
      interview_id:interview_id,
      role: formvalue.role
    }))   
  }

  console.log(isaddqustion, 'isregeneratequestionisregeneratequestionisregeneratequestion')
  return (
    <Flex row flex={12}>
      <Interviewmodalpopup
        isregeneratequestion={isregeneratequestion}
        isgeneratequestion={isgeneratequestion}
        isaddqustion={isaddqustion}
        setregeneratequestion={setregeneratequestion}
        setgeneratequestion={setgeneratequestion}
        setAddquestion={setAddquestion}
        AddnewQuestion ={AddnewQuestion}
      />
      <Flex flex={6} style={{ padding: '10px 0 10px 10px' }}>
        <Text bold className={styles.screenText}>
          Interview Questions
        </Text>
        <Text>
          You can select, deselect, regenerate, and add questions for the
          applicant.
        </Text>
        <Flex
          columnFlex
          className={styles.overAllPopup}
          height={window.innerHeight - 155}
        >

          {/* {Object.keys(interviews).map((key, i) => {
            return (
              <QuestionCard
                key={i}
                jd_id={jd_id}
                can_id={can_id}
                interviews={interviews[key]}
                genearate={genearate}
                no_of_interview={getNumberOfInterviews(key)}
                onEvaluate={(id, value) => {
                  setEvaluatePopup({
                    open: true,
                    data: value,
                    interview_id: id,
                  });
                }}
                lengthval={Object?.keys(interviews)?.length}
                indexval={i + 1}
              />
            );
          })} */}
          <InterviewQustioncard
            interviewData={generatedquestion}
            setregeneratequestion={setregeneratequestion}
            setgeneratequestion={setgeneratequestion}
            setAddquestion={setAddquestion}
            onEvaluate={(id, value) => {
              setEvaluatePopup({
                open: true,
                data: value,
                interview_id: id,
              });
            }}
          />
        </Flex>
      </Flex >
      {evaluatePopup && (
        <EvaluateModal
          {...{ ...evaluatePopup, jd_id, can_id }}
          user={user}
          candidateDetails={candidate_details}
          onCancel={handleCancel}
        // commands={
        //   interviews[evaluatePopup.interview_id]?.cumulative?.find(
        //     (doc) => doc.interview_id === evaluatePopup.interview_id,
        //   )?.commands || null
        // }
        // recommend={
        //   interviews[evaluatePopup.interview_id]?.scorecard?.recommend || null
        // }
        />
      )}

      {
        !issingletab && (
          <Flex
            height={window.innerHeight - 115}
            style={{
              border: '0.5px solid #C3C3C3',
              width: '0.5px',
              margin: '15px 5px 10px 5px',
              paddingTop: '10px',
              paddingBottom: '10px',
            }}
          ></Flex>
        )
      }
      {
        !issingletab && (
          <Flex flex={6} style={{ padding: '10px 0 10px 10px' }}>
            <InterviewScorecardTab
              onEvaluate={(id, value) => {
                setEvaluatePopup({
                  open: true,
                  data: value,
                  interview_id: id,
                });
              }}
            />
          </Flex>
        )
      }
    </Flex >
  );
};

export default ScreeningStatusTab;
