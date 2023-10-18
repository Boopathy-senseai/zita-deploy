/* eslint max-len: ["error", { "code": 400 }] */

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#D7C7D2',
  width: 22,
  height: 22,
  className: '',
};
const SvgRadioWithOutOutLine = ({
  fill,
  width,
  height,
  className,
}: typeof defaultProps) => (
  <svg
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    className={className}
  >
    <g data-name="Layer 2">
      <path
        d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm0-18a8 8 0 1 0 8 8 8 8 0 0 0-8-8z"
        data-name="radio-button-off"
      />
    </g>
  </svg>
);

SvgRadioWithOutOutLine.defaultProps = defaultProps;

export default SvgRadioWithOutOutLine;
