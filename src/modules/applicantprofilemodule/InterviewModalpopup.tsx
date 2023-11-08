import { useEffect, useRef, useState } from 'react';
import { isEmptyArray, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { Button, Card, ErrorMessage, InputCheckBox, InputSearch, InputText, Loader, Modal } from '../../uikit';
import SvgClose from '../../icons/SvgClose';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import SingleButton from '../common/SingleButton';
import styles from '../applicantprofilemodule/InterviewModalpopup.module.css';
import { rolevaluemiddleware } from '../calendarModule/store/middleware/calendarmiddleware';
import { Typeofinterviewquestion, Difficultylevel, level } from './mock';

type Props = {
    isregeneratequestion?: boolean;
    isgeneratequestion?: boolean;
    isaddqustion?: boolean;
    setregeneratequestion?: (val: boolean) => void;
    setgeneratequestion?: (val: boolean) => void;
    setAddquestion?: (val: boolean) => void;
    AddnewQuestion?: (val: any) => void,
    Regeneratequestion?: (val: any) => void,
    generatequestion?: (val: any) => void,
    isloader?: boolean;
};

const Interviewmodalpopup = ({
    isregeneratequestion,
    isgeneratequestion,
    isaddqustion,
    setregeneratequestion,
    setgeneratequestion,
    setAddquestion,
    AddnewQuestion,
    Regeneratequestion,
    generatequestion,
    isloader
}: Props) => {
    //Add Question Modal  state

    //Re-generate Question by AI Modal  state
    const dispatch: AppDispatch = useDispatch();
    const [isstoreaddData, setstoreaddData] = useState<any>([]);
    const [increasedata, setincreasedata] = useState<any>(0);
    const [overalldata, setoveralldata] = useState<any>('');
    const [iserrorhandle, seterrorhandle] = useState<any>(false);
    const [iserrorhandleadd, seterrorhandleadd] = useState<any>(false);
    const [iserrorhandlerole, seterrorhandlerole] = useState<any>(false);
    const [istringgerdata, settriggerdata] = useState<any>(false);
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
        levellist: [],
        role: '',
    };

    // add newquestion
    const handleSubmit = (e) => {
        if (isEmptyArray(formik.values.levellist)) {
            seterrorhandle(true);
        }
        if (!isEmptyArray(formik.values.levellist) && e === 'add') {
            if (formik.values?.levellist[0]?.levelvalue?.difficulty !== '' && formik.values?.levellist[0]?.levelvalue.difficulty !== undefined &&
                formik.values?.levellist[0]?.levelvalue?.question !== '' && formik.values?.levellist[0]?.levelvalue.question !== undefined &&
                formik.values?.levellist[0]?.levelvalue?.questiontype !== '' && formik.values?.levellist[0]?.levelvalue.questiontype !== undefined) {
                AddnewQuestion(formik.values)
                seterrorhandleadd(false);
            }
            else {
                seterrorhandleadd(true);
            }

        }
        if (!isEmptyArray(formik.values.levellist) && e === 'regenerate') {
            Regeneratequestion(formik.values)
        }
        if (!isEmptyArray(formik.values.levellist) && e === 'genereate') {
            if (formik.values.role !== '' && formik.values.role !== undefined) {
                generatequestion(formik.values)
                seterrorhandlerole(false)
            }
            else {
                seterrorhandlerole(true)
            }

        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (e) => handleSubmit(e),
    });


    //Add Question Modal  state
    const handlequestion = (e) => {
        formik.setFieldValue('levellist[0].levelvalue.question', e.target.value)
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
                const newLevellist = [...formik.values.levellist];
                newLevellist.splice(levellistIndex, 1);
                formik.setFieldValue('levellist', newLevellist);
            }

            setstoreaddData(updatedData);
        }
    }


    //CHECK BOX ADDING for both Re-generate Question and generate Question by AI Modal  
    const handleCheckboxChange = (index: number, name: string, isChecked: boolean, values) => {

        if (!isChecked) {
            settriggerdata(true);
            const updatedLevelValue = { ...formik.values.levellist[index].levelvalue, name, checked: isChecked }; 
            if (values === "1") {
                updatedLevelValue.iseasycheck = false;
            } else if (values === "2") {
                updatedLevelValue.ismediumcheck = false;
            } else if (values === "3") {
                updatedLevelValue.ishardcheck = false;
            } 
            formik.setFieldValue(`levellist[${index}].levelvalue`, updatedLevelValue);
        }
        else if (index >= 0 && index < formik.values.levellist.length) {
            settriggerdata(true); 
            const updatedLevelValue = { ...formik.values.levellist[index].levelvalue, name, checked: isChecked }; 
            if (values === "1") {
                updatedLevelValue.iseasycheck = true;
            } else if (values === "2") {
                updatedLevelValue.ismediumcheck = true;
            } else if (values === "3") {
                updatedLevelValue.ishardcheck = true;
            } 
            formik.setFieldValue(`levellist[${index}].levelvalue`, updatedLevelValue);  
        } else {
            settriggerdata(true);
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


    //Handlecloseforms
    const closeforms = () => {
        setstoreaddData([])
        seterrorhandle(false);
        seterrorhandleadd(false);
        seterrorhandlerole(false);
        formik.resetForm();
        setregeneratequestion(false);
        setgeneratequestion(false);
        setAddquestion(false);
    }


    //useEffect for both Re-generate Question and generate Question by AI Modal  
    useEffect(() => {
        const aggregateLevels = (levellist) => { 
            let totalEasy = 0;
            let totalMedium = 0;
            let totalHard = 0; 

            for (const item of levellist) {
                totalEasy += parseInt(item.levelvalue.iseasycheck === true && item.levelvalue.easy) || 0;
                totalMedium += parseInt(item.levelvalue.ismediumcheck === true &&item.levelvalue.medium) || 0;
                totalHard += parseInt(item.levelvalue.ishardcheck === true &&item.levelvalue.hard) || 0;
            }

            // Create an object with the aggregated values
            const aggregatedValues = totalEasy + totalMedium + totalHard;

            return aggregatedValues;
        };
        const aggregatedValues = aggregateLevels(formik.values.levellist);
        if (!isEmptyArray(formik.values.levellist) && iserrorhandle) {
            seterrorhandle(false)
        }
        if (aggregatedValues > 15) {
            setoveralldata('the have only 15')
        }
        else if (aggregatedValues < 1) {
            setoveralldata('the have only 15')
        }
        else if (aggregatedValues <= 15 && aggregatedValues >= 1) {
            seterrorhandle(false)
            setoveralldata('')
        }
        if (formik.values?.levellist[0]?.levelvalue?.difficulty !== '' && formik.values?.levellist[0]?.levelvalue.difficulty !== undefined &&
            formik.values?.levellist[0]?.levelvalue?.question !== '' && formik.values?.levellist[0]?.levelvalue.question !== undefined &&
            formik.values?.levellist[0]?.levelvalue?.questiontype !== '' && formik.values?.levellist[0]?.levelvalue.questiontype !== undefined) {
            seterrorhandleadd(false);
        }
        if (formik.values.role !== '' && formik.values.role !== undefined) {
            seterrorhandlerole(false)
        }

    }, [formik.values.levellist, iserrorhandle, formik.values?.levellist[0]?.levelvalue?.question,
    formik.values?.levellist[0]?.levelvalue?.difficulty, formik.values?.levellist[0]?.levelvalue?.questiontype,
    formik.values.role, istringgerdata])

    console.log(iserrorhandle, 'puugscvv', iserrorhandleadd)
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
            <Modal open={isaddqustion}>
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
                                        <InputRadio
                                            checked={formik.values?.levellist[0]?.levelvalue?.questiontype === data.label}
                                            onClick={() => { formik.setFieldValue('levellist[0].levelvalue.questiontype', data.label) }}
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
                                            checked={formik.values?.levellist[0]?.levelvalue?.difficulty === data.label}
                                            onClick={() => { formik.setFieldValue('levellist[0].levelvalue.difficulty', data.label) }}
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
                        {iserrorhandle && <Flex><Text color='error' size={12} style={{ marginTop: '5px' }}>This field is required</Text></Flex>}
                        {iserrorhandleadd && <Flex><Text color='error' size={12} style={{ marginTop: '5px' }}>This field is required</Text></Flex>}
                        <Flex row marginTop={17} end>
                            <Flex marginRight={20} onClick={closeforms}>
                                <Button types="close" width="75px">Cancel</Button>
                            </Flex>
                            <Flex>
                                {isloader ? <Flex middle center style={{ width: '75px' }}>
                                    <Loader size="small" withOutOverlay />
                                </Flex> : <Button types='primary' width="75px" onClick={() => handleSubmit('add')} >Add</Button>}
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Modal>




            {/* Re-generate Question by AI Modal popup */}
            <Modal open={isregeneratequestion}>
                <Flex className={styles.overalladd}>
                    <Flex style={{ borderBottom: '1px solid #581845' }} >
                        <Text size={14} bold>Re-generate Question by AI</Text>
                    </Flex>
                    <Flex style={{ borderBottom: '0.5px solid #C3C3C3', paddingBottom: "15px" }}>
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


                    </Flex>
                    {isstoreaddData.length !== 0 && formik.values.levellist.length !== 0 && <Flex><Text color='error' size={12} style={{ marginBottom: '5px' }}>{overalldata}</Text></Flex>}
                    {iserrorhandle && <Flex><Text color='error' size={12} style={{ marginTop: '5px' }}>This field is required</Text></Flex>}
                    <Flex row marginTop={17} end>
                        <Flex marginRight={20} onClick={closeforms}>
                            <Button types="close" width="75px">Cancel</Button>
                        </Flex>
                        <Flex>
                            {isloader ? <Flex middle center style={{ width: '75px' }}>
                                <Loader size="small" withOutOverlay />
                            </Flex> :
                                <Button types='primary' width="75px" onClick={() => handleSubmit('regenerate')}>Add</Button>}
                        </Flex>
                    </Flex>

                </Flex>
            </Modal>





            {/* Generate Question by AI */}
            <Modal open={isgeneratequestion}>
                <Flex className={styles.overalladd}>
                    <Flex  >
                        <Text size={14} bold>Generate Question by AI</Text>
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
                    </Flex>
                    {iserrorhandlerole && <Flex><Text color='error' size={12} style={{ marginTop: '5px' }}>This field is required</Text></Flex>}
                    {iserrorhandle && <Flex><Text color='error' size={12} style={{ marginTop: '5px' }}>This field is required</Text></Flex>}
                    {!iserrorhandlerole && isstoreaddData.length !== 0 && formik.values.levellist.length !== 0 && <Flex><Text color='error' size={12} style={{ marginBottom: '5px' }}>{overalldata}</Text></Flex>}
                    <Flex row marginTop={17} end>
                        <Flex marginRight={20} onClick={closeforms} >
                            <Button types="close" width="75px">Cancel</Button>
                        </Flex>
                        <Flex>
                            {isloader ? <Flex middle center style={{ width: '75px' }}>
                                <Loader size="small" withOutOverlay />
                            </Flex> :
                                <Button types='primary' width="75px" onClick={() => handleSubmit('genereate')}>Add</Button>}
                        </Flex>
                    </Flex>

                </Flex>
            </Modal>
        </>
    )
}
export default Interviewmodalpopup;
