import classNames from "classnames";

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
    fill: "currentColor",
    width: 16,
    height: 16,
    className : "check2-circle_svg__bi check2-circle_svg__bi-check2-circle",
  };


const SvgCheck2Circle = ({ width, height, fill , className }: typeof defaultProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 16 16"
      className={className}
      
    >
      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
    </svg>
  );
  SvgCheck2Circle.defaultProps = defaultProps;

  export default SvgCheck2Circle;