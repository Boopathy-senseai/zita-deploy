import { func } from 'prop-types';
import React, { useEffect, useState } from 'react';
// import SvgCloseSmall from '../../icons/SvgCloseSmall';
import Button from '../../../uikit/Button/Button';
import Flex from '../../../uikit/Flex/Flex';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../../uikit/InputText/InputText';
import Text from '../../../uikit/Text/Text';
import { nameList } from './eventType';
import styles from './interviewer.module.css';

const Interviewer = (props) => {
  const { interviewerData, setinterviewerData, setInterviewer, interviewer,teammembers,checkedItems,setCheckedItems } =
    props;
  console.log("<!~!~!~!~!~!~!~!~~!",props)
  const [data, setData ] = useState(teammembers);
  const [member,setmember] = useState([])

  console.log('checkedItemscheckedItemscheckedItems:::::', checkedItems);
  console.log('teammembersteammembers.............', teammembers);
  console.log('teammembersteammembersinterviewerdata', interviewerData);
  console.log('1111!!!!!!!!!!!!', props);




  useEffect(()=> {
    if (interviewerData?.length > 0 ){
      setmember(interviewerData)
    }  
  },[interviewerData])



  const handleCheckboxChange = (event,name) => {
    console.log("name1234567890-=",name)
    console.log('eventeventevent', event.target);
    const { value, checked } = event.target;
    console.log('valuevalue', value, 'checked', checked);
    if (checked) {
      // Add the value to the array
      setCheckedItems((prevItems) => [...prevItems, value]); 
      // const search = 729     
      // const data1111= teammembers.filter(user => user.user === parseInt(value)); 
      // data1111.forEach(user => {
      //   member.push(user.full_name);
      // });
      // console.log("data1111data1111",member)
      // teammembers.includes(value)
      //   setinterviewerData(checkedItems)
      member.push(name)
      console.log("membermembermember",member)
    } else {
      // Remove the value from the array
      setCheckedItems((prevItems) =>
        prevItems.filter((item) => item !== value),
      );
      setinterviewerData((prevItems) =>
      prevItems.filter((item) => item !== value),
    );
      
      const index = member.findIndex(nam => nam === name);
      if (index !== -1) {
        member.splice(index, 1);
      }
      const remove = checkedItems.findIndex(nam => nam === value);
      if (remove !== -1) {
        checkedItems.splice(remove, 1);
      }
      
    console.log("member+++++++++++",member)
    // setinterviewerData(member)
    }
    console.log('checkedItemscheckedItems', checkedItems);
    
    console.log("@@@@@@@@@@@@@@@@@@@@",checkedItems)
  };

  const addmembers = () => {
    console.log('checkedItemscheckedItems', checkedItems,"\n",member);
    if (member.length >  0 ) {
      console.log("membermembermembermembermembermembermembermembermembermember",member)
      // const userid = teammembers?.map((i)=> i.name__user)
      const namelist =[]
      teammembers
      .filter((teammember) => member.includes(teammember.full_name))
      .forEach((teammember) => {
        alert(teammember.user)
        namelist.push(teammember.user);
        setCheckedItems(namelist)
        console.log("~~~~~~~~~~~~~~~~~~~~~`",namelist)
      });
      setinterviewerData(member);
      setInterviewer(false);      
    } 
  };

  // function searchItems(query) {
  //   const items = teammembers;
  //   const lowercaseQuery = query.toLowerCase();
  //   const filteredItems = items.filter((item) =>
  //     item.full_name.toLowerCase().includes(lowercaseQuery),
  //   );
  //   console.log('_+_+_++++_+_++_+_++_+_', filteredItems);
  //   if (filteredItems.length > 0) {
  //     setData(filteredItems);
  //   } else {
  //     setData([]);
  //     alert('Noapplicant found');
  //   }
  //   return filteredItems;
  // }
  function oncancel(){
    setInterviewer(false)
    setCheckedItems([])
  }

  return (
    <>
      {console.log('interviewerDatainterviewerData', data)}
      {console.log('checkedItems', checkedItems,"\n","teammembers",teammembers,"\n","members",member)}
      {console.log("membermembermembermembermember",member)}
      {console.log("interviewerDatainterviewerDatainterviewerData",interviewerData,"\n","checkditems",checkedItems)}


      <div className={styles.overall}>
        <Flex row>
          <Text className={styles.text}>Add Interviewers</Text>
        </Flex>
        <div className={styles.grid}>
          <Flex>
            <InputText
              className={styles.selectmembers}
              placeholder="Select team members"
              style={{ 
                border: "1px solid black"
                 }}
              value= {member?.length > 0 ? member.join(', ') : ''}
              // // style={{color: 'black',border : "1px" }}
            />

            {data.map((name, index) => (
              <Flex row key={index}>
                <div className={styles.flex}>
                  {interviewerData.length > 0 &&
                  interviewerData.includes(name.full_name) ? (
                    <InputCheckBox
                      value={name.full_name}
                      checked={true}
                      // disabled={true}
                      onChange={(e)=>handleCheckboxChange(e,name.full_name)}
                    />
                  ) : (
                    <InputCheckBox
                      value={name.user}                     
                      onChange={(e)=>handleCheckboxChange(e,name.full_name)}
                    />
             )}
                </div>
                <Text size={14}>{name.full_name}</Text>
              </Flex>
            ))}
          </Flex>
        <Flex row>
          <Button
            types="secondary"
            style={{ marginRight: '20px' }}
            onClick={() => oncancel()}
          >
            Cancel
          </Button>
          {member.length > 0 ? (<>
          <Button types="primary" onClick={addmembers}>
            Add
          </Button>
          </>):(<>
            <Button types="primary" onClick={addmembers} disabled>
            Add
          </Button>
          </>)}
        </Flex>
        </div>
      </div>
    </>
  );
};

export default Interviewer;
