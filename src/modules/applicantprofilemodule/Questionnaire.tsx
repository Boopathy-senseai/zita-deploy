import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SvgQuestion from '../../icons/SvgQustionarries';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import styles from './questionnaire.module.css';
import MessageTab from './MessageTab';

type Props = {
  issingletab: boolean;
};
const Questionnaire = ({issingletab}:Props) => {
  const { questionnaire } = useSelector(
    ({ applicantProfileInitalReducers }: RootState) => {
      return {
        questionnaire: applicantProfileInitalReducers.questionnaire,
      };
    },
  );

  return (
    <Flex row> 
    <Flex
    flex={6}
      columnFlex 
      className={styles.overAll}
    >
      {/* {questionnaire && questionnaire.length !== 0 && (
        // <Flex center middle marginTop={200}>
        //   <Flex center middle>
        //     <SvgQuestion fill={'#666666'} width={24} height={24} />
        //   </Flex>
        //   <Flex>
        //     <Text color="gray">No question found for this job</Text>
        //   </Flex>
        // </Flex>
      // ) : (
        <Text bold style={{ marginBottom: '20px' }}>
          Application Question for this job
        </Text>
      )} */}
      {questionnaire &&
        questionnaire.map((list, index) => {
          return (
            <Flex columnFlex key={list.question + index}>
              <Flex row>
                <Text color="theme" className={styles.qustionStyle} style={{ marginRight: 3 }}>
                  {index + 1}:
                </Text>
                <Text color="theme">{list.question}</Text>
              </Flex>
              <Flex className={styles.resStyle} row center>
                {/* <Text bold>Response:</Text> */}

                {list.answer === '0' && <Text>No</Text>}
                {list.answer === '1' && <Text>Yes</Text>}
                {list.answer !== '0' && list.answer !== '1' && (
                  <Text style={{ marginLeft: 5 }}>
                    {isEmpty(list.answer) ? (
                      <Text style={{ color: '#666666' }}>Not Answered</Text>
                    ) : (
                      list.answer
                    )}
                  </Text>
                )}
              </Flex>
            </Flex>
          );
        })}
    </Flex>
    </Flex>
  );
};

export default Questionnaire;
