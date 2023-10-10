import { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { GARY_4, PRIMARY } from '../../uikit/Colors/colors';
import Totalcount from '../../globulization/TotalCount';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import Toast from '../../uikit/Toast/Toast';
import { AppDispatch } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import SvgDownload from '../../icons/SvgDownload';
import Text from '../../uikit/Text/Text';
import SvgLock from '../../icons/SvgLock';
import { ERROR_MESSAGE } from '../constValue';
import {
  bulkActionSourcingMiddleWare,
  bulkDownloadActionMiddleWare,
  parsedTextMiddleWare,
} from './store/middleware/talentSoucringMiddleware';
import styles from './bulkaction.module.css';

var FileSaver = require('file-saver');

const cx = classNames.bind(styles);

type Props = {
  searchResult?: number;
  isCheckAll: boolean;
  handleSelectAll: () => void;
  isCheckArray: string[];
  source_limit: number;
  setSourceLimit: (arg: number) => void;
  setCandidatesLimit: (arg: string) => void;
  isCandidatesLimit: string;
  setSuccess: (arg: boolean) => void;
  setNoLimit: (arg: boolean) => void;
  setNoPermission: (arg: boolean) => void;
  setNoCount: (arg: boolean) => void;
  setCandiList: (arg: string[]) => void;
  setFree: (arg: boolean) => void;
  planID?: number;
  setIsCheck: (arg: any) => void;
};
const BulkAction = ({
  searchResult,
  isCheckAll,
  handleSelectAll,
  isCheckArray,
  source_limit,
  setSourceLimit,
  setCandidatesLimit,
  isCandidatesLimit,
  setSuccess,
  setNoLimit,
  setNoPermission,
  setNoCount,
  setCandiList,
  setFree,
  planID,
  setIsCheck,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectcard, setselectcard] = useState('');
// bulk unlock function
  const handleUnlockSubmit = () => {
    if (planID !== 1) {
      if (isCheckArray.length !== 0) {
        dispatch(
          bulkActionSourcingMiddleWare({
            candi_list: isCheckArray,
            unlock: 'unlock',
          }),
        )
          .then((response) => {
            if (response.payload.unlock_can_list) {
              dispatch(
                parsedTextMiddleWare({
                  unlock_can_list: response.payload.unlock_can_list,
                 
                }),
              ).then((res) => {
                if(res.payload.success === false){ 
          Toast('Sorry, there was a problem connecting to the API. Please try again later.','LONG','error')
                    } })
              setCandiList(response.payload.candi_list);
              setCandidatesLimit(response.payload.candi_limit);
              setSourceLimit(response.payload.source_limit);
              setselectcard(response.payload.unlock_can_list);
              if (
                response.payload.success === true &&
                response.payload.unlock_can_list.length !== 0
              ) {
                setSuccess(true);
              }
            }

            if (response.payload.success === 'no_limit') {
              setNoLimit(true);
            }
            if (response.payload.success === 'no_permission') {
              setNoPermission(true);
            }
            if (response.payload.success === 'no_count') {
              setNoCount(true);
            }
            setIsCheck([]);
          })
          .catch(() => {
            Toast(ERROR_MESSAGE, 'LONG', 'error');
          });
      }
    } else if (planID === 1) {
      setFree(true);
    }
  };

  // bulk download submit
  const handleDownloadSubmit = () => {
    if (isCheckArray.length !== 0) {
      dispatch(
        bulkDownloadActionMiddleWare({
          candi_list: isCheckArray,
          download: 'download',
        }),
      )
        .then((response) => {
          if (response.payload.file_path) {
            FileSaver.saveAs(
              window.location.protocol + '//' + response.payload.file_path,
              `Talent Sourcing_Candidate Profile_${moment(new Date()).format('ll')}.zip`,
              Toast('Resume exported successfully','LONG','success'),
            );
          }
        })
        .catch(() => {
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }
  };


  const checkArray = isCheckArray.length === 0 ? false : true;

  const value=isCheckArray.map(val=>val[0]).filter(id=>id!==undefined);



  return (
    <Flex row center between wrap className={styles.overAll}>
      <Flex row center>
        <InputCheckBox
    
          name="selectAll"
          id={'selectAll'}
          onChange={handleSelectAll}         
          checked={isCheckAll}      />
        






        <Text
          id="bulkaction__search_results"
          className={styles.searchTextStyle}
        >
        <Totalcount 
        name="Search Results"
        numbers={searchResult}
      />
        </Text>
      </Flex>
{checkArray &&(
      <Flex row center>
      <Flex row center className={styles.bulkSelection}>
        <Flex marginRight={0}>
          <Text color="theme">{`Selected ${value.length} Candidates `}</Text>
        </Flex>

        <Flex row className={styles.bulkButton}>
          <Flex
            row
            center
            marginRight={20}
            style={{
              paddingLeft: '5px',
              borderLeft: '1px solid #581845',
              cursor: 'pointer',
              alignItems:"center"
            }}
            onClick={handleUnlockSubmit}
          > <Flex marginBottom={3}>
          <SvgLock fill={PRIMARY} height={15} width={15} /></Flex>
            <Text bold
              style={{ marginLeft: '4px' }}  
              color="theme"          
            >
            Unlock Contacts
            </Text>
          </Flex>
          <Flex
            row
            center
            style={{
              paddingLeft: '5px',
              borderLeft: '1px solid #581845',
              cursor: 'pointer',
            }}
            onClick={handleDownloadSubmit}
          >
            <SvgDownload width={14} height={14} />
            <Text bold style={{ marginLeft: '10px' }} color="theme">
            Export Resumes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )}
      

      <Flex row center>
        {isCandidatesLimit === null ? (
          <Text className={cx('candidatesText')}>
          <Totalcount 
          name="Candidates Limit"
          numbers={"Unlimited"}
        />
          </Text>
        ) : (
          <Text className={cx('candidatesText')}>
          <Totalcount 
          name="Candidates Limit"
          numbers={isCandidatesLimit}
        />
          </Text>
        )}

        <Text>
        <Totalcount 
        name="Contact Credits"
        numbers={source_limit}
      />
       </Text>
      </Flex>
    </Flex>
  );
};

export default BulkAction;


// <Flex
//           className={cx('svgDownload', {
//             pointer: checkArray,
//             pointerNot: !checkArray,
//           })}
//           onClick={handleDownloadSubmit}
//           title={'Download Profiles'}
//         >
//           <SvgDownload fill={svgColor} />
//         </Flex>
//         <Flex
//           className={cx('svgUnlock', {
//             pointer: checkArray,
//             pointerNot: !checkArray,
//           })}
//           onClick={handleUnlockSubmit}
//           title={'Unlock Contacts'}
//         >
//           <SvgLock fill={svgColor} height={20} width={20} />
//         </Flex>