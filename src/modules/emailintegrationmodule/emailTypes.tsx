export interface Emails {
  email: string;
  lable: string;
}
export interface UserEmail {
  isLoading: boolean;
  error: string;
  mails: Emails[];
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
