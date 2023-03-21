/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#581845',
  width: 24,
  height: 24,
  className: '',
  onClick: () => {},
};

const SvgDownload = ({
  width,
  height,
  fill,
  className,
  onClick,
}: typeof defaultProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      className={className}
      onClick={onClick}
    >
      <path
        d="M0 12v12h24V0H0v12zm13-4.5V12h2.4l-1.7 1.7-1.7 1.7-1.7-1.7L8.6 12H11V3h2v4.5z"
        fill="transparent"
      />
      <path d="M10 6.5V11H5.5l3.3 3.2 3.2 3.3 3.2-3.3 3.3-3.2H14V2h-4v4.5zM2 21v1h20v-2H2v1z" />
    </svg>
  );
};
SvgDownload.defaultProps = defaultProps;

export default SvgDownload;
