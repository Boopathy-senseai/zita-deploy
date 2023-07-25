
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
import { isEmpty } from '../../../../uikit/helper';
import styles from './calendarconfig.module.css';
import { calendarratio, unavailble } from './ConfigTypes';

const CalenderConfig = () => {
  const email = 'pugazhendhi@sense7ai.com';
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

  return (
    <>
      <div className={styles.modalwidth}>
        <Flex row>
          <Flex middle>
            <SvgConflicts height={32} width={32} />
          </Flex>
          <Flex marginLeft={30}>
            <Text bold className={styles.theme}>
              Check for Conflicts
            </Text>
            <Text>
              Set the calendar(s) to check for conflicts to prevent double
              bookings.
            </Text>
          </Flex>
        </Flex>
        <CheckForConflicts
          email={email}
          conflict={conflict}
          editConflict={editConflict}
          closeModal1={closeModal1}
        />

        <Flex row marginTop={20}>
          <Flex middle>
            <SvgAddToCalendar height={32} width={32} fill={'#979797'} />
          </Flex>
          <Flex marginLeft={30}>
            <Text bold className={styles.theme}>
              Add to Calendar
            </Text>
            <Text>
              Set the calendar you would like to add new events to as they are
              scheduled.
            </Text>
          </Flex>
        </Flex>
        <AddtoCalendar
          email={email}
          calendar={calendar}
          editCalendar={editCalendar}
          closeModal2={closeModal2}
        />
      </div>
    </>
  );
};
interface CheckForConflictProps {
  email: string;
  conflict: boolean;
  editConflict: () => void;
  closeModal1: () => void;
}

const CheckForConflicts: React.FC<CheckForConflictProps> = ({
  email,
  editConflict,
  conflict,
  closeModal1,
}) => {
  console.log('editmodaleditmodal', conflict);

  const [checkedItems, setCheckedItems] = useState([]);
  const [calendarflag, setcalendarflag] = useState(false);

  useEffect(() => {
    if (conflict === true) {
      setcalendarflag(true);
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
        <Flex row between>
          <Flex row>
            <SvgOutlook height={20} width={20} />
            <Text className={styles.txt1}>
              Check for <span className={styles.email}>{email}</span>
            </Text>
          </Flex>
          <Flex row end onClick={editConflict} style={{ cursor: 'pointer' }}>
            <SvgEdit height={16} width={16} />
          </Flex>
        </Flex>
        {conflict ? (
          <Flex>
            <Flex row marginTop={10}>
              <Text>
                Consider me unavailble when Office 365/Outlook.com shows me as:
              </Text>
            </Flex>
            <Flex>
              {unavailble.map((list, index) => {
                return (
                  <Flex row className={styles.btncheck} key={index}>
                    <InputCheckBox
                      value={list.label}
                      checked={checkedItems.includes(list.label)}
                      onChange={handleCheckboxChange}
                    />
                    <Text className={styles.txt2}>{list.label}</Text>
                  </Flex>
                );
              })}
            </Flex>
            <Flex row className={styles.header2}>
              <Text size={14} bold>
                Check these places for conflicts
              </Text>
            </Flex>
            <Flex row className={styles.btncheck}>
              <InputCheckBox
                value={calendar}
                checked={calendarflag ? true : false}
                onChange={onCheckboxchange}
              />
              <Text className={styles.txt2}>{calendar}</Text>
            </Flex>
            <Flex row end marginTop={10} className={styles.borderLine}>
              <Button
                types="primary"
                className={styles.cancel}
                onClick={closeModal1}
              >
                Cancel
              </Button>

              <Button
                className={styles.share}
              >
                Update
              </Button>
            </Flex>
          </Flex>
        ) : (
          <>
            <Flex row marginLeft={40} marginTop={10}>
              <Flex row middle center>
                <SvgDot width={14} height={14} />
                <Text align="center" size={16} className={styles.txt2}>
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

interface AddtoCalendarProps {
  email: string;
  calendar: boolean;
  editCalendar: () => void;
  closeModal2: () => void;
}

const AddtoCalendar: React.FC<AddtoCalendarProps> = ({
  email,
  editCalendar,
  calendar,
  closeModal2,
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
      setcheckedFlag(true);
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
      setcheckedFlag(true);
    }
  }, []);
  return (
    <>
      <Card className={styles.cardStruture}>
        <Flex row between>
          <Flex row>
            <SvgOutlook height={20} width={20} />
            <Text className={styles.txt1}>
              {' '}
              Add to <span className={styles.email}>{email}</span>
            </Text>
          </Flex>
          <Flex row end onClick={editCalendar} style={{ cursor: 'pointer' }}>
            <SvgEdit height={16} width={16} />
          </Flex>
        </Flex>
        {calendar ? (
          <>
            <Flex column>
              {ratioTag.map((list, index) => {
                return (
                  <Flex row key={index} marginTop={10}>
                    <InputRadio
                      label={list.label}
                      checked={list.label === checklabel}
                      onClick={() =>
                        onRatioChange(list.label)
                      }
                    />
                  </Flex>
                );
              })}
            </Flex>

            {showDropdown ? (
              <>
                <Flex row marginTop={10}>
                  <Text bold color="black">
                    Sync Cancellation
                  </Text>
                </Flex>
                <Flex row marginTop={10}>
                  <InputCheckBox
                    label="Deleting or declining an event in your calendar will also cancel it in Zita"
                    checked={checkedFlag ? true : false}
                    onChange={handleCheckboxChange}
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
              >
                Cancel
              </Button>

              <Button className={styles.share}>Update</Button>
            </Flex>
          </>
        ) : (
          <>
            <Flex row marginLeft={40} marginTop={10}>
              <Flex row middle center>
                <SvgDot width={14} height={14} />
                <Text align="center" size={16} className={styles.txt2}>
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
