import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIn, isEmptyArray, useFormik } from 'formik';
import Card from '../../../uikit/Card/Card';
import Button from '../../../uikit/Button/Button';
import SvgAdd from '../../../icons/SvgAdd';
import Flex from '../../../uikit/Flex/Flex';
import { AppDispatch, RootState } from '../../../store';
import DashBoard from './DashBoard';
import CreateNewEvent from './CreateNewEvent';
import { dashboard, overall } from './eventType';
// import OverAll from'./TeamMail/Overall.json';
import { getScheduleMiddleWare } from './store/middleware/eventmiddleware';
import Slotter1 from './Slotter1';

const PreviewTab = () => {
  const dispatch: AppDispatch = useDispatch();
  const [userpreview, setuserPreview] = useState(true);
  useEffect(()=>{
    setuserPreview(true);
    // alert(userpreview)
  },[])


  return (
    <>
    <Flex>
        <Slotter1
        userpreview ={userpreview}
        setuserPreview ={setuserPreview}
        />
    </Flex>
  
    </>
  );
};

export default PreviewTab;
