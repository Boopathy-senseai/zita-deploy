import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';
import classNames from 'classnames/bind';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import SvgUnlockedGreen from '../../icons/SvgUnlockedGreen';
import SvgLock from '../../icons/SvgLock';
import { WHITE } from '../../uikit/Colors/colors';
import SvgUnlock from '../../icons/SvgUnlock';
import SvgDollar from '../../icons/Svgdollar1';
// import SvgJobtitle from '../../icons/SvgJobtitle';
import SvgQualification from '../../icons/qualification1';
import SvgRelocate from '../../icons/Relocate1';
import SvgSalary from '../../icons/Salary1';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import { colorCode } from '../constValue';
import SvgJobtitle from '../../icons/Jobtitle';
import styles from './talentcardlist.module.css';
import { DataEntity } from './talentSourcingTypes';


const cx = classNames.bind(styles);

type Props = {
  talentList: DataEntity;
  index: any;
  handleUnlockSubmit: (arg: string) => void;
  handleClick: (e: { target: { id: string; checked: boolean } }) => void;
  isCheck: DataEntity;
  handleCandidateView: (hashKey: string) => void;
  candi_list?: string[];
 
};

const notSpecified = (value: string, reLocate?: string) => {
  let initialValue;
  if (value === 'not_set' || reLocate === '0' || value === null) {
    initialValue = 'Not Specified';
  } else {
    initialValue = value;
  }
  return initialValue;
};

const TalentCardMap = ({
  talentList,
  index,
  handleUnlockSubmit,
  handleClick,
  isCheck,
  handleCandidateView,
  candi_list,

}: Props) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1250px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 2560px)' });

  const [isColor, setColor] = useState<string[]>([]);
  const [count,setcount]=useState(0)
  const [list,setlist]=useState([])
  useEffect(() => {
    setColor(colorCode);
  }, []);

  useEffect(() => {
  sessionStorage.setItem("index", (index+1));
  }, [index]);
  // const handleloader=(val)=>{
  //   setSubmitLoader();
  //   handleCandidateView(val)
  // }

  // const handlepage=()=>{
  //  setcount(index+1)
  // }
  const checkVist = candi_list?.includes(talentList.id.toString())
    ? true
    : false;
  const sidebar=sessionStorage.getItem("EmpToggle");
  const windowSize = sidebar ==='1'
    ? window.innerWidth / 3.31
    : window.innerWidth /3.76;
    console.log("innerwidth ",window.innerWidth);
    // console.log("innerwidth 1",window.innerWidth / 3 - 130);
    // console.log("innerwidth 2",window.innerWidth / 2 - 186);
    
