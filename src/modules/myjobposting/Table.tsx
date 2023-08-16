import { useSelector } from 'react-redux';
// import { map } from 'highcharts';
// import SvgLocation from '../../icons/SvgLocation';
import SvgCopy from '../../icons/SvgCopy';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Text from '../../uikit/Text/Text';
import { RootState } from '../../store';
// import { isEmpty } from '../../uikit/helper';
// import Flex from '../../uikit/Flex/Flex';
// import MyJobsPostingData from './MyJobsPostingData';
import Flex from '../../uikit/Flex/Flex';
import { Pangination } from '../../uikit';
import { getDateString, isEmpty } from '../../uikit/helper';

import SvgMetrics from '../../icons/SvgMetrics';
import Toast from '../../uikit/Toast/Toast'; // eslint-disable-line
import styles from './myjobpostingscreen.module.css';
import MyJobPostingScreenStatus from './MyJobPostingScreenStatus';
import { FinalListEntity } from './myJobPostingTypes';

// import { myJobPostingDataReducers } from './store/reducer/myjobpostingreducer';

// import { FinalListEntity } from './myJobPostingTypes';
// import classNames from 'classnames';

export const copyToClipboard = (text: string, message?: string) => {
  if (typeof Window === 'undefined') return;
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  Toast(`${message}`, 'LONG', 'success');
};

