const defaultProps = {
  fill: '#34cc65',
  width: 22,
  height: 22,
};
const SvgCalendar = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
    >
      <path
        stroke="#581845"
        strokeLinejoin="round"
        d="M15.154 2.231H2.846C1.826 2.231 1 3.058 1 4.077v11.077C1 16.174 1.827 17 
        2.846 17h12.308c1.02 0 1.846-.826 1.846-1.846V4.077c0-1.02-.827-1.846-1.846-1.846Z"
      />
      <path
        stroke="#581845"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.077 1v1.23M13.923 1v1.23M17 5.309H1m9.846 3.846 1.67-1.23h.176v6.46M5.076 
        8.498c.167-.281.633-.728 1.456-.728.973 0 1.842.53 1.842 1.535a1.458 
        1.458 0 0 1-.428 1.048c-.42.43-1.062.595-1.413.595.397 0 1.123.187 
        1.599.673.304.31.445.748.445 1.233 0 1.072-.905 1.686-2.005 1.686-.93 
        0-1.5-.676-1.687-.994"
      />
    </svg>
  );
};
SvgCalendar.defaultProps = defaultProps;

export default SvgCalendar;
