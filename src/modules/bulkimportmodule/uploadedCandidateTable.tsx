import Text from '../../uikit/Text/Text';
import { isEmpty } from '../../uikit/helper';
import ProgressBar from '../../uikit/ProgressBar/ProgressBar';
import Action from './Action';
import { EmpPoolEntity } from './bulkImportTypes';
import ContactAdd from './ContactAdd';
import EmailAdd from './EmailAdd';
import ExperienceAdd from './ExperienceAdd';
import ImportedOnAdd from './ImportedOnAdd';
import LocationAdd from './LocationAdd';
import QualificationAdd from './QualificationAdd';
import SkillsAdd from './SkillsAdd';
import Status from './Status';
import ValueAddName from './ValueAddName';

export const title = (
  hanldeProfileView: (arg: number) => void,
  setFeaturesBalance: (a: any) => void,
  searchValue: string,
  tabKey: string,
  total_count: number,
  completed: number,
  incompleted: number,
  pageNumber: number,
) => [
  {
    title: 'Name *',
    dataIndex: 'first_name',
    key: 'first_name',
    flex: 12,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <ValueAddName
          value={value}
          
          searchValue={searchValue}
          completed={completed}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
  {
    title: 'Email ID *',
    dataIndex: 'email',
    key: 'email',
    flex: 12,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <EmailAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
    flex: 11,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <ContactAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    flex: 11,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <LocationAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
  {
    title: 'Qualification',
    dataIndex: 'qualification',
    key: 'qualification',
    flex:12,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <QualificationAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
  {
    title: 'Experience',
    dataIndex: 'work_exp',
    key: 'work_exp',
    flex: 12,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <ExperienceAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
  {
    title: 'Skills',
    dataIndex: 'skills',
    key: 'skills',
    flex: 14,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <SkillsAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },

  {
    title: 'Updated On',
    dataIndex: 'updated_on',
    key: 'updated_on',
    flex: 7,
    render: (value: string) => {
      return <ImportedOnAdd value={value} />;
    },
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    flex: 4,
    render: (_a: any, value: EmpPoolEntity) => {
      return <Status value={value} />;
    },
    align: 'center',
  }, {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    flex: 4,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <Action
          value={value}
          setFeaturesBalance={setFeaturesBalance}
          hanldeProfileView={hanldeProfileView}
          searchValue={searchValue}
          applicant={false}
          tabKey={tabKey}
          completed={completed}
          incompleted={incompleted}
          total_count={total_count}
          pageNumber={pageNumber}
        />
      );
    },
    align: 'center',
  },

];

export const applicantTable = (
  setFeaturesBalance: (arg: number) => void,
  hanldeProfileView: (arg: number) => void,
  searchValue: string,
  tabKey: string,
  isJdId: string,
  total_count: number,
  completed: number,
  incompleted: number,
  pageNumber: number,
) => [
  {
    title: 'Name *',
    dataIndex: 'first_name',
    key: 'first_name',
    flex: 13,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <ValueAddName
          value={value}
       
          searchValue={searchValue}
          completed={completed}
          jdId={isJdId}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
  {
    title: 'Email ID *',
    dataIndex: 'email',
    key: 'email',
    flex: 13,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <EmailAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
          jdId={isJdId}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
    flex: 11,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <ContactAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
          jdId={isJdId}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
    {
    title: 'Match',
    dataIndex: 'match',
    key: 'match',
    flex: 7,
    render: (value: number) => {
      return (
        <>
          {value === null ? (
            <ProgressBar type="hr" percentage={0} />
          ) : (
            <ProgressBar type="hr" percentage={value} />
          )}
        </>
      );
    },
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    flex: 12,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <LocationAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
          jdId={isJdId}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
  {
    title: 'Qualification',
    dataIndex: 'qualification',
    key: 'qualification',
    flex: 13,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <QualificationAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          jdId={isJdId}
          pageNumber={pageNumber}
        />
      );
    },
  },
  {
    title: 'Experience',
    dataIndex: 'work_exp',
    key: 'work_exp',
    flex: 13,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <ExperienceAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
          incompleted={incompleted}
              jdId={isJdId}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
  {
    title: 'Skills',
    dataIndex: 'skills',
    key: 'skills',
    flex: 12,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <SkillsAdd
          value={value}
          searchValue={searchValue}
          completed={completed}
           jdId={isJdId}
          incompleted={incompleted}
          total_count={total_count}
          tabKey={tabKey}
          pageNumber={pageNumber}
        />
      );
    },
  },
 
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    flex: 5,
    render: (_a: any, value: EmpPoolEntity) => {
      return <Status value={value} jdId={isJdId}/>;
    },
    align: 'center',
  },

 
   {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    flex: 5,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <Action
          value={value}
          setFeaturesBalance={setFeaturesBalance}
          hanldeProfileView={hanldeProfileView}
          searchValue={searchValue}
          applicant={true}
          tabKey={tabKey}
          jdId={isJdId}
          completed={completed}
          incompleted={incompleted}
          total_count={total_count}
          pageNumber={pageNumber}
        />
      );
    },
    align: 'center',
  },
];