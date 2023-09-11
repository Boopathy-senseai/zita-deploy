
import SvgCalendarEvent from "../../../icons/SvgCalendarEvent";
import SvgClock from "../../../icons/SvgClock";
import Flex from "../../../uikit/Flex/Flex";
import Text from '../../../uikit/Text/Text';
import Button from '../../../uikit/Button/Button';
import Loader from "../../../uikit/Loader/Loader";
import SvgInfo from "../../../icons/SvgInfo";
import SvgPersonFill from "../../../icons/SvgPersonFill";
import SvgPeopleFill from "../../../icons/SvgPeopleFill";
import SvgGlobe from "../../../icons/SvgGlobe";
import { MemberInterface, SlotterEntity } from "./ScheduleTypes";
import styles from './slotter.module.css';

type InterviewProps = {
    slotterdata : SlotterEntity[];
    slotmembers : MemberInterface[];
    dashboard : any,
    timezones : any;
    Loading : boolean;
    isLoading : boolean;
    candidate_name : string;
    FooterNavogation : () => void;
  
  }
  
  const InterviewDashBoard = ({
    slotterdata,
    slotmembers,
    dashboard,
    Loading,
    isLoading,
    candidate_name,
    timezones,
    FooterNavogation,
  
  }:InterviewProps) => {
  
    const formatDateChange = (dateString) => {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
  
      const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
  
      const [day, month, year] = dateString.split('/');
      const date = new Date(year, month - 1, day);
      const dayOfWeek = daysOfWeek[date.getDay()];
      const formattedDate = `${dayOfWeek}, ${
        months[parseInt(month) - 1]
      } ${day}, ${year}`;
  
      return formattedDate;
    };
  
    if (Loading) {
      return <Loader />;
    }
    return (
      <>
        <Flex className={styles.successTick}>
          {dashboard[0].company_logo !== '' && (
            <img
              src={`${process.env.REACT_APP_HOME_URL}media/${dashboard[0]?.company_logo}`}
              alt="Company Logo"
              style={{
                width: '75px',
                height: '75px',
                borderRadius: '50%',
                marginLeft: '7px',
                marginBottom: '15px',
                marginTop: '40px',
              }}
            />
          )}
          <Flex marginTop={30}>
            {dashboard.map((list: any, index) => (
              <Flex key={index} className={styles.dashboard}>
                <Flex row center>
                  <Text size={14} bold>
                    {list.company_name}
                  </Text>
                </Flex>
                <Text
                  bold
                  size={13}
                  style={{ margin: '10px 0px', textTransform: 'capitalize' }}
                >
                  {list.event_name}
                </Text>
                <Flex row center marginBottom={10}>
                  <SvgCalendarEvent width={14} height={14} fill={'#581845'} />
                  <Text size={13} style={{ marginLeft: '5px' }}>
                    {slotterdata.map((li) => li.time)},{' '}
                    {slotterdata.map((li) => formatDateChange(li.date))}
                  </Text>
                </Flex>
                <Flex row center marginBottom={10}>
                  <SvgClock width={14} height={14} fill={'#581845'} />
                  <Text size={13} style={{ marginLeft: '5px' }}>
                    {list.duration}
                  </Text>
                </Flex>
                <Flex row center marginBottom={10}>
                  <SvgGlobe width={14} height={14} fill={'#581845'} />
                  <Text style={{ marginLeft: '5px' }} size={13}>
                    Time zone is {timezones(list.times_zone)}
                  </Text>
                </Flex>
  
                <Flex row marginBottom={10}>
                  <Flex marginTop={3}>
                    <SvgInfo width={14} height={14} fill={'#581845'} />
                  </Flex>
  
                  <Text
                    size={13}
                    style={{
                      marginLeft: '5px',
                      textAlign: 'justify',
                      maxHeight : "150px", overflow : "auto"
                    }}
                  >
                    {list.description}
                  </Text>
                </Flex>
                <div className={styles.line} style={{ margin: '20px 0px' }}></div>
  
                <Flex row marginBottom={10}>
                  <Flex marginTop={3}>
                    <SvgPersonFill width={14} height={14} fill={'#581845'} />
                  </Flex>
  
                  <Flex>
                    <Text bold size={14} style={{ marginLeft: '5px' }}>
                      Candidate / Applicant
                    </Text>
                    <Text
                      size={13}
                      style={{ marginLeft: '5px', textTransform: 'capitalize' }}
                    >
                      {candidate_name}
                    </Text>
                  </Flex>
                </Flex>
  
                <Flex row>
                  <Flex marginTop={3}>
                    <SvgPeopleFill width={14} height={14} fill={'#581845'} />
                  </Flex>
  
                  <Flex>
                    <Text bold style={{ marginLeft: '5px' }}>
                      Interviewer(s)
                    </Text>
                    <Text
                      size={13}
                      style={{ marginLeft: '5px', textTransform: 'capitalize' }}
                    >
                      {slotmembers.map((data) => data.full_name).join(', ')}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex
          center
          bottom
          middle
          marginBottom={10}
          marginTop={10}
          onClick={FooterNavogation}
        >
          <Text
            bold
            style={{ cursor: 'pointer' }}
            size={14}
            color="theme"
          >
            Powered by Zita.ai
          </Text>
        </Flex>
      </>
    );
  };

export default InterviewDashBoard;