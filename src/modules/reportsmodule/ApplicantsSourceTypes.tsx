export interface ApplicantsSource {
  jd_list: JdListEntity[];
}
export interface JdListEntity {
  id: number;
  job_title: string;
  job_id: string;
}


export interface applicantsSourceReducerState extends ApplicantsSource {
  isLoading: boolean;
  error: string;
}



export interface ApplicantsSourceData {
  total_count: TotalCount;
  table: TableEntity[] ;
  short: number;
  pie_chart: any ;
  shortlisted: any ;
}
export interface TotalCount {
  count__sum: number;
}
export interface TableEntity {
  id: number;
  jd_id_id: number;
  count: number;
  source: string;
  created_at: string;
  total: number;
  applicant: number;
  shortlisted: number;
  hired?: number ;
  rejected?: number ;
}
export interface PieChartEntity {
  'Career Page': string ;
  Whatsapp: string ;
  Facebook: string ;
  Gmail: string ;
  Twitter: string ;
  'Resume Library': string ;
}
export interface ShortlistedEntity {
  'Career Page'?: number;
  Whatsapp?: number;
  'Resume Library'?: number;
  Gmail?: number;
  Facebook?: number;
  Twitter?: number;
}
export interface applicantsSourceDataReducerState extends ApplicantsSourceData {
  isLoading: boolean;
  error: string;
}
