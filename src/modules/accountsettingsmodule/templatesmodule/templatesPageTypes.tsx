import {
  PipelineData,
  StageData,
  SuggestionData,
} from '../../../hooks/useStages/types';

export interface jobPipelineForm {
  pipelineTitle: string;
}
export interface IJobPipeline {
  message: string;
  data: PipelineData[];
  stages: StageData[];
  suggestion: SuggestionData[];
}

export interface IUpdateTemplate {
  pipeline_name: string;
  set_as_default?: boolean;
  jd_id?: number;
  workflow_id: number;
  stages?: StageData[];
  suggestion?: number[];
}

export interface ICreateTemplate {
  pipeline_name: string;
  stages: StageData[];
  suggestion?: number[];
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
