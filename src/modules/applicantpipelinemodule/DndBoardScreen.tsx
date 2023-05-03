import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import { ERROR_MESSAGE } from '../constValue';
import {
  ShortlistedEntityOrRejectedEntity,
  InterviewedEntityOrSelectedEntity,
  ApplicantEntity,
  GoogleEntity,
  JobDetailsEntity,
} from './applicantPipeLineTypes';
import DndBoardCol from './DndBoardCol';
import styles from './dndboardscreen.module.css';
import { columnTypes } from './dndBoardTypes';
import { columnOrder } from './initialData';
import { applicantUpdateStatusMiddleWare } from './store/middleware/applicantpipelinemiddleware';

type Props = {
  // applicant: ApplicantEntity[];
  // shortlisted: ShortlistedEntityOrRejectedEntity[];
  // selected: InterviewedEntityOrSelectedEntity[];
  // rejected: ShortlistedEntityOrRejectedEntity[];
  // interviewed: InterviewedEntityOrSelectedEntity[];
  columns: columnTypes;
  jd_id: string;
  outlook?: GoogleEntity[];
  google?: GoogleEntity[];
  job_details: JobDetailsEntity;
  onDragStart?: (start: { source: { droppableId: string } }) => void;
  onDragEnd?: (result: DropResult) => void;
  hanldeSortList?: () => void;
  hanldeInterview?: () => void;
  hanldeOffered?: () => void;
  hanldeReject?: () => void;
  hanldeCancel?: () => void;
  isShortList: boolean;
  isInterviewed: boolean;
  isOffered: boolean;
  isRejected: boolean;
  isUpdateId: number;
  isIndex: number;
  onClick?: (data: {
    task: any;
    section: string;
    index: number;
    columnId: string;
    job_details: JobDetailsEntity;
  }) => void;
  // selectedCardList: {
  //   task: any;
  //   // index: number;
  //   // columnId: string;
  //   // job_details: JobDetailsEntity;
  // }[];
  cardSelectionMap: Map<string, { task: any; section: string }>;
};

