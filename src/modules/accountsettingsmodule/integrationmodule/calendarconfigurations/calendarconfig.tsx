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
import SvgAddToCalendar from '../../../../icons/SvgAddToCalendar';
import SvgConflicts from '../../../../icons/SvgConflicts';
import SvgGmail from '../../../../icons/SvgGmail';
import { isEmpty } from '../../../../uikit/helper';
import styles from './calendarconfig.module.css';
import { calendarratio, unavailble } from './ConfigTypes';

interface CalenderConfigProps {
  isGoogle: number;
  email: string;
}

const CalenderConfig = ({ isGoogle, email }: CalenderConfigProps) => {
  console.log('isGoogleisGoogle', isGoogle);
  const [conflict, setconflict] = useState(false);
  const [calendar, setcalendar] = useState(false);

  function editConflict() {
    alert('editConflict');
    setconflict(!conflict);
  }
  function editCalendar() {
    alert('editCalendar');
    setcalendar(!calendar);
  }
  function closeModal1() {
    setconflict(!conflict);
  }
  function closeModal2() {
    setcalendar(!calendar);
  }

  function updateConflicts() {
    setconflict(!conflict);
  }
  function updateCalendar() {
    setcalendar(!calendar);
  }

  return (
    <Flex className={styles.modalwidth}>
      <Flex className={styles.container}>
        <Flex row>
          <Flex marginTop={3}>
            <SvgConflicts height={18} width={18} />
          </Flex>
          <Flex marginLeft={15}>
            <Flex>
              <Text  size={14} bold color="theme">
                Check for Conflicts
              </Text>
              <Text size={13}>
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
            />
          </Flex>
        </Flex>
        {isGoogle === 0 ? (
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
            />
          </Flex>
        </Flex>
        ) : ('')}
      </Flex>
    </Flex>
  );
};
interface CheckForConflictProps {
  email: string;
  conflict: boolean;
  isGoogle: number;
  editConflict: () => void;
  closeModal1: () => void;
  updateConflicts: () => void;
}

const CheckForConflicts: React.FC<CheckForConflictProps> = ({
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
      setcalendarflag(true);
      const checked = [
        'Busy',
        'Tentative',
        'Away/ Out of Office',
        'Working Elsewhere',
      ];
      setCheckedItems(checked);
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
            <Text style={{ marginLeft: '15px'}} size={13}>
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
              <Text bold size={13} >
                Consider me unavailble when Office 365/Outlook.com shows me as:
              </Text>
            </Flex>
              {unavailble.map((list, index) => {
                return (
                  <Flex row className={styles.btncheck} key={index}>
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
              <Text size={13} bold>
                Check these places for conflicts
              </Text>
            </Flex>
            <Flex row className={styles.btncheck}>
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

              <Button className={styles.share} onClick={updateConflicts}  textSize ={13}>
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
                <Text style={{marginLeft : '5px'}} size={13}>Calendar</Text>
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
  editCalendar: () => void;
  closeModal2: () => void;
  updateCalendar: () => void;
}

const AddtoCalendar: React.FC<AddtoCalendarProps> = ({
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
    alert(label);
    setchecklabel(label);
    if (label === email) {
      alert('>');
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
                  <Flex row key={index} marginTop={10} style={{fontsize : '13px'}}>
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

                <Text style={{marginLeft : '5px'}} size={13} className={styles.txt2}>
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
