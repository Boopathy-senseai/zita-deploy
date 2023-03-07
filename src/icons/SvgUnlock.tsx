/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#581845',
  width: 24,
  height: 24,
};

const SvgUnlock = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        d="M12 1C9.129 1 6.719 3.047 6.125 5.79l1.953.425C8.48 4.355 10.07 3 12 3c2.277 0 4 1.723 4 4v1H6c-1.094 0-2 .906-2 2v10c0 1.094.906 2 2 2h12c1.094 0 2-.906 2-2V10c0-1.094-.906-2-2-2V7c0-3.324-2.676-6-6-6zm-6 9h12v10H6zm6 3c-1.102 0-2 .898-2 2 0 1.102.898 2 2 2 1.102 0 2-.898 2-2 0-1.102-.898-2-2-2zm0 0"
        fill={fill}
      />
    </svg>
  );
};
SvgUnlock.defaultProps = defaultProps;

export default SvgUnlock;
