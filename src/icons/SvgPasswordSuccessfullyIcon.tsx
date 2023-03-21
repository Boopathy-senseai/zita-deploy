/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#34cc65',
  width: 24,
  height: 24,
};

const SvgPasswordSuccessfullyIcon = ({
  width,
  height,
  fill,
}: typeof defaultProps) => {
  return (
    <svg
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4 17H8v-6h8v6zm-6-6V9c0-1.104.897-2 2-2s2 .896 2 2v2h1V9a3 3 0 0 0-6 0v2h1z" />{' '}
    </svg>
  );
};
SvgPasswordSuccessfullyIcon.defaultProps = defaultProps;

export default SvgPasswordSuccessfullyIcon;
