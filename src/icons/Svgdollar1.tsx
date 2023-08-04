import * as React from 'react';
const defaultProps = {
    fill: '#581845',
    width: 14,
    height: 14,
  }; 

const SvgDollar =  ({ width, height, fill }: typeof defaultProps) => (        
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    width={width}
    height={height}
    viewBox="3 0 24 24"
 
  >
    <path
      fill="#581845"
      fillRule="evenodd"
      d="M13 3.5a1 1 0 1 0-2 0v.56c-1.17.14-2.247.525-3.104 1.117C6.796 5.937 6 7.09 
      6 8.5c0 1.274.492 2.457 1.578 3.293.856.659 2.01 1.046 3.422 1.166v4.963c-.784-.126-1.46-.394-1.967-.745C8.323
       16.687 8 16.09 8 15.5a1 1 0 1 0-2 0c0 1.41.796 2.563 1.896 3.323.857.592 1.934.978 3.104 1.118v.559a1 1 
       0 1 0 2 0v-.556c1.162-.134 2.238-.502 3.097-1.085C17.212 18.1 18 16.944 18 15.5c0-1.307-.486-2.498-1.584-3.329-.859-.65-2.012-1.018-3.416-1.132v-4.96c.784.125
        1.46.393 1.967.744C15.677 7.313 16 7.91 16 8.5a1 1 0 
1 0 2 0c0-1.41-.796-2.563-1.896-3.323C15.247 4.585 14.17 4.2 13 4.06V3.5Zm-2 2.578c-.784.126-1.46.394-1.967.745C8.323 7.313
 8 7.91 8 8.5c0 .726.258 1.293.797 1.707.446.343 1.15.631 2.203.743V6.078Zm2 6.969v4.88c.791-.12 1.468-.38 1.974-.723C15.668 16.732 16 16.14 16 15.5c0-.777-.264-1.336-.79-1.734-.444-.335-1.148-.612-2.21-.719Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDollar;