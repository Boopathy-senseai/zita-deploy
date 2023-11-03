import classNames from 'classnames/bind';
import { useState } from 'react';
import SvgAdd from '../../icons/SvgAdd';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgRegenerateQuestion from '../../icons/SvgRegenerate';
import SvgTickBox from '../../icons/SvgTickBox';
import { Button, Flex, InputCheckBox, InputText, Loader } from '../../uikit';
import Text from '../../uikit/Text/Text';
import { Question } from './interviewerQuestionType';
import styles from './screeningstatustab.module.css';
const cx = classNames.bind(styles);

interface Props {
  interviews: { [key: number]: Question[] };
  onEvaluate: (value: Question[]) => void;
}

const QuestionCard: React.FC<Props> = (props) => {
  const { interviews, onEvaluate } = props;
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

  return (
    <>
      {Object.keys(interviews).map((key, i) => {
        return (
          <Flex key={key}>
            <Flex row between marginTop={10}>
              <Text color="theme">
                Interview level 1 / Oct 09 2023 / 12.00 am - 1.00 am
              </Text>
              <Text title="Regenerate Question" style={{ cursor: 'pointer' }}>
                <SvgRegenerateQuestion />
              </Text>
            </Flex>
            {interviews[key] &&
              interviews[key].length > 0 &&
              (interviews[key] as Question[]).map((doc, index) => {
                return (
                  <Flex row top marginTop={15} key={index}>
                    <InputCheckBox
                      className={styles.checkBox}
                      onClick={() => handleSelectedQuestion(doc)}
                    />
                    <Text style={{ marginLeft: '5px' }}>{doc.question}</Text>
                  </Flex>
                );
              })}

            <Flex row between>
              {addQuestion === false ? (
                <Flex
                  onClick={() => toggleStage()}
                  className={styles.addButton}
                >
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
            </Flex>
          </Flex>
        );
      })}
    </>
  );
};

export default QuestionCard;
