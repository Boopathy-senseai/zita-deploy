import { SetStateAction } from 'react';
import { IKanbanStages } from '../../hooks/useStages/types';
import {
  ApplicantEntity,
  ShortlistedEntityOrRejectedEntity,
  InterviewedEntityOrSelectedEntity,
} from './applicantPipeLineTypes';

export interface IStageColumn extends IKanbanStages{
  columnId: number;
  title: string;
  items: ApplicantEntity[];
  total: number;
  section: number;
  left: string;
}
export type columnTypes = {
  [x: string]: IStageColumn;
  // 'column-1'?: IStageColumn;
  // 'column-2'?: IStageColumn;
  // 'column-3'?: IStageColumn;
  // 'column-4'?: IStageColumn;
  // 'column-5'?: IStageColumn;
};

export type setColumn = {
  (value: SetStateAction<columnTypes>): void;
  (arg0: {
    [x: string]: IStageColumn;
    // 'column-1'?: IStageColumn | undefined;
    // 'column-2'?: IStageColumn | undefined;
    // 'column-3'?: IStageColumn | undefined;
    // 'column-4'?: IStageColumn | undefined;
    // 'column-5'?: IStageColumn | undefined;
  }): void;
};
export type setIndexProps = { (value: any): void; (arg0: null): void };
