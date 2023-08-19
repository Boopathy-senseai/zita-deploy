import * as React from 'react';
const defaultProps = {
  fill: 'none',
  width: 22,
  height: 22,
};

const SvgLocationicon = ({ width, height, fill }: typeof defaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 12 16" 
    
  >
    <path
      fill={fill}
      d="M8 2.259a4.663 4.663 0 0 0-4.667 4.666c0 3.5 4.667 8.667 4.667 8.667s4.667-5.167 4.667-8.667A4.663 4.663 0 0 0 8 2.26ZM4.667 6.925a3.335 3.335 0 0 1 6.667 0c0 1.92-1.92 4.794-3.334 6.587-1.386-1.78-3.333-4.687-3.333-6.587Z"
    />
    <path
     fill={fill}
      d="M8 8.592A1.667 1.667 0 1 0 8 5.26a1.667 1.667 0 0 0 0 3.333Z"
    />
  </svg>
);
export default SvgLocationicon;