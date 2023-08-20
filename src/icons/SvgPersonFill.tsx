const defaultProps = {
    fill: "currentColor",
    width: 16,
    height: 16,
  };

const SvgPersonFill = ({ width, height, fill }: typeof defaultProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 16 16"
      className="person-fill_svg__bi person-fill_svg__bi-person-fill"
    >
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  );

  SvgPersonFill.defaultProps = defaultProps;

  export default SvgPersonFill;