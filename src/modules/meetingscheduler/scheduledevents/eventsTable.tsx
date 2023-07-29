import { useSelector } from 'react-redux';
import { SvgCopy } from '../../../icons';
import { RootState } from '../../../store';
import { Flex, LinkWrapper, Toast, Text } from '../../../uikit';
import { getDateString, isEmpty } from '../../../uikit/helper';
import styles from './eventsTable.module.css';

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
const EventSchedulerScreen = () => {
  const {
    location_list,
    job_ids,
    job_title,
    final_list,
    Jobs_List,
    // is_loadingone,
    // len_list,
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

  return (
    <div>
      <div className="table-responsisssve ">
        <div>
          <table className="table" style={{ paddingLeft: 'none' }}>
            <thead>
              <tr>
                <th className={styles.padchange}>
                  <Text color="theme" bold className={styles.tableboarder}>
                    Date
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text color="theme" bold className={styles.tableboarder}>
                    Timings
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text color="theme" bold className={styles.tableboarder}>
                    Duration
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text color="theme" bold className={styles.tableboarder}>
                    Event Title
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text color="theme" bold className={styles.tableboarder}>
                    Event Type
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text color="theme" bold className={styles.tableboarder}>
                    Interviewers
                  </Text>
                </th>{' '}
                <th className={styles.padchange}>
                  <Text color="theme" bold className={styles.tableboarder}>
                    Organiser
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text color="theme" bold>
                    Actions
                  </Text>
                </th>
              </tr>
            </thead>

            <tbody style={{ paddingTop: 20 }} className={styles.tablebody}>
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
                            <LinkWrapper
                              to={`/job_view/${list.id}`}
                              className={styles.hovercol}
                            >
                              {list.job_title}
                            </LinkWrapper>
                          </Flex>
                        </td>
                        <td
                          style={{ fontSize: 15, fontWeight: 400 }}
                          className={styles.padchanges}
                        >
                          {list.job_id}
                        </td>
                        <td
                          style={{ fontSize: 15, width: 200, fontWeight: 400 }}
                          className={styles.padchanges}
                        >
                          {list.location}
                        </td>

                        {list.jd_status__label_name === 'Inactive' ? (
                          <td
                            style={{
                              fontSize: 15,
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
                              fontSize: 15,
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
                              fontSize: 15,
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
                              fontSize: 15,
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
                              fontSize: 15,
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
                              fontSize: 15,
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
                          {/* <MyJobPostingScreenStatus list={list} /> */}
                        </td>

                        <td className={styles.padchanges}>
                          {list.jd_status__label_name === 'Active' ? (
                            <div
                              style={{
                                color: '#00BE4B',
                                fontWeight: 500,
                                fontSize: 15,
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
                                fontWeight: 500,
                                fontSize: 15,
                              }}
                            >
                              {list.jd_status__label_name}{' '}
                            </div>
                          ) : (
                            ''
                          )}
                          {list.jd_status__label_name === 'Preview' ? (
                            <div
                              style={{
                                color: '#FCC203',
                                fontWeight: 500,
                                fontSize: 15,
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
                                fontWeight: 500,
                                fontSize: 15,
                              }}
                            >
                              {list.jd_status__label_name}{' '}
                            </div>
                          ) : (
                            ''
                          )}
                        </td>
                        <td
                          style={{ fontSize: 15 }}
                          className={styles.padchanges}
                        >
                          {getDateString(list.job_posted_on_date, 'll')}
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventSchedulerScreen;
