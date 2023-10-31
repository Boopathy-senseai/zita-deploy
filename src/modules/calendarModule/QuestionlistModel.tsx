import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
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
} from '../../uikit';
import Tab from '../../uikit/Tab/Tab';
import Tabs from '../../uikit/Tab/Tabs';
import { level } from '../myjobposting/mock';
import styles from './styles/createScheduleForm.module.css';


interface Props {
    interviewer: any;
    setinterviewer: any;
    formikval: any;
    isQuestionChecked: any;
    handlecheck: any;
    handlechange1: any;
    handlefunction1: any;
    handlechange: any;

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
 
}: Props) => {
    
    const [showstate, setshowstate] = useState(false)
    const [questions,setquestions]=useState([])

    interface LevelValue {
        name: string;
        easy: string;
        medium: string;
        hard: string;
        checked: boolean;
    }
    interface levellist {
        id: any;
        level: LevelValue[];
      }

    interface MyFormValues {
       levellist:levellist[];
      }
    
    const initialValues: MyFormValues = {
        levellist: [],
      };
      const handleCompanyPageValid = (values: MyFormValues): Partial<MyFormValues> => {
        const errors: Partial<MyFormValues> = {};
        return errors;
      }

      const formik = useFormik({
        initialValues: initialValues,
        onSubmit: () => handleSubmit(),
        validate: handleCompanyPageValid,
      });
    
      useEffect(() => {
        const mappedArray = formikval.values.checkedValues.map(item => ({
            id: item.id,
            level: []
        }));
        
        formik.setFieldValue('levellist', mappedArray);
    }, []);
    
      const handleSubmit=()=>{

    
      }
      const [formValues, setFormValues] = React.useState<MyFormValues>(initialValues);
      const handleCheckboxChange = (index: number, event: React.ChangeEvent<HTMLInputElement>, ids: number) => {
        const isChecked = event.target.checked;
  
        const updatedValues = JSON.parse(JSON.stringify(formik.values.levellist));
        let listItem = updatedValues.find(item => item.id === ids);
        if (!listItem) {
            console.warn(`No listItem found for ID ${ids}`);
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
                medium: '',
                hard: '',
                checked: isChecked
            });
        }
        formik.setFieldValue('levellist', updatedValues);
    };
    

    const isCheckboxChecked = (userId: number, jobName: string): boolean => {
        const userItem = formik.values.levellist.find(item => item.id === userId);
        return userItem?.level.some(lvl => lvl.name === jobName && lvl.checked) || false;
    };
    
    

    return (
        <Flex className={styles.scrollfornav} style={{ backgroundColor: '#FFF', width: '700px', height: 'auto', padding: '25px' }}>
            {console.log("newwww::new",formik.values)}
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
                            <Flex>
                                <Text size={12} bold style={{ padding: '5px 0' }}>
                                    {`${user.role} - Interview Questions`}
                                </Text>
                                {!showstate?(
                                    <Flex>
                                        <Flex row between>
                                            <Flex>
                                                <Text>Generate the interview question based on the type and difficulty level.</Text>
                                            </Flex>
                                            <Flex>
                                                <Button>Generate</Button>
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
                                                    {console.log("see_ittt",user.id)}
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
                                        .filter(item => item.id ===  user.id)
                                        .map((item, index1) => {
                                            return (
                                                <>
                                                    <Flex key={index1}>
                                                        {item.level.map((lvl, lvlIndex) => (
                                                            <Flex key={lvlIndex} row between>
                                                                <Text>{lvl.name}</Text>
                                                                <Flex row>
                                                                    <Flex>
                                                                    <Text>Easy {lvl.easy}</Text>
                                                                    </Flex>
                                
                                                                </Flex>
                                                                <Text>Medium {lvl.medium}</Text>
                                                                <Text>Hard {lvl.hard}</Text>
                                                            </Flex>
                                                        ))}
                                                    </Flex>
                                                </>
                                            );
                                        })
                                }

                                        </Flex>
                                    </Flex>
                                ):
                                (questions?.map((val, index1) => {
                                    const keysToCheck = Object.keys(val);
                                    console.log("value133423575673", keysToCheck.includes(user.id), val, keysToCheck);
                                    if (keysToCheck.includes(user.id.toString())) {
                                        const questionsList = val[user.id.toString()]; 
                                        return (
                                            <Flex key={index1}>
                                                <Flex>
                                                    {questionsList ? (questionsList.map((question, index2) => (
                                                        <Flex key={index2} row style={{ margin: '0 0 5px 0' }}>
                                                            <Flex style={{ margin: '6px 10px 0px 3px' }}>
                                                                <InputCheckBox
                                                                    checked={isQuestionChecked(question.id)}
                                                                    onChange={e => handlecheck(question.id, e.target.checked)}
                                                                />
                                                            </Flex>
                                                            <Flex key={index2} style={{ borderBottom: '0.3px solid #c3c3c3', padding: '3px', width: "100%", }}>{question.question}</Flex>

                                                        </Flex>
                                                    ))) : (
                                                        <Flex>
                                                            <Text>
                                                                due to some error there is no data please regenerate
                                                            </Text>
                                                        </Flex>
                                                    )}
                                                </Flex>

                                            </Flex>
                                        );
                                    }
                                    return null;
                                }))}

                            </Flex>
                        </Tab>
                    ))}
                </Tabs>
            </Flex>

            <Flex row between >
                <Flex>
                    <Button types="secondary" onClick={handlechange1}>
                        Back
                    </Button>
                </Flex>
                <Flex row>
                    <Button types="close" onClick={handlefunction1}>
                        Cancel
                    </Button>
                    <Button style={{ margin: '0 0 0 10px' }} onClick={handlechange}>
                        Continue
                    </Button>

                </Flex>

            </Flex>
        </Flex>
    );
};
