export interface candidateMessagePayload {
  jd_id: string;
  can_id: string;
}

export interface Message {
  sender: number;
  date_created: string;
  username: string;
  message: string;
  last_name:string
}

export interface MessageReducerState {
  isLoading: boolean;
  error: string;
  message: Message[];
}