export interface DateEntity {
  label: string;
  value: string;
}
export type MyJobFormProps = {
  jobTitle: string;
  jobId: string;
  postedOn: DateEntity;
  jobType: string;
  location: string;
};
type props={
  currentPage?:any;
  setCurrentPage?:any;
  
}
const MyJobPostingScreen = ({currentPage,setCurrentPage}:props) => {
  const {
    location_list,
    job_ids,
    job_title,
    final_list,
    Jobs_List,
    // is_loadingone,
     len_list,
    // is_loading,
    career_page_url,
    domain,
    // Permission,
  } = useSelector(
    ({
      myJobPosingReducers,
      myJobPostingDataReducers,
      permissionReducers,
    }: RootState) => ({
      Jobs_List: myJobPostingDataReducers.Jobs_List,
      location_list: myJobPosingReducers.location_list,
      job_ids: myJobPosingReducers.job_ids,
      job_title: myJobPosingReducers.job_title,
      final_list: myJobPostingDataReducers.final_list,
      len_list: myJobPostingDataReducers.len_list,
      is_loading: myJobPostingDataReducers.isLoading,
      is_loadingone: myJobPosingReducers.isLoading,
      career_page_url: myJobPostingDataReducers.career_page_url,
      domain: myJobPostingDataReducers.domain,
      Permission: permissionReducers.Permission,
    }),
  );

  type Props = {
    list: FinalListEntity;
    
  };
  const MyJobsPostingCount = ({ list }: Props) => {
    const zita_match = isEmpty(list.zita_match) ? '0' : list.zita_match;
    const invite_to_apply = isEmpty(list.invite_to_apply)
      ? '0'
      : list.invite_to_apply;
    const applicant = isEmpty(list.applicants) ? '0' : list.applicants;
  };
  const usersPerPage = 10;
  const pageCount = Math.ceil(len_list / usersPerPage);
  return (
    <div>
      {/* <div  style={{height:320}}>
     <table className="table"> */}
      <Flex className="table-responsisssve " style={{overflowY:'scroll'
   }} height={window.innerHeight-220} >  
          <table className="table" style={{ paddingLeft: 'none' }}>
            <thead style={{ position: 'sticky',
  top: 0,backgroundColor: 'white'}}>
              <tr>
                <th className={styles.padchange} >
                  <Text color="theme" bold className={styles.tabeboarder}>
                    Job Title
                  </Text>
                </th>
                <th className={styles.padchange} style={{ width:'130px'}}>
                  <Text color="theme" bold className={styles.tabeboarder}>
                    Job ID
                  </Text>
                </th>
                <th className={styles.padchange} style={{ width:'235px'}}>
                  <Text color="theme" bold className={styles.tabeboarder}>
                    Location
                  </Text>
                </th>
                <th className={styles.padchange} style={{ width:'88px'}}>
                  <Text color="theme" bold className={styles.tabeboarder}>
                    Zita Match
                  </Text>
                </th>
                <th className={styles.padchange} style={{ width:'124px'}}>
                  <Text color="theme" bold className={styles.tabeboarder}>
                    Invited to Apply
                  </Text>
                </th>
                <th className={styles.padchange} style={{ width:'90px'}}>
                  <Text color="theme" bold className={styles.tabeboarder}>
                    Applicants
                  </Text>
                </th>{' '}
                <th className={styles.padchange}style={{ width:'135px'}}>
                  <Text color="theme" bold className={styles.tabeboarder}>
                    Screening Status
                  </Text>
                </th>
                {/* <th className="text-center" scope="col">
                <Text color="theme" bold className={styles.tabeboarder}>
                  Metric
                </Text>
              </th> */}
                <th className={styles.padchange} style={{width:'70px'}}>
                  <Text color="theme" bold className={styles.tabeboarder}>
                    Status
                  </Text>
                </th>
                <th className={styles.padchange} style={{width:'100px'}}>
                  <Text color="theme" bold className={styles.tableboarder}>
                    Posted on
                  </Text>
                </th>
              </tr>
            </thead> 
            <tbody style={{ paddingTop: 20 }}  className={styles.tablebody} >
               
              {final_list &&
                Jobs_List &&
                location_list &&
                job_ids &&
                job_title &&
                final_list.map((list) => {
                  return (
                    <>
                      <tr style={{ height: 50 }}>
                        <td className={styles.padchang}>
                          <Flex row top className={styles.hellothere}>
                          {list.jd_status__label_name === 'Active' && (
                              <Flex row top >
                                <LinkWrapper
                                  to={`/job_view/${list.id}`} 
                                  className={styles.maxwidthjobtype}
                                >
                                  <Text color="link" bold title={list.job_title}   >
                                    {list.job_title}
                                  </Text>
                                </LinkWrapper>

                                <div
                                  tabIndex={0}
                                  role={'button'}
                                  style={{ marginLeft: 8 ,marginTop:1}}
                                  title="Copy the job posting URL from your careers page"
                                  onClick={() =>
                                    copyToClipboard(
                                      `${domain}/${career_page_url}/career_job_view/${list.id}/${list.job_title}`,
                                      'Link Copied',
                                    )
                                  }
                                  onKeyDown={() => {}}
                                >
                                  <SvgCopy
                                    width={11.33}
                                    height={13.33}
                                    fill={'#581845'}
                                  />
                                </div>
                              </Flex>
                            )}
                            {list.jd_status__label_name === 'Draft' && (
                              <Flex row top>
                                {list.is_ds_role !== true ? (
                                  <LinkWrapper
                                    to={`/jobs/create_non_ds_edit/${list.id}`}
                                    className={styles.maxwidthjobtype}
                                  >
                                    <Text color="link" bold title={list.job_title}  >
                                      {list.job_title}
                                    </Text>
                                  </LinkWrapper>
                                ) : (
                                  <LinkWrapper
                                    to={`/jobs/create_ds_edit/${list.id}`}
                                    className={styles.maxwidthjobtype}
                                  >
                                    <Text color="link" bold title={list.job_title}  >
                                      {list.job_title}
                                    </Text>
                                  </LinkWrapper>
                                )}
                                <div
                                  tabIndex={0}
                                  role={'button'}
                                  style={{ marginLeft: 8,marginTop:1,cursor:'default'}}
                                >
                                  <SvgCopy width={11.33}
                                  height={13.33}
                                  fill={'rgb(88 24 69/30%)'} />
                                  
                                </div>
                              </Flex>
                            )}

                            {list.jd_status__label_name === 'Inactive' && (
                              <Flex row top>
                                <LinkWrapper
                                  to={`/job_view/${list.id}`}
                                  className={styles.maxwidthjobtype}
                                >
                                  <Text color="link" bold title={list.job_title}  >
                                    {list.job_title}
                                  </Text>
                                </LinkWrapper>{' '}
                                <div
                                  tabIndex={0}
                                  role={'button'}
                                  style={{ marginLeft: 8,marginTop:1,cursor:'default'}}
                                >
                                  <SvgCopy  width={11.33}
                                  height={13.33} 
                                  fill={'rgb(88 24 69/30%)'}/>
                                </div>
                              </Flex>
                            )}
                            {list.jd_status__label_name === 'Questionnaire' && (
                              <Flex row top>
                                <LinkWrapper
                                  to={`/jobs/questionnaire/${list.id}`}
                                  className={styles.maxwidthjobtype}
                                >
                                  <Text color="link" bold title={list.job_title}  >
                                    {list.job_title}
                                  </Text>
                                </LinkWrapper>{' '}
                                <div
                                  tabIndex={0}
                                  role={'button'}
                                  style={{ marginLeft: 8,marginTop:1,cursor:'default'}}
                                >
                                  <SvgCopy  width={11.33}
                                  height={13.33} 
                                  fill={'rgb(88 24 69/30%)'}/>
                                </div>
                              </Flex>
                            )}
                            {list.jd_status__label_name === 'Preview' && (
                              <Flex row top>
                                <LinkWrapper
                                  to={`/jobs/preview/${list.id}`}
                                  className={styles.maxwidthjobtype}
                                >
                                  <Text color="link" bold title={list.job_title}  >
                                    {list.job_title}
                                  </Text>
                                </LinkWrapper>{' '}
                                <div
                                  tabIndex={0}
                                  role={'button'}
                                  style={{ marginLeft: 8,marginTop:1,cursor:'default'}}
                                >
                                  <SvgCopy  width={11.33}
                                  height={13.33}
                                  fill={'rgb(88 24 69/30%)'} />
                                </div>
                              </Flex>
                            )}
                          </Flex>
                        </td>
                        <td
                          style={{ fontSize: 13, fontWeight: 400 }}
                          className={styles.padchanges}
                        >
                          {list.job_id}
                        </td>
                        <td
                          style={{ fontSize: 13, width: 200, fontWeight: 400 }}
                          className={styles.padchanges}
                        >
                          {list.location}
                        </td>

                        {list.jd_status__label_name === 'Inactive' ? (
                          <td
                            style={{
                              fontSize: 13,
                            }}
                            className={styles.padchangesmiddle}
                          >
                            {isEmpty(list.zita_match) ? (
                              <Text className={styles.zeroorder}>0</Text>
                            ) : (
                              <Text className={styles.numberorder}>
                                {list.zita_match}
                              </Text>
                            )}
                          </td>
                        ) : (
                          <td
                            style={{
                              fontSize: 13,
                            }}
                            className={styles.hovercolormiddle}
                          >
                            {isEmpty(list.zita_match) ? (
                              <Text className={styles.zeroorder}>0</Text>
                            ) : (
                              <Text className={styles.numberorder}>
                                {' '}
                                <LinkWrapper
                                  target={'_parent'}
                                  to={`/zita_match_candidate/${list.id}`}
                                  className={styles.zitamatch}
                                >
                                  {list.zita_match}
                                </LinkWrapper>
                              </Text>
                            )}
                          </td>
                        )}
                        {list.jd_status__label_name === 'Inactive' ? (
                          <td
                            style={{
                              fontSize: 13,
                            }}
                            className={styles.padchangesmiddle}
                          >
                            {isEmpty(list.invite_to_apply) ? (
                              <Text className={styles.zeroorder}>0</Text>
                            ) : (
                              <Text className={styles.numberorder}>
                                {list.invite_to_apply}
                              </Text>
                            )}
                          </td>
                        ) : (
                          <td
                            style={{
                              fontSize: 13,
                            }}
                            className={styles.padchangesmiddle}
                          >
                            {isEmpty(list.invite_to_apply) ? (
                              <Text className={styles.zeroorder}>0</Text>
                            ) : (
                              <Text className={styles.numberorder}>
                                <LinkWrapper
                                  target={'_parent'}
                                  to={`/zita_match_candidate/${list.id}`}
                                  className={styles.zitamatch}
                                >
                                  {list.invite_to_apply}
                                </LinkWrapper>
                              </Text>
                            )}
                          </td>
                        )}
                        {list.jd_status__label_name === 'Inactive' ? (
                          <td
                            style={{
                              fontSize: 13,
                            }}
                            className={styles.hovercolormiddle}
                          >
                            {isEmpty(list.applicants) ? (
                              <Text className={styles.zeroorder}>0</Text>
                            ) : (
                              <Text className={styles.numberorder}>
                                {' '}
                                <LinkWrapper
                                  target={'_parent'}
                                  to={`/applicant_pipe_line/${list.id}`}
                                  className={styles.zitamatch}
                                >
                                  {list.applicants}
                                </LinkWrapper>
                              </Text>
                            )}
                          </td>
                        ) : (
                          <td
                            style={{
                              fontSize: 13,
                            }}
                            className={styles.hovercolormiddle}
                          >
                            {isEmpty(list.applicants) ? (
                              <Text className={styles.zeroorder}>0</Text>
                            ) : (
                              <Text className={styles.numberorder}>
                                {' '}
                                <LinkWrapper
                                  target={'_parent'}
                                  to={`/applicant_pipe_line/${list.id}`}
                                  className={styles.zitamatch}
                                >
                                  {list.applicants}
                                </LinkWrapper>
                              </Text>
                            )}
                          </td>
                        )}

                        <td className={styles.padchanges} style={{}}>
                          <MyJobPostingScreenStatus list={list} />
                        </td>
                        {/* <td>
                        {list.jd_status__label_name === "Active" ? (
                          <LinkWrapper to={`/job_view/${list.id}`}>
                            <SvgMetrics
                              width={21}
                              height={21}
                              fill={"#FCC203"}
                            />
                          </LinkWrapper>
                        ) : (
                          <LinkWrapper to={`/job_view/${list.id}`}>
                            <SvgMetrics
                              width={21}
                              height={21}
                              fill={"#333333"}
                            />
                          </LinkWrapper>
                        )}
                      </td> */}

                        <td className={styles.padchanges}>
                          {list.jd_status__label_name === 'Active' ? (
                            <div
                              style={{
                                color: '#00BE4B',
                                fontWeight: 600,
                                fontSize: 13,
                              }}
                            >
                              {list.jd_status__label_name}{' '}
                            </div>
                          ) : (
                            ''
                          )}
                          {list.jd_status__label_name === 'Draft' ? (
                            <div
                              style={{
                                color: '#FCC203',
                                fontWeight: 600,
                                fontSize: 13,
                              }}
                            >
                              {list.jd_status__label_name}{' '}
                            </div>
                          ) : (
                            ''
                          )}
                          {list.jd_status__label_name === 'Preview' ||
                          list.jd_status__label_name === 'Questionnaire' ? (
                            <div
                              style={{
                                color: '#FCC203',
                                fontWeight: 600,
                                fontSize: 13,
                              }}
                            >
                              {'Draft'}{' '}
                            </div>
                          ) : (
                            ''
                          )}
                          {list.jd_status__label_name === 'Inactive' ? (
                            <div
                              style={{
                                color: 'red',
                                fontWeight: 600,
                                fontSize: 13,
                              }}
                            >
                              {list.jd_status__label_name}{' '}
                            </div>
                          ) : (
                            ''
                          )}
                        </td>
                        <td
                          style={{ fontSize: 13 }}
                          className={styles.padchanges}
                        >
                          {getDateString(list.job_posted_on_date, 'll')}
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
            {/* </Flex> */}
          </table> 
               {len_list > 10 && (
              <Flex middle className={styles.pagination}>
                <Pangination
                  maxPages={pageCount - 1}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </Flex>
            )}
      </Flex>

    </div>
  );
};

export default MyJobPostingScreen;
