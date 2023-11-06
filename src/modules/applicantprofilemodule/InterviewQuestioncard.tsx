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
    setAddquestion
}: Props) => {
    const [expandedIndex, setExpandedIndex] = useState([]);
    const [expanded1, setExpanded1] = useState<any>();
    const [expanded2, setExpanded2] = useState<any>();
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
    const handleToggleCollapse = (i,type,level) => {
        setExpandedIndex((prevIndexes) => 
            prevIndexes.includes(i)
                ? prevIndexes.filter((prevIndex) => prevIndex !== i)
                : [...prevIndexes, i]
        );
        setExpanded1(type)
        setExpanded2(level)
    };
     
    function calculateLineCount(text, lineHeight, maxWidth) {
        // Create a temporary element to measure the text
        const tempElement = document.createElement("div");
        tempElement.style.position = "absolute";
        tempElement.style.whiteSpace = "pre-wrap";
        tempElement.style.wordWrap = "break-word";
        tempElement.style.lineHeight = `${lineHeight}px`;
        tempElement.style.width = `${maxWidth}px`;
        tempElement.innerHTML = text;

        // Append the temporary element to the document
        document.body.appendChild(tempElement);

        // Calculate the number of lines based on the height of the element
        const lineCount = Math.ceil(tempElement.clientHeight / lineHeight);

        // Remove the temporary element
        document.body.removeChild(tempElement);

        return lineCount;
    }
    return (
        <Flex>
            <Flex row between marginTop={10}>
                <Text color="theme">{`${no_of_interview?.event_type} / ${moment(
                    no_of_interview?.s_time,
                ).format('MMM DD yyyy / HH:mm a - ')} ${moment(
                    no_of_interview?.e_time,
                ).format(' HH:mm a')} `}</Text>
                <Flex row center between>
                    {no_of_interview?.evaluate !== true && (
                        <Flex marginRight={15}>
                            <Text title="Regenerate Question" style={{ cursor: 'pointer' }}>
                                <SvgRegenerateQuestion
                                    onClick={() => regenerateQuestions()}
                                />
                            </Text>
                        </Flex>
                    )}
                    <Flex marginRight={15}>
                        <Text title="Add Question" style={{ cursor: 'pointer' }}>
                            <SvgRegenerateQuestion
                                onClick={() => toggleStage()}
                            />
                        </Text>
                    </Flex>
                    <Flex>
                        {/* {getCheckedQuestions()?.length !== 0 && ( */}
                        <Button
                            //   onClick={() => {
                            //     onEvaluate(interviews?.data?.id, getCheckedQuestions());
                            //   }}
                            types={'primary'}
                        >
                            Evaluate
                        </Button>
                        {/* )} */}
                    </Flex>
                </Flex>
            </Flex>
            <Flex>
                {Array(interviewData).map((val, index1) => (
                    <Flex key={index1}>
                        <Flex>
                            {val?.Question?.map((value, ind) => (
                                <Flex key={ind} className={styles.cardview}>
                                    <Flex>
                                        <Text style={{ textTransform: "capitalize" }} bold>
                                            {value.Category}
                                        </Text>
                                        {value?.Value?.map((label, idx) => (
                                            < Flex key={idx} >
                                                <Text style={{ textTransform: "capitalize" }}>{label.Name}</Text>
                                                {label?.Map_question?.map((ques, i) => (
                                                    < Flex  key={i} row={!expandedIndex?.includes(i)}>
                                                        <Flex style={{ margin: '0 5px 0 0' }} row>
                                                            <InputCheckBox
                                                            // checked={isQuestionCheckedval(ques.id)}
                                                            // onChange={(e) => handleCheck(ques.id, e.target.checked)}
                                                            />
                                                            <Text>{ques.question
                                                        }</Text>
                                                        </Flex>
                                                        
                                                        <Flex>
                                                            {console.log(expandedIndex,i,'expandedIndexexpandedIndexexpandedIndex')}
                                                            {
                                                                expandedIndex?.includes(i) &&expanded1&& expanded1.type === ques.type &&expanded2&& expanded2.type === ques.level ? (
                                                                    <>
                                                                        <Flex>
                                                                            <Text>
                                                                                {ques.answer}

                                                                            </Text>
                                                                        </Flex>
                                                                        <Flex
                                                                            row
                                                                            center
                                                                            onClick={() => handleToggleCollapse(i,ques.type,ques.level)}
                                                                            style={{ cursor: "pointer" }}>

                                                                            <Flex><Text color="theme" bold> View Less</Text></Flex>
                                                                            <Flex width={5}></Flex>
                                                                            <Flex>
                                                                                <SvgUpArrow
                                                                                    width={10}
                                                                                    height={10}
                                                                                    fill={"#581845"} />
                                                                            </Flex>
                                                                        </Flex></>
                                                                ) : (
                                                                    <>
                                                                        {/* {calculateLineCount(ques.answer, 5, 500) > 2  && */}
                                                                            <>  
                                                                                <Flex
                                                                                    row
                                                                                    center
                                                                                    onClick={() => handleToggleCollapse(i,ques.type,ques.level)}
                                                                                    style={{ cursor: "pointer" }}>
                                                                                    <Flex><Text color="theme" bold>View More</Text></Flex>
                                                                                    <Flex width={5}></Flex>
                                                                                    <Flex>
                                                                                        <SvgArrowDown1
                                                                                            width={10}
                                                                                            height={10}
                                                                                            fill={"581845"} />
                                                                                    </Flex>
                                                                                </Flex></>
                                                                                
                                                                      
                                                                    </>)
                                                            }
                                                        </Flex>
                                                    </Flex>
                                                ))}
                                            </Flex>
                                        ))}
                                    </Flex>
                                </Flex>
                            ))}

                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    )
}
export default InterviewQustioncard;