interface Props {
  size?: number;
  fill?: string;
}

const SvgPrivateLock = ({ size, fill }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    style={{
      fill: fill || 'var(--color-primary)',
    }}
  >
    <path
      d="M18 10V6A6 6 0 0 0 6 6v4H3v14h18V10h-3zm-5 7.723V20h-2v-2.277c-.595-.347-1-.984-1-1.723a2 2 0 0 1 4 0c0 .738-.404 
    1.376-1 1.723zM8 10V6c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v4H8z"
    />
  </svg>
);
export default SvgPrivateLock;
