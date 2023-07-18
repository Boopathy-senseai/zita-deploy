const defaultProps = {
    fill: '#currentColor',
    width: 16,
    height: 16,
    // className: '',
    // up: false,
  };
  
//   const SvgClock = ({
//     fill,
//     width,
//     height,
//     className,
//     up,
//   }: typeof defaultProps) => {
//     return !up ? (
//       <svg
//         className={className}
//         xmlns="http://www.w3.org/2000/svg"
//         width={width}
//         fill={fill}
//         height={height}
//         viewBox="0 0 16 16"
//       >
//         <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
//       </svg>
//     ) : (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width={width}
//         height={height}
//         viewBox="0 0 16 16"
//         fill={fill}
//       >
//          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
//       </svg>
//     );
//   };


// //   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
// //   <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
// //   <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
// // </svg>
  
//   SvgClock.defaultProps = defaultProps;
  
//   export default SvgClock;

const SvgClock = ({ fill, width, height }: typeof defaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    className="clock_svg__bi clock_svg__bi-clock"
  >
    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
  </svg>
);
SvgClock.defaultProps = defaultProps;
export default SvgClock;
  