/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: 'red',
  width: 24,
  height: 24,
  text: 'AB',
};

const SvgRoundInsideText = ({}: typeof defaultProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5">
      <defs>
        <clipPath id="circle_svg__a" clipPathUnits="userSpaceOnUse">
          <path d="M0 38h38V0H0v38Z" />
        </clipPath>
      </defs>
      <g
        clipPath="url(#circle_svg__a)"
        transform="matrix(1.25 0 0 -1.25 0 47.5)"
      >
        <path
          fill="#55acee"
          d="M36 19c0-9.389-7.611-17-17-17S2 9.611 2 19s7.611 17 17 17 17-7.611 17-17"
        />
      </g>
    </svg>
  );
};
SvgRoundInsideText.defaultProps = defaultProps;

export default SvgRoundInsideText;
