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
import SvgArchive from '../../icons/SvgArchive';
import SvgSpam from '../../icons/SvgSpam';
import SvgJunk from '../../icons/SvgJunk';
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
  page: () => void;
  sidebarroute: number;
  integration: string;
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
  page,
  sidebarroute,
  integration,
}: Props) => {
  const [select, setSelect] = useState(1);

  const openmodel = () => {
    open();
  };

  const inboxmessage = (e, val) => {
    e.preventDefault();
    setSelect(val);
    updateroute(val);
    // page();
  };
  const sendmessage = (e, val) => {
    e.preventDefault();
    setSelect(val);
    updateroute(val);
    //page();
  };
  const draftmessage = (e, val) => {
    e.preventDefault();

    setSelect(val);
    updateroute(val);
    // page();
  };

  const archivemessage = (e, val) => {
    e.preventDefault();
    setSelect(val);
    updateroute(val);
    //page();
  };

  const trashmessage = (e, val) => {
    e.preventDefault();
    setSelect(val);
    updateroute(val);
    //page();
  };

  const junkmessage = (e, val) => {
    e.preventDefault();
    setSelect(val);
    updateroute(val);
    // page();
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
              <Flex title="Compose" style={{ cursor: 'pointer' }}>
                <Button onClick={openmodel} style={{ padding: '5px' }}>
                  <Flex row center>
                    <SvgPlus
                      width={12}
                      height={12}
                      viewBox="0 0 9 9"
                      style={{ cursor: 'pointer' }}
                    />
                    {/* <Text color="white" style={{ marginLeft: '5px' }}>
                    Compose
                  </Text> */}
                  </Flex>
                </Button>
              </Flex>
            </a>
          </li>
          <li className={sidebarroute === 1 ? styles.select_row : ''}>
            <a
              href={' '}
              onClick={(e) => inboxmessage(e, 1)}
              className={styles.hoverview}
              title="Inbox"
            >
              <SvgInbox
                width={16}
                height={16}
                fill={sidebarroute === 1 ? '#581845' : '#333333'}
              />
              {/* <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Inbox
              </Text> */}
            </a>
          </li>
          <li className={sidebarroute === 2 ? styles.select_row : ''}>
            <a
              href={' '}
              onClick={(e) => sendmessage(e, 2)}
              className={styles.hoverview}
              title="Sent Items"
            >
              <SvgSend
                width={16}
                height={16}
                fill={sidebarroute === 2 ? '#581845' : '#333333'}
              />
              {/* <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Sent
              </Text> */}
            </a>
          </li>
          <li className={sidebarroute === 3 ? styles.select_row : ''}>
            <a
              href={' '}
              onClick={(e) => draftmessage(e, 3)}
              className={styles.hoverview}
              title="Drafts"
            >
              <SvgDraft
                width={16}
                height={16}
                fill={sidebarroute === 3 ? '#581845' : '#333333'}
              />
              {/* <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Draft
              </Text> */}
            </a>
          </li>
          {integration === 'outlook' ? (
            <li className={sidebarroute === 4 ? styles.select_row : ''}>
              <a
                href={' '}
                onClick={(e) => archivemessage(e, 4)}
                className={styles.hoverview}
                title="Archive"
              >
                <SvgArchive
                  width={16}
                  height={16}
                  fill={sidebarroute === 4 ? '#581845' : '#333333'}
                />
                {/* <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Archive
              </Text> */}
              </a>
            </li>
          ) : (
            <li className={sidebarroute === 4 ? styles.select_row : ''}>
              <a
                href={' '}
                onClick={(e) => archivemessage(e, 4)}
                className={styles.hoverview}
                title="Spam"
              >
                <SvgSpam
                  width={19}
                  height={19}
                  fill={sidebarroute === 4 ? '#581845' : '#333333'}
                />
                {/* <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Archive
              </Text> */}
              </a>
            </li>
          )}

          <li className={sidebarroute === 5 ? styles.select_row : ''}>
            <a
              href={' '}
              onClick={(e) => trashmessage(e, 5)}
              className={styles.hoverview}
              title={integration === 'outlook' ? 'Trash' : 'Bin'}
            >
              <SvgTrash
                width={16}
                height={16}
                fill={sidebarroute === 5 ? '#581845' : '#333333'}
              />
              {/* <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                Trash
              </Text> */}
            </a>
          </li>
          {integration === 'outlook' ? (
            <li className={sidebarroute === 6 ? styles.select_row : ''}>
              <a
                href={' '}
                onClick={(e) => junkmessage(e, 6)}
                className={styles.hoverview}
                title="Junk"
              >
                <SvgJunk
                  width={16}
                  height={16}
                  stroke={sidebarroute === 6 ? '#581845' : '#333333'}
                />
                {/* <Text
                className={styles.text}
                color="primary"
                style={{ marginLeft: '10px', fontSize: '18px' }}
              >
                junk
              </Text> */}
              </a>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
