import { useEffect, useState } from 'react';
import Flex from '../../uikit/Flex/Flex';
import BulkAction from './BulkAction';
import TalentCardMap from './TalentCardMap';
import { DataEntity } from './talentSourcingTypes';

type experienceOptionsType = {
  value: string;
  label: string;
};

type Props = {
  searchData?: DataEntity[];
  pagesVisited: number;
  usersPerPage: number;
  handleUnlockSubmit: (arg: string) => void;
  searchLoader: boolean;
  isBachelors: boolean;
  isDoctorate: boolean;
  isMasters: boolean;
  isAny: boolean;
  isRelocate: boolean;
  isExperience: experienceOptionsType;
  handleCandidateView: (hashKey: string) => void;
  source_limit: number;
  setSourceLimit: (arg: number) => void;
  setCandidatesLimit: (arg: string) => void;
  isCandidatesLimit: string;
  setSuccess: (arg: boolean) => void;
  setNoLimit: (arg: boolean) => void;
  setNoPermission: (arg: boolean) => void;
  candi_list?: string[];
  setNoCount: (arg: boolean) => void;
  setCandiList: (arg: string[]) => void;
  setFree: (arg: boolean) => void;
  planID?: number;
  // setUnlockLoader: (arg: boolean) => void;
};

const TalentCardList = ({
  searchData,
  pagesVisited,
  usersPerPage,
  handleUnlockSubmit,
  searchLoader,
  isBachelors,
  isDoctorate,
  isMasters,
  isAny,
  isExperience,
  isRelocate,
  handleCandidateView,
  source_limit,
  setSourceLimit,
  setCandidatesLimit,
  isCandidatesLimit,
  setSuccess,
  setNoLimit,
  setNoPermission,
  candi_list,
  setNoCount,
  setCandiList,
  setFree,
  planID,
}: // setUnlockLoader,
Props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<any>([]);
// select box function
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(
      searchData &&
        searchData
          .slice(pagesVisited, pagesVisited + usersPerPage)
          .map((li)=>
          candi_list?.includes(li.id.toString()) ? false : li.candidate_hash,
        ),
    );
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e: { target: { id: string; checked: boolean } }) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item: any) => item !== id));
    }
  };

  useEffect(() => {
    if (isCheck && isCheck.length !== searchData?.length) {
      setIsCheckAll(false);
    }
    // eslint-disable-next-line
  }, [isCheck]);

  useEffect(() => {
    setIsCheckAll(false);
    setIsCheck([]);
  }, [
    searchLoader,
    isAny,
    isBachelors,
    isMasters,
    isDoctorate,
    isRelocate,
    isExperience,
  ]);

  if (isCheck.length === searchData?.length && isCheckAll === false) {
    setIsCheckAll(true);
  }
  return (
    <Flex wrap row>
      <BulkAction
        // setUnlockLoader={setUnlockLoader}
        setCandiList={setCandiList}
        setNoCount={setNoCount}
        setNoLimit={setNoLimit}
        setNoPermission={setNoPermission}
        setSuccess={setSuccess}
        setCandidatesLimit={setCandidatesLimit}
        isCandidatesLimit={isCandidatesLimit}
        source_limit={source_limit}
        setSourceLimit={setSourceLimit}
        handleSelectAll={handleSelectAll}
        isCheckAll={isCheckAll}
        searchResult={searchData?.length}
        isCheckArray={isCheck}
        setFree={setFree}
        planID={planID}
        setIsCheck={setIsCheck}
      />
      {searchData &&
        searchData
          .slice(pagesVisited, pagesVisited + usersPerPage)
          .map((dataList, index) => {
            return (
              <TalentCardMap
                candi_list={candi_list}
                handleCandidateView={handleCandidateView}
                isCheck={isCheck}
                handleClick={handleClick}
                key={dataList.first_name + index}
                talentList={dataList}
                index={index}
                handleUnlockSubmit={handleUnlockSubmit}
              />
            );
          })}
    </Flex>
  );
};

export default TalentCardList;
