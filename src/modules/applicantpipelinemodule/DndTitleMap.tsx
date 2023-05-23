import { createRef, useEffect, useState } from 'react';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgDotMenu from '../../icons/SvgDotMenu';
import styles from './dndtitle.module.css';
import { IStageColumn } from './dndBoardTypes';

type Props = {
  column: IStageColumn;
  setSortApplicant: (columnId: number, arg: string) => void;
  index: number;
  onSelectAll?: (data: IStageColumn) => void;
  onUnselectAll?: (data: IStageColumn) => void;
  columnSelected?: boolean;
};
const DndTitleMap = ({
  column,
  setSortApplicant,
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
    setSortApplicant(column.columnId, 'date');
    setDropDown(false);
  };
  //name sort function
  const hanldeNameSort = (indexValue: number) => {
    setSortApplicant(column.columnId,'name');

    setDropDown(false);
  };
  // match sort function
  const hanldeMatchSort = (indexValue: number) => {
    setSortApplicant(column.columnId, 'match');
    setDropDown(false);
  };
  return (
    <div
      style={{ left: column?.left, borderBottomColor: column?.stage_color }}
      className={styles.colTitle}
    >
      <Flex row center>
        <Text
          style={{
            color: column?.stage_color,
            borderBottom: 3,
            fontWeight: 500,
          }}
        >
          {column?.title}
        </Text>
        <Text
          style={{ marginLeft: 4, color: column?.stage_color, fontWeight: 500 }}
        >
          ({column?.total})
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
          <SvgDotMenu width={14} height={14} fill={column?.stage_color} />
        </div>
        {isDropDown && (
          <Flex className={styles.dropDownFlex}>
            {!columnSelected ? (
              <Text
                onClick={() => onSelectAll(column)}
                className={styles.dropDate}
              >
                {'Select All'}
              </Text>
            ) : (
              <Text
                onClick={() => onUnselectAll(column)}
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
