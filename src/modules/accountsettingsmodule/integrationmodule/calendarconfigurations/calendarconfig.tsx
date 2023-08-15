import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import SvgEdit from '../../../../icons/SvgEdit';
import SvgOutlook from '../../../../icons/SvgOutlook';
import SvgDot from '../../../../icons/SvgDot';
import {
  Button,
  Card,
  Flex,
  InputCheckBox,
  InputRadio,
  Text,
} from '../../../../uikit';
import SvgConflicts from '../../../../icons/SvgConflicts';
import SvgGmail from '../../../../icons/SvgGmail';
import { AppDispatch, RootState } from '../../../../store';
import { getCalendarConfigurationMiddleWare, postCalendarConfigurationMiddleWare } from '../../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { Configuration } from '../../../applicantprofilemodule/applicantProfileTypes';
import { calendarratio, unavailble } from './ConfigTypes';
import styles from './calendarconfig.module.css';
interface CalenderConfigProps {
  isGoogle: number;
  email: string;
  CloseConfiguration :() => void;
}

const CalenderConfig = ({ isGoogle, email,CloseConfiguration }: CalenderConfigProps) => {
  const dispatch: AppDispatch = useDispatch();
  console.log('isGoogleisGoogle', isGoogle);
  const [conflict, setconflict] = useState(false);
  const [calendar, setcalendar] = useState(false);
  const [text, setText] = useState('');
  const [outlookCheck, setOutlookCheck] = useState([]);


  const { data,configuration } = useSelector(
    ({calendarConfigurationReducers }: RootState) => ({
      data : calendarConfigurationReducers.data,
      configuration : calendarConfigurationReducers.configuration
    }),
  );


  useEffect(()=> {
    if(isGoogle === 0){
      const name  = "Outlook"
      if(data?.length === 0){
        setOutlookCheck(unavailble);
      }else{
        setOutlookCheck(data)
      }
      setText(name)
    }else if (isGoogle === 1){
      const name  = "Google"
      setText(name)
    }
    if(text !== ''){
      dispatch(getCalendarConfigurationMiddleWare(text))
    }
  },[text])

  function editConflict() {
    setconflict(!conflict);
  }
  function editCalendar() {
    setcalendar(!calendar);
  }
  function closeModal1() {

    setconflict(!conflict);
    CloseConfiguration()
  }
  function closeModal2() {
    setcalendar(!calendar);
    CloseConfiguration()
  }

  function updateConflicts(cal,showas) {
    setconflict(!conflict);
    console.log("calcalcalcal",text,cal,showas)
    const formData = new FormData();
    formData.append('configuration',JSON.stringify(text))
    formData.append('calendar',String(cal))
    if(text === "Outlook"){
      formData.append('showas',JSON.stringify(showas))
      dispatch(postCalendarConfigurationMiddleWare({formData}))
    }
    if(text === "Google"){
      // const emptyShow = []
      // formData.append('showas',JSON.stringify(emptyShow))
      dispatch(postCalendarConfigurationMiddleWare({formData}))
    }
    CloseConfiguration()
  }

  function updateCalendar() {
    setcalendar(!calendar);
    CloseConfiguration()
  }


  console.log("dataatatatatatatatta",data,"\n",configuration)

  return (
    <Flex className={styles.modalwidth}>
      <Flex className={styles.container}>
        <Flex row>
          <Flex marginTop={3}>
            <SvgConflicts height={18} width={18} />
          </Flex>
          <Flex marginLeft={15}>
            <Flex>
              <Text  size={14} bold color="theme" style={{ cursor : 'default'}}>
                Check for Conflicts
              </Text>
              <Text size={13} style={{ cursor : 'default'}}>
                Set the calendar(s) to check for conflicts to prevent double
                bookings.
              </Text>
            </Flex>
            <CheckForConflicts
              email={email}
              isGoogle={isGoogle}
              conflict={conflict}
              editConflict={editConflict}
              closeModal1={closeModal1}
              updateConflicts={updateConflicts}
              data = {data}
            />
          </Flex>
        </Flex>
        {/* {isGoogle === 0 ? (
        <Flex row marginTop={20}>
          <Flex marginTop={3}>
            <SvgAddToCalendar height={18} width={18} fill="#581845" />
          </Flex>
          <Flex marginLeft={15}>
            <Flex>
              <Text bold color="theme" size={14}>
                Add to Calendar
              </Text>
              <Text size={13}>
                Set the calendar you would like to add new events to as they are
                scheduled.
              </Text>
            </Flex>
            <AddtoCalendar
              email={email}
              calendar={calendar}
              editCalendar={editCalendar}
              closeModal2={closeModal2}
              isGoogle={isGoogle}
              updateCalendar={updateCalendar}
              data = {data}
            />
          </Flex>
        </Flex>
        ) : ('')} */}
      </Flex>
    </Flex>
  );
};
interface CheckForConflictProps {
  email: string;
  conflict: boolean;
  isGoogle: number;
  data : Configuration[];
  editConflict: () => void;
  closeModal1: () => void;
  updateConflicts: (cal, checkedItems) => void;

}

