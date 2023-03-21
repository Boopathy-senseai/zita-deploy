// eslint-disable-next-line
import escapeRegExp from 'lodash/escapeRegExp';
import { isEmpty } from '../../uikit/helper';
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
  isMasters: boolean,
  isOther: boolean,
) => {
  let qualificationFilter: string = '';
  if (isAny) {
    qualificationFilter = '';
  } else if (isBachelors && isDoctorate && isMasters && isOther) {
    qualificationFilter = 'Bachelor,Doctorate,Master,Other';
  } else if (isBachelors && isDoctorate && isMasters) {
    qualificationFilter = 'Bachelor,Doctorate,Master';
  } else if (isMasters && isDoctorate && isOther) {
    qualificationFilter = 'Master,Doctorate,Other';
  } else if (isBachelors && isDoctorate && isOther) {
    qualificationFilter = 'Bachelor,Doctorate,Other';
  } else if (isBachelors && isMasters && isOther) {
    qualificationFilter = 'Bachelor,Master,Other';
  } else if (isBachelors && isDoctorate) {
    qualificationFilter = 'Bachelor,Doctorate';
  } else if (isBachelors && isMasters) {
    qualificationFilter = 'Bachelor,Master';
  } else if (isBachelors && isOther) {
    qualificationFilter = 'Bachelor,Other';
  } else if (isDoctorate && isMasters) {
    qualificationFilter = 'Doctorate,Master';
  } else if (isOther && isMasters) {
    qualificationFilter = 'Other,Master';
  } else if (isOther && isDoctorate) {
    qualificationFilter = 'Doctorate,Other';
  } else if (isBachelors) {
    qualificationFilter = 'Bachelor';
  } else if (isDoctorate) {
    qualificationFilter = 'Doctorate';
  } else if (isMasters) {
    qualificationFilter = 'Master';
  } else if (isOther) {
    qualificationFilter = 'Other';
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

