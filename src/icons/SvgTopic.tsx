/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#ffffff',
  width: 22,
  height: 22,
};

const SvgTopic = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z" />
    </svg>
  );
};
SvgTopic.defaultProps = defaultProps;

export default SvgTopic;
