const defaultProps = {
  fill: '#1890ff',
  width: 16,
  height: 16,
};
const SvgPlusCircle = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 14 14"
    >
      <path
        fill="#581845"
        d="M7 .5A6.5 6.5 0 1 0 13.5 7 6.508 6.508 0 0 0 7 .5Zm2.5 7h-2v2a.5.5 0 1 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2a.5.5 0 1 1 1 0v2h2a.5.5 0 0 1 0 1Z"
      />
    </svg>
  );
};
SvgPlusCircle.defaultProps = defaultProps;

export default SvgPlusCircle;
