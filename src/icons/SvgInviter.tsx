const defaultProps = {
  fill: 'none',
  width: 20,
  height: 20,
  color: 'theme',
  className: '',
  onClick: () => {},
};

const SvgInviter = ({
  width,
  height,
  fill,
  color,
  className,
  onClick
}: typeof defaultProps) => {
  return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill={fill}
          viewBox="0 0 20 20"
        >
          <path
            stroke="#581845"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.762}
            d="M12.75 3.35h-9.4A2.35 2.35 0 0 0 1 5.7v8.225a2.35 2.35 0 0 0 2.35 2.35H15.1a2.35 2.35 0 0 0 2.35-2.35V8.05"
          />
          <path
            stroke="#581845"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.762}
            d="M3.35 6.875 9.225 10.4 15.1 6.875M17.45 1v4.7M15.1 3.35h4.7"
          />
        </svg>
  );
};
SvgInviter.defaultProps = defaultProps;

export default SvgInviter;
