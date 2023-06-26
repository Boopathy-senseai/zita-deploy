import * as React from 'react';
const SvgFilePlus = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    viewBox='0 0 10 10'
    {...props}
  >
    <path
      fill="#581845"
      d="M10 7.619H8.421V6.19H7.368V7.62H5.79v.952h1.58V10H8.42V8.571H10M1.053 
      0C.773 0 .506.1.308.279A.909.909 0 0 0 0 .952v7.62c0 .528.468.952 
      1.053.952h4.11a2.7 2.7 0 0 1-.384-.953H1.053V.952h3.684v2.381h2.631v1.943c.174-.024.353-.038.527-.038.179
       0 .352.014.526.038V2.857L5.263 0M2.105 4.762v.952h4.21v-.952m-4.21 1.905v.952h2.632v-.952H2.105Z"
    />
  </svg>
);
export default SvgFilePlus;
