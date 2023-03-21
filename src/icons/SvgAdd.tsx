const defaultProps = {
  fill: '#979797',
  width: 24,
  height: 24,
};

const SvgAdd = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
    </svg>
  );
};
SvgAdd.defaultProps = defaultProps;

export default SvgAdd;
