/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#34cc65',
  width: 14,
  height: 14,
};

const SvgLinkedIn = ({ width, height, fill }: typeof defaultProps) => {
  return (
      <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 3 48 48"
    width={width}
    height={height}
    
  >
    <path fill={fill} d="M24 4a20 20 0 1 0 0 40 20 20 0 1 0 0-40Z" />
    <path
      fill="#fff"
      d="M14 19h4v15h-4zm1.988-2h-.022C14.772 17 14 16.11 14 14.999c0-1.135.796-1.999 2.011-1.999 1.217 0 1.966.864 1.989 1.999C18 16.11 17.228 17 15.988 17zM35 24.5a5.5 5.5 0 0 0-5.5-5.5 5.49 5.49 0 0 0-4.5 2.344V19h-4v15h4v-8a3 3 0 1 1 6 0v8h4v-9.5z"
    />
  </svg>
  );
};
SvgLinkedIn.defaultProps = defaultProps;

export default SvgLinkedIn;
