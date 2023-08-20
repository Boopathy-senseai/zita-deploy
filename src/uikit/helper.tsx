/* 
  author: arulraj
  notes: please maintain the helper all the files
*/
import { parseZone, unix } from 'moment';
import { useCallback, useRef, useState } from 'react';
import Toast from './Toast/Toast'; // eslint-disable-line

export type IsEmptyValueType =
  | string
  | number
  | undefined
  | null
  | boolean
  | any;
export const isEmpty = (value: IsEmptyValueType): boolean =>
  value === undefined || value === null || value === '';

export type DateType =
  | 'MMM DD, YYYY'
  | 'DD/MM/YYYY'
  | 'DD MMM YYYY'
  | 'DD MMM'
  | 'DD MMM YYYY, hh:mm a'
  | 'DD MMM, YYYY'
  | 'MM/DD/YYYY'
  | 'YYYY/MM/DD'
  | 'ddd, MMM DD, YYYY hh:mm A'
  | 'DD/MM/YY, hh:mm a'
  | 'LT'
  | 'LTS'
  | 'MMM D, YYYY'
  | 'MMM d, YYYY'
  | 'MMM Y'
  | 'hh:mm A'
  | 'll'
  | 'DD MMM YYYY LT'
  | 'YYYY-DD-MM HH:MM:SS' // 14 Dec 2021 6:54 AM
  | 'YYYY'
  | 'YYYY-MM-DD'
  | 'll, hh:mm A'
  | 'll hh:mm A';

/**
 * Return the requested date format
 * @param value Date string or object
 * @param format returns the specified date format
 * @param isUnix converts to unix and returns unix formatted date
 * @param convertToLocal converts and returns to local timezone
 */

export const getDateString = (
  value: string | number | Object | undefined | null,
  format: DateType,
  isUnix?: boolean,
  convertToLocal?: boolean,
) => {
  if (
    (typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'object') &&
    !Array.isArray(value) &&
    !isEmpty(format)
  ) {
    if (isUnix) {
      return unix(Number(value)).format(format);
    } else {
      if (convertToLocal) return parseZone(value).local().format(format);
      return parseZone(value).format(format);
    }
  }
  return '';
};

export const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = useCallback(() => setIsHovering(true), []);
  const handleMouseOut = useCallback(() => setIsHovering(false), []);

  const nodeRef = useRef<any>();

  const callbackRef = useCallback(
    (node) => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener('mouseover', handleMouseOver);
        nodeRef.current.removeEventListener('mouseout', handleMouseOut);
      }

      nodeRef.current = node;

      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', handleMouseOver);
        nodeRef.current.addEventListener('mouseout', handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut],
  );

  return [callbackRef, isHovering];
};

export const pageReload = () => {
  window.location.reload();
};

export const mailformat = /^([\w-\.]+@([\w-]+\.)+[\w-]{1,4})?$/;
export const onlyNumbers = /^[0-9\b]+$/;
export const numberFormat = /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?$/;
export const alphabetFormat = /[^A-Za-z]/gi;
export const unlimitedHelper = (value: string | number | null | undefined) => {
  const result = value === null ? 'Unlimited' : value;
  return result;
};
export const notSpecified = (
  value: string | number | null | undefined | string[],
) => {
  const result =
    value === undefined || value === null || value === ''
      ? 'Not Specified'
      : value;
  return result;
};

export const getFocus = (id: string) => {
  document.getElementById(id)?.focus();
};

export const getBlur = (id: string) => {
  document.getElementById(id)?.blur();
};

export const firstNameChar = (name: any) => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

  let initials = [...name.matchAll(rgx)] || [];

  initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();
  return initials;
};

export const lowerCase = (value: string) => {
  const result = value
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  return result;
};

/**
 * Copies the text to the clipboard
 * @param {(string|number)} text the text that needs to be copied
 */
export const copyToClipboard = (text: string, message?: string) => {
  if (typeof Window === 'undefined') return;
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  Toast(`${message}`, 'LONG', 'success');
};

export const removeUnderScores = (status: string) => {
  if (typeof status === 'string') {
    return status.replace(/_/g, ' ');
  }
  return '';
};

export const enterKeyPress = (event: { key: string }, submit: () => void) => {
  if (event.key === 'Enter') {
    submit();
  }
};

export const allowAlphaNumericSpace = (e: {
  charCode: any;
  keyCode: any;
  preventDefault: () => void;
}) => {
  var code = 'charCode' in e ? e.charCode : e.keyCode;
  if (
    !(code === 32) && // space
    !(code > 47 && code < 58) && // numeric (0-9)
    !(code > 64 && code < 91) && // upper alpha (A-Z)
    !(code > 96 && code < 123)
  ) {
    // lower alpha (a-z)
    e.preventDefault();
  }
};

export const dateFromDay = (year: any) => {
  var date = new Date(year, 0);
  return new Date(date.setDate(1));
};

export const convertJsonToForm = (json: { [key: string]: any }) => {
  const form = new FormData();
  Object.keys(json).forEach((key) => {
    if (typeof json[key] !== 'string') {
      form.append(key, JSON.stringify(json[key]));
    } else {
      form.append(key, json[key]);
    }
  });

  return form;
};

export function stringifyParams(
  json: { [key: string]: any } | { [key: number]: any },
) {
  Object.keys(json).forEach(key => json[key] === undefined ? delete json[key] : {});
  return Object.keys(json).reduce((res, key) => {
    if (res === '') {
      // console.log(res);
      // console.log(`${key}=${jsonStringfy(json[key])}`)
      return `${key}=${jsonStringfy(json[key])}`;
    }

    function jsonStringfy(data: any) {
      let value = data;
      if (typeof data !== 'string') {
        value = JSON.stringify(data);
      }
      // console.log(`${value}`);
      return `${value}`;
    }
    return res + `&${key}=${jsonStringfy(json[key])}`;
  }, '');
}

export function workExperience(year: number, months?: number) {
  if (year === 0 && months && months !== 0) {
    return `${months} ${months > 1 ? 'Months' : 'Month'}`;
  }
  if (year > 1) {
    return `${Math.floor(year)} Years`;
  }
  return 'Fresher';
}

export const uniqueArray = (arr: any[]) => {
  return arr.filter((value, index) => {
    const _value = JSON.stringify(value);
    return index === arr.findIndex(obj => {
      return JSON.stringify(obj) === _value;
    });
  });
};