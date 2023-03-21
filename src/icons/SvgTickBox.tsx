/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#b3b3b3',
  width: 18,
  height: 18,
  className: '',
};

const SvgTickBox = ({
  width,
  height,
  fill,
  className,
}: typeof defaultProps) => {
  return (
    <svg
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M19 0h-14c-2.762 0-5 2.239-5 5v14c0 2.761 2.238 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-8.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />{' '}
    </svg>
  );
};
SvgTickBox.defaultProps = defaultProps;

export default SvgTickBox;
