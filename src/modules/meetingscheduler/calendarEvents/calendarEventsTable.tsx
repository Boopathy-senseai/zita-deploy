import { Dropdown } from 'react-bootstrap';
import moment from 'moment';
import { Flex, Text } from '../../../uikit';
import {
  EVENT_FILTER_OPTION,
  ICalendarEvent,
  ICalendarEventInterviewer,
  ICalendarEventTableItem,
  IEvent,
  IEventInterviewer,
  IEventOrganiser,
  IEventTableItem,
} from '../types';
import SvgDotMenu from '../../../icons/SvgDotMenu';
import InterviewerIcon from '../../calendarModule/InterviewerIcon';
import SvgCalendar from '../../../icons/SvgCalendar';
import { JOIN_EVENTS } from '../utils';
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

  
  const showdate = (val) => {
    if(val !== undefined){
      const date = val.split('T');
    const parsedDate = moment(date[0]);
    const formattedDate = parsedDate.format('DD/MM/YYYY');
    return formattedDate;
    }
  };

  const calculateDuraton = (doc: ICalendarEventTableItem) => {
    const totalMinutes = moment(doc.e_time).diff(moment(doc.s_time), 'minutes');
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let result = '';

    if (hours > 0) {
      result = `${hours} hour${hours === 1 ? '' : 's'}`;
    }

    if (minutes > 0) {
      result = `${result} ${minutes} minutes`;
    }

    return result;
  };

  const renderInterviewers = (interviewrs: ICalendarEventInterviewer[]) => {
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

  const renderOrganiser = (interviewrs: IEventOrganiser[]) => {
    const show = interviewrs.slice(0, 4);
    const hidden = interviewrs.slice(4, interviewrs.length);
    return (
      <Flex row wrap>
        {show.map(
          (doc, sIndex) =>
            // <InterviewerIcon name={doc.full_name} key={sIndex} index={sIndex} />
            doc.full_name,
        )}
        {/* {hidden && hidden.length > 0 && (
          // <InterviewerIcon
          //   name={`+ ${hidden.length}`}
          //   title={hidden.map((doc) => doc.full_name).toString()}
          // />
          hidden.map((doc)=> doc.full_name)
          
        )} */}
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
      <table className="table" style={{ paddingLeft: 'none', height: 'fit-content' }}>
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
                        {/* {moment(doc.s_time).format('DD/MM/YYYY')} */}
                        {showdate(doc.s_time)}
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
                      {calculateDuraton(doc)}
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
                      {renderOrganiser(doc.organisers)}
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
                      {JOIN_EVENTS.includes(doc.event_type) && <Dropdown.Item onClick={() => onJoin(doc)}>
                          <Flex row center className={styles.dropDownListStyle}>
                            <Text style={{ marginLeft: 10 }}>Join</Text>
                          </Flex>
                        </Dropdown.Item>}

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
