import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import ReactQuill from 'react-quill';
import StarsRating from 'react-star-rate';
import { useDispatch } from 'react-redux';
import {
  Button,
  ErrorMessage,
  InputRadio,
  Loader,
  Modal,
  Toast,
} from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgRadioWithLine from '../../icons/SvgRadioWithLine';
import { UserEntity } from '../accountsettingsmodule/userprofilemodule/UserProfileTypes';
import { AppDispatch } from '../../store';
import { isEmpty } from '../../uikit/helper';
import { THIS_FIELD_REQUIRED, mentionnotes } from '../constValue';
import styles from './screeningstatustab.module.css';
import { hireList } from './mock';
import { Question, ScoreCardFormInputData } from './interviewerQuestionType';
import { CandidateDetailsEntity } from './applicantProfileTypes';
import { evaluateQuestionMiddleware } from './store/middleware/interviewquestionMiddleware';


const cx = classNames.bind(styles);

interface Props {
  open: boolean;
  data: Question[];
  jd_id: string;
  can_id: string;
  interview_ids: number;
  user: UserEntity;
  candidateDetails: CandidateDetailsEntity[];
  onCancel: () => void;
  recommend?: number;
  commands?: string;
  isevaluatedata?: any;
}

interface IFormData {
  scorecard: { [key: string]: ScoreCardFormInputData };
  commands: string;
  recommend: number;

}

