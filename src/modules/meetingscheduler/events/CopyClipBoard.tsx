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
    const [dataexist, setdataexist] = useState([]);

    const [check1, setcheck1] = useState(false);
    const [check2, setcheck2] = useState(false);
    const [check3, setcheck3] = useState(false);
    const [check4, setcheck4] = useState(false);
    const [check5, setcheck5] = useState(false);
    const [check6, setcheck6] = useState(false);
    const [check7, setcheck7] = useState(false);
    const [onApply, setonApply] = useState(index);


    const daysOfWeek = [
        { name: 'sunday', checked: sundaycheck, disabled: name === 'sunday' },
        { name: 'monday', checked: mondaycheck, disabled: name === 'monday' },
        { name: 'tuesday', checked: tuesdaycheck, disabled: name === 'tuesday' },
        { name: 'wednesday', checked: wednesdaycheck, disabled: name === 'wednesday' },
        { name: 'thursday', checked: thursdaycheck, disabled: name === 'thursday' },
        { name: 'friday', checked: fridaycheck, disabled: name === 'friday' },
        { name: 'saturday', checked: saturdaycheck, disabled: name === 'saturday' },
    ];

    const handleCheckboxChange = (assignedvalue) => {
        if (assignedvalue === 'sunday') {
            setcheck1(!check1);
        }
        if (assignedvalue === 'monday') {
            setcheck2(!check2);
        }
        if (assignedvalue === 'tuesday') {
            setcheck3(!check3);
        }
        if (assignedvalue === 'wednesday') {
            setcheck4(!check4);
        }
        if (assignedvalue === 'thursday') {
            setcheck5(!check5);
        }
        if (assignedvalue === 'friday') {
            setcheck6(!check6);
        }
        if (assignedvalue === 'saturday') {
            setcheck7(!check7);
        }
    };

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

                                {daysOfWeek.map((dayInfo, i) => (
                                    <Flex row center className={styles.copyalign} key={i}>
                                        {dayInfo.name === name ? (
                                            <InputCheckBox
                                                checked={dayInfo.checked ? true : false}
                                                disabled={dayInfo.disabled}
                                            />
                                        ) : dayInfo.checked === true ? (
                                            <InputCheckBox
                                                onChange={() => handleCheckboxChange(dayInfo.name)}
                                                checked={dayInfo.disabled ? true : false}
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

                                {/* <Flex row center className={styles.copyalign}>
                    {name === 'sunday' ? (
                      <InputCheckBox
                        checked={name === 'sunday'}
                        disabled={name === 'sunday'}
                      />
                    ) : sundaycheck === true ? (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('sunday')}
                        checked={check1 ? true : false}
                      />
                    ) : (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('sunday')}
                        disabled={true}
                      />
                    )}
                    <Text className={styles.space}>Sunday</Text>
                  </Flex>
                  <Flex row center className={styles.copyalign}>
                    {name === 'monday' ? (
                      <InputCheckBox
                        checked={name === 'monday'}
                        disabled={name === 'monday'}
                      />
                    ) : mondaycheck === true ? (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('monday')}
                        checked={check2 ? true : false}
                      />
                    ) : (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('monday')}
                        disabled
                      />
                    )}
                    <Text className={styles.space}>Monday</Text>
                  </Flex>
                  <Flex row center className={styles.copyalign}>
                    {name === 'tuesday' ? (
                      <InputCheckBox
                        checked={name === 'tuesday'}
                        disabled={name === 'tuesday'}
                      />
                    ) : tuesdaycheck === true ? (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('tuesday')}
                        checked={check3 ? true : false}
                      />
                    ) : (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('tuesday')}
                        disabled={true}
                      />
                    )}
                    <Text className={styles.space}>Tuesday</Text>
                  </Flex>
                  <Flex row center className={styles.copyalign}>
                    {name === 'wednesday' ? (
                      <InputCheckBox
                        checked={name === 'wednesday'}
                        disabled={name === 'wednesday'}
                      />
                    ) : wednesdaycheck === true ? (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('wednesday')}
                        checked={check4 ? true : false}
                      />
                    ) : (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('wednesday')}
                        disabled={true}
                      />
                    )}
                    <Text className={styles.space}>Wednesday</Text>
                  </Flex>
                  <Flex row center className={styles.copyalign}>
                    {name === 'thursday' ? (
                      <InputCheckBox
                        checked={name === 'thursday'}
                        disabled={name === 'thursday'}
                      />
                    ) : thursdaycheck === true ? (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('thursday')}
                        checked={check5 ? true : false}
                      />
                    ) : (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('thursday')}
                        disabled={true}
                      />
                    )}
                    <Text className={styles.space}>Thursday</Text>
                  </Flex>
                  <Flex row center className={styles.copyalign}>
                    {name === 'friday' ? (
                      <InputCheckBox
                        checked={name === 'friday'}
                        disabled={name === 'friday'}
                      />
                    ) : fridaycheck === true ? (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('friday')}
                        checked={check6 ? true : false}
                      />
                    ) : (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('friday')}
                        disabled={true}
                      />
                    )}
                    <Text className={styles.space}>Friday</Text>
                  </Flex>
                  <Flex row center className={styles.copyalign}>
                    {name === 'saturday' ? (
                      <InputCheckBox
                        checked={name === 'saturday'}
                        disabled={name === 'saturday'}
                      />
                    ) : saturdaycheck === true ? (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('saturday')}
                        checked={check7 ? true : false}
                      />
                    ) : (
                      <InputCheckBox
                        onChange={() => handleCheckboxChange('saturday')}
                        disabled={true}
                      />
                    )}
                    <Text className={styles.space}>Saturday</Text>
                  </Flex> */}
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