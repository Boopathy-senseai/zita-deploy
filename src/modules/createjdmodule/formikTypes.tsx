import { SkillsEntity } from './createJdTypes';

export type nonDsSkill = { label: string; value: string; __isNew__: boolean };
export type dsFormProps = {
  qualification: [{ education: string; specialization: string }];
  jobTitle: string;
  jobRole: string;
  jobId: string;
  jobDescription: string;
  jobType: string;
  minimumExperience: string;
  maximumExperience: string;
  vacancies: string;
  country: string;
  state: string;
  skills:[],
  city: string;
  remoteWork: string;
  minimumSalary: string;
  maximumSalary: string;
  currency: string;
  showSalaryCandidates: string;
  industryType: string;
  work_space_type:string;
  IndustryType: string;
  skillData: {
    dataBaseTags: SkillsEntity[];
    toolsTags: SkillsEntity[];
    platformsTags: SkillsEntity[];
    othersTags: SkillsEntity[];
    programTags: SkillsEntity[];
  };
  nonDsSkill?: [];
  skillValid?: string;
};

export type questionnaireProps = {
  fieldType: string;
  question: string;
  description: string;
  required: string;
  options: any[];
};
