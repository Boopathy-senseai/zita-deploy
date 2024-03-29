/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#000',
  width: 24,
  height: 24,
};

const SvgInfinity = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
    >
      <path d="M18.572 6c-6.018 0-8.414 10-13.143 10-2.114 0-3.479-1.578-3.479-4s1.366-4 3.479-4c1.666 0 2.862 1.069 4.017 2.395l1.244-1.561c-1.499-1.533-3.05-2.834-5.261-2.834-3.197 0-5.429 2.455-5.429 6s2.232 6 5.429 6c6.003 0 8.407-10 13.143-10 2.113 0 3.479 1.578 3.479 4s-1.365 4-3.479 4c-1.664 0-2.86-1.068-4.015-2.392l-1.244 1.561c1.499 1.531 3.05 2.831 5.259 2.831 3.197 0 5.428-2.455 5.428-6s-2.231-6-5.428-6z" />
    </svg>
  );
};
SvgInfinity.defaultProps = defaultProps;

export default SvgInfinity;
