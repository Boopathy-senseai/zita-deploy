/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#ffc203',
  width: 24,
  height: 24,
};

const SvgDashboard = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ cursor: 'pointer' }}
    >
      <path
        fill="#581845"
        d="M8.47 0H16v5.647H8.47V0Zm0 16V6.588H16V16H8.47ZM0 16v-5.647h7.53V16H0Zm0-6.588V0h7.53v9.412H0ZM.941.942V8.47h5.647V.94H.941Zm8.47 0v3.764h5.648V.94H9.412Zm0 6.587v7.53h5.648v-7.53H9.412Zm-8.47 3.765v3.765h5.647v-3.765H.941Z"
      />
    </svg>
  );
};
SvgDashboard.defaultProps = defaultProps;

export default SvgDashboard;
