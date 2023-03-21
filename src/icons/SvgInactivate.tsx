/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#f94949',
  width: 14,
  height: 14,
};

const SvgInactivate = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      height={height}
      width={width}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path d="M13.93 27.19H5.5a1 1 0 0 1 0-2h7.74A9.87 9.87 0 0 1 13 23a9.63 9.63 0 0 1 .32-2.48H5.5a1 1 0 0 1 0-2h8.57A10 10 0 0 1 19 13.85H5.5a1 1 0 0 1 0-2h14a1 1 0 0 1 1 1 1 1 0 0 1-.14.51A9.62 9.62 0 0 1 23 13c.34 0 .67 0 1 .05V4a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v24a3 3 0 0 0 3 3h13a10 10 0 0 1-3.07-3.81Zm-8.43-22h14a1 1 0 0 1 0 2h-14a1 1 0 0 1 0-2Z" />
      <path d="M23 15a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm2.71 9.29a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0L23 24.41l-1.29 1.3a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l1.3-1.29-1.3-1.29a1 1 0 0 1 1.42-1.42l1.29 1.3 1.29-1.3a1 1 0 0 1 1.42 1.42L24.41 23Z" />
    </svg>
  );
};
SvgInactivate.defaultProps = defaultProps;

export default SvgInactivate;
