/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#34cc65',
  width: 14,
  height: 14,
};

const SvgDone = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
    </svg>
  );
};
SvgDone.defaultProps = defaultProps;

export default SvgDone;
