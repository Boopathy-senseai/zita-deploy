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
import SvgDraft from '../../icons/SvgMailDraft';
import styles from './sidebar.module.css';

type Props = {
  open: () => void;
  send: () => void;
  draft: () => void;
  inbox: () => void;
};

const Sidebar = ({ open, send, draft, inbox }: Props) => {
  const [select, setSelect] = useState(1);
  const openmodel = () => {
    open();
  };

  const inboxmessage = (e) => {
    e.preventDefault();
    inbox();
    setSelect(1);
  };
  const sendmessage = (e) => {
    e.preventDefault();
    send();
    setSelect(2);
  };
  const draftmessage = (e) => {
    e.preventDefault();
    draft();
    setSelect(3);
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
              onClick={(e) => inboxmessage(e)}
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
              onClick={(e) => sendmessage(e)}
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
              onClick={(e) => draftmessage(e)}
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
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
