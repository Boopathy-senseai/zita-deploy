import { createSlice } from '@reduxjs/toolkit';
import {
  UserEmail,
  OutlookProfile,
  OutlookMailFolder,
  IntegrateInfo,
  outlookIntegrate,
  outlookremove,
  gmailintegrate,
  gmailremoveacc,
  googleauth,
  outlookauth,
} from '../../emailTypes';
import {
  getEmail,
  outlookMailFolder,
  integrate_mail,
  outlook_integrate,
  outlook_remove,
  gmail_integrate,
  google_remove,
  Google_Auth,
  Outlook_Auth,
} from '../middleware/emailIntegrationMiddleWare';

const emailState: UserEmail = {
  isLoading: false,
  error: '',
  mails: [],
  email: '',
  token: '',
  account: '',
};

const profileState: OutlookProfile = {
  isLoading: false,
  error: '',
  profile: {},
};

const mailfolderState: OutlookMailFolder = {
  isLoading: false,
  error: '',
  mailFolder: [],
};

const integrationState: IntegrateInfo = {
  isLoading: false,
  error: '',
  email: '',
  token: {},
};

const outlooklog: outlookIntegrate = {
  isLoading: false,
  error: '',
  data: '',
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const outlookremovelog: outlookremove = {
  isLoading: false,
  error: '',
  data: '',
};

const gmaillog: outlookremove = {
  isLoading: false,
  error: '',
  data: '',
};

const gmailremovelog: outlookremove = {
  isLoading: false,
  error: '',
  data: '',
};

const googleAuth: googleauth = {
  isLoading: false,
  error: '',
  data: '',
};
const outlookAuth: outlookauth = {
  isLoading: false,
  error: '',
  data: '',
};

const getuseremail = createSlice({
  name: 'mail',
  initialState: emailState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmail.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.mails = action.payload.data;
      state.token = action.payload.access_token;
      state.email = action.payload.email;
      state.account = action.payload.account;
    });

    builder.addCase(getEmail.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const outlookuserprofile = createSlice({
  name: 'profile',
  initialState: profileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmail.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action;
    });
    builder.addCase(getEmail.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const getmailfolder = createSlice({
  name: 'mailfolder',
  initialState: mailfolderState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(outlookMailFolder.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(outlookMailFolder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.mailFolder = action.payload;
    });
    builder.addCase(outlookMailFolder.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const integrationprofile = createSlice({
  name: 'info',
  initialState: integrationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(integrate_mail.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(integrate_mail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.email = action.payload.mail;
      state.token = action.payload.token;
    });
    builder.addCase(integrate_mail.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const outlook_integrates = createSlice({
  name: 'outlook',
  initialState: outlooklog,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(outlook_integrate.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(integrate_mail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(integrate_mail.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const outlook_removeaccout = createSlice({
  name: 'outlookremove',
  initialState: outlookremovelog,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(outlook_remove.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(outlook_remove.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(outlook_remove.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const google_mail_integrate = createSlice({
  name: 'gmailintegrate',
  initialState: gmaillog,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(gmail_integrate.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(gmail_integrate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(gmail_integrate.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const google_mail_remove = createSlice({
  name: 'gmailremove',
  initialState: gmailremovelog,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(google_remove.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(google_remove.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(google_remove.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const google_auth = createSlice({
  name: 'googleAuth',
  initialState: googleAuth,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Google_Auth.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(Google_Auth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(Google_Auth.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const outlook_auth = createSlice({
  name: 'outlookAuth',
  initialState: outlookAuth,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Outlook_Auth.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(Outlook_Auth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(Outlook_Auth.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const useremail = getuseremail.reducer;
export const outlookprofile = outlookuserprofile.reducer;
export const getmailfolders = getmailfolder.reducer;
export const integrationtoken = integrationprofile.reducer;
export const outlook_integration = outlook_integrates.reducer;
export const outlook_mail_removeacc = outlook_removeaccout.reducer;
export const google_mail_integration = google_mail_integrate.reducer;
export const google_mail_removeacc = google_mail_remove.reducer;

export const Google_auth = google_auth.reducer;
export const Outlook_auth = outlook_auth.reducer;
