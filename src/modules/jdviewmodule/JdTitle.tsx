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
  whatjob: any[];
  super_user: boolean;
  permission:any[]
};
const JdTitle = ({
  handleDownload,
  hanldeInactive,
  whatjob,
  jdDetails,
  career_page_url,
  super_user,
  permission
}: Props) => {
  
  const permissions = permission.includes('create_post')
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
          {permissions === true ? (


            <>
              {jdDetails.is_ds_role === true ? (
                <div className={styles.svgMargin} title="Duplicate Job">
                  <LinkWrapper
                    to={`/jobs/create_ds/${jdDetails.id}?duplicate=duplicate`}
                  >
                    <Text color="link" bold>
                      <SvgDuplicate width={19} height={19} fill={'#581845'} />
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
            </>
          ) : (
            ''
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
            <Flex row center>
              {whatjob.length !== 0 && (
                <Flex marginRight={10}>
                  {whatjob[0].jobposting_url !== null && (
                    <Flex>
                      <Flex>
                        {/* <a href={whatjob[0].jobposting_url} target='blank'>
               <Svgwhatjobs width={80} height={13}></Svgwhatjobs></a> */}

                        <a href={whatjob[0].jobposting_url} target="blank">
                          <Button types="secondary">View in WhatJobs</Button>
                        </a>
                      </Flex>
                    </Flex>
                  )}
                </Flex>
              )}
            </Flex>
            <LinkWrapper
              target={'_blank'}
              to={`/${career_page_url}/career_job_view/${jdDetails.id}/${jdDetails.job_title}`}
            >
              <Flex row>
                <Button types="primary">View in Careers Page</Button>
                <Flex className={styles.careerPage}></Flex>
              </Flex>
            </LinkWrapper>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default JdTitle;
