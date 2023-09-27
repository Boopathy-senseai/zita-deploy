import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgRoundClose from '../../icons/SvgRoundClose';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import { GARY_4 } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { fileAccept, FILE_2MB } from '../constValue';
import JdParserLoader from '../createjdmodule/JdParserLoader';
import { Toast } from '../../uikit';
import styles from './candidateupload.module.css';
import {
  profileEditMiddleWare,
  resumeReUploadMiddleWare,
  resumeUploadMiddleWare,
} from './store/middleware/candidateprofilemiddleware';

type Props = {
  empId: string;
  user_info: any;
  onClose: () => void;
};
function CandidateUpload({ empId, user_info, onClose }: Props) {
  const [file, setFile] = useState<any>([]);
  const [isMb, setMb] = useState(false);
  const [isLoader, setLoader] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoader(true);
    e.preventDefault();
    uploadFile(file);
    
  };
  const handleClear = () => setFile([]);

  const uploadFile = (files: any) => {
    const formData = new FormData();
    formData.append('resume_file', files);
    formData.append('candidate_id', user_info.user_id_id)
    // formData.append('emp-id', empId);
    // formData.append('user_id', user_info.user_id_id);

    return dispatch(resumeReUploadMiddleWare({ formData })).then(() => {
      handleClear();
      // dispatch(
      //   profileEditMiddleWare({
      //     jd_id: localStorage.getItem('careerJobViewJobId'),
      //   }),
      // );
      setLoader(false);
      onClose();
      Toast('Resume updated successfully', 'LONG', 'success');
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
    <>
      <JdParserLoader
        open={isLoader}
        title="Please wait... Your resume is getting reuploaded."
      />
      {/* <Card className={styles.cardOverAll}> */}
      <Flex center>
        <Text size={14} bold style={{ marginBottom: '10px' }}>
          Reupload Resume/CV
        </Text>
        <Flex columnFlex className={styles.innerFlex}>
          <div
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
            className={styles.border}
          >
            <input
              type="file"
              accept=".doc,.docx,.pdf,.txt"
              onChange={handleOnChange}
              className={styles.displayNone}
              id="upload__file_upload"
            />
            {!checkSelectLength ? (
              <Flex>
                <Flex row center middle>
                  <Text color="gray">{'Drag & Drop resume here or'}</Text>
                  <label
                    className={styles.labelStyle}
                    htmlFor={'upload__file_upload'}
                  >
                    <Text color="link" bold>
                      Browse Files
                    </Text>
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
                <Text color="gray">{file.name}</Text>
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
        <Flex row className={styles.btnContainer}>
          <Button types="close" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!checkSelectLength}
            onClick={handleSubmit}
            className={styles.btnStyle}
          >
            Reupload Resume/CV
          </Button>
        </Flex>
      </Flex>
      {/* </Card> */}
    </>
  );
}

export default CandidateUpload;
