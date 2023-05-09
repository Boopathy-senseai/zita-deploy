//import * as React from 'react';

const defaultProps = {
  fill: '#979797',
  width: 24,
  height: 24,
};

const SvgOpen = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
    >
      <path fill="#581845" d="M.94 0 0 .94 3.053 4 0 7.06.94 8l4-4-4-4Z" />
      <path
        fill="#581845"
        d="m5.333 0-.94.94L7.447 4 4.393 7.06l.94.94 4-4-4-4Z"
      />
    </svg>
  );
};
SvgOpen.defaultProps = defaultProps;

export default SvgOpen;
