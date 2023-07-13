//import * as React from 'react';
const defaultProps = {
  fill: '#34cc65',
  width: 22,
  height: 22,
};

const SvgImport = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
    >
      <path
        stroke="#581845"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="M3.824 9.646V2.91a1.6 1.6 0 0 1 .55-1.19 2 2 0 0 1 
        1.332-.494h6.588L17 5.435V14.7a1.6 1.6 0 0 1-.551 1.19 2 
        2 0 0 1-1.331.494H9.94M1 14.699h6.588m0 0-2.823-2.527M7.588 
        14.7l-2.823 2.526"
      />
    </svg>
  );
};
SvgImport.defaultProps = defaultProps;
export default SvgImport;
