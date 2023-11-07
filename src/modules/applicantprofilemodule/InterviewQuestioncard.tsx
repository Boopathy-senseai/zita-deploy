import { useFormik } from 'formik';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import SvgAdd from '../../icons/SvgAdd';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgRegenerateQuestion from '../../icons/SvgRegenerate';
import SvgArrowDown1 from '../../icons/SvgArrowDown1';
import SvgUpArrow from '../../icons/SvgArrowUp';
import { Button, Flex, InputCheckBox, Loader, Toast } from '../../uikit';
import InputText from '../../uikit/InputText';
import Text from '../../uikit/Text/Text';
import { AppDispatch, RootState } from '../../store';
import { isEmpty } from '../../uikit/helper';
import { formatTo12HrClock } from '../calendarModule/util';
import {
    GenerateQuestionsState,
    InterviewExtractData,
    Question,
} from './interviewerQuestionType';
import styles from './screeningstatustab.module.css';
import {
    evaluateQuestionMiddleware,
    interviewQuestionMiddleware,
} from './store/middleware/interviewquestionMiddleware';


const cx = classNames.bind(styles);

interface Props {
    interviews?: InterviewExtractData;
    onEvaluate?: (id: number, value: Question[]) => void;
    jd_id?: string;
    can_id?: string;
    genearate?: GenerateQuestionsState;
    no_of_interview?: any;
    lengthval?: any;
    indexval?: any;
    setregeneratequestion?: (val: boolean) => void;
    setgeneratequestion?: (val: boolean) => void;
    setAddquestion?: (val: boolean) => void;
    interviewData?: any;
    setevaluatedata?:(val:any) => void;

}

