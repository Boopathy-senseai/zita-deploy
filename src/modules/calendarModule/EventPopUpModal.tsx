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
import { Flex, Text } from '../../uikit';
import { CrossButton, Modal } from '../../uikit/v2';
import SvgInfo from '../../icons/SvgInfo';
import Avatar, { getUserInitials } from '../../uikit/Avatar';
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
    email,
  } = eventPopUpDetails;
  console.log(eventPopUpDetails);
  const DeleteWarningPopUp = (
    <Modal
      open={openEventDeleteModal}
      onClose={() => setOpenEventDeleteModal(false)}
    >
      <div className={styles.deleteWarningPopUp}>
        {/* <div className={styles.warningMessage}> */}
        <Flex flex={6} center>
          <Text color="black2" size={13} className={styles.insertStyles}>
            Meeting will be canceled and notified to the attendees.
          </Text>
          <Text color="black2" size={13} className={styles.insertStyles}>
            Are you sure to proceed further?
          </Text>
        </Flex>
        {/* <SvgInfo /> */}

        {/* </div> */}

        <div
          className={styles.actionButtonWrapper}
          style={{ marginTop: '20px' }}
        >
          <button
            style={{ marginRight: 8 }}
            onClick={() => setOpenEventDeleteModal(false)}
          >
            No, Thanks
          </button>
          <button
            onClick={() => {
              handleRemoveEvent(setOpenEventDeleteModal);
            }}
            className={styles.deleteButton}
          >
            Cancel Meeting
          </button>
        </div>
      </div>
    </Modal>
  );

  const ZitaEvent = (
    <>
      {openEventDeleteModal ? DeleteWarningPopUp : null}
      <div className={styles.content}>
        <div className={styles.profile}>
          {/* <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="candidate profile pic"
          /> */}
          <div className={styles.title}>
            <Tooltip title={title} placement="bottom-start">
              <p style={{ fontWeight: 'bold' }} className={styles.eventTitle}>
                {title}
              </p>
            </Tooltip>
            {/* <p>Gowtham Frontend Developer</p> */}
          </div>
        </div>
        <div className={styles.info}>
          <SvgInterviewCalendar size={16} />
          <div className={styles.infoText}>
            <Text style={{ marginBottom: 3 }}>{startDate.toDateString()}</Text>
            {/* <br /> */}
            <Text>{`${formatTo12HrClock(startDate)} - ${formatTo12HrClock(
              endDate,
            )}`}</Text>
          </div>
        </div>

        <div className={styles.info}>
          <SvgInterviewers size={16} />

          {attendees && attendees?.length > 0 ? (
            <div className={styles.infoText}>
              <p style={{ marginBottom: 3 }}>Interviewer&#40;s&#41;</p>
              <Flex row className={styles.emailContainer}>
                {attendees.map(
                  (item: string, index: Key | null | undefined) => (
                    <Avatar
                      key={index}
                      initials={getUserInitials({ email: item })}
                      style={{ width: 28, height: 28, marginRight: '5px' }}
                      textStyle={{ fontSize: 12 }}
                    />
                    // <p className={styles.email} key={index}>
                    //   {items}
                    // </p>
                  ),
                )}
              </Flex>
            </div>
          ) : null}
        </div>

        <div className={styles.info}>
          <SvgOrganizer size={16} />
          <div className={styles.infoText}>
            <Text style={{ marginBottom: 3 }}>Organizer</Text>
            {/* <br /> */}
            <Text className={styles.email}>{organizer}</Text>
          </div>
        </div>
      </div>

      {isEventCanUpdate && (
        <hr style={{ margin: '10px 0 10px 0', padding: 0 }} />
      )}
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
                <SvgCopy fill="#581845" width={16} height={16} />
              </button>
            </Tooltip>
          ) : null}
          {isEventCanUpdate && canEdit ? (
            <button
              className={styles.icon}
              title="Edit"
              onClick={() => handleEditEvent()}
            >
              <SvgEdit width={16} height={16} />
            </button>
          ) : null}
          {canEdit ? (
            <button
              className={styles.icon}
              title="Delete"
              onClick={() => setOpenEventDeleteModal(true)}
            >
              <SvgTrash width={16} height={16} fill="#581845" />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );

  const PrivateEvent = (
    <div className={styles.content}>
      {/* <Tooltip title={title} placement="bottom-start">
              <p style={{ fontWeight: 'bold' }} className={styles.eventTitle}>
                {title}
              </p>
            </Tooltip> */}
      <Tooltip title={title} placement="bottom-start">
        <p style={{fontWeight: 'bold'}} className={styles.title}>
          {title}
        </p>
      </Tooltip>

      <div className={styles.info}>
        <SvgInterviewCalendar size={14} />
        <div className={styles.infoText}>
          <Text style={{ marginBottom: 3 }}>
            {startDate.toString().slice(0, 15)}
          </Text>
          <Text>{`${formatTo12HrClock(startDate)} - ${formatTo12HrClock(
            endDate,
          )}`}</Text>
        </div>
      </div>
      <div className={styles.info}>
        <SvgCalendar1 size={14} />
        <div className={styles.infoText}>
          <Text style={{ marginBottom: 3 }}>Calendar</Text>
          <Text>Synced by {syncedBy}</Text>
        </div>
      </div>
      <div className={styles.info}>
        <SvgPrivate size={14} />
        <div className={styles.infoText} style={{ alignItems: 'center' }}>
          <Text style={{ marginBottom: 3 }}>Private Event</Text>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Modal open={showEventPopUpModal} onClose={handleCloseEventPopUpModal}>
        <div className={styles.eventPopUp}>
          <CrossButton
            onClick={handleCloseEventPopUpModal}
            size={10}
            style={{
              position: 'absolute',
              top: '12px',
              right: '15px',
              display: 'flex',
              justifyContent: 'center',
            }}
            fill={'#333'}
          />
          {isZitaEvent ? ZitaEvent : PrivateEvent}
        </div>
      </Modal>
    </>
  );
};

export default EventPopUpModal;
