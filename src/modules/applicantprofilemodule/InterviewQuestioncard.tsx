import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import SvgAdd from '../../icons/SvgAdd';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgRegenerateQuestion from '../../icons/SvgRegenerate';
import SvgArrowDown1 from '../../icons/SvgArrowDown1';
import SvgRadioWithLine from '../../icons/SvgRadioWithLine';
import SvgUpArrow from '../../icons/SvgArrowUp';
import { Button, Flex, InputCheckBox, Loader, Modal, Toast } from '../../uikit';
import Text from '../../uikit/Text/Text';
import SingleButton from '../common/SingleButton';
import {
    GenerateQuestionsState,
    InterviewExtractData,
    Question,
} from './interviewerQuestionType';
import styles from './screeningstatustab.module.css';





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
    isevaluatedata?: any;
    setregeneratequestion?: (val: boolean) => void;
    setgeneratequestion?: (val: boolean) => void;
    setAddquestion?: (val: boolean) => void;
    interviewData?: any;
    setevaluatedata?: (val: any) => void;
    setinterviewid?: (val: any) => void;


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
    isevaluatedata,
    setregeneratequestion,
    setgeneratequestion,
    setAddquestion,
    setevaluatedata,
    setinterviewid
}: Props) => {
    const [expandedIndex, setExpandedIndex] = useState([]);
    const [selecteddata, setselecteddata] = useState<any>([]);
    const [isEvaluate, setEvaluate] = useState<any>(false);
    const [questions, setQuestions] = useState<any>({});


    //onclick function fo modal window open
    const toggleStage = (e) => {
        setAddquestion(true);
        setinterviewid(e)
    };
    const toggleAddQuestion = (e) => {
        setAddquestion(true);
        setinterviewid(e)
    };
    const regenerateQuestions = (e) => {
        setregeneratequestion(true);
        setinterviewid(e)
    }

    const generateQuestions = (e) => {
        setgeneratequestion(true);
        setinterviewid(e)
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

    //store the data of selected question
    useEffect(() => {
        setevaluatedata(questions)
    }, [questions])
    return (
        <Flex>
            {no_of_interview.map((datas, indexva) => {
                if (Object.keys(interviewData).length !== 0 && interviewData.find(val => val.Id === datas.id)) {
                    const matchingData = interviewData.find(val => val.Id === datas.id);
                    return (
                        <Flex key={indexva} style={{ boxShadow: 'rgba(0, 0, 0, 0.47) 0px 1px 4px 0px', borderRadius: '4px' }} marginBottom={10} marginLeft={2}>
                            <Flex row between center style={{ backgroundColor: '#D7C7D2', borderRadius: '4px 4px 0px 0px', padding: '5px 10px' }}>
                                <Text >{`${datas?.event_type} / ${moment(
                                    datas?.s_time
                                ).format('MMM DD yyyy / HH:mm a - ')} ${moment(
                                    datas?.e_time
                                ).format(' HH:mm a')} `}</Text>
                                {datas.evaluate !== true &&
                                    <Flex row center between>
                                        <Flex marginRight={15}>
                                            <Text title="Regenerate Question" style={{ cursor: 'pointer' }} onClick={() => regenerateQuestions(datas.id)}>
                                                <SvgRegenerateQuestion />
                                            </Text>
                                        </Flex>

                                        <Flex marginRight={15} >
                                            <Text title="Add Question" style={{ cursor: 'pointer' }} onClick={() => toggleStage(datas.id)}>
                                                <SvgAdd width={14} height={14} fill="#581845" />
                                            </Text>
                                        </Flex>
                                        <Flex>
                                            {isevaluatedata && isevaluatedata.length > 0 && (Array.isArray(isevaluatedata) ? isevaluatedata.map(e => e.interview_id) : []).includes(matchingData.Id) ?
                                                (
                                                    <Button
                                                        onClick={() => {
                                                            onEvaluate(datas?.id, getCheckedQuestions());
                                                        }}
                                                        types={'primary'}
                                                    >
                                                        Evaluate
                                                    </Button>
                                                ) : (<Button
                                                    onClick={() => {
                                                        setEvaluate(true)
                                                    }}
                                                    types={'primary'}
                                                >
                                                    Evaluate
                                                </Button>)}
                                        </Flex>
                                    </Flex>}
                            </Flex>
                            {matchingData.Question?.map((value, ind) => (
                                <Flex key={ind} className={styles.cardview} style={{ padding: '0px 10px' }}>
                                    <Flex marginTop={5}>
                                        <Text style={{ textTransform: "capitalize" }} bold>
                                            {value.Category}
                                        </Text>
                                        {value?.Value?.map((label, idx) => (
                                            <Flex key={idx}>
                                                <Text style={{ textTransform: "capitalize" }}>{label.Name}</Text>
                                                <Flex>
                                                    <Flex row marginTop={5}>
                                                        <Flex marginRight={7} marginTop={1}>
                                                            {handlelevelradio(label?.Map_question[label?.Map_question?.length - 1].level)}
                                                        </Flex>
                                                        <Flex>
                                                            <Text color='theme'>{label?.Map_question[label?.Map_question?.length - 1].level}</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex marginBottom={5}>
                                                        {label?.Map_question?.map((ques, i) => (
                                                            <Flex key={i}>
                                                                <Flex>
                                                                    {expandedIndex?.includes(ques.id) ? (
                                                                        <>
                                                                        {/* code for every index border btoom except last question => borderBottom: i === label?.Map_question?.length - 1 ? label.Map_question[i] === matchingData.Question[matchingData.Question.length - 1].Value[matchingData.Question[matchingData.Question.length - 1].Value.length - 1].Map_question[i] ? '' : '1px solid #C3C3C3' : '1px solid #C3C3C3', paddingBottom: '10px'  */}
                                                                            <Flex row style={{ borderBottom: label?.Map_question.length - 1 === i ? label.Map_question[i] === matchingData.Question[matchingData.Question.length - 1].Value[matchingData.Question[matchingData.Question.length - 1].Value.length - 1].Map_question[i] ? '' : '1px solid #C3C3C3' : '', paddingBottom: '10px'}} marginLeft={1}>
                                                                                {datas.evaluate !== true &&
                                                                                    <Flex style={{ margin: '1.5px 5px 0 0' }} >
                                                                                        <InputCheckBox
                                                                                            onClick={() => handleSelectedQuestion(ques)}
                                                                                            checked={selecteddata?.includes(ques.id)}
                                                                                        />
                                                                                    </Flex>}
                                                                                <Flex >
                                                                                    <Flex row >
                                                                                        <Flex>
                                                                                            <Text>{i + 1}.</Text>
                                                                                        </Flex>
                                                                                        <Flex>
                                                                                            <Flex style={{ textAlign: "justify" }}>
                                                                                                <Text>{ques.question}</Text>
                                                                                            </Flex>
                                                                                            {ques.answer !== null && <Flex row style={{ textAlign: "justify" }}>
                                                                                                <Text color='theme'>{ques.answer}
                                                                                                    <Text
                                                                                                        onClick={() => handleToggleCollapse(ques.id)}
                                                                                                        style={{ cursor: "pointer" }}>
                                                                                                        <Text color="theme" bold style={{ marginLeft: '5px', marginRight: '5px' }}>Hide answer</Text>
                                                                                                        <SvgUpArrow
                                                                                                            width={10}
                                                                                                            height={10}
                                                                                                            fill={"581845"} />

                                                                                                    </Text></Text>
                                                                                            </Flex>}
                                                                                        </Flex>
                                                                                    </Flex>
                                                                                </Flex>
                                                                            </Flex>


                                                                        </>
                                                                    ) : (
                                                                        <>

                                                                            <Flex row style={{ borderBottom: label?.Map_question.length - 1 === i ? label.Map_question[i] === matchingData.Question[matchingData.Question.length - 1].Value[matchingData.Question[matchingData.Question.length - 1].Value.length - 1].Map_question[i] ? '' : '1px solid #C3C3C3' : '', paddingBottom: '10px' }}  >

                                                                                {datas.evaluate !== true &&
                                                                                    <Flex style={{ margin: '1.5px 5px 0 0' }} >
                                                                                        <InputCheckBox
                                                                                            onClick={() => handleSelectedQuestion(ques)}
                                                                                            checked={selecteddata?.includes(ques.id)}
                                                                                        />
                                                                                    </Flex>}
                                                                                <Flex row>
                                                                                    <Flex>
                                                                                        <Text>{i + 1}.</Text>
                                                                                    </Flex>
                                                                                    <Flex row style={{ textAlign: "justify" }}>
                                                                                        <Text>{ques.question}
                                                                                            {ques.answer !== null && <Text
                                                                                                onClick={() => handleToggleCollapse(ques.id)}
                                                                                                style={{ cursor: "pointer" }}>
                                                                                                <Text color="theme" bold style={{ marginLeft: '5px', marginRight: '5px' }}>Show answer</Text>
                                                                                                <SvgArrowDown1
                                                                                                    width={10}
                                                                                                    height={10}
                                                                                                    fill={"581845"} />

                                                                                            </Text>}</Text>
                                                                                    </Flex>
                                                                                </Flex>
                                                                            </Flex>
                                                                        </>
                                                                    )}
                                                                </Flex>
                                                            </Flex>
                                                        ))}
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        ))}
                                    </Flex>
                                </Flex>
                            ))}
                        </Flex>
                    );

                } else {
                    const elsedata = no_of_interview.map(y => y.id);
                    if (elsedata.includes(datas.id)) {
                        return (
                            <Flex key={indexva} style={{ boxShadow: 'rgba(0, 0, 0, 0.47) 0px 1px 4px 0px', borderRadius: '4px' }} marginBottom={10} marginLeft={2}>
                                <Flex row between style={{ backgroundColor: '#D7C7D2', borderRadius: '4px 4px 0px 0px', padding: '5px' }}>
                                    <Text>{`${datas?.event_type} / ${moment(
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
                                                onClick={() => toggleAddQuestion(datas.id)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Add Question
                                            </Button>
                                        </Flex>

                                        <Button
                                            onClick={() => generateQuestions(datas.id)}
                                        >Generate Questions</Button>
                                    </Flex>
                                    <Flex
                                        style={{
                                            margin: '10px 0px',
                                        }}
                                    ></Flex>
                                </Flex>
                            </Flex>
                        );
                    }
                }
                // })}

            })
            }

            <>
                <SingleButton
                    btnTitle="OK"
                    title={
                        'please select atleast one question to evaluate.'
                    }
                    open={isEvaluate}
                    btnOnclick={() => setEvaluate(false)}
                />
            </>

        </Flex>
    )
}
export default InterviewQustioncard;