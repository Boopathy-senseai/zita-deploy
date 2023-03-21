interface Props {
  size?: number;
  fill?: string;
}

const SvgCalendar1 = ({ size, fill }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    style={{
      fill: fill || 'var(--color-primary)',
    }}
    viewBox="0 0 24 24"
  >
    <path
      d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zM8 16H4v4h4v-4zm6 0h-4v4h4v-4zm-6-6H4v4h4v-4zm16-8v22H0V2h3v1c0 
    1.103.897 2 2 2s2-.897 2-2V2h10v1c0 1.103.897 2 2 2s2-.897 2-2V2h3zm-2 6H2v14h20V8zm-2-7a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V1zM6 3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v2z"
    />
  </svg>
);
export default SvgCalendar1;
