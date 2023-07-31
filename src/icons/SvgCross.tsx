const SvgCross = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        stroke="#581845"
        strokeLinecap="round"
        strokeWidth={1.25}
        d="M1 19 19 1M1 1l18 18"
      />
    </svg>
  );
  export default SvgCross;