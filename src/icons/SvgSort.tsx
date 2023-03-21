/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#581845',
  width: 24,
  height: 24,
};

const SvgSort = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M12 0l8 10h-16l8-10zm8 14h-16l8 10 8-10z" />
    </svg>
  );
};
SvgSort.defaultProps = defaultProps;

export default SvgSort;
