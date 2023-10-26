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
  interview_id: number;
  user: UserEntity;
  candidateDetails: CandidateDetailsEntity[];
  onCancel: () => void;
  recommend?: number;
  commands?: string;
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
    if (isEmpty(texttrim)) {
      errors.commands = '';
    }
    if (texttrim === '') {
      errors.commands = 'Enter valid notes.';
    } else if (!mentionnotes.test(textNodes)) {
      errors.commands = 'Message length should not exceed 2000 characters.';
    }
    if (values.recommend === 0) {
      errors.recommend = THIS_FIELD_REQUIRED;
    }
    if (questionRating.includes(0)) {
      errors.scorecard = THIS_FIELD_REQUIRED;
    }

    return errors;
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setInitial((prev) => ({
        ...prev,
        recommend: recommend || 0,
        commands: commands || '',
        scorecard: data.reduce(
          (o, v) => ({
            ...o,
            [v.id]: {
              ...o[v.id],
              id: v.id,
              scorecard: parseInt(v.scorecard) || 0,
              value: '',
              active: true,
              //   question: '',
              //   priority: 0,
            },
          }),
          {},
        ),
      }));
    }
  }, [JSON.stringify(data)]);

  // const handleFormChange = (
  //   field: string,
  //   value: any,
  //   parentField?: string,
  // ) => {
  //   if (parentField) {
  //     setForm((prev) => ({
  //       ...prev,
  //       [parentField]: { ...prev[parentField], [field]: value },
  //     }));
  //   } else {
  //     setForm((prev) => ({
  //       ...prev,
  //       [field]: value,
  //     }));
  //   }
  // };

  // type FormProps = {
  //   scorecard: { [key: string]: ScoreCardFormInputData };
  //   commands: string;
  //   recommend: number;
  // };

  // const initial: IFormData = {
  //   scorecard: {},
  //   commands: '',
  //   recommend: 0,
  // };
  const handleEvaluateInterview = (form: IFormData) => {
    setLoading(true);
    setloader(true);
    dispatch(
      evaluateQuestionMiddleware({
        ...rest,
        ...form,
        interview_id: JSON.stringify(rest.interview_id),
        scorecard: JSON.stringify(
          Object.values(form.scorecard).map((doc) => ({
            id: JSON.stringify(doc.id),
            scorecard: JSON.stringify(doc.scorecard),
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

  // const handleScoreCardChange = (id: number, field: string, value: any) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     scorecard: {
  //       ...prev?.scorecard,
  //       [id]: { ...prev?.scorecard[id], [field]: value },
  //     },
  //   }));
  // };

  return (
    <Modal open={open}>
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
            {`Hey ${user?.first_name} ${user?.last_name}, can you evaluate ${candidateDetails[0]?.first_name} based on the interview? *`}
          </Text>
          {data.length > 0 &&
            data.map((doc, index) => {
              return (
                <Flex row top marginTop={10} key={index}>
                  <Flex flex={9}>
                    <Text>{`${index + 1}. ${doc.question}`}</Text>
                  </Flex>

                  <Flex
                    flex={2.5}
                    className={styles.ratingStar}
                    marginTop={-32}
                    marginLeft={5}
                  >
                    <StarsRating
                      count={5}
                      value={formik.values.scorecard[doc.id]?.scorecard || 0}
                      onChange={(value) => {
                        formik.setFieldValue(
                          `scorecard.${doc.id}.scorecard`,
                          value,
                        );
                      }}
                    />
                  </Flex>
                </Flex>
              );
            })}
          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="scorecard"
          />

          <Flex style={{ borderTop: '1px solid #c3c3c3', marginTop: '5px' }}>
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
          <Button
            className={styles.cancel}
            types={'primary'}
            onClick={onCancel}
            style={{ marginTop: '10px' }}
          >
            Cancel
          </Button>

          {isloader ? (
            <Flex
              className={styles.svgTick}
              style={{ margin: '10px 0 0 10px' }}
            >
              <Loader withOutOverlay size={'small'} />
            </Flex>
          ) : (
            <Button
              className={styles.addBtn}
              onClick={formik.submitForm}
              style={{ marginTop: '10px' }}
            >
              {recommend || commands ? 'Update' : 'Add'}
            </Button>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default EvaluateModal;
