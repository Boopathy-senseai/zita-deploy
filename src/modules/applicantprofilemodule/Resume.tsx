import { useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Tab from '../../uikit/Tabs/Tab';
import Collapse from '../../uikit/Collapse/Collapse';
import SvgAngle from '../../icons/SvgAngle';
import { isEmpty, notSpecified } from '../../uikit/helper';
import { RootState } from '../../store';
import styles from './resumecover.module.css';

const cx = classNames.bind(styles);

const ResumeCoverTab = () => {
  const [isOpen, setOpen] = useState(false);

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

  const coverLetter =
    notSpecified(cover_letter && cover_letter[0].cover_letter) ===
    'Not Specified'
      ? true
      : false;

  const docs = [{ uri: file }];
  return (
    <>
    {candidate_details[0].file === null?
      <Flex center middle height={window.innerHeight}>
        <Text color='gray'>Not Specified </Text> 
      </Flex>
      :
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 97}
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
      {console.log(candidate_details[0].file,'ggggggggggggggggggggggggggggggggggggggggggdddd')}
     
      <div
      className={cx('border')}
        style={{
          height: window.innerHeight - 40,
          overflow: 'scroll',
        }}
      >
        <DocViewer
          style={{ height: '100%',width:'100%',
          maxWidth: '550px'}}
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          config={{
            header: {
              disableHeader: false,
              disableFileName: false,
              retainURLParams: false,
            },
          }}
        />
      </div>
      
    </Flex>}
    </>
  );
};

export default ResumeCoverTab;
