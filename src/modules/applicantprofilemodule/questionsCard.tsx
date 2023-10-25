import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import SvgAdd from '../../icons/SvgAdd';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgRegenerateQuestion from '../../icons/SvgRegenerate';
import SvgTickBox from '../../icons/SvgTickBox';
import { Button, Flex, InputCheckBox, Loader } from '../../uikit';
import InputText from '../../uikit/InputText';
import Text from '../../uikit/Text/Text';
import { AppDispatch } from '../../store';
import {
  GenerateQuestionsState,
  InterviewExtractData,
  Question,
} from './interviewerQuestionType';
import styles from './screeningstatustab.module.css';
import {
  evaluateQuestionMiddleware,
  interviewQuestionMiddleware,
} from './store/middleware/interviewquestionMiddleware';
const cx = classNames.bind(styles);

interface Props {
  interviews: InterviewExtractData;
  onEvaluate: (id: string, value: Question[]) => void;
  jd_id: string;
  can_id: string;
  genearate: GenerateQuestionsState;
}

const QuestionCard: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();

  const { interviews, onEvaluate, jd_id, can_id, genearate } = props;
  const [addQuestion, setaddQuestione] = useState(false);
  const [isQuestionLoader, setQuestionLoader] = useState(false);
  const [form, setForm] = useState<{ question: string }>({ question: '' });
  const [questions, setQuestions] = useState<{ [key: string]: Question }>({});

  useEffect(() => {
    if (interviews && interviews.questions) {
      setQuestions(
        interviews.questions.reduce((o, v) => ({ ...o, [v.id]: v }), {}),
      );
    }
  }, [JSON.stringify(interviews.questions)]);

  const toggleStage = () => {
    setaddQuestione(!addQuestion);
    // formik.setFieldValue('title', '');
    // formik.resetForm();
  };

  const handleQuestionChange = (e) => {
    setForm((prev) => ({ ...prev, question: e?.target?.value }));
  };

  const handleSelectedQuestion = (value: Question) => {
    setQuestions((prev) => {
      return {
        ...prev,
        [value.id]: { ...prev[value.id], is_active: !prev[value.id].is_active },
      };
    });
  };

  const getCheckedQuestions = () =>
    Object.keys(questions)
      .map((key) => questions[key])
      .filter((doc) => doc.is_active || false) || [];

  const getExcludeID = () =>
    Object.keys(questions)
      .map((key) => questions[key])
      .filter((doc) => {
        console.log(doc, 'heelooo');
        return doc.is_active || false;
      })
      .map((doc) => doc.id) || [];

  const addNewQuestion = () => {
    if (interviews?.data && form.question !== '') {
      dispatch(
        evaluateQuestionMiddleware({
          jd_id,
          can_id,
          interview_id: JSON.stringify(interviews?.data?.id),
          scorecard: JSON.stringify([{ id: 0, question: form.question }]),
        }),
      ).then((data: any) => {
        if (data?.success && data?.success !== false) {
          setForm((prev) => ({ ...prev, question: '' }));
        }
      });
    }
  };

  const generateQuestions = () => {
    if (interviews?.data) {
      dispatch(
        interviewQuestionMiddleware({
          jd_id,
          can_id,
          re_generate: 'true',
          interview_id: JSON.stringify(interviews?.data?.id),
          exclude: JSON.stringify(getCheckedQuestions()),
        }),
      );
    }
  };

  const renderEmptyBloc = () => {
    if (
      genearate?.interviewId === interviews.data?.id &&
      genearate?.isLoading
    ) {
      return (
        <Flex center middle style={{ padding: 20 }}>
          {/* <span>{'Loading...'}</span> */}
          <Loader withOutOverlay size={'small'} />
        </Flex>
      );
    }
    return (
      <Flex>
        <Text
          size={13}
          style={{
            justifyContent: 'center',
            display: 'flex',
            margin: '10px 0px',
          }}
        >
          You must add or generate questions to evaluate the scorecard
        </Text>
        <Flex row center middle marginBottom={10}>
          <Button
            types="secondary"
            onClick={() => {}}
            style={{ marginRight: '10px' }}
          >
            Add Question
          </Button>
          <Button onClick={generateQuestions}>Generate Questions</Button>
        </Flex>
      </Flex>
    );
  };

  const renderQuestions = () => {
    if (
      genearate?.interviewId === interviews.data?.id &&
      genearate?.isLoading
    ) {
      return (
        <Flex center middle style={{ padding: 20 }}>
          {/* <span>{'Loading...'}</span> */}
          <Loader withOutOverlay size={'small'} />
        </Flex>
      );
    }
    const list = Object.keys(questions).map((key) => questions[key]) || [];
    return (
      <Flex>
        {list &&
          list?.length > 0 &&
          list?.map((doc, index) => {
            return (
              <Flex row top marginTop={10} key={index}>
                <InputCheckBox
                  className={styles.x}
                  checked={doc.is_active || false}
                  onClick={() => handleSelectedQuestion(doc)}
                />
                <Flex width={'100%'}>
                  <Text style={{ marginLeft: '7px' }}>{doc.question}</Text>
                  <Flex
                    style={{
                      margin: '3px',
                      border: '0.3px solid #c3c3c350',
                    }}
                  ></Flex>
                </Flex>
              </Flex>
            );
          })}
      </Flex>
    );
  };

  if (interviews.questions.length !== 0) {
    return (
      <>
        <Flex>
          <Flex row between marginTop={10}>
            <Text color="theme">{`${interviews.data?.event_type} / ${moment(
              interviews.data?.s_time,
            ).format('MMM DD yyyy / HH:mm a - ')} ${moment(
              interviews.data?.e_time,
            ).format(' HH:mm a')} `}</Text>
          </Flex>
          <Flex>{renderEmptyBloc()}</Flex>
          <Flex
            style={{
              margin: '10px 0px',
              borderBottom: '1px solid #584518',
            }}
          ></Flex>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Flex>
        <Flex row between marginTop={10}>
          <Text color="theme">{`${interviews.data?.event_type} / ${moment(
            interviews.data?.s_time,
          ).format('MMM DD yyyy / HH:mm a - ')} ${moment(
            interviews.data?.e_time,
          ).format(' HH:mm a')} `}</Text>
          <Text title="Regenerate Question" style={{ cursor: 'pointer' }}>
            <SvgRegenerateQuestion onClick={generateQuestions} />
          </Text>
        </Flex>
        {renderQuestions()}

        <Flex row between marginTop={10}>
          {addQuestion === false ? (
            <Flex onClick={() => toggleStage()} className={styles.addButton}>
              <Flex row center>
                <SvgAdd width={10} height={10} fill="#581845" />
                <Text
                  bold
                  size={13}
                  color="theme"
                  style={{
                    cursor: 'pointer',
                    marginLeft: '5px',
                    marginTop: '2px',
                  }}
                >
                  Add Question
                </Text>
              </Flex>
            </Flex>
          ) : (
            <Flex row noWrap>
              <Flex column noWrap>
                <InputText
                  name="add question"
                  value={form.question}
                  onChange={handleQuestionChange}
                  lineInput
                  size={14}
                  className={styles.input}
                  // onKeyPress={handleKeyPress}
                  // onBlur={formik.handleBlur}
                />
                {/* <ErrorMessage
                    touched={formik.touched}
                    errors={formik.errors}
                    name="title"
                  /> */}
              </Flex>
              <div className={styles.svgContainer}>
                {isQuestionLoader ? (
                  <div className={styles.svgTick}>
                    <Loader withOutOverlay size={'small'} />
                  </div>
                ) : (
                  <div
                    className={cx('svgTickMargin', {
                      svgTickDisable: form.question === '',
                      tickStyle: false,
                    })}
                    //  onClick={handleLocationSubmit}
                    tabIndex={-1}
                    role={'button'}
                    onClick={addNewQuestion}
                  >
                    <SvgTickBox className={styles.tickStyle} />
                  </div>
                )}

                <div
                  className={styles.svgClose}
                  onClick={toggleStage}
                  tabIndex={-1}
                  role={'button'}
                  // onClick={() => formik.resetForm()}
                >
                  <SvgCloseBox className={styles.tickStyle} />
                </div>
              </div>
            </Flex>
          )}
          {getCheckedQuestions()?.length !== 0 && (
            <Button
              onClick={() => {
                onEvaluate(
                  JSON.stringify(interviews?.data?.id),
                  getCheckedQuestions(),
                );
              }}
              types={'primary'}
            >
              Evaluate
            </Button>
          )}
        </Flex>

        <Flex
          style={{
            margin: '10px 0px',
            borderBottom: '1px solid #584518',
          }}
        ></Flex>
      </Flex>
    </>
  );
};

export default QuestionCard;