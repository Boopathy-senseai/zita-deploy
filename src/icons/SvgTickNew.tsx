//import * as React from 'react';
const SvgTick = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <circle cx={8} cy={8} r={7.5} fill="#fff" stroke="#00BE4B" />
    <path
      fill="#00BE4B"
      fillRule="evenodd"
      d="M11 5.622 7.64 11 5 8.184l.498-.765 2.03 2.164L10.393 5l.607.622Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTick;
