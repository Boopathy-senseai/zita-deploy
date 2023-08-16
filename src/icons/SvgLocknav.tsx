 /* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
    fill: '#581845',
    width: 22,
    height: 22,
  };
  
  const SvgLocknav = ({ width, height, fill }: typeof defaultProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 -3 26 26"
      >
        <path
          d="M12 1C8.676 1 6 3.676 6 7v1c-1.094 0-2 .906-2 2v10c0 1.094.906 2 2 2h12c1.094 0 2-.906 2-2V10c0-1.094-.906-2-2-2V7c0-3.324-2.676-6-6-6zm0 2c2.277 0 4 1.723 4 4v1H8V7c0-2.277 1.723-4 4-4zm-6 7h12v10H6zm6 3c-1.102 0-2 .898-2 2 0 1.102.898 2 2 2 1.102 0 2-.898 2-2 0-1.102-.898-2-2-2zm0 0"
          fill={fill}
        />
      </svg>
    );
  };
  SvgLocknav.defaultProps = defaultProps;
  
  export default SvgLocknav;
  