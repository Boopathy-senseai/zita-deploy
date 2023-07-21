/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#FCC203',
  width: 24,
  height: 24,
};

const SvgDuplicate = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
    >
      <path d="M18 6V0H0v18h6v6h18V6h-6zM6 16H2V2h14v4H6v10zm16 6H8V8h14v14zm-3-8h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z" />
    </svg>
  );
};
SvgDuplicate.defaultProps = defaultProps;

export default SvgDuplicate;
