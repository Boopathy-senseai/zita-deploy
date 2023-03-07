import SvgDownload from '../../icons/SvgDownload';
import SvgDuplicate from '../../icons/SvgDuplicate';
import SvgInactivate from '../../icons/SvgInactivate';
import { LINK, } from '../../uikit/Colors/colors';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgNewTab from '../../icons/SvgNewTab';
import { Jd } from './jdViewTypes';
import styles from './jdtitle.module.css';

type Props = {
  handleDownload: () => void;
  hanldeInactive: () => void;
  jdDetails: Jd;
};
const JdTitle = ({ handleDownload,hanldeInactive, jdDetails }: Props) => {
  return (
    <Flex row center between className={styles.jobDesFlex}>
      <Flex row center>
        <Text size={20} bold color="theme" style={{marginRight:25}}>
          Job Title: {jdDetails.job_title}
        </Text>
         { jdDetails.is_ds_role === true  ?
        <div className={styles.svgMargin} title="Duplicate Job">
       
          <LinkWrapper to={`/jobs/create_ds/${jdDetails.id}`}>
          <Text color="link" bold>
     <SvgDuplicate width={19} height={19} />
          </Text>
        </LinkWrapper>
        </div>
        :  

     <div className={styles.svgMargin}    title="Duplicate Job">
      <LinkWrapper to={`/jobs/create_non_ds/${jdDetails.id}`}>
          <Text color="link" bold>
     <SvgDuplicate width={19} height={19} />
          </Text>
        </LinkWrapper>
        </div>

         }
        { jdDetails.jd_status__label_name === 'Active' && (
        <div
          tabIndex={-1}
          role={'button'}
          onKeyPress={() => {}}
          onClick={hanldeInactive}
          title="Inactivate Job"
          className={styles.svgMargin}
        >
          <SvgInactivate width={19} height={19} fill={'#581845'} />
        </div>
        )}  { jdDetails.jd_status__label_name === 'Inactive' && (
        <div
          tabIndex={-1}
          role={'button'}
          title="Inactivated Job"
          className={styles.svgMargin}
        >
          <SvgInactivate width={19} height={19} fill={'#979797'} />
        </div>
        )}
        <div
          tabIndex={-1}
          role={'button'}
          onKeyPress={() => {}}
          onClick={handleDownload}
          title="Download JD"
          className={styles.svgMargin}
        >
          <SvgDownload width={19} height={19} />
        </div>
      </Flex>
      { jdDetails.jd_status__label_name === 'Active' && (
      <Flex row center>
       <LinkWrapper target={'_blank'} to={`/jobs/create_non/${jdDetails.id}`}>

        <Text bold size={18} color="link" className={styles.viewText}>
          View in Career Page
        </Text>
        <SvgNewTab fill={LINK}  />
         </LinkWrapper>
      </Flex>)}
    </Flex>
  );
};

export default JdTitle;
