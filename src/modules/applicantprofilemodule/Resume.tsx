import { useMemo, useState,useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import PDF from 'react-pdf-js-infinite';
import FileViewer from 'react-file-viewer';
import Flex from '../../uikit/Flex/Flex';
import SvgDownload from '../../icons/SvgDownload';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import Tab from '../../uikit/Tabs/Tab';
import Collapse from '../../uikit/Collapse/Collapse';
import Svgmaximize from '../../icons/Svgmaximize';
import Svgminimize from '../../icons/Svgminimize';
import SvgAngle from '../../icons/SvgAngle';
import { isEmpty, notSpecified } from '../../uikit/helper';
import { RootState } from '../../store';
import styles from './resumecover.module.css';

const cx = classNames.bind(styles);

const ResumeCoverTab = () => {
  const [isOpen, setOpen] = useState(false);
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
  const { candidate_details, cover_letter } = useSelector(
    ({ applicantProfileInitalReducers }: RootState) => {
      return {
        candidate_details: applicantProfileInitalReducers.candidate_details,
        cover_letter:
          applicantProfileInitalReducers.cover_letter?.length !== 0
            ? applicantProfileInitalReducers.cover_letter
            : [
                {
                  id: 0,
                  candidate_id_id: 0,
                  jd_id_id: 0,
                  cover_letter: '',
                  source: '',
                  created_on: '',
                },
              ],
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
  const coverLetter =
    notSpecified(cover_letter && cover_letter[0].cover_letter) ===
    'Not Specified'
      ? true
      : false;

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
    <>
      {candidate_details[0].file === null ? (
        <Flex center middle height={window.innerHeight}>
          <Text color="gray">Not Specified </Text>
        </Flex>
      ) : (
        <Flex
          columnFlex
          className={styles.overAllresume}
          height={window.innerHeight - 142} 
        >
          {/* <Flex  */}
          {/* <Flex row center between>
          {/* <Text bold color="theme">
            Cover Letter
          </Text> */}
          {/* {isEmpty(cover_letter[0].cover_letter) ? (
            <Text color="gray">
              {notSpecified(cover_letter && cover_letter[0].cover_letter)}
            </Text>
          ) : (
            <div
              tabIndex={-1}
              role={'button'}
              onKeyPress={() => {}}
              onClick={() => setOpen(!isOpen)}
              className={styles.pointer}
            >
              <SvgAngle up={isOpen} height={15} width={15} />
            </div>
          )}
        </Flex> */}
          {/* <Collapse isOpen={isOpen} noText={coverLetter}>
          <pre
            className={cx('preStyle', {
              textCenter: coverLetter,
            })}
          >
            {notSpecified(cover_letter && cover_letter[0].cover_letter)}
          </pre>
        </Collapse>
         */}
          {/* </Flex> */}
          {/* <Text bold color="theme" className={cx('resumeStyle')}>
        Resume
      </Text> */}

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
            {/* <DocViewer
              style={{ height: '100%', width: '100%', maxWidth: '550px' }}
              pluginRenderers={DocViewerRenderers}
              documents={docs}
              config={{
                header: {
                  disableHeader: false,
                  disableFileName: false,
                  retainURLParams: false,
                },
              }}
            /> */}
          </Flex>}
        </Flex>
      )}
    </>
  );
};

export default ResumeCoverTab;