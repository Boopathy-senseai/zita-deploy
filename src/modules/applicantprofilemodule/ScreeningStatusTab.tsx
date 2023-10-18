import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgTickBox from '../../icons/SvgTickBox';
import SvgRoundTick from '../../icons/SvgRoundTick';
import SvgRegenerateQuestion from '../../icons/SvgRegenerate';
import SvgAdd from '../../icons/SvgAdd';
import {
  Button,
  ErrorMessage,
  InputRadio,
  InputText,
  Loader,
  Modal,
} from '../../uikit';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { useForm } from '../../hooks/useForm';
import { getDateString, isEmpty } from '../../uikit/helper';
import InterviewScorecardTab from './InterviewScorecardTab';
import styles from './screeningstatustab.module.css';
import { hireList } from './mock';

const cx = classNames.bind(styles);

// export interface QuestionForm {
//   question: string;
// }

type Props = {
  title: string;
  issingletab: boolean;
};
const ScreeningStatusTab = ({ title, issingletab }: Props) => {
  // const form: QuestionForm = { question: '' };
  const [addQuestion, setaddQuestione] = useState(false);
  const [isPostLoader, setPostLoader] = useState(false);

  const [evaluatePopup, setEvaluatePopup] = useState(false);
  const [isQuestionLoader, setQuestionLoader] = useState(false);
  const { stages, invite } = useSelector(
    ({ applicantStausReducers }: RootState) => {
      return {
        stages: applicantStausReducers?.stages,
        invite: applicantStausReducers?.invite,
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
    setEvaluatePopup(false);
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

        <Flex row between>
          <Text color="theme">
            Interview level 1 / Oct 09 2023 / 12.00 am - 1.00 am
          </Text>
          <Text title="Regenerate Question" style={{ cursor: 'pointer' }}>
            <SvgRegenerateQuestion />
          </Text>
        </Flex>

        <Flex row between>
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

          <Button
            onClick={() => {
              setEvaluatePopup(true);
            }}
            // className={styles.cancel}
            types={'primary'}
          >
            Evaluate
          </Button>
        </Flex>
      </Flex>
      <Modal open={evaluatePopup}>
        <Flex className={styles.overAll}>
          <Text size={14} bold className={styles.insertStyles} >
            Evaluate Scorecard
          </Text>
          <Flex
            style={{ overflow: 'scroll', maxHeight: '500px', padding: '0px 5px' }}
          >
            <Text color="theme">
              Hey john, can you evaluate Ananth based on the interview? *{' '}
            </Text>

            <Text color="theme" style={{ marginBottom: '5px' }}>
              Recommended to Hire *
            </Text>
            <Flex row>
              {hireList.map((doc) => {
                return (
                  <Flex key={doc.value} style={{ margin: '0  20px  10px 0 ' }}>
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
                    onChange={() => {}}
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
              onClick={() => {}}
              style={{ marginTop: '10px' }}
            >
              Add
            </Button>
          </Flex>
        </Flex>
      </Modal>
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
