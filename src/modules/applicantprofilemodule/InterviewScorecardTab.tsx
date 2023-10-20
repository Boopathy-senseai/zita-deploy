import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import classNames from 'classnames/bind';
import ReactQuill from 'react-quill';
import StarRatingComponent from 'react-star-rating-component';
import StarsRating from 'react-star-rate';
import { Tooltip } from '@mui/material';
import Loader from '../../uikit/Loader/Loader';
import Modal from '../../uikit/Modal/Modal';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import SvgInterviewer from '../../icons/SvgInterviewer';
import SvgUserRating from '../../icons/SvgUserRating';
import Svgeditingnotes from '../../icons/editingnotes';
import SvgQuestion from '../../icons/SvgQuestion';
import Text from '../../uikit/Text/Text';
import { Card, ErrorMessage } from '../../uikit';
import { isEmpty } from '../../uikit/helper';
import { AppDispatch, RootState } from '../../store';
import { InterviewScorecardApi, checkAuth } from '../../routes/apiRoutes';
import {
  CANCEL,
  config,
  mediaPath,
  mentionnotes,
  mentionspecialcharacter,
} from '../constValue';
import RichText from '../common/RichText';
import {
  applicantScoreMiddleWare,
  applicantScoreMiddleWares,
} from './store/middleware/applicantProfileMiddleware';

