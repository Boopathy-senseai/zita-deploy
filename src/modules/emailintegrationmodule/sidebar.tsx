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
};

const Sidebar = ({ open, send, draft }: Props) => {
  const [model, setmodel] = useState(false);
  const [style, setstyle] = useState('popup');
  const [openCc, setopenCc] = useState(false);
  const [openBcc, setopenBcc] = useState(false);
  const openmodel = () => {
    open();
  };

  return (
    <div>
      <div className={styles.sidebar}>
        <ul>
          <li className={styles.select_row}>
            <a href="##">
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
          <li className={styles.select_row}>
            <a href="##" onClick={send} className={styles.hoverview}>
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
          <li className={styles.select_row}>
            <LinkWrapper onClick={draft} className={styles.hoverview}>
              <SvgSend />
              <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Sent
              </Text>
            </LinkWrapper>
          </li>
          <li className={styles.select_row}>
            <LinkWrapper className={styles.hoverview}>
              <SvgDraft />
              <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Draft
              </Text>
            </LinkWrapper>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
