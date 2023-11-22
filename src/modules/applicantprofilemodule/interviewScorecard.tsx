import StarsRating from 'react-star-rate';
import moment from 'moment';
import { useState } from 'react';
import Svgeditingnotes from '../../icons/editingnotes';
import SvgInterviewer from '../../icons/SvgInterviewer';
import SvgQuestion from '../../icons/SvgQuestion';
import SvgUserRating from '../../icons/SvgUserRating';
import { Card, Flex } from '../../uikit';
import Text from '../../uikit/Text/Text';

import SvgAdd from '../../icons/SvgAdd';
import SvgThumbsup from '../../icons/Svgthumbsup';
import SvgThumbsdown from '../../icons/Svgthumbsdown';
import SvgThumbsneutral from '../../icons/SvgthumbsNeutral';
import SvgAngle from '../../icons/SvgAngle';
import { formatTo12HrClock } from '../calendarModule/util';
import {
  CumulativeData,
  InterviewExtractData,
  NoOfInterview,
  Question,
} from './interviewerQuestionType';
import styles from './interviewscorecardtab.module.css';

type Props = {
  interviews?: InterviewExtractData;
  onEvaluate?: (id: number, value: Question[]) => void;
  cumulative?: any;
  no_of_interview?: any;
  datas?: any;
  UpdateEvaluate: (val: any) => void;
  user?: any;
}