const EvaluateModal: React.FC<Props> = (props) => {
  const {
    open,
    data,
    user,
    candidateDetails,
    onCancel,
    recommend,
    commands,
    isevaluatedata,
    interview_ids,
    ...rest
  } = props;
  const dispatch: AppDispatch = useDispatch();
  const [initial, setInitial] = useState<IFormData>({
    scorecard: {},
    commands: '',
    recommend: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isloader, setloader] = useState(false);
  const [valuelist, setvaluelist] = useState([])
  const parser = new DOMParser();

  const handleValidations = (values: IFormData) => {
    const errors: Partial<{
      scorecard: string;
      commands: string;
      recommend: string;
    }> = {};
    const questionRating = Object.values(values.scorecard).map(
      (doc) => doc.scorecard,
    );
    const doc = parser.parseFromString(values?.commands, 'text/html');
    const textNodes = doc.querySelectorAll('body')[0].textContent;
    const texttrim = textNodes.trim();
    const hasEmptyValues = Object.values(values.scorecard).some((item) => {
      const { scorecard } = item;
      return scorecard === null || scorecard === undefined;
    });
    if (isEmpty(texttrim)) {
      errors.commands = '';
    }
    if (values.commands === null) {
      errors.commands = THIS_FIELD_REQUIRED;
    }
    if (texttrim === '') {
      errors.commands = 'Enter valid notes.';
    } else if (!mentionnotes.test(textNodes)) {
      errors.commands = 'Message length should not exceed 2000 characters.';
    }
    if (values.recommend === 0 || values.recommend === undefined) {
      errors.recommend = THIS_FIELD_REQUIRED;
    }
    if (questionRating.includes(0)) {
      errors.scorecard = THIS_FIELD_REQUIRED;
    }
    if (hasEmptyValues) {
      errors.scorecard = THIS_FIELD_REQUIRED;
    }

    return errors;
  };

  useEffect(() => {
    if (isevaluatedata.length > 0 && isevaluatedata !== null) {
      const datas = Dataconvertion(isevaluatedata)
      if (formik.values !== null) {
        const updatescore = {};
        isevaluatedata.forEach((info) => {
          if (info.scorecard !== null) {
            formik.values.commands = info.commands;
            formik.values.recommend = recommend[0].total_recommend;
          }
          updatescore[info.id] = { scorecard: info.scorecard };
        });
        formik.values.scorecard = updatescore
      }



    }
  }, []);

  const Dataconvertion = (interviewQuestions: any) => {
    const filteredQuestions = interviewQuestions.reduce((acc, question) => {
      const category = `${question.type} ${question.level}`;
      if (!acc[question.type]) {
        acc[question.type] = []
      }
      if (!acc[question.type]) {
        acc[question.type].push(question.level)
      }
      if (!acc[question.type][question.level]) {
        acc[question.type][question.level] = [];
      }
      acc[question.type][question.level].push(question);
      setvaluelist(acc)
      return acc;
    }, {});
  }
  // const onCancelpopup = () => {
  //   const questionRating = Object.values(formik.values.scorecard).map(
  //     (doc) => doc.scorecard,
  //   );
  //   const doc = parser.parseFromString(formik.values?.commands, 'text/html');
  //   const textNodes = doc.querySelectorAll('body')[0].textContent;
  //   const texttrim = textNodes.trim();
  //   const hasEmptyValues = Object.values(formik.values.scorecard).some((item) => {
  //     const { scorecard } = item;
  //     return scorecard === null || scorecard === undefined;
  //   });  
  //   if (formik.values.recommend !== 0 || texttrim !== '' || !isEmpty(texttrim) || !hasEmptyValues) {
  //     const validate = window.confirm(
  //       'You have unevaluate changes that will be lost, Are you sure to Proceed ?',
  //     );
  //     if(validate){
  //       onCancel()
  //     }
  //   }
  //   else{
  //     onCancel()
  //   } 
  // }

  const handleEvaluateInterview = (form: IFormData) => {
    setLoading(true);
    setloader(true);
    dispatch(
      evaluateQuestionMiddleware({
        ...rest,
        ...form,
        interview_id: JSON.stringify(interview_ids),
        scorecard: JSON.stringify(
          Object.values(form.scorecard).map((doc, index) => ({
            id: Object.keys(form.scorecard)[index],
            scorecard: doc.scorecard,
            value: '',
            active: 'True',
          })),
        ),
      }),
    )
      .then((res) => {
        if (res.payload.success !== true) {
          Toast(
            'Sorry, there was a problem connecting to the API. Please try again later.',
            'LONG',
            'error',
          );
          setloader(false);
        } else {
          Toast(
            recommend || commands
              ? 'Scorecard evaluation updated successfully'
              : 'Scorecard evaluation added successfully',
          );
          setLoading(false);
          setloader(false);
          onCancel();
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleEvaluateInterview,
    enableReinitialize: true,
    validate: handleValidations,
  });

  //handle the radio button based on easy,hard and medium.
  const handlelevelradio = (val) => {
    const value = val.toLowerCase();
    if (value === 'easy') {
      return <SvgRadioWithLine fill="#34CC65" width={16} height={16} />;
    }
    if (value === 'medium') {
      return <SvgRadioWithLine fill="#F29111" width={16} height={16} />;
    }
    if (value === 'hard') {
      return <SvgRadioWithLine fill="#ED4857" width={16} height={16} />;
    }
    return null;
  };

  const datalist = Object.values(valuelist)

  //   const onCancelpopup =()=>{
  // if{

  // }
  //   } 
  // window.confirm(
  //   'You have unsaved changes that will be lost, Are you sure to Proceed ?',
  // );
  return (
    <Modal open={open}>
      <Flex className={styles.overAll}>
        <Text size={14} bold className={styles.insertStyles}>
          Evaluate Scorecard
        </Text>
        <Text color="theme" >
          {`Hey ${user?.first_name} ${user?.last_name}, can you evaluate ${candidateDetails[0]?.first_name} based on the interview? *`}
        </Text>
        <Flex
          style={{
            overflow: 'scroll',
            maxHeight: '500px',
          }}
        >
          {datalist.length > 0 && datalist.map((item, itemIndex) => (
            <div key={itemIndex}>
              <Flex marginTop={7}><Text bold size={13}>{Object.keys(valuelist)[itemIndex]}</Text></Flex>
              {Object.values(item).map((li, liIndex) => (
                <div key={liIndex} style={{
                  borderBottom: (Object.keys(item).findIndex).toString() !== '1' ? '1px solid #C3C3C3' : '', paddingBottom: '7px',
                }}>
                  <Flex row marginTop={5} marginBottom={3} >
                    <Flex marginRight={7} marginTop={1}>
                      {handlelevelradio(Object.keys(item)[liIndex])}
                    </Flex>
                    <Flex>
                      <Text color='theme'>{Object.keys(item)[liIndex]}</Text>
                    </Flex>
                  </Flex>
                  {Object.values(li).map((doc, index) => (
                    <div key={index} >
                      <Flex row top marginLeft={2} marginBottom={4}>
                        <Flex flex={9} row>
                          <Text>{`${index + 1}.`}</Text>
                          <Text style={{ textAlign: 'justify' }}>{`${doc.question}`}</Text>
                        </Flex>
                        <Flex
                          flex={2.5}
                          className={styles.ratingStar}
                          marginTop={-32}
                          marginLeft={5}
                          height={10}
                        >
                          <StarsRating
                            count={5}
                            value={Number(formik.values.scorecard[doc.id]?.scorecard)}
                            onChange={(e) => {
                              formik.setFieldValue(
                                `scorecard.${doc.id}.scorecard`,
                                e,
                              );
                            }}
                          />
                        </Flex>
                      </Flex>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="scorecard"
          />

          <Flex style={{ marginTop: '5px' }}>
            <Text
              color="theme"
              style={{ marginBottom: '5px', marginTop: '10px' }}
            >
              Recommended to Hire *
            </Text>
          </Flex>

          <Flex>
            <Flex row>
              {hireList.map((doc) => {
                return (
                  <Flex key={doc.value} style={{ margin: '0  20px  10px 0 ' }}>
                    <InputRadio
                      checked={formik.values.recommend === doc.value}
                      label={doc.label}
                      onClick={() =>
                        formik.setFieldValue('recommend', doc.value)
                      }
                    />
                  </Flex>
                );
              })}
            </Flex>
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="recommend"
            />
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
                  value={formik.values?.commands}
                  className={styles.reactquillchange}
                  onChange={(value) => formik.setFieldValue('commands', value)}
                  placeholder="Add your feedback here"
                />

                <ErrorMessage
                  touched={formik.touched}
                  errors={formik.errors}
                  name="commands"
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex row end marginTop={5} style={{ borderTop: '1px solid #c3c3c3' }}>
          {!isloader && <Button
            className={styles.cancel}
            types={'primary'}
            onClick={onCancel}
            style={{ marginTop: '10px' }}
          >
            Cancel
          </Button>}

          {isloader ? (
            <Flex
              className={styles.svgTick}
              style={{ margin: '10px 0 0 10px' }}
              width='75px'
              middle
            >
              <Loader withOutOverlay size={'small'} />
            </Flex>
          ) : (
            <Button
              className={styles.addBtn}
              onClick={formik.submitForm}
              style={{ marginTop: '10px' }}
              width='75px'
            >
              {commands[0] !== null && commands[0] !== "" ? 'Update' : 'Add'}
            </Button>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default EvaluateModal;
