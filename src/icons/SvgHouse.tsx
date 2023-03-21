/* eslint max-len: ["error", { "code": 2000 }] */

const defaultProps = {
  fill: '#581845',
  width: 24,
  height: 24,
};

const SvgHouse = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M21 22h2v2h-22v-2h2v-22h18v22zm-10-3h-2v4h2v-4zm4 0h-2v4h2v-4zm4-17h-14v20h2v-5h10v5h2v-20zm-12 11h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
    </svg>
  );
};
SvgHouse.defaultProps = defaultProps;

export default SvgHouse;
