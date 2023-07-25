const defaultProps = {
  fill: '#581845',
  width: 14,
  height: 14,
};

const SvgDot = ({ width, height, fill }: typeof defaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
  >
    <circle cx={5} cy={5} r={5} fill={fill} />
  </svg>
);
SvgDot.defaultProps = defaultProps;

export default SvgDot;