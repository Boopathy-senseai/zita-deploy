export interface Emails {
  email: string;
  lable: string;
}
export interface UserEmail {
  isLoading: boolean;
  error: string;
  mails: Emails[];
}
