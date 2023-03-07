/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#f94949',
  width: 14,
  height: 14,
};

const SvgBlock = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill={fill}
    >
      <path d="M21.3 3.7C15.5 5.7 7.7 13 4.6 19.2 1 26.4.9 37.2 4.4 44.6c6.7 14.3 22.8 21 38.2 15.7 6.7-2.3 15.4-11 17.7-17.7 2.2-6.3 2.2-14.9 0-21.2C58 14.7 49.3 6 42.6 3.7c-6-2.1-15.6-2.1-21.3 0zm21.3 6c1.8.9 3.4 2.2 3.4 2.8 0 .6-7.4 8.4-16.5 17.4-13.8 13.7-16.7 16.2-17.9 15.2-3.9-3.3-5.1-17.2-2-23.3 3.3-6.7 9.9-12.1 16.9-13.9 4.1-1.1 11.9-.2 16.1 1.8zm12 12.5c2.4 5.4 2.4 15 0 19.8-2.5 4.9-7.4 9.8-12.1 12.3-7 3.7-21.2 2.3-24-2.4C17.7 50.8 49.7 18 51.6 18c.6 0 2 1.9 3 4.2z" />
    </svg>
  );
};
SvgBlock.defaultProps = defaultProps;

export default SvgBlock;
