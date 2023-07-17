
const defaultProps = {
    fill: '#424242',
    width: 16,
    height: 16,
  };
  
const SvgLink = ({ width, height, fill }: typeof defaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    className="link_svg__bi link_svg__bi-link"
  >
    <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 
    0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 
    1 0-4h1.535c.218-.376.495-.714.82-1z" />
    <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 
    2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 
    4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
  </svg>
);
SvgLink.defaultProps = defaultProps;

export default SvgLink;