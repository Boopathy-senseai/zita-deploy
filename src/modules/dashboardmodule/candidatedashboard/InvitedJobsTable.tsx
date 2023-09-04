import { useMemo, useState } from 'react';
import LabelWrapper from '../../../uikit/Label/LabelWrapper';
import Table from '../../../uikit/Table/Table';
import { inviteTitle } from './tableHelper';
import styles from './invitedjobstable.module.css';
import { InvitesEntity, Setting } from './candidateDashBoardTypes';

type Props = {
  invites?: InvitesEntity[];
  setting?: Setting;
  hanldeOpenChat: (b: string) => void;
  setJobTitle: (b: string) => void;
};
const InvitedJobsTable = ({
  invites,
  setting,
  hanldeOpenChat,
  setJobTitle,
}: Props) => {
  const [isRowIndex, setRowIndex] = useState<number>();

  const columns = useMemo(
    () => inviteTitle(setting, hanldeOpenChat, setRowIndex, setJobTitle),
    [invites],
  );
  const invitedjobTitle = <span style={{color:"#333333"}}>Invited Jobs</span>  

  return (
    <LabelWrapper size={16} label={invitedjobTitle} bold>
      <div className={styles.cardStyle}>
        <Table
          isscroll={true}
          columns={columns}
          dataSource={invites}
          empty="No Invited Jobs"
          scrollHeight={150}
          border="normal"
     
          rowFocusIndex={isRowIndex}
        />
      </div>
    </LabelWrapper>
  );
};

export default InvitedJobsTable;
