import { useMemo, useState } from 'react';
import LabelWrapper from '../../../uikit/Label/LabelWrapper';
import Table from '../../../uikit/Table/Table';
import { Flex } from '../../../uikit';
import { appliedTitle } from './tableHelper';
import styles from './appliedjobstable.module.css';
import { AppliedJobEntity, Setting } from './candidateDashBoardTypes';

type Props = {
  applied_job?: AppliedJobEntity[];
  setting?: Setting;
  hanldeOpenChat: (b: string) => void;
  setJobTitle:(arg:string)=>void
};
const AppliedJobsTable = ({ applied_job, setting, hanldeOpenChat,setJobTitle }: Props) => {
  const [isRowIndex, setRowIndex] = useState<number>();

  const columns = useMemo(
    () => appliedTitle(setting, hanldeOpenChat, setRowIndex,setJobTitle),
    [applied_job],
  );
    const appliedjobTitle = <span style={{color:"#333333"}}>Applied Jobs</span>  
    
    return (
    <LabelWrapper size={16} bold label={appliedjobTitle} >
      {/* <Flex> */}
      <div className={styles.cardStyle}>
        <Table
          columns={columns}
          dataSource={applied_job}
          empty="No Applied Jobs"
          scrollHeight={270}
          border="normal"
          isscroll={true}
          rowFocusIndex={isRowIndex}
        />
      </div>
      {/* </Flex> */}
    </LabelWrapper>
  );
};

export default AppliedJobsTable;
