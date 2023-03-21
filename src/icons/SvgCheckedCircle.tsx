interface SvgProps {
  size?: string;
  checked?: boolean;
}

const SvgCheckedCircle = ({ size = '100%', checked = false }: SvgProps) => {
  return (
    <div style={{ width: size, height: size, display: 'flex' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 389 389"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="194.5"
          cy="194.5"
          r="184.5"
          fill={checked ? 'black' : 'white'}
          stroke="black"
          strokeWidth="20"
          style={{
            transition: '300ms',
          }}
        />
        <path
          d="M104.129 201.382L164.536 256.728M282.479 131.134L165.134 256.715"
          stroke={checked ? 'white' : 'black'}
          strokeWidth="20"
          strokeLinecap="round"
          style={{
            transition: '300ms',
          }}
        />
      </svg>{' '}
    </div>
  );
};

export default SvgCheckedCircle;
