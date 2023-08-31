import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
// import StarRatingComponent from 'react-star-rating-component';
// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2,
// } from 'react-html-parser';
// import parse from 'html-react-parser';
import classNames from 'classnames/bind';
import ReactQuill from 'react-quill';
import StarRatingComponent from 'react-star-rating-component';
import StarsRating from 'react-star-rate';
import { Tooltip } from '@mui/material';
// import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
// import parse from 'html-react-parser';
// import classNames from 'classnames/bind';
// import ReactQuill from 'react-quill';
import Loader from '../../uikit/Loader/Loader';
import Modal from '../../uikit/Modal/Modal';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import StarRating from '../../uikit/StarRating/StarRating';
import Svgeditingnotes from '../../icons/editingnotes';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import Text from '../../uikit/Text/Text';
import { Card, ErrorMessage } from '../../uikit';
import { firstNameChar, getDateString, isEmpty } from '../../uikit/helper';
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
// import { applicantUserlistReducer } from './store/reducer/applicantProfileReducer';
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
  const { can_id, jd_id, interview, overall, user } = useSelector(
    ({
      applicantProfileInitalReducers,
      applicantScoreReducers,
      applicantUserlistReducer,
      userProfileReducers,
    }: RootState) => {
      return {
        user: applicantScoreReducers.user,
        can_id: applicantProfileInitalReducers.can_id,
        jd_id: applicantProfileInitalReducers.jd_id,
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
                  user:0,
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
      !mentionnotes.test(textNodes) &&
      mentionspecialcharacter.test(textNodes)
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
    if (overall <= 1 && overall > 0) {
      setreaction('"Poor"');
    }
    if (overall > 1 && overall <= 2) {
      setreaction('"Below Average"');
    }
    if (overall > 2 && overall <= 3) {
      setreaction('"Average"');
    }
    if (overall > 3 && overall <= 4) {
      setreaction('"Above Average"');
    }
    if (overall > 4 && overall <= 5) {
      setreaction('"Outstanding"');
    }
  }, [overall]);
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
    <Flex columnFlex className={styles.overAll}>
      <Text bold style={{ fontSize: '14px', padding: '13px 0px 0px 16px' }}>
        Interview Scorecard
      </Text>
      <Flex column  style={{ padding: '0px 16px 0px 16px' }}>
        <Flex>
          <Text className={styles.addText}>
            You can add the interview rating and comment here for the applicant
          </Text>
        </Flex>
        <Flex>
          <Flex center middle className={styles.starstylehead}>
            <StarsRating disabled count={5} value={overall} />
            <Flex center middle marginTop={10}>
              <Text>{reaction}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        height={window.innerHeight - 241}
        style={{
          overflow: 'scroll',
          display: 'flex',
        }}
      >
        <Flex
          className={styles.inputContainer}
          style={{ padding: '16px 16px 0px 16px' }}
        >
          {interview.filter((inter) => inter.user_id === user).length ===
          0 ? (
            <input
              className={styles.initialbuttons}
              onClick={hanldeInputOpen}
              placeholder="Add your ratings and feedback here"
            />
          ) : (
            ''
          )}

          <Modal open={opencomment}>
            <Flex
              style={{ backgroundColor: '#ffffff' }}
              className={styles.overallmodal}
            >
              <Flex row>
                <Flex flex={6}>
                  <Text bold size={14}>
                    Overall Rating
                  </Text>
                  <Text size={13}>Average of all the team members</Text>
                  <Flex
                    center
                    middle
                    marginTop={30}
                    height={40}
                    className={styles.starsizes}
                  >
                    <StarsRating
                      value={roundedValues}
                      disabled
                      // onChange={handleStar5}
                      count={5}
                    />
                    <Flex center middle marginTop={10}>
                      <Text>{reactions}</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  style={{
                    border: '0.3px solid #C3C3C3',
                    width: '0.3px',
                    margin: '0px 5px 10px',
                    paddingBottom: '10px',
                    height: '175px',
                  }}
                ></Flex>
                <Flex flex={6.4} marginLeft={10}>
                  <Text bold size={14}>
                    Scoring Categories
                  </Text>
                  <Text size={13}>
                    Rate the candidate based on following aspects
                  </Text>
                  <Flex marginTop={10}>
                    <Flex
                      row
                      center
                      between
                      width={350}
                      height={25}
                      className={styles.starsize}
                    >
                      <Text size={13} color="theme">
                        Technical Proficiency:
                      </Text>
                      {/* <Tooltip title={tooltip} > */}
                      <StarsRating
                        value={rating1}
                        onChange={handleStar1}
                        // onHover={tooltip}
                        count={5}
                        onHoverChange={handlehover}
                      />
                      {/* </Tooltip> */}
                    </Flex>
                    {/* </Card> */}
                  </Flex>
                  <Flex marginRight={10}>
                    {/* <Card className={styles.cardstructure}> */}
                    <Flex
                      row
                      center
                      between
                      width={350}
                      height={25}
                      className={styles.starsize}
                    >
                      <Text size={13} color="theme">
                        Communication Aptitude:
                      </Text>
                      <StarsRating
                        value={rating2}
                        onChange={handleStar2}
                        count={5}
                      />
                    </Flex>
                    {/* </Card> */}
                  </Flex>
                  <Flex marginRight={10}>
                    {/* <Card className={styles.cardstructure}> */}
                    <Flex
                      row
                      center
                      between
                      width={350}
                      height={25}
                      className={styles.starsize}
                    >
                      <Text size={13} color="theme">
                        Problem-Solving Capability:
                      </Text>
                      <StarsRating
                        value={rating3}
                        onChange={handleStar3}
                        count={5}
                      />
                    </Flex>
                    {/* </Card> */}
                  </Flex>
                  <Flex marginRight={10}>
                    {/* <Card className={styles.cardstructure}> */}
                    <Flex
                      row
                      center
                      between
                      width={350}
                      height={25}
                      className={styles.starsize}
                    >
                      <Text size={13} color="theme">
                        Collaborative Skills:
                      </Text>
                      <StarsRating
                        value={rating4}
                        onChange={handleStar4}
                        count={5}
                      />
                    </Flex>
                    {/* </Card> */}
                  </Flex>
                  <Flex>
                    {/* <Card className={styles.cardstructure}> */}
                    <Flex
                      row
                      center
                      between
                      width={350}
                      height={25}
                      className={styles.starsize}
                    >
                      <Text size={13} color="theme">
                        Adaptability and Learning:
                      </Text>
                      <StarsRating
                        value={rating5}
                        onChange={handleStar5}
                        count={5}
                      />
                    </Flex>
                    {/* </Card> */}
                  </Flex>
                </Flex>
              </Flex>
              <Flex marginTop={10}>
                <Text bold size={14}>
                  Comments/Feedback
                </Text>
                <div className={styles.textArea}>
                  <ReactQuill
                    // ref={editorRef}
                    value={formik.values.userMessage}
                    className={styles.reactquillchange}
                    onChange={formik.handleChange('userMessage')}
                    placeholder="Add your feedback here"
                  />
                  <ErrorMessage
                    touched={formik.touched}
                    errors={formik.errors}
                    name="userMessage"
                  />
                </div>
                <Flex row center end columnFlex className={styles.btnConatiner}>
                  <Button types="secondary" onClick={handleCancel}>
                    {CANCEL}
                  </Button>

                  <Button
                    className={styles.addBtn}
                    onClick={formik.handleSubmit}
                  >
                    {buttonName}
                  </Button>

                  {isPostLoader && (
                    <div style={{ marginLeft: 8 }}>
                      <Loader withOutOverlay size="small" />
                    </div>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Modal>
        </Flex>
        <Flex style={{ padding: ' 0px 16px 10px 16px' }} marginTop={10}>
          {interview &&
            interview
              .map((list, indexList) => {
                return (
                  <>
                    {list.comments !== null && list.comments !== '' && (
                      <Card
                        key={list.comments}
                        className={styles.feedbackstyle}
                      >
                        <Flex className={styles.borderStyle}>
                          <Flex row center between className={styles.dateStyle}>
                            <Flex
                              row
                              between
                              center
                              className={styles.starnotes}
                            >
                              {list.img_name === '' ||
                              list.img_name === 'default.jpg' ? (
                                <div
                                  className={cx('profile')}
                                  style={{
                                    backgroundColor:
                                      isColor[indexList % isColor.length],
                                  }}
                                >
                                  <Text
                                    color="black"
                                    transform="uppercase"
                                    className={styles.firstlastchar}
                                  >
                                    {`${list?.first_name?.charAt(
                                      0,
                                    )}${list?.last_name?.charAt(0)}`}
                                  </Text>
                                </div>
                              ) : (
                                <img
                                  alt="profile"
                                  height={35}
                                  width={35}
                                  style={{
                                    borderRadius: '100%',
                                    objectFit: 'cover',
                                    marginRight: 8,
                                    height: 35,
                                    width: 35,
                                  }}
                                  src={mediaPath + list.img_name}
                                />
                              )}
                              <Text bold>
                                {list.first_name + ' ' + list.last_name}
                              </Text>
                              <StarsRating
                                value={list.overall_percentage}
                                disabled
                                // onChange={handleStar5}
                                count={5}
                              />
                            </Flex>

                            <Flex row between>
                              <Text
                                color="gray"
                                style={{ marginRight: '10px' }}
                              >
                                {getDateString(list.created_at, 'll')}
                              </Text> 
                              {list.user_id === user ? (
                                <Flex
                                  className={styles.svgEdit}
                                  onClick={() => handleEdit(list)}
                                >
                                  <Svgeditingnotes
                                    height={14}
                                    width={14}
                                    fill={'#581845'}
                                  />
                                </Flex>
                              ) : (
                                <Flex
                                  disabled
                                  className={styles.svgEdit}
                                  // onClick={() => handleEdit(list)}
                                >
                                  <Svgeditingnotes
                                    height={14}
                                    width={14}
                                    fill={'rgb(88 24 69/30%)'}
                                  />
                                </Flex>
                              )}
                            </Flex>
                          </Flex>
                          <Flex
                            className={styles.feedbackcard}
                            style={{
                              flexWrap: 'wrap',
                              overflow: ' hidden',
                              textOverflow: 'clip',
                              fontSize: '13px',
                            }}
                          >
                            <td
                              className={styles.commentTextStyle}
                              dangerouslySetInnerHTML={{
                                __html: list.comments,
                              }}
                            />
                          </Flex>
                        </Flex>
                      </Card>
                    )}
                  </>
                );
              })
              .reverse()}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InterviewScorecardTab;
