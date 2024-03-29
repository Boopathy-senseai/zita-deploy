/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  width: 24,
  height: 24,
  className: '',
};

const SvgGmail = ({ width, height }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill="#EAEAEA"
        d="M22.5 21h-21A1.5 1.5 0 0 1 0 19.5v-15A1.5 1.5 0 0 1 1.5 3h21A1.5 1.5 0 0 1 24 4.5v15a1.5 1.5 0 0 1-1.5 1.5z"
      />
      <path
        fill="#D54C3F"
        d="M3 21H1.5A1.5 1.5 0 0 1 0 19.5v-15a1.5 1.5 0 0 1 3 0V21z"
      />
      <path
        fill="#B63524"
        d="M21 21h1.5a1.5 1.5 0 0 0 1.5-1.5v-15a1.5 1.5 0 0 0-3 0V21z"
      />
      <path
        fill="#DE5145"
        d="M23.359 5.73a1.5 1.5 0 0 0-1.718-2.46l-9.64 7.018h-.002L2.359 3.27A1.501 1.501 0 0 0 .641 5.73l-.04-.029L12 14l11.359-8.27zm.04-.029L12 14l11.399-8.299z"
      />
      <path
        fill="#EFEFEF"
        d="M22.5 3c-.319 0-.616.1-.859.27l-9.64 7.018h-.002L2.359 3.27A1.496 1.496 0 0 0 1.5 3h21z"
      />
      <path
        fill="#C64132"
        d="M3.001 8.094.473 5.59l-.001.002c.053.05.109.096.169.138l-.04-.029 2.4 1.747v.664-.018z"
      />
      <path
        fill="#E3E3E3"
        d="M10.334 15.296 3 21l.001-12.968 7.332 7.262.001.002z"
      />
      <linearGradient
        id="gmail_svg__a"
        x1={-261.914}
        x2={-261.679}
        y1={1097.147}
        y2={1097.147}
        gradientTransform="matrix(38.2761 0 0 -38.2761 10028.054 42005.938)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#c8c8c8" />
        <stop offset={1} stopColor="#cdcdcd" />
      </linearGradient>
      <path
        fill="url(#gmail_svg__a)"
        d="M10.334 15.296 12 14 3.001 7.448v.583l7.332 7.262.001.003z"
      />
      <linearGradient
        id="gmail_svg__b"
        x1={-261.722}
        x2={-261.444}
        y1={1097.073}
        y2={1097.073}
        gradientTransform="matrix(38.2761 0 0 -38.2761 10028.054 42005.938)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#d9d9d9" />
        <stop offset={1} stopColor="#e2e2e2" />
      </linearGradient>
      <path
        fill="url(#gmail_svg__b)"
        d="M16.03 21H21V7.448L12 14l-1.667 1.293L16.03 21z"
      />
    </svg>
  );
};
SvgGmail.defaultProps = defaultProps;

export default SvgGmail;
