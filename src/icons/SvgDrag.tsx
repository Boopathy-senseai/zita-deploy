const defaultProps = {
    fill: '#1890ff',
    width: 16,
    height: 16,
  };

  const SvgDrag = ({ width, height, fill }: typeof defaultProps) => {
    return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      
    >
      <path
        fill={fill}
        d="M1.333 2.667a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 
        0 2.667Zm0 4.666a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 
        0 2.666Zm1.334 3.334a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 
        0 1 2.667 0Zm3.333-8A1.333 1.333 0 1 0 6 0a1.333 1.333 0 0 0 
        0 2.667ZM7.333 6a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0ZM6 12a1.334 1.334 
        0 1 0 0-2.667A1.334 1.334 0 0 0 6 12Z"
      />
    </svg>
  );
    };
    SvgDrag.defaultProps = defaultProps;

  export default SvgDrag;