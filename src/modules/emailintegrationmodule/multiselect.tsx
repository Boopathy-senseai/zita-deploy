import React, { useState, useEffect } from 'react';
import Select, { StylesConfig } from 'react-select';

type Props = {
  options?: any;
  onChange?: (arg: any) => void;
  value?: any;
};
const customStyles: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    border: state.isFocused ? '1px solid white' : '1px solid white',
    boxShadow: state.isFocused ? '0px 0px 6px white' : '1px solid white',
    '&:hover': {
      border: '1px solid white',
      boxShadow: '0px 0px 6px white',
    },
    '&:focus': {
      border: '1px solid white',
      boxShadow: '0px 0px 6px white',
    },
    '&: css-319lph-ValueContainer':{
      padding: "unset"

    },
    minHeight: "10px",
    cursor: 'text',
    // width: '480px',
    flex: 1
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#333333"
        : isFocused
        ? "#EEE8EC"
        : undefined,
      color: isSelected
        ? '#ccc'
        : "#333333",
      cursor: isDisabled ? 'not-allowed' : 'default',
      zIndex: 199999999999999,
    

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? "red"
            : "#EEE8EC"
          : undefined,
      },
    };
  },

  multiValueLabel: (styles, { data }) => ({
    ...styles,
    padding: '1px',
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: '#eee8ec',
      borderRadius: '24px',
      padding: '0.1px',
      fontSize: '14px',
      '&: css-12jo7m5': {
        padding: '1px important',
      },
    };
  },
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: '#333333',
    ':hover': {
      color: '#333333',
    },
  }),
};

const multiselect = ({ options, onChange, value }: Props) => {
  return (
    <Select
      isMulti
      placeholder={''}
      isClearable={false}
      styles={customStyles}
      options={options}
      onChange={onChange}
      value={value}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      className="basic-multi-select"
      classNamePrefix="select"
    
    />
  );
};

export default multiselect;
