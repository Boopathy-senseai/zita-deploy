import { createRef, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import SvgSort from '../../icons/SvgSort';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgDotMenu from '../../icons/SvgDotMenu';
import SvgSelectAll from '../../icons/SvgSelectAll';
import SvgSortName from '../../icons/SvgSortName';
import styles from './dndtitle.module.css';
import { IStageColumn } from './dndBoardTypes';

type Props = {
  list: IStageColumn;
  setSortApplicant: (arg: string) => void;
  setSortSortList: (arg: string) => void;
  setSortInterview: (arg: string) => void;
  setSortSelected: (arg: string) => void;
  setSortRejected: (arg: string) => void;
  index: number;
  onSelectAll?: (data: IStageColumn) => void;
  onUnselectAll?: (data: IStageColumn) => void;
  columnSelected?: boolean;
};
const DndTitleMap = ({
  list,
  setSortApplicant,
  setSortSortList,
  setSortInterview,
  setSortSelected,
  setSortRejected,
  index,
  onSelectAll,
  onUnselectAll,
  columnSelected,
}: Props) => {
  const [isDropDown, setDropDown] = useState(false);
  const myRef = createRef<any>();
  const handleOpenDrop = () => setDropDown(!isDropDown);

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  // outside click function
  useEffect(() => {
    if (typeof Window !== 'undefined') {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      if (myRef) {
        if (typeof Window !== 'undefined') {
          document.removeEventListener('click', handleClickOutside, true);
        }
      }
    };
  });

  // date sort function
  const hanldeDateSort = (indexValue: number) => {
    if (indexValue === 0) {
      setSortApplicant('date');
    }
    if (indexValue === 1) {
      setSortSortList('date');
    }
    if (indexValue === 2) {
      setSortInterview('date');
    }
    if (indexValue === 3) {
      setSortSelected('date');
    }
    if (indexValue === 4) {
      setSortRejected('date');
    }
    setDropDown(false);
  };
  //name sort function
  const hanldeNameSort = (indexValue: number) => {
    if (indexValue === 0) {
      setSortApplicant('name');
    }
    if (indexValue === 1) {
      setSortSortList('name');
    }
    if (indexValue === 2) {
      setSortInterview('name');
    }
    if (indexValue === 3) {
      setSortSelected('name');
    }
    if (indexValue === 4) {
      setSortRejected('name');
    }
    setDropDown(false);
  };
  // match sort function
  const hanldeMatchSort = (indexValue: number) => {
    if (indexValue === 0) {
      setSortApplicant('match');
    }
    if (indexValue === 1) {
      setSortSortList('match');
    }
    if (indexValue === 2) {
      setSortInterview('match');
    }
    if (indexValue === 3) {
      setSortSelected('match');
    }
    if (indexValue === 4) {
      setSortRejected('match');
    }
    setDropDown(false);
  };
  return (
    <div
      style={{ left: list?.left, borderBottomColor: list?.borderColor }}
      className={styles.colTitle}
    >
      <Flex row center>
        <Text
          style={{ color: list?.borderColor, borderBottom: 3, fontWeight: 500 }}
        >
          {list?.title}
        </Text>
        <Text
          style={{ marginLeft: 4, color: list?.borderColor, fontWeight: 500 }}
        >
          ({list?.total})
        </Text>
      </Flex>

      <div ref={myRef}>
        <div
          onKeyPress={() => {}}
          role={'button'}
          tabIndex={-1}
          onClick={handleOpenDrop}
          className={styles.svgSort}
        >
          <SvgDotMenu width={14} height={14} fill={list?.borderColor} />
        </div>
        {isDropDown && (
          <Flex className={styles.dropDownFlex}>
            {!columnSelected ? (
              <Text
                onClick={() => onSelectAll(list)}
                className={styles.dropDate}
              >
                {'Select All'}
              </Text>
            ) : (
              <Text
                onClick={() => onUnselectAll(list)}
                className={styles.dropDate}
              >
                {'Unselect All'}
              </Text>
            )}
            <Text
              onClick={() => hanldeDateSort(index)}
              className={styles.dropDate}
            >
              {'Applied Date'}
            </Text>
            <Text
              onClick={() => hanldeMatchSort(index)}
              className={styles.dropMatch}
            >
              {'Match Score'}
            </Text>
            <Text
              onClick={() => hanldeNameSort(index)}
              className={styles.dropName}
            >
              {'Name'}
            </Text>
          </Flex>
        )}
      </div>
    </div>
  );
};

export default DndTitleMap;
