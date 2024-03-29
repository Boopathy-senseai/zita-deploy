import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { eventSchedulerApi } from '../../../routes/apiRoutes';
import { AppDispatch } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Flex from '../../../uikit/Flex/Flex';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../../uikit/InputText/InputText';
import SvgClock from '../../../icons/SvgClock';
import Text from '../../../uikit/Text/Text';
import Toast from '../../../uikit/Toast/Toast';
import SvgSearch from '../../../icons/SvgSearch';
import Loader from '../../../uikit/Loader/Loader';
import styles from './linkshare.module.css';
import { getScheduleMiddleWare } from './store/middleware/eventmiddleware';
import { DataEntity, ShareEntity } from './ScheduleTypes';

type Props = {
  sharelinkdata ?: ShareEntity[];
  details ?: DataEntity;
  setShare :  (boolean) => void;
}

const LinkShare = ({
  sharelinkdata,
  details,
  setShare,
}:Props) => {
  const dispatch: AppDispatch = useDispatch(); 
  const [checkedItems, setCheckedItems] = useState([]);
  const [data, setData] = useState(sharelinkdata);
  const [loader, setLoader] = useState(false);
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, value]);
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((item) => item !== value),
      );
    }
  };


  function searchItems(searchquery) {
    const items = sharelinkdata;
    const lowercaseQuery = searchquery.toLowerCase();
    const filteredItems = items.filter((item) =>
      item.full_name.toLowerCase().includes(lowercaseQuery.toString()),
    );
    if (filteredItems.length > 0) {
      setData(filteredItems);
    } else {
      setData([]);
    }
    return filteredItems;
  }



  const onbuttonclick = (eventid: any) => {
    console.log('checkedItemscheckedItemscheckedItems', checkedItems);
    if (checkedItems.length > 0) {
      const sharelink = JSON.stringify(checkedItems);
      setLoader(true);
      axios
        .get(`${eventSchedulerApi}?pk=${eventid}&sharelink=${sharelink}`)
        .then((res) => {
          console.log('resres', res.data.message);
          dispatch(getScheduleMiddleWare(undefined));
          Toast('Event Shared successfully', 'LONG');
          setLoader(false);
          setShare(false);
        })
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className={styles.sharelink}>
        <Flex row between center>
          <Flex>
            <Text size={14} bold>{details.event_name}</Text>
            <Text size={13} style={{ marginTop: '5px' }}>
              Select to whom you want to share the link
            </Text>
          </Flex>
          <Flex>
            <Text size={13}>{details.event_type}</Text>
            <Flex row center style={{ marginTop: '5px' }}>
              <SvgClock width={16} height={16} fill={'#581845'} />
              <Text size={13} style={{ marginLeft: '5px' }}>{details.duration}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex className={styles.line}></Flex>
        <Text size={13}>Candidate/Applicants</Text>
        <Flex row width={300}>
          <InputText
            style={{
              width: '100%',
              marginBottom: '15px',
              marginTop: '5px',
              paddingLeft:'8px',
              paddingRight:'30px'
            }}
            onChange={(e) => {
              searchItems(e.target.value);
            }}
            placeholder="Search candidate or applicant by the name"
            inputConatinerClass={styles.inputContainer}
            actionRight={() => (
              <label htmlFor={'candidate/applicant found'} style={{ margin: 0, marginTop : '10px' }}>
                <SvgSearch />
              </label>
            )}
            
          />
        </Flex>
        {data.length > 0 ? (
          <>
        <Flex row className={styles.candidate}>
          <div className={styles.grid}>
            {data.map((name, index) => (
              <Flex row key={index}>
                  <Flex row center>
                <Flex className={styles.flex} >
                  {checkedItems.includes(name.id.toString()) ? (
                    <>                    
                  <InputCheckBox                
                    value={name.id}                   
                    checked={true}
                    onChange={handleCheckboxChange}
                  />
                  </>
                  ):(
                    <>
                    <InputCheckBox                   
                    value={name.id}                
                    onChange={handleCheckboxChange}
                  />
                  </>
                  ) }
                 
                </Flex>
                <Flex style={{ marginLeft: '10px'}}>
                  <Flex row >
                  <Text size={13} className={styles.textOverflow} title={name.full_name}> {name.full_name}</Text>
                  <Text size={13}>({name.type})</Text>
                  </Flex>
                </Flex>
                </Flex>
              </Flex>
            ))}
          </div>
        </Flex>
        </>
        ) :(
          <Flex middle className={styles.nodata}>
          No Applicants/Candidates found
          </Flex>
        )}
        <Flex row end marginTop={10} className={styles.borderLine}>
          <Button
            types="primary"
            className={styles.cancel}            
            onClick={() => setShare(false)}
          >
            Cancel
          </Button>
          {data.length > 0 &&  checkedItems.length > 0 ? (

          <>
          <Button
            className={styles.share}
            onClick={() => onbuttonclick(details.id)}
          >
            Share Link
          </Button>
          </>
          ):(
            <>
          <Button          
            className={styles.share}    
            disabled
          >
            Share Link
          </Button>
          </>
          )}
        </Flex>
      </div>
    </>
  );
};

export default LinkShare;
