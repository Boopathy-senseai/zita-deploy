const defaultProps = {
    fill: '#FFFFFF',
    height: 24,
    width: 24,
  };
  const SvgTick = ({ width, height, fill }: typeof defaultProps) => {
    return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M6 .621 2.64 5.996 0 3.18l.498-.764 2.03 2.163L5.393 
      0 6 .621Z"
      clipRule="evenodd"
    />
  </svg>
);
};

export default SvgTick;