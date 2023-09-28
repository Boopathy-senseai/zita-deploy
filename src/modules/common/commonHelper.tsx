// eslint-disable-next-line
import escapeRegExp from 'lodash/escapeRegExp';
import { isEmpty, notSpecified } from '../../uikit/helper';
import { MAX_DISPLAYED_OPTIONS } from '../constValue';

const filteredOptions = (isSkills: any, skillList: any) => {
  if (!isSkills) {
    return skillList;
  }

  const matchByStart = [];
  const matchByInclusion = [];

  const regByInclusion = new RegExp(escapeRegExp(isSkills), 'i');
  const regByStart = new RegExp(`^${escapeRegExp(isSkills)}`, 'i');

  for (const option of skillList) {
    if (regByInclusion.test(option.label)) {
      if (regByStart.test(option.label)) {
        matchByStart.push(option);
      } else {
        matchByInclusion.push(option);
      }
    }
  }
  return [...matchByStart, ...matchByInclusion];
};

export const slicedOptions = (isSkills: any, skillList: any) =>
  filteredOptions(isSkills, skillList).slice(0, MAX_DISPLAYED_OPTIONS);

export const qualificationFilterHelper = (
  isAny: boolean,
  isBachelors: boolean,
  isDoctorate: boolean,
  isdiploma: boolean,
  isMasters: boolean,
  isOther: boolean,
) => {
  let qualificationFilter: string = ''; 
    if (isBachelors) {
      qualificationFilter += 'Bachelor,';
    }
    if (isDoctorate) {
      qualificationFilter += 'Doctorate,';
    }
    if (isMasters) {
      qualificationFilter += 'Master,';
    }
    if (isdiploma) {
      qualificationFilter += 'Diploma,';
    } 
    if (isOther) {
      qualificationFilter += 'Other,';
    }
    // Remove the trailing comma, if any
    qualificationFilter = qualificationFilter.replace(/,$/, '');
    
    // Check if qualificationFilter is empty
    if (!qualificationFilter) {
      qualificationFilter = '';
    }
  return qualificationFilter;
};

export const workYear = (value?: string) =>
  value === '0'
    ? 'Fresher'
    : !isEmpty(value)
    ? value !== '0-1'
      ? value === '1'
        ? `${value.replace('year', '')} Year`
        : value === 'Not Specified'
        ? `${value?.replace('years', '').replace('Years', '')} `
        : value === '0-1 Year'
        ? '0-1 Year'
        : value === 'Less than 1 year'
        ? `0-1 Year`
        : `${value?.replace('years', '').replace('Years', '')} Years`
      : `0-1 Year`

    : '';

export const pieYValue = (value?: string | any) => {
  const output = value === '0.0' ? null : Number(value);
  return output;
};

