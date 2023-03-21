// import moment from 'moment';
// import {useEffect} from 'react';
// import { useSelector,useDispatch } from 'react-redux';
// import { AppDispatch,RootState } from '../../store';
// import Card from '../../uikit/Card/Card';
// import Flex from '../../uikit/Flex/Flex';
// import Text from '../../uikit/Text';
// import SvgMessage from '../../icons/SvgMessage';
// import SvgChat from '../../icons/SvgChat';
// import { PRIMARY } from '../../uikit/Colors/colors';
// import { mediaPath } from '../constValue';

// import {messageEntity} from './messageTypes';
// import { testMiddleware } from './store/testMiddleware';
// import styles from './testScreen.module.css';
// const TestScreen = () => {
//     const { message, message_count } = useSelector(
//         ({messageReducers} : RootState) => {
//             return {
//                 message : messageReducers.message,
//                 message_count : messageReducers.message_count,
//             }
//         }
//     )
//     console.log(message_count);
//     const unique: messageEntity[] = [];
//     message.map((x) =>
//       unique.filter((a: any) => a.jd === x.jd).length > 0
//         ? null
//         : unique.push(x),
//     );
//     const dispatch: AppDispatch = useDispatch();
//     useEffect(() => {
//         dispatch(testMiddleware());
//     }, []);
//     return(
//         <Flex row>
//             <Flex flex={6}>
//                 <Card className={styles.card}>
//                     <Flex>
//                         <Flex row center className={styles.msgText}>
//                         <Flex>
//                             <Text bold color="theme" style={{ marginRight: 16 }}>
//                                 Messages
//                             </Text>            
//                         </Flex>
//                         <Flex>
//                             <SvgMessage fill={PRIMARY} />
//                         </Flex>
//                         </Flex>
//                         <Flex columnFlex>
//                             {message.length === 0 ? (
//                                 <Flex columnFlex flex={1} center middle >
//                                     <SvgChat />
//                                     <Text color="gray">No message recieved</Text>
//                                 </Flex>
//                             ) : (
//                                 unique && unique.map((list,index) => (
//                                     <Card key={index} className={styles.mesgListCard}>
//                                         <Flex row between>
//                                             <Flex flex={1}>
//                                                 <img
//                                                     style={{ objectFit: 'contain' }}
//                                                     src={mediaPath + list.profile_pic}
//                                                     alt="profile"
//                                                     className={styles.profileStyle}
//                                                 />
//                                             </Flex>
//                                             <Flex flex={4}>
//                                                 <Text color="link" bold>
//                                                     {list.first_name} { list.last_name}
//                                                 </Text>
//                                                 <Text style={{ marginTop: 4 }}>{list.message}</Text>
//                                             </Flex>
//                                             <Flex flex={1}>
//                                                 <Text>{moment(list.date_created).fromNow()}</Text>
//                                             </Flex>
//                                         </Flex>
//                                     </Card>
//                                 )).reverse()
//                             )}
//                         </Flex>
//                     </Flex>
//                 </Card>
//             </Flex>
//             <Flex flex={6}>
//                     <br></br>
//             </Flex>
//         </Flex>
//     )
// }
// export default TestScreen;
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
// import format from 'date-fns/format'
// import parse from 'date-fns/parse'
// import startOfWeek from 'date-fns/startOfWeek'
// import getDay from 'date-fns/getDay'
// import enUS from 'date-fns/locale/en-US'

// const locales = {
//   'en-US': enUS,
// }

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// })

import SvgTrash from '../../icons/SvgTrash';
import SvgView from '../../icons/SvgView';
import SvgMail from '../../icons/SvgMail';
import { LINK } from '../../uikit/Colors/colors';

const TestScreen = () => (
  <div>
    <SvgTrash fill={LINK} width={20} height={20} />
    <SvgView fill={LINK} width={20} height={20} />
    <SvgMail fill={LINK} width={20} height={20} />
     {/* <Calendar
       localizer={localizer}
       events={myEventsList}
       startAccessor="start"
       endAccessor="end"
       style={{ height: 500 }}
     /> */}
  </div>
)
export default TestScreen;
{/* <Flex row>
                        <Flex>Schedule Meeting</Flex>
                        <Flex onClick={openForm} end ><SvgCloseSmall /></Flex>
                    </Flex>
                    <Flex row className={styles.info}>
                        <Flex column>
                            <LabelWrapper label="Candidate" required />
                            <SelectTag labelBold options={options}/>
                        </Flex>
                        <Flex column>
                            <LabelWrapper label="Job" required />
                            <SelectTag labelBold options={options}/>
                        </Flex>
                    </Flex>
                    <Flex row className={styles.info}>
                        <Flex column>
                            <LabelWrapper label="Date" required />
                            <SelectTag labelBold options={options}/>
                        </Flex>
                        <Flex column>
                            <LabelWrapper label="Time" required />
                            <SelectTag labelBold options={options}/>
                        </Flex>
                    </Flex>
                    <Flex row className={styles.info}>
                        <Flex column>
                            <LabelWrapper label="Duration" required />
                            <SelectTag labelBold options={options}/>
                        </Flex>
                        <Flex column>
                            <LabelWrapper label="Choose your Timezone" required />
                            <SelectTag labelBold options={options}/>
                        </Flex>
                    </Flex>
                    <Flex row className={styles.info}>
                        <Flex column>
                            <LabelWrapper label="Event Type" required />
                            <SelectTag labelBold options={options}/>
                        </Flex>
                        <Flex column>
                            <Text>Interviewers</Text>
                            <SvgAdd />
                        </Flex>
                    </Flex>
                    <Flex row center middle className={styles.btnContainer}>
                        <Button onClick={openForm}>Close</Button>
                    </Flex> */}