const InterviewQustioncard = ({
    interviews,
    onEvaluate,
    interviewData,
    jd_id,
    can_id,
    genearate,
    no_of_interview,
    lengthval,
    indexval,
    setregeneratequestion,
    setgeneratequestion,
    setAddquestion,
    setevaluatedata
}: Props) => {
    const [expandedIndex, setExpandedIndex] = useState([]);
    const [selecteddata, setselecteddata] = useState<any>([]);
    const [expanded2, setExpanded2] = useState<any>('');
    const [questions, setQuestions] = useState<any>({});
    //onclick function fo modal window open
    const toggleStage = () => {
        setAddquestion(true)
    };
    const toggleAddQuestion = () => {
        setAddquestion(true)
        // setNewAddQuestion(!newAddQuestion); 
        // formik.resetForm();
    };
    const regenerateQuestions = () => {
        setregeneratequestion(true)
    }

    const generateQuestions = () => {
        setgeneratequestion(true)
    }
    const handleToggleCollapse = (i) => { 
        setExpandedIndex((prevIndexes) =>
            prevIndexes.includes(i)
                ? prevIndexes.filter((prevIndex) => prevIndex !== i)
                : [...prevIndexes, i]
        );
    };

    const getCheckedQuestions = () =>
       
        Object.keys(questions)
        .map((key) => questions[key])
        .filter((doc) => doc.is_active || false) || []; 

    const handleSelectedQuestion = (value) => { 
        setselecteddata((prevId) =>
            prevId.includes(value.id)
                ? prevId.filter((prevIds) => prevIds !== value.id)
                : [...prevId, value.id]
        );
        setQuestions((prev) => { 
            prev = Array.isArray(prev) ? prev : []; 
            const existingIndex = prev.findIndex((item) => item.id === value.id); 
            if (existingIndex !== -1) { 
                return prev.filter((item) => item.id !== value.id);
            } else { 
                return [...prev, value];
            }
        });
        };

useEffect(()=>{
    setevaluatedata(questions)
},[questions])
     
    console.log(questions,'hooooooiiiiiii')
    return (
        <Flex>
            {no_of_interview.map((datas, indexva) => (
                <Flex key={indexva}>
                    {interviewData.map((val, index1) => {
                        if (val.Id === datas.id) {
                            return (
                                <Flex key={indexva}>

                                    {console.log(val.Id === datas.id, val.Id, datas.id, 'val.Id === datas.idval.Id === datas.idval.Id === datas.id', val, datas)}
                                    <Flex row between marginTop={10} center>
                                        <Text color="theme">{`${datas?.event_type} / ${moment(
                                            datas?.s_time
                                        ).format('MMM DD yyyy / HH:mm a - ')} ${moment(
                                            datas?.e_time
                                        ).format(' HH:mm a')} `}</Text>
                                        <Flex row center between>
                                            {!datas.evaluate && (
                                                <Flex marginRight={15}>
                                                    <Text title="Regenerate Question" style={{ cursor: 'pointer' }}>
                                                        <SvgRegenerateQuestion onClick={() => regenerateQuestions()} />
                                                    </Text>
                                                </Flex>
                                            )}
                                            <Flex marginRight={15}>
                                                <Text title="Add Question" style={{ cursor: 'pointer' }}>
                                                    <SvgRegenerateQuestion onClick={() => toggleStage()} />
                                                </Text>
                                            </Flex>
                                            <Flex>
                                            {/* {getCheckedQuestions()?.length !== 0 && (
                                                <Button
                                                    onClick={() => {
                                                    onEvaluate(interviews?.data?.id, getCheckedQuestions());
                                                    }}
                                                    types={'primary'}
                                                >
                                                    Evaluate
                                                </Button>
                                                )} */}
                                                <Button
                                                    onClick={() => {
                                                      onEvaluate(interviews?.data?.id, getCheckedQuestions());
                                                    }}
                                                    types={'primary'}
                                                >
                                                    Evaluate
                                                </Button>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    {val.Question?.map((value, ind) => (
                                        <Flex key={ind} className={styles.cardview}>
                                            <Flex>
                                                <Text style={{ textTransform: "capitalize" }} bold>
                                                    {value.Category}
                                                </Text>
                                                {value?.Value?.map((label, idx) => (
                                                    <Flex key={idx}>
                                                        <Text style={{ textTransform: "capitalize" }}>{label.Name}</Text>
                                                        <Text>{label?.Map_question[label?.Map_question?.length - 1].level}</Text>
                                                        {label?.Map_question?.map((ques, i) => (
                                                            <Flex key={i}>
                                                                <Flex>
                                                                    {console.log("expandedIndex",expandedIndex)}
                                                                    {expandedIndex?.includes(ques.id) ? (
                                                                        <>
                                                                            <Flex row>
                                                                                <Flex style={{ margin: '0 5px 0 0' }} >
                                                                                    <InputCheckBox 
                                                                                    onClick={()=>handleSelectedQuestion(ques)}
                                                                                    checked={selecteddata?.includes(ques.id)}
                                                                                    />
                                                                                </Flex>
                                                                                <Flex style={{textAlign: "justify"}}>
                                                                                    <Text>{ques.question}</Text>
                                                                                </Flex>
                                                                            </Flex>
                                                                            <Flex row style={{textAlign: "justify"}}>
                                                                                <Text>{ques.answer}
                                                                                    <Text
                                                                                        onClick={() => handleToggleCollapse(ques.id)}
                                                                                        style={{ cursor: "pointer" }}>
                                                                                        <Text color="theme" bold style={{ marginLeft: '5px', marginRight: '5px' }}>View less</Text>
                                                                                        <SvgUpArrow
                                                                                            width={10}
                                                                                            height={10}
                                                                                            fill={"581845"} />

                                                                                    </Text></Text>
                                                                            </Flex>

                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Flex row>
                                                                                <Flex style={{ margin: '0 5px 0 0' }} > 
                                                                                    <InputCheckBox  
                                                                                    onClick={()=>handleSelectedQuestion(ques)}
                                                                                    checked={selecteddata?.includes(ques.id)}
                                                                                    />
                                                                                </Flex>
                                                                                <Flex row style={{textAlign: "justify"}}>
                                                                                    <Text>{ques.question}
                                                                                        <Text
                                                                                            onClick={() => handleToggleCollapse(ques.id)}
                                                                                            style={{ cursor: "pointer" }}>
                                                                                            <Text color="theme" bold style={{ marginLeft: '5px', marginRight: '5px' }}>View More</Text>
                                                                                            <SvgArrowDown1
                                                                                                width={10}
                                                                                                height={10}
                                                                                                fill={"581845"} />

                                                                                        </Text></Text>
                                                                                </Flex>
                                                                            </Flex>

                                                                        </>
                                                                    )}
                                                                </Flex>
                                                            </Flex>
                                                        ))}
                                                    </Flex>
                                                ))}
                                            </Flex>
                                        </Flex>
                                    ))}
                                </Flex>
                            );
                        }
                        else {

                            const elsedata = no_of_interview.map((y) => (y.id))
                            if (elsedata.includes(val.Id)) {
                                const s_time = new Date(datas.s_time);
                                const dateString = s_time.toDateString(); 
                                return (
                                    <Flex key={indexva}>
                                        <Flex row between marginTop={10}>
                                            <Text color="theme">{`${datas?.event_type} / ${moment(
                                                datas?.s_time
                                            ).format('MMM DD yyyy / HH:mm a - ')} ${moment(
                                                datas?.e_time
                                            ).format(' HH:mm a')} `}</Text>
                                        </Flex>

                                        <Flex>
                                            <Text
                                                size={13}
                                                style={{
                                                    justifyContent: 'center',
                                                    display: 'flex',
                                                    margin: '10px 0px',
                                                }}
                                            >
                                                You must add or generate questions to evaluate the scorecard
                                            </Text>
                                            <Flex row center middle marginBottom={10}>
                                                <Flex>
                                                    <Button
                                                        types="secondary"
                                                        onClick={() => toggleAddQuestion()}
                                                        style={{ marginRight: '10px' }}
                                                    >
                                                        Add Question
                                                    </Button>
                                                </Flex>

                                                <Button
                                                    onClick={generateQuestions}
                                                >Generate Questions</Button>
                                            </Flex>
                                            <Flex
                                                style={{
                                                    margin: '10px 0px',
                                                    borderBottom: '1px solid #584518',
                                                }}
                                            ></Flex>
                                        </Flex>
                                    </Flex>
                                );
                            }

                        }
                    })}
                </Flex>
            ))}


        </Flex>
    )
}
export default InterviewQustioncard;