/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#979797',
  width: 24,
  height: 24,
};

const SvgCompany = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"

    >
      <path d="M16 7h8v17h-24v-24h16v7zm-9 12h-2v4h2v-4zm4 0h-2v4h2v-4zm7 0h-2v4h2v-4zm4-10h-6v8h4v5h2v-13zm-8-7h-12v20h1v-5h10v5h1v-20zm-8 13h-2v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2zm8-2v2h-2v-2h2zm-14-1h-2v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2zm6-2h2v2h-2v-2zm-12-1h-2v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2zm-6-3h-2v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2z" />
    </svg>
  );
};
SvgCompany.defaultProps = defaultProps;

export default SvgCompany;
