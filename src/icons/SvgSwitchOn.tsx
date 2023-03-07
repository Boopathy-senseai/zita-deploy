/* eslint max-len: ["error", { "code": 400 }] */

const defaultProps = {
  fill: '#581845',
  width: 30,
  height: 18,
  className: '',
};
const SvgSwitchOn = ({
  fill,
  width,
  height,
  className,
}: typeof defaultProps) => (
  <svg width={30} height={18} viewBox="0 0 30 18" className={className}>
    <defs>
      <circle id="switch-on_svg__b" cx={21} cy={9} r={7} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <rect width={width} height={height} fill={fill} rx={9} />
      <use fill="#FFF" xlinkHref="#switch-on_svg__b" />
      <use fill="#FFF" xlinkHref="#switch-on_svg__b" />
    </g>
  </svg>
);

SvgSwitchOn.defaultProps = defaultProps;
export default SvgSwitchOn;
