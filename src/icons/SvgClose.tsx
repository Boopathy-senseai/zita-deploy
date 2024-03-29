/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#424242',
  width: '20',
  height: '20',
  className: '',
  cursor: 'pointer',
};

interface Props {
  fill?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  cursor?: string;
}

const SvgClose = ({ fill, width, height, className, cursor }: Props) => (
  <svg
    className={className}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    cursor={cursor}
    viewBox="0 0 24 24"
  >
    <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
  </svg>
);

SvgClose.defaultProps = defaultProps;

export default SvgClose;
