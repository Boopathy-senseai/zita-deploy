import { func } from 'prop-types';
import React, { useEffect, useState } from 'react';
import SvgSearch from '../../../icons/SvgSearch';
// import SvgCloseSmall from '../../icons/SvgCloseSmall';
import Button from '../../../uikit/Button/Button';
import Flex from '../../../uikit/Flex/Flex';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../../uikit/InputText/InputText';
import Text from '../../../uikit/Text/Text';
import { nameList } from './eventType';
import styles from './interviewer.module.css';

const Interviewer = (props) => {
  const {
    interviewerData,
    setinterviewerData,
    setInterviewer,
    interviewer,
    teammembers,
    checkedItems,
    setCheckedItems,
  } = props;

  console.log("00000000000000000000000000",props)
  const [data, setData] = useState(teammembers);
  const [member, setmember] = useState([]);

  useEffect(() => {
    if (interviewerData?.length > 0) {
      console.log("interviewerDatainterviewerDatainterviewerDatainterviewerData",interviewerData)
      setmember(interviewerData);
    }
  }, [interviewerData]);

  const handleCheckboxChange = (event, name) => {
    const { value, checked } = event.target;
    if (checked) {
      alert("_____")
      setCheckedItems((prevItems) => [...prevItems, value]);
      member.push(name);
    } else {
      alert(value)

      // Remove the value from the array
      setCheckedItems((prevItems) =>
        prevItems.filter((item) => item !== value),
      );
      setinterviewerData((prevItems) =>
        prevItems.filter((item) => item !== value),
      );

      const index = member.findIndex((nam) => nam === name);
      console.log("indexindexindexindex",index)
      if (index !== -1) {
        member.splice(index, 1);
      }
      const remove = checkedItems.find((nam) => nam === value);
      console.log("indexindexindexindexindexindex",index)
      if (remove !== -1) {
        checkedItems.splice(remove, 1);
      }
      console.log("indexindexindexindexindexindexcheckedItems",checkedItems)

      // setinterviewerData(member)
    }
  };

  function searchItems(query) {
    const items = teammembers;
    const lowercaseQuery = query.toLowerCase();
    const filteredItems = items.filter((item) =>
      item.full_name.toLowerCase().includes(lowercaseQuery),
    );
    console.log('_+_+_++++_+_++_+_++_+_', filteredItems);
    if (filteredItems.length > 0) {
      setData(filteredItems);
    } else {
      setData([]);
    }
    return filteredItems;
  }

  const addmembers = () => {
    if (member.length > 0) {
      const namelist = [];
      teammembers
        .filter((teammember) => member.includes(teammember.full_name))
        .forEach((teammember) => {
          namelist.push(teammember.user);
          setCheckedItems(namelist);
        });

      setinterviewerData(member);
      setInterviewer(false);
    } else {
    }
  };

  function oncancel() {
    setInterviewer(false);
    // setCheckedItems([]);
  }

  console.log("interviewerDatainterviewerData.........",interviewerData)
  console.log("datatatatatatattat",data)



  return (
    <>
      <div className={styles.overall}>
        <Flex row>
          <Text size={14} bold color="theme" className={styles.text}>
            Add Interviewers
          </Text>
        </Flex>
        <Flex className={styles.grid}>
          <Flex>
            <InputText
              className={styles.selectmembers}
              placeholder="Select team members"
              // value={member?.length > 0 ? member.join(', ') : ''}
              onChange={(e) => {
                searchItems(e.target.value);
              }}
              actionRight={() => (
                <label htmlFor={'members search'} style={{ margin: 5 }}>
                  <SvgSearch />
                </label>
              )}
          /> 
            {data.length > 0 ? (<>
            <Flex>
            {data.map((name, index) => (
              <Flex row center key={index} marginBottom={10}>
                <Flex className={styles.checkbox}>
                  {console.log("interviewerDatainterviewerData",name.full_name)}
                  {checkedItems.includes(name.user.toString()) || checkedItems.includes(name.user) ? (
                    <InputCheckBox
                      value={name.user}
                      checked={true}
                      // disabled={true}
                      onChange={(e) => handleCheckboxChange(e, name.user)}
                    />
                  ) : (
                    <InputCheckBox
                      value={name.user}
                      onChange={(e) => handleCheckboxChange(e, name.user)}
                    />
                  )}
                </Flex>
                <Text size={13}>{name.full_name}</Text>
              </Flex>
            ))}
            </Flex>
            </>) : (<Flex middle>No Interviewers Found</Flex>)}
          </Flex>
          <Flex
            row
            end
            marginTop={20}
            style={{ borderTop: '1px solid #c3c3c3' }}
          >
            <Button
              types="primary"
              style={{ marginTop: '20px' }}
              onClick={() => oncancel()}
              className={styles.cancel}
            >
              Cancel
            </Button>
            {checkedItems.length > 0 ? (
              <Button
              style={{ marginTop: '20px', marginLeft: '8px' }}
              className={styles.update}
              types="primary"
              onClick={addmembers}
            >
              Add
            </Button>

            ):(
              <Button
              style={{ marginTop: '20px', marginLeft: '8px' }}
              className={styles.update}
              types="primary"
              onClick={addmembers}
              disabled
            >
              Add
            </Button>

            )}
            
            
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default Interviewer;
