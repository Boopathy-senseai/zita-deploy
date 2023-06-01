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
import { draftmail } from '../../emailService';
import styles from './draftsave.module.css';

type Props = {
  verifiymodel: boolean;
  closeverify: () => void;
  composemodel: () => void;
  clearstate: () => void;
  Emailprops: object;
};

const Modaldraft = ({
  verifiymodel,
  closeverify,
  composemodel,
  clearstate,
  Emailprops,
}: Props) => {
  const msal = useMsal();

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

  const draftsave = async () => {
    await draftmail(authProvider, Emailprops)
      .then((res) => {
        closeverify();
        clearstate();
        composemodel();
        Toast('Draft save successfully', 'LONG', 'success');
      })
      .catch((error) => {
        console.log('draft not save ', error);
      });
  };

  return (
    <div>
      <Modal open={verifiymodel}>
        <div className={styles.draftmodal}>
          <Flex middle className={styles.flextop}>
            <SvgoutlookMail />
          </Flex>

          <Flex middle className={styles.flextop}>
            <Text bold size={14}>
              Save this message as a draft ?
            </Text>
          </Flex>

          <Flex middle className={styles.content}>
            This message has not been sent and contains unsaved changes. You can
            save it as a draft to work on later.
          </Flex>

          <Flex middle className={styles.flextop}>
            <Button className={styles.buttonwidth} onClick={draftsave}>
              Save
            </Button>
          </Flex>

          <Flex middle className={styles.flextop}>
            <Button
              className={styles.buttonsecondary}
              types="secondary"
              onClick={() => dontsave()}
            >
              Don`t Save
            </Button>
          </Flex>

          <Flex middle className={styles.flextop}>
            <Button
              className={styles.buttonsecondary}
              types="secondary"
              onClick={cancel}
            >
              Cancel
            </Button>
          </Flex>
        </div>
      </Modal>
    </div>
  );
};
export default Modaldraft;
