import * as React from 'react';     
const defaultProps = {
  fill: '#581845',
  width: 40,
  height: 20,
};

const SvgJobtitle = ({ width, height, fill }: typeof defaultProps) => (      
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    
    width={width}
    height={height} 
    viewBox="0 0 10 10"
  >
    <path
   
      fill="#581845"
      d="M5 0c1.381 0 2.5.993 2.5 2.218 0 1.226-1.119 2.219-2.5 2.219s-2.5-.993-2.5-2.219C2.5.993 3.619 
      0 5 0Zm2.5 5.845c0 .588-.175 1.958-1.369 3.489l-.506-2.68.588-1.042A12.148 12.148 
      0 0 0 5 5.546c-.419 0-.825.027-1.212.066l.587 1.043-.506 2.679C2.675 7.803 2.5 6.434 2.5 5.845 
      1.006 6.233 0 6.932 0 7.765v2.217h10V7.764c0-.832-1-1.53-2.5-1.919Z"
    />
  </svg>
);
export default SvgJobtitle;