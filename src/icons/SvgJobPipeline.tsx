const defaultProps = {
    fill: '#424242',
    width: 13,
    height: 13,
};

const SvgJobPipeline = ({ width, height, fill }: typeof defaultProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill={fill}
        >
            <path
                fill="#581845"
                d="M.533 3.733V3.2A.533.533 0 0 0 0 3.733h.533Zm6.4 0h.534a.533.533 
        0 0 0-.534-.533v.533Zm0 
        11.734V16a.533.533 0 
        0 0 .534-.533h-.534Zm-6.4 0H0A.533.533 
        0 0 0 .533 16v-.533ZM9.067 3.733V3.2a.533.533 
        0 0 0-.534.533h.534Zm6.4 0H16a.533.533 
        0 0 0-.533-.533v.533Zm0 6.4v.534a.533.533 
        0 0 0 .533-.534h-.533Zm-6.4 0h-.534a.534.534 
        0 0 0 .534.534v-.534ZM0 1.067h7.467V0H0v1.067Zm8.533 
        0H16V0H8.533v1.067Zm-8 
        3.2h6.4V3.2h-6.4v1.067ZM6.4 3.733v11.734h1.067V3.733H6.4Zm.533 
        11.2h-6.4V16h6.4v-1.067Zm-5.866.534V3.733H0v11.734h1.067Zm8-11.2h6.4V3.2h-6.4v1.067Zm5.866-.534v6.4H16v-6.4h-1.067Zm.534 
        5.867h-6.4v1.067h6.4V9.6Zm-5.867.533v-6.4H8.533v6.4H9.6Z"
            />
        </svg>
    );
};
SvgJobPipeline.defaultProps = defaultProps;

export default SvgJobPipeline;
