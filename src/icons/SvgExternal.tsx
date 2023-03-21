/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#1890ff',
  width: 22,
  height: 22,
};

const SvgExternal = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />{' '}
    </svg>
  );
};
SvgExternal.defaultProps = defaultProps;

export default SvgExternal;
