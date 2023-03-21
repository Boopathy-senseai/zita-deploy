/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#000',
  width: 24,
  height: 24,
};
const SvgResetPasswordIcon = ({ fill, width, height }: typeof defaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
  >
    <path d="M23.621 9.012c.247.959.379 1.964.379 3C24 18.635 18.623 24 12 24S0 18.635 0 12.012c0-6.623 5.377-12 12-12 2.581 0 4.969.822 6.927 2.211L20.645 0l1.935 6.012H16l1.703-2.204A9.944 9.944 0 0 0 12 2.012c-5.52 0-10 4.481-10 10 0 5.52 4.48 10 10 10 5.519 0 10-4.48 10-10a10.01 10.01 0 0 0-.458-3h2.079zM16 17H8v-6h1V9a3.001 3.001 0 0 1 6 0v2h1v6zm-5-8v2h2V9a1 1 0 0 0-2 0z" />
  </svg>
);

SvgResetPasswordIcon.defaultProps = defaultProps;

export default SvgResetPasswordIcon;
