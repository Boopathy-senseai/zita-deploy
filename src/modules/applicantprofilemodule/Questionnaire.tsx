import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import styles from './questionnaire.module.css';

const Questionnaire = () => {
  const { questionnaire } = useSelector(
    ({ applicantProfileInitalReducers }: RootState) => {
      return {
        questionnaire: applicantProfileInitalReducers.questionnaire,
      };
    },
  );

  return (
    <Flex
      columnFlex
      height={window.innerHeight - 230}
      className={styles.overAll}
    >
      {questionnaire && questionnaire.length === 0 ? (
        <Flex flex={1} center middle>
          <Text color="gray">No questions available for this job</Text>
        </Flex>
      ) : (
        <Text bold color="theme">
          Applicant Response for Questionnaire
        </Text>
      )}
      {questionnaire &&
        questionnaire.map((list, index) => {
          return (
            <Flex columnFlex key={list.question + index}>
              <Text textStyle="underline" bold className={styles.qustionStyle}>
                Question {index + 1}:
              </Text>
              <Text>{list.question}</Text>

              <Flex className={styles.resStyle} row center>
                <Text bold>Response:</Text>

                {list.answer === '0' && (
                  <Text style={{ marginLeft: 2 }}>No</Text>
                )}
                {list.answer === '1' && (
                  <Text style={{ marginLeft: 2 }}>Yes</Text>
                )}
                {list.answer !== '0' && list.answer !== '1' && (
                  <Text style={{ marginLeft: 2 }}>
                    {isEmpty(list.answer) ? 'Not Answered' : list.answer}
                  </Text>
                )}
              </Flex>
            </Flex>
          );
        })}
    </Flex>
  );
};

export default Questionnaire;
