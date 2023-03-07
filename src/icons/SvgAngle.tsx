const defaultProps = {
  fill: '#424242',
  width: 20,
  height: 20,
  className: '',
  up: false,
};

const SvgAngle = ({
  fill,
  width,
  height,
  className,
  up,
}: typeof defaultProps) => {
  return !up ? (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      fill={fill}
      height={height}
      viewBox="0 0 24 24"
    >
      <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
    </svg>
  );
};

SvgAngle.defaultProps = defaultProps;

export default SvgAngle;
