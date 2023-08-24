import React, { useState, useEffect } from 'react';

import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

import { Client } from '@microsoft/microsoft-graph-client';

import config from '../../outlookmailConfig';

const GrapfClient = () => {
  let graphClient: Client | undefined = undefined;

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    useMsal().instance as PublicClientApplication,
    {
      account: useMsal().instance.getActiveAccount()!,
      scopes: config.scopes,

      interactionType: InteractionType.Popup,
    },
  );
  console.log('msalmsalmsalmsalmsalmsalmsalmsalmsal');
  // eslint-disable-next-line @typescript-eslint/no-shadow

  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
  }
};

export default GrapfClient;
