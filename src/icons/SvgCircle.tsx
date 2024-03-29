import * as React from 'react';
const SvgCircle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={800}
    height={800}
    fill="#EEE8EC"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M256 0C114.837 0 0 114.837 0 256s114.837 256 256 256 256-114.837 256-256S397.163 0 256 0z" />
  </svg>
);
export default SvgCircle;