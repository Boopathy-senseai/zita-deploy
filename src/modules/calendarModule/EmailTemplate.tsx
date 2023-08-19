import React from 'react';
import { useFormik } from 'formik';
import { SvgEdit } from '../../icons';
import { Button, ErrorMessage, InputText } from '../../uikit';
import { isEmpty } from '../../uikit/helper';
import { THIS_FIELD_REQUIRED } from '../constValue';
import styles from './styles/MeetingSummary.module.css';
import { TeamMemberType, meetingFormProps } from './types';
import { formatTo12HrClock } from './util';

interface Props extends meetingFormProps {
  email: string[] | string;
  currentUserLabel: string;
  greetingText: string;
  interviewerData?: TeamMemberType[];
  notes: string;
  applicantInfo?: {
    id: number;
    name: string | null;
    email: string | null;
    error: boolean;
  };
  onSave: (value: string) => void;
  editGreeting?: boolean;
}

const EmailTemplate: React.FC<Props> = (props) => {
  const {
    interviewerData,
    applicantInfo,
    email,
    currentUserLabel,
    greetingText,
    onSave,
    notes,
    editGreeting = false,
    ...rest
  } = props;
  const [edit, setEdit] = React.useState<boolean>(false);

  const handleValid = (values: { greeting: string }) => {
    const errors: Partial<{ greeting: string }> = {};
    if (isEmpty(values.greeting.trim())) {
      errors.greeting = THIS_FIELD_REQUIRED;
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      greeting: greetingText,
    },
    enableReinitialize: true,
    validate: handleValid,
    onSubmit: (data) => {
      setEdit(!edit);
      onSave(data?.greeting);
    },
  });

  const MeetingTitleView = (
    <p>
      {rest.eventType.value} on <b>{rest.startDateTime.toDateString()}</b> from{' '}
      <b>{formatTo12HrClock(rest.startDateTime)}</b> to{' '}
      <b>{formatTo12HrClock(rest.endDateTime)}</b> with{' '}
      <b>{currentUserLabel}</b>
    </p>
  );
  return (
    <div className={styles.emailContainer}>
      <div className={styles.emails}>
        <p>To &nbsp;</p>
        <div>
          {typeof email === 'string' && (
            <div className={styles.email}>{email}</div>
          )}
          {Array.isArray(email) &&
            email.map((str, index) => (
              <div key={index} className={styles.email}>
                {str}
              </div>
            ))}
        </div>
      </div>
      <div className={styles.subject}>
        <div className={styles.boxView}>{MeetingTitleView}</div>
        <div
          className={styles.boxView}
          style={{ borderBottom: '1px solid #cccccc' }}
        >
          <div className={styles.editIcon} style={{display:"flex", justifyContent:"flex-end"}}>
          {!edit && (
                  <Button types="link" onClick={() => setEdit(!edit)}>
                    <SvgEdit width={14} height={14} />
                  </Button>
                )}
          </div>
          {!edit && <pre className={styles.pre}>{formik?.values.greeting}</pre>}
          
          {edit && (
            <>
              <InputText
                name="greeting"
                value={formik?.values.greeting}
                textarea={true}
                onChange={formik.handleChange}
                style={{ minHeight: '50px', maxHeight: '100px' }}
              />
              <ErrorMessage
                name="greeting"
                errors={formik.errors}
                touched={formik.touched}
              />
            </>
          )}
          {editGreeting && (
            <div className={styles.actionBtns}>
              <div className={styles.editIcon}>
                
                {edit && (
                  <Button types="primary" onClick={formik.submitForm}>
                    {'Save'}
                  </Button>
                )}
              </div>
            </div>
          )}
          <div className={styles.details}>
            {MeetingTitleView}
            <div>
              { notes && 
                <div>
                <p className={styles.personHeader}>Notes</p>
                <p>{notes}</p>
                <br />
              </div>
}
             
              {/* <div>
                    <p className={styles.personHeader}>Applicant</p>
                    <p>{rest.applicant.name}</p>
                  </div> */}
              {interviewerData && (
                <div>
                  <p className={styles.personHeader}>Interviewers</p>
                  <div className={styles.interviewers}>
                    {interviewerData.map((user, index) => (
                      <p
                        key={index}
                      >{` ${user.firstName} ${user.lastName}, `}</p>
                    ))}
                  </div>
                </div>
              )}
              {applicantInfo && (
                <div>
                  <p className={styles.personHeader}>Applicant</p>
                  <p>{applicantInfo.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;
