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
const defaultProps = {
  fill:"none",
  width: 10,
  height: 11,
};

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
// const SvgTick = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={16}
//     height={16}
//     fill="none"
//     {...props}
//   >
//     <circle cx={8} cy={8} r={7.5} fill="#fff" stroke="#00BE4B" />
//     <path
//       fill="#00BE4B"
//       fillRule="evenodd"
//       d="M11 5.622 7.64 11 5 8.184l.498-.765 2.03 2.164L10.393 5l.607.622Z"
//       clipRule="evenodd"
//     />
//   </svg>
// );
// export default SvgTick;
     
const SvgTick =(props)=> (   
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 9 10"
    fill="none"
    {...props}
  >
    <g clipPath="url(#svgfilltick_svg__a)">
      <path
        fill="#00BE4B"
        d="M5 .852A4.168 4.168 0 0 0 .833 5.018C.833 7.318 2.7 9.185 5 9.185s4.166-1.867 
        4.166-4.167S7.3.852 5 .852Zm-.834 6.25L2.083 5.018l.588-.587 1.495 1.491L7.33 2.76l.587.592-3.75 3.75Z"
      />
    </g>
    <defs>
      <clipPath id="svgfilltick_svg__a">
        <path fill="#fff" d="M0 .019h10v10H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTick;
