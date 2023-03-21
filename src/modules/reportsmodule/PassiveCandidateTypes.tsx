export interface PassiveCandidate {
  add_on_dict?: AddOnDictEntity[];
}
export interface AddOnDictEntity {
  date: string;
  count: number;
  unlocked: number;
  applicant: number;
  invited: number;
}


export interface passiveCandidateReducerState extends PassiveCandidate {
  isLoading: boolean;
  error: string;
}
