import React, { useEffect, useRef } from 'react';
import { Flex, InputSwitch, Text } from '../../../uikit';
import SvgArrowDown from '../../../icons/SvgArrow';
import { EVENT_TYPE } from '../types';
import styles from './eventsMenu.module.css';

interface Props {
  showDropDownMenu: boolean;
  eventType: EVENT_TYPE;
  onEventType: (v: EVENT_TYPE) => void;
  handleDropDown: () => void;
  style?: React.CSSProperties;
}

const EventsMenu: React.FC<Props> = ({
  showDropDownMenu,
  eventType,
  onEventType,
  handleDropDown,
  style,
}) => {
  const TeameventsOptions = () => (
    <div style={{ marginTop: '10px' }}>
      <div>
        <div className={styles.myeventsOptions}>
          <p>My events</p>
          <InputSwitch checked={true} onClick={() => {}} />
        </div>
        <div className={styles.myeventsOptions}>
          <p>Everyone’s events</p>
          <InputSwitch checked={true} onClick={() => {}} />
        </div>
      </div>
      <div style={{ marginTop: '14px' }}>
        <Text style={{ margin: 0, marginTop: '10px' }}>Team</Text>
      </div>
    </div>
  );

  const MyeventsOptions = () => {
    return (
      <>
        <div>
          <div className={styles.myeventsOptions}>
            <p>My events</p>
            <InputSwitch checked={true} onClick={() => {}} />
          </div>
          <div className={styles.myeventsOptions}>
            <p>Everyone’s events</p>
            <InputSwitch checked={true} onClick={() => {}} />
          </div>
        </div>
      </>
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
          {eventType === EVENT_TYPE.MY_EVENTS ? "My Events" :  "Team Events"}
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
              <div>MY EVENT</div>
            ) : (
              <div>TEAM EVENT</div>
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
