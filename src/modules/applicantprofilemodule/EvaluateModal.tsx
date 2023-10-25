import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import ReactQuill from 'react-quill';
import StarsRating from 'react-star-rate';
import { useDispatch } from 'react-redux';
import { Button, InputRadio, Modal } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { UserEntity } from '../accountsettingsmodule/userprofilemodule/UserProfileTypes';
import { AppDispatch } from '../../store';
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
  interview_id: string;
  user: UserEntity;
  candidateDetails: CandidateDetailsEntity[];
  onCancel: () => void;
}

interface IFormData {
  scorecard: { [key: string]: ScoreCardFormInputData };
  commands: '';
  recommend: 0;
}

const EvaluateModal: React.FC<Props> = (props) => {
  const { open, data, user, candidateDetails, onCancel, ...rest } = props;
  const dispatch: AppDispatch = useDispatch();
  const [form, setForm] = useState<IFormData>({
    scorecard: {},
    commands: '',
    recommend: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data && data.length > 0) {
      setForm((prev) => ({
        ...prev,
        scorecard: data.reduce(
          (o, v) => ({
            ...o,
            [v.id]: {
              ...o[v.id],
              id: v.id,
              scorecard: 0,
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

  const handleFormChange = (
    field: string,
    value: any,
    parentField?: string,
  ) => {
    if (parentField) {
      setForm((prev) => ({
        ...prev,
        [parentField]: { ...prev[parentField], [field]: value },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleScoreCardChange = (id: number, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      scorecard: {
        ...prev?.scorecard,
        [id]: { ...prev?.scorecard[id], [field]: value },
      },
    }));
  };

  const handleEvaluateInterview = () => {
    setLoading(true);
    dispatch(
      evaluateQuestionMiddleware({
        ...rest,
        ...form,
        scorecard: JSON.stringify(
          Object.values(form.scorecard).map((doc) => ({
            id: JSON.stringify(doc.id),
            scorecard: JSON.stringify(doc.scorecard),
            value: '',
            active: "True",
          })),
        ),
      }),
    )
      .then(() => {
        setLoading(false);
        onCancel();
      })
      .catch((err) => {
        setLoading(false);
      });
  };
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
                      value={form?.scorecard?.[doc.id]?.scorecard || 0}
                      onChange={(value) =>
                        handleScoreCardChange(doc.id, 'scorecard', value)
                      }
                    />
                  </Flex>
                </Flex>
              );
            })}

          <Flex style={{ borderTop: '1px solid #c3c3c3', marginTop: '5px' }}>
            <Text
              color="theme"
              style={{ marginBottom: '5px', marginTop: '10px' }}
            >
              Recommended to Hire *
            </Text>
          </Flex>

          <Flex row>
            {hireList.map((doc) => {
              return (
                <Flex key={doc.value} style={{ margin: '0  20px  10px 0 ' }}>
                  <InputRadio
                    checked={form.recommend === doc.value}
                    label={doc.label}
                    onClick={() => handleFormChange('recommend', doc.value)}
                  />
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
                  value={form.commands}
                  className={styles.reactquillchange}
                  onChange={(value) => handleFormChange('commands', value)}
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
        <Flex row end marginTop={5} style={{ borderTop: '1px solid #c3c3c3' }}>
          <Button
            className={styles.cancel}
            types={'primary'}
            onClick={onCancel}
            style={{ marginTop: '10px' }}
          >
            Cancel
          </Button>

          {/* TODO: Add spinner to button to indicate API in progreess... use --> loading from above */}
          <Button
            className={styles.addBtn}
            onClick={handleEvaluateInterview}
            style={{ marginTop: '10px' }}
          >
            Add
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default EvaluateModal;
