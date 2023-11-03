import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import {
  Button,
  ErrorMessage,
  InputCheckBox,
  InputRadio,
  InputText,
  Loader,
  Modal,
} from '../../uikit';
import { AppDispatch, RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { userProfileMiddleWare } from '../accountsettingsmodule/userprofilemodule/store/middleware/userprofilemiddleware';

import InterviewScorecardTab from './InterviewScorecardTab';
import styles from './screeningstatustab.module.css';
import { hireList } from './mock';
import { interviewQuestionMiddleware } from './store/middleware/interviewquestionMiddleware';
import QuestionCard from './questionsCard';

import { Question } from './interviewerQuestionType';

const cx = classNames.bind(styles);

// export interface QuestionForm {
//   question: string;
// }

type Props = {
  title?: string;
  issingletab?: boolean;
  jd_id?: string;
  can_id?: string;
};
const ScreeningStatusTab = ({ title, issingletab, jd_id, can_id }: Props) => {
  // const form: QuestionForm = { question: '' };
  const dispatch: AppDispatch = useDispatch();
  const [addQuestion, setaddQuestione] = useState(false);
  const [isPostLoader, setPostLoader] = useState(false);
  const [evaluatePopup, setEvaluatePopup] = useState<{
    open: boolean;
    data: Question[];
  } | null>(null);
  const [isQuestionLoader, setQuestionLoader] = useState(false);
  console.log(jd_id, can_id);
  useEffect(() => {
    if (jd_id && can_id) {
      dispatch(interviewQuestionMiddleware({ jd_id, can_id }));
    }
  }, [jd_id, can_id]);
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
        question_loading: interviewerQuestionReducers.isLoading,
        question_error: interviewerQuestionReducers.error,
      };
    },
  );
  const toggleStage = () => {
    setaddQuestione(!addQuestion);
    // formik.setFieldValue('title', '');
    // formik.resetForm();
  };
  // const formik = useForm<QuestionForm>({
  //   // initialValues: form,
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

  return (
    <Flex row flex={12}>
      <Flex
        flex={6}
        columnFlex
        className={styles.overAll}
        height={window.innerHeight - 120}
      >
        <Text bold color="theme" className={styles.screenText}>
          {/* {title} */}
          Interview Questions
        </Text>
        <Text>
          You can select, deselect, regenerate, and add questions for the
          applicant.
        </Text>

        <QuestionCard
          interviews={interviews}
          onEvaluate={(value) => {
            setEvaluatePopup({ open: true, data: value });
          }}
        />
      </Flex>
      {evaluatePopup && (
        <Modal open={evaluatePopup?.open}>
          <Flex className={styles.overAll}>
            <Text size={14} bold className={styles.insertStyles}>
              Evaluate Scorecard
            </Text>
            <Flex
              style={{
                overflow: 'scroll',
                maxHeight: '500px',
                padding: '0px 5px',
              }}
            >
              <Text color="theme">
                {`Hey ${user?.first_name} ${user?.last_name}, can you evaluate ${candidate_details[0]?.first_name} based on the interview? *`}
              </Text>
              {evaluatePopup.data.length > 0 &&
                evaluatePopup.data.map((doc, index) => {
                  return (
                    <Flex row top marginTop={15} key={index}>
                      <Text style={{ marginLeft: '5px' }}>{`${index + 1}. ${doc.question
                        }`}</Text>
                    </Flex>
                  );
                })}

              <Text color="theme" style={{ marginBottom: '5px' }}>
                Recommended to Hire *
              </Text>
              <Flex row>
                {hireList.map((doc) => {
                  return (
                    <Flex
                      key={doc.value}
                      style={{ margin: '0  20px  10px 0 ' }}
                    >
                      <InputRadio label={doc.label} />
                    </Flex>
                  );
                })}
              </Flex>
              <Flex marginTop={5}>
                <Text color="theme" style={{ marginBottom: '5px' }}>
                  Comments/Feedback *
                </Text>
                <Flex
                  // height={window.innerHeight - 260}
                  style={{ overflowY: 'scroll', display: 'flex' }}
                >
                  <Flex className={styles.textArea}>
                    <ReactQuill
                      value={''}
                      className={styles.reactquillchange}
                      onChange={() => { }}
                      placeholder="Add your feedback here"
                    />
                    {/* <ErrorMessage
                    touched={formik.touched}
                    errors={formik.errors}
                    name="userMessage"
                  /> */}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              row
              end
              marginTop={5}
              style={{ borderTop: '1px solid #c3c3c3' }}
            >
              <Button
                className={styles.cancel}
                types={'primary'}
                onClick={handleCancel}
                style={{ marginTop: '10px' }}
              >
                Cancel
              </Button>

              <Button
                className={styles.addBtn}
                onClick={() => { }}
                style={{ marginTop: '10px' }}
              >
                Add
              </Button>
            </Flex>
          </Flex>
        </Modal>
      )}

      {!issingletab && (
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
      )}
      {!issingletab && (
        <Flex flex={6.4}>
          <InterviewScorecardTab />
        </Flex>
      )}
    </Flex>
  );
};

export default ScreeningStatusTab;