const InterviewScorecard = ({ interviews, onEvaluate, cumulative, no_of_interview, datas, UpdateEvaluate, user }: Props) => {
  const [isShowFeedback, setFeedbackShow] = useState<any>([]);

  //onclick the icon for  editing the interview question.
  const handleEdit = (interview_id) => {
    const mydata = datas?.find((id) => (id?.Id === interview_id))
    const allQuestions = mydata?.Question?.flatMap((category) =>
      category?.Value?.flatMap((level) => level["Map_question"])
    );
    const filteredQuestions = allQuestions?.filter((question) => question.scorecard !== null);
    UpdateEvaluate(filteredQuestions)
    onEvaluate(interview_id, filteredQuestions);
  };

  //handling the up and down arrow for viewing the feedback.
  const handlefeedback = (e) => {
    setFeedbackShow((prevId) =>
      prevId.includes(e)
        ? prevId.filter((prevIds) => prevIds !== e)
        : [...prevId, e]
    );
  }

  //Handle thumbs based on the average value.
  const handleRecommendation = (avg_recommend: number) => {
    const value =
      avg_recommend && avg_recommend !== 0 && Math.round(avg_recommend);
    if (value === 1) {
      return <SvgThumbsdown />;
    }
    if (value === 2) {
      return <SvgThumbsneutral />;
    }
    if (value === 3) {
      return <SvgThumbsup />;
    }
    return null;
  };
  if (cumulative.length !== 0) {


    const transformedData = cumulative.reduce((result, item) => {
      const existingInterview = result.find(interview => interview.interview_id === item.interview_id);
    
      if (item.total_score !== null) {
        if (!existingInterview) {
          result.push({
            interview_id: item.interview_id,
            overall_score: item.total_score,
            overall_recommend: item.avg_recommend,
            attendees: [{
              first_name: item.first_name,
              last_name: item.last_name,
              question_count: item.question_count,
              total_score: item.total_score,
              scored_question: item.scored_question,
              full_name: item.full_name,
              average_score: item.average_score,
              avg_recommend: item.avg_recommend,
              attendee: item.attendees
            }],
            commands: [{
              full_name: item.full_name,
              commenddd: item.commands,
            }],
          });
        } else {
          existingInterview.overall_score += item.total_score;
          existingInterview.overall_recommend += item.avg_recommend;
          
          if (item.total_score !== null) {
            existingInterview.attendees.push({
              first_name: item.first_name,
              last_name: item.last_name,
              question_count: item.question_count,
              total_score: item.total_score,
              scored_question: item.scored_question,
              full_name: item.full_name,
              average_score: item.average_score,
              avg_recommend: item.avg_recommend,
              attendee: item.attendees,
            });
          }
          existingInterview.commands.push({
            full_name: item.full_name,
            commenddd: item.commands,
          });
        }
      }
      return result;
    }, []);
    return (
      <Flex row between>
        <Flex flex={1} height={window.innerHeight - 220} style={{ overflowY: 'scroll', display: 'flex' }}>
          {transformedData?.map((doc, index) => {
            const scoredata = no_of_interview.map((id) => (id.id))
            if (scoredata.includes(doc.interview_id) && doc.overall_score !== null && doc.overall_score !== 0) {
              if (doc.total_score !== null && doc.total_score !== 0) {
                const header = no_of_interview.find((d) => (d.id === doc.interview_id))
                return (
                  <Card className={styles.cardStyle}>
                    <Flex row between center>
                      <Text color="theme" size={13}>{`${header.event_type
                        } / ${moment(
                          header?.s_time,
                        ).format('MMM DD yyyy')} / ${formatTo12HrClock(
                          header?.s_time,
                        )} - ${formatTo12HrClock(header?.e_time)}`}</Text>
                      {doc.attendees?.filter(info => info?.total_score !== null)?.map((e) => (e.attendee)).includes(user.toString()) ?
                        <Flex onClick={() => handleEdit(doc.interview_id)} style={{ cursor: 'pointer' }} title='Edit scorecard'>
                          <Svgeditingnotes fill={'#581845'} />
                        </Flex> :
                        <Flex >
                          <Svgeditingnotes fill={'rgb(88 24 69/50%)'} />
                        </Flex>
                      }
                    </Flex>
                    <Flex row style={{ padding: '10px 0px' }}>
                      <Flex
                        style={{ display: 'flex', borderRight: '0.5px solid #c3c3c3' }}
                        marginRight={10}
                      >
                        <Flex center middle marginRight={10} >
                          <Flex
                            marginLeft={15}
                            marginRight={10}
                            className={styles.OverallScore}
                          >
                            <Flex
                              className={styles.ratingStar}
                              marginTop={-30}
                              marginBottom={-15}
                              marginLeft={5}
                            >
                              <StarsRating disabled count={1} value={1} />
                            </Flex>
                            {console.log("docdocdoc",doc)}
                            <Text style={{ marginTop: '2px' }} size={12} color="theme">
                              {`${Math.round(doc?.overall_score / doc?.attendees?.length) || 0}/5`}
                            </Text>
                          </Flex>
                          <Text color="theme" style={{ marginTop: '3px' }}>
                            Overall Score
                          </Text>
                        </Flex>
                        <Flex
                          marginTop={10}
                          marginRight={10}
                          className={styles.recommended}
                        >
                          <Text style={{ marginRight: '5px' }}>
                            {handleRecommendation(doc?.overall_recommend)}
                          </Text>
                          {doc?.overall_recommend !== null && (
                            <Text color="theme">Recommended</Text>
                          )}
                        </Flex>
                      </Flex>
                      <Flex width={'100%'}>
                        {doc.attendees
                          ?.filter(info => info?.total_score !== null)
                          .map((info, i) => {
                            return (
                              <>
                                <Flex key={i} row marginTop={10} between>
                                  <Flex row>
                                    <Flex row center>
                                      <Text title="Interviewer">
                                        <SvgInterviewer width={16} height={16} />
                                      </Text>

                                      <Text style={{ marginLeft: '5px' }} className={styles.changingtexts} title={info?.full_name}>
                                        {info?.full_name}
                                      </Text>
                                    </Flex>
                                    <Flex row center marginLeft={15}>
                                      <Text title="Question count">
                                        <SvgQuestion width={16} height={16} />
                                      </Text>

                                      <Text style={{ marginLeft: '5px' }}>
                                        {`${info?.question_count} questions`}
                                      </Text>
                                    </Flex>
                                  </Flex>
                                  <Flex row marginLeft={15}>
                                    <Text title="Average Rating">
                                      <SvgUserRating width={16} height={16} />
                                    </Text>
                                    <Flex
                                      className={styles.ratingStar}
                                      marginTop={-29}
                                      marginLeft={5}
                                    >
                                      <StarsRating
                                        disabled
                                        count={5}
                                        value={info?.total_score}
                                      />
                                    </Flex>
                                  </Flex>
                                </Flex>
                              </>
                            )
                          })}
                        <Flex>
                          <Flex row center>
                            <Text bold size={13} color="theme">
                              View Comments / Feedback
                            </Text>
                            <Flex
                              marginLeft={5}
                              onClick={() => handlefeedback(doc.interview_id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <SvgAngle
                                fill={'#581845'}
                                height={12}
                                width={12}
                                up={isShowFeedback?.includes(doc.interview_id)}
                              />
                            </Flex>
                          </Flex>
                          {isShowFeedback.includes(doc.interview_id) &&
                            doc.commands?.map((val, ids) => {
                              if (val?.commenddd !== null) {
                                return (
                                  <>
                                    <Flex marginBottom={5}>
                                      <Flex row center between>
                                        <Flex style={{ color: '#581845' }}>
                                          {val.full_name}
                                        </Flex>
                                        {/* <Svgeditingnotes fill="#581845" /> */}
                                      </Flex>

                                      <Flex>
                                        <td
                                          className={styles.commentTextStyle}
                                          dangerouslySetInnerHTML={{
                                            __html: val?.commenddd,
                                          }}
                                        />
                                      </Flex>
                                    </Flex>
                                  </>
                                )
                              }
                            })
                          }
                        </Flex>
                      </Flex>
                    </Flex>
                  </Card>
                );
              }
            }
          })}
        </Flex>
      </Flex>
    );
  }
  return null;
};

export default InterviewScorecard;
