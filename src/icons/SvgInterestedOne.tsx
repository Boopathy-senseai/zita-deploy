/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#581845',
  width: 24,
  height: 24,
};

const SvgInterestedOne = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={width}
      width={height}
      fill={fill}
    >
      <path d="M5 22H0V10h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885C17.656 5.125 17.438 0 15.062 0c-1.594 0-1.896 1.807-2.375 3.469C11.466 7.711 9.375 9.486 7 10.354v10.878C11.382 21.933 13.345 24 17.505 24c3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z" />
    </svg>
  );
};
SvgInterestedOne.defaultProps = defaultProps;

export default SvgInterestedOne;
