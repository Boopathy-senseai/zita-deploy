import * as React from 'react';
const SvgSelected = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#581845"
      d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 8 1.333ZM7 9.39l3.827-3.837a.666.666 0 0 1 1.021.85l-.077.093-4.299 4.309a.667.667 0 0 1-.85.079l-.094-.078-2.333-2.333a.667.667 0 0 1 .85-1.02l.094.076L7 9.389Z"
    />
  </svg>
);
export default SvgSelected;