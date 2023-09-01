import { useSelector } from 'react-redux';
import SvgRoundTick from '../../icons/SvgRoundTick';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import styles from './screeningstatustab.module.css';
import InterviewScorecardTab from './InterviewScorecardTab';

type Props = {
  title: string;
  issingletab: boolean;
};
const ScreeningStatusTab = ({ title, issingletab }: Props) => {
  const { stages, invite } = useSelector(
    ({ applicantStausReducers }: RootState) => {
      return {
        stages: applicantStausReducers?.stages,
        invite: applicantStausReducers?.invite,
      };
    },
  );
console.log(invite,'ffffffffffffffffffffffffff')
  return (
    <Flex row flex={12}>
      <Flex
        flex={6}
        columnFlex
        className={styles.overAll}
        height={window.innerHeight - 120}
      >
        {stages && stages.length === 0 &&invite && invite.length === 0  ? (
          <Flex flex={1} center middle>
            <Text color="gray">Not Invited Yet</Text>
          </Flex>
        ) : (
          <Text bold color="theme" className={styles.screenText}>
            {title}
          </Text>
        )}

        {(stages || [])
          ?.map((doc, index) => {
            return (
              <Flex key={index} row center className={styles.statusListStyle}>
                <Flex className={styles.svgFlex}>
                  <SvgRoundTick height={30} width={30} fill={'#581845'} />
                  {index !== stages?.length - 1 && (
                    <div
                      className={styles.vrLine}
                      style={{ borderRightColor: '#581845' }}
                    />
                  )}
                </Flex>
                <Text className={styles.statusStyle}>
                  {doc.stage_id__stage_name} on{' '}
                  {getDateString(doc && doc.created_on, 'll')}
                </Text>
              </Flex>
            );
          })
          .reverse()}
          {/* {
            invite.length !==0 && stages.length !== 0 &&
            <Flex 
            className={styles.vrLin}
            style={{ borderRightColor: '#581845' }}
          />
          }
           */}
        {invite && invite.length === 1 && invite[0].is_interested !== null
           &&
            
              <Flex   row center className={styles.statusListStyle}>
                <Flex className={styles.svgFlex}>
                  <SvgRoundTick height={30} width={30} fill={'#581845'} />
                 {stages.length !== 0 && ( 
                    <div
                      className={styles.vrLines}
                      style={{ borderRightColor: '#581845' }}
                    />
                  )}  
                </Flex>
                <Text className={styles.statusStyle}> {  invite[0].is_interested === true
                    ? 'Candidate responded as "Interested"'
                    : '' || invite[0].is_interested === false
                    ? 'Candidate responded as "Not Interested"'
                    : ''}{' '}
                  on {getDateString(invite&& invite[0]?.responded_date, 'll')}
                </Text>
              </Flex>
            
          }
          {invite && invite.length === 1
           &&
            
              <Flex   row center className={styles.statusListStyle}>
                <Flex className={styles.svgFlex}>
                  <SvgRoundTick height={30} width={30} fill={'#581845'} />
                 {invite[0].is_interested !== null  && ( 
                    <div
                      className={styles.vrLines}
                      style={{ borderRightColor: '#581845' }}
                    />
                  )}  
                </Flex>
                <Text className={styles.statusStyle}> 
                     Invited on {getDateString(invite&& invite[0].created_at, 'll')}
                </Text>
              </Flex>
            
          } 
      </Flex>
      {!issingletab && (
        <Flex
          height={window.innerHeight - 115}
          style={{
            border: '1px solid #C3C3C3',
            width: '1px',
            margin: '15px 5px 10px 5px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        ></Flex>
      )}
      {!issingletab && (
        <Flex flex={6.4}>
          <InterviewScorecardTab />
        </Flex>
      )}
    </Flex>
  );
};

export default ScreeningStatusTab;
