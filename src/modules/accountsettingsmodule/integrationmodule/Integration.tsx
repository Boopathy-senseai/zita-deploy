import {  useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { AppDispatch, RootState } from '../../../store';
import Text from '../..//../uikit/Text/Text';
import Flex from '../..//../uikit/Flex/Flex';
import Card from '../..//../uikit/Card/Card';
import InputRadio from '../../../uikit/InputRadio/InputRadio';

import Gmail from '../../../assets/images/gmail.png';
import Outlook from '../../../assets/images/outlook.png';

import Button from '../..//../uikit/Button/Button';
// import Loader from '../../../uikit/Loader/Loader';
// import Toast from '../../../uikit/Toast/Toast';
import {
  intergrationMiddleWare,
  googleSyncMiddleWare,
outlookSyncMiddleWare,
googleCallMiddleWare,
// calbackurlMiddleWare
} from './store/middleware/integrationmiddleware';
const jobTypeData = [
  { value: 'outlook', label: '' },
  { value: 'google', label: '' },

];
import styles from './integration.module.css';
const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
 const [isSelect, setSelect] = useState(false);
  type Integration = {
    data: string;
  
  };

  const initial: Integration = {
    data: '',
   
  };
  useEffect(() => {
    dispatch(intergrationMiddleWare());
  }, []);

const { outlook, google, isLoading } = useSelector(
    ({ integrationReducers }: RootState) => ({
      isLoading: integrationReducers.isLoading,
      outlook: integrationReducers.outlook,
      google: integrationReducers.google,
    }),
  );


const hanldeSubmitform = (values: Integration) => {

  if(values.data === 'google'){

 
 
    dispatch(
      googleSyncMiddleWare(),
    ).then((res: any) => {
   

         window.location.href = res.payload.authorization_url
       
    
      

    });
     }else{

        dispatch(
      outlookSyncMiddleWare(),
    ).then((res: any) => {
       console.log(res.payload.success);
      window.location.href = res.payload.authorization_url
      

    });
     }
  };
  const formik = useFormik({
    initialValues: initial,
    onSubmit: (values) => hanldeSubmitform(values),
  });

console.log(outlook, google, isLoading,);
  const url_string = window.location.href;
const url = new URL(url_string);
const state1 = url.searchParams.get("state");
const code1 = url.searchParams.get("code");
const scope1 = url.searchParams.get("scope");

   useEffect(() => {

     if(state1 !== null){

   dispatch(
      googleCallMiddleWare({state:state1,
        code:code1,
        scope:scope1,}),
    ).then((res: any) => {
       console.log(res.payload);

    });

     }
  }, []);

 useEffect(() => {
    if (formik.values.data.length > 0){
      setSelect(true);
    }

  }, [formik.values]);
  return (
    <Flex>
      <Card className={styles.cardOverAll}>
        <Text bold size={16} className={styles.heading}>
          Update Profile
        </Text>
        <Text>Integrate your calendar with zita to schedule your meetings</Text>
        <Flex row>
        <div className={styles.skillContainer}>
        <Text color="black" bold className={styles.jobTextStyle}>
          Job Status
        </Text>

        <Flex row wrap center>
          {jobTypeData.map((calendar) => {
            return (
              <Flex
                row
                key={calendar.value}
                // width={jobList.width}
                className={styles.matchRadioStyle}
              >
                <InputRadio
                  label={''}
                  checked={calendar.value === formik.values.data}
                  onClick={() => formik.setFieldValue('data', calendar.value)}
                />
                {calendar.value === 'outlook' ?
                <>
                <img src={Outlook} alt="Outlook" width={30} height={30} />
                  <Text> Outlook Calendar </Text>
                  </>
                  :
                  <>
                <img src={Gmail} alt="Gmail" width={30} height={30} />
                  <Text> Google Calendar </Text>
                  </>
              }
              </Flex>
            );
          })}
        </Flex>
      </div>
      
          <Flex flex={6}>{''}</Flex>
        </Flex>
        {isSelect && 
        <Flex row>
          <Text>Click on the button to integrate with your Google  Calendar</Text>
          <Button onClick={formik.handleSubmit} >
                  Integrate
                </Button>
        </Flex>
        }
      </Card>
    </Flex>
  );
};

export default UserProfile;
