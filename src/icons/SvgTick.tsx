// /* eslint max-len: ["error", { "code": 2000 }] */
// const defaultProps = {
//   fill: '#581845',
//   width: 22,
//   height: 22,
// };

// const SvgTick = ({ width, height, fill }: typeof defaultProps) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={width}
//       height={height}
//       viewBox="0 0 24 24"
//       fill={fill}
//     >
//       <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
//     </svg>
//   );
// };
// SvgTick.defaultProps = defaultProps;

// export default SvgTick;
// const defaultProps = {
//   fill: '#581845',
//   width: 22,
//   height: 22,
// };

// const SvgTick = ({ width, height, fill }: typeof defaultProps) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={width}
//       height={height}
//       viewBox="0 0 24 24"
//       fill={fill}
//     >
//       <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
//     </svg>
//   );
// };
// SvgTick.defaultProps = defaultProps;

// export default SvgTick;
import * as React from 'react';
const SvgTick = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
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
