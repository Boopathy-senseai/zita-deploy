import moment from 'moment';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { GARY_4, PRIMARY } from '../../uikit/Colors/colors';
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
              );
              setCandiList(response.payload.candi_list);
              setCandidatesLimit(response.payload.candi_limit);
              setSourceLimit(response.payload.source_limit);
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
              `Candidates_Profiles_${moment(new Date()).format('ll')}.zip`,
            );
          }
        })
        .catch(() => {
          Toast(ERROR_MESSAGE, 'LONG', 'error');
        });
    }
  };

  const svgColor = isCheckArray.length === 0 ? GARY_4 : PRIMARY;
  const checkArray = isCheckArray.length === 0 ? false : true;

  return (
    <Flex row center between wrap className={styles.overAll}>
      <Flex row center>
        <InputCheckBox
          name="selectAll"
          id={'selectAll'}
          onChange={handleSelectAll}
          checked={isCheckAll}
          label={'Bulk'}
        />
        <Flex
          className={cx('svgDownload', {
            pointer: checkArray,
            pointerNot: !checkArray,
          })}
          onClick={handleDownloadSubmit}
          title={'Download Profiles'}
        >
          <SvgDownload fill={svgColor} />
        </Flex>
        <Flex
          className={cx('svgUnlock', {
            pointer: checkArray,
            pointerNot: !checkArray,
          })}
          onClick={handleUnlockSubmit}
          title={'Unlock Contacts'}
        >
          <SvgLock fill={svgColor} height={20} width={20} />
        </Flex>
        <Text
          id="bulkaction__search_results"
          className={styles.searchTextStyle}
        >
          Search Results: {searchResult}
        </Text>
      </Flex>
      <Flex row center>
        {isCandidatesLimit === null ? (
          <Text className={cx('candidatesText')}>
            Candidates Limit: Unlimited
          </Text>
        ) : (
          <Text className={cx('candidatesText')}>
            Candidates Limit: {isCandidatesLimit}
          </Text>
        )}

        <Text>Contact Credits: {source_limit}</Text>
      </Flex>
    </Flex>
  );
};

export default BulkAction;
