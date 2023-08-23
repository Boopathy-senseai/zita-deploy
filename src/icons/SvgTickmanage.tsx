/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
    fill: '#34cc65',
    height: 19,
    width: 19,
    className: '',
  };
  
  const SvgTickmanage = ({
    width,
    height,
    fill,
    className,
  }: typeof defaultProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill={fill}
        className={className}
      >
        <path d="M15.48 28.62a1 1 0 0 1-.71-.29l-7.54-7.54a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l6.83 6.83L32.12 9.57a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.42L16.18 28.33a1 1 0 0 1-.7.29Z" />{' '}
      </svg>
    );
  };
  SvgTickmanage.defaultProps = defaultProps;
  
  export default SvgTickmanage;
  