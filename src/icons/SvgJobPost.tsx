//import * as React from 'react';




const defaultProps = {

      fill: '#34cc65',
    
      width: 22,
    
      height: 22,
    
    };
    
    
    
    
    const SvgJobPost = ({ width, height, fill }: typeof defaultProps) => {
    
      return (
    
        <svg
    
          xmlns="http://www.w3.org/2000/svg"
    
          width={width}
    
          height={height}
    
          fill={fill}
    
        >
    
          <path
    
            fill="#581845"
    
            d="M15.78 1.822 14.216.224A.747.747 0 0 0 13.687 0a.734.734 0
    
            0 0-.529.224L6.796 6.762l-.516 2.28a.78.78 0 0 0 .153.633.75.75 0 0
    
            0 .576.282.768.768 0 0 0 .172 0l2.25-.507 6.35-6.547a.765.765 0 0 0 .219-.54.777.777
    
            0 0 0-.22-.541ZM8.95 8.572l-1.699.385.395-1.721 4.79-4.926 1.308 1.337-4.794
    
            4.926Zm5.319-5.46-1.31-1.337.72-.75 1.318 1.347-.729.74Z"
    
          />
    
          <path
    
            fill="#581845"
    
            d="M14.458 14.77H1.205V1.23h7.964L10.374 0h-9.17C.886 0 .58.13.354.36.127.591
    
            0 .904 0 1.23v13.54c0 .326.127.639.353.87.226.23.532.36.852.36h13.253c.32
    
            0 .626-.13.852-.36.226-.231.353-.544.353-.87V5.537L14.458 6.77v8Z"
    
          />
    
        </svg>
    
      );
    
    };
    
    SvgJobPost.defaultProps = defaultProps;
    
    export default SvgJobPost;