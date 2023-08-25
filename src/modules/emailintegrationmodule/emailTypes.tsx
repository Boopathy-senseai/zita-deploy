export interface Emails {
  email: string;
  lable: string;
}
export interface UserEmail {
  isLoading: boolean;
  error: string;
  mails: Emails[];
  email: string;
  token: string;
  account: string;
}

export interface OutlookProfile {
  isLoading: boolean;
  error: string;
  profile: {};
}

export interface OutlookMailFolder {
  isLoading: boolean;
  error: string;
  mailFolder: [];
}

export interface IntegrateInfo {
  isLoading: boolean;
  email: string;
  error: string;
  token: {};
}

export interface outlookIntegrate {
  isLoading: boolean;
  error: string;
  data: {};
}

export interface outlookremove {
  isLoading: boolean;
  error: string;
  data: {};
}

export interface gmailintegrate {
  isLoading: boolean;
  error: string;
  data: {};
}

export interface gmailremoveacc {
  isLoading: boolean;
  error: string;
  data: {};
}
