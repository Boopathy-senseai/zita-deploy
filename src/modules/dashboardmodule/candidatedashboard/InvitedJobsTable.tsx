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
  return (
    <LabelWrapper size={16} label="Invited Jobs" bold>
      <div className={styles.cardStyle}>
        <Table
          columns={columns}
          dataSource={invites}
          empty="No Invited Jobs"
          scrollHeight={270}
          border="normal"
          fixedScrollHeight
          rowFocusIndex={isRowIndex}
        />
      </div>
    </LabelWrapper>
  );
};

export default InvitedJobsTable;
