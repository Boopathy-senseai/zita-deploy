//import * as React from 'react';
const defaultProps = {
  fill: '#34cc65',
  width: 22,
  height: 22,
};

const SvgReport = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
    >
      <path
        stroke="#581845"
        d="M6.333 17h5.334m-5.334 0v-4.444m0 4.444h-4.8A.533.533 0 0 1 1 
        16.467v-3.378a.533.533 0 0 1 .533-.533h4.8M11.667 17V6.333m0 
        10.667h4.8a.533.533 0 0 0 .533-.533V1.533A.533.533 
        0 0 0 16.467 1H12.2a.533.533 0 0 0-.533.533v4.8m-5.334 6.223v-5.69a.533.533 
        0 0 1 .534-.533h4.8"
      />
    </svg>
  );
};
SvgReport.defaultProps = defaultProps;
export default SvgReport;
