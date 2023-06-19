import React, { useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button';
import Modal from '../../uikit/Modal/Modal';
import Flex from '../../uikit/Flex';

import SvgSetting from '../../icons/SvgSetting';
import SvgPlus from '../../icons/SvgPlus';
import SvgInbox from '../../icons/SvgInbox';
import SvgSend from '../../icons/SvgSend';
import SvgTrash from '../../icons/SvgTrash';
import SvgDraft from '../../icons/SvgMailDraft';
import styles from './sidebar.module.css';

type Props = {
  open: () => void;
  send: () => void;
  draft: () => void;
  inbox: () => void;
  archive: () => void;
  updateroute: (val) => void;
  deleteditems: () => void;
  junkemail: () => void;
};

const Sidebar = ({
  open,
  send,
  draft,
  inbox,
  archive,
  updateroute,
  deleteditems,
  junkemail,
}: Props) => {
  const [select, setSelect] = useState(1);
  const openmodel = () => {
    open();
  };

  const inboxmessage = (e, val) => {
    e.preventDefault();
    inbox();
    setSelect(val);
    updateroute(val);
  };
  const sendmessage = (e, val) => {
    e.preventDefault();
    send();
    setSelect(val);
    updateroute(val);
  };
  const draftmessage = (e, val) => {
    e.preventDefault();
    draft();
    setSelect(val);
    updateroute(val);
  };

  const archivemessage = (e, val) => {
    e.preventDefault();
    archive();
    setSelect(val);
    updateroute(val);
  };

  const trashmessage = (e, val) => {
    e.preventDefault();
    deleteditems();
    setSelect(val);
    updateroute(val);
  };

  const junkmessage = (e, val) => {
    e.preventDefault();
    junkemail();
    setSelect(val);
    updateroute(val);
  };

  return (
    <div>
      <div className={styles.sidebar}>
        <ul>
          <li style={{ cursor: 'pointer' }}>
            <a
              href={' '}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Button onClick={openmodel}>
                <Flex row center>
                  <SvgPlus width={10} height={10} viewBox="0 0 9 9" />
                  <Text color="white" style={{ marginLeft: '5px' }}>
                    Compose
                  </Text>
                </Flex>
              </Button>
            </a>
          </li>
          <li className={select === 1 ? styles.select_row : ''}>
            <a
              href={' '}
              onClick={(e) => inboxmessage(e, 1)}
              className={styles.hoverview}
            >
              <SvgInbox fill={'black'} />
              <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Inbox
              </Text>
            </a>
          </li>
          <li className={select === 2 ? styles.select_row : ''}>
            <a
              href={' '}
              onClick={(e) => sendmessage(e, 2)}
              className={styles.hoverview}
            >
              <SvgSend />
              <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Sent
              </Text>
            </a>
          </li>
          <li className={select === 3 ? styles.select_row : ''}>
            <a
              href={' '}
              onClick={(e) => draftmessage(e, 3)}
              className={styles.hoverview}
            >
              <SvgDraft />
              <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Draft
              </Text>
            </a>
          </li>
          <li className={select === 4 ? styles.select_row : ''}>
            <a
              href={' '}
              onClick={(e) => archivemessage(e, 4)}
              className={styles.hoverview}
            >
              <SvgDraft />
              <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Archive
              </Text>
            </a>
          </li>
          <li className={select === 5 ? styles.select_row : ''}>
            <a
              href={' '}
              onClick={(e) => trashmessage(e, 5)}
              className={styles.hoverview}
            >
              <SvgTrash width={14} height={14} fill={'black'} />
              <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Trash
              </Text>
            </a>
          </li>
          <li className={select === 6 ? styles.select_row : ''}>
            <a
              href={' '}
              onClick={(e) => junkmessage(e, 6)}
              className={styles.hoverview}
            >
              <SvgTrash width={14} height={14} fill={'black'} />
              <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                junk
              </Text>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;