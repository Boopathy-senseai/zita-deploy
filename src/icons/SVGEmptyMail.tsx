const SvgEmptyMail = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={120}
      height={120}
      fill="none"
      {...props}
    >
      <g clipPath="url(#empty_mails_svg__a)">
        <path
          fill="url(#empty_mails_svg__b)"
          d="M117.477 13.431 54.167 1.066c-1.684-.345-3.28.692-3.546 2.335l-7.803 37.96c-.354 
          1.642.71 3.198 2.394 3.458l63.398 12.364c1.685.346 3.281-.691 3.547-2.334l7.802-37.96c.266-1.555-.798-3.112-2.482-3.458Z"
        />
        <path
          fill="#E1DFDD"
          d="m53.756 1.028.254.01.158.028 63.309 12.365a3.173 3.173 0 0 1 2.139 1.539L80.898 36.25 52.5 1.5a2.87 2.87 0 0 1 1.256-.472Z"
        />
        <path
          fill="#581845"
          fillOpacity={0.6}
          d="M101.072 91.398 89.478 45.156c-.797-3.083-3.983-5.02-7.08-4.228L4.427 
          60.306c-3.098.792-5.045 3.963-4.248 7.046l11.505 46.242c.796 3.083 3.983 5.021 7.08 4.228l77.971-19.377c3.186-.793 5.133-3.964 4.337-7.047Z"
        />
        <path
          fill="#581845"
          fillOpacity={0.25}
          d="m4.427 60.306 77.97-19.378c1.734-.444 3.495-.032 4.85.957L53.458 88.75.633 63.346a5.915 5.915 0 0 1 3.574-2.98l.22-.06Z"
        />
      </g>
      <defs>
        <radialGradient
          id="empty_mails_svg__b"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="translate(3060.12 1058.86) scale(6224.34)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B0AEAC" />
          <stop offset={0.834} stopColor="#E1DFDD" />
        </radialGradient>
        <clipPath id="empty_mails_svg__a">
          <path fill="#fff" d="M0 0h120v120H0z" />
        </clipPath>
      </defs>
    </svg>
  );
  export default SvgEmptyMail;