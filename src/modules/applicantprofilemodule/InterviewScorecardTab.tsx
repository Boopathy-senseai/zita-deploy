import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Loader from '../../uikit/Loader/Loader';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import StarRating from '../../uikit/StarRating/StarRating';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import Text from '../../uikit/Text/Text';
import { getDateString, isEmpty } from '../../uikit/helper';
import { AppDispatch, RootState } from '../../store';
import { InterviewScorecardApi } from '../../routes/apiRoutes';
import { CANCEL, config } from '../constValue';
import RichText from '../common/RichText';
import { applicantScoreMiddleWare } from './store/middleware/applicantProfileMiddleware';
import styles from './interviewscorecardtab.module.css';

var querystring = require('querystring');

const InterviewScorecardTab = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isPostLoader, setPostLoader] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const [isStar, setStar] = useState<any>('Very Poor');
  const { can_id, jd_id, interview } = useSelector(
    ({ applicantProfileInitalReducers, applicantScoreReducers }: RootState) => {
      return {
        can_id: applicantProfileInitalReducers.can_id,
        jd_id: applicantProfileInitalReducers.jd_id,
        interview:
          typeof applicantScoreReducers.interview !== 'undefined' &&
          applicantScoreReducers.interview.length === 0
            ? [
                {
                  id: 0,
                  candidate_id_id: 0,
                  jd_id_id: 0,
                  rating: 0,
                  comments: '',
                  created_at: '',
                },
              ]
            : applicantScoreReducers.interview,
      };
    },
  );
  useEffect(() => {
    dispatch(applicantScoreMiddleWare({ jd_id, can_id }));
  }, []);

  const ratingValue =
    interview && interview[0].rating ? interview[0].rating : 0;
  const [rating, setRating] = useState(ratingValue);
// rating start condition
  useEffect(() => {
    if (rating.toString() === '1') {
      setStar('Very Poor');
    }
    if (rating.toString() === '2') {
      setStar('Poor');
    }
    if (rating.toString() === '3') {
      setStar('Average');
    }
    if (rating.toString() === '4') {
      setStar('Good');
    }
    if (rating.toString() === '5') {
      setStar('Excellent');
    }
  }, [rating]);

  // feedback form submit
  const hanldeSubmit = () => {
    setPostLoader(true);
    const data = querystring.stringify({
      jd_id,
      can_id,
      rating,
      comments: formik.values.userMessage,
    });

    axios
      .post(InterviewScorecardApi, data, config)
      .then(() => {
        setOpen(false);
        setPostLoader(false);
        dispatch(applicantScoreMiddleWare({ jd_id, can_id }));
      })
      .catch(() => {
        setPostLoader(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      userMessage:
        interview && interview[0].comments ? interview[0].comments : '',
    },
    onSubmit: hanldeSubmit,
  });

  useEffect(() => {
    if (interview && !isEmpty(interview[0].comments)) {
      setOpen(false);
    }
    setRating(ratingValue)
  }, [typeof interview === 'undefined']);

  const handleEdit = () => {
    formik.setFieldValue('userMessage', interview && interview[0].comments);
    setOpen(true);
  };

  const handleCancel = () => {
    if (isEmpty(interview && interview[0].comments)) {
      setOpen(true);
      formik.setFieldValue('userMessage', '');
    }
    if (!isEmpty(interview && interview[0].comments)) {
      setOpen(false);
    }
  };
  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 230}
    >
      <Text className={styles.addText}>
        You can add the interview feedback and rating here for the application
      </Text>
      <Text bold color="theme">
        Comments/Feedback:
      </Text>
      {(isEmpty(interview && interview[0].comments) && !isOpen) ||
        (isOpen && (
          <Flex className={styles.inputContainer}>
            <div className={styles.textArea}>
              <RichText
                height={200}
                value={formik.values.userMessage}
                onChange={formik.handleChange('userMessage')}
                placeholder="Add your comments here..."
              />
            </div>
            <Flex row center end columnFlex className={styles.btnConatiner}>
              <Button types="secondary" onClick={handleCancel}>
                {CANCEL}
              </Button>
              <Button
                disabled={isEmpty(formik.values.userMessage)}
                className={styles.addBtn}
                onClick={formik.handleSubmit}
              >
                {isEmpty(interview && interview[0].comments) ? 'Add' : 'Save'}
              </Button>
              {isPostLoader && (
                <div style={{ marginLeft: 8 }}>
                  <Loader withOutOverlay size="small" />
                </div>
              )}
            </Flex>
          </Flex>
        ))}
      {!isEmpty(interview && interview[0].comments) && !isOpen && (
        <Flex className={styles.borderStyle}>
          <Flex row center between className={styles.dateStyle}>
            <Text color="gray">
              {getDateString(interview && interview[0].created_at, 'll')}
            </Text>
            <div
              tabIndex={-1}
              role={'button'}
              onKeyPress={() => {}}
              className={styles.svgEdit}
              onClick={handleEdit}
            >
              <SvgBoxEdit />
            </div>
          </Flex>
          <td
            className={styles.commentTextStyle}
            dangerouslySetInnerHTML={{
              __html: interview && interview[0].comments,
            }}
          />
          {/* <Text className={styles.commentTextStyle}>
            {interview && interview[0].comments}
          </Text> */}
        </Flex>
      )}
      <Flex columnFlex>
        <Text bold color="theme">
          Performance Rating:
        </Text>
        <Text tag={'pre'} className={styles.rateText}>
          {
            '1. Very Poor    2. Poor     3. Average     4. Good     5. Excellent'
          }
        </Text>
      </Flex>

      <Flex row center>
        <StarRating pointer={!isOpen} setRating={setRating} rating={rating} />
        <Flex row center className={styles.rateFlex}>
          <Text>Rated:</Text>
          <Text bold style={{ marginLeft: 2, marginRight: 8 }}>
            {rating}
          </Text>
          <Text color="gray" size={12}>
            ({isStar})
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InterviewScorecardTab;
