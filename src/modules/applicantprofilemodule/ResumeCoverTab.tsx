import { useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
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
          applicantProfileInitalReducers.cover_letter.length !== 0
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
          {isEmpty(cover_letter[0].cover_letter) ? (
            <Flex flex={1} center middle height={window.innerHeight-200} style={{color:'#979797'}}> 
              {notSpecified(cover_letter && cover_letter[0].cover_letter)} 
            </Flex>
          ) : (
            <Flex
            columnFlex
            className={styles.overAll}
            height={window.innerHeight - 160}
            style={{display:'flex'
               ,overflow:'scroll'}}
          > 
          <Text bold>Cover Letter</Text>
            <Text style={{fontSize:'13px',textAlign:'justify'}}>{cover_letter && cover_letter[0].cover_letter}</Text>
        </Flex>
          )}
         
       
             {/* <Collapse isOpen={true} noText={coverLetter}> */}
          {/* <pre */}
          {/* //   className={cx('preStyle', {
          //     textCenter: coverLetter,
          //   })}
          // > */}
            
        {/* //   </pre>
        // </Collapse>} */}

      {/* <Text bold color="theme" className={cx('resumeStyle')}>
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
          documents={docs}
          config={{
            header: {
              disableHeader: false,
              disableFileName: false,
              retainURLParams: false,
            },
          }}
        />
      </div> */}
    </>
  );
};

export default ResumeCoverTab;