import styles from './interviewscorecardtab.module.css';
import InterviewScorecard from './interviewScorecard';
const cx = classNames.bind(styles);
var querystring = require('querystring');
const InterviewScorecardTab = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isPostLoader, setPostLoader] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const [buttonName, setButtonName] = useState('Add');
  const [opencomment, setopencomment] = useState(false);
  const [isColor, setColor] = useState<string[]>([]);
  const [hoverMessage, setHoverMessage] = useState(null);
  const [rating1, setrating1] = useState(0);
  const [rating2, setrating2] = useState(0);
  const [rating3, setrating3] = useState(0);
  const [rating4, setrating4] = useState(0);
  const [rating5, setrating5] = useState(0);
  const [roundedValues, setroundedValue] = useState(0);
  const [tooltip, settooltip] = useState('');
  const [reaction, setreaction] = useState('');
  const [reactions, setreactions] = useState('');
  const [getId, setGetId] = useState(0);
  const [isuser, setuser] = useState(false);
  const [isStar, setStar] = useState<any>('Very Poor');
  const {
    can_id,
    jd_id,
    interview,
    interviews,
    overall,
    user,
    no_of_interview,
    cumulative,
    results,
  } = useSelector(
    ({
      applicantProfileInitalReducers,
      applicantScoreReducers,
      interviewerQuestionReducers,
      applicantUserlistReducer,
      userProfileReducers,
    }: RootState) => {
      return {
        user: applicantScoreReducers.user,
        can_id: applicantProfileInitalReducers.can_id,
        jd_id: applicantProfileInitalReducers.jd_id,
        interviews: interviewerQuestionReducers.interviews,
        results: interviewerQuestionReducers.result,
        no_of_interview: interviewerQuestionReducers.no_of_interview,
        cumulative: interviewerQuestionReducers.cumulative,
        overall: applicantScoreReducers.overall,
        interview:
          typeof applicantScoreReducers.interview !== 'undefined' &&
          applicantScoreReducers.interview.length === 0
            ? [
                {
                  candidate_id_id: 0,
                  jd_id_id: 0,
                  rating: 0,
                  img_name: '',
                  first_name: '',
                  comments: '',
                  created_at: '',
                  last_name: '',
                  rating1: 0,
                  rating2: 0,
                  rating3: 0,
                  rating4: 0,
                  rating5: 0,
                  overall_percentage: 0,
                  user_id: 0,
                  user: 0,
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
    interview && interview[0].rating
      ? interview[interview.length - 1].rating
      : 0;
  const [rating, setRating] = useState(ratingValue);
  const [editing, setediting] = useState();

  useEffect(() => {
    // checkAuth();
    const colorCode = [
      '#d08014',
      '#d04343',
      '#db1f77',
      '#c0399f',
      '#6367de',
      '#286eb4',
      '#0f828f',
      '#7ca10c',
      '#925ace',
      '#647987',
    ];

    setColor(colorCode);
  }, []);
  const hanldeSubmit = () => {
    // if (buttonName === 'Add') {
    setPostLoader(true);
    const data = querystring.stringify({
      jd_id,
      can_id,
      rating,
      rating1,
      rating2,
      rating3,
      rating4,
      rating5,
      roundedValues,
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
    formik.resetForm();
    setrating1(0);
    setrating2(0);
    setrating3(0);
    setrating4(0);
    setrating5(0);
    formik.setFieldValue('userMessage', '');
    setopencomment(false);
  };
  type notes = {
    userMessage: string;
  };
  const parser = new DOMParser();
  const handlemessage = (values: notes) => {
    const errors: Partial<notes> = {};
    const doc = parser.parseFromString(formik.values.userMessage, 'text/html');
    const textNodes = doc.querySelectorAll('body')[0].textContent;
    const texttrim = textNodes.trim();
    if (isEmpty(texttrim)) {
      errors.userMessage = '';
    }
    if (texttrim === '') {
      errors.userMessage = 'Enter valid notes.';
    } else if (
      !mentionnotes.test(textNodes)
      //&&
      // mentionspecialcharacter.test(textNodes)
    ) {
      errors.userMessage = 'Message length should not exceed 2000 characters.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      userMessage:
        interview && interview[0].comments ? interview[0].comments : '',
    },
    onSubmit: hanldeSubmit,
    validate: handlemessage,
  });
  const handleEdit = (e) => {
    setButtonName('Update');
    setopencomment(true);
    setGetId(e.id);
    setrating1(e.rating1);
    setrating2(e.rating2);
    setrating3(e.rating3);
    setrating4(e.rating4);
    setrating5(e.rating5);
    setroundedValue(e.overall_percentage);
    setOpen(false);
    formik.setFieldValue('userMessage', e.comments);
    // setOpen(false);
  };
  const handleCancel = () => {
    if (isEmpty(interview && interview[0].comments)) {
      setOpen(true);
      formik.setFieldValue('userMessage', '');
    }
    if (!isEmpty(interview && interview[0].comments)) {
      setOpen(false);
    }
    setopencomment(false);
    formik.resetForm();
  };
  const hanldeInputOpen = () => {
    setButtonName('Add');
    setrating1(0);
    setrating2(0);
    setrating3(0);
    setrating4(0);
    setrating5(0);
    formik.resetForm();
    formik.setFieldValue('userMessage', '');
    setopencomment(true);
  };

  const onStarClick = { setRating };
  const handleStar1 = (e) => {
    setrating1(e);
  };
  const handleStar2 = (e) => {
    setrating2(e);
  };
  const handleStar3 = (e) => {
    setrating3(e);
  };
  const handleStar4 = (e) => {
    setrating4(e);
  };
  const handleStar5 = (e) => {
    setrating5(e);
  };

  const handlehover = (value) => {
    if (value <= 1 && value > 0) {
      settooltip('"Poor"');
    }
    if (value > 1 && value <= 2) {
      settooltip('"Below Average"');
    }
    if (value > 2 && value <= 3) {
      settooltip('"Average"');
    }
    if (value > 3 && value <= 4) {
      settooltip('"Above Average"');
    }
    if (value > 4 && value <= 5) {
      settooltip('"Outstanding"');
    }
  };

  useEffect(() => {
    if (results?.total_avg <= 1 && results?.total_avg > 0) {
      setreaction('"Poor"');
    }
    if (results?.total_avg > 1 && results?.total_avg <= 2) {
      setreaction('"Below Average"');
    }
    if (results?.total_avg > 2 && results?.total_avg <= 3) {
      setreaction('"Average"');
    }
    if (results?.total_avg > 3 && results?.total_avg <= 4) {
      setreaction('"Above Average"');
    }
    if (results?.total_avg > 4 && results?.total_avg <= 5) {
      setreaction('"Outstanding"');
    }
  }, [results?.total_avg]);
  useEffect(() => {
    if (roundedValues <= 1 && roundedValues > 0) {
      setreactions('"Poor"');
    }
    if (roundedValues > 1 && roundedValues <= 2) {
      setreactions('"Below Average"');
    }
    if (roundedValues > 2 && roundedValues <= 3) {
      setreactions('"Average"');
    }
    if (roundedValues > 3 && roundedValues <= 4) {
      setreactions('"Above Average"');
    }
    if (roundedValues > 4 && roundedValues <= 5) {
      setreactions('"Outstanding"');
    }
  }, [roundedValues]);
  useEffect(() => {
    const sum = rating1 + rating2 + rating3 + rating4 + rating5;
    const average = sum / 5;
    const roundedValue = average;
    setroundedValue(roundedValue);
  }, [rating1, rating2, rating3, rating4, rating5]);
  useEffect(() => {
    if (interview.map((inter) => inter.user_id === user)) {
      setuser(true);
    } else {
      setuser(false);
    }
  }, [user]);
  return (
    <>
      <Flex row flex={12}>
        <Flex
          flex={6}
          columnFlex
          className={styles.overAll}
          style={{ padding: '10px' }}
          // height={window.innerHeight - 120}
        >
          <Text bold style={{ fontSize: '14px' }}>
            Interview Scorecard
          </Text>
          <Text className={styles.addText}>
            {"Interviewer's overall ratings for each interview"}.
          </Text>

          <Flex center middle className={styles.starstylehead}>
            <StarsRating disabled count={5} value={results?.total_avg} />
            <Flex center middle marginTop={10}>
              <Text>{reaction}</Text>
            </Flex>
          </Flex>
          <Flex 
            style={{ overflow: 'scroll', paddingRight: "5px" }}
            height={window.innerHeight - 240}
          >
            {Object.keys(interviews).map((key, i) => {
              return (
                <InterviewScorecard key={i} interviews={interviews[key]} />
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default InterviewScorecardTab;
