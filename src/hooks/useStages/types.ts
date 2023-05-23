
export interface StageData {
  id?: number;
  workflow_id_id?: number;
  stage_id_id?: number;
  stage_name: string;
  stage_order?: number;
  stage_color?: string;
  created_at?: string;
  is_disabled?: boolean;
  is_active?: boolean;
  is_associated?: boolean;
}
export interface PipelineData {
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

export interface IKanbanStages {
  id: number;
  jd_id_id?: number;
  emp_id_id?: number;
  workflow_id_id?: number;
  is_active?: boolean;
  created_on?: string;
  updated_by?: string;
  stage_order: number;
  stage_name: string;
  stage_color: string;
  stage_length?: number;
  is_disabled?: boolean;
  is_associated?: boolean;
}


