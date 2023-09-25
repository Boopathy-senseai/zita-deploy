import { useSelector } from 'react-redux';
import { useMemo, useState,useEffect } from 'react'; 
import classNames from 'classnames/bind';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import PDF from 'react-pdf-js-infinite';
import FileViewer from 'react-file-viewer';
import Flex from '../../uikit/Flex/Flex';
import SvgDownload from '../../icons/SvgDownload';
import Text from '../../uikit/Text/Text';
import Svgmaximize from '../../icons/Svgmaximize';
import Svgminimize from '../../icons/Svgminimize';
import { RootState } from '../../store';
import styles from './candidateresumetab.module.css';

const cx = classNames.bind(styles);

const CandiDateResumeTab = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [zoomLeveltxt, setZoomLeveltxt] = useState<number>(0.63);
  const [text, settext] = useState(''); 
  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.1);
    setZoomLeveltxt((prevZoomLevel) => prevZoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(0.7, prevZoomLevel - 0.1));
    setZoomLeveltxt((prevZoomLevel) => Math.max(0.3, prevZoomLevel - 0.1));
  };
  const { candidate_details } = useSelector(
    ({ applicantProfileInitalReducers }: RootState) => {
      return {
        candidate_details: applicantProfileInitalReducers.candidate_details,
      };
    },
  );

  const file = useMemo(
    () => process.env.REACT_APP_HOME_URL + 'media/' + candidate_details[0].file,
    [],
  );
  var lastStr = candidate_details[0].file.lastIndexOf('.');
  var filename = candidate_details[0].file.substring(lastStr + 1); 
  const update = () => {
    if (filename === 'txt') {
      fetch(file)
        .then((response) => response.text())
        .then((data) => settext(data))
        .catch((error) => console.error('Error fetching file:', error));
    }
  };
  
  // const fileOptions = {
  //   zoom: `${zoomLevel}%`, // Apply the zoom level as a CSS style
  // };
  const docs = [{ uri: file }];
  const zoomStyle = {
    transform: `scale(${zoomLevel})`,
    transformOrigin: '0 0',
    transition: 'transform 0.25s ease-in-out',
  };
  const zoomStyletxt = {
    transform: `scale(${zoomLeveltxt})`,
    transformOrigin: '0 0',
    transition: 'transform 0.25s ease-in-out',
  };
  const downloadFile = () => {
    const fileUrl =file; // Replace with your desired file URL

    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download =candidate_details[0].file; // Provide a default file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(error => console.error('Error downloading file:', error));
  }; 
  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight -68}
    >
      <Text bold color="theme" className={cx('resumeStyleOne')}>
        Resume
      </Text>
      <Flex
          columnFlex
          className={styles.overAllresume}
          height={window.innerHeight - 132} 
        > 

<div
  style={{
    textAlign: 'right', 
    backgroundColor: '#EEE8EC',
    position: 'sticky',
    top: '0', 
    zIndex:5// Adjust top position as needed
  }}
>
  <Flex style={{ marginTop: '5px',marginBottom:'5px' }} row end>
  <Flex onClick={downloadFile} title='Download Resume' style={{ marginRight: '13px',cursor:'pointer' }} >
      <SvgDownload width={16} height={16} />
    </Flex>
    <Flex onClick={handleZoomIn} title='Maximize' style={{ marginRight: '13px',cursor:'pointer' }} >
       <Svgmaximize width={16} height={16} />
    </Flex>
    <Flex onClick={handleZoomOut} title='Minimize' style={{ marginRight: '13px',cursor:'pointer' }}>
    <Svgminimize width={16} height={16} />
    </Flex>
  </Flex>
  {update()}
</div>
{file !== '' &&
          <Flex
            style={{
              // maxHeight: '500px',
              height: 'auto',
              // maxWidth: '500px',
               overflowY:'scroll',
              borderRadius:'5px',
              border:'1px solid #dfdfdf',marginTop:'5px',paddingBottom:'5px'
            }}  
          >
           
              {text !== ''  ? (
                 <Flex style={zoomStyletxt} middle center>
                <pre style={{width:'fit-content',padding:'5px'}}>{text}</pre>
                </Flex>
              ) : (
                <Flex style={zoomStyle} middle center>

                  {filename.toUpperCase() === 'PDF'?
                    <PDF 
                file={file}  renderQuality={3}  zoom={2.0}
                 />  :

                <FileViewer fileType={filename} filePath={file}  onLoad={false}/>}
                </Flex>
              )} 
             
          </Flex>} 
          </Flex>
    </Flex>
  );
};

export default CandiDateResumeTab;
