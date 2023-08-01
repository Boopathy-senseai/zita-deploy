import { Dropdown } from 'react-bootstrap';
import { Flex, Text } from '../../../uikit';
import { IEvent } from '../types';
import SvgDotMenu from '../../../icons/SvgDotMenu';
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

interface Props {
  list: IEvent[];
  deleteState: any;
  onJoin?: (doc: IEvent) => void;
  onEdit?: (doc: IEvent) => void;
  onDelete?: (doc: IEvent) => void;
}
const EventSchedulerScreen: React.FC<Props> = (props) => {
  const { list, deleteState, onJoin, onEdit, onDelete } = props;

  return (
    <div>
      <div className="table-responsisssve ">
        <div>
          <table className="table" style={{ paddingLeft: 'none' }}>
            <thead>
              <tr>
                <th className={styles.padchange}>
                  <Text bold className={styles.tableboarder}>
                    Event Title
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text bold className={styles.tableboarder}>
                    Date
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text bold className={styles.tableboarder}>
                    Timings
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text bold className={styles.tableboarder}>
                    Duration
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text bold className={styles.tableboarder}>
                    Event Type
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text bold className={styles.tableboarder}>
                    Interviewers
                  </Text>
                </th>{' '}
                <th className={styles.padchange}>
                  <Text bold className={styles.tableboarder}>
                    Organiser
                  </Text>
                </th>
                <th className={styles.padchange}>
                  <Text bold className={styles.tableboarderAction}>
                    Actions
                  </Text>
                </th>
              </tr>
            </thead>

            <tbody style={{ paddingTop: 20 }} className={styles.tablebody}>
              {list.map((doc, index) => {
                return (
                  <>
                    <tr style={{ height: 50 }}>
                      <td className={styles.padchanges} style={{}}>
                        <Text className={styles.stBold}>
                          {doc.event_id__event_name}
                        </Text>
                      </td>
                      <td className={styles.padchang}>
                        <Flex
                          row
                          top
                          //  className={styles.hellothere}
                        >
                          <Text className={styles.stBold}>{doc.date}</Text>
                        </Flex>
                      </td>
                      <td className={styles.padchanges}>
                        <Text className={styles.stBold}>{doc.time}</Text>
                      </td>
                      <td className={styles.padchanges}>
                        <Text className={styles.stBold}>
                          {doc.event_id__duration}
                        </Text>
                      </td>

                      <td className={styles.padchanges} style={{}}>
                        <Text className={styles.stBold}>
                          {doc.event_id__event_type}
                        </Text>
                      </td>
                      <td className={styles.padchanges} style={{}}>
                        <Text className={styles.stBold}>
                          {'Organiser'}
                          {/* backend  */}
                        </Text>
                      </td>
                      <td className={styles.padchanges} style={{}}>
                        <Text className={styles.stBold}>
                          {doc.event_id__interviewer}
                        </Text>
                      </td>
                      <td className={styles.padchangesmiddle}>
                        {/* <Text className={styles.stBold}> */}
                          <Dropdown className="dropdownButton   dropleft">
                            <Dropdown.Toggle
                              variant="success"
                              title="Actions"
                              id="dropdown-basic"
                              style={{
                                borderColor: 'unset !important',
                                backgroundColor: 'unset !important',
                                boxShadow: 'none !important',
                              }}
                            >
                              {/* <Flex center middle> */}
                                <SvgDotMenu
                                  width={14}
                                  height={14}
                                  fill="#581845"
                                />
                              {/* </Flex> */}
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ minWidth: '5rem' }}>
                              <Dropdown.Item onClick={() => onJoin(doc)}>
                                <Flex
                                  row
                                  center
                                  className={styles.dropDownListStyle}
                                >
                                  <Text style={{ marginLeft: 10 }}>Join</Text>
                                </Flex>
                              </Dropdown.Item>

                              <Dropdown.Item onClick={() => onEdit(doc)}>
                                <Flex
                                  row
                                  center
                                  className={styles.dropDownListStyle}
                                >
                                  <Text style={{ marginLeft: 10 }}>Edit</Text>
                                </Flex>
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => onDelete(doc)}>
                                <Flex
                                  row
                                  center
                                  className={styles.dropDownListStyle}
                                >
                                  <Text style={{ marginLeft: 10 }}>Delete</Text>
                                </Flex>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        {/* </Text> */}
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
