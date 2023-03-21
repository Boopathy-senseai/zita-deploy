import { SetStateAction } from 'react';
import {
  ApplicantEntity,
  ShortlistedEntityOrRejectedEntity,
  InterviewedEntityOrSelectedEntity,
} from './applicantPipeLineTypes';

export type columnTypes = {
  [x: string]: any;
  'column-1'?: { title: string; items: ApplicantEntity[] };
  'column-2'?: { title: string; items: ShortlistedEntityOrRejectedEntity[] };
  'column-3'?: { title: string; items: InterviewedEntityOrSelectedEntity[] };
  'column-4'?: { title: string; items: InterviewedEntityOrSelectedEntity[] };
  'column-5'?: { title: string; items: ShortlistedEntityOrRejectedEntity[] };
};

export type setColumn = {
  (value: SetStateAction<columnTypes>): void;
  (arg0: {
    [x: string]: any;
    'column-1'?: { title: string; items: ApplicantEntity[] } | undefined;
    'column-2'?:
      | { title: string; items: ShortlistedEntityOrRejectedEntity[] }
      | undefined;
    'column-3'?:
      | { title: string; items: InterviewedEntityOrSelectedEntity[] }
      | undefined;
    'column-4'?:
      | { title: string; items: InterviewedEntityOrSelectedEntity[] }
      | undefined;
    'column-5'?:
      | { title: string; items: ShortlistedEntityOrRejectedEntity[] }
      | undefined;
  }): void;
};
export type setIndexProps = { (value: any): void; (arg0: null): void };
