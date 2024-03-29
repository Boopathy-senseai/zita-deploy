/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#424242',
  width: 18,
  height: 18,
};

const SvgBoxEdit = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
    >
      <path d="M8.424 12.282l4.402 4.399-5.826 1.319 1.424-5.718zm15.576-6.748l-9.689 9.804-4.536-4.536 9.689-9.802 4.536 4.534zm-6 8.916v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023z" />
    </svg>
  );
};
SvgBoxEdit.defaultProps = defaultProps;

export default SvgBoxEdit;
