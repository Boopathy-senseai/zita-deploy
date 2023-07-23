import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import SvgCloseSmall from '../../icons/SvgCloseSmall';
import { eventSchedulerApi } from '../../../routes/apiRoutes';
import { AppDispatch } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Flex from '../../../uikit/Flex/Flex';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../../uikit/InputText/InputText';
import SvgClock from '../../../icons/SvgClock';
import Text from '../../../uikit/Text/Text';
import Toast from '../../../uikit/Toast/Toast';
// import ShareButton from '../buildyourcareerpage/ShareButton';
import Loader from '../../../uikit/Loader/Loader';
import styles from './linkshare.module.css';
import { getScheduleMiddleWare } from './store/middleware/eventmiddleware';
// import GoogleIntergration from './googleintergration';
// import { nameList, sharelinkdata } from './eventType';

const LinkShare = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    share,
    title,
    type,
    duration,
    setShare,
    sharelinkdata,
    response,
    details,
    sharedata,
  } = props;
  const [checkedItems, setCheckedItems] = useState(sharedata);
  const [data, setData] = useState(sharelinkdata);
  const [loader, setLoader] = useState(false);

  console.log('setshare', setShare);
  console.log('checkedItems', checkedItems);
  console.log('details', details);

  const handleCheckboxChange = (event) => {
    console.log('event', event.target);
    const { value, checked } = event.target;
    console.log('value........', value, 'checked', checked);
    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, value]);
      //   setinterviewerData(checkedItems)
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((item) => item !== value),
      );
    }
  };


  console.log('checkedItems............', checkedItems, typeof checkedItems);

  function searchItems(query) {
    console.log('query', query);
    const items = sharelinkdata;
    console.log('itemms', items);
    const lowercaseQuery = query.toLowerCase();
    const filteredItems = items.filter((item) =>
      item.full_name.toLowerCase().includes(lowercaseQuery),
    );
    console.log('filteredItemsfilteredItems', filteredItems);
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
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {console.log('filteredItems', data)}
      {console.log('checkedItemscheckedItems', checkedItems)}
      {loader && <Loader />}
      <div className={styles.sharelink}>
        <Flex row between center>
          <Flex>
            <Text bold>{details.event_name}</Text>
            <Text size={13} style={{ marginTop: '5px' }}>
              Select to whom you want to share the link
            </Text>
          </Flex>
          <Flex>
            <Text>{details.event_type}</Text>
            <Flex row center style={{ marginTop: '5px' }}>
              <SvgClock width={16} height={16} fill={'#581845'} />
              <Text style={{ marginLeft: '5px' }}>{details.duration}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex className={styles.line}></Flex>
        <Text size={14}>Candidate/Applicants</Text>
        <Flex row width={300}>
          <InputText
            style={{
              width: '100%',
              marginBottom: '15px',
              marginTop: '5px',
            }}
            onChange={(e) => {
              searchItems(e.target.value);
            }}
            placeholder="Search candidate or applicant by the name"
            inputConatinerClass={styles.inputContainer}
          />
        </Flex>
        {data.length > 0 ? (
          <>
        <Flex row className={styles.candidate}>
          <div className={styles.grid}>
            {data.map((name, index) => (
              <Flex row key={index}>
                <div className={styles.flex}>
                  {checkedItems.includes(name.candidate_id) ?(
                    <>                    
                  <InputCheckBox                    
                    value={name.candidate_id}
                    checked ={checkedItems.includes(name.candidate_id)}
                    onChange={handleCheckboxChange}
                  />
                  </>
                  ):(
                    <>
                    <InputCheckBox                    
                    value={name.candidate_id}
                    onChange={handleCheckboxChange}
                  />
                  </>
                  ) }
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <Text size={14}>
                    {name.full_name}({name.type})
                  </Text>
                </div>
              </Flex>
            ))}
          </div>
        </Flex>
        </>
        ) :('No Applicants/Candidates found')}
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
            // types="primary"
            className={styles.share}
            // style={{ marignRight: '20px' }}
            onClick={() => onbuttonclick(details.id)}
          >
            Share Link
          </Button>
          </>
          ):(
            <>
          <Button
            // types="primary"
            className={styles.share}
            // style={{ marignRight: '20px' }}            
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
