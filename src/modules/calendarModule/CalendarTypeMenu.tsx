import React, { useEffect, useRef } from 'react';
import { SvgDownArrow } from '../../icons';
import { Flex, InputSwitch, Text } from '../../uikit';
import SvgArrowDown from '../../icons/SvgArrow';
import { CalendarOptions, CalendarType, Colors, TeamMemberType } from './types';
import styles from './styles/calendarScreen.module.css';
import SelectTeamMemberCheckBox from './SelectTeamMemberIcon';
import { getColor } from './colors';

interface Props {
  teamMembers: TeamMemberType[];
  selectedTeamMembers: number[];
  showDropDownMenu: boolean;
  currentCalendarType: CalendarType;
  handleCalendarType: () => void;
  handleTeamMemberEvents: (userId: number) => void;
  handleDropDown: () => void;
  myCalendarOptions: CalendarOptions;
  teamCalendarOptions: CalendarOptions;
  handleMyCalendarOptions: (options: CalendarOptions) => void;
  handleTeamCalendarOptions: (options: CalendarOptions) => void;
  style?: React.CSSProperties;
}

const CalendarTypeMenu = ({
  handleTeamMemberEvents,
  currentCalendarType,
  handleCalendarType,
  selectedTeamMembers,
  teamMembers,
  handleDropDown,
  showDropDownMenu,
  myCalendarOptions,
  teamCalendarOptions,
  handleMyCalendarOptions,
  handleTeamCalendarOptions,
  style,
}: Props) => {
  const TeamCalendarOptions = () => (
    <div style={{ marginTop: '10px' }}>
      <div>
        <div className={styles.mycalendarOptions}>
          <p>Personal Events</p>
          <InputSwitch
            checked={teamCalendarOptions.personalEvents}
            onClick={() =>
              handleTeamCalendarOptions({
                ...teamCalendarOptions,
                personalEvents: !teamCalendarOptions.personalEvents,
              })
            }
          />
        </div>
        <div className={styles.mycalendarOptions}>
          <p>Zita Events</p>
          <InputSwitch
            checked={teamCalendarOptions.zitaEvents}
            onClick={() =>
              handleTeamCalendarOptions({
                ...teamCalendarOptions,
                zitaEvents: !teamCalendarOptions.zitaEvents,
              })
            }
          />
        </div>
      </div>
      <div style={{ marginTop: '14px' }}>
        {teamMembers.map((member, index) =>
          member.calendarEmail ? (
            <SelectTeamMemberCheckBox
              key={index}
              checked={selectedTeamMembers.includes(member.userId)}
              onClick={() => handleTeamMemberEvents(member.userId)}
              label={`${member.firstName} ${member.lastName}`}
              color={getColor(member.userId)}
            />
          ) : null,
        )}
      </div>
    </div>
  );

  const MyCalendarOptions = () => {
    return (
      <>
        <div>
          <div className={styles.mycalendarOptions}>
            <p>Personal Events</p>
            <InputSwitch
              checked={myCalendarOptions.personalEvents}
              onClick={() =>
                handleMyCalendarOptions({
                  ...myCalendarOptions,
                  personalEvents: !myCalendarOptions.personalEvents,
                })
              }
            />
          </div>
          <div className={styles.mycalendarOptions}>
            <p>Zita Events</p>
            <InputSwitch
              checked={myCalendarOptions.zitaEvents}
              onClick={() =>
                handleMyCalendarOptions({
                  ...myCalendarOptions,
                  zitaEvents: !myCalendarOptions.zitaEvents,
                })
              }
            />
          </div>
        </div>
      </>
    );
  };

  const CalendarTypeOptions = () => (
    <>
      <div className={styles.filter_wrapper}>
        <button
          className={
            currentCalendarType === CalendarType.MyCalendar
              ? styles.activeFilter
              : ''
          }
          onClick={handleCalendarType}
        >
          My Calendar
        </button>
        <button
          className={
            currentCalendarType === CalendarType.TeamCalendar
              ? styles.activeFilter
              : ''
          }
          onClick={handleCalendarType}
        >
          Team Calendar
        </button>
      </div>
    </>
  );

  const MenuButtonView = () => (
    <button className={styles.dropDownBtn} onClick={handleDropDown}>
      <Flex row center noWrap>
        <Text size={14}className={styles.container}>
          {currentCalendarType === CalendarType.MyCalendar
            ? 'My Calendar'
            : 'Team Calendar'}
        </Text>
        <Flex marginTop={2} style={{cursor: "pointer"}}>
          <SvgArrowDown width={14} height={12} />
        </Flex> 
      </Flex>
    </button>
  );

  return (
    <>
      <div style={{ position: 'relative', ...style }}>
        <MenuButtonView />
        <Overlay show={showDropDownMenu} onClose={handleDropDown} />
        <div
          style={{
            display: showDropDownMenu ? 'block' : 'none',
          }}
          className={styles.dropdownFilter}
        >
          <CalendarTypeOptions />
          <div
            style={{
              padding: '5px 8px',
            }}
          >
            {currentCalendarType === CalendarType.TeamCalendar ? (
              <TeamCalendarOptions />
            ) : (
              <MyCalendarOptions />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarTypeMenu;

interface OverlayProps {
  show: boolean;
  onClose: () => void;
}

const Overlay = ({ show, onClose }: OverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.addEventListener('click', onClose);

      return () => {
        overlayRef?.current?.removeEventListener('click', onClose);
      };
    }
  }, [overlayRef]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
        zIndex: 100,
        display: show ? 'block' : 'none',
      }}
    ></div>
  );
};
