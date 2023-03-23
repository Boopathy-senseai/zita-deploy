import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { RootState } from '../../store';
import DocView from '../common/DocView';
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

  const file =
    process.env.REACT_APP_HOME_URL + 'media/' + candidate_details[0].file;

  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 230}
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
        <DocView file={file} />
      </div>
    </Flex>
  );
};

export default CandiDateResumeTab;
