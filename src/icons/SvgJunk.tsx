const SvgJunk = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={14}
      fill="none"
      viewBox="0 0 16 14"
      {...props}
    >
      <path
        stroke={props.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m13.5 3.5-.896 8.617a1 1 0 0 1-.993.883H4.389a1 1 0 0 1-.993-.883L2.5 3.5M14.5 1h-13a.5.5 
        0 0 0-.5.5V3a.5.5 0 0 0 .5.5h13A.5.5 0 0 0 15 3V1.5a.5.5 0 0 0-.5-.5ZM9.75 6.5 6.25 10m3.5 0-3.5-3.5"
      />
    </svg>
  );
  export default SvgJunk;