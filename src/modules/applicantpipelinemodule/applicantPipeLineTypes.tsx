import { IKanbanStages, StageData } from '../../hooks/useStages/types';

export interface ApplicantPipeLine {
  success: boolean;
  skill_list: SkillListEntity[];
  jd_id: string;
  job_details: JobDetailsEntity;
  permission?: string[];
  zita_match_count: number;
}
export interface SkillListEntity {
  label: string;
  value: string;
}
export interface JobDetailsEntity {
  city: string;
  country: string;
  job_role__label_name: string;
  job_title: string;
  state: string;
  job_id: string;
}

export interface ApplicantPipeLineReducerState extends ApplicantPipeLine {
  isLoading: boolean;
  error: string;
}
export interface KanbanStageReducerState {
  isLoading: boolean;
  error: string;
  selectPipeline: boolean | null;
  stages: IKanbanStages[];
  update: {
    isLoading: boolean;
    error: string;
    message: string;
  };
  delete: {
    isLoading: boolean;
    error: string;
    message: string;
  };
}

export interface ApplicantPipeLinePayload {
  jd_id: string;
}
export interface ApplicantUpdateStatusPayload {
  jd_id: string;
  applicant_id: number;
  status: string;
}

export interface ApplicantData {
  jd_id: number;
  workflow_id?: number | null;
  params: string;
  fav_id: boolean;
  google?: GoogleEntity[];
  outlook?: GoogleEntity[];
  total_applicant: number;
  applicants_list: ApplicantEntity[];
}
export interface GoogleEntity {
  id: number;
  client_id_id: number;
  email: string;
  json_path: string;
  created_at: string;
}
export interface IntegrateEntity {
  account:string;
  status:boolean;
  user:any;
}
export interface ApplicantEntity {
  id: number;
  jd_id_id: number;
  candidate_id_id: number;
  client_id_id: number;
  status_id_id: number;
  created_on: string;
  updated_by?: null;
  source: string;
  fav?: null;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  qualification: string;
  skills: string;
  event?: null;
  location: string;
  viewed: string;
  work_exp: number;
  work_exp_mon: number;
  match?: number | null;
  image: string;
  file: string;
  stage_id_id: number;
}
export interface ShortlistedEntityOrRejectedEntity {
  id: number;
  jd_id_id: number;
  candidate_id_id: number;
  client_id_id: number;
  status_id_id: number;
  created_on: string;
  updated_by: string;
  source: string;
  fav?: null;
  name: string;
  email: string;
  qualification: string;
  skills: string;
  event?: null;
  location: string;
  viewed?: null;
  work_exp: number;
  match: number;
  image: string;
  file: string;
}
export interface InterviewedEntityOrSelectedEntity {
  id: number;
  jd_id_id: number;
  candidate_id_id: number;
  client_id_id: number;
  status_id_id: number;
  created_on: string;
  updated_by: string;
  source: string;
  fav?: null;
  name: string;
  email: string;
  qualification: string;
  skills: string;
  event?: null;
  location: string;
  viewed: string;
  work_exp: number;
  match: number;
  image: string;
  file: string;
}

export interface ApplicantDataReducerState extends ApplicantData {
  isLoading: boolean;
  error: string;
  applicants: { [key: number]: ApplicantEntity[] };
  locations: string[];
  checkauth: IntegrateEntity | null;
}

export interface ApplicantFilter {
  jd_id: string;
  profile_match?: string;
  candidate?: string;
  work_experience?: string;
  profile_view?: string;
  education_level?: any;
  skill_match?: any;
  fav?: string;
  sortApplicant?: string;
  sortSortList?: string;
  sortInterview?: string;
  sortSelected?: string;
  sortRejected?: string;
  location?: string;
}

export interface IUpdateKanbanStage {
  workflow_id?: number;
  jd_id: number;
  stages: StageData[];
}

export interface ApplicantUpdateReducerState {
  isLoading: boolean;
  error: string;
}

/// Card seclection Map Type

export interface ICardSelectionData {
  task: ApplicantEntity;
  section: number;
  columnId: number;
}

export type ICardSelectionMap = Map<number, ICardSelectionData>;

/// Download types

export interface IDownloadBulk {
  filepath?: string;
  file_path?: string;
  file_type?: string;
  success?: boolean;
  message?: string;
}

export interface ApplicantDownloadReducerState{
  isLoading: boolean;
  error: string;
  filepath: string;
  message: string;
}

export const KANBAN_COLUMN_WIDTH = 260;
