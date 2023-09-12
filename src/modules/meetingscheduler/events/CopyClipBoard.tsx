import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import SvgEventcopy from '../../../icons/SvgEventcopy';
import Button from '../../../uikit/Button/Button';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import styles from './daytimesplit.module.css';

type CopyProps = {
    day: string;
    index: number;
    sundaycheck: boolean;
    mondaycheck: boolean;
    tuesdaycheck: boolean;
    wednesdaycheck: boolean;
    thursdaycheck: boolean;
    fridaycheck: boolean;
    saturdaycheck: boolean;
    copybtn: boolean;
    copybtnClose: () => void;
    name: string;
    timeslot: any;
    setSunday: ([]) => void;
    setMonday: ([]) => void;
    setTuesday: ([]) => void;
    setWednesday: ([]) => void;
    setThursday: ([]) => void;
    setFriday: ([]) => void;
    setSaturday: ([]) => void;
    setDay1: ([]) => void;
    setDay2: ([]) => void;
    setDay3: ([]) => void;
    setDay4: ([]) => void;
    setDay5: ([]) => void;
    setDay6: ([]) => void;
    setDay7: ([]) => void;
    setCopy: (boolean) => void;
    SetCopyId: (number) => void;
};
const CopyClipBoard = ({
    day,
    index,
    name,
    timeslot,
    setSunday,
    setMonday,
    setTuesday,
    setWednesday,
    setThursday,
    setFriday,
    setSaturday,
    setDay1,
    setDay2,
    setDay3,
    setDay4,
    setDay5,
    setDay6,
    setDay7,
    sundaycheck,
    mondaycheck,
    tuesdaycheck,
    wednesdaycheck,
    thursdaycheck,
    fridaycheck,
    saturdaycheck,
    copybtn,
    copybtnClose,
    setCopy,
    SetCopyId,
}: CopyProps) => {
    const daysOfWeek = [
        { name: 'sunday', checked: sundaycheck, disabled: name === 'sunday',flag : false },
        { name: 'monday', checked: mondaycheck, disabled: name === 'monday',flag : false  },
        { name: 'tuesday', checked: tuesdaycheck, disabled: name === 'tuesday',flag : false  },
        { name: 'wednesday', checked: wednesdaycheck, disabled: name === 'wednesday',flag : false  },
        { name: 'thursday', checked: thursdaycheck, disabled: name === 'thursday',flag : false  },
        { name: 'friday', checked: fridaycheck, disabled: name === 'friday',flag : false  },
        { name: 'saturday', checked: saturdaycheck, disabled: name === 'saturday',flag : false  },
    ];

    const [check1, setcheck1] = useState(false);
    const [check2, setcheck2] = useState(false);
    const [check3, setcheck3] = useState(false);
    const [check4, setcheck4] = useState(false);
    const [check5, setcheck5] = useState(false);
    const [check6, setcheck6] = useState(false);
    const [check7, setcheck7] = useState(false);
    const [onApply, setonApply] = useState(index);
    const [DaysOfWeek,setDaysOfWeek] = useState(daysOfWeek)


    

    const handleCheckboxChange = (assignedvalue) => {
        alert("assignedvalue"+assignedvalue)
        const updatedDaysOfWeek = daysOfWeek.map((info,i)=> {
            if (assignedvalue === info.name) {
                console.log("info::::::",info)
                return { ...info, flag: !info.flag };
              }
              return info;
            })
        setDaysOfWeek(updatedDaysOfWeek);
    };



//   const handleCheckboxChange = (days) => {
//     setCheckboxes((prevCheckboxes) => ({
//       ...prevCheckboxes,
//       [days]: !prevCheckboxes[days],
//     }));
//   };


    function closeButton() {
        setCopy(false);
        SetCopyId(0);
    }

    function ModalReset() {
        setcheck1(false);
        setcheck2(false);
        setcheck3(false);
        setcheck4(false);
        setcheck5(false);
        setcheck6(false);
        setcheck7(false);
    }
    useEffect(() => { }, [copybtn]);

    const applyonclick = (dayoffilter: any, tslot: any, txt: string) => {
        copybtnClose();
        closeButton();
        const filteredArray = dayoffilter.filter(
            (item) => item.starttime !== '' && item.endtime !== '',
        );

        if (check1) {
            const newArrayOfObjects = filteredArray.map((item) => ({
                starttime: item.starttime,
                endtime: item.endtime,
            }));
            setSunday(newArrayOfObjects);
        }
        if (check2) {
            const newArrayOfObjects = filteredArray.map((item) => ({
                starttime: item.starttime,
                endtime: item.endtime,
            }));
            setMonday(newArrayOfObjects);
        }
        if (check3) {
            const newArrayOfObjects = filteredArray.map((item) => ({
                starttime: item.starttime,
                endtime: item.endtime,
            }));
            setTuesday(newArrayOfObjects);
        }
        if (check4) {
            const newArrayOfObjects = filteredArray.map((item) => ({
                starttime: item.starttime,
                endtime: item.endtime,
            }));
            setWednesday(newArrayOfObjects);
        }
        if (check5) {
            const newArrayOfObjects = filteredArray.map((item) => ({
                starttime: item.starttime,
                endtime: item.endtime,
            }));
            setThursday(newArrayOfObjects);
        }
        if (check6) {
            const newArrayOfObjects = filteredArray.map((item) => ({
                starttime: item.starttime,
                endtime: item.endtime,
            }));
            setFriday(newArrayOfObjects);
        }
        if (check7) {
            const newArrayOfObjects = filteredArray.map((item) => ({
                starttime: item.starttime,
                endtime: item.endtime,
            }));
            setSaturday(newArrayOfObjects);
        }
        ModalReset();
        setTimeout(() => {
            timeslotset(tslot);
        }, 1000);
    };

    function onCopyClick() {
        setonApply(index);
    }

    const timeslotset = (dayof) => {
        const updatedTimeSlots = [...dayof];
        updatedTimeSlots.shift();
        if (check1) {
            setDay1(dayof);
        }
        if (check2) {
            setDay2(dayof);
        }
        if (check3) {
            setDay3(dayof);
        }
        if (check4) {
            setDay4(dayof);
        }
        if (check5) {
            setDay5(dayof);
        }
        if (check6) {
            setDay6(dayof);
        }
        if (check7) {
            setDay7(dayof);
        }
    };
    console.log("check1",DaysOfWeek)
    return (
        <>
            <Flex title={'Copy timings'}>
                <Dropdown onClick={() => onCopyClick()}>
                    <Dropdown.Toggle
                        style={{
                            borderColor: 'unset',
                            backgroundColor: 'unset',
                            boxShadow: 'none',
                            border: 'none',
                            marginTop: '3px',
                        }}
                    >
                        <SvgEventcopy width={18} height={18} fill={'#581845'} />
                    </Dropdown.Toggle>
                    {copybtn ? (
                        <>
                            <Dropdown.Menu
                                style={{
                                    minWidth: '5rem',
                                    position: 'absolute',
                                    transform: 'none',
                                    zIndex: 1,
                                }}
                            >

                                {DaysOfWeek.map((dayInfo, i) => (
                                    <Flex row center className={styles.copyalign} key={i}>
                                        {dayInfo.name === name ? (
                                            <InputCheckBox
                                                checked={dayInfo.checked ? true : false}
                                                disabled={dayInfo.disabled}
                                            />
                                        ) : dayInfo.checked === true ? (
                                            <InputCheckBox
                                                onChange={() => handleCheckboxChange(dayInfo.name)}
                                                checked={dayInfo.flag ? true : false}
                                            />
                                        ) : (
                                            <InputCheckBox
                                                onChange={() => handleCheckboxChange(dayInfo.name)}
                                                disabled={true}
                                            />
                                        )}
                                        <Text className={styles.space}>{dayInfo.name}</Text>
                                    </Flex>

                                ))}
                                <Flex className={styles.applybtn}>
                                    <Dropdown.Item className={styles.applybackground}>
                                        <Button
                                            types="primary"
                                            onClick={() => applyonclick(day, timeslot, name)}
                                        >
                                            Apply
                                        </Button>
                                    </Dropdown.Item>
                                </Flex>
                            </Dropdown.Menu>
                        </>
                    ) : (
                        ''
                    )}
                </Dropdown>
            </Flex>
        </>
    );
};
export default CopyClipBoard;