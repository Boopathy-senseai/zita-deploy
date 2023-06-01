import React, { useState, useEffect } from 'react';
import Select from 'react-select';

type Props = {
  options?: any;
  onChange?: (arg: any) => void;
  value?: any;
};

const multiselect = ({ options, onChange, value }: Props) => {
  return (
    <Select
      isMulti
      placeholder={''}
      isClearable={false}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: 'none',
          cursor: 'text',
          width: '450px',
        }),
      }}
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
