export interface BulkImport {
  txt_file?: string[] | null;
  features_balance: number;
  parsed: boolean;
  permission?: string[] | null;
  is_parsed: boolean;
  jd_id?: JdIdEntity[];
}


export interface JdIdEntity {
  id: number;
  job_title: string;
}


export interface BulkImportReducerState extends BulkImport {
  isLoading: boolean;
  error: string;
}

export interface UploadedCandidate {
  success: boolean;
  emp_pool?: EmpPoolEntity[];
  params: string;
  search: number;
  total_count: number;
  completed: number;
  incompleted: number;
}

export interface EmpPoolEntity {
  id: number;
  can_source_id: number;
  client_id_id: number;
  candidate_id_id?: null;
  job_type_id?: null;
  first_name?: string | null;
  last_name?: null;
  screen_status?: null;
  match?: null;
  email?: string | null;
  contact: string;
  linkedin_url?: string | null;
  work_exp?: null;
  relocate?: null;
  qualification?: null;
  exp_salary?: null;
  job_title?: null;
  candi_ref_id?: null;
  skills: string;
  location?: null;
  created_at: string;
  updated_by: string;
  resume_file: string;
  applicant?: null;
  zita_match?: number | null;
  updated_on: string;
}

export interface UploadedCandidateReducerState extends UploadedCandidate {
  isLoading: boolean;
  error: string;
}

export interface UploadedTotalPayload {
  total?: number;
  search?: string;
  completed?: number;
  incompleted?: number;
  jd_id?: string;
  page?: number;
}
export interface ParserPayload {
parser?:string;
}
