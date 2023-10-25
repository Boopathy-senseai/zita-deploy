import classNames from 'classnames/bind';
import { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import SvgAdd from '../../icons/SvgAdd';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgRegenerateQuestion from '../../icons/SvgRegenerate';
import SvgTickBox from '../../icons/SvgTickBox';
import { Button, Flex, InputCheckBox, InputText, Loader } from '../../uikit';
import Text from '../../uikit/Text/Text';
import { AppDispatch } from '../../store';
import {
  CumulativeData,
  NoOfInterview,
  Question,
} from './interviewerQuestionType';
import styles from './screeningstatustab.module.css';
import { interviewQuestionMiddleware } from './store/middleware/interviewquestionMiddleware';
const cx = classNames.bind(styles);

interface Props {
  interviews: {
    questions: Question[];
    data: NoOfInterview;
    cumulative: CumulativeData[];
  };
  onEvaluate: (value: Question[]) => void;
  jd_id: string;
  can_id: string;
}

const QuestionCard: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();

  const { interviews, onEvaluate, jd_id, can_id } = props;
  const [addQuestion, setaddQuestione] = useState(false);
  const [isQuestionLoader, setQuestionLoader] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const toggleStage = () => {
    setaddQuestione(!addQuestion);
    // formik.setFieldValue('title', '');
    // formik.resetForm();
  };

  const handleSelectedQuestion = (value: Question) => {
    setSelectedQuestions((prev) => {
      const newArr = [...prev];
      const i = newArr.findIndex((doc) => doc.id === value.id);
      if (i !== -1) {
        newArr.splice(i, 1);
        return newArr;
      }
      return [...newArr, value];
    });
  };

  const generateQuestions = () => {
    dispatch(
      interviewQuestionMiddleware({
        jd_id,
        can_id,
        re_generate: 'true',
        interview_id: JSON.stringify(interviews.data.id),
        exclude: JSON.stringify(selectedQuestions.map((d) => d.id)),
      }),
    );
  };

  if (interviews.questions.length === 0) {
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
          <Flex>
            <Flex>
              <Text
                size={13}
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  margin: '10px 0px',
                }}
              >
                You must add or generate questions to evaluate the scorecard.
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
        <Flex>
          {interviews &&
            interviews.questions.length > 0 &&
            (interviews.questions as Question[]).map((doc, index) => {
              return (
                <Flex row top marginTop={10} key={index}>
                  <InputCheckBox
                    className={styles.x}
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
                  value={''}
                  onChange={() => {}}
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
                      svgTickDisable: true,
                      tickStyle: false,
                    })}
                    //  onClick={handleLocationSubmit}
                    tabIndex={-1}
                    role={'button'}
                    onClick={() => {}}
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
          {selectedQuestions.length !== 0 && (
            <Button
              onClick={() => {
                if (selectedQuestions.length !== 0) {
                  onEvaluate(selectedQuestions);
                }
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
