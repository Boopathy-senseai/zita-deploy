// const SvgReply = (props) => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={14}
//       height={14}
//       fill="none"
//       {...props}
//     >
//       <g clipPath="url(#reply_svg__a)">
//         <mask
//           id="reply_svg__b"
//           width={14}
//           height={14}
//           x={0}
//           y={0}
//           maskUnits="userSpaceOnUse"
//           style={{
//             maskType: 'luminance',
//           }}
//         >
//           <path fill="#fff" d="M14 0v14H0V0h14Z" />
//         </mask>
//         <g mask="url(#reply_svg__b)">
//           <path
//             fill="#581845"
//             d="M6.733.01S14-.5 14 5.559c0 5.52-7.267 6.324-7.267 6.324v2.116l-6.735-4.07L6.733 5.94v2.208s4.563-.978 4.563-3.793C11.296 2.45 9.88.377 6.78.377L6.733.011Z"
//           />
//         </g>
//       </g>
//       <defs>
//         <clipPath id="reply_svg__a">
//           <path fill="#fff" d="M0 0h14v14H0z" />
//         </clipPath>
//       </defs>
//     </svg>
//   );
//   export default SvgReply;

import * as React from 'react';
const SvgReply = (props) => (
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
      d="M835.942 632.563H244.966l478.08-478.08-90.496-90.496L-.026 696.563 632.55 1329.14l90.496-90.496-478.08-478.08h590.976c504.448 0 914.816 410.368 914.816 914.816v109.184h128V1675.38c0-574.976-467.84-1042.816-1042.816-1042.816"
    />
  </svg>
);
export default SvgReply;
