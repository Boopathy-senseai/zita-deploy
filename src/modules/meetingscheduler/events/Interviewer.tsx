import React, { useEffect, useState } from 'react';
import SvgSearch from '../../../icons/SvgSearch';
import Button from '../../../uikit/Button/Button';
import Flex from '../../../uikit/Flex/Flex';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../../uikit/InputText/InputText';
import Text from '../../../uikit/Text/Text';
import styles from './interviewer.module.css';

const Interviewer = (props) => {
  const {
    interviewerData,
    setinterviewerData,
    setInterviewer,
    interviewer,
    formik,
    teammembers,
    checkedItems,
    setCheckedItems,
    google,
  } = props;

  console.log('00000000000000000000000000', props.checkedItems);
  const [data, setData] = useState(teammembers);
  const [member, setmember] = useState([]);
  const [checkedData, setcheckedData] = useState(checkedItems);

  useEffect(() => {
    if (interviewerData?.length > 0) {
      // setcheckedData()
      console.log(
        'interviewerDatainterviewerDatainterviewerDatainterviewerData',
        interviewerData,
      );
      setmember(interviewerData);
    }
    // if(checkedItems.length > 0 && checkedData.length === 0){
    //   setcheckedData(checkedItems)
    // }
  }, []);

  const handleCheckboxChange = (event, name, list) => {
    console.log('77777777777', list, formik);
    if (
      formik.event_type === 'Google Hangouts/Meet' &&
      list.google_calendar === null &&
      google === false
    ) {
      alert('Atleast One inteerview must be integrated to the Google Calendar');
    }
    // if (formik.event_type !== 'Google Hangouts/Meet'){
    else {
      const { value, checked } = event.target;
      console.log('listtttttttttt', list, name, '\n', value, checkedData);
      if (checked) {
        setcheckedData((prevItems) => [...prevItems, value]);
        member.push(name);
      } else {
        setcheckedData((prevItems) =>
          prevItems.filter((item) => item !== value),
        );
        setinterviewerData((prevItems) =>
          prevItems.filter((item) => item !== value),
        );
        const index = member.findIndex((nam) => nam === name);
        console.log('indexindexindexindex', index);
        if (index !== -1) {
          member.splice(index, 1);
        }
        const remove = checkedData.find((nam) => nam === value);
        console.log('indexindexindexindexindexindex', remove);
        if (remove !== -1) {
          alert('(((((()))))');
          checkedData.splice(remove, 1);
        }
        console.log('indexindexindexindexindexindexcheckedItems', checkedData);
        // setinterviewerData(member)
      }
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
          setcheckedData(namelist);
        });

      setinterviewerData(member);
      setInterviewer(false);
      setCheckedItems(checkedData);
    } else {
    }
  };

  function oncancel() {
    setInterviewer(false);
    setCheckedItems(checkedItems);
  }

  console.log('interviewerDatainterviewerData.........', interviewerData);
  console.log('datatatatatatattat', data);

  console.log('checkediTEmSssssssss', checkedData);

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
                <label htmlFor={'members search'} style={{ margin: 6 }}>
                  <SvgSearch />
                </label>
              )}
            />
            {data.length > 0 ? (
              <>
                <Flex marginTop={10}>
                  {data.map((name, index) => (
                    <Flex row center key={index} marginBottom={10}>
                      <Flex className={styles.checkbox}>
                        {console.log(
                          'interviewerDatainterviewerData',
                          name.full_name,
                        )}
                        {checkedData.includes(name.user.toString()) ? (
                          <InputCheckBox
                            value={name.user}
                            checked={
                              checkedData.includes(name.user.toString())
                                ? true
                                : false
                            }
                            // disabled={true}
                            onChange={(e) =>
                              handleCheckboxChange(e, name.full_name, name)
                            }
                          />
                        ) : (
                          <InputCheckBox
                            value={name.user}
                            checked={
                              checkedData.includes(name.user.toString())
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              handleCheckboxChange(e, name.full_name, name)
                            }
                          />
                        )}
                      </Flex>
                      <Text size={13}>{name.full_name}</Text>
                    </Flex>
                  ))}
                </Flex>
              </>
            ) : (
              <Flex middle className={styles.nodata}>
                No Interviewers Found
              </Flex>
            )}
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
            {checkedData.length > 0 ? (
              <Button
                style={{ marginTop: '20px', marginLeft: '8px' }}
                className={styles.update}
                types="primary"
                onClick={addmembers}
              >
                Add
              </Button>
            ) : (
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
