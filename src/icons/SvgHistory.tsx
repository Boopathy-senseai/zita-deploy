import * as React from 'react';

const defaultProps = {
    fill: '#ffffff',
    // width: 22,
    // height: 22,
  };
  
  const SvgHistory = ({ fill }: typeof defaultProps) => {
    return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={13}
    fill={fill}
    
  >
    <path
      d="M7.84 1a6.006 6.006 0 0 0-6.173 6H.473a.33.33 0 0 0-.233.567L2.1 9.434a.33.33 0 0 0 .473 0l1.86-1.867A.333.333 0 0 0 4.193 7H3c0-2.6 2.12-4.7 4.733-4.666 2.48.033 4.567 2.12 4.6 4.6a4.67 4.67 0 0 1-4.666 4.733 4.597 4.597 0 0 1-2.854-.987.662.662 0 0 0-.88.054c-.28.28-.26.753.054.993A5.905 5.905 0 0 0 7.667 13a6.006 6.006 0 0 0 6-6.173C13.58 3.7 10.967 1.087 7.84 1ZM7.5 4.334c-.273 0-.5.226-.5.5v2.453c0 .233.127.453.327.573l2.08 1.234c.24.14.546.06.686-.174a.505.505 0 0 0-.173-.686L8 7.094V4.827a.502.502 0 0 0-.5-.493Z"
    />
  </svg>
);
};
SvgHistory.defaultProps = defaultProps;

export default SvgHistory;