const DndBoardScreen = ({
  // interviewed,
  // selected,
  // rejected,
  // applicant,
  // shortlisted,
  columns,
  jd_id,
  google,
  outlook,
  job_details,
  onDragStart,
  onDragEnd,
  hanldeSortList,
  hanldeInterview,
  hanldeOffered,
  hanldeReject,
  hanldeCancel,
  isShortList,
  isInterviewed,
  isOffered,
  isRejected,
  isUpdateId,
  isIndex,
  onClick,
  cardSelectionMap,
}: Props) => {
  // const dispatch: AppDispatch = useDispatch();
  // const [isShortList, setShortList] = useState(false);
  // const [isInterviewed, setInterviewed] = useState(false);
  // const [isOffered, setOffered] = useState(false);
  // const [isRejected, setRejected] = useState(false);

  // const [isUpdateId, setUpdateId] = useState<number>(0);
  // // initial value
  // const columnsFromBackend = {
  //   'column-1': {
  //     title: 'New Applicants',
  //     items: applicant,
  //     total: applicant.length,
  //     section:'applicant',
  //   },
  //   'column-2': {
  //     title: 'Shortlisted',
  //     items: shortlisted,
  //     total: shortlisted.length,
  //     section:'shortlisted',
  //   },
  //   'column-3': {
  //     title: 'Interviewed',
  //     items: interviewed,
  //     total: interviewed.length,
  //     section:'interviewed',
  //   },
  //   'column-4': {
  //     title: 'Offered',
  //     items: selected,
  //     total: selected.length,
  //     section:'selected',
  //   },
  //   'column-5': {
  //     title: 'Rejected',
  //     items: rejected,
  //     total: rejected.length,
  //     section:'rejected',
  //   },
  //   // 'column-6': {
  //   //   title: 'Test',
  //   //   items: interviewed,
  //   //   total: interviewed.length,
  //   // },
  // };

  // const [columns, setColumns] = useState<columnTypes>(columnsFromBackend);
  // const [isIndex, setIndex] = useState<any>();
  // const [isNoLoader, setNoLoader] = useState(false);

  // useEffect(() => {
  //   setColumns(columnsFromBackend);
  // }, [applicant, shortlisted, interviewed, selected, rejected, isNoLoader]);

  // const selectedCardsByColumnId = (id:string) =>{
  //   return cardSelectionMap.filter(doc => doc. === id);

  // }

  // const onDragStart = (start: { source: { droppableId: string } }) => {
  //   const homeIndex = columnOrder.indexOf(start.source.droppableId);
  //   setIndex(homeIndex);
  //   if (homeIndex === 3) {
  //     setIndex(8);
  //   }
  // };

  // // card drag function
  // const onDragEnd = (result: DropResult) => {
  //   setIndex(null);
  //   if (!result.destination) return;

  //   if (
  //     result.destination.droppableId === 'column-1' &&
  //     result.source.droppableId !== 'column-1'
  //   )
  //     return;

  //   const { source, destination } = result;

  //   if (source.droppableId !== destination.droppableId) {
  //     const sourceColumn = columns[source.droppableId];
  //     const destColumn = columns[destination.droppableId];
  //     const sourceItems = [...sourceColumn.items];
  //     const destItems = [...destColumn.items];
  //     const [removed] = sourceItems.splice(source.index, 1);
  //     destItems.splice(destination.index, 0, removed);
  //     setColumns({
  //       ...columns,
  //       [source.droppableId]: {
  //         ...sourceColumn,
  //         items: sourceItems,
  //       },
  //       [destination.droppableId]: {
  //         ...destColumn,
  //         items: destItems,
  //       },
  //     });
  //     setUpdateId(removed.id);

  //     if (destination.droppableId === 'column-2') {
  //       setShortList(true);
  //     }
  //     if (destination.droppableId === 'column-3') {
  //       setInterviewed(true);
  //     }
  //     if (destination.droppableId === 'column-4') {
  //       setOffered(true);
  //     }
  //     if (destination.droppableId === 'column-5') {
  //       setRejected(true);
  //     }
  //   }
  // };
  // // short list api call function
  // const hanldeSortList = () => {
  //   dispatch(
  //     applicantUpdateStatusMiddleWare({
  //       jd_id,
  //       applicant_id: isUpdateId,
  //       status: 'shortlisted',
  //     }),
  //   )
  //     .then(() => {
  //       setShortList(false);
  //       Toast('Applicant shortlisted successfully');
  //     })
  //     .catch(() => {
  //       setNoLoader(true);
  //       setTimeout(() => setNoLoader(false), 100);
  //       Toast(ERROR_MESSAGE, 'LONG', 'error');
  //     });
  // };
  // // Interview api call function
  // const hanldeInterview = () => {
  //   dispatch(
  //     applicantUpdateStatusMiddleWare({
  //       jd_id,
  //       applicant_id: isUpdateId,
  //       status: 'interviewed',
  //     }),
  //   )
  //     .then(() => {
  //       setInterviewed(false);
  //       Toast('Applicant moved successfully');
  //     })
  //     .catch(() => {
  //       setNoLoader(true);
  //       setTimeout(() => setNoLoader(false), 100);
  //       Toast(ERROR_MESSAGE, 'LONG', 'error');
  //     });
  // };
  // // offered api call function
  // const hanldeOffered = () => {
  //   dispatch(
  //     applicantUpdateStatusMiddleWare({
  //       jd_id,
  //       applicant_id: isUpdateId,
  //       status: 'offered',
  //     }),
  //   )
  //     .then(() => {
  //       setOffered(false);
  //       Toast('Applicant offered successfully');
  //     })
  //     .catch(() => {
  //       setNoLoader(true);
  //       setTimeout(() => setNoLoader(false), 100);
  //       Toast(ERROR_MESSAGE, 'LONG', 'error');
  //     });
  // };
  // // reject api call function
  // const hanldeReject = () => {
  //   dispatch(
  //     applicantUpdateStatusMiddleWare({
  //       jd_id,
  //       applicant_id: isUpdateId,
  //       status: 'rejected',
  //     }),
  //   )
  //     .then(() => {
  //       setRejected(false);
  //       Toast('Applicant rejected successfully');
  //     })
  //     .catch(() => {
  //       setNoLoader(true);
  //       setTimeout(() => setNoLoader(false), 100);
  //       Toast(ERROR_MESSAGE, 'LONG', 'error');
  //     });
  // };

  // // popup cancel function
  // const hanldeCancel = () => {
  //   setNoLoader(true);
  //   setOffered(false);
  //   setShortList(false);
  //   setInterviewed(false);
  //   setRejected(false);
  //   setTimeout(() => setNoLoader(false), 100);
  // };

  return (
    <div className={styles.overAll}>
      <CancelAndDeletePopup
        btnCancel={hanldeCancel}
        btnDelete={hanldeSortList}
        open={isShortList}
        btnRight="Shortlist"
        title={
          <Flex columnFlex className={styles.statusFlex}>
            <Text>
              {`Application status will be updated to the applicant as 'Under
              Review’`}
              .
            </Text>
            <Text>Are you sure to proceed?</Text>
          </Flex>
        }
      />

      <CancelAndDeletePopup
        btnCancel={hanldeCancel}
        btnDelete={hanldeInterview}
        open={isInterviewed}
        btnRight="Move"
        title={`Are you sure to move this applicant to the interviewed stage?`}
      />

      <CancelAndDeletePopup
        btnCancel={hanldeCancel}
        btnDelete={hanldeOffered}
        open={isOffered}
        btnRight="Offer"
        title={
          <Flex columnFlex className={styles.statusFlex}>
            <Text>
              {`Application status will be updated to the applicant as 'Offered’.`}
            </Text>
            <Text>Are you sure to proceed?</Text>
          </Flex>
        }
      />

      <CancelAndDeletePopup
        btnCancel={hanldeCancel}
        btnDelete={hanldeReject}
        open={isRejected}
        btnRight="Reject"
        title={
          <Flex columnFlex className={styles.statusFlex}>
            <Text>
              Application status will be updated to the applicant as ‘No longer
              considered’.
            </Text>
            <Text>Are you sure to proceed?</Text>
          </Flex>
        }
      />

      <DragDropContext
        onDragStart={onDragStart}
        onDragEnd={(result) => {
          onDragEnd(result);
        }}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <DndBoardCol
              key={columnId}
              columnId={columnId}
              tasks={column}
              section={column.section}
              index={index}
              isDropDisabled={index < isIndex}
              outlook={outlook}
              google={google}
              job_details={job_details}
              onClick={onClick}
              cardSelectionMap={cardSelectionMap}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default DndBoardScreen;
