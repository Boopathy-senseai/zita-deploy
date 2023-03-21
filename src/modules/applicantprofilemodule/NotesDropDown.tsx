import { createRef, useEffect, useState } from 'react';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgDotMenu from '../../icons/SvgDotMenu';
import SvgTrash from '../../icons/SvgTrash';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { Notes } from './applicantProfileTypes';
import styles from './notestab.module.css';

type Props = {
  notesList: Notes;
  handleDelete: (id: number) => void;
  handleOpenEdit: any;
};

const NotesDropDown = ({ notesList, handleDelete, handleOpenEdit }: Props) => {
  const [isDrop, setDrop] = useState(false);
  const myRef = createRef<any>();

  const handleOpenDrop = () => {
    setDrop(!isDrop);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      setDrop(false);
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

  return (
    <Flex row center between className={styles.dateStyle}>
      <Text color="gray">
        {getDateString(notesList.created_at, 'DD MMM YYYY LT')}
      </Text>
      <div
        className={styles.dotSvg}
        onClick={handleOpenDrop}
        tabIndex={-1}
        role={'button'}
        onKeyPress={() => {}}
      >
        <SvgDotMenu height={12} width={12} />
      </div>
      {isDrop && (
        <div ref={myRef} className={styles.dropBorder}>
          <Flex
            row
            center
            onClick={() => {
              handleOpenEdit(notesList.notes, notesList.id);
              setDrop(false);
            }}
            className={styles.dropDownOverAll}
          >
            <div style={{ position: 'relative', bottom: 2 }}>
              <SvgBoxEdit height={14} width={14} />
            </div>
            <Text className={styles.dropDownList}>{'Edit'}</Text>
          </Flex>
          <Flex
            row
            center
            onClick={() => {
              handleDelete(notesList.id);
              setDrop(false);
            }}
            className={styles.dropDownOverAll}
          >
            <div style={{ position: 'relative', bottom: 2 }}>
              <SvgTrash fill={'#424242'} height={14} width={14} />
            </div>

            <Text className={styles.dropDownList}>{'Delete'}</Text>
          </Flex>
        </div>
      )}
    </Flex>
  );
};

export default NotesDropDown;
