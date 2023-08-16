import { Dropdown } from 'react-bootstrap';
import moment from 'moment';
import { Flex, Text } from '../../../uikit';
import {
  EVENT_FILTER_OPTION,
  ICalendarEvent,
  ICalendarEventTableItem,
  IEvent,
  IEventInterviewer,
  IEventTableItem,
} from '../types';
import SvgDotMenu from '../../../icons/SvgDotMenu';
import InterviewerIcon from '../../calendarModule/InterviewerIcon';
import SvgCalendar from '../../../icons/SvgCalendar';
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
  list: ICalendarEventTableItem[];
  pastEvents: boolean;
  deleteState: any;
  activeRadio: EVENT_FILTER_OPTION;
  onJoin?: (doc: ICalendarEvent) => void;
  onEdit?: (doc: ICalendarEvent) => void;
  onDelete?: (doc: ICalendarEvent) => void;
}
const CalendarEventsTable: React.FC<Props> = (props) => {
  const {
    pastEvents,
    list,
    activeRadio,
    deleteState,
    onJoin,
    onEdit,
    onDelete,
  } = props;

  const renderInterviewers = (interviewrs: IEventInterviewer[]) => {
    const show = interviewrs.slice(0, 4);
    const hidden = interviewrs.slice(4, interviewrs.length);
    return (
      <Flex row wrap>
        {show.map((doc, sIndex) => (
          <InterviewerIcon name={doc.full_name} key={sIndex} index={sIndex} />
        ))}
        {hidden && hidden.length > 0 && (
          <InterviewerIcon
            name={`+ ${hidden.length}`}
            title={hidden.map((doc) => doc.full_name).toString()}
          />
        )}
      </Flex>
    );
  };

  const renderTable = () => {
    if (list.length === 0) {
      return (
        <Flex
          column
          center
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Flex marginBottom={10}>
            <SvgCalendar
              width={38}
              height={38}
              fill={'#888888'}
              stroke={'#888888'}
            />
          </Flex>
          <Text style={{ color: '#888888' }}>{`No ${
            activeRadio === EVENT_FILTER_OPTION.PAST_AND_UPCOMING
              ? pastEvents
                ? 'past'
                : 'upcoming'
              : ''
          } calendar events`}</Text>
        </Flex>
      );
    }
    return (
      <table className="table" style={{ paddingLeft: 'none' }}>
        <thead>
          <tr>
            <th className={styles.hpadchange}>
              <Text bold className={styles.tableboarder}>
                Event Title
              </Text>
            </th>
            <th className={styles.hpadchange}>
              <Text bold className={styles.tableboarder}>
                Date
              </Text>
            </th>
            <th className={styles.hpadchange}>
              <Text bold className={styles.tableboarder}>
                Timings
              </Text>
            </th>
            <th className={styles.hpadchange}>
              <Text bold className={styles.tableboarder}>
                Duration
              </Text>
            </th>
            <th className={styles.hpadchange}>
              <Text bold className={styles.tableboarder}>
                Event Type
              </Text>
            </th>
            <th className={styles.hpadchange}>
              <Text bold className={styles.tableboarder}>
                Interviewers
              </Text>
            </th>{' '}
            <th className={styles.hpadchange}>
              <Text bold className={styles.tableboarder}>
                Organiser
              </Text>
            </th>
            <th className={styles.hpadchange}>
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
                      {`${doc.event_type} with ${doc.applicant}`}
                      {/*  TODO: Change into event title or name  */}
                    </Text>
                  </td>
                  <td className={styles.padchang}>
                    <Flex
                      row
                      top
                      //  className={styles.hellothere}
                    >
                      <Text className={styles.stBold}>
                        {moment(doc.s_time).format('DD/MM/YYYY')}
                      </Text>
                    </Flex>
                  </td>
                  <td className={styles.padchanges}>
                    <Text className={styles.stBold}>{`${moment(
                      doc.s_time,
                    ).format('hh:mm A')} - ${moment(doc.e_time).format(
                      'hh:mm A',
                    )}`}</Text>
                  </td>
                  <td className={styles.padchanges}>
                    <Text className={styles.stBold}>
                      
                     {(moment(doc.e_time).diff(moment(doc.s_time)))/(60 * 60 * 1000)} 
                     
                      {`${moment(doc.e_time).diff(
                        moment(doc.s_time),
                        'minutes',
                      )} minutes`}
                      {/* /// TODO: calculate duration based on s_time & e_time */}
                    </Text>
                  </td>

                  <td className={styles.padchanges} style={{}}>
                    <Text className={styles.stBold}>{doc.event_type}</Text>
                  </td>
                  <td className={styles.padchanges} style={{}}>
                    {renderInterviewers(doc.interviewers)}
                  </td>
                  <td className={styles.padchanges} style={{}}>
                    <Text className={styles.stBold}>
                      {'Organiser'}
                      {/* backend  */}
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
                        <SvgDotMenu width={14} height={14} fill="#581845" />
                        {/* </Flex> */}
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ minWidth: '5rem' }}>
                        <Dropdown.Item onClick={() => onJoin(doc)}>
                          <Flex row center className={styles.dropDownListStyle}>
                            <Text style={{ marginLeft: 10 }}>Join</Text>
                          </Flex>
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => onEdit(doc)}>
                          <Flex row center className={styles.dropDownListStyle}>
                            <Text style={{ marginLeft: 10 }}>Edit</Text>
                          </Flex>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onDelete(doc)}>
                          <Flex row center className={styles.dropDownListStyle}>
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
    );
  };

  return (
    <Flex column style={{ height: '100%' }}>
      {renderTable()}
    </Flex>
  );
};

export default CalendarEventsTable;
