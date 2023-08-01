import SvgDownload from '../../icons/SvgDownload';
import SvgDuplicate from '../../icons/SvgDuplicate';
import SvgInactivate from '../../icons/SvgInactivate';
import Svgwhatjobs from '../../icons/Svgwhatjobs';
import { LINK } from '../../uikit/Colors/colors';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { Button } from '../../uikit';
import SvgRight from '../../icons/SvgRight';
import SvgNewTab from '../../icons/SvgNewTab';
import { Jd } from './jdViewTypes';
import styles from './jdtitle.module.css';

type Props = {
  handleDownload: () => void;
  hanldeInactive: () => void;
  jdDetails: Jd;
  career_page_url: string;
  whatjob:any[];
};
const JdTitle = ({
  handleDownload,
  hanldeInactive,
  whatjob,
  jdDetails,
  career_page_url,
}: Props) => {
  return (
    <Flex>
    {/* <Flex row className={styles.ribbon} between>
          

          <Flex  row marginTop={10} marginLeft={8} >
            <Flex>
            <Text size={16} bold color="theme" >
              Job Posting 
            </Text></Flex>
            <Flex  marginTop={8} marginLeft={8} >
            <SvgRight fill={'#581845'} ></SvgRight></Flex>
            <Flex  marginTop={1} marginLeft={3}>
            <Text size={16} bold color="theme" >
            {jdDetails.job_title}</Text>
            </Flex>

          </Flex>
          <Flex >

            <div className={styles.triangle}></div>
          </Flex>
        
      </Flex> */}
    <Flex row center between className={styles.jobDesFlex}>
      <Flex row center>
        <Text size={14} bold color="theme" style={{ marginRight: 15 }}>
          {jdDetails.job_title}
        </Text>
        {jdDetails.is_ds_role === true ? (
          <div className={styles.svgMargin} title="Duplicate Job">
            <LinkWrapper
              to={`/jobs/create_ds/${jdDetails.id}?duplicate=duplicate`}
            >
              <Text color="link" bold>
                <SvgDuplicate width={19} height={19} fill={'#581845'}/>
              </Text>
            </LinkWrapper>
          </div>
        ) : (
          <div className={styles.svgMargin} title="Duplicate Job">
            <LinkWrapper to={`/jobs/create_non_ds/${jdDetails.id}`}>
              <Text color="link" bold>
                <SvgDuplicate width={19} height={19} />
              </Text>
            </LinkWrapper>
          </div>
        )}
        {jdDetails.jd_status__label_name === 'Active' && (
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
        )}
        {jdDetails.jd_status__label_name === 'Inactive' && (
          <div
            tabIndex={-1}
            role={'button'}
            title="Inactivated Job"
            className={styles.svgMargin}
          >
            <SvgInactivate width={19} height={19} fill={'#979797'} />
          </div>
        )}
        {/* <div
          tabIndex={-1}
          role={'button'}
          onKeyPress={() => {}}
          onClick={handleDownload}
          title="Download JD"
          className={styles.svgMargin}
        >
          <SvgDownload width={19} height={19} />
        </div> */}
      </Flex>
      {jdDetails.jd_status__label_name === 'Active' && (
        <Flex row center>
          <LinkWrapper
            target={'_blank'}
            to={`/${career_page_url}/career_job_view/${jdDetails.id}/${jdDetails.job_title}`}
          >
            <Flex row>
      {/* )} */}
      <Flex marginTop={5} marginRight={10}>
        <Text size={14} className={styles.viewin}>View In:</Text>
      </Flex>
      {whatjob.length!==0 &&
       
       <Flex>
         {whatjob[0].jobposting_url!==null &&
         <Flex>
   
               <Flex marginTop={5} marginRight={25}>
               <a href={whatjob[0].jobposting_url} >
               <Svgwhatjobs></Svgwhatjobs></a></Flex></Flex>
             
         }
       </Flex>
     }
       <Button types='primary'>
           
              View in Careers Page
            </Button>
            <Flex className={styles.careerPage}>
          
            </Flex>
            </Flex>
          </LinkWrapper>
        </Flex>
      )}
    </Flex></Flex>
  );
};

export default JdTitle;
