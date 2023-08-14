import { relative } from 'path';
import { Theme } from 'react-select';
import {
  BLACK,
  ERROR,
  GARY_1,
  GARY_4,
  GARY_5,
  GARY_6,
  GARY_9,
  PRIMARY,
  WHITE,
} from '../Colors/colors';
import { isEmpty } from '../helper';

export const customStyles = {
  option: (provided: any) => ({
    ...provided,
    fontSize: 13,
  }),
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    minHeight: '30px',
    height: '30px',
    boxShadow: state.isFocused ? null : null,
    boxSizing: 'border-box',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: '30px',
    padding: '0 8px',
    fontSize: 13,
    color: GARY_1,
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0px',
    fontSize: 13,
    fontFamily: `'Roboto', sans-serif`,
    boxSizing: 'border-box',
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: '30px',
    cursor: 'pointer',
    boxSizing: 'border-box',
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
  }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: GARY_4,
      fontSize: 12,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
  },
  menu: (provided: any) => ({
    ...provided,
    margin: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxSizing: 'border-box',
  }),
  menuList: (provided: any) => ({
    ...provided,
    overflow: 'overlay',
    maxHeight: 200,
    scrollbarWidth: 'thin',
    padding: 0,
  }),
};

export const customStylesLine = {
  option: (provided: any) => ({
    ...provided,
    fontSize: 12,
  }),
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    minHeight: '20px',
    height: '20px',
    boxShadow: state.isFocused ? null : null,
    boxSizing: 'border-box',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: '20px',
    padding: '0 4px 0 0px',
    fontSize: 12,
    color: GARY_1,
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0px',
    fontSize: 12,
    fontFamily: `'Roboto', sans-serif`,
    boxSizing: 'border-box',
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: '20px',
    cursor: 'pointer',
    boxSizing: 'border-box',
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
  }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: GARY_4,
      fontSize: 12,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
  },
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: '0px',
  }),
  menu: (provided: any) => ({
    ...provided,
    margin: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxSizing: 'border-box',
  }),

  menuList: (provided: any) => ({
    ...provided,
    overflow: 'overlay',
    maxHeight: 200,
    scrollbarWidth: 'thin',
    padding: 0,
  }),
};

export const selectTagTheme = (
  theme: Theme,
  error?: boolean,
  errorMessage?: string,
) => ({
  ...theme,
  borderRadius: 4,
  colors: {
    ...theme.colors,
    primary25: 'rgb(88 24 69 / 15%)',
    primary: !isEmpty(errorMessage) && error ? ERROR : PRIMARY,
    primary50: 'rgb(88 24 69 / 30%)',
    neutral20: !isEmpty(errorMessage) && error ? ERROR : GARY_5,
    neutral30: !isEmpty(errorMessage) && error ? ERROR : GARY_6,
  },
});

export const customStylesMulti = {
  option: (provided: any) => ({
    ...provided,
    fontSize: 14,
  }),
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    boxShadow: state.isFocused ? null : null,
    boxSizing: 'border-box',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    fontSize: 14,
    color: GARY_1,
    height: 74,
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    alignItems: 'flex-start',
    paddingTop: 4,
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0px',
    fontSize: 14,
    fontFamily: `'Roboto', sans-serif`,
    boxSizing: 'border-box',
  }),
  indicatorsContainer: () => ({
    display: 'none',
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
  }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: GARY_4,
      fontSize: 12,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
  },
  menu: (provided: any) => ({
    ...provided,
    margin: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxSizing: 'border-box',
  }),
  menuList: (provided: any) => ({
    ...provided,
    overflow: 'overlay',
    maxHeight: 200,
    scrollbarWidth: 'thin',
    padding: 0,
  }),
};



export const customStyletrue = {
  option: (provided: any) => ({
    ...provided,
    fontSize: 14,
  }),
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    minHeight: '30px',
    height: '30px',
   
    boxShadow: state.isFocused ? null : null,
    boxSizing: 'border-box',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: '30px',
    padding: '0 8px',
    fontSize: 14,
    color: GARY_1,
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0px',
    fontSize: 14,
    fontFamily: `'Roboto', sans-serif`,
    boxSizing: 'border-box',
    
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: '30px',
    cursor: 'pointer',
    boxSizing: 'border-box',
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
  }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: GARY_4,
      fontSize: 12,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
  },
  menu: (provided: any) => ({
    ...provided,
    margin: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxSizing: 'border-box',
  }),
  menuList: (provided: any) => ({
    ...provided,
    overflow: 'overlay',
    maxHeight: 200,
    scrollbarWidth: 'thin',
    padding: 0,
  }),
};


