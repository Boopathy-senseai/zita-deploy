/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#ffffff',
  width: 22,
  height: 22,
};

const SvgMail = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />{' '}
    </svg>
  );
};
SvgMail.defaultProps = defaultProps;

export default SvgMail;
