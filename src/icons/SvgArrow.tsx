import * as React from 'react';
const SvgArrowDown = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={6}
    fill="none"
    viewBox='0 0 9 6'
    {...props}
  >
    <path
      fill={props.fill || "#581845"}
      d="m.984 0 3.202 3.195L7.39 0l.983.984L4.186 5.17 0 .984.984 0Z"
    />
  </svg>
);
export default SvgArrowDown;