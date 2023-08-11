import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgRoundClose from '../../icons/SvgRoundClose';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import { Modal } from '../../uikit';
import { GARY_4 } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { fileAccept, FILE_2MB } from '../constValue';
import { jdParserMiddleWare } from './store/middleware/createjdmiddleware';
import styles from './uploadjd.module.css';


function UploadJd() {
  const [file, setFile] = useState<any>([]);
  const [isMb, setMb] = useState(false);
  const [modal,setmodal]= useState (false)
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    uploadFile(file);
    setmodal(false)
  };

  const handlecancel = () => {
    setmodal(false);
    setFile([])
  }
  // resume clear function
  const handleClear = () => setFile([]);

    // resume upload function
  const uploadFile = (files: any) => {
    const formData = new FormData();
    formData.append('jd_file', files);
    return dispatch(jdParserMiddleWare({ upload: formData })).then(() => {
      handleClear();
    });
  };

  const handleOnChange = (e: any) => {
    var fileExt = e.target.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (fileAccept.indexOf(fileExt) < 0) {
      alert(
        'Invalid file selected, valid files are of ' +
          fileAccept.toString() +
          ' types.',
      );
    } else if (e.target.files && e.target.files[0].size / 1024 / 1024 > 2) {
      setMb(true);
    } else {
      setFile(e.target.files[0]);
      setMb(false);
    }
  };

  const dragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const dragEnter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const dragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  // File drag and drop Function
  const fileDrop = (e: {
    preventDefault: () => void;
    dataTransfer: { files: any };
  }) => {
    e.preventDefault();
    var fileName = e.dataTransfer.files && e.dataTransfer.files[0].name;
    fileName = fileName.substring(fileName.lastIndexOf('.'));
    if (fileAccept.indexOf(fileName) < 0) {
      alert(
        'Invalid file selected, valid files are of ' +
          fileAccept.toString() +
          ' types.',
      );
    } else if (
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].size / 1024 / 1024 > 2
    ) {
      setMb(true);
    } else {
      setMb(false);
      setFile(e.dataTransfer.files[0]);
    }
  };

  const checkSelectLength = file.length === 0 ? false : true;

  return (
    <Flex row style={{justifyContent:"space-between", marginTop:"6px"}}>
      <Flex>
      {/* <Text bold size={14} className={styles.title}>
        Create Your Job
      </Text> */}
      <Text className={styles.desText}>
        Take up your first step in your hiring process with Zita
      </Text>
      </Flex>
      <Flex>
      <Button onClick={()=>setmodal(true)}>Upload JD</Button>
      <Modal open={modal} >
      <Flex style={{backgroundColor:'#ffffff',padding:'25px',height:'262px',width:'450px'}}>
       
        <Flex  center>
        <Text bold size={14} style={{marginBottom: "16px"}}>Add Attachment</Text>
          <Flex columnFlex className={styles.innerFlex}>
            <div
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileDrop}
              className={styles.border}
            >
              <input
                key={Date.now()}
                type="file"
                accept=".doc,.docx,.pdf,.txt"
                onChange={handleOnChange}
                className={styles.displayNone}
                id="upload__file_upload"
              />
              {!checkSelectLength ? (
                <Flex>
                  <Flex row center middle>
                    <Text color="gray">{'Drag & Drop JD Here or'}</Text>
                    <label
                      className={styles.labelStyle}
                      htmlFor={'upload__file_upload'}
                    >
                      <Text bold color="link">Browse Files</Text>
                    </label>
                  </Flex> 
                  <Text
                    size={12}
                    align="center"
                    color="gray"
                    className={styles.uploadText}
                  >
                    (Upload only .txt, .doc, .docx, .pdf formats)
                  </Text>
                </Flex>
              ) : (
                <Flex row center>
                  <Flex row className={styles.uploadjdfilebox}>
                  <Text className={styles.uploadjdfiletext} color="gray">{file.name}</Text>
                  <div
                    tabIndex={-1}
                    role={'button'}
                    onKeyPress={() => {}}
                    onClick={handleClear}
                    className={styles.svgClose}
                  >
                    <SvgRoundClose fill={GARY_4} width={16} height={16} />
                  </div>
                  </Flex>
                </Flex>
              )}
            </div>
            {isMb && (
              <Text
                align="center"
                size={12}
                color="error"
                style={{ position: 'absolute', bottom: -22 }}
              >
                {FILE_2MB}
              </Text>
            )}
          </Flex>
          <Flex row style={{marginTop:'10px',justifyContent: 'flex-end'}}>
          <Button
            onClick={handlecancel}
            types='close'
          >
            Cancel
          </Button>
          <Button
            disabled={!checkSelectLength}
            onClick={handleSubmit}
            className={styles.btnStyle}
          >
            Upload JD
          </Button>
        </Flex>
        </Flex>
      </Flex>
      </Modal>
      </Flex>
    </Flex>
  );
}

export default UploadJd;
