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
    flex: 13,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <ValueAddName
          value={value}
          hanldeProfileView={hanldeProfileView}
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
    title: 'Contact Number',
    dataIndex: 'contact',
    key: 'contact',
    flex: 13,
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
    flex: 12,
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
    flex: 11,
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
    flex: 10,
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
    title: 'Imported On',
    dataIndex: 'created_at',
    key: 'created_at',
    flex: 10,
    render: (value: string) => {
      return <ImportedOnAdd value={value} />;
    },
    align: 'center',
  },
  {
    title: 'Updated On',
    dataIndex: 'updated_on',
    key: 'updated_on',
    flex: 10,
    render: (value: string) => {
      return <ImportedOnAdd value={value} />;
    },
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    flex: 8,
    render: (_a: any, value: EmpPoolEntity) => {
      return <Status value={value} />;
    },
    align: 'center',
  },
  {
    title: 'Delete',
    dataIndex: 'action',
    key: 'action',
    flex: 8,
    render: (_a: any, value: EmpPoolEntity) => {
      return (
        <Action
          value={value}
          setFeaturesBalance={setFeaturesBalance}
          searchValue={searchValue}
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
