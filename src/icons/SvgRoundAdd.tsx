/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#1890ff',
  width: 20,
  height: 20,
};

const SvgRoundAdd = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
    </svg>
  );
};
SvgRoundAdd.defaultProps = defaultProps;

export default SvgRoundAdd;
