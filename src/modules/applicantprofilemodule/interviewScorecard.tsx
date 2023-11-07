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
}

const InterviewScorecard = ({ interviews, onEvaluate, cumulative, no_of_interview }: Props) => {
  console.log(cumulative, no_of_interview, 'no_of_interviewno_of_interviewno_of_interviewno_of_interview')
  const [isShowFeedback, setFeedbackShow] = useState(false);
  const firstCummulative = cumulative[0] || undefined;

  const getCheckedQuestions = () =>
    interviews.questions.filter((doc) => doc.is_active || false) || [];

  const handleEdit = () => {
    // onEvaluate(interviews?.data?.id, getCheckedQuestions());
  };

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

    return (
      <Flex row between>
        <Flex flex={1}>
          {cumulative?.map((doc, index) => {
            const scoredata = no_of_interview.map((id) => (id.id))
            if (scoredata.includes(doc.interview_id)) {
              if (doc.total_score !== null && doc.total_score !== 0) {
                const header = no_of_interview.find((d) => (d.id === doc.interview_id))
                return (
                  <Card className={styles.cardStyle}>
                    <Flex row between center>
                      <Text color="theme" size={13}>
                {`${header.event_type} / ${moment(
                  header?.s_time,
                ).format('MMM DD yyyy / HH:mm a - ')} ${moment(
                  header?.e_time,
                ).format(' HH:mm a')} `}
              </Text>
                      <Flex onClick={handleEdit} style={{ cursor: 'pointer' }}>
                        <Svgeditingnotes fill={'#581845'} />
                      </Flex>
                    </Flex>
                    <Flex row style={{ padding: '10px 0px' }}>
                      <Flex
                        style={{ display: 'flex', borderRight: '0.5px solid #c3c3c3' }}
                        marginRight={10}
                      >
                        <Flex center>
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
                            <Text style={{ marginTop: '2px' }} size={12} color="theme">
                              {`${Math.round(firstCummulative?.average_score) || 0}/5`}
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
                          <Text>
                            {handleRecommendation(doc?.avg_recommend)}
                          </Text>
                          {firstCummulative?.avg_recommend && (
                            <Text color="theme">Recommended</Text>
                          )}
                        </Flex>
                      </Flex>
                      <Flex width={'100%'}>

                        <Flex key={index} row marginTop={10}>
                          <Flex row center>
                            <Text title="Interviewer">
                              <SvgInterviewer width={16} height={16} />
                            </Text>

                            <Text style={{ marginLeft: '5px' }}>
                              {doc?.full_name}
                            </Text>
                          </Flex>
                          <Flex row center marginLeft={15}>
                            <Text title="Question count">
                              <SvgQuestion width={16} height={16} />
                            </Text>

                            <Text style={{ marginLeft: '5px' }}>
                              {`${doc?.question_count} questions`}
                            </Text>
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
                                value={doc?.total_score}
                              />
                            </Flex>
                          </Flex>
                        </Flex>


                        <Flex>
                          <Flex row center>
                            <Text bold size={13} color="theme">
                              View Comments / Feedback
                            </Text>
                            <Flex
                              marginLeft={5}
                              onClick={() => setFeedbackShow(!isShowFeedback)}
                              style={{ cursor: 'pointer' }}
                            >
                              <SvgAngle
                                fill={'#581845'}
                                height={12}
                                width={12}
                                up={isShowFeedback}
                              />
                            </Flex>
                          </Flex>

                          {/* {isShowFeedback &&
                            cumulative?.map((doc1, ind) => {
                              if (doc1.commands !== '' && doc1.commands !== null) {
                                return ( */}
                                  <Flex marginBottom={5}>
                                    <Flex row center between>
                                      <Flex style={{ color: '#581845' }}>
                                        {doc.full_name}
                                      </Flex>
                                      {/* <Svgeditingnotes fill="#581845" /> */}
                                    </Flex>

                                    <Flex>
                                      <td
                                        className={styles.commentTextStyle}
                                        dangerouslySetInnerHTML={{
                                          __html: doc?.commands,
                                        }}
                                      />
                                    </Flex>
                                  </Flex>
                                {/* );
                              }
                            })} */}
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
