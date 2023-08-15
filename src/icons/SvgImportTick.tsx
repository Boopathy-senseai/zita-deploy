const defaultProps = {
    fill:"none",
    width: 10,
    height: 11,
  }; 
  import * as React from 'react'; 
  const SvgImportTick =(props)=> (   
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 9 10"
      fill="none"
      {...props}
    >
      <g clipPath="url(#svgfilltick_svg__a)">
        <path
          fill="#00BE4B"
          d="M5 .852A4.168 4.168 0 0 0 .833 5.018C.833 7.318 2.7 9.185 5 9.185s4.166-1.867 
          4.166-4.167S7.3.852 5 .852Zm-.834 6.25L2.083 5.018l.588-.587 1.495 1.491L7.33 2.76l.587.592-3.75 3.75Z"
        />
      </g>
      <defs>
        <clipPath id="svgfilltick_svg__a">
          <path fill="#fff" d="M0 .019h10v10H0z" />
        </clipPath>
      </defs>
    </svg>
  );
  export default SvgImportTick;
  