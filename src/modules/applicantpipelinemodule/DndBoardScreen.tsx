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
  ICardSelectionData,
  ICardSelectionMap,
} from './applicantPipeLineTypes';
import DndBoardCol from './DndBoardCol';
import styles from './dndboardscreen.module.css';
import { IStageColumn, columnTypes } from './dndBoardTypes';
import { columnOrder } from './initialData';
import { applicantUpdateStatusMiddleWare } from './store/middleware/applicantpipelinemiddleware';

type Props = {
  // applicant: ApplicantEntity[];
  // shortlisted: ShortlistedEntityOrRejectedEntity[];
  // selected: InterviewedEntityOrSelectedEntity[];
  // rejected: ShortlistedEntityOrRejectedEntity[];
  // interviewed: InterviewedEntityOrSelectedEntity[];
  columns: IStageColumn[];
  jd_id: string;
  outlook?: GoogleEntity[];
  google?: GoogleEntity[];
  job_details: JobDetailsEntity;
  onDragStart?: (start: { source: { droppableId: string } }) => void;
  onDragEnd?: (result: DropResult) => void;
  // hanldeSortList?: () => void;
  // hanldeInterview?: () => void;
  // hanldeOffered?: () => void;
  // hanldeReject?: () => void;
  isAlert: {
    type: 'bulk' | 'single';
    source: string;
    destination: string;
    open: boolean;
    droppableId: number;
    taskId?: any;
  } | null;
  hanldeAlertConfirm?: () => void;
  hanldeCancel?: () => void;
  onRefresh?: () => void;
  // isShortList: boolean;
  // isInterviewed: boolean;
  // isOffered: boolean;
  // isRejected: boolean;
  // isUpdateId: number;
  isIndex: number;
  onClick?: (data: ICardSelectionData) => void;
  // selectedCardList: {
  //   task: any;
  //   // index: number;
  //   // columnId: string;
  //   // job_details: JobDetailsEntity;
  // }[];
  cardSelectionMap: ICardSelectionMap;
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
  // hanldeSortList,
  // hanldeInterview,
  // hanldeOffered,
  // hanldeReject,
  isAlert,
  hanldeAlertConfirm,
  hanldeCancel,
  onRefresh,
  // isShortList,
  // isInterviewed,
  // isOffered,
  // isRejected,
  // isUpdateId,
  isIndex,
  onClick,
  cardSelectionMap,
}: Props) => {
  return (
    <div className={styles.overAll}>
      {isAlert && (
        <CancelAndDeletePopup
          btnCancel={hanldeCancel}
          btnDelete={hanldeAlertConfirm}
          open={isAlert.open}
          btnRight={'Move'}
          title={
            <Flex columnFlex className={styles.statusFlex}>
              {/* {console.log(isAlert.destination)} */}
              {isAlert.destination !== 'Rejected' ? (
                <Text color={'theme'} size={14} >
                  {`Application status will be updated to the applicant as 'Under Review’.`}
                </Text>
              ) : (
                <Text color={'theme'} size={14} >
                  {`Application status will be updated to the applicant as ‘No longer considered’.`}
                </Text>
              )}
              <Text size={13} color='theme'>Are you sure to proceed?</Text>
            </Flex>
          }
        />
      )}

      <DragDropContext
        onDragStart={onDragStart}
        onDragEnd={(result) => {
          onDragEnd(result);
        }}
      >
        {columns.map((column, index) => {
          return (
            <DndBoardCol
              key={column.columnId}
              column={column}
              index={index}
              isDropDisabled={index < isIndex}
              outlook={outlook}
              google={google}
              job_details={job_details}
              onClick={onClick}
              cardSelectionMap={cardSelectionMap}
              onRefresh={onRefresh}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default DndBoardScreen;
