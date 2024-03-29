import { useFormik } from 'formik';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import SvgAdd from '../../icons/SvgAdd';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgRegenerateQuestion from '../../icons/SvgRegenerate';
import SvgTickBox from '../../icons/SvgTickBox';
import { Button, Flex, InputCheckBox, Loader, Toast } from '../../uikit';
import InputText from '../../uikit/InputText';
import Text from '../../uikit/Text/Text';
import { AppDispatch, RootState } from '../../store';
import { isEmpty } from '../../uikit/helper';
import { formatTo12HrClock } from '../calendarModule/util';
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
  interviews?: InterviewExtractData;
  onEvaluate?: (id: number, value: Question[]) => void;
  jd_id?: string;
  can_id?: string;
  genearate?: GenerateQuestionsState;
  no_of_interview?: any;
  lengthval?: any;
  indexval?: any;
  setregeneratequestion?: (val: boolean) => void;
  setgeneratequestion?: (val: boolean) => void;
  setAddquestion?: (val: boolean) => void;
  interviewData?: any;

}

const QuestionCard: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();

  const {
    interviews,
    onEvaluate,
    interviewData,
    jd_id,
    can_id,
    genearate,
    no_of_interview,
    lengthval,
    indexval,
    setregeneratequestion,
    setgeneratequestion,
    setAddquestion
  } = props;
  const [addQuestion, setaddQuestion] = useState(false);
  const [newAddQuestion, setNewAddQuestion] = useState(false);
  const [isQuestionLoader, setQuestionLoader] = useState(false);
  const [form, setForm] = useState<{ question: string }>({ question: '' });
  const [questions, setQuestions] = useState<{ [key: string]: Question }>({});

  // useEffect(() => {
  //   if (interviews && interviews.questions) {
  //     setQuestions(
  //       interviews.questions.reduce((o, v) => ({ ...o, [v.id]: v }), {}),
  //     );
  //   }
  // }, [JSON.stringify(interviews.questions)]);

  const toggleStage = () => {
    setAddquestion(true)
  };
  const toggleAddQuestion = () => {
    setAddquestion(true)
    // setNewAddQuestion(!newAddQuestion);
    setQuestionLoader(false);
    // formik.resetForm();
  };

  type FormProps = {
    add_question: string;
  };
  const initial: FormProps = {
    add_question: '',
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => { },
  });

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

  const generateQuestions = () => {
    setgeneratequestion(true)
    // if (interviews?.data) {
    //   dispatch(
    //     interviewQuestionMiddleware({
    //       jd_id,
    //       can_id,
    //       re_generate:[],
    //       interview_id: JSON.stringify(interviews?.data?.id),
    //       // exclude: JSON.stringify(getCheckedQuestions()),
    //     }),
    //   ).then(() => {
    //     Toast('Interview questions generated sucessfully.');
    //   });
    // }
  };

  const regenerateQuestions = () => {
    setregeneratequestion(true)
    // if (interviews?.data) {
    //   dispatch(
    //     interviewQuestionMiddleware({
    //       jd_id,
    //       can_id,
    //       re_generate:[],
    //       interview_id: JSON.stringify(interviews?.data?.id),
    //       exclude: JSON.stringify(getExcludeID()),
    //     }),
    //   ).then(() => {
    //     Toast('Interview questions regenerated successfully.');
    //   });
    // }
  };
  // const addNewQuestion = () => {
  //   if (interviews?.data) {
  //     setQuestionLoader(true);
  //     dispatch(
  //       evaluateQuestionMiddleware({
  //         jd_id,
  //         can_id,
  //         interview_id: JSON.stringify(interviews?.data?.id),
  //         scorecard: JSON.stringify([
  //           { id: 0, question: formik.values.add_question },
  //         ]),
  //       }),
  //     ).then((res) => {
  //       if (res.payload.success === true) {
  //         Toast('Question added successfully');
  //         formik.resetForm();
  //         setQuestionLoader(false);
  //         setaddQuestion(false);
  //       }
  //     });
  //   }
  // };

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
          {newAddQuestion === false &&
            <Flex>
              <Button
                types="secondary"
                onClick={() => toggleAddQuestion()}
                style={{ marginRight: '10px' }}
              >
                Add Question
              </Button>
            </Flex>
            // ) 
            // : (
            //   <Flex row noWrap style={{ width: '80%' }}>
            //     <Flex column noWrap style={{ width: '100%' }}>
            //       <InputText
            //         name="add question"
            //         value={form.question}
            //         onChange={handleQuestionChange}
            //         lineInput
            //         size={14}
            //         className={styles.input}
            //       />
            //     </Flex>
            //     <div
            //       className={styles.svgContainer}
            //       style={{ marginRight: '10px' }}
            //     >
            //       {isQuestionLoader ? (
            //         <div className={styles.svgTick}>
            //           <Loader withOutOverlay size={'small'} />
            //         </div>
            //       ) : (
            //         <div
            //           className={cx('svgTickMargin', {
            //             svgTickDisable: isEmpty(
            //               formik.values.add_question.trim(),
            //             ),
            //             tickStyle: !isEmpty(formik.values.add_question.trim()),
            //           })}
            //           //  onClick={handleLocationSubmit}
            //           tabIndex={-1}
            //           role={'button'}
            //           onClick={addNewQuestion}
            //         >
            //           <SvgTickBox className={styles.tickStyle} />
            //         </div>
            //       )}

            //       <div
            //         className={styles.svgClose}
            //         onClick={toggleAddQuestion}
            //         tabIndex={-1}
            //         role={'button'}
            //         // onClick={() => formik.resetForm()}
            //       >
            //         <SvgCloseBox className={styles.tickStyle} />
            //       </div>
            //     </div>
            //   </Flex>
            // )
          }

          <Button onClick={generateQuestions}>Generate Questions</Button>
        </Flex>
      </Flex>
    );
  };

  const renderQuestions = () => {
    return (
      <Flex>
        {/* {list &&
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
                      border:
                        list.length - 1 === index
                          ? ''
                          : '0.3px solid #c3c3c350',
                    }}
                  ></Flex>
                </Flex>
              </Flex>
            );
          })} */}
      </Flex>
    );
  };
  const s_time = new Date(interviews.data.s_time);
  const dateString = s_time.toDateString();

  if (!interviews?.questions) {
    return (
      <>
        <Flex>
          <Flex row between marginTop={10}>
            <Text color="theme">{`${interviews.data?.event_type
              } / ${dateString} / ${formatTo12HrClock(
                interviews.data?.s_time,
              )}  ${formatTo12HrClock(interviews.data?.e_time)}`}</Text>
          </Flex>
          <Flex>
            {Array.isArray(interviewData) && interviewData.map((val, index1) => (
              <div key={index1}>
                {console.log(val, 'ffffffff')}
                {val?.Behavioral?.Array?.map((value, ind) => (
                  <div key={ind} className={styles.cardview}>
                    <div>
                      <span style={{ textTransform: "capitalize" }}>{value.id}</span>
                      {value?.question?.map((label, idx) => (
                        <div key={idx}>
                          {console.log("youuuuuuuuuuu", label)}
                          <span style={{ textTransform: "capitalize" }}>{label.question}</span>
                          {label?.Map_question?.map((ques, i) => (
                            <div key={i}>
                              <div style={{ margin: '0 5px 0 0' }}>
                                <InputCheckBox
                                // checked={isQuestionCheckedval(ques.id)}
                                // onChange={(e) => handleCheck(ques.id, e.target.checked)}
                                />
                              </div>
                              <span>{ques.question}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}</Flex>
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
          <Flex row center between>
            {no_of_interview[0].evaluate !== true && (
              <Flex marginRight={15}>
                <Text title="Regenerate Question" style={{ cursor: 'pointer' }}>
                  <SvgRegenerateQuestion onClick={regenerateQuestions} />
                </Text>
              </Flex>
            )}
            <Flex marginRight={15}>
              <Text title="Add Question" style={{ cursor: 'pointer' }}>
                <SvgRegenerateQuestion onClick={() => toggleStage()} />
              </Text>
            </Flex>
            <Flex>
              {getCheckedQuestions()?.length !== 0 && (
                <Button
                  onClick={() => {
                    onEvaluate(interviews?.data?.id, getCheckedQuestions());
                  }}
                  types={'primary'}
                >
                  Evaluate
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
        {renderQuestions()}

        {/* {no_of_interview[0].evaluate !== true && (
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
              <Flex row noWrap style={{ width: '80%' }}>
                <Flex column noWrap style={{ width: '100%' }}>
                  <InputText
                    name="add question"
                    value={formik.values.add_question}
                    onChange={(e) =>
                      formik.setFieldValue('add_question', e.target.value)
                    }
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
                  />  
                </Flex>
                <div className={styles.svgContainer}>
                  {isQuestionLoader ? (
                    <div className={styles.svgTick}>
                      <Loader withOutOverlay size={'small'} />
                    </div>
                  ) : (
                    <div
                      className={cx('svgTickMargin', {
                        svgTickDisable: isEmpty(
                          formik.values.add_question.trim(),
                        ),
                        tickStyle: !isEmpty(formik.values.add_question.trim()),
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
            )
            } 

          </Flex>
        )}*/}

        <Flex
          style={{
            margin: '10px 0px',
            borderBottom: lengthval === indexval ? '' : '1px solid #584518',
          }}
        ></Flex>
        {console.log(lengthval, indexval, "valuee")}
      </Flex>
    </>
  );
};

export default QuestionCard;
