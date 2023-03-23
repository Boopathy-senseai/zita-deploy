import { Component, createRef, Fragment } from 'react';
import axios from 'axios';
import Button from '../../uikit/Button/Button';
import { bulkImportApi } from '../../routes/apiRoutes';
import Loader from '../../uikit/Loader/Loader';
import Flex from '../../uikit/Flex/Flex';
import SvgRoundClose from '../../icons/SvgRoundClose';
import { GARY_4 } from '../../uikit/Colors/colors';
import Text from '../../uikit/Text/Text';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import styles from './candidatedatabase.module.css';

type MyProps = {
  hanldeParsing: () => void;
  setParse: () => void;
  isBulkLoader: string | null;
  setUpgrade: (arg: boolean) => void;
  candidatesLimit: number;
};

type MyState = {
  files: any[];
  changedFileIndex: number;
  bulkDelete: boolean;
  setListName: any[];
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
    };
    this.fileUploaderRef = createRef();
  }

  fileUpload = (e: any) => {
    if (this.state.changedFileIndex >= 0) {
      this.setState((prevState) => {
        const list: any[] = [];
        // eslint-disable-next-line
        prevState.files.map((file: any, i: number) => {
          if (i === prevState.changedFileIndex) list.push(e.target.files[0]);
          else list.push(file);
        });
        return {
          files: list,
          changedFileIndex: -1,
        };
      });
    } else if (this.state.files.length > 0) {
      this.setState((prevState) => {
        return { files: [...prevState.files, ...e.target.files] };
      });
    } else this.setState({ files: [...e.target.files] });
  };

  Change(index: number) {
    this.setState({ changedFileIndex: index });
    this.fileUploaderRef.current.click();
  }

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
    let formData = new FormData();

    for (let i = 0; i < this.state.files.length; i++) {
      formData.append(`file`, this.state.files[i]);
    }

    // Clear Function
    const handleClear = () => this.setState({ files: [] });

    // Bulk Submit Function
    const hanldeBulkSubmit = () => {
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
    const fileDrop = (e: {
      preventDefault: () => void;
      dataTransfer: { files: any };
    }) => {
      e.preventDefault();

      if (this.state.changedFileIndex >= 0) {
        this.setState((prevState) => {
          const list: any[] = [];
          // eslint-disable-next-line
          prevState.files.map((file: any, i: number) => {
            if (i === prevState.changedFileIndex)
              list.push(e.dataTransfer.files[0]);
            else list.push(file);
          });
          return {
            files: list,
            changedFileIndex: -1,
          };
        });
      } else if (this.state.files.length > 0) {
        this.setState((prevState) => {
          return { files: [...prevState.files, ...e.dataTransfer.files] };
        });
      } else this.setState({ files: [...e.dataTransfer.files] });
    };

    const checkSelectLength = this.state.files.length === 0 ? false : true;

    return (
      <Flex row center className={styles.overAlll}>
        <CancelAndDeletePopup
          title={'Are you sure want to delete the files?'}
          btnCancel={() => this.setState({ bulkDelete: false })}
          btnDelete={() => {
            handleClear();
            this.setState({ bulkDelete: false });
          }}
          open={this.state.bulkDelete}
        />
        <div
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          className={styles.dragOver}
        >
          <Flex center middle={!checkSelectLength} className={styles.boxBorder}>
            <input
              type="file"
              multiple
              id="candidate__file_upload"
              ref={this.fileUploaderRef}
              onChange={this.fileUpload}
              className={styles.displayNone}
              accept=".doc,.docx,.pdf,.txt"
            />

            {checkSelectLength ? (
              <Flex row center wrap>
                {this.state.files.map((list: any, index) => {
                  return (
                    <Flex
                      key={list.name + index}
                      row
                      center
                      className={styles.listStyle}
                    >
                      <Text size={12} color={'gray'}>
                        {index + 1}.{list.name.substring(0, 10) + '...'}
                      </Text>
                      <div
                        tabIndex={-1}
                        role={'button'}
                        onKeyPress={() => {}}
                        className={styles.svgClose}
                        onClick={() => this.Delete(list.name)}
                      >
                        <SvgRoundClose fill={GARY_4} width={15} height={15} />
                      </div>
                    </Flex>
                  );
                })}
              </Flex>
            ) : (
              <Flex>
                <Flex row center middle>
                  <Text color="gray">{'Drag & Drop Resumes Here or'}</Text>
                  <label
                    className={styles.labelStyle}
                    htmlFor={'candidate__file_upload'}
                  >
                    <Text color="link">Browse Files</Text>
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
              </Flex>
            )}
          </Flex>
        </div>
        <Flex row center className={styles.btnContainer}>
          {this.props.isBulkLoader === 'true' ? (
            <Flex row center className={styles.loaderStyle}>
              <Loader size="medium" withOutOverlay />
              <Text color="gray" style={{ marginLeft: 16 }}>
                Processing...
              </Text>
            </Flex>
          ) : (
            <Fragment>
              <Button
                disabled={!checkSelectLength}
                className={styles.btnStyle}
                onClick={hanldeBulkSubmit}
              >
                Bulk Import
              </Button>
              {checkSelectLength && (
                <Text
                  onClick={() => this.setState({ bulkDelete: true })}
                  className={styles.clearStyle}
                  color={'link'}
                >
                  Clear All
                </Text>
              )}
            </Fragment>
          )}
        </Flex>
      </Flex>
    );
  }
}

export default CandidateDatabase;
