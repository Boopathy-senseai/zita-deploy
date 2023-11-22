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
import SvgRadioWithLine from '../../icons/SvgRadioWithLine';
import SvgModuleicon from '../../icons/SvgModuleicon';
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
    formik: any;
    setquestionerror: any;
    questionerror: any;
    errorstate:any;
    setvalidateerror:any;
    validateerror:any;
    seterrorstate:any;
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
    formik,
    setquestionerror,
    questionerror,
    errorstate,
    setvalidateerror,
    validateerror,
    seterrorstate
}: Props) => {

    const [showstate, setshowstate] = useState(false)
    const [questions, setquestions] = useState([])
    const [openmodel, setopenmodel] = useState(false)
    const [openpopup, setopenpopup] = useState(false);
    const [isSubmitLoader, setSubmitLoader] = useState(false);
    const [error, seterror] = useState(false)
    const [currentLetter, setcurrentLetter] = useState('A');
    const dispatch: AppDispatch = useDispatch();


    //useEffects for  set formik question value
    useEffect(() => {
        setallids(formik.values.question)
    }, [formik.values])
    useEffect(() => {
        if (formikval.values.checkedValues && formik.values.levellist) {
            const showlist = formikval.values.checkedValues.map(checkedItem => {
                const levelItem = formik.values.levellist.find(levItem => levItem.id === checkedItem.id);
                const isLevelActive = levelItem && levelItem.level.some(levelDetail => levelDetail.checked);
                return {
                    id: checkedItem.id,
                    active: isLevelActive,
                };
            });
            
            formik.setFieldValue('Errorshow', showlist);
        }
    }, [formikval.values.checkedValues, formik.values.levellist]); 
    
    useEffect(()=>{
        setinterviewer(0)
    },[])
    

    // level selecting checkbox
    const handleCheckboxChange = (index: number, event: React.ChangeEvent<HTMLInputElement>, ids: number) => {
        const isChecked = event.target.checked;

        const updatedValues = JSON.parse(JSON.stringify(formik.values.levellist));
        let listItem = updatedValues.find(item => item.id === ids);
        if (!listItem) {
            return;
        }
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
    // Error validartion for question count
    const validateError = (listIndex) => {
        const errorItem = formik.errors.levellist?.[listIndex];
        if (errorItem && typeof errorItem !== 'string') {
            const errorForThisItem = errorItem.totalError;
            const errorForThisItem1=errorItem.showError;
            if (errorForThisItem) {
                return <Text color='error'>{errorForThisItem}</Text>;
            }else{
                if(errorForThisItem1){
                    return <Text color='error'>{errorForThisItem1}</Text>;
                }
            }

        }
        return null;
    }

    // dispatch for generating question
    const generatequestion = (listIndex, id) => {
        const errorItem = formik.errors.levellist?.[listIndex];
        if (typeof errorItem !== 'string' && errorItem?.totalError) return null;
        setSubmitLoader(true);
        const transformLevelListData = (levellist1, targetId) => {
            return levellist1
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
                            if (levelItem[map.key] && levelItem[map.countKey]) {
                                acc.push({
                                    level: map.level,
                                    type: levelItem.name,
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
                    update_state(response.payload.data);
                    const addQuestion = response.payload.data;
                    if (!Array.isArray(addQuestion)) {
                        setquestions(prevQuestions => [...prevQuestions, addQuestion]);
                    } else {
                        setquestions(prevQuestions => [...prevQuestions, ...addQuestion]);
                    }
                    setViewMeetingSummary(false);
                    setShowPopup(true);
                } else {
                    setSubmitLoader(false);
                    Toast('Sorry, there was a problem connecting to the API. Please try again later.', 'LONG', 'error');
                }
            });

        return null;
    };

    // validating the question while appending
    const validatequestion = () => {
        if (formik.values.addquestion[0] !== undefined && formik.values.addquestion[0]?.type !== '' && formik.values.addquestion[0]?.level !== '' && formik.values.addquestion[0]?.question !== '') {
            const [{ addquestion }] = [formik.values];
            const [newQuestion] = addquestion;
            const index = sample.findIndex(({ id }) => id === newQuestion.attendees);
            if (index === -1) {
                setopenmodel(false);

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
            seterror(false)

        }
        else {
            seterror(true)
        }
    };

    // id generation for question
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
    //changing level radio thumb based on value
    const handlelevelradio = (val) => {
        const value = val.toLowerCase();
        if (value === 'easy') {
            return <SvgRadioWithLine fill="#34CC65" width={16} height={16} />;
        }
        if (value === 'medium') {
            return <SvgRadioWithLine fill="#F29111" width={16} height={16} />;
        }
        if (value === 'hard') {
            return <SvgRadioWithLine fill="#ED4857" width={16} height={16} />;
        }
        return null;
    };
    const filteredIds = sample?.filter(item => item.success === false)
        .map(item => item.id);

    const renderTextComponents = () => {
        let textCount = 0; 
        return (
            <Flex row>
                <Flex>
                    <Text color='error'>Please generate questions for the interviewer &emsp; </Text>
                </Flex>
                <Flex row>
                    {sample?.map((value, i) => {
                        if (value.success === false) {
                            textCount++;
                        }
                        return (
                            <Flex key={i}>
                                {value.success === false && (
                                    <Text color='error'>
                                        {`${formik.values.levellist[i]?.firstname} ${formik.values.levellist[i]?.lastname}${(filteredIds.length) === textCount ? '.' : ','}`}
                                    </Text>
                                )}
                            </Flex>
                        );
                    })}
                </Flex>
            </Flex>
        );
    };
    const renderErrorComponents = () => {
        const errorNames = formik.values?.question
            .map((obj, indexid) => (obj.question.length === 0 ? formik.values.levellist[indexid]?.firstname + ' ' + formik.values.levellist[indexid]?.lastname : null))
            .filter(name => name !== null)
            .join(', '); 
            
        if (errorNames.length > 0) {
            return (
                <Flex>
                    <Text color='error'>Please select questions for the following interviewers {errorNames}.</Text>
                </Flex>
            );
        } else {
           
            return null;
        }
    };
    const handlemodel=()=>{
        setopenmodel(false)
        seterror(false)
    }
    const filterObj = (datas) => {
        const filteredData = datas.map(item => {
          const filteredA = [];
          const targetType = "string";
          item.question?.Question?.forEach(question => {
            question.Value.forEach(values1 => {
              values1.Map_question.forEach(mapQuestion => { 
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
    const submit=()=>{
        seterrorstate(true)
        if (sample[interviewer]?.success === true) {
            const questionErrors = {};
            let isValid = true;
      
            const filteredData = filterObj(sample)
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
            const result = arrayLengths.includes(false) ? false : true;
            if (result) {
              handlechange()
              setaddquestion(filteredData)
            } else {
              setquestionerror(true)
            }
          }
    }
    const validshow = sample?.map((obj, indexid) => {
        if (obj.success === true) {
            const firstname = formik.values.levellist[indexid]?.firstname;
            const lastname = formik.values.levellist[indexid]?.lastname;
            return firstname && lastname ? firstname + ' ' + lastname : null;
        }
        return null;
    }).some(element => element === null);
    

    

    return (
        <>
            {/* Add  Question modal popup */}
            <Modal open={openmodel} >
                <Flex style={{ backgroundColor: '#FFF', width: '600px', height: 'auto', padding: '25px', borderRadius: '4px' }}>
                    <Flex style={{borderBottom:'1px solid #581845',paddingBottom:'5px'}}>
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
                                        <Text size={13}>{data.label}</Text>
                                    </Flex>
                                </Flex>)
                            })}
                        </Flex>
                        {error && !(formik.values.addquestion[0]?.type !== '') && <Flex marginTop={5}><Text color='error'>This Field is required.</Text></Flex>}
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
                                    <Text size={13}>{data.label}</Text>
                                    </Flex>
                                </Flex>)
                            })}
                        </Flex>
                       
                        {error && !( formik.values.addquestion[0]?.level !== '' ) && <Flex marginTop={5}><Text color='error'> This Field is required.</Text></Flex>}
                        <Flex marginTop={10}>
                            <InputText
                                className={styles.addinput}
                                placeholder='Type your interview question here'
                                onChange={(e) => formik.setFieldValue('addquestion[0].question', e.target.value)}
                            />
                        </Flex>
                        {error && !( formik.values.addquestion[0]?.question !== '') && <Flex marginTop={5}><Text color='error'> This Field is required.</Text></Flex>}
                        <Flex row marginTop={17} end>
                            <Flex marginRight={20} onClick={() => handlemodel()}>
                                <Button types="close" width="75px">Cancel</Button>
                            </Flex>
                            <Flex>
                                <Button types='primary' width="75px" onClick={validatequestion} >Add</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Modal>

            {/* Both generate and selection of levels modal popup*/}
            <Flex className={styles.scrollfornav} style={{ backgroundColor: '#FFF', width: '700px' , padding: '25px'}}>
                
                <Flex center row >
                    <Flex row center>
                        <Flex>
                            <Text size={14} bold >AI generated Interview Questions</Text>
                        </Flex>
                        <Flex marginLeft={5} marginTop={7}>
                            <label
                                onMouseEnter={() => setopenpopup(true)}
                                onMouseLeave={() => setopenpopup(false)}
                                className={styles.changeStyle11}
                            >
                                <SvgModuleicon />
                            </label>
                        </Flex>
                    </Flex>
                    <Flex marginLeft={5} >
                        {openpopup === true && (
                            <Card className={styles.infocard} key={''}><Flex>hi</Flex></Card>)}
                    </Flex>
                </Flex> 
                <Flex style={{ display: 'flex', width: '650px', flexWrap: 'nowrap', overflowX: 'scroll' }}>
                    <Tabs activeKey={interviewer}
                        onSelect={(keys: any) => {
                            setinterviewer(keys);
                            sessionStorage.setItem('interviewer', keys);
                            
                        }}
                    >
                        {formikval.values.checkedValues.map((user, index) => (
                            <Tab key={index} eventKey={JSON.stringify(index)} title={`${user.firstName} ${user.lastName}`}>
                                <Flex >
                                    <Flex between row style={{ padding: '10px 0  ' }}>
                                        <Flex>
                                            <Text size={12} bold  >
                                                {`${user.role} - Interview Questions`}
                                            </Text>
                                            <Text>Generate the interview question based on the type and difficulty level.</Text>
                                        </Flex>
                                        <Flex >
                                            {sample[interviewer]?.success === true ? (
                                                <Flex onClick={functioncall} row center style={{ cursor: 'pointer' }} marginRight={11}>
                                                    <Flex marginTop={3} style={{ cursor: 'pointer' }}>
                                                        <SvgAddquestion fill={PRIMARY} width={18} height={18} />
                                                    </Flex>
                                                    <Flex marginLeft={2} style={{ cursor: 'pointer' }}>
                                                        <Text color='link' bold >Add Question</Text>
                                                    </Flex>
                                                </Flex>
                                            ) : (isSubmitLoader ? (
                                                <Flex middle width={85}>
                                                    <Loader size="small" withOutOverlay />
                                                </Flex>
                                            ) :
                                                (<Button
                                                    onClick={() => generatequestion(index, user.id)

                                                    } width='85px'>Generate</Button>))}
                                        </Flex>
                                    </Flex>
                                    {sample[index].success === false ? (
                                        <Flex >
                                            <Flex marginTop={8}>
                                                <Text color='theme'> Choose the type(s) of interview questions.</Text>
                                            </Flex>
                                            <Flex row style={{ borderBottom: '0.5px solid #C3C3C3' }}>
                                                {level.map((jobList, idx) => {

                                                    const modifiedJobList = {
                                                        ...jobList,
                                                        name: jobList.value,
                                                    };

                                                    return (
                                                        <Flex key={idx} style={{ margin: '5px  20px  10px 0 ' }}>
                                                            <InputCheckBox
                                                                label={modifiedJobList.name}
                                                                checked={isCheckboxChecked(user.id, modifiedJobList.name)}
                                                                onChange={(event) => handleCheckboxChange(idx, event, user.id)}
                                                            />
                                                        </Flex>
                                                    );
                                                })}
                                            </Flex>

                                            {
                                                formik.values.levellist
                                                    .filter(item => item.id === user.id)
                                                    .map((item, listIndex) => {
                                                        return (
                                                            <>
                                                                {item.level.length !== 0 &&
                                                                    <Flex marginTop={5} style={{ borderBottom: '0.5px solid #C3C3C3', paddingBottom: '5px' }}>
                                                                        <Text color='theme'>Choose the difficulty level of the question and question count.</Text>
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
                                                                                                disabled={!formik.values?.levellist[interviewer]?.level[lvlIndex]?.iseasycheck}
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
                                                                                    <Flex row style={{ display: "flex", alignItems: "center" }} marginLeft={15}>
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
                                                                                                disabled={!formik.values?.levellist[interviewer]?.level[lvlIndex]?.ismediumcheck}
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
                                                                                    <Flex row style={{ display: "flex", alignItems: "center" }} marginLeft={15}>
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
                                                                                                disabled={!formik.values?.levellist[interviewer]?.level[lvlIndex]?.ishardcheck}
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
                                                                        {formik.values?.Errorshow[interviewer]?.active===true&&validateError(interviewer)}
                                                                    </Flex>}
                                                            </>
                                                        );
                                                    })
                                            }
                                           
                                        </Flex>
                                    ) : (

                                        //generated questions
                                        Array(sample[index].question)?.map((val, index1) => (
                                            <Flex key={index1}  style={{ overflowY: 'scroll', maxHeight: '400px', overflowX: 'hidden' }} >
                                                <Flex>
                                                    {val?.Question?.map((value, ind) => (
                                                        <Card key={ind} className={styles.cardview} > 
                                                            <Flex>
                                                                <Text style={{ textTransform: "capitalize" }} bold>
                                                                    {value.Category}
                                                                </Text>
                                                                {value?.Value?.map((label, idx) => (
                                                                    <Flex key={idx} style={{ borderBottom: value.Value.length - 1 === idx ? '' : '0.3px solid #C3C3C3', paddingBottom: '7px' }}>
                                                                        <Flex row marginTop={7}>
                                                                            <Flex marginRight={7} marginTop={1}>
                                                                                {handlelevelradio(label?.Map_question[label?.Map_question?.length - 1].level)}
                                                                            </Flex>
                                                                            <Flex>
                                                                                <Text color='theme' style={{ textTransform: "capitalize" }}>{label?.Map_question[label?.Map_question?.length - 1].level}</Text>
                                                                            </Flex>
                                                                        </Flex>
                                                                        {label?.Map_question?.map((ques, i) => (
                                                                            <Flex row key={i} marginTop={5}>
                                                                                <Flex style={{ margin: '1.2px 5px 0 0' }}>
                                                                                    <InputCheckBox
                                                                                        checked={formik.values.question.some(obj => obj.id === sample[interviewer].id && obj.question.includes(ques.id))}
                                                                                        onChange={() => {
                                                                                            const existingIndex = formik.values.question.findIndex(obj => obj.id === sample[interviewer].id);

                                                                                            if (existingIndex > -1) {
                                                                                                const foundObject = formik.values.question[existingIndex];
                                                                                                const questionIndex = foundObject.question.indexOf(ques.id);

                                                                                                if (questionIndex > -1) {
                                                                                                    foundObject.question.splice(questionIndex, 1);
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
                                                                                <Text>{i +1}.</Text>
                                                                                <Text style={{textAlign:'justify'}}>{ques.question}</Text>
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

                                    {/* {<Flex row>
                                        {formik.values?.Errorshow[interviewer]?.active===true&&validateError(interviewer)}

                                    </Flex>
                                    } */}
                                    
                                            {errorstate&&sample?.filter(item => item.success === false).length !== 0 ?
                                                <Flex key={''}> {renderTextComponents()}</Flex>
                                                : ''} 
                                </Flex>
                            </Tab>
                        ))}
                    </Tabs>
                </Flex>
                {
                   !validshow&&questionerror && (
                        <Flex >
                            {renderErrorComponents()}
                            {/* {formik.values?.question?.map((obj, indexid) => (
                                obj.question.length === 0 ? (
                                    <Flex key={indexid} >
                                        <Text color='error'>please select question for this interviewers  {formik.values.levellist[indexid]?.firstname + ' ' + formik.values.levellist[indexid]?.lastname}</Text>
                                    </Flex>
                                ) : null
                            ))} */}
                        </Flex>
                    )
                }
                <Flex row between marginTop={7}>
                    <Flex  >
                        <Button types="secondary" onClick={handlechange1} width='85px'>
                            Back
                        </Button>
                    </Flex>
                    <Flex row>
                        <Button types="close" onClick={handlefunction1} width='85px'>
                            Cancel
                        </Button>
                        <Button style={{ margin: '0 0 0 10px' }} onClick={submit} width='85px'>
                            Continue
                        </Button>

                    </Flex>

                </Flex>
            </Flex>
        </>
    );
};
