import * as React from 'react';
const SvgNotselected = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <circle
      cx={8}
      cy={8}
      r={7.25}
      fill="#fff"
      stroke="#581845"
      strokeWidth={1.5}
    />
  </svg>
);
export default SvgNotselected;