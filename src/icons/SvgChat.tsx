/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#979797',
  width: 24,
  height: 24,
};

const SvgChat = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
    >
      <path d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-6-6h-9.667l-5.333 4v-4h-3v-14.001h18v14.001zm-9-4.084h-5v1.084h5v-1.084zm5-2.916h-10v1h10v-1zm0-3h-10v1h10v-1z" />
    </svg>
  );
};
SvgChat.defaultProps = defaultProps;

export default SvgChat;
