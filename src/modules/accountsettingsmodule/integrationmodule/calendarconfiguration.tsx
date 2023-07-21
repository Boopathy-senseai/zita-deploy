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
import SvgConflicts from '../../../icons/SvgConflicts';
import styles from './integrationscreen.module.css';


const CalenderConfig  = () =>{

return(
    <>
    <Flex className={styles.window}> 
    <SvgConflicts /> 
    <Flex className={styles.conflicts}>
    <Text className={styles.text1}>Check for Conflicts</Text> 
    </Flex>    
    </Flex> 

    </>
)}

// const EditOutLook = () => {9
//     return(
//         <>
//         </>
//     )
// }
// const EditGoogle = () => {
    
// }

export default CalenderConfig;


