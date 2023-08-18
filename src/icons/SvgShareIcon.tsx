/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
    fill: '#581845',
    width: 17,
    height: 17,
  };
const SvgShareIcon = ({ width, height, fill }: typeof defaultProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill ={fill} viewBox="0 0 24 24" style={{zIndex:-3}}
  >
    <path d="M21 13v10H0V4h12v2H2v15h17v-8h2zm3-12H13.012l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07L24 12V1z" />
  </svg>
);
SvgShareIcon.defaultProps = defaultProps;

export default SvgShareIcon;