const CheckForConflicts: React.FC<CheckForConflictProps> = ({
  data ,
  email,
  conflict,
  isGoogle,
  closeModal1,
  editConflict,
  updateConflicts,
}) => {
  console.log('editmodaleditmodal', conflict);

  const [checkedItems, setCheckedItems] = useState([]);
  const [calendarflag, setcalendarflag] = useState(false);

  useEffect(() => {
    if (conflict === true) {
      const calendarr = data.filter(item => item.calendar)
      console.log("filteredShowasArray",calendarr)
      if (data?.length === 0 ){   
        setcalendarflag(true);  
        const checked = [
          'Busy',
          'Tentative',
          'Away/ Out of Office',
          'Working Elsewhere',
        ];
        setCheckedItems(checked);
        
      }else{  
        const filteredShowasArray = data?.filter(item => item.showas === 'Busy' || item.showas === 'Away/ Out of Office' || item.showas === 'Working Elsewhere' || item.showas === 'Tentative')
        .map(item => item.showas);
        console.log("PPPPPPPPPPP",filteredShowasArray)
        setCheckedItems(filteredShowasArray);
        const distinctCalendars = Array.from(new Set(data.map(item => item.calendar)));
        const atLeastOneTrue = distinctCalendars.includes(true);
        console.log("atLeastOneTrue",atLeastOneTrue);
        setcalendarflag(atLeastOneTrue)
      }
    } else {
      setcalendarflag(false);
    }
  }, [conflict]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, value]);
      // setinterviewerData(checkedItems)
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((item) => item !== value),
      );
    }
  };
  const onCheckboxchange = () => {
    setcalendarflag(!calendarflag);
  };

  const UpdateButton = () => {
    updateConflicts(calendarflag,checkedItems)
  }
  const calendar = 'Calendar';
  console.log(
    'unavailbleunavailble',
    unavailble,
    '\n',
    'checkedItems',
    checkedItems,
  );
  return (
    <>
      <Card className={styles.cardStruture}>
        <Flex row center between>
          <Flex row center>
            {isGoogle === 0 ? (
              <SvgOutlook height={18} width={18} />
            ) : (
              <SvgGmail height={18} width={18} />
            )}
            <Text style={{ marginLeft: '15px', cursor : 'default'}} size={13}>
              Check for <Text color="theme" size={13}>{email}</Text>
            </Text>
          </Flex>
          <Flex row onClick={editConflict} style={{ cursor: 'pointer' }}>
            <SvgEdit height={14} width={14} />
          </Flex>
        </Flex>
        {conflict ? (
          <Flex>
           
            {isGoogle === 0 ? (
            <Flex>
               <Flex row marginTop={15}>
              <Text bold size={13} style={{ cursor : 'default'}} >
                Consider me unavailble when Office 365/Outlook.com shows me as:
              </Text>
            </Flex>
              {unavailble.map((list, index) => {
                return (
                  <Flex row className={styles.btncheck} key={index} style={{ cursor : 'default'}}>
                    <InputCheckBox
                      value={list.label}
                      checked={checkedItems.includes(list.label)}
                      onChange={handleCheckboxChange}
                    />
                    <Text size={13} style={{ marginLeft: '10px' }}>{list.label}</Text>
                  </Flex>
                );
              })}
            </Flex>
            ):('')}
            <Flex row className={styles.header2} marginTop={20}>
              <Text size={13} bold style={{ cursor : 'default'}}>
                Check these places for conflicts
              </Text>
            </Flex>
            <Flex row className={styles.btncheck} style={{cursor : 'default'}} >
              <InputCheckBox
                value={calendar}
                checked={calendarflag ? true : false}
                onChange={onCheckboxchange}
              />
              <Text size={13} style={{ marginLeft: '10px' }}>{calendar}</Text>
            </Flex>
            <Flex row end marginTop={10} className={styles.borderLine}>
              <Button
                types="primary"
                className={styles.cancel}
                onClick={closeModal1}
                textSize ={13}
              >
                Cancel
              </Button>

              <Button className={styles.share} onClick={UpdateButton}  textSize ={13}>
                Update
              </Button>
            </Flex>
          </Flex>
        ) : (
          <>
            <Flex row marginLeft={25} marginTop={5}>
              <Flex row center marginLeft={9}> 
                <Flex marginTop={3}>
                  <SvgDot width={14} height={14} />
                </Flex>
                <Text style={{marginLeft : '5px',cursor : 'default'}} size={13}>Calendar</Text>
              </Flex>
            </Flex>
          </>
        )}
      </Card>
    </>
  );
};

