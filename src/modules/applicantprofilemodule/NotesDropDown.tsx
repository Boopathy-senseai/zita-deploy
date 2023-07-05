import { createRef, useEffect, useState } from 'react';
import moment from 'moment';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgDotMenu from '../../icons/SvgDotMenu';
import Svgeditingnotes from '../../icons/editingnotes';

import SvgTrash from '../../icons/SvgTrash';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { Button, Modal } from '../../uikit';
import { Notes } from './applicantProfileTypes';
import styles from './notestab.module.css';

type Props = {
  notesList: Notes;
  handleDelete: (id: number) => void;
  handleOpenEdit: any;
};

const NotesDropDown = ({ notesList, handleDelete, handleOpenEdit }: Props) => {
  const myRef = createRef<any>();
  const [open, setopen] = useState(false);
  const [user, setuser] = useState(false);
  useEffect(() => {
    if (notesList.client_id_id === notesList.user) {
      setuser(true);
    } else {
      setuser(false);
    }
  }, []);
  return (
    <Flex row center between className={styles.dateStyle}>
      <Flex middle center row>
        <Flex middle center>
          <Text color="gray"   className={styles.datetype}>
            {moment(notesList.created_at).fromNow()}
          </Text>
        </Flex>
        {user?
        <Flex
        row
        middle
        center
        onClick={() => {
          handleOpenEdit(notesList.notes, notesList.id);
        }}
        className={styles.dropDownOverAll}
      >
        <div style={{ position: 'relative', bottom: 2 }}>
          <Svgeditingnotes height={14} width={14} fill={'#581845'}/>
        </div>
      </Flex>:
      <Flex
      row
      middle
      center
      disabled 
      onClick={() => {
        handleOpenEdit(notesList.notes, notesList.id);
      }}
      className={styles.dropDownOverAll}
    >
      <div style={{ position: 'relative', bottom: 2 }}>
        <Svgeditingnotes height={14} width={14} fill={'rgb(88 24 69/50%)'} />
      </div>
    </Flex>
        }
        
        {user?
        <Flex
          row
          center
          disabled={!user}
          onClick={() => {
            setopen(true);
          }}
          className={styles.dropDownOverAll}
        >
          {/* 'rgb(51 51 51/50%)' 88, 24, 69 */}
          <div style={{ position: 'relative', bottom: 2 }}>
            <SvgTrash height={14} width={14}  fill={'#581845'} />
          </div>
        </Flex>:<Flex
          row
          center
          disabled={!user}
          onClick={() => {
            setopen(true);
          }}
          className={styles.dropDownOverAll}
        >
          {/* 'rgb(51 51 51/50%)' 88, 24, 69 */}
          <div style={{ position: 'relative', bottom: 2 }}>
            <SvgTrash height={14} width={14} fill={'rgb(88 24 69/50%)'} />
          </div>
        </Flex>}
      </Flex>
      <Modal open={open}>
        <Flex flex={6} column center className={styles.overAllss}>
          <Text size={14} className={styles.insertStyles}>
            This action will permanently delete this note.
          </Text>
          <Text size={14} className={styles.insertStyless}>
            Are your sure to proceed?
          </Text>
          <Flex row end className={styles.borderLine}>
            <Button
              className={styles.cancel}
              types={'primary'}
              onClick={() => setopen(false)}
            >
              Cancel
            </Button>
            <Button
              className={styles.update}
              onClick={() => handleDelete(notesList.id)}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </Flex>
  );
};

export default NotesDropDown;
