import React, { useState, useEffect } from 'react';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { useMsal } from '@azure/msal-react';
import Toast from '../../uikit/Toast/Toast';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex';
import SvgoutlookMail from '../../icons/SvgOutlookmail';
import SvgVectorClose from '../../icons/SvgMailClose';
import Button from '../../uikit/Button/Button';
import config from '../../outlookmailConfig';
import {
  draftmail,
  Gmail_Draft,
  replay_all_forward_draft,
  draftupdate,
} from '../../emailService';
import Loader from '../../uikit/Loader/Loader';
import styles from './draftsave.module.css';

type Props = {
  verifiymodel: boolean;
  closeverify: () => void;
  composemodel: () => void;
  clearstate: () => void;
  Emailprops: any;
  auth: any;
  Mail_action: any;
  mail_id: any;
};

const Modaldraft = ({
  verifiymodel,
  closeverify,
  composemodel,
  clearstate,
  Emailprops,
  auth,
  Mail_action,
  mail_id,
}: Props) => {
  const msal = useMsal();
  const [loader, setloader] = useState(false);

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,
      interactionType: InteractionType.Popup,
    },
  );

  const dontsave = () => {
    closeverify();
    clearstate();
    composemodel();
  };

  const cancel = () => {
    closeverify();
  };

  const reply_forward_replyall = async () => {
    const replyDatas = {
      comment: Emailprops.message.body.content,
      subject: Emailprops.message.subject, // Change the subject value here
      attachments: Emailprops.message.attachments,
      toRecipients: Emailprops.message.toRecipients,
      ccRecipients: Emailprops.message.ccRecipients,
      bccRecipients: Emailprops.message.bccRecipients,
    };

    await replay_all_forward_draft(
      authProvider,
      replyDatas,
      mail_id,
      'createReplyAll',
    )
      .then((res) => {
        setloader(false);
        closeverify();
        clearstate();
        composemodel();
        Toast('Draft saved successfully', 'LONG', 'success');
      })
      .catch((error) => {
        setloader(false);
        console.log('draft not save ', error);
      });
  };

  const draftsave = async () => {
    closeverify();
    if (auth === 'google') {
      Emailprops();
    } else if (auth === 'outlook') {
      setloader(true);

      if (Mail_action === 'compose') {
        await draftmail(authProvider, Emailprops)
          .then((res) => {
            setloader(false);
            closeverify();
            clearstate();
            composemodel();
            Toast('Draft saved successfully', 'LONG', 'success');
          })
          .catch((error) => {
            setloader(false);
            console.log('draft not save ', error);
          });
      } else if (
        Mail_action === 'compose' ||
        Mail_action === 'reply' ||
        Mail_action === 'replyall'
      ) {
        reply_forward_replyall();
      } else if (Mail_action === 'draft') {
        console.log('Emailprops', mail_id, Emailprops);
        await draftupdate(authProvider, mail_id, Emailprops.message)
          .then((res) => {
            setloader(false);
            closeverify();
            clearstate();
            composemodel();
            Toast('Draft saved successfully', 'LONG', 'success');
          })
          .catch((error) => {
            console.log('draft not save ', error);
          });
      }
    }
  };

  return (
    <div>
      {loader === true && <Loader />}
      <Modal open={verifiymodel}>
        <Flex flex={6} column center className={styles.draftmodal}>
          <Text size={14} className={styles.insertStyles}>
            Save this message as a draft?
          </Text>
          <Text size={14} className={styles.insertStyles}>
            This message has not been sent and contains unsaved changes. You can
            save it as a draft to work on later.
          </Text>
          <Flex row between marginTop={30}>
            <Flex>
              <Button types={'secondary'} onClick={dontsave}>
                Don`t Save
              </Button>
            </Flex>
            <Flex row>
              <Flex>
                <Button
                  className={styles.cancel}
                  types={'primary'}
                  onClick={cancel}
                >
                  Cancel
                </Button>
              </Flex>
              <Flex>
                <Button types={'primary'} onClick={draftsave}>
                  Save
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </div>
  );
};
export default Modaldraft;
