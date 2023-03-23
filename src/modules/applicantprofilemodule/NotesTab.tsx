import axios from 'axios';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SvgInfo from '../../icons/SvgInfo';
import SvgNotes from '../../icons/SvgNotes';
import SvgRefresh from '../../icons/SvgRefresh';
import { AppDispatch, RootState } from '../../store';
import Button from '../../uikit/Button/Button';
import { BLACK } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { firstNameChar, isEmpty } from '../../uikit/helper';
import Table from '../../uikit/Table/Table';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import RichText from '../common/RichText';
import { CANCEL, config } from '../constValue';
import { meetingTitle } from './MeetingTable';
import NotesDropDown from './NotesDropDown';
import styles from './notestab.module.css';
import {
  applicantNotesMiddleWare,
  calenderMiddleWare,
  suycGoogleMiddleWare,
  suycOutlookMiddleWare,
} from './store/middleware/applicantProfileMiddleware';

var querystring = require('querystring');

const cx = classNames.bind(styles);

export type FormProps = {
  notes: string;
};
const initial: FormProps = {
  notes: '',
};

type Props = {
  isMeeting?: boolean;
};
const NotesTab = ({ isMeeting }: Props) => {
  const [isCollapse, setCollapse] = useState(false);
  const [isColor, setColor] = useState<string[]>([]);
  const [buttonName, setButtonName] = useState('Add');
  const [getId, setGetId] = useState(0);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
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

  const { notes, can_id, calenderEvent, google, outlook, calenderLoader } =
    useSelector(
      ({
        applicantNotesReducers,
        applicantProfileInitalReducers,
        calenderReducers,
      }: RootState) => {
        return {
          notes: applicantNotesReducers.notes,
          can_id: applicantProfileInitalReducers.can_id,
          calenderEvent: calenderReducers.event,
          google: calenderReducers.google,
          outlook: calenderReducers.outlook,
          calenderLoader: calenderReducers.isLoading,
        };
      },
    );

  const handleSubmit = (values: FormProps) => {
    const data = querystring.stringify({
      pk: can_id,
      notes: values.notes,
    });

    if (buttonName === 'Add') {
      axios.post(`candidate_notes?pk=${can_id}`, data).then(() => {
        setCollapse(false);
        dispatch(applicantNotesMiddleWare({ can_id }));
        Toast('Notes added successfully', 'LONG', 'success');
      });
    }

    const dataOne = querystring.stringify({
      pk: getId,
      notes: values.notes,
      update: 'update',
    });

    if (buttonName === 'Update') {
      axios.post(`candidate_notes?pk=${can_id}`, dataOne, config).then(() => {
        setCollapse(false);
        dispatch(applicantNotesMiddleWare({ can_id }));
        if (buttonName === 'Update') {
          Toast('Notes updated successfully', 'LONG', 'success');
        }
      });
    }
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const hanldeInputOpen = () => {
    setButtonName('Add');
    setCollapse(true);
    formik.setFieldValue('notes', '');
  };

  const hanldeInputClose = () => {
    setCollapse(false);
    formik.setFieldValue('notes', '');
  };

  const handleDelete = (id: number) => {
    axios.delete('candidate_notes', { params: { pk: id } }).then(() => {
      Toast('Notes deleted successfully');
      dispatch(applicantNotesMiddleWare({ can_id }));
    });
  };

  const handleOpenEdit = (value: string, id: any) => {
    setButtonName('Update');
    setGetId(id);
    formik.setFieldValue('notes', value);
    setCollapse(true);
  };
  const checkPlatForm =
    google && google.length === 0 && outlook && outlook.length === 0
      ? true
      : false;

  const hanldeRefresh = () => {
    if (google && google.length === 1) {
      dispatch(suycGoogleMiddleWare({ profile: 'profile' })).then(() => {
        dispatch(calenderMiddleWare({ can_id }));
      });
    }
    if (outlook && outlook.length === 1) {
      dispatch(suycOutlookMiddleWare({ profile: 'profile' })).then(() => {
        dispatch(calenderMiddleWare({ can_id }));
      });
    }
  };
  const handleSetting = () => {
    return window.location.replace(
      process.env.REACT_APP_HOME_URL + 'account/integrations/calendar/',
    );
  };
  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 230}
    >
      <Flex
        flex={1}
        columnFlex
        className={cx({ notesOverAllContainer: isMeeting })}
      >
        <Flex row center between>
          <Text color="theme" bold>
            Notes
          </Text>
          <Button disabled={isCollapse} onClick={hanldeInputOpen}>
            Add Notes
          </Button>
        </Flex>
        {notes && notes.length === 0 && !isCollapse && (
          <Flex columnFlex flex={1} middle center>
            <SvgNotes />
            <Text color="gray">No notes created yet</Text>
          </Flex>
        )}
        {isCollapse && (
          <Flex>
            <div className={styles.textArea}>
              <RichText
                height={200}
                value={formik.values.notes}
                onChange={formik.handleChange('notes')}
                placeholder="You can add and save details regarding the candidate"
              />
            </div>
            <Flex row end>
              <Button onClick={hanldeInputClose} types="secondary">
                {CANCEL}
              </Button>
              <Button
                disabled={isEmpty(formik.values.notes)}
                onClick={formik.handleSubmit}
                className={styles.saveBtn}
              >
                {buttonName}
              </Button>
            </Flex>
          </Flex>
        )}

        {notes &&
          notes
            .map((list, indexList) => {
              return (
                <Flex
                  key={list.notes + indexList}
                  columnFlex
                  className={styles.notesOverAll}
                >
                  <Flex row center>
                    <div
                      className={cx('profile')}
                      style={{
                        backgroundColor: isColor[indexList % isColor.length],
                      }}
                    >
                      <Text color="white" transform="uppercase">
                        {!isEmpty(list.updated_by) &&
                          firstNameChar(list.updated_by)}
                      </Text>
                    </div>
                    <Text bold>{list.updated_by}</Text>
                  </Flex>
                  <Flex className={styles.noteListStyle}>
                    <NotesDropDown
                      notesList={list}
                      handleDelete={handleDelete}
                      handleOpenEdit={handleOpenEdit}
                    />
                    <td
                      className={styles.notesTextStyle}
                      dangerouslySetInnerHTML={{
                        __html: list.notes,
                      }}
                    />
                  </Flex>
                </Flex>
              );
            })
            .reverse()}
      </Flex>
      {isMeeting && (
        <Flex columnFlex>
          <Flex row center>
            <Text color="theme" bold className={styles.meetingFlex}>
              Meeting Details:
            </Text>
            {checkPlatForm ? (
              <Flex row center className={styles.syncedWidth}>
                (<SvgInfo className={styles.svgInfo} height={14} width={14} />
                <Text>
                  Integrate your calendar with Zita to schedule meetings)
                </Text>
                <Button
                  types="tertiary"
                  className={styles.settingBtn}
                  onClick={handleSetting}
                >
                  Settings
                </Button>
              </Flex>
            ) : (
              <>
                {google && google.length !== 0 && (
                  <Text className={styles.syncedWidth}>
                    (Synced with {google[0].email})
                  </Text>
                )}

                {outlook && outlook.length !== 0 && (
                  <Text className={styles.syncedWidth}>
                    (Synced with {outlook[0].email})
                  </Text>
                )}
                <Button
                  types="tertiary"
                  className={styles.syncBtn}
                  onClick={hanldeRefresh}
                >
                  <Flex row center>
                    <SvgRefresh height={14} width={14} fill={BLACK} />
                    <Text bold size={12} style={{ marginLeft: 4 }}>
                      Sync
                    </Text>
                  </Flex>
                </Button>
              </>
            )}
          </Flex>

          <Table
            columns={meetingTitle}
            dataSource={calenderEvent}
            empty="No meetings scheduled yet"
            isLoader={calenderLoader}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default NotesTab;
