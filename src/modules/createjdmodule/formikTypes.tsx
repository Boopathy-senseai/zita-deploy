import { SkillsEntity } from './createJdTypes';

export type nonDsSkill = { label: string; value: string; __isNew__: boolean };
export type dsFormProps = {
  qualification: [{ education: string; specialization: string }];
  jobTitle: string;
  jobTitle1:string;
  Industry_and_Domain:string;
  jobRole: string;
  jobId: string;
  jobDescription: string;
  jobType: string;
  minimumExperience: string;
  maximumExperience: string;
  vacancies: string;
  country: string;
  state: string;
  country1: string;
  state1: string;
  skills:[],
  city: string;
  Overview:string;
  Department_and_reporting:string;
  city1: string;
  remoteWork: string;
  onsite: string;
  hybrid: string;
  minimumSalary: string;
  maximumSalary: string;
  currency: string;
  showSalaryCandidates: string;
  industryType: string;
  work_space_type:string;
  work_space_type1:string;
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
