import * as React from 'react';
const SvgCommunication = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox='0 0 16 16'
    {...props}
  >
    <g fill="#581845" clipPath="url(#vaadin_calendar-envelope_svg__a)">
      <path d="M3 0h1v2H3V0Zm6 0h1v2H9V0Z" />
      <path d="M13 7V1h-2v2H8V1H5v2H2V1H0v12h4v3h12V7h-3Zm-9 5H1V5h11v2H4v5Zm1-1.8 2.6 1.5L5 14.3v-4.1Zm.7 4.8 2.8-2.8 1.5.9 1.5-.8 2.8 2.8H5.7V15Zm9.3-.7-2.6-2.6 2.6-1.4v4Zm0-5.1-5 2.7L5 9V8h10v1.2Z" />
    </g>
    <defs>
      <clipPath id="vaadin_calendar-envelope_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCommunication;