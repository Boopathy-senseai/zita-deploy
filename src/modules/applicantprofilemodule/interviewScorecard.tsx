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
  NoOfInterview,
  Question,
} from './interviewerQuestionType';
import styles from './interviewscorecardtab.module.css';

interface Props {
  interviews: {
    questions: Question[];
    data: NoOfInterview;
    cumulative: CumulativeData[];
  };
}

const InterviewScorecard: React.FC<Props> = (props) => {
  const { interviews } = props;
  const [isShowFeedback, setFeedbackShow] = useState(false);

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
  };

  return (
    <Flex row between>
      <Flex  flex={1}>
        <Card className={styles.cardStyle}>
          <Flex row between center>
            <Text color='theme' size={13}>
              {`${interviews.data?.event_type} / ${moment(
                interviews.data?.s_time,
              ).format('MMM DD yyyy / HH:mm a - ')} ${moment(
                interviews.data?.e_time,
              ).format(' HH:mm a')} `}
            </Text>
            <Svgeditingnotes fill={'#581845'} />
          </Flex>
          <Flex row between>
            <Flex>
              {interviews &&
                interviews?.cumulative &&
                interviews?.cumulative?.map((doc, index) => {
                  return (
                    <Flex key={index} row marginTop={10}>
                      <Flex row center>
                        <SvgInterviewer width={16} height={16} />
                        <Text style={{ marginLeft: '5px' }}>
                          {doc?.full_name}
                        </Text>
                      </Flex>
                      <Flex row center marginLeft={15}>
                        <SvgQuestion width={16} height={16} />
                        <Text style={{ marginLeft: '5px' }}>
                          {`${doc.question_count} questions`}
                        </Text>
                      </Flex>
                      <Flex row marginLeft={15}>
                        <SvgUserRating width={14} height={14} />
                        <Flex
                          className={styles.ratingStar}
                          marginTop={-32}
                          marginLeft={5}
                        >
                          <StarsRating
                            disabled
                            count={5}
                            value={doc.total_score}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  );
                })}

              <Flex>
                <Flex row center>
                  <Text bold size={13} color="theme">
                    View Comments / Feedback
                  </Text>
                  <Flex
                    marginLeft={5}
                    onClick={() => setFeedbackShow(!isShowFeedback)}
                    style={{cursor:"pointer"}}
                  >
                    <SvgAngle
                      fill={'#581845'}
                      height={12}
                      width={12}
                      up={isShowFeedback}
                    
                    />
                  </Flex>
                </Flex>

                {isShowFeedback &&
                  interviews.cumulative.map((doc, index) => {
                    if (doc.commands !== '' && doc.commands !== null) {
                      return (
                        <Flex key={index} marginBottom={5}>
                          <Flex style={{ color: '#581845' }}>
                            {doc.full_name}
                          </Flex>
                          <Flex>{doc?.commands}</Flex>
                        </Flex>
                      );
                    }
                  })}
              </Flex>
            </Flex>
            <Flex style={{ display: 'flex' }}>
              <Flex center>
                <Flex marginLeft={15} className={styles.OverallScore}>
                  <Flex
                    className={styles.ratingStar}
                    marginTop={-30}
                    marginBottom={-30}
                    marginLeft={5}
                  >
                    <StarsRating disabled count={1} value={1} />
                  </Flex>
                  <Text style={{ marginTop: '2px' }} size={12} color="theme">
                    {`${interviews.cumulative[0].average_score}/5`}
                  </Text>
                </Flex>
                <Text color="theme" style={{ marginTop: '3px' }}>
                  Overall Score
                </Text>
              </Flex>
              <Flex marginTop={10} className={styles.recommended}>
                <Text>
                  {handleRecommendation(interviews.cumulative[0].avg_recommend)}
                </Text>
                <Text color="theme">Recommended</Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default InterviewScorecard;
