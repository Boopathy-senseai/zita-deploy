const SvgReply = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      fill="none"
      {...props}
    >
      <g clipPath="url(#reply_svg__a)">
        <mask
          id="reply_svg__b"
          width={14}
          height={14}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'luminance',
          }}
        >
          <path fill="#fff" d="M14 0v14H0V0h14Z" />
        </mask>
        <g mask="url(#reply_svg__b)">
          <path
            fill="#581845"
            d="M6.733.01S14-.5 14 5.559c0 5.52-7.267 6.324-7.267 6.324v2.116l-6.735-4.07L6.733 5.94v2.208s4.563-.978 4.563-3.793C11.296 2.45 9.88.377 6.78.377L6.733.011Z"
          />
        </g>
      </g>
      <defs>
        <clipPath id="reply_svg__a">
          <path fill="#fff" d="M0 0h14v14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
  export default SvgReply;