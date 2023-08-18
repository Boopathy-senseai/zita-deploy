import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SvgRoundTick from '../../icons/SvgRoundTick';
import SvgChatmessage from '../../icons/SvgChatmessage';
import {   AppDispatch, RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import styles from './screeningstatustab.module.css';
import { applicantInviteMiddleWare, applicantStatusMiddleWare } from './store/middleware/applicantProfileMiddleware';
// import { AsyncThunkAction } from '@reduxjs/toolkit';
// import { InviteEntity } from './applicantProfileTypes';

const InvitationStatusTab = () => {
  const dispatch: AppDispatch = useDispatch();
  const { invite,jd_id ,can_id} = useSelector(({  applicantStausReducers ,applicantProfileInitalReducers }: RootState) => {
    return {
      invite: applicantStausReducers?.invite,
      // invite: applicantStausReducers?.invite,
      can_id: applicantProfileInitalReducers?.can_id, 
        jd_id: applicantProfileInitalReducers?.jd_id,
    };
  }); 
  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 120}
    >
      <Text bold   className={styles.screenText}>
        Invitation Status 
      </Text>
      
    </Flex>
  );
};

export default InvitationStatusTab;
 