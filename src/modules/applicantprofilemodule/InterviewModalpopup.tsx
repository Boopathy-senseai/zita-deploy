import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { Button, Card, ErrorMessage, InputCheckBox, InputSearch, InputText, Modal } from '../../uikit';
import SvgClose from '../../icons/SvgClose';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import SingleButton from '../common/SingleButton';
import styles from '../applicantprofilemodule/InterviewModalpopup.module.css';
import { rolevaluemiddleware } from '../calendarModule/store/middleware/calendarmiddleware';
import { Typeofinterviewquestion, Difficultylevel, level } from './mock';



const Interviewmodalpopup = () => {
    //Add Question Modal  state

    //Re-generate Question by AI Modal  state
    const dispatch: AppDispatch = useDispatch();
    const [isstoreaddData, setstoreaddData] = useState<any>([]);
    const [increasedata, setincreasedata] = useState<any>(0);
    const [overalldata, setoveralldata] = useState<any>('');
    const [role, setrole] = useState<any>([])
    interface LevelValue {
        levelvalue: any;
        Levelvalue: any;
        name: string;
        easy: string; 
        iseasycheck: boolean;
        medium: string;
        ismediumcheck: boolean;
        hard: string;
        ishardcheck: boolean;
        checked: boolean;
        totalError?: string;
        questiontype: string;
        difficulty: string;
        question: string;
    }
    
    interface MyFormValues {
        levellist: LevelValue[];
        role?: string;
         
    }

    const initialValues: MyFormValues = {
        levellist:[],
        role: '', 
    };


    const handleSubmit = () => {

    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: () => handleSubmit(),
    });

    //Add Question Modal  state
    const handlequestion = (e) => {
        formik.setFieldValue('question', e.target.value)
    }
    const handleradiocheck = (data, index) => {
        if (formik.values?.levellist && formik.values?.levellist[index]) {
          const updatedLevelValue = { ...formik.values.levellist[index].levelvalue, questiontype: data };
          formik.setFieldValue(`levellist[${index}].levelvalue`, updatedLevelValue);
        }
      }

    //generate Question by AI Modal  for role 
    const handlerole = (event) => {
        formik.setFieldValue("role", event.target.value);

    }
    //onclick events both Re-generate Question and generate Question by AI Modal  
    const handledata = (e, index) => {
        const isValueExist = isstoreaddData && isstoreaddData.some((item) => item.value === e.value);
        if (!isValueExist) {
            setstoreaddData([...isstoreaddData, e]);
        } else {
            const updatedData = isstoreaddData.filter((item) => item.value !== e.value);
            const levellistIndex = formik.values.levellist.findIndex((item) => item.levelvalue.name === e.label);

            // Update the corresponding element in levellist at the matching index
            const newLevelValue = {
                name: '',
                easy: '',
                iseasycheck: false,
                medium: '',
                ismediumcheck: false,
                hard: '',
                ishardcheck: false,
                checked: false,
            };
            if (levellistIndex !== -1) {
                // Remove the element at the matching index in levellist
                formik.values.levellist.splice(levellistIndex, 1);
            }


            setstoreaddData(updatedData);
        }

    }

    //CHECK BOX ADDING for both Re-generate Question and generate Question by AI Modal  
    const handleCheckboxChange = (index: number, name: string, isChecked: boolean, values) => {
        if (!isChecked) {
            const updatedLevelValue = { ...formik.values.levellist[index].levelvalue, name, checked: isChecked };

            // Check the value of values.value and update the corresponding properties
            if (values === "1") {
                updatedLevelValue.iseasycheck = false;
                updatedLevelValue.easy = ''
            } else if (values === "2") {
                updatedLevelValue.ismediumcheck = false;
                updatedLevelValue.medium = ''
            } else if (values === "3") {
                updatedLevelValue.ishardcheck = false;
                updatedLevelValue.hard = ''
            }

            // Update the value
            formik.setFieldValue(`levellist[${index}].levelvalue`, updatedLevelValue);
        }
        else if (index >= 0 && index < formik.values.levellist.length) {
            console.log(values, 'valuesvaluesvaluesvalues');

            // The object at the specified index exists, update it
            const updatedLevelValue = { ...formik.values.levellist[index].levelvalue, name, checked: isChecked };

            // Check the value of values.value and update the corresponding properties
            if (values === "1") {
                updatedLevelValue.iseasycheck = true;
            } else if (values === "2") {
                updatedLevelValue.ismediumcheck = true;
            } else if (values === "3") {
                updatedLevelValue.ishardcheck = true;
            }

            // Update the value
            formik.setFieldValue(`levellist[${index}].levelvalue`, updatedLevelValue);
        } else {
            const newLevelValue = {
                name,
                easy: '',
                iseasycheck: values === "1" ? true : false,
                medium: '',
                ismediumcheck: values === "2" ? true : false,
                hard: '',
                ishardcheck: values === "3" ? true : false,
                checked: isChecked,
            };
            formik.setFieldValue(`levellist[${index}].levelvalue`, newLevelValue);
        }
    }

    //ADDING QUESTION both Re-generate Question and generate Question by AI Modal  
    const handlequestionno = (index, e, values, label) => {
        const { levellist } = formik.values;

        const levelValueToUpdate = levellist[index].levelvalue;
        if (levelValueToUpdate.iseasycheck && label === 'Easy') {
            const updatedLevelValue = { ...formik.values.levellist[index].levelvalue, easy: e.target.value };
            formik.setFieldValue(`levellist[${index}].levelvalue`, updatedLevelValue);
        }
        else if (levelValueToUpdate.ishardcheck && label === 'Hard') {
            const updatedLevelValue = { ...formik.values.levellist[index].levelvalue, hard: e.target.value };
            formik.setFieldValue(`levellist[${index}].levelvalue`, updatedLevelValue);
        }
        else if (levelValueToUpdate.ismediumcheck && label === 'Medium') {
            const updatedLevelValue = { ...formik.values.levellist[index].levelvalue, medium: e.target.value };
            formik.setFieldValue(`levellist[${index}].levelvalue`, updatedLevelValue);
        }
    }

    //useEffect for both Re-generate Question and generate Question by AI Modal  
    useEffect(() => {
        const aggregateLevels = (levellist) => {
            // Initialize variables to keep track of totals for each level
            let totalEasy = 0;
            let totalMedium = 0;
            let totalHard = 0;

            // Iterate through the levellist array and accumulate values
            for (const item of levellist) {
                totalEasy += parseInt(item.levelvalue.easy) || 0;
                totalMedium += parseInt(item.levelvalue.medium) || 0;
                totalHard += parseInt(item.levelvalue.hard) || 0;
            }

            // Create an object with the aggregated values
            const aggregatedValues = totalEasy + totalMedium + totalHard;

            return aggregatedValues;
        };
        const aggregatedValues = aggregateLevels(formik.values.levellist);
        console.warn("sum", aggregatedValues)


        if (aggregatedValues > 15) {
            setoveralldata('the have only 15')
        }
        else if (aggregatedValues < 1) {
            setoveralldata('the have only 15')
        }
        else if (aggregatedValues <= 15 && aggregatedValues >= 1) {
            setoveralldata('')
        }
    }, [formik.values.levellist])


    useEffect(() => {
        dispatch(rolevaluemiddleware())
            .then(
                (res) => {
                    setrole(res.payload)
                }
            )
    }, []);
    console.log(formik.values)
    return (
        < >
            {/* Add Question Modal popup */}
            <Modal open={true}>
                <Flex className={styles.overalladd}>
                    <Flex>
                        <Text size={14} bold>Add Question</Text>
                    </Flex>
                    <Flex>
                        <Flex marginTop={9}>
                            <Text size={13} color='theme'>Choose the type of interview questions.</Text>
                        </Flex>
                        <Flex row>
                            {Typeofinterviewquestion.map((data, index) => {
                                return (<Flex key={index} row marginRight={15} marginTop={7} center>
                                    <Flex>
                                        {console.log(formik.values?.levellist[0]?.levelvalue?.questiontype,'ormik.values?.levellist[0]?.questiontype')}
                                        {/* //formik.values?.levellist[0]?.questiontype */}
                                         <InputRadio
                                            checked={data.label === data.label}
                                            onClick={() => {handleradiocheck(data.label,index)}}
                                        />
                                    </Flex>
                                    <Flex>
                                        {data.label}
                                    </Flex>
                                </Flex>)
                            })}
                        </Flex>
                        <Flex marginTop={9}>
                            <Text size={13} color='theme'>Choose the difficulty level of the question and question count.</Text>
                        </Flex>
                        <Flex row>
                            {Difficultylevel.map((data, index) => {
                                return (<Flex key={index} row marginRight={15} marginTop={7} center>
                                    <Flex>
                                        <InputRadio
                                        checked={formik.values?.levellist[0]?.difficulty ===  data.label}
                                            onClick={() => { formik.setFieldValue('difficulty', data.label) }}
                                        />
                                    </Flex>
                                    <Flex>
                                        {data.label}
                                    </Flex>
                                </Flex>)
                            })}
                        </Flex>
                        <Flex marginTop={10}>
                            <InputText
                                className={styles.addinput}
                                placeholder='Type your interview question here'
                                onChange={(e) => handlequestion(e)}
                            />
                        </Flex>
                        <Flex row marginTop={17} end>
                            <Flex marginRight={20}>
                                <Button types="close" width="75px">Cancel</Button>
                            </Flex>
                            <Flex>
                                <Button types='primary' width="75px">Add</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Modal>




            {/* Re-generate Question by AI Modal popup */}
            <Modal open={false}>
                <Flex className={styles.overalladd}>
                    <Flex style={{ borderBottom: '1px solid #581845' }} >
                        <Text size={14} bold>Re-generate Question by AI</Text>
                    </Flex>
                    <Flex style={{ borderBottom: '0.5px solid #C3C3C3' }}>
                        <Flex marginTop={9}>
                            <Text size={13} color='theme'>Choose the type(s) of interview questions.</Text>
                        </Flex>
                        <Flex row>
                            {Typeofinterviewquestion.map((data, index) => {
                                return (<Flex key={index} row marginRight={18} marginTop={7} center>
                                    <Flex>
                                        <InputCheckBox
                                            onClick={() => handledata(data, index)}
                                        />
                                    </Flex>
                                    <Flex marginLeft={5}>
                                        {data.label}
                                    </Flex>
                                </Flex>)
                            })}
                        </Flex>
                    </Flex>
                    <Flex style={{ borderBottom: '0.5px solid #C3C3C3', paddingbottom: '15px' }}>
                        {isstoreaddData.length !== 0 &&
                            <Flex >
                                <Flex marginTop={5}>
                                    <Text size={13} color='theme'>Choose the difficulty level of the question and question count.</Text>
                                </Flex>
                                {isstoreaddData.map((data, index) => {
                                    return (
                                        <Flex row key={index} marginTop={10} marginBottom={10}>
                                            <Flex width={72}>
                                                {data.label}:
                                            </Flex>
                                            <Flex row start>
                                                <Flex row center marginLeft={25} >
                                                    <Flex row center marginLeft={10}>
                                                        <Flex marginRight={10}>
                                                            <InputCheckBox
                                                                // checked={formik.values.levellist[index].levelvalue[data.label]}
                                                                onChange={(e) => handleCheckboxChange(index, data.label, e.target.checked, '1')}
                                                            />
                                                        </Flex>
                                                        <Flex marginRight={10}>
                                                            Easy
                                                        </Flex>
                                                        <Flex disabled={!formik.values.levellist[index]?.levelvalue?.iseasycheck} marginRight={15}>

                                                            <input
                                                                min="0"
                                                                max="15"
                                                                type="number"
                                                                onChange={(e) => handlequestionno(index, e, '1', 'Easy')}
                                                                maxLength={3}
                                                                style={{ height: "20px", border: '1px solid #A5889C', borderRadius: '4px' }}
                                                            >
                                                            </input>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex row center marginLeft={10}>
                                                        <Flex marginRight={10}>
                                                            <InputCheckBox
                                                                // checked={formik.values.levellist[index].levelvalue[data.label]}
                                                                onChange={(e) => handleCheckboxChange(index, data.label, e.target.checked, '2')}
                                                            />
                                                        </Flex>
                                                        <Flex marginRight={10}>
                                                            Medium
                                                        </Flex>
                                                        <Flex disabled={!formik.values.levellist[index]?.levelvalue?.ismediumcheck} marginRight={15}>

                                                            <input
                                                                min="0"
                                                                max="15"
                                                                type="number"
                                                                onChange={(e) => handlequestionno(index, e, '2', 'Medium')}
                                                                maxLength={3}
                                                                style={{ height: "20px", border: '1px solid #A5889C', borderRadius: '4px' }}
                                                            >
                                                            </input>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex row center marginLeft={10}>
                                                        <Flex marginRight={10}>
                                                            <InputCheckBox
                                                                // checked={formik.values.levellist[index].levelvalue[data.label]}
                                                                onChange={(e) => handleCheckboxChange(index, data.label, e.target.checked, '3')}
                                                            />
                                                        </Flex>
                                                        <Flex marginRight={10}>
                                                            Hard
                                                        </Flex>
                                                        <Flex disabled={!formik.values.levellist[index]?.levelvalue?.ishardcheck} marginRight={15}>

                                                            <input
                                                                min="0"
                                                                max="15"
                                                                type="number"
                                                                onChange={(e) => handlequestionno(index, e, '3', 'Hard')}
                                                                maxLength={3}
                                                                style={{ height: "20px", border: '1px solid #A5889C', borderRadius: '4px' }}
                                                            >
                                                            </input>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    )
                                })}
                            </Flex>
                        }
                        {isstoreaddData.length !== 0 && formik.values.levellist.length !== 0 && <Flex><Text color='error' size={12} style={{ marginBottom: '5px' }}>{overalldata}</Text></Flex>}
                    </Flex>

                    <Flex row marginTop={17} end>
                        <Flex marginRight={20}>
                            <Button types="close" width="75px">Cancel</Button>
                        </Flex>
                        <Flex>
                            <Button types='primary' width="75px" onClick={() => handleSubmit()}>Add</Button>
                        </Flex>
                    </Flex>

                </Flex>
            </Modal>





            {/* Generate Question by AI */}
            <Modal open={false}>
                <Flex className={styles.overalladd}>
                    <Flex  >
                        <Text size={14} bold>Re-generate Question by AI</Text>
                    </Flex>
                    <Flex>
                        <Flex marginTop={9}>
                            <Text size={13} color='theme'>Select the role for the interview.</Text>
                        </Flex>
                        <Flex>
                            <InputSearch
                                setFieldValue={formik.setFieldValue}
                                options={role}
                                name={`role`}
                                placeholder='Type your interview question here'
                                onChange={handlerole}
                                initialValue={formik.values.role}
                                onkeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        formik.setFieldValue("role", event.target.value);
                                    }
                                }}
                                required
                            />
                        </Flex>
                    </Flex>
                    <Flex style={{ borderBottom: '0.5px solid #C3C3C3', paddingBottom: '10px' }}>
                        <Flex marginTop={9}>
                            <Text size={13} color='theme'>Choose the type(s) of interview questions.</Text>
                        </Flex>
                        <Flex row>
                            {Typeofinterviewquestion.map((data, index) => {
                                return (<Flex key={index} row marginRight={18} marginTop={7} center>
                                    <Flex>
                                        <InputCheckBox
                                            onClick={() => handledata(data, index)}
                                        />
                                    </Flex>
                                    <Flex marginLeft={5}>
                                        {data.label}
                                    </Flex>
                                </Flex>)
                            })}
                        </Flex>
                    </Flex>
                    <Flex style={{ borderBottom: '0.5px solid #C3C3C3', paddingbottom: '15px' }}>
                        {isstoreaddData.length !== 0 &&
                            <Flex >
                                <Flex marginTop={5}>
                                    <Text size={13} color='theme'>Choose the difficulty level of the question and question count.</Text>
                                </Flex>
                                {isstoreaddData.map((data, index) => {
                                    return (
                                        <Flex row key={index} marginTop={10} marginBottom={10}>
                                            <Flex width={72}>
                                                {data.label}:
                                            </Flex>
                                            <Flex row start>
                                                <Flex row center marginLeft={25} >
                                                    <Flex row center marginLeft={10}>
                                                        <Flex marginRight={10}>
                                                            <InputCheckBox
                                                                // checked={formik.values.levellist[index].levelvalue[data.label]}
                                                                onChange={(e) => handleCheckboxChange(index, data.label, e.target.checked, '1')}
                                                            />
                                                        </Flex>
                                                        <Flex marginRight={10}>
                                                            Easy
                                                        </Flex>
                                                        <Flex disabled={!formik.values.levellist[index]?.levelvalue?.iseasycheck} marginRight={15}>

                                                            <input
                                                                min="0"
                                                                max="15"
                                                                type="number"
                                                                onChange={(e) => handlequestionno(index, e, '1', 'Easy')}
                                                                maxLength={3}
                                                                style={{ height: "20px", border: '1px solid #A5889C', borderRadius: '4px' }}
                                                            >
                                                            </input>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex row center marginLeft={10}>
                                                        <Flex marginRight={10}>
                                                            <InputCheckBox
                                                                // checked={formik.values.levellist[index].levelvalue[data.label]}
                                                                onChange={(e) => handleCheckboxChange(index, data.label, e.target.checked, '2')}
                                                            />
                                                        </Flex>
                                                        <Flex marginRight={10}>
                                                            Medium
                                                        </Flex>
                                                        <Flex disabled={!formik.values.levellist[index]?.levelvalue?.ismediumcheck} marginRight={15}>

                                                            <input
                                                                min="0"
                                                                max="15"
                                                                type="number"
                                                                onChange={(e) => handlequestionno(index, e, '2', 'Medium')}
                                                                maxLength={3}
                                                                style={{ height: "20px", border: '1px solid #A5889C', borderRadius: '4px' }}
                                                            >
                                                            </input>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex row center marginLeft={10}>
                                                        <Flex marginRight={10}>
                                                            <InputCheckBox
                                                                // checked={formik.values.levellist[index].levelvalue[data.label]}
                                                                onChange={(e) => handleCheckboxChange(index, data.label, e.target.checked, '3')}
                                                            />
                                                        </Flex>
                                                        <Flex marginRight={10}>
                                                            Hard
                                                        </Flex>
                                                        <Flex disabled={!formik.values.levellist[index]?.levelvalue?.ishardcheck} marginRight={15}>

                                                            <input
                                                                min="0"
                                                                max="15"
                                                                type="number"
                                                                onChange={(e) => handlequestionno(index, e, '3', 'Hard')}
                                                                maxLength={3}
                                                                style={{ height: "20px", border: '1px solid #A5889C', borderRadius: '4px' }}
                                                            >
                                                            </input>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    )
                                })}
                            </Flex>
                        }
                        {isstoreaddData.length !== 0 && formik.values.levellist.length !== 0 && <Flex><Text color='error' size={12} style={{ marginBottom: '5px' }}>{overalldata}</Text></Flex>}
                    </Flex>
                    <Flex row marginTop={17} end>
                        <Flex marginRight={20}>
                            <Button types="close" width="75px">Cancel</Button>
                        </Flex>
                        <Flex>
                            <Button types='primary' width="75px" onClick={() => handleSubmit()}>Add</Button>
                        </Flex>
                    </Flex>

                </Flex>
            </Modal>
        </>
    )
}
export default Interviewmodalpopup;