// const SvgForward = (props) => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={14}
//       height={14}
//       fill="none"
//       {...props}
//     >
//       <g clipPath="url(#forward_svg__a)">
//         <mask
//           id="forward_svg__b"
//           width={15}
//           height={14}
//           x={-1}
//           y={0}
//           maskUnits="userSpaceOnUse"
//           style={{
//             maskType: 'luminance',
//           }}
//         >
//           <path fill="#fff" d="M14 0v14H-.778V0H14Z" />
//         </mask>
//         <g mask="url(#forward_svg__b)">
//           <path
//             fill="#581845"
//             d="M7.27.01S0-.5 0 5.559c0 5.52 7.27 6.324 7.27 6.324v2.116L14 9.928 7.27
//             5.94v2.208S2.705 7.17 2.705 4.355c-.006-.548.11-1.091.338-1.595.229-.503.566-.956.99-1.33.425-.374.928-.661 1.476-.842a4.43 4.43
//             0 0 1 1.71-.21L7.27.01Z"
//           />
//         </g>
//       </g>
//       <defs>
//         <clipPath id="forward_svg__a">
//           <path fill="#fff" d="M0 0h14v14H0z" />
//         </clipPath>
//       </defs>
//     </svg>
//   );
//   export default SvgForward;

import * as React from 'react';
const SvgForward = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="#581845"
    stroke="#581845"
    viewBox="0 0 1920 1920"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="m1246.246 64-90.496 90.496 477.952 477.952h-590.848C467.878 632.448.038 1100.416.038 1675.392v109.056h128v-109.056c0-504.576 410.368-914.944 914.816-914.944h590.848l-477.952 478.08 90.496 90.496 632.448-632.576L1246.246 64Z"
    />
  </svg>
);
export default SvgForward;
