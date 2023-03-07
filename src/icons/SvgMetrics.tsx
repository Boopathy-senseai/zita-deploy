/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#1890ff',
  width: 24,
  height: 24,
};

const SvgMetrics = ({ width, height, fill }: typeof defaultProps) => {
  return (
   <svg xmlns="http://www.w3.org/2000/svg" fill={fill}
width={width}
height={height} >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
  );
};
SvgMetrics.defaultProps = defaultProps;

export default SvgMetrics;
