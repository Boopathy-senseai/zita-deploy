export interface SourcingPerformance {
  jd_list: JdListEntity[] ;

}
export interface JdListEntity {
  id: number;
  job_title: string;
  job_id: string;
}


export interface sourcingPerformanceState extends SourcingPerformance {
  isLoading: boolean;
  error: string;
}

export interface SourcingPerformanceData {
  object1?:Object1EntityEntity[][] ;
  perc_dict?: PercDictEntity[] ;
  total_count: TotalCount;
  applicants: number;
  table: TableEntity[];
  duration: string;
  posted_date: string;
}
export interface Object1EntityEntity {
  label: string ;
  y: number;
}
export interface PercDictEntity {
  label: string;
  y: number;
}
export interface TotalCount {
  count__sum: number;
}
export interface TableEntity {
  date: string;
  view_count: number;
  applicants: number;
  percentage: number;
}

export interface sourcingPerformanceDataState extends SourcingPerformanceData {
  isLoading: boolean;
  error: string;
}