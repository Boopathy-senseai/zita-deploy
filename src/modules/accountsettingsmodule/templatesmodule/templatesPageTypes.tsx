export interface jobPipelineForm {
  title: string;
  pipelineTitle: string;
}
export interface IJobPipeline {
  messaage: string;
  data: PipelineData[];
  stages: StageData[];
  suggestion: SuggestionData[];
}
export interface StageData {
  // id: number;
  // color: string;
  // title: string;
  // disabled: boolean;
  // palatteDisabled?: boolean;
  id?: number;
  workflow_id_id?: number;
  stage_id_id?: number;
  stage_name: string;
  stage_order?: number;
  stage_color?: string;
  created_at?: string;
  is_disabled?: boolean;
}
export interface PipelineData {
  // id: string;
  // name: string;
  // default: boolean;
  // disabled: boolean;
  wk_id: number;
  emp_id_id: number;
  pipeline_name: string;
  is_active: boolean;
  created_on?: string;
  updated_at?: string;
  set_as_default: boolean;
  associate: number;
}
export interface SuggestionData {
  suggestion_id: number;
  wk_id_id?: number;
  stage_name: string;
  stage_order: number;
  stage_color: string;
  is_disabled?: boolean;
}

export interface IUpdateTemplate {
  pipeline_name: string;
  set_as_default?: boolean;
  jd_id?: number;
  workflow_id: number;
  stages?: StageData[];
}

export interface ICreateTemplate {
  pipeline_name: string;
  stages: StageData[];
}

// export interface JobPipelineStages {
//   stages: StageData[];
//   suggestions: Array<{ id: string; title: string }>;
//   // suggestion: SuggestionData[];
// }
// export interface JobPipeline {
// }
export interface PipelinePageReducerState {
  isLoading: boolean;
  error: string;
  pipeline: PipelineData[];
  suggestion: SuggestionData[];
}

export interface TemplatesPageReducerState extends IJobPipeline {
  isLoading: boolean;
  error: string;
}
