const defaultProps = {
    fill: '#888888',
    width: 16,
    height: 16,
  };
  
  const SvgCloseSmal = ({ width, height, fill }: typeof defaultProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        style={{ cursor: 'pointer' }}
      >
        <path
          d="M8 8l8 8m0-8l-8 8"
          stroke={fill}
          strokeWidth={2}
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  SvgCloseSmal.defaultProps = defaultProps;
  
  export default SvgCloseSmal;
  