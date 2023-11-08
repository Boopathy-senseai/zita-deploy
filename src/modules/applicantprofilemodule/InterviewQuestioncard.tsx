import { useFormik } from 'formik';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import SvgAdd from '../../icons/SvgAdd';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgRegenerateQuestion from '../../icons/SvgRegenerate';
import SvgArrowDown1 from '../../icons/SvgArrowDown1';
import SvgRadioWithLine from '../../icons/SvgRadioWithLine';
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
    isevaluatedata: [];
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
    const [expanded2, setExpanded2] = useState<any>('');
    const [questions, setQuestions] = useState<any>({});
    //onclick function fo modal window open
    const toggleStage = (e) => {
        setAddquestion(true);
        setinterviewid(e)
    };
    const toggleAddQuestion = (e) => {
        setAddquestion(true);
        setinterviewid(e)
        // setNewAddQuestion(!newAddQuestion); 
        // formik.resetForm();
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
    const handlelevelradio = (val) => {
        const value = val.toLowerCase();
        console.log(value,'easycheck')
        if (value === 'easy') {
            return  <SvgRadioWithLine fill="#34CC65" width={16} height={16}/>;
        }
        if (value === 'medium') {
            return  <SvgRadioWithLine fill="#F29111" width={16} height={16}/>;
        }
        if (value ===  'hard') {
            return  <SvgRadioWithLine fill="#ED4857" width={16} height={16}/>;
        }
        return null;
    };
    useEffect(() => {
        setevaluatedata(questions)
    }, [questions])

    return (
        <Flex>
            {no_of_interview.map((datas, indexva) => {
                const matchingData = interviewData.find(val => val.Id === datas.id);
                if (matchingData) {
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
                                            {isevaluatedata.length > 0 ?
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
                                                    // onClick={() => {
                                                    //     onEvaluate(datas?.id, getCheckedQuestions());
                                                    // }}
                                                    types={'primary'}
                                                >
                                                    Evaluate
                                                </Button>)}
                                        </Flex>
                                    </Flex>}
                            </Flex>
                            {matchingData.Question?.map((value, ind) => (
                                <Flex key={ind} className={styles.cardview} style={{ padding: '5px 10px' }}>
                                    <Flex>
                                        <Text style={{ textTransform: "capitalize" }} bold>
                                            {value.Category}
                                        </Text>
                                        {value?.Value?.map((label, idx) => (
                                            <Flex key={idx}>
                                                <Text style={{ textTransform: "capitalize" }}>{label.Name}</Text>
                                                <Flex>
                                                    <Flex row>
                                                        <Flex marginRight={7} marginTop={1}>
                                                            {handlelevelradio(label?.Map_question[label?.Map_question?.length - 1].level)}
                                                        </Flex>
                                                        <Flex>
                                                            <Text color='theme'>{label?.Map_question[label?.Map_question?.length - 1].level}</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex>
                                                        {label?.Map_question?.map((ques, i) => (
                                                            <Flex key={i}>
                                                                <Flex>
                                                                    {expandedIndex?.includes(ques.id) ? (
                                                                        <>
                                                                            <Flex row style={{ borderBottom: i !== label?.Map_question?.length - 1 ? '' : '1px solid #C3C3C3', paddingBottom: '5px' }} marginBottom={5} marginLeft={1}>
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
                                                                                                        <Text color="theme" bold style={{ marginLeft: '5px', marginRight: '5px' }}>View less</Text>
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
                                                                            <Flex row style={{ borderBottom: i !== label?.Map_question?.length - 1 ? ' ' : '1px solid #C3C3C3', paddingBottom: '5px' }} marginBottom={5} marginLeft={1}>
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
                                                                                                <Text color="theme" bold style={{ marginLeft: '5px', marginRight: '5px' }}>View More</Text>
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
            })}
        </Flex>
    )
}
export default InterviewQustioncard;