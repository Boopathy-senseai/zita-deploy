import { createRef, useEffect, useState } from 'react';
import SvgSort from '../../icons/SvgSort';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './dndtitle.module.css';

type Props = {
  list: {
    title: string;
    left: string;
    borderColor: string;
    total: number;
  };
  setSortApplicant: (arg: string) => void;
  setSortSortList: (arg: string) => void;
  setSortInterview: (arg: string) => void;
  setSortSelected: (arg: string) => void;
  setSortRejected: (arg: string) => void;
  index: number;
};
const DndTitleMap = ({
  list,
  setSortApplicant,
  setSortSortList,
  setSortInterview,
  setSortSelected,
  setSortRejected,
  index,
}: Props) => {
  const [isDropDown, setDropDown] = useState(false);
  const myRef = createRef<any>();
  const handleOpenDrop = () => setDropDown(!isDropDown);

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

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
      style={{
        left: list.left,
        borderBottomColor: list.borderColor,
      }}
      className={styles.colTitle}
    >
      <Flex row center>
        <Text bold>{list.title}</Text>
        <Text style={{ marginLeft: 4, color: list.borderColor }} bold>
          ({list.total})
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
          <SvgSort width={16} height={16} />
        </div>
        {isDropDown && (
          <Flex className={styles.dropDownFlex}>
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