interface AddtoCalendarProps {
  email: string;
  calendar: boolean;
  isGoogle: number;
  data : Configuration[];
  editCalendar: () => void;
  closeModal2: () => void;
  updateCalendar: () => void;
}

const AddtoCalendar: React.FC<AddtoCalendarProps> = ({
  data,
  email,
  editCalendar,
  calendar,
  isGoogle,
  closeModal2,
  updateCalendar,
}) => {
  const [showDropdown, setshowDropdown] = useState(false);
  const [checklabel, setchecklabel] = useState(email);
  const [ratioTag, setratioTag] = useState([]);
  const [checkedFlag, setcheckedFlag] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setcheckedFlag(!checkedFlag);
  };

  const onRatioChange = (label) => {
    setchecklabel(label);
    if (label === email) {
      setshowDropdown(true);
      setcheckedFlag(false);
    } else {
      setshowDropdown(false);
    }
  };
  useEffect(() => {
    const option = calendarratio;
    option[0].label = email;
    setratioTag(option);
    setshowDropdown(true);
    if (checklabel === email) {
      setshowDropdown(true);
      setcheckedFlag(false);
    }
  }, []);
  return (
    <>
      <Card className={styles.cardStruture1}>
        <Flex row center between>
          <Flex row center>
            {isGoogle === 0 ? (
              <SvgOutlook height={18} width={18} />
            ) : (
              <SvgGmail height={18} width={18} />
            )}
            <Text style={{ marginLeft: '15px' }} size={13}>
              Add to <Text color="theme" size={13}>{email}</Text>
            </Text>
          </Flex>
          <Flex row end onClick={editCalendar} style={{ cursor: 'pointer' }}>
            <SvgEdit height={14} width={14} />
          </Flex>
        </Flex>
        {calendar ? (
          <>
          
            <Flex column marginTop={5}>
              {ratioTag.map((list, index) => {
                return (
                  <Flex row key={index} marginTop={10} style={{fontsize : '13px',cursor : 'default'}}>
                    <InputRadio                      
                      label={list.label}    
                      checked={list.label === checklabel}
                      onClick={() => onRatioChange(list.label)}                      
                    />                    
                  </Flex>
                );
              })}
            </Flex>

            {showDropdown ? (
              <>
                <Flex row marginTop={10}>
                  <Text bold color="black" size={13}>
                    Sync Cancellation
                  </Text>
                </Flex>
                <Flex row marginTop={10}>
                  <InputCheckBox
                    label="Deleting or declining an event in your calendar will also cancel it in Zita"
                    checked={checkedFlag ? true : false}
                    onChange={handleCheckboxChange}
                    className = {styles.fontsize}      
                  />
                </Flex>
              </>
            ) : (
              ''
            )}

            <Flex row end marginTop={10} className={styles.borderLine}>
              <Button
                types="primary"
                className={styles.cancel}
                onClick={closeModal2}
                textSize ={13}
              >
                Cancel
              </Button>

              <Button className={styles.share} onClick={updateCalendar}  textSize ={13}>
                Update
              </Button>
            </Flex>
          </>
        ) : (
          <>
            <Flex row marginLeft={40} marginTop={10}>
              <Flex row middle center>
                <Flex marginTop={3}>
                  <SvgDot width={14} height={14} />
                </Flex>

                <Text style={{marginLeft : '5px',cursor : 'default'}} size={13} className={styles.txt2}>
                  Calendar
                </Text>
              </Flex>
            </Flex>
          </>
        )}
      </Card>
    </>
  );
};

export default CalenderConfig;
