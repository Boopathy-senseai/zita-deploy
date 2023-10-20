import StarsRating from 'react-star-rate';
import moment from 'moment';
import Svgeditingnotes from '../../icons/editingnotes';
import SvgInterviewer from '../../icons/SvgInterviewer';
import SvgQuestion from '../../icons/SvgQuestion';
import SvgUserRating from '../../icons/SvgUserRating';
import { Card, Flex } from '../../uikit';
import Text from '../../uikit/Text/Text';

import styles from './interviewscorecardtab.module.css';
import {
  CumulativeData,
  NoOfInterview,
  Question,
} from './interviewerQuestionType';

interface Props {
  interviews: {
    questions: Question[];
    data: NoOfInterview;
    cumulative: CumulativeData[];
  };
}

const InterviewScorecard: React.FC<Props> = (props) => {
  const { interviews } = props;
  return (
    <Flex row between>
      <Flex marginTop={10} flex={6}>
        <Card className={styles.cardStyle}>
          <Flex row between center>
            <Text bold size={13}>
              {`${interviews.data?.event_type} on ${moment(
                interviews.data?.s_time,
              ).format('MMM DD yyyy ( HH:mm a - ')} ${moment(
                interviews.data?.e_time,
              ).format(' HH:mm a')}) `}
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
                          {doc.question_count}
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
                <Text bold size={13} color="theme">
                  View comments/Feedback
                </Text>

                {interviews.cumulative.map((doc, index) => {
                  return (
                    <Flex key={index}>
                      <Flex>{doc.full_name}</Flex>
                      <Flex>{doc?.commands}</Flex>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
            <Flex>
              <Flex>
                <Text>{interviews.cumulative[0].total_score}</Text>
                <Text>Overall Score</Text>
              </Flex>
              <Flex>
                <Text>{interviews.cumulative[0].avg_recommend}</Text>
                <Text>Recommended</Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default InterviewScorecard;
