import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Flex,
    Text,
    Button,
    CheckBox,
    InputCheckBox,
    InputRadio,
    InputText,
    ErrorMessage,
    Loader,
    Toast,
    Card,
    Modal,
} from '../../uikit';
import { AppDispatch } from '../../store';
import Tab from '../../uikit/Tab/Tab';
import Tabs from '../../uikit/Tab/Tabs';
import { Difficultylevel, Typeofinterviewquestion, level } from '../myjobposting/mock';
import SvgAddquestion from '../../icons/addquestion';
import { PRIMARY } from '../../uikit/Colors/colors';
import styles from './styles/createScheduleForm.module.css';
import { Interview_question_middleware } from './store/middleware/calendarmiddleware';





interface Props {
    interviewer: any;
    setinterviewer: any;
    formikval: any;
    isQuestionChecked: any;
    handlecheck: any;
    handlechange1: any;
    handlefunction1: any;
    handlechange: any;
    meetingForm: any;
    setShowPopup: any;
    setViewMeetingSummary: any;
    sample: any;
    update_state: any;
    setnewquestion: any;
    newquestion1: any;
    setallids: any;
    setaddquestion: any;
};

export const QuestionListModel = ({
    interviewer,
    setinterviewer,
    formikval,
    isQuestionChecked,
    handlecheck,
    handlechange1,
    handlefunction1,
    handlechange,
    meetingForm,
    setShowPopup,
    setViewMeetingSummary,
    sample,
    update_state,
    setnewquestion,
    newquestion1,
    setallids,
    setaddquestion,
}: Props) => {

    const [showstate, setshowstate] = useState(false)
    const [questions, setquestions] = useState([])
    const [questionerror,setquestionerror]=useState(false)
    const [openmodel, setopenmodel] = useState(false)
    const [isSubmitLoader, setSubmitLoader] = useState(false);
    const [error, seterror] = useState(false)
    const [currentLetter, setcurrentLetter] = useState('A');
    const dispatch: AppDispatch = useDispatch();
    interface LevelValue {
        name: string;
        easy: string;
        iseasycheck: boolean;
        medium: string;
        ismediumcheck: boolean;
        hard: string;
        ishardcheck: boolean;
        checked: boolean;
    }
    interface levellist {
        id: any;
        level: LevelValue[];
        role: string;
        sucess: boolean;
        lastname:any;
        firstname:any;
        totalError?: string;
    }
    interface questionid {
        id: any;
        question: string[];
       
    }
    interface addquestion {
        id: any;
        question: any;
        level: any;
        type: any;
        checked: boolean;
        attendees: any;
    }
    interface MyFormValues {
        levellist: levellist[];
        question: questionid[];
        questionid: string[];
        addquestion: addquestion[];
    }

    const initialValues: MyFormValues = {
        levellist: [],
        question: [],
        questionid: [],
        addquestion: [],
    };
    const handleCompanyPageValid = (values: MyFormValues) => {
        const errors: { levellist?: Partial<levellist>[] } = {}; 
        const sumValues = (levels: LevelValue[]) => {
            let easySum = 0;
            let mediumSum = 0;
            let hardSum = 0;

            levels.forEach(item => {
               
                if (item.iseasycheck) {
                    easySum += parseInt(item.easy) || 0;
                }
                if (item.ismediumcheck) {
                    mediumSum += parseInt(item.medium) || 0;
                }
                if (item.ishardcheck) {
                    hardSum += parseInt(item.hard) || 0;
                }
            });
    
            return { easySum, mediumSum, hardSum };
        };

        values.levellist.forEach((data, index) => {
            const sums = sumValues(data.level);
            const total = sums.easySum + sums.mediumSum + sums.hardSum;

            if (total > 15 || total === 0) {
                errors.levellist = errors.levellist || [];
                const existingError: Partial<levellist> = errors.levellist[index] || {};
                if (sample[index].success === false) {
                    errors.levellist[index] = {
                        ...existingError,
                        totalError: "Total value exceeds 15 or is equal to zero",
                        id: data.id 

                    };
                }
            }
        });

      
        if (errors.levellist && errors.levellist.length === 0) {
            delete errors.levellist;
        }

        return errors;
    };

    const filterObj = (datas) => {
        const filteredData = datas.map(item => {
            const filteredA = [];
            const targetType = "string";
            console.log("item.data.Question", item)
            item.question?.Question?.forEach(question => {
                question.Value.forEach(value => {
                    value.Map_question.forEach(mapQuestion => {
                        console.log("mapQuestion.id", mapQuestion.id, typeof mapQuestion.id)
                        if (typeof mapQuestion.id === targetType) {
                            filteredA.push(mapQuestion);
                        }
                    });
                });
            });
            return filteredA;
        }).flat();
        return filteredData; 
    }

    const handleSubmit = () => {

        const questionErrors = {};
        let isValid = true;
        
        const filteredData = filterObj(sample)

        console.log("filteredDatafilteredData/////////", filteredData,isValid)
        formik.values.question.some((item, index) => {
            if (item.question.length === 0) {
                questionErrors[`questions[${index}].question`] = 'This question must not be empty.';
                isValid = false;
            }

        });
        const arrayLengths = formik.values?.question?.map(obj => {
            if (obj.question.length === 0) {
              return false;
            } else {
              return true;
            }
          });
          console.log(arrayLengths,"///////;;;;;;;;;;;;;;;;");
          const result = arrayLengths.includes(false) ? false : true;
          console.log(result,"////////////;;;;;;;");
          if(result){
            handlechange()
            setaddquestion(filteredData)
          }else{
            setquestionerror(true)
          }
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: () => handleSubmit(),
        validate: handleCompanyPageValid,
    });

    useEffect(() => {
        const mappedArray = formikval.values.checkedValues.map(item => ({
            id: item.id,
            level: [],
            role: item.role,
            success: false,
            lastname:item.lastName,
            firstname:item.firstName
        }));

        formik.setFieldValue('levellist', mappedArray);
        //formikval.setFieldValue('questionid', []);
    }, []);
    useEffect(() => {
        const mappedArray = formikval.values.checkedValues.map(item => ({
            id: item.id,
            question: [],
        }));

        formik.setFieldValue('question', mappedArray);
        //formikval.setFieldValue('questionid', []);
    }, []);

    useEffect(() => {
        setallids(formik.values.question)
    }, [formik.values])

    const handleCheckboxChange = (index: number, event: React.ChangeEvent<HTMLInputElement>, ids: number) => {
        const isChecked = event.target.checked;

        const updatedValues = JSON.parse(JSON.stringify(formik.values.levellist));
        let listItem = updatedValues.find(item => item.id === ids);
        if (!listItem) {
            console.warn(`No listItem found for ID ${ids}`);
            return;
        }
        console.log("level111", level)

        let levelItemIndex = listItem.level.findIndex(lvl => lvl.name === level[index].value);

        if (levelItemIndex !== -1) {
            if (!isChecked) {
                listItem.level.splice(levelItemIndex, 1);
            }
        } else if (isChecked) {
            listItem.level.push({
                name: level[index].value,
                easy: '',
                iseasycheck: false,
                medium: '',
                ismediumcheck: false,
                hard: '',
                ishardcheck: false,
                checked: isChecked
            });
        }
        formik.setFieldValue('levellist', updatedValues);
    };


    const isCheckboxChecked = (userId: number, jobName: string): boolean => {
        const userItem = formik.values.levellist.find(item => item.id === userId);
        return userItem?.level.some(lvl => lvl.name === jobName && lvl.checked) || false;
    };

    const validateError = (listIndex) => {

        const errorItem = formik.errors.levellist?.[listIndex];

        if (errorItem && typeof errorItem !== 'string') {
            const errorForThisItem = errorItem.totalError;

            console.log("errorForThisItem==>errorForThisItem", errorForThisItem)
            if (errorForThisItem) {
                return <Text color='error'>{errorForThisItem}</Text>;
            }
        }
        return null;
    }
    const generatequestion = (listIndex, id) => {
        const errorItem = formik.errors.levellist?.[listIndex];
        if (typeof errorItem !== 'string' && errorItem?.totalError) return null;

        setSubmitLoader(true);
        const transformLevelListData = (levellist, targetId) => {
            return levellist
                .filter(item => item.id === targetId)
                .map(item => {
                    const questionArray = item.level.flatMap(levelItem => {
                        if (!levelItem.checked) return [];

                        const mappings = [
                            { key: 'iseasycheck', countKey: 'easy', level: 'Easy' },
                            { key: 'ismediumcheck', countKey: 'medium', level: 'Medium' },
                            { key: 'ishardcheck', countKey: 'hard', level: 'Hard' },
                        ];

                        return mappings.reduce((acc, map) => {
                            console.warn(levelItem , levelItem,levelItem[map.key], levelItem[map.countKey],"vavavavavavavavavav//")
                            if (levelItem[map.key] && levelItem[map.countKey]) {
                                acc.push({
                                    level: map.level,
                                    type: levelItem.name.toLowerCase(),
                                    count: levelItem[map.countKey]
                                });
                            }
                            return acc;
                        }, []);
                    });

                    return {
                        id: item.id,
                        role: item.role,
                        question: questionArray
                    };
                });
        };
        const combinedData = transformLevelListData(formik.values.levellist, id);
        console.log("Combined Data:", combinedData);

        const formData = new FormData();
        formData.append('role', JSON.stringify(combinedData));
        formData.append('summary', formikval.values.brieftext);
        formData.append('can_id', meetingForm.applicant.id);
        formData.append('jd_id', meetingForm.job.value);

        dispatch(Interview_question_middleware({ formData }))
            .then((response) => {
                if (response?.payload?.success === true) {
                    setSubmitLoader(false);
                    setshowstate(true);
                    console.log("response", response.payload);
                    update_state(response.payload.data);
                    const addQuestion = response.payload.data;
                    if (!Array.isArray(addQuestion)) {
                        console.log("addQuestion is not an array:", addQuestion);

                        setquestions(prevQuestions => [...prevQuestions, addQuestion]);
                    } else {

                        setquestions(prevQuestions => [...prevQuestions, ...addQuestion]);
                    }

                    // const extractIdsFromQuestions = (dataArray) => {
                    //     return dataArray
                    //       .flatMap(item => item.Question) 
                    //       .flatMap(category => category.Value) 
                    //       .flatMap(value => value.Map_question)
                    //       .map(question => question.id); 
                    //   };

                    //   const index = findUserIndexById(questions, id);
                    //   console.warn(index); // Outputs: 1

                    //   const allIds = extractIdsFromQuestions(Array(response.payload.data));
                    //   formik.setFieldValue('questionid',allIds)
                    setViewMeetingSummary(false);
                    setShowPopup(true);
                } else {
                    setSubmitLoader(false);
                    Toast('Sorry, there was a problem connecting to the API. Please try again later.', 'LONG', 'error');
                }
            });

        return null;
    };
    // function findAllIndexesByLevel(valueArray, level1) {
    //     console.warn(valueArray,level1)
    //     return Array(valueArray).map((item, outerIndex) => {
    //       const innerIndex = item.Map_question.findIndex(q => q.level === level1);
    //       return innerIndex !== -1 ? { outerIndex, innerIndex } : null;
    //     }).filter(indexes => indexes !== null);
    //   }
    // const validatequestion=()=>{
    //     const index = sample.findIndex(q => q.id === formik.values.addquestion[0].id);
    //     if (index !== -1) {
    //         const newQuestionArray = [...sample];
    //         const newquestion= newQuestionArray[index].question
    //         const idx=newquestion?.Question.findIndex(val=>val.Category===  formik.values.addquestion[0].level)
    //         const arrayquestion=newquestion?.Question[idx]
    //         const levelToFind = formik.values.addquestion[0].difficultly; // The level you're looking for
    //         const indexes = findAllIndexesByLevel(arrayquestion, levelToFind);
    //         console.warn(index,newQuestionArray, newquestion,idx,indexes)
    //     }
    // }


    const validatequestion = () => {
        console.log("Formik values:///////", formik.values.addquestion[0]);
        if (formik.values.addquestion[0] !== undefined && formik.values.addquestion[0]?.type !== '' && formik.values.addquestion[0]?.level !== '' && formik.values.addquestion[0]?.question !== '') {
            const [{ addquestion }] = [formik.values];
            const [newQuestion] = addquestion;
            const index = sample.findIndex(({ id }) => id === newQuestion.attendees);
            if (index === -1) {
                alert("Question ID not found in the sample.");
                setopenmodel(false);
                formik.resetForm();
                return;
            }
            const [questionItem] = sample.splice(index, 1);
            let category = questionItem.question.Question.find(({ Category }) => Category === newQuestion.type);
            if (!category) {
                category = {
                    Category: newQuestion.type,
                    Value: [{ Map_question: [newQuestion] }]
                };
                questionItem.question.Question.push(category);
            } else {
                let levelMap = category.Value.find(val => val.Map_question.some(({ level: mapLevel }) => mapLevel === newQuestion.level));
                if (!levelMap) {
                    levelMap = { Map_question: [newQuestion] };
                    category.Value.push(levelMap);
                } else {
                    levelMap.Map_question.push(newQuestion);
                }
            }

            sample.splice(index, 0, questionItem);
            setcurrentLetter(newQuestion.id);
            setopenmodel(false);

        }
        else {
            seterror(true)
        }
        formik.resetForm();
        console.log("Updated sample:", sample);
    };


    function getNextLetter(letter) {
        if (letter.length === 1) {
            if (letter === 'Z') {
                return 'AA';
            } else {
                return String.fromCharCode(letter.charCodeAt(0) + 1);
            }
        } else {
            const lastChar = letter.slice(-1);
            const remaining = letter.slice(0, -1);
            if (lastChar === 'Z') {
                return getNextLetter(remaining) + 'A';
            } else {
                return remaining + String.fromCharCode(lastChar.charCodeAt(0) + 1);
            }
        }
    }

    const functioncall = () => {
        setopenmodel(true)
        formik.setFieldValue('addquestion[0].type', '')
        formik.setFieldValue('addquestion[0].level', '')
        formik.setFieldValue('addquestion[0].question', '')
    }

    const nextLetter = getNextLetter(currentLetter);
    console.log("nextLetternextLetternextLetter", nextLetter)


    return (
        <>
            <Modal open={openmodel} >
                {console.log(formik.values.addquestion[0]?.type !== '' && formik.values.addquestion[0]?.level !== '' && formik.values.addquestion[0]?.question !== '')}
                <Flex style={{ backgroundColor: '#FFF', width: '600px', height: 'auto', padding: '25px' }}>

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
                                            checked={formik.values?.addquestion[0]?.type === data.value}
                                            onClick={() => {
                                                formik.setFieldValue('addquestion[0].type', data.value)
                                                formik.setFieldValue('addquestion[0].id', nextLetter)
                                                formik.setFieldValue('addquestion[0].attendees', sample[interviewer].id)
                                            }
                                            }
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
                                            checked={formik.values?.addquestion[0]?.level === data.value}
                                            onClick={() => formik.setFieldValue('addquestion[0].level', data.value)}
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
                                onChange={(e) => formik.setFieldValue('addquestion[0].question', e.target.value)}
                            />
                        </Flex>
                        {error && !(formik.values.addquestion[0]?.type !== '' && formik.values.addquestion[0]?.level !== '' && formik.values.addquestion[0]?.question !== '') && <Text color='error'>Please fill all the above fields</Text>}
                        <Flex row marginTop={17} end>
                            <Flex marginRight={20} onClick={() => setopenmodel(false)}>
                                <Button types="close" width="75px">Cancel</Button>
                            </Flex>
                            <Flex>
                                <Button types='primary' width="75px" onClick={validatequestion} >Add</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Modal>
            <Flex className={styles.scrollfornav} style={{ backgroundColor: '#FFF', width: '700px', height: 'auto', padding: '25px' }}>
                {console.log("newwww::new", sample, formik.values, formik.errors, nextLetter)}
                <Text size={14} bold >AI generated Interview Questions</Text>
                <Flex style={{ display: 'flex', width: '650px', flexWrap: 'nowrap', overflowX: 'scroll' }}>
                    <Tabs activeKey={interviewer}
                        onSelect={(keys: any) => {
                            setinterviewer(keys);
                            sessionStorage.setItem('interviewer', keys);
                        }}
                    >
                        {formikval.values.checkedValues.map((user, index) => (
                            <Tab key={index} eventKey={JSON.stringify(index)} title={`${user.firstName} ${user.lastName}`}>
                                <Flex style={{ overflowY: 'scroll', maxHeight: '400px', overflowX: 'hidden' }}>
                                    <Flex between row style={{ padding: '10px 0  ' }}>
                                        <Text size={12} bold style={{ padding: '5px 0' }}>
                                            {`${user.role} - Interview Questions`}
                                        </Text>
                                        <Flex>
                                            {sample[interviewer]?.success === true ? (
                                                <Flex onClick={functioncall} row style={{ alignItem: 'center' }}>
                                                    <SvgAddquestion fill={PRIMARY} />
                                                    <Text color='link' bold style={{ padding: '0 0 0 3px' }}>Add Question</Text>
                                                </Flex>
                                            ) : (isSubmitLoader ? (
                                                <Flex style={{ margin: '3px 0 0 15px' }}>
                                                    <Loader size="small" withOutOverlay />
                                                </Flex>
                                            ) :
                                                (<Button
                                                     onClick={() => generatequestion(index, user.id)

                                                }>Generate</Button>))}
                                        </Flex>
                                    </Flex>
                                    {sample[index].success === false ? (
                                        <Flex>
                                            <Flex >
                                                <Flex>
                                                    <Text>Generate the interview question based on the type and difficulty level.</Text>
                                                </Flex>

                                            </Flex>
                                            <Text> Choose the type(s) of interview questions.</Text>
                                            <Flex row>
                                                {level.map((jobList, idx) => {

                                                    const modifiedJobList = {
                                                        ...jobList,
                                                        name: jobList.value,
                                                    };

                                                    return (
                                                        <Flex key={modifiedJobList.name} style={{ margin: '0  20px  10px 0 ' }}>
                                                            {console.log("see_ittt", user.id)}
                                                            <InputCheckBox
                                                                label={modifiedJobList.name}
                                                                checked={isCheckboxChecked(user.id, modifiedJobList.name)}
                                                                onChange={(event) => handleCheckboxChange(idx, event, user.id)}
                                                            />
                                                        </Flex>
                                                    );
                                                })}

                                            </Flex>
                                            <Flex>
                                                <Text>Choose the difficulty level of the question and question count.</Text>
                                                {
                                                    formik.values.levellist
                                                        .filter(item => item.id === user.id)
                                                        .map((item, listIndex) => {
                                                            return (
                                                                <>
                                                                    <Flex key={listIndex}>
                                                                        {item.level.map((lvl, lvlIndex) => (
                                                                            <Flex key={lvlIndex} row style={{ margin: "5px 0 5px 0" }}>

                                                                                <Text style={{ width: '85px' }}>{lvl.name}:</Text>
                                                                                <Flex row style={{ display: "flex", alignItems: "center" }}>
                                                                                    <Flex style={{ padding: '0 5px' }}>
                                                                                        <InputCheckBox
                                                                                            onChange={() => {
                                                                                                const updatedLevellist = [...formik.values.levellist];
                                                                                                updatedLevellist[interviewer].level[lvlIndex].iseasycheck = !updatedLevellist[interviewer]?.level[lvlIndex]?.iseasycheck;
                                                                                                formik.setFieldValue('levellist', updatedLevellist);

                                                                                            }}
                                                                                            checked={formik.values?.levellist[interviewer]?.level[lvlIndex]?.iseasycheck}
                                                                                        />
                                                                                    </Flex>
                                                                                    <Flex style={{ padding: '0 5px' }}>
                                                                                        <Text>Easy</Text>
                                                                                    </Flex>
                                                                                    <Flex style={{ padding: '0 5px' }} disabled={!formik.values?.levellist[interviewer]?.level[lvlIndex]?.iseasycheck}>
                                                                                        <input
                                                                                            min="0"
                                                                                            max="15"
                                                                                            type="number"
                                                                                            value={lvl.easy}
                                                                                            onChange={(e) => {
                                                                                                const updatedLevellist = [...formik.values.levellist];
                                                                                                updatedLevellist[interviewer].level[lvlIndex].easy = e.target.value;
                                                                                                formik.setFieldValue('levellist', updatedLevellist);
                                                                                            }}
                                                                                            maxLength={1}
                                                                                            className={styles.scoreinputfield}
                                                                                        />
                                                                                    </Flex>
                                                                                </Flex>
                                                                                <Flex row style={{ display: "flex", alignItems: "center" }}>
                                                                                    <Flex style={{ padding: '0 5px' }}>
                                                                                        <InputCheckBox
                                                                                            onChange={() => {
                                                                                                const updatedLevellist = [...formik.values.levellist];
                                                                                                updatedLevellist[interviewer].level[lvlIndex].ismediumcheck = !updatedLevellist[interviewer]?.level[lvlIndex]?.ismediumcheck;
                                                                                                formik.setFieldValue('levellist', updatedLevellist);
                                                                                            }}
                                                                                            checked={formik.values?.levellist[interviewer]?.level[lvlIndex]?.ismediumcheck}
                                                                                        />
                                                                                    </Flex>
                                                                                    <Flex style={{ padding: '0 5px' }}>
                                                                                        <Text>Medium </Text>
                                                                                    </Flex>
                                                                                    <Flex style={{ padding: '0 5px' }} disabled={!formik.values?.levellist[interviewer]?.level[lvlIndex]?.ismediumcheck}>
                                                                                        <input
                                                                                            min="0"
                                                                                            max="15"
                                                                                            type="number"
                                                                                            value={lvl.medium}
                                                                                            onChange={(e) => {
                                                                                                const updatedLevellist = [...formik.values.levellist];
                                                                                                updatedLevellist[interviewer].level[lvlIndex].medium = e.target.value;
                                                                                                formik.setFieldValue('levellist', updatedLevellist);
                                                                                            }}
                                                                                            maxLength={1}
                                                                                            className={styles.scoreinputfield}
                                                                                        />
                                                                                    </Flex>
                                                                                </Flex>
                                                                                <Flex row style={{ display: "flex", alignItems: "center" }}>
                                                                                    <Flex style={{ padding: '0 5px' }}>
                                                                                        <InputCheckBox
                                                                                            onChange={() => {
                                                                                                const updatedLevellist = [...formik.values.levellist];
                                                                                                updatedLevellist[interviewer].level[lvlIndex].ishardcheck = !updatedLevellist[interviewer]?.level[lvlIndex]?.ishardcheck;
                                                                                                formik.setFieldValue('levellist', updatedLevellist);
                                                                                            }}
                                                                                            checked={formik.values?.levellist[interviewer]?.level[lvlIndex]?.ishardcheck}
                                                                                        />
                                                                                    </Flex>
                                                                                    <Flex style={{ padding: '0 5px' }}>
                                                                                        <Text>Hard</Text>
                                                                                    </Flex>
                                                                                    <Flex style={{ padding: '0 5px' }} disabled={!formik.values?.levellist[interviewer]?.level[lvlIndex]?.ishardcheck}>
                                                                                        <input
                                                                                            min="0"
                                                                                            max="15"
                                                                                            type="number"
                                                                                            value={lvl.hard}
                                                                                            onChange={(e) => {
                                                                                                const updatedLevellist = [...formik.values.levellist];
                                                                                                updatedLevellist[interviewer].level[lvlIndex].hard = e.target.value;
                                                                                                formik.setFieldValue('levellist', updatedLevellist);
                                                                                            }}
                                                                                            maxLength={1}
                                                                                            className={styles.scoreinputfield}
                                                                                        />
                                                                                    </Flex>

                                                                                </Flex>
                                                                            </Flex>
                                                                        ))}
                                                                    </Flex>
                                                                    {console.log("item", item, listIndex)}
                                                                    {validateError(interviewer)}
                                                                </>
                                                            );
                                                        })
                                                }

                                            </Flex>
                                        </Flex>
                                    ) :
                                        (Array(sample[index].question)?.map((val, index1) => (
                                            <Flex key={index1}>
                                                {console.log("value,,,,,", val)}
                                                <Flex>
                                                    {val?.Question?.map((value, ind) => (
                                                        <Card key={ind} className={styles.cardview} >
                                                            <Flex>
                                                                <Text style={{ textTransform: "capitalize" }} bold>
                                                                    {value.Category}
                                                                </Text>
                                                                {value?.Value?.map((label, idx) => (
                                                                    <Flex key={idx}>
                                                                        <Text style={{ textTransform: "capitalize" }}>{label?.Map_question[label?.Map_question?.length - 1].level}</Text>
                                                                        {label?.Map_question?.map((ques, i) => (
                                                                            <Flex row key={i}>

                                                                                <Flex style={{ margin: '0 5px 0 0' }}>
                                                                                    <InputCheckBox
                                                                                        checked={formik.values.question.some(obj => obj.id === sample[interviewer].id && obj.question.includes(ques.id))}
                                                                                        onChange={() => {
                                                                                            const existingIndex = formik.values.question.findIndex(obj => obj.id === sample[interviewer].id);

                                                                                            if (existingIndex > -1) {
                                                                                                const foundObject = formik.values.question[existingIndex];
                                                                                                const questionIndex = foundObject.question.indexOf(ques.id);

                                                                                                if (questionIndex > -1) {
                                                                                                    foundObject.question.splice(questionIndex, 1);
                                                                                                    if (foundObject.question.length === 0) {
                                                                                                        formik.values.question.splice(existingIndex, 1);
                                                                                                    }
                                                                                                } else {
                                                                                                    foundObject.question.push(ques.id);
                                                                                                }
                                                                                            } else {

                                                                                                formik.values.question.push({ id: sample[interviewer].id, question: [ques.id] });
                                                                                            }

                                                                                            formik.setFieldValue('question', [...formik.values.question]);
                                                                                        }}
                                                                                    />
                                                                                </Flex>
                                                                                <Text>{ques.question}</Text>
                                                                            </Flex>
                                                                        ))}
                                                                    </Flex>
                                                                ))}
                                                            </Flex>
                                                        </Card>
                                                    ))}
                                                </Flex>

                                            </Flex>
                                        ))
                                        )

                                    }

                                    {<Flex row>
                                        {/* <Flex><Text color='error'></Text></Flex> */}
                                        <Flex>
                                        {sample?.map((value, i) => {
                                                return (
                                                    <Flex key={i}>
                                                        {console.warn(value, i, user)}
                                                       { value.success===false&&
                                                        <Text color='error'>please generate question for {formik.values.levellist[i]?.firstname+' '+formik.values.levellist[i]?.lastname}</Text>
                                                       
                                                       }
                                                    </Flex>
                                                );
                                            }) }
                                        </Flex>
                                     </Flex>
                                    }
                                    {
                                        questionerror&&(
                                            <Flex >
                                                
                                                <Flex >
                                                {formik.values?.question?.map((obj, indexid) => (
                                                            obj.question.length === 0 ? (
                                                            <Flex key={indexid} >
                                                                {console.warn("./.................",indexid,formik.values.levellist[indexid]?.firstname)}
                                                                <Text color='error'>please select question for this interviewers  {formik.values.levellist[indexid]?.firstname+' '+formik.values.levellist[indexid]?.lastname}</Text>
                                                            </Flex>
                                                            ) : null
                                                        ))}
                                            </Flex>
                                          </Flex>
                                          )
                                    }

                                </Flex>
                            </Tab>
                        ))}
                    </Tabs>
                </Flex>


                <Flex row between >
                    <Flex>
                        <Button types="secondary" onClick={handlechange1} >
                            Back
                        </Button>
                    </Flex>
                    <Flex row>
                        <Button types="close" onClick={handlefunction1}>
                            Cancel
                        </Button>
                        <Button style={{ margin: '0 0 0 10px' }} onClick={formik.handleSubmit}>
                            Continue
                        </Button>

                    </Flex>

                </Flex>
            </Flex>
        </>
    );
};
