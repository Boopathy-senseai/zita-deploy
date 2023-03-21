/* eslint max-len: ["error", { "code": 400 }] */

const defaultProps = {
  fill: '#979797',
  width: 30,
  height: 18,
};
const SvgSwitchOff = ({ fill, width, height }: typeof defaultProps) => (
  <svg
    width={30}
    height={18 }
    viewBox="0 0 30 18"
  >
    <defs>
      <circle id="switch-off_svg__b" cx={9} cy={9} r={7} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <rect width={width} height={height} fill={fill}  rx={9} />
      <use fill="#FFF" xlinkHref="#switch-off_svg__b" />
      <use fill="#FFF" xlinkHref="#switch-off_svg__b" />
    </g>
  </svg>
);

SvgSwitchOff.defaultProps = defaultProps;
export default SvgSwitchOff;
