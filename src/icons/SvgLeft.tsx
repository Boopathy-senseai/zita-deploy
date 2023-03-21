/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#424242',
  width: 13,
  height: 13,
};

const SvgLeft = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  );
};
SvgLeft.defaultProps = defaultProps;

export default SvgLeft;
