/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  width: 18,
  height: 18,
  className: '',
  fill: '#b3b3b3',
};
function SvgCloseBox({ width, height, className, fill }: typeof defaultProps) {
  return (
    <svg
      style={{ borderRadius: 4 }}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M0 0v24h24v-24h-24zm16.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z" />
    </svg>
  );
}

SvgCloseBox.defaultProps = defaultProps;
export default SvgCloseBox;