export const customStylechanges = {
  option: (provided: any) => ({
    ...provided,
    fontSize: 13,
  }),
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    minHeight: '40px',
    height: '40px',
   
    boxShadow: state.isFocused ? null : null,
    boxSizing: 'border-box',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: '40px',
    padding: '0 8px',
    fontSize: 13,
    color: GARY_1,
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0px',
    fontSize: 13,
    fontFamily: `'Roboto', sans-serif`,
    boxSizing: 'border-box',
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: '40px',
    cursor: 'pointer',
    boxSizing: 'border-box',
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
  }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: GARY_4,
      fontSize: 12,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
  },
  menu: (provided: any) => ({
    ...provided,
    margin: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxSizing: 'border-box',
  }),
  menuList: (provided: any) => ({
    ...provided,
    overflow: 'overlay',
    maxHeight: 200,
    scrollbarWidth: 'thin',
    padding: 0,
  }),
};

export const customStylechanges1 ={
  option: (provided: any) => ({
    ...provided,
    fontSize: 12,
  }),
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    minHeight: '30px',
    height: '30px',
    boxShadow: state.isFocused ? null : null,
    backgroundColor:GARY_9,
    margin: '0px',
    borderColor:GARY_9,
    border: '0px',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: '30px',
    margin: '0px',
    fontSize: 12,
    boxColor:GARY_9,
    backgroundColor:GARY_9,
    borderColor:GARY_9,
    color:PRIMARY,
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0px',
    fontSize: 12,
    fontFamily: `'Roboto', sans-serif`,
    borderColor:PRIMARY,
    border: '0px',
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: '30px',
    cursor: 'pointer',
    borderColor:GARY_9,  
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
    borderColor:GARY_9,
  }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: GARY_4,
      fontSize: 13,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      borderColor:GARY_9,
      border: '0px',
    };
  },
  menu: (provided: any) => ({
    ...provided,
    margin: 0,
    borderColor:GARY_9,
  }),
  menuList: (provided: any) => ({
    ...provided,
    overflow: 'overlay',
    maxHeight: 200,
    scrollbarWidth: 'thin',
    padding: 0,
    borderColor:PRIMARY,
  }),
  hover: (provided: any) => ({
    color:PRIMARY,
    borderColor:PRIMARY,
  }),
  selected: (provided: any) => ({
    color:PRIMARY,
    borderColor:PRIMARY,
  }),
};

export const customStylechanges2 ={
  option: (provided: any) => ({
    ...provided,
    fontSize: 12,
  }),
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    minHeight: '30px',
    height: '0px',
    boxShadow: state.isFocused ? null : null,
    margin: '0px',
    borderColor:GARY_9,
    border: '0px',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: '30px',
    margin: '0px',
    fontSize: 12,
    boxColor:GARY_9,
    backgroundColor:WHITE,
    borderColor:GARY_9,
    color:PRIMARY,
    top: -1,
    padding:"2px 4px",
  }),
  singleValue:() => ({
    color: PRIMARY,
    position: "relative",
    bottom:15,
    fontSize: 13,
    fontWeight: "bold"
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0px',
    fontSize: 12,
    fontFamily: `'Roboto', sans-serif`,
    borderColor:PRIMARY,
    border: '0px',
    top:5,
    position: "relative",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: '30px',
    cursor: 'pointer',
    borderColor:GARY_9,
    position:"relative",
    top:2,
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor:WHITE,
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
    borderColor:GARY_9,
  }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: GARY_4,
      fontSize: 12,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      borderColor:GARY_9,
      border: '0px',
    };
  },
  menu: (provided: any) => ({
    ...provided,
    margin: 0,
    borderColor:GARY_9,
    color:"#581845"
  }),
  menuList: (provided: any) => ({
    ...provided,
    overflow: 'overlay',
    maxHeight: 200,
    scrollbarWidth: 'thin',
    padding: 0,
    color:  BLACK,
    borderColor:PRIMARY,
  
  }),
  hover: (provided: any) => ({
    color:PRIMARY,
    borderColor:PRIMARY,
  }),
  selected: (provided: any) => ({
    color:"green",
    borderColor:PRIMARY,
    backgroundColor:PRIMARY,
  }),
  focus: (provided: any) => ({
    color:PRIMARY,
    borderColor:GARY_9,
  }),
};