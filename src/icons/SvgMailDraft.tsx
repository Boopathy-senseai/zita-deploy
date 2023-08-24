import * as React from 'react';
const SvgDraft = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={14}
    fill="none"
    viewBox='0 0 10.67 13.33'
    {...props}
  >
    <path
      fill={props.fill}
      d="M1.333 13.333c-.366 0-.68-.13-.942-.392A1.281 1.281 0 0 1 
      0 12V1.333C0 .967.13.653.392.391.653.13.967 0 1.333 0h5.334l4 
      4v8c0 .367-.131.68-.392.942a1.281 1.281 0 0 1-.942.391h-8ZM6 4.667h3.333L6 1.333v3.334Z"
    />
  </svg>
);
export default SvgDraft;
