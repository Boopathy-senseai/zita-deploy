import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SvgRoundTick from '../../icons/SvgRoundTick';
import { AppDispatch, RootState } from '../../store';
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
  useEffect(()=>{
    // dispatch( applicantStatusMiddleWare({jd_id:jd_id,
    //   can_id:can_id}))
    console.log(invite,'plzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
  },[])
 
  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 120}
    >
      <Text bold   className={styles.screenText}>
        Invitation Status 
      </Text>{
      console.log(invite,'plzzzzzzzzzzzzzzzzzzzzzhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhzzzzzzzz')}
      {invite && invite.length !== 0 ? (
        <Flex row center className={styles.statusListStyle}>
          <Flex className={styles.svgFlex}>
            <SvgRoundTick height={30} width={30} />
          </Flex>
          <Text className={styles.statusStyle}>
            Invited on{' '}
            {getDateString(
             invite &&
             invite.length &&
                new Date(invite[invite.length - 1].created_at),
              'll',
            )}
          </Text>
        </Flex>
      ):<Flex flex={1} center middle>
      <Text color="gray">Not Specified</Text>
    </Flex>}
    </Flex>
  );
};

export default InvitationStatusTab;
 