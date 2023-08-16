import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import StarRatingComponent from 'react-star-rating-component';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
import parse from 'html-react-parser';
import classNames from 'classnames/bind';
import ReactQuill from 'react-quill';
import Loader from '../../uikit/Loader/Loader';
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
import { CANCEL, config, mediaPath, mentionnotes, mentionspecialcharacter } from '../constValue';
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
  const [opencomment, setopencomment] = useState(true);
  const [isColor, setColor] = useState<string[]>([]);

  const [getId, setGetId] = useState(0);
  const [isStar, setStar] = useState<any>('Very Poor');
  const { can_id, jd_id, interview } = useSelector(
    ({
      applicantProfileInitalReducers,
      applicantScoreReducers,
      applicantUserlistReducer,
    }: RootState) => {
      return {
        can_id: applicantProfileInitalReducers.can_id,
        jd_id: applicantProfileInitalReducers.jd_id,
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

  // rating start condition
  // useEffect(() => {
  //   if (rating === null) {
  //     setStar('Very Poor');
  //   } else if (rating.toString() === '1') {
  //     setStar('Very Poor');
  //   } else if (rating.toString() === '2') {
  //     setStar('Poor');
  //   } else if (rating.toString() === '3') {
  //     setStar('Average');
  //   } else if (rating.toString() === '4') {
  //     setStar('Good');
  //   } else if (rating.toString() === '5') {
  //     setStar('Excellent');
  //   }
  // });
  // feedback form submit

  // useEffect(() => {

  // });

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
    if (buttonName === 'Add') {
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
      formik.resetForm();
      formik.setFieldValue('userMessage', '');
      setopencomment(true);
    }
    if (buttonName === 'Update') {
      setPostLoader(true);
      const data = querystring.stringify({
        jd_id,
        can_id,
        rating,
        id: getId,
        edit: true,
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
      formik.setFieldValue('userMessage', '');
      setopencomment(true);
    }
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
    if(isEmpty(texttrim)) {
      errors.userMessage = 'Enter valid notes.';
    }
    if (texttrim === '') {
      errors.userMessage = '';
    }
    else if (!mentionnotes.test(textNodes)&&
    mentionspecialcharacter.test(textNodes)) {
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
    setopencomment(false);
    setGetId(e.id);
    setOpen(false);
    formik.setFieldValue('userMessage', e.comments);
    // setOpen(false);
  };
  const handleCancel = () => {
    setButtonName('Add');
    if (isEmpty(interview && interview[0].comments)) {
      setOpen(true);
      formik.setFieldValue('userMessage', '');
    }
    if (!isEmpty(interview && interview[0].comments)) {
      setOpen(false);
    }
    setopencomment(true);
    formik.resetForm();
  };
  const hanldeInputOpen = () => {
    setButtonName('Add');
    formik.resetForm();
    formik.setFieldValue('userMessage', '');
    setopencomment(false);
  };

  const onStarClick = { setRating };

  const onstarclicking = (e) => { 
    setRating(e);
    const data = querystring.stringify({
      jd_id,
      can_id,
      rating: e,
      Comments: '',
    });
    axios.post(InterviewScorecardApi, data, config).then(() => {
      setOpen(false);
      dispatch(applicantScoreMiddleWare({ jd_id, can_id }));
    });
  };
  //

  return (
    <Flex columnFlex className={styles.overAll} >
      <Text bold style={{ fontSize: '14px',padding: '13px 0px 0px 16px'  }}>
      Interview Scorecard
      </Text>
      <Flex column center middle style={{ padding: '0px 16px 0px 16px' }}>
        <Flex>
          <Text className={styles.addText}>
            You can add the interview rating and comment here for the applicant
          </Text>
        </Flex>
        <Flex center middle>
          <StarRatingComponent
            className={styles.starstyle}
            name="rate1"
            starCount={5}
            value={rating}
            onStarClick={onstarclicking}
          />
        </Flex>
      </Flex>
      <Text style={{ padding: '0px 16px 0px 16px' }} bold>
        Comments/Feedback:
      </Text>
      <Flex  height={window.innerHeight - 241}
        style={{
          overflow: 'scroll',
          display: 'flex',
        }}>
      <Flex
        className={styles.inputContainer}
        style={{ padding: '16px 16px 0px 16px' }}
      >
        {opencomment && (
          <input
            className={styles.initialbuttons}
            onClick={hanldeInputOpen}
            placeholder="Add Your comments here"
          />
        )}
        {!opencomment && (
          <Flex>
            <div className={styles.textArea}>
              <ReactQuill
                // ref={editorRef}
                value={formik.values.userMessage}
                className={styles.reactquillchange}
                onChange={formik.handleChange('userMessage')}
                placeholder="Add Your comments here"
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

              <Button className={styles.addBtn} onClick={formik.handleSubmit}>
                {buttonName}
              </Button>

              {isPostLoader && (
                <div style={{ marginLeft: 8 }}>
                  <Loader withOutOverlay size="small" />
                </div>
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex
       style={{ padding: ' 0px 16px 10px 16px'}}
        marginTop={10}
      >
        {interview &&
          interview.map((list, indexList) => {
            return (
              <>
                {list.comments !== null && list.comments !== '' && (
                  <Card key={list.comments} className={styles.feedbackstyle}>
                    <Flex className={styles.borderStyle}>
                      <Flex row center between className={styles.dateStyle}>
                        <Flex row between center>
                          {console.log(list,'lllllllllllllllllllllllllllllllllllll')}
                          {list.img_name === '' ? (
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
                              { 
                                `${list?.first_name?.charAt(0)}${list?.last_name?.charAt(0)}`
                              } 
                              </Text>
                            </div>
                          ) : (
                            <img
                              alt="profile"
                              height={30}
                              width={30}
                              style={{
                                borderRadius: '100%',
                                objectFit: 'cover',
                                marginRight: 8,
                                height: 40,
                                width: 40,
                              }}
                              src={mediaPath + list.img_name}
                            />
                          )}
                          <Text bold>
                            {list.first_name + ' ' + list.last_name}
                          </Text>
                        </Flex>
                        <Flex row between>
                          <Text color="gray" style={{ marginRight: '10px' }}>
                            {getDateString(list.created_at, 'll')}
                          </Text>
                          <div
                            tabIndex={-1}
                            role={'button'}
                            onKeyPress={() => {}}
                            className={styles.svgEdit}
                            onClick={() => handleEdit(list)}
                          >
                            <Svgeditingnotes
                              height={14}
                              width={14}
                              fill={'#581845'}
                            />
                          </div>
                        </Flex>
                      </Flex>
                      <Flex  className={styles.feedbackcard} style={{ 
                                flexWrap: 'wrap',
                                overflow: ' hidden',
                                textOverflow: 'clip',
                              }}>
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
          })}
      </Flex>
      </Flex>
    </Flex>
  );
};

export default InterviewScorecardTab;