console.log("sidebar111",windowSize,sidebar)
  return (
    <div
      style={{
        width: isTablet ? '100%' : '31.39%',
        borderRadius: '4px'
      }}
      className={styles.overAll}
    >
      <Card key={talentList.first_name + index} className={cx('cardConatiner')}>
    
        <Flex row top>
          <InputCheckBox
            key={talentList.candidate_hash}
            name={talentList.first_name}
            id={talentList.candidate_hash}
            onChange={handleClick}
            checked={isCheck.includes(talentList.candidate_hash)}
            disabled={checkVist}
          />
         
          <Flex row flex={1}>
            <Flex between row className={cx('profileOverAll')} flex={1}>
              <Flex flex={1}>
                <Flex flex={1} row className={cx('profileContainer')}>
                  <div
                    className={cx('profile')}
                    style={{
                      backgroundColor: isColor[index % isColor.length],
                    }}
                  >
                    <Text size={16} bold color="white" transform="uppercase">
                      {talentList.first_name.charAt(0)}
                    </Text>
                  </div>
                  <Flex flex={1}>
                    <Flex row center>
  
                      <Text
                        bold
                        transform="capitalize"
                        className={styles.pointer}
                        color="link"
                        onClick={() =>
                          handleCandidateView(talentList.candidate_hash)
                        }
                        size={13}
                      >
                        {talentList.first_name} 
                      </Text>
                    </Flex>
                    {talentList.work_experience === 'not_set' ? (
                      <Flex
                        row
                        center
                     
                        // wrap
                      >
                        <Text
                          color="primary"
                          size={11}
                          className={styles.ellipsis}
                          title={`Location: ${talentList.hometown}`}
                        >
                          {talentList.hometown}
                        </Text>
                        <Text
                          color="primary"
                          size={11}
                          style={{ marginLeft: 1, marginRight: 2 }}
                        >
                          {' | '}
                        </Text>
                        <Text color="primary" size={11}    title={`Experience: ${notSpecified(
                          talentList.work_experience
                        )}`}  >{`${notSpecified(
                          talentList.work_experience,
                        )}`}</Text>
                      </Flex>
                    ) : (
                      <>
                        {talentList.work_experience === '0-1' && (
                          <Flex
                            // wrap
                            row
                            center
                           
                          >
                            <Text
                              color="primary"
                              size={11}
                              className={styles.ellipsis}
                              title={`Location: ${talentList.hometown}`}
                            >
                              {talentList.hometown}
                            </Text>
                            <Text
                              color="primary"
                              size={11}
                              style={{ marginLeft: 1, marginRight: 2 }}
                            >
                              {' | '}
                            </Text>
                            <Text color="primary" size={12}  title={`Experience: ${notSpecified(
                              talentList.work_experience,
                            )} Year`} >{`${notSpecified(
                              talentList.work_experience,
                            )} Year`}</Text>
                          </Flex>
                        )}
                        {talentList.work_experience !== '0-1' && (
                          <Flex
                            // wrap
                            row
                            center
                            
                          >
                            <Text
                              color="primary"
                              size={11}
                              className={styles.ellipsis}
                              title={`Location: ${talentList.hometown}`}
                            >
                              {talentList.hometown}
                            </Text>
                            <Text
                              color="primary"
                              size={11}
                              style={{ marginLeft: 1, marginRight: 2 }}
                            >
                              {' | '}
                            </Text>
                            <Text color="primary" size={11} title={`Experience: ${notSpecified(talentList.work_experience)} Years`}>{`${notSpecified(
                              talentList.work_experience,
                            )} Years`}</Text>
                          </Flex>
                        )}
                      </>
                    )}

                    <Flex row center style={{marginBottom:'4px'}}>
                      <Text size={11} color="primary" style={{ marginRight: 2 }}>
                        Last Active:
                      </Text>
                      <Text bold size={11} color="primary">
                        {moment(talentList.updated_on).fromNow()}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                
                <Flex style={{marginLeft:'-5px'}}>
                  <Flex row center className={cx('jobList')}>
                  <Flex style={{marginRight:'1px'}}>
                  <SvgJobtitle fill={'#581845'} width={10} height={10} />
                  </Flex>
                    <Text
                      title={`Job Title: ${notSpecified(talentList.desired_job_title)}`}
                      color="black_1"
                      style={{marginLeft:'3px', marginTop:'4px'}}
                      className={styles.jobTitle}
                      size={11} 
                    >
                      {notSpecified(talentList.desired_job_title)}
                    </Text>
                  </Flex>
                  <Flex row center className={cx('jobList')}>
                  <Flex style={{marginLeft:'-3px'}}>
                  <SvgQualification fill={'#581845'} width={16} height={16} />
                  </Flex>
                    <Text color="black_1" style={{marginLeft:'3px'}}  title={`Qualification: ${notSpecified(talentList.education_level)}`} size={11} >
                      {notSpecified(talentList.education_level)}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex width={0}>
                                              
                <Flex className={styles.relocateContainer}>
                  <Flex row center className={cx('jobList')}>
                  <Flex style={{marginRight:'3px'}}>
                  <SvgRelocate fill={'#581845'} width={14} height={14} />
                  </Flex>
                    {talentList.relocate === '1' ? (
                      <Text color="black_1" title={' Willing to Relocate: Yes'}  size={11} style={{marginTop:'3px'}}>Yes</Text>
                    ) : (
                      <Text color="black_1" style={{marginTop:'3px'}} title={' Willing to Relocate: Not Specified'} size={11} >
                        {notSpecified(talentList.relocate, talentList.relocate)}
                      </Text>
                    )}
                  </Flex>
                  <Flex row center className={cx('jobList')}>
                  <Flex style={{marginRight:'3px'}}>
                  <SvgDollar fill={'#581845'} width={14} height={14} />
                  </Flex>
                    {talentList.min_salary === 'Not Specified' &&
                    talentList.max_salary === 'Not Specified' ? (
                      <Text color="black_1" title={'Salary: Not Specified'} size={11}  className={styles.jobTitle1} >{talentList.min_salary} </Text>
                    ) : (
                      <Text color="black_1"  size={11}  title={` Salary: ${talentList.min_salary} - ${talentList.max_salary}`} className={styles.jobTitle1} >
                        ${talentList.min_salary} - ${talentList.max_salary}
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </Flex>
   
              <div className={styles.line} style={{ marginRight: checkVist?'22px':'18px'}}></div>
              <Flex style={{marginTop:'30px',marginRight: checkVist?'17px':'25px',marginLeft:checkVist?'0px':'10px'}} >
              <Flex  width={'113%'} >
              {!checkVist ? (
                <Flex style={{marginLeft:'3px',cursor:checkVist ?'default':'pointer' }}
                onClick={() => handleUnlockSubmit(talentList.candidate_hash)}
                >
                <SvgLock fill={'#581845'} width={24} height={24} />
                </Flex>
              ) : (
                <div style={{marginLeft:'11px'}}
                >
                {/* <SvgUnlock fill={'#7ad47e'} width={24} height={24} /> */}
                <SvgUnlockedGreen viewBox="0 0 24 24" width={21} height={21} />
                </div>
                
              )}
              <Text bold  size={11} title={checkVist ? 'Unlocked Contact' : 'Unlock Contact'} 
               style={{ marginLeft: '-5px', color:checkVist ?'black':'#581845',fontSize:'12px',cursor:checkVist ?'default':'pointer' }} 
               onClick={() => handleUnlockSubmit(talentList.candidate_hash)}>
                {checkVist ? 'Unlocked' : 'Unlock'}
              </Text>
            </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default TalentCardMap;
