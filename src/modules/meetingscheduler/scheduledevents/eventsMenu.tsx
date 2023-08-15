import React, { useEffect, useRef } from 'react';
import { Flex, InputSwitch, Text } from '../../../uikit';
import SvgArrowDown from '../../../icons/SvgArrow';
import { EVENT_TYPE, IEventTeamMember } from '../types';
import { TeamMemberType } from '../../calendarModule/types';
import { UserEntity } from '../../accountsettingsmodule/userprofilemodule/UserProfileTypes';
import styles from './eventsMenu.module.css';
import PeopleCheckbox from './peopleCheckbox';

interface Props {
  showDropDownMenu: boolean;
  eventType: EVENT_TYPE;
  selectedPeople: any[];
  teamMembers: IEventTeamMember[];
  currentUser: UserEntity;
  onEventType: (v: EVENT_TYPE) => void;
  handleDropDown: () => void;
  onPeopleChange: (value: any) => void;
  style?: React.CSSProperties;
}

const EventsMenu: React.FC<Props> = ({
  teamMembers,
  currentUser,
  selectedPeople,
  showDropDownMenu,
  eventType,
  onEventType,
  handleDropDown,
  onPeopleChange,
  style,
}) => {
  const TeameventsOptions = () => (
    <div>
       <div style={{ marginTop: '10px' }}>
          <p style={{ margin: 0, marginTop: '10px' }}>People</p>
          {teamMembers.filter(doc => doc.user !== currentUser?.id).map((member, index) => (
            <PeopleCheckbox
              key={index}
              checked={selectedPeople.includes(member.id)}
              onClick={() => onPeopleChange(member.id)}
              label={member.full_name || `${member.user__first_name} ${member.user__last_name}`}
            />
          ))}
        </div>
    </div>
  );

  const MyeventsOptions = () => {
    return (
      <div>
        <div style={{ marginTop: '10px' }}>
          <p style={{ margin: 0, marginTop: '10px' }}>People</p>
          {teamMembers.filter(doc => doc.user === currentUser?.id).map((member, index) => (
            <PeopleCheckbox
              key={index}
              checked={ true} /// selectedPeople.includes(member.id)
              disabled={true}
              onClick={() => onPeopleChange(member.id)}
              label={member.full_name || `${member.user__first_name} ${member.user__last_name}`}
            />
          ))}
        </div>
      </div>
    );
  };

  const EventsTypeOptions = () => (
    <>
      <div className={styles.filter_wrapper}>
        <button
          className={
            eventType === EVENT_TYPE.MY_EVENTS ? styles.activeFilter : ''
          }
          onClick={() => onEventType(EVENT_TYPE.MY_EVENTS)}
        >
          My events
        </button>
        <button
          className={
            eventType === EVENT_TYPE.TEAM_EVENTS ? styles.activeFilter : ''
          }
          onClick={() => onEventType(EVENT_TYPE.TEAM_EVENTS)}
        >
          Team events
        </button>
      </div>
    </>
  );

  const MenuButtonView = () => (
    <button className={styles.dropDownBtn} onClick={handleDropDown}>
      <Flex row center noWrap>
        <Text size={14} className={styles.container}>
          {eventType === EVENT_TYPE.MY_EVENTS ? 'My Events' : 'Team Events'}
        </Text>
        <Flex marginTop={2} style={{ cursor: 'pointer' }}>
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
          <EventsTypeOptions />
          <div
            style={{
              padding: '5px 8px',
            }}
          >
            {eventType === EVENT_TYPE.MY_EVENTS ? (
              <MyeventsOptions />
            ) : (
              <TeameventsOptions />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsMenu;

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
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
        zIndex: 100,
        display: show ? 'block' : 'none',
      }}
    ></div>
  );
};
