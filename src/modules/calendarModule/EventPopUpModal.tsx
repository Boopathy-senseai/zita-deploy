import React, { Key, useState } from 'react';
import { Tooltip } from '@mui/material';
import {
  SvgTrash,
  SvgCalendar1,
  SvgOrganizer,
  SvgPrivate,
  SvgInterviewCalendar,
  SvgInterviewers,
  SvgEdit,
  SvgCopy,
} from '../../icons';
import { Text } from '../../uikit';
import { CrossButton, Modal } from '../../uikit/v2';
import SvgInfo from '../../icons/SvgInfo';
import { formatTo12HrClock, getEventHasMeeting } from './util';
import styles from './styles/EventPopUp.module.css';
import { EventPopUpDetails } from './types';

interface Props {
  showEventPopUpModal: boolean;
  handleRemoveEvent: (
    setOpenEventDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  handleCloseEventPopUpModal: () => void;
  joinMeeting: (eventId: string) => void;
  handleEditEvent: () => void;
  isEventCanUpdate: boolean;
  eventPopUpDetails: EventPopUpDetails;
}

const EventPopUpModal = ({
  showEventPopUpModal,
  handleCloseEventPopUpModal,
  handleEditEvent,
  handleRemoveEvent,
  isEventCanUpdate,
  joinMeeting,
  eventPopUpDetails,
}: Props) => {
  const [openEventDeleteModal, setOpenEventDeleteModal] = useState(false);
  const {
    attendees,
    endDate,
    eventId,
    isZitaEvent,
    link,
    organizer,
    startDate,
    syncedBy,
    title,
    canEdit,
  } = eventPopUpDetails;

  const DeleteWarningPopUp = (
    <Modal
      open={openEventDeleteModal}
      onClose={() => setOpenEventDeleteModal(false)}
    >
      <div className={styles.deleteWarningPopUp}>
        <div className={styles.warningMessage}>
          <SvgInfo />
          <p>
            Meeting will be canceled and notified to the attendees.
            <br />
            Are you sure to proceed further?
          </p>
        </div>

        <div className={styles.actionButtonWrapper}>
          <button
            onClick={() => {
              handleRemoveEvent(setOpenEventDeleteModal);
            }}
            className={styles.deleteButton}
          >
            Cancel Meeting
          </button>
          <button onClick={() => setOpenEventDeleteModal(false)}>
            No, Thanks
          </button>
        </div>
      </div>
    </Modal>
  );

  const ZitaEvent = (
    <>
      {openEventDeleteModal ? DeleteWarningPopUp : null}
      <div className={styles.profile}>
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="candidate profile pic"
        />
        <div className={styles.title}>
          <Tooltip title={title} placement="top">
            <p className={styles.eventTitle}>{title}</p>
          </Tooltip>
          <p>Gowtham Frontend Developer</p>
        </div>
      </div>
      <div className={styles.info}>
        <SvgInterviewCalendar size={20} />
        <div className={styles.infoText}>
          <Text>{startDate.toDateString()}</Text>
          <br />
          <Text>{`${formatTo12HrClock(startDate)} to ${formatTo12HrClock(
            endDate,
          )}`}</Text>
        </div>
      </div>

      <div className={styles.info}>
        <SvgInterviewers size={20} />
        {attendees?.length > 0 ? (
          <div className={styles.infoText}>
            <p>Interviewer&#40;s&#41;</p>
            <div className={styles.emailContainer}>
              {attendees.map((items: string, index: Key | null | undefined) => (
                <p className={styles.email} key={index}>
                  {items}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.info}>
        <SvgOrganizer size={20} />
        <div className={styles.infoText}>
          <Text>Organizer</Text>
          <br />
          <Text className={styles.email}>{organizer}</Text>
        </div>
      </div>

      {isEventCanUpdate && <hr></hr>}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          height: '32px',
        }}
      >
        {eventId && isEventCanUpdate && getEventHasMeeting(title) && (
          <button
            onClick={() => {
              joinMeeting(eventId);
              handleCloseEventPopUpModal();
            }}
            className={styles.button}
            style={{ alignSelf: 'flex-start' }}
          >
            Join
          </button>
        )}
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0 }}>
          {eventId !== '' && isEventCanUpdate && getEventHasMeeting(title) ? (
            <Tooltip title="Copy Meeting URL" placement="top">
              <button
                className={`${styles.icon} ${styles.popover}`}
                onClick={() => {
                  navigator.clipboard.writeText(link);
                }}
              >
                <SvgCopy fill="#581845" width={18} height={18} />
              </button>
            </Tooltip>
          ) : null}
          {isEventCanUpdate && canEdit ? (
            <button className={styles.icon} onClick={() => handleEditEvent()}>
              <SvgEdit />
            </button>
          ) : null}
          {canEdit ? (
            <button
              className={styles.icon}
              onClick={() => setOpenEventDeleteModal(true)}
            >
              <SvgTrash />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );

  const PrivateEvent = (
    <>
      <p className={styles.title}>{title}</p>
      <div className={styles.info}>
        <SvgInterviewCalendar size={20} />
        <div className={styles.infoText}>
          <Text>{startDate.toString().slice(0, 15)}</Text>
          <br />
          <Text>{`${formatTo12HrClock(startDate)} to ${formatTo12HrClock(
            endDate,
          )}`}</Text>
        </div>
      </div>
      <div className={styles.info}>
        <SvgCalendar1 size={20} />
        <div className={styles.infoText}>
          <Text>Calendar</Text>
          <br />
          <Text>Synced by {syncedBy}</Text>
        </div>
      </div>
      <div className={styles.info}>
        <SvgPrivate size={20} />
        <div className={styles.infoText} style={{ alignItems: 'center' }}>
          <Text>Private Event</Text>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Modal open={showEventPopUpModal} onClose={handleCloseEventPopUpModal}>
        <div className={styles.eventPopUp}>
          <CrossButton
            onClick={handleCloseEventPopUpModal}
            size={'14px'}
            style={{ position: 'absolute', top: '12px', right: '12px' }}
          />
          {isZitaEvent ? ZitaEvent : PrivateEvent}
        </div>
      </Modal>
    </>
  );
};

export default EventPopUpModal;
