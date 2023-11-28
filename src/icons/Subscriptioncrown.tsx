const defaultProps = {
    fill: '#1890ff',
    width: 16,
    height: 16,
};
const SvgSubcriptioncrown = ({ width, height, fill }: typeof defaultProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill={fill}
            viewBox="0 0 14 14"
        >
            <path d="M3.33333 10.667L2 3.33366L5.66667 6.66699L8 2.66699L10.3333 6.66699L14
             3.33366L12.6667 10.667H3.33333ZM12.6667 12.667C12.6667 13.067 12.4 13.3337 
            12 13.3337H4C3.6 13.3337 3.33333 13.067 3.33333 12.667V12.0003H12.6667V12.667Z"
                fill="#FFD233" />
        </svg>

    );
};
SvgSubcriptioncrown.defaultProps = defaultProps;

export default SvgSubcriptioncrown;