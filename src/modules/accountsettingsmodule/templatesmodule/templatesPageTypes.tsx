export interface jobPipelineForm{
    title: string;
    pipelineTitle: string;

}
export interface StageData {
    id: string;
    color: string;
    title: string;
    disabled: boolean;
    palatteDisabled?: boolean;
}

export interface JobPipelineStages {
    stages: StageData[];
    suggestions: Array<{id: string, title: string}>;
}

export interface TemplatesPageReducerState extends  JobPipelineStages{
    isLoading: boolean;
    error: string;
}