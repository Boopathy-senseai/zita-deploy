/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  // fill: '#979797',
  fill: '#581845',
  width: 22,
  height: 27,
};

const SvgEdit = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 3 24 24"
      fill={fill}
    >
      <path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z" />
    </svg>
  );
};
SvgEdit.defaultProps = defaultProps;

export default SvgEdit;
