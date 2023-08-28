import { useEffect, useState } from 'react';
import SvgSearch from '../../../icons/SvgSearch';
import Button from '../../../uikit/Button/Button';
import Flex from '../../../uikit/Flex/Flex';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../../uikit/InputText/InputText';
import Text from '../../../uikit/Text/Text';
import styles from './interviewer.module.css';
import { InterviewEntity, MemberEntity } from './ScheduleTypes';

type Props = {
  checkedItems ?: number[];
  interviewerData ?: string[];
  teammembers? : MemberEntity[];
  setCheckedItems : (checkedItems) => void;
  setInterviewer : (boolean) => void;  
  setinterviewerData : (checkedItems) => void;
}

const Interviewer = ({
  checkedItems,
  interviewerData,
  teammembers,
  setCheckedItems,
  setInterviewer,
  setinterviewerData  
}:Props) => {
  const [data, setData] = useState(teammembers);
  const [member, setmember] = useState([]);
  const [checkedData, setcheckedData] = useState(checkedItems);

  useEffect(() => {
    if (interviewerData?.length > 0) {
      setmember(interviewerData);
    }
  }, []);


  const handleCheckboxChange = (event, name, list) => {
      const { value, checked } = event.target;
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
        if (index !== -1) {
          member.splice(index, 1);
        }
        const remove = checkedData.find((nam) => nam === value);
        if (remove !== -1) {
          checkedData.splice(remove, 1);
        }
      }
  };

  function searchItems(query) {
    const items = teammembers;
    const lowercaseQuery = query.toLowerCase();
    const filteredItems = items.filter((item) =>
      item.full_name.toLowerCase().includes(lowercaseQuery),
    );
    if (filteredItems.length > 0) {
      setData(filteredItems);
    } else {
      setData([]);
    }
    return filteredItems;
  }

  const addmembers = () => {
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
  };

  function oncancel() {
    setInterviewer(false);
    setCheckedItems(checkedItems);
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
              onChange={(e) => {
                searchItems(e.target.value);
              }}
              actionRight={() => (
                <label htmlFor={'members search'} style={{ margin: 6,paddingTop : '9px' }}>
                  <SvgSearch />
                </label>
              )}
            />
          </Flex>
          <Flex className={styles.model}>
            {data.length > 0 ? (
              <>
                <Flex marginTop={10}>
                  {data.map((name, index) => (
                    <Flex row center key={index} marginBottom={10}>
                      <Flex className={styles.checkbox}>                        
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
