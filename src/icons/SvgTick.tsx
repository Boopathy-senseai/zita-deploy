/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#581845',
  width: 22,
  height: 22,
};

const SvgTick = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
    </svg>
  );
};
SvgTick.defaultProps = defaultProps;

export default SvgTick;
