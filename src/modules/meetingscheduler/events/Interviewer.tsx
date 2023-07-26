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
  const {
    interviewerData,
    setinterviewerData,
    setInterviewer,
    interviewer,
    teammembers,
    checkedItems,
    setCheckedItems,
  } = props;
  const [data, setData] = useState(teammembers);
  const [member, setmember] = useState([]);

  useEffect(() => {
    if (interviewerData?.length > 0) {
      setmember(interviewerData);
    }
  }, [interviewerData]);

  const handleCheckboxChange = (event, name) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, value]);

      member.push(name);
    } else {
      // Remove the value from the array
      setCheckedItems((prevItems) =>
        prevItems.filter((item) => item !== value),
      );
      setinterviewerData((prevItems) =>
        prevItems.filter((item) => item !== value),
      );

      const index = member.findIndex((nam) => nam === name);
      if (index !== -1) {
        member.splice(index, 1);
      }
      const remove = checkedItems.findIndex((nam) => nam === value);
      if (remove !== -1) {
        checkedItems.splice(remove, 1);
      }

      // setinterviewerData(member)
    }
  };

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

  function oncancel(){
    setInterviewer(false)
    setCheckedItems([])
  }

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
              value={member?.length > 0 ? member.join(', ') : ''}
            />

            {data.map((name, index) => (
              <Flex row center key={index} marginBottom={10}>
                <Flex className={styles.checkbox}>
                  {interviewerData.length > 0 &&
                  interviewerData.includes(name.full_name) ? (
                    <InputCheckBox
                      value={name.full_name}
                      checked={true}
                      // disabled={true}
                      onChange={(e) => handleCheckboxChange(e, name.full_name)}
                    />
                  ) : (
                    <InputCheckBox
                      value={name.user}
                      onChange={(e) => handleCheckboxChange(e, name.full_name)}
                    />
                  )}
                </Flex>
                <Text size={13}>{name.full_name}</Text>
              </Flex>
            ))}
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
            <Button
              style={{ marginTop: '20px', marginLeft: '8px' }}
              className={styles.update}
              types="primary"
              onClick={addmembers}
            >
              Add
            </Button>
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default Interviewer;
