// const SvgHeart = (props) => (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width={13}
    //   height={12}
    //   fill="none"
    //   viewBox="0 0 14 14"
    //   {...props}
    // >
    //   <path
    //     fill="#ED4857"
    //     d="m6.334 12-.87-.863C2.374 8.083.334 6.062.334 3.597.334 1.576 1.786 
    //     0 3.634 0c1.044 0 2.046.53 2.7 1.36C6.988.53 7.99 0 9.034 0c1.848 
    //     0 3.3 1.576 3.3 3.597 0 2.465-2.04 4.486-5.13 7.54l-.87.863Z"
    //   />
    // </svg>
//   );
//   export default SvgHeart;
// const SvgHeartOutline = (props) => (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width={12}
  //   height={12}
  //   fill="none"
  //   {...props}
  // >
  //   <path
  //     fill="#ED4857"
  //     d="m6.151 9.82-.058.06-.064-.06c-2.77-2.513-4.603-4.176-4.603-5.862 
  //     0-1.166.875-2.041 2.042-2.041.898 0 1.773.583 2.083 1.376h1.085C6.945 
  //     2.5 7.82 1.917 8.718 1.917c1.167 0 2.042.875 2.042 2.041 0 1.686-1.832 3.349-4.609 
  //     5.863ZM8.718.75c-1.015 0-1.99.472-2.625 1.213A3.508 3.508 
  //     0 0 0 3.468.75 3.174 3.174 0 0 0 .26 3.958c0 2.2 1.983 4.002 4.987 6.726l.846.77.846-.77c3.004-2.724 4.987-4.526 4.987-6.726A3.174 3.174 0 0 0 8.718.75Z"
  //   />
  // </svg>
// );
// export default SvgHeartOutline;

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#581845',
  width: 19,
  height: 19,
  filled: false,
  className: '',
  onClick: () => {},
};

const SvgHeart = ({
  width,
  height,
  fill,
  filled,
  className,
  onClick,
}: typeof defaultProps) => {
  return filled ? (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    className={className}
    onClick={onClick}
  >
    <path
      fill="#ED4857"
      d="m9.5 19-1.377-1.367C3.23 12.798 0 9.598 0 5.695 0 2.495 2.299 0 5.225 0 6.878 0 8.465.839 9.5 2.154 10.536.839 12.122 0 13.775 0 16.701 0 19 2.495 19 5.695c0 3.903-3.23 7.103-8.123 11.938L9.5 19Z"
    />
  </svg>
  ) : (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    className={className}
    onClick={onClick}
   
  >
    <path
      fill="#ED4857"
      d="m9.595 16.1-.095.104-.104-.103C4.883 11.638 1.9 8.687 1.9 5.695c0-2.071 1.425-3.624 3.325-3.624 1.463 0 2.888 1.035 3.392 2.443h1.766c.504-1.408 1.929-2.443 3.392-2.443 1.9 0 3.325 1.553 3.325 3.624 0 2.992-2.983 5.943-7.505 10.406ZM13.775 0c-1.653 0-3.24.839-4.275 2.154C8.464.839 6.878 0 5.225 0 2.299 0 0 2.495 0 5.695c0 3.903 3.23 7.103 8.123 11.938L9.5 19l1.377-1.367C15.77 12.798 19 9.598 19 5.695 19 2.495 16.701 0 13.775 0Z"
    />
  </svg>

  );
};
SvgHeart.defaultProps = defaultProps;

export default SvgHeart;
