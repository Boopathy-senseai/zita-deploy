import { SetStateAction, useState } from 'react';
import Tab from '../../uikit/Tab/Tab';
import Tabs from '../../uikit/Tab/Tabs';
import { EmpPoolEntity } from './bulkImportTypes';
import CandidateDatabaseTab from './CandidateDatabaseTab';
import Applicants from './applicants';
import LogFileTab from './LogFileTab';  

type Props = {
  emp_pool?: EmpPoolEntity[];
  total_count: number;
  completed: number;
  incompleted: number;
  handleTotal: () => void;
  handleSubmit: () => void;

  handleCompleted: () => void;

  handleInCompeleted: () => void;
  // handleApplicantView: () => void;
  searchValue: any;
  jd_id: any;
  searchHandleChange: any;
  features_balance: number;
  setFeaturesBalance: (a: number | null) => void;
  isSearch: number;
  formik: any;
  setPageNumber: (a: number) => void;
  pageNumber: number;
  upDateloader:boolean
};


const BulkImportTabs = ({
  emp_pool,
  total_count,
  completed,
  incompleted,
  handleTotal,
  handleSubmit,
  jd_id,
  handleCompleted,
  handleInCompeleted,
  searchValue,
  searchHandleChange,
  features_balance,
  setFeaturesBalance,
  isSearch,
  formik,
  setPageNumber,
  pageNumber,
  upDateloader
}: Props) => {
  const [tabKey, setKey] = useState('0');

  return (
    <Tabs
      activeKey={tabKey}
      onSelect={(keys: SetStateAction<string>) => setKey(keys)}
    >
      <Tab title={'Candidate Database'} eventKey={'0'}>
      {tabKey === '0' &&
        <CandidateDatabaseTab
          // emp_pool={emp_pool}
          // total_count={total_count}
          // completed={completed}
          // incompleted={incompleted}
          handleTotal={handleTotal}
          handleSubmit={handleSubmit}
          handleCompleted={handleCompleted}
          handleInCompeleted={handleInCompeleted}
          searchValue={searchValue}
          searchHandleChange={searchHandleChange}
          setKey={setKey}
          // features_balance={features_balance}
          setFeaturesBalance={setFeaturesBalance}
          isSearch={isSearch}
          formik={formik}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          // upDateloader={upDateloader}
        />
        }
      </Tab>
        <Tab title={'Applicants'} eventKey={'1'} >
        {tabKey === '1' &&
         <Applicants
          emp_pool={emp_pool}
          total_count={total_count}
          jd_id={jd_id}
          completed={completed}
          incompleted={incompleted}
          // handleTotal={handleTotal}
          // handleSubmit={handleSubmitWithJd}
          
          // handleInCompeleted={handleInCompeleted}
          searchValue={searchValue}
          searchHandleChange={searchHandleChange}
          setKey={setKey}
          features_balance={features_balance}
          setFeaturesBalance={setFeaturesBalance}
          // isSearch={isSearch}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          upDateloader={upDateloader}
        />
      }
      </Tab>
      <Tab title={'Log File'} eventKey={'2'}>
        <LogFileTab getKey={tabKey} />
      </Tab>
    </Tabs>
  );
};

export default BulkImportTabs;
