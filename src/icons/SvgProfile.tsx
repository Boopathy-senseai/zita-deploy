//import * as React from 'react';

const defaultProps = {
  fill: '#581845',
  width: 24,
  height: 24,
};

const SvgProfile = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
    >
      <path
        fill="#581845"
        d="M4 4.98a1.613 1.613 0 1 1-.006-3.227A1.613 1.613 0 0 1 4 4.979Zm0-2.94a1.325 1.325 0 1 0-.006 2.65A1.325 1.325 0 0 0 4 2.04Z"
      />
    </svg>
  );
};
export default SvgProfile;
