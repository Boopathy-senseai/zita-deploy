export interface CalenderToken {
  google?: Google[];
  outlook?: Google[];
}
export interface Google {
  accessToken: string;
  email: string;
}

export interface CalenderTokenReducerState extends CalenderToken {
  isLoading: boolean;
  error: string;
}
