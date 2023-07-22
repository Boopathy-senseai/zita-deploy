// import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  useDispatch,
  // useSelector
} from 'react-redux';
import SvgGmail from '../../../icons/SvgGmail';
import SvgEdit from '../../../icons/SvgEdit';
import SvgTick from '../../../icons/SvgTick';
import SvgOutlook from '../../../icons/SvgOutlook';
import SvgClose from '../../../icons/SvgClose';
import SvgOutlookcalendar from '../../../icons/SvgOutlookcalendar';
import SvgGooglecalendar from '../../../icons/SvgGooglecalendar';
import {
  AppDispatch,
  //  RootState
} from '../../../store';
import {
  Button,
  Card,
  Flex,
  InputRadio,
  LinkWrapper,
  Loader,
  Modal,
  Text,
  Toast,
} from '../../../uikit';
// import { isEmpty } from '../../../uikit/helper';
// import Toast from '../../../uikit/Toast/Toast';
// import { config } from '../../constValue';
import {
  // addOauthMiddleware,
  outlookCallApiMiddleware,
  checkAuthMiddleware,
  googleCallApiMiddleware,
} from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import SvgAddToCalendar from '../../../icons/SvgAddToCalendar';
import SvgConflicts from '../../../icons/SvgConflicts';
import styles from './calendarconfig.module.css';


const CalenderConfig  = () =>{

return(
    <>
    <div className={styles.modalwidth}>
    <Flex row between> 
    <SvgConflicts height={20} width={20} /> 
    <Text>Check for Conflicts</Text> 
    <Text>Set the calendar(s) to check for conflicts to prevent double bookings.</Text>    
    </Flex> 
    <CheckForConflicts/>

    <Flex row between> 
    <SvgAddToCalendar height={20} width={20} fill={'#979797'} /> 
    <Text>Add to Calendar</Text> 
    <Text>Set the calendar(s) to check for conflicts to prevent double bookings.</Text> 
    </Flex> 
    <Addtocalender/>
    </div>


    </>
)}

const CheckForConflicts = () => {
    return(
        <>
        <div className={styles.checkforconflict}>

        </div>
        </>
    )
}
const Addtocalender = () => {
  const email ="pugazhendhi@sense7ai.com"
  return(
    <>
    <div className={styles.addtocalendar}>
      <Flex row between className={styles.aodicon}>
      <SvgOutlook height={20} width={20} />
      <Flex row start className={styles.rowgroup1}>
        <Text> Add to {email}</Text>
        <SvgEdit height={16} width={16}/>
      </Flex>
      </Flex>
    </div>
    </>
  )
    
}

export default CalenderConfig;


