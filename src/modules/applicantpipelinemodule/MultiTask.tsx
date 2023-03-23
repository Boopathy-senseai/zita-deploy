import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import SvgCalendar from '../../icons/SvgCalendar';
import SvgDownload from '../../icons/SvgDownload';
import SvgHeart from '../../icons/SvgHeart';
import SvgView from '../../icons/SvgView';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import { GARY_4, PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { getDateString, isEmpty } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { ADD_FAV, dndBoardId, REMOVE_FAV } from '../constValue';
import { GoogleEntity } from './applicantPipeLineTypes';
import { handleDownload, hanldeFavAction } from './dndBoardHelper';
import ProfileView from './ProfileView';
import styles from './multitask.module.css';

type Props = {
  task: any;
  index: number;
  isBorder: string;
  columnId: string;
  outlook?: GoogleEntity[];
  google?: GoogleEntity[];
};
const MultiTask = ({
  task,
  index,
  isBorder,
  columnId,
  google,
  outlook,
}: Props) => {
  const [isCalender, setCalender] = useState('popup');
  const [isProfileView, setProfileView] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const workExp =
    task.work_exp > 1 ? task.work_exp + ' Years' : task.work_exp + ' Year';
  const match = isEmpty(task.match) ? 0 : task.match;

  useEffect(() => {
    if (google?.length === 0 && outlook?.length === 0) {
      setCalender('popup');
    }
    if (outlook?.length === 1) {
      setCalender('outlook');
    }
    if (google?.length === 1) {
      setCalender('google');
    }
  }, [google, outlook]);

  const calenderTitle =
    isCalender === 'popup'
      ? 'Integrate your calendar to schedule meetings'
      : 'Schedule Meetings';

  let link: string;
  if (isCalender === 'outlook') {
    link = 'https://outlook.office365.com/calendar/view/week';
  }
  if (isCalender === 'google') {
    link = 'https://calendar.google.com/calendar/u/0/r?tab=rc';
  }

  const getDate =
    getDateString(new Date(), 'DD MMM YYYY') ===
    getDateString(task.created_on, 'DD MMM YYYY');

  const hanldeProfileView = () => {
    setProfileView(true);
  };

  return (
    <>
      <ProfileView
        open={isProfileView}
        cancel={() => setProfileView(false)}
        jobId={task.jd_id_id}
        candidateId={task.candidate_id_id}
      />
      <Draggable draggableId={task.id.toString() + dndBoardId} index={index}>
        {(provided) => (
          <div
            className={styles.container}
            ref={provided.innerRef}
            // eslint-disable-next-line
            {...provided.dragHandleProps}
            // eslint-disable-next-line
            {...provided.draggableProps}
            // isDragging={snapshot.isDragging}
          >
            <Card>
              <div
                className={styles.cardFlexStyle}
                style={{ borderLeftColor: isBorder }}
              >
                <Flex row>
                  <div style={{ position: 'relative' }}>
                    <div className={styles.profile}>
                      <img
                        alt=""
                        className={styles.profile}
                        src={`${process.env.REACT_APP_HOME_URL}media/${task.image}`}
                      />
                    </div>
                    <div className={styles.percentageStyle}>
                      <Text bold>{match}%</Text>
                    </div>
                  </div>
                  <Flex columnFlex  className={styles.nameContainer}>
                    <Flex row center>
                      <Button
                        types="link"
                        className={styles.linkBtnStyle}
                        onClick={hanldeProfileView}
                      >
                        {task.name}
                      </Button>

                      <div
                        title={
                          isEmpty(task.viewed)
                            ? 'Yet to View'
                            : 'Profile Viewed'
                        }
                        className={styles.svgView}
                      >
                        <SvgView
                          nonView={isEmpty(task.viewed)}
                          width={16}
                          height={16}
                        />
                      </div>
                    </Flex>
                    <Flex row center>
                      <Text
                        size={12}
                        color="gray"
                        textStyle="ellipsis"
                        title={task.location}
                        style={{ maxWidth: '40%' }}
                      >
                        {task.location}
                      </Text>
                      <Text
                        size={12}
                        color="gray"
                        textStyle="ellipsis"
                        style={{ marginLeft: 2 }}
                      >
                        | {workExp}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex row center className={styles.svgContainer}>
                  <div
                    title="Download Resume"
                    onClick={() => handleDownload(task.file)}
                    tabIndex={-1}
                    role={'button'}
                    onKeyPress={() => {}}
                  >
                    <SvgDownload
                      className={styles.svgDownloadStyle}
                      width={19}
                      height={19}
                    />
                  </div>
                  <div
                    title={isEmpty(task.fav) ? ADD_FAV : REMOVE_FAV}
                    onClick={() =>
                      hanldeFavAction(
                        task.candidate_id_id,
                        task.jd_id_id,
                        dispatch,
                      )
                    }
                    tabIndex={-1}
                    role={'button'}
                    onKeyPress={() => {}}
                  >
                    <SvgHeart
                      className={styles.svgDownloadStyle}
                      width={19}
                      height={19}
                      filled={!isEmpty(task.fav)}
                    />
                  </div>
                  {columnId === 'column-2' && (
                    <a
                      rel="noopener noreferrer"
                      title={calenderTitle}
                      className={
                        isCalender === 'popup'
                          ? styles.svgCalnStyle
                          : styles.svgDownloadStyle
                      }
                      href={link}
                      target={'_blank'}
                    >
                      <SvgCalendar
                        fill={isCalender === 'popup' ? GARY_4 : PRIMARY}
                        width={19}
                        height={19}
                      />
                    </a>
                  )}

                  {columnId === 'column-1' && getDate && (
                    <Flex className={styles.svgNewTag}>
                      <img
                        alt=""
                        height={19}
                        width={45}
                        src="https://i.ibb.co/fFSqFCW/new.png"
                      />
                    </Flex>
                  )}
                </Flex>
              </div>
            </Card>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default MultiTask;
