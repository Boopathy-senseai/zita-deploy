export interface JobMetrics {
  job_list?: JobListEntity[];
  params: string;
  len_list: number;
}
export interface JobListEntity {
  id: number;
  job_title: string;
  job_id: string;
  no_of_vacancies: number;
  applicants?: number;
  offered?: number;
  rejected?: number;
  shortlisted?: number;
  zita_match: number;
  invite_to_apply?:  number;
  not_interested?: number;
  interested?: number;
}

export interface JobMetricsChart {
  job_list: JobList;
  job_list_dict: JobListDict;
}
export interface JobList {
  id: number;
  jd_status__value: string;
  no_of_vacancies: number;
  job_title: string;
  job_id: string;
  job_posted_on: string;
  Zita_Match: number;
  Invited_to_Apply?: number;
  Not_Interested?: number;
  Applicants?: number;
  Shortlisted?: number;
  Qualified?: number;
  Disqualified?: number;
  country_name: string;
  state_name: string;
  city_name: string;
  posted_channels?: number;
  interested?: number;
}
export interface JobListDict {
  Zita_Match: number;
  Invited_to_Apply?: number;
  Not_Interested?: number;
  Applicants?: number;
  Shortlisted?: number;
  Qualified?: number;
  Disqualified?: number;
}

export interface jobMetricsReducerState extends JobMetrics {
  isLoading: boolean;
  error: string;
}
export interface jobMetricsChartState extends JobMetricsChart {
  isLoading: boolean;
  error: string;
}
