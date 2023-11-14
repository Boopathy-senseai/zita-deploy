import * as React from 'react';
const SvgAddquestion = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g fill="#581845" clipPath="url(#Group1_svg__a)">
      <path d="M8 16a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8ZM8 1.265A6.734 6.734 0 1 0 14.734 8 6.742 6.742 0 0 0 8 1.265Z" />
      <path d="M8.327 4.075h-.654a.286.286 0 0 0-.286.286v7.277c0 .158.128.286.286.286h.654a.286.286 0 0 0 .286-.286V4.361a.286.286 0 0 0-.286-.286Z" />
      <path d="M4.075 7.673v.654c0 .158.129.286.287.286h7.276a.286.286 0 0 0 .286-.286v-.654a.286.286 0 0 0-.286-.286H4.362a.286.286 0 0 0-.287.286Z" />
    </g>
    <defs>
      <clipPath id="Group1_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAddquestion;