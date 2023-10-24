import * as React from 'react';
const SvgUserRating = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={16}
    fill="none"
    viewBox='0 0 14 16'
    {...props}
  >
    <path
      fill="#581845"
      d="M6.001 9.335v1.333a4 4 0 0 0-4 4H.668a5.333 5.333 0 0 1 5.333-5.333Zm0-.667c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4Zm0-1.333a2.666 2.666 0 1 0 0-5.334 2.666 2.666 0 1 0 0 5.334Zm4 7-1.959 1.03.374-2.182-1.585-1.545 2.191-.318.98-1.985.98 1.984 2.19.319-1.585 1.545.373 2.182-1.959-1.03Z"
    />
  </svg>
);
export default SvgUserRating;