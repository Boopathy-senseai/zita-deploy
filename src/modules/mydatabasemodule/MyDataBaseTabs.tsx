import { FormikProps } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import Tab from '../../uikit/Tab/Tab';
import Tabs from '../../uikit/Tab/Tabs';
import MyDataBaseList from './MyDataBaseList'; // eslint-disable-line
import { MyDataFormProps } from './MyDataBaseScreen'; // eslint-disable-line
import { DataEntity } from './myDataBaseTypes';

type Props = {
  data: DataEntity[];
  setTabKey: (arg: SetStateAction<string>) => void;
  tabKey: string;
  totalCount: number;
  filterFormik: FormikProps<MyDataFormProps>;
  qaValue: string;
  skillsOptionsList: any;
  jobId: string | boolean;
  hanldeInvite: (arg: number) => void;
  isFav: boolean;
  handleFav: () => void;
  handleSelectAll: () => void;
  isCheckAll: boolean;
  isCheck: string[];
  handleCheckBoxClick: (e: {
    target: { id: string; checked: boolean };
  }) => void;
  hanldeDownload: () => void;
  isSortOptions: {
    value: string;
    label: string;
  };
  setSortOptions: Dispatch<
    SetStateAction<{
      value: string;
      label: string;
    }>
  >;
  isPage: number;
  setPage: (arg: number) => void;
  addFavFilter: string;
};

const MyDataBaseTabs = ({
  data,
  setTabKey,
  tabKey,
  totalCount,
  filterFormik,
  qaValue,
  skillsOptionsList,
  jobId,
  hanldeInvite,
  isFav,
  handleFav,
  handleSelectAll,
  isCheck,
  isCheckAll,
  handleCheckBoxClick,
  hanldeDownload,
  setSortOptions,
  isSortOptions,
  isPage,
  setPage,
  addFavFilter,
}: Props) => {
  return (
    <Tabs
      activeKey={tabKey}
      onSelect={(key: SetStateAction<string>) => setTabKey(key)}
    >
      <Tab title={'All'} eventKey={''}>
        <MyDataBaseList
          data={data}
          tabKey={tabKey}
          totalCount={totalCount}
          filterFormik={filterFormik}
          qaValue={qaValue}
          skillsOptionsList={skillsOptionsList}
          jobId={jobId}
          hanldeInvite={hanldeInvite}
          isFav={isFav}
          handleFav={handleFav}
          handleSelectAll={handleSelectAll}
          isCheckAll={isCheckAll}
          isCheck={isCheck}
          handleCheckBoxClick={handleCheckBoxClick}
          hanldeDownload={hanldeDownload}
          setSortOptions={setSortOptions}
          isSortOptions={isSortOptions}
          isPage={isPage}
          setPage={setPage}
          addFavFilter={addFavFilter}
        />
      </Tab>
      <Tab title={'Unlocked'} eventKey={'2'}>
        <MyDataBaseList
          data={data}
          tabKey={tabKey}
          totalCount={totalCount}
          filterFormik={filterFormik}
          qaValue={qaValue}
          skillsOptionsList={skillsOptionsList}
          jobId={jobId}
          hanldeInvite={hanldeInvite}
          isFav={isFav}
          handleFav={handleFav}
          handleSelectAll={handleSelectAll}
          isCheckAll={isCheckAll}
          isCheck={isCheck}
          handleCheckBoxClick={handleCheckBoxClick}
          hanldeDownload={hanldeDownload}
          setSortOptions={setSortOptions}
          isSortOptions={isSortOptions}
          isPage={isPage}
          setPage={setPage}
          addFavFilter={addFavFilter}
        />
      </Tab>
      <Tab title={'Imported'} eventKey={'1'}>
        <MyDataBaseList
          data={data}
          tabKey={tabKey}
          totalCount={totalCount}
          filterFormik={filterFormik}
          qaValue={qaValue}
          skillsOptionsList={skillsOptionsList}
          jobId={jobId}
          hanldeInvite={hanldeInvite}
          isFav={isFav}
          handleFav={handleFav}
          handleSelectAll={handleSelectAll}
          isCheckAll={isCheckAll}
          isCheck={isCheck}
          handleCheckBoxClick={handleCheckBoxClick}
          hanldeDownload={hanldeDownload}
          setSortOptions={setSortOptions}
          isSortOptions={isSortOptions}
          isPage={isPage}
          setPage={setPage}
          addFavFilter={addFavFilter}
        />
      </Tab>
      <Tab title={'Applicants'} eventKey={'3'}>
        <MyDataBaseList
          data={data}
          tabKey={tabKey}
          totalCount={totalCount}
          filterFormik={filterFormik}
          qaValue={qaValue}
          skillsOptionsList={skillsOptionsList}
          jobId={jobId}
          hanldeInvite={hanldeInvite}
          isFav={isFav}
          handleFav={handleFav}
          handleSelectAll={handleSelectAll}
          isCheckAll={isCheckAll}
          isCheck={isCheck}
          handleCheckBoxClick={handleCheckBoxClick}
          hanldeDownload={hanldeDownload}
          setSortOptions={setSortOptions}
          isSortOptions={isSortOptions}
          isPage={isPage}
          setPage={setPage}
          addFavFilter={addFavFilter}
        />
      </Tab>
      <Tab title={'Others'} eventKey={'4'}>
        <MyDataBaseList
          data={data}
          tabKey={tabKey}
          totalCount={totalCount}
          filterFormik={filterFormik}
          qaValue={qaValue}
          skillsOptionsList={skillsOptionsList}
          jobId={jobId}
          hanldeInvite={hanldeInvite}
          isFav={isFav}
          handleFav={handleFav}
          handleSelectAll={handleSelectAll}
          isCheckAll={isCheckAll}
          isCheck={isCheck}
          handleCheckBoxClick={handleCheckBoxClick}
          hanldeDownload={hanldeDownload}
          setSortOptions={setSortOptions}
          isSortOptions={isSortOptions}
          isPage={isPage}
          setPage={setPage}
          addFavFilter={addFavFilter}
        />
      </Tab>
    </Tabs>
  );
};

export default MyDataBaseTabs;
