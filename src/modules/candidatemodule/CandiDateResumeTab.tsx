import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import classNames from 'classnames/bind';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { RootState } from '../../store';
import styles from './candidateresumetab.module.css';

const cx = classNames.bind(styles);

const CandiDateResumeTab = () => {
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

  const docs = [{ uri: file }];
  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight -68}
    >
      <Text bold color="theme" className={cx('resumeStyleOne')}>
        Resume
      </Text>
      <div
        style={{
          height: window.innerHeight - 40,
          overflow: 'scroll',
        }}
      >
        <DocViewer
          style={{ height: '100%',width:'100%' }}
          pluginRenderers={DocViewerRenderers}
          config={{
            header: {
              disableHeader: false,
              disableFileName: false,
              retainURLParams: false,
            },
          }}
          documents={docs}
        />
      </div>
    </Flex>
  );
};

export default CandiDateResumeTab;
