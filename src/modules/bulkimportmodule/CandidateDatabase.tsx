import { Component, createRef, Fragment } from 'react';
import axios from 'axios';
import Button from '../../uikit/Button/Button';
import { bulkImportApi } from '../../routes/apiRoutes';
import Loader from '../../uikit/Loader/Loader';
import Flex from '../../uikit/Flex/Flex';
import SvgRoundClose from '../../icons/SvgRoundClose';
import { GARY_4 } from '../../uikit/Colors/colors';
import Text from '../../uikit/Text/Text';
import { fileAccept, FILE_2MB } from '../constValue';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import styles from './candidatedatabase.module.css';

type MyProps = {
  hanldeParsing: () => void;
  setParse: () => void;
  isBulkLoader: string | null;
  setUpgrade: (arg: boolean) => void;
  candidatesLimit: number;
  isjdId?: number;
  setmodel?: any;
};

type MyState = {
  files: any[];
  changedFileIndex: number;
  bulkDelete: boolean;
  setListName: any[];
  isMb: boolean;
  setmodel?: any;
};

class CandidateDatabase extends Component<MyProps, MyState> {
  fileUploaderRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      files: [],
      changedFileIndex: -1,
      bulkDelete: false,
      setListName: [],
      isMb: false,
    };
    this.fileUploaderRef = createRef();
  }

  // update file function
  Change(index: number) {
    this.setState({ changedFileIndex: index });
    this.fileUploaderRef.current.click();
  }

  // delete file function
  Delete(name: any[]) {
    this.setState((prevState) => {
      const list: any[] = [];
      // eslint-disable-next-line
      prevState.files.map((file, i) => {
        if (file.name !== name) {
          list.push(file);
        }
      });
      return {
        files: list,
        changedFileIndex: -1,
      };
    });
  }

  render() {
    const unique: any = [];
    this.state.files.map((x) =>
      unique.filter((a: any) => a.name === x.name).length > 0
        ? null
        : unique.push(x),
    );

    // file upload function
    const fileUpload = (e: any) => {
      const newSelectedFiles = Array.from(this.fileUploaderRef.current.files);
      console.log('zx', newSelectedFiles);
      const fileName = [...this.fileUploaderRef.current.files].map(
        (list) => list.name,
      );
      const fileSize = [...this.fileUploaderRef.current.files].map(
        (list) => list.size,
      );

      const filterFileName = fileName.filter(
        (item) =>
          !item.includes('.doc') &&
          !item.includes('.pdf') &&
          !item.includes('.txt'),
      );

      const filterFileNameOne = [...this.fileUploaderRef.current.files].filter(
        (item) =>
          (item.name.includes('.doc') && item.size / 1024 / 1024 < 2) ||
          (item.name.includes('.pdf') && item.size / 1024 / 1024 < 2) ||
          (item.name.includes('.txt') && item.size / 1024 / 1024 < 2),
      );

      const filterFileSize = fileSize.filter(
        (listSize) => listSize / 1024 / 1024 > 2,
      );

      if (filterFileName.length !== 0) {
        alert(
          'Invalid file selected, valid files are of ' +
            fileAccept.toString() +
            ' types.',
        );
      }
      if (filterFileSize.length !== 0) {
        this.setState({ isMb: true });
      } else {
        this.setState({ isMb: false });
      }

      if (this.state.changedFileIndex >= 0) {
        this.setState((prevState) => {
          const list: any[] = [];
          // eslint-disable-next-line
          prevState.files.map((file: any, i: number) => {
            if (i === prevState.changedFileIndex)
              list.push(filterFileNameOne[0]);
            else list.push(file);
          });
          return {
            files: list,
            changedFileIndex: -1,
          };
        });
      } else if (this.state.files.length > 0) {
        this.setState((prevState) => {
          return { files: [...prevState.files, ...filterFileNameOne] };
        });
      } else {
        this.setState({ files: [...filterFileNameOne] });
      }
    };

    // drag and drop file function
    const fileDrop = (e: {
      preventDefault: () => void;
      dataTransfer: { files: any };
    }) => {
      e.preventDefault();

      const fileName = [...e.dataTransfer.files].map((list) => list.name);
      const fileSize = [...e.dataTransfer.files].map((list) => list.size);

      const filterFileName = fileName.filter(
        (item) =>
          !item.includes('.doc') &&
          !item.includes('.pdf') &&
          !item.includes('.txt'),
      );

      const filterFileNameOne = [...e.dataTransfer.files].filter(
        (item) =>
          (item.name.includes('.doc') && item.size / 1024 / 1024 < 2) ||
          (item.name.includes('.pdf') && item.size / 1024 / 1024 < 2) ||
          (item.name.includes('.txt') && item.size / 1024 / 1024 < 2),
      );

      const filterFileSize = fileSize.filter(
        (listSize) => listSize / 1024 / 1024 > 2,
      );

      if (filterFileName.length !== 0) {
        alert(
          'Invalid file selected, valid files are of ' +
            fileAccept.toString() +
            ' types.',
        );
      }
      if (filterFileSize.length !== 0) {
        this.setState({ isMb: true });
      } else {
        this.setState({ isMb: false });
      }

      if (this.state.changedFileIndex >= 0) {
        this.setState((prevState) => {
          const list: any[] = [];
          // eslint-disable-next-line
          prevState.files.map((file: any, i: number) => {
            if (i === prevState.changedFileIndex)
              list.push(filterFileNameOne[0]);
            else list.push(file);
          });
          return {
            files: list,
            changedFileIndex: -1,
          };
        });
      } else if (this.state.files.length > 0) {
        this.setState((prevState) => {
          return { files: [...prevState.files, ...filterFileNameOne] };
        });
      } else {
        this.setState({ files: [...filterFileNameOne] });
      }
    };

    let formData = new FormData();

    for (let i = 0; i < unique.length; i++) {
      formData.append(`file`, unique[i]);
    }

    const resetFileInput = () => {
      this.fileUploaderRef.current.value = null;
    };

    // Clear Function
    const handleClear = () => this.setState({ files: [] });

    // Bulk Submit Function
    const hanldeBulkSubmit = () => {
      this.props.setmodel(false);
      if (
        this.props.candidatesLimit !== null &&
        this.props.candidatesLimit < this.state.files.length
      ) {
        this.props.setUpgrade(true);
      } else {
        this.props.setParse();
        axios
          .post(bulkImportApi, formData)
          .then(() => {
            handleClear();
            this.props.hanldeParsing();
            this.setState({ isMb: false });
          })
          .catch(() => {});
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

    const checkSelectLength = this.state.files.length === 0 ? false : true;
    const checkSelectLength500 = this.state.files.length < 501 ? true : false;
    console.log(checkSelectLength500, checkSelectLength);
    return (
      <>
        <Flex center>
          <Text bold size={14}>
            Add Attachment
          </Text>
          <CancelAndDeletePopup
            title={'Are you sure want to delete the files?'}
            btnCancel={() => this.setState({ bulkDelete: false })}
            btnDelete={() => {
              handleClear();
              this.setState({ bulkDelete: false });
            }}
            open={this.state.bulkDelete}
          />
          <Flex column>
            <Flex>
              <div
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
                className={styles.dragOver}
              >
                <Flex
                  center
                  middle={!checkSelectLength}
                  className={
                    this.props.isjdId !== 0
                      ? styles.boxBorder
                      : styles.boxBorderNone
                  }
                >
                  <input
                    type="file"
                    multiple
                    id="candidate__file_upload"
                    ref={this.fileUploaderRef}
                    onChange={fileUpload}
                    disabled={this.props.isjdId === 0}
                    className={styles.displayNone}
                    onClick={resetFileInput}
                    accept=".doc,.docx,.pdf,.txt"
                  />

                  {checkSelectLength ? (
                    <Flex columnFlex>
                      <Flex row wrap>
                        {unique.length !== 0 &&
                          unique.map((list: any, index: number) => {
                            return (
                              <Flex
                                key={list.name + index}
                                row
                                center
                                className={styles.listStyle}
                              >
                                <Text
                                  size={12}
                                  color={'primary'}
                                  style={{ width: '90px' }}
                                >
                                  {index + 1}.
                                  {list.name.substring(0, 10) + '...'}
                                </Text>
                                <div
                                  tabIndex={-1}
                                  role={'button'}
                                  onKeyPress={() => {}}
                                  className={styles.svgClose}
                                  onClick={() => this.Delete(list.name)}
                                >
                                  <SvgRoundClose
                                    fill={GARY_4}
                                    width={15}
                                    height={15}
                                  />
                                </div>
                              </Flex>
                            );
                          })}
                      </Flex>
                      <Flex>
                        {this.state.isMb && (
                          <Text
                            align="center"
                            size={12}
                            color="error"
                            style={{ marginTop: 4 }}
                          >
                            {FILE_2MB}
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                  ) : (
                    <Flex>
                      <Flex row center middle>
                        <Text color="gray">
                          {'Drag & Drop Resumes Here or'}
                        </Text>
                        <label
                          className={styles.labelStyle}
                          htmlFor={'candidate__file_upload'}
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
                        className={styles.uploadStyle}
                      >
                        (Upload only.txt,.doc,.docx,.pdf formats)
                      </Text>
                      {this.state.isMb && (
                        <Text
                          align="center"
                          size={12}
                          color="error"
                          style={{ marginTop: 4 }}
                        >
                          {FILE_2MB}
                        </Text>
                      )}
                    </Flex>
                  )}
                </Flex>
              </div>
            </Flex>

            {this.props.isBulkLoader === 'true' ? (
              <Flex row between className={styles.loaderStyle}>
                <Flex row>
                  <Loader size="medium" withOutOverlay />
                  <Text
                    color="gray"
                    style={{ marginLeft: 16, marginTop: '3px' }}
                  >
                    Processing...
                  </Text>
                </Flex>
              </Flex>
            ) : (
              <Fragment>
                <Flex row between>
                  <Flex
                    className={styles.btnContainer1}
                    style={{ justifyContent: 'none' }}
                  >
                    {checkSelectLength && (
                      <Button
                        onClick={() => this.setState({ bulkDelete: true })}
                        types="secondary"
                      >
                        Clear All
                      </Button>
                    )}
                  </Flex>
                  <Flex row className={styles.btnContainer}>
                    <Button
                      types="close"
                      onClick={() => this.props.setmodel(false)}
                    >
                      Cancel
                    </Button>

                    <Button
                      disabled={!checkSelectLength || !checkSelectLength500}
                      className={styles.btnStyle}
                      onClick={hanldeBulkSubmit}
                    >
                      Bulk Import
                    </Button>
                  </Flex>
                </Flex>
              </Fragment>
            )}
          </Flex>
        </Flex>
        {checkSelectLength && !checkSelectLength500 && (
          <Text size={12} style={{ color: 'red', paddingTop: 4 }}>
            You can import only up to 500 resumes at a time.
          </Text>
        )}
      </>
    );
  }
}

export default CandidateDatabase;
