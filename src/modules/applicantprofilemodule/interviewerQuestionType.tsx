export interface Result {
  total_avg: number;
}

export interface Question {
  id: number;
  jd_id: string;
  candidate_id: string;
  interview_id: number;
  question: string;
  role: string;
  attendees: string;
  scorecard: string | null;
  commands: string;
  level: string;
  priority: string;
  total_score: number | null;
  is_active?: boolean;
}

export interface CumulativeData {
  attendees: string;
  interview_id: number;
  first_name: string;
  last_name: string;
  total_score: number | null;
  question_count: number;
  scored_question: number;
  full_name: string;
  average_score: number | null;
  total_recommend: number | null;
  avg_recommend: number | null;
  commands: string | null;
}

export interface NoOfInterview {
  id: number;
  applicant: string;
  cand_id: string;
  jd_id: string;
  location: string;
  event_type: string;
  s_time: null | Date;
  e_time: null | Date;
  org_id: string;
}

export interface Scorecard {
  interview_id: number;
  attendees_count: number;
  recommend: number;
  avg_score: number;
}

export interface InterviewerQuestions {
  success : boolean;
  result: Result | undefined;
  data: Question[];
  cumulative: CumulativeData[];
  no_of_interview: NoOfInterview[];
  scorecard: Scorecard[];
}

export interface InterviewExtractData {
  questions: Question[];
  data: NoOfInterview | undefined;
  cumulative: CumulativeData[];
  scorecard: Scorecard;
}

export interface GenerateQuestionsState {
  interviewId?: number;
  isLoading: boolean;
  error: string;
}

export interface ScoreCardFormInputData {
  id?: number;
  scorecard: number;
  question?: string;
  value: string;
  active: boolean;
  priority?: number;
}

export interface InterviewerQuestionReducer extends InterviewerQuestions {
  isLoading: boolean;
  error: string;
  interviews: {
    [key: number]: InterviewExtractData;
  };
  generateQuestionsState: GenerateQuestionsState;
}

export interface EvaluateInterviewInput {
  id: number;
  scorecard: number;
  question: string;
  value: string;
  active: string;
  priority: string;
}
