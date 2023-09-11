import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import SvgCalendarEvent from '../../../icons/SvgCalendarEvent';
import SvgInfo from '../../../icons/SvgInfo';
import SvgGlobe from '../../../icons/SvgGlobe';
import SvgCheck2Circle from '../../../icons/SvgCheck2Circle';
import SvgClock from '../../../icons/SvgClock';
import styles from './slotter.module.css';


type ConfromProps = {
  selecttime: string;
  date: string;
  response: any;
  timezones: any;
  candidate_name: string;
  FooterNavogation: () => void;
}
const Conformpage = ({
  selecttime,
  date,
  response,
  timezones,
  candidate_name,
  FooterNavogation,
}: ConfromProps) => {

  return (
    <>
      <Flex className={styles.successTick}>
        {response[0].company_logo !== '' ? (
          <>
            <img
              src={`${process.env.REACT_APP_HOME_URL}media/${response[0]?.company_logo}`}
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
          </>
        ) : (
          <Flex marginTop={30}></Flex>
        )}
        <Flex marginTop={30}>
          {response?.map((list: any) => (
            <Flex className={styles.confrompage} key={list.id}>
              <Flex center className={styles.successTick} marginBottom={10}>
                <SvgCheck2Circle width={30} height={30} fill={'green'} />
                <Text size={16} bold style={{ marginTop: '10px' }}>
                  Your interview has been scheduled successfully
                </Text>
              </Flex>
              <Flex row center marginTop={15}>
                <Text size={14} bold>
                  {list.company_name}
                </Text>
              </Flex>
              <Text
                bold
                size={14}
                style={{ margin: '10px 0px', textTransform: 'capitalize' }}
              >
                {list.event_name}
              </Text>
              <Flex row center marginBottom={10}>
                <SvgCalendarEvent width={14} height={14} fill={'#581845'} />
                <Text size={13} style={{ marginLeft: '5px' }}>
                  {selecttime}, {date}
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
                <Text size={13} style={{ marginLeft: '5px' }}>
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
                    maxHeight: "150px", overflow: "auto"
                  }}
                >
                  {list.description}
                </Text>
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
          style={{ cursor: 'pointer', display: 'flex' }}
          size={14}
          color="theme"
        >
          Powered by Zita.ai
        </Text>
      </Flex>
    </>
  );
};

export default Conformpage