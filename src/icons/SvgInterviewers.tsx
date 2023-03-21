interface Props {
  fill?: string;
  size?: number;
}

const SvgInterviewersIcon = ({ fill, size }: Props) => (
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
      d="M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682C9.958 5.971 12.848 2 17.001 2c4.235 0 7.054 
    4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889V22H8c0-2.745-.22-4.258 
    2.644-4.92zM-2 22h7.809c-.035-8.177 3.436-5.313 3.436-11.127C9.245 8.362 7.606 7 5.497 7 2.382 7 .215 9.979 
    3.164 15.549c.969 1.83-1.031 2.265-3.181 2.761C-1.879 18.74-2 19.65-2 21.227V22z"
    />
  </svg>
);

export default SvgInterviewersIcon;
