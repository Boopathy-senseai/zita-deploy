import { useSelector } from 'react-redux';
import SvgRoundTick from '../../icons/SvgRoundTick';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import styles from './screeningstatustab.module.css';

type Props = {
  title: string;
};
const ScreeningStatusTab = ({ title }: Props) => {
  const { stages } = useSelector(({ applicantStausReducers }: RootState) => {
    return {
      stages: applicantStausReducers?.stages,
    };
  });

  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 230}
    >
      {stages && stages.length === 0 ? (
        <Flex flex={1} center middle>
          <Text color="gray">Not Invited Yet</Text>
        </Flex>)
      : 
          <Flex>
        <Text bold color="theme" className={styles.screenText}>
          {title}
        </Text>
        </Flex>
        
      } 

      {(stages || [])?.map((doc, index) => {
        return (
          <Flex key={index} row center className={styles.statusListStyle}>
            <Flex className={styles.svgFlex}>
              <SvgRoundTick height={30} width={30} fill={"#581845"} />
              {index !== stages?.length - 1 && <div className={styles.vrLine} style={{ borderRightColor: "#581845"}} />}
            </Flex>
            <Text className={styles.statusStyle}>
              {`${doc.stage_id__stage_name} on ${getDateString(doc && doc.created_on, 'll')}`}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default ScreeningStatusTab;
