import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Dropdown } from 'react-bootstrap';
import { RootState } from '../../store';
import { mediaPath } from '../constValue';
import { calendarRoute } from '../../appRoutesPath';
import Svgeditingnotes from '../../icons/editingnotes';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgDotMenu from '../../icons/SvgDotMenu';
import { Button, LinkWrapper } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import { firstNameChar, getDateString, isEmpty } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import styles from './interviewscorecardtab.module.css';
// import { applicantIntegratemailReducers } from './store/reducer/applicantProfileReducer';
// import { googleEditEventMiddleware, outlookEditEventMiddleware } from '../calendarModule/store/middleware/calendarmiddleware';
// import { EventEntity } from './applicantProfileTypes';
const cx = classNames.bind(styles);
interface Props {
  handleEditEvent: () => void;
}
export const meetingTitle = () => [
  {
    title: 'Event Title',
    dataIndex: 'title',
    key: 'title',
    flex: 3,
    render: (value: string) => (
      <Text
        style={{
          textOverflow: 'ellipsis',
          overflow: ' hidden',
          whiteSpace: 'nowrap',
          maxWidth: '350px',
          fontSize: '13px',
        }}
        title={value}
      >
        {value}
      </Text>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    index: 'index',
    flex: 1,
    render: (value: string) => (
      <Flex>
        <Text size={12}>{getDateString(value, 'll')}</Text>
      </Flex>
    ),
  },
  {
    title: 'Timings',
    dataIndex: 'time',
    key: 'time',
    flex: 1.5,
    render: (value: string) => (
      <Flex>
        <Text style={{ fontSize: '13px' }}>{value}</Text>
      </Flex>
    ),
  },
  {
    title: 'Duration',
    dataIndex: 'Time',
    key: 'Time',
    index: 'index',
    flex: 1.5,

    render: (value: number, index) => {
      const [duration, setduration] = useState(value);
      const [hours, sethours] = useState<any>();
      const [minutes, setminutes] = useState<any>();
      useEffect(() => {
        const values = Math.floor(value / 60);
        sethours(values);
        const min = value % 60;
        setminutes(min);
      }, [value]);
      return (
        <Flex between row style={{ borderRight: 'none', display: 'flex' }}>
          {hours === 0 ? '' : hours} {hours === 0 ? '' : 'Hour'}
          {minutes === 0 ? '' : ' '} {minutes === 0 ? '' : minutes}
          {minutes === 0 ? '' : ' Minutes'}
        </Flex>
      );
    },
  },
  {
    title: 'Created By',
    dataIndex: 'organizer',
    key: 'organizer',
    index: 'index',
    flex: 2,
    render: (value: string, index) => {
      const [isColor, setColor] = useState<string[]>([]);
      useEffect(() => {
        // checkAuth();
        const colorCode = [
          '#d08014',
          '#d04343',
          '#db1f77',
          '#c0399f',
          '#6367de',
          '#286eb4',
          '#0f828f',
          '#7ca10c',
          '#925ace',
          '#647987',
        ];

        setColor(colorCode);
      }, []);
      return (
        <Flex row center>
          {isEmpty(index.organizer.image) ? (
            <div
              className={cx('profile')}
              style={{
                backgroundColor: isColor[index.index % isColor.length],
              }}
            >
              {}
              <Text
                color="black"
                transform="uppercase"
                className={styles.firstlastchar}
              >
                {index.organizer.user__first_name.charAt(0)}
                {index.organizer.user__last_name.charAt(0)}
              </Text>
            </div>
          ) : (
            <img
              alt="profile"
              height={30}
              width={30}
              style={{
                borderRadius: '100%',
                objectFit: 'cover',
                marginRight: 8,
                height: 30,
                width: 30,
              }}
              src={mediaPath + index.organizer.image}
            />
          )}

          <Flex style={{ fontSize: '13px' }} middle>
            {index.organizer.user__first_name +
              ' ' +
              index.organizer.user__last_name}
          </Flex>
        </Flex>
      );
    },
  },
  {
    title: 'Action',
    dataIndex: 'web_url',
    key: 'web_url',
    align: 'center',
    index: 'index',

    render: (value: string, index) => {
      const history = useHistory();
      const handleClick = () => {
        
        const phrase = index.title;
        const match = phrase.match(/^\w+/);
  const firstWord = match ? match[0] : '';
        if(firstWord === 'Microsoft'){
        window.open(calendarRoute);
        localStorage.setItem('eventhandeler', 'true');
        localStorage.setItem('eventhandelerid', value);
        localStorage.setItem('checkstatus','OUTLOOK');}
      
      else {
        window.open(calendarRoute);
        localStorage.setItem('eventhandeler', 'true');
        localStorage.setItem('eventhandelerid', value);
        localStorage.setItem('checkstatus','GOOGLE');}
      };
      const schedulehandleClick = () => {
        window.open(calendarRoute);
        localStorage.setItem('scheduleven', 'false');
      };
      const { can_id, jd_id, mail } = useSelector(
        ({
          applicantProfileInitalReducers,
          applicantIntegratemailReducers,
        }: RootState) => {
          return {
            can_id: applicantProfileInitalReducers.can_id,
            jd_id: applicantProfileInitalReducers.jd_id,
            mail: applicantIntegratemailReducers.mail,
          };
        },
      );
      const joiningUrl=()=>{
        window.open(index.join_url,'_blank')
      } 
      return (
        <Flex
          between
          row
          style={{ borderRight: 'none', display: 'flex' }}
          center
          middle
        >
          <Dropdown className="dropdownButton dropleft">
            <Dropdown.Toggle
              // onClick={handleOpenPopup}
              style={{
                borderColor: 'unset',
                backgroundColor: 'unset',
                boxShadow: 'none',
                padding: '0px',
                marginRight: '5px',
              }}
              id="dropdown-basic"
            >
              {/* <SvgEditStages height={16} width={16} /> */}
              <SvgDotMenu width={16} height={16} fill="#581845" />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: '5rem' }}>
              <Dropdown.Item onClick={() => handleClick()}>
                <Flex row center className={styles.dropDownListStyle}>
                  <Text style={{ cursor: 'pointer' }}>Edit</Text>
                </Flex>
              </Dropdown.Item>

              <Dropdown.Item
             onClick={joiningUrl}
              >
                <Flex row center className={styles.dropDownListStyle}>
                  <Text style={{ cursor: 'pointer' }}>Join</Text>
                </Flex>
              </Dropdown.Item>
              {/* <Dropdown.Item
               onClick={schedulehandleClick}
              >
                <Flex row center className={styles.dropDownListStyle}>
                  <Text style={{ cursor: 'pointer' }}>Schedule event</Text>
                </Flex>
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </Flex>
      );
    },
  },
];

