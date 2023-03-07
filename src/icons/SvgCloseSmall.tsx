/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#424242',
  width: 24,
  height: 24,
};

const SvgCloseSmall = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M8 8l8 8m0-8l-8 8"
        stroke={fill}
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
SvgCloseSmall.defaultProps = defaultProps;

export default SvgCloseSmall;
