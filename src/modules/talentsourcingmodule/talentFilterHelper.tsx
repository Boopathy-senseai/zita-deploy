import { DataEntity } from './talentSourcingTypes';
type experienceOptionsType = {
  value: string;
  label: string;
};
// talent sourcing filter condition

export const talentFilterHelper = (
  getStoreSearchData: DataEntity[],
  isExperience: experienceOptionsType,
) => {
  const searchBachelorsFilter =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) => x.education_level === 'Bachelors',
    );
  const searchDoctorateFilter =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) => x.education_level === 'Doctorate',
    );
  const searchMastersFilter =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) => x.education_level === 'Masters',
    );
  const searchBachelorsMastersFilter =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level === 'Bachelors' || x.education_level === 'Masters',
    );
  const searchBachelorsDoctorateFilter =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level === 'Bachelors' || x.education_level === 'Doctorate',
    );

  const searchDoctorateMastersFilter =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level === 'Doctorate' || x.education_level === 'Masters',
    );
  const searchThreeFilter =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level === 'Doctorate' ||
        x.education_level === 'Masters' ||
        x.education_level === 'Bachelors',
    );
  const searchRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter((x: DataEntity) => x.relocate === '1');

  const searchBachelorRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.relocate === '1' && x.education_level === 'Bachelors',
    );
  const searchMasterRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) => x.relocate === '1' && x.education_level === 'Masters',
    );
  const searchDoctorateRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.relocate === '1' && x.education_level === 'Doctorate',
    );
  const searchBachelorMasterRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.relocate === '1' && x.education_level === 'Bachelors') ||
        (x.relocate === '1' && x.education_level === 'Masters'),
    );
  const searchBachelorDoctorateRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.relocate === '1' && x.education_level === 'Bachelors') ||
        (x.relocate === '1' && x.education_level === 'Doctorate'),
    );
  const searchMasterDoctorateRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.relocate === '1' && x.education_level === 'Masters') ||
        (x.relocate === '1' && x.education_level === 'Doctorate'),
    );
  const searchBachelorsMasterDoctorateRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.relocate === '1' && x.education_level === 'Masters') ||
        (x.relocate === '1' && x.education_level === 'Doctorate') ||
        (x.relocate === '1' && x.education_level === 'Bachelors'),
    );

  const searchExperience =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) => x.work_experience === isExperience.value,
    );

  const searchExperienceBachelor =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.work_experience === isExperience.value &&
        x.education_level === 'Bachelors',
    );

  const searchExperienceMaster =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.work_experience === isExperience.value &&
        x.education_level === 'Masters',
    );

  const searchExperienceDoctorate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.work_experience === isExperience.value &&
        x.education_level === 'Doctorate',
    );

  const searchExperienceBachelorMaster =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.work_experience === isExperience.value &&
          x.education_level === 'Bachelors') ||
        (x.work_experience === isExperience.value &&
          x.education_level === 'Masters'),
    );

  const searchExperienceBachelorDoctorate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.work_experience === isExperience.value &&
          x.education_level === 'Bachelors') ||
        (x.work_experience === isExperience.value &&
          x.education_level === 'Doctorate'),
    );

  const searchExperienceDoctorateMaster =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.work_experience === isExperience.value &&
          x.education_level === 'Masters') ||
        (x.work_experience === isExperience.value &&
          x.education_level === 'Doctorate'),
    );
  const searchExperienceBachelorMasterDoctorate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.work_experience === isExperience.value &&
          x.education_level === 'Bachelors') ||
        (x.work_experience === isExperience.value &&
          x.education_level === 'Masters') ||
        (x.work_experience === isExperience.value &&
          x.education_level === 'Doctorate'),
    );
  const searchExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.work_experience === isExperience.value && x.relocate === '1',
    );

  const searchBachelorExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.work_experience === isExperience.value &&
        x.relocate === '1' &&
        x.education_level === 'Bachelors',
    );
  const searchDoctorateExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.work_experience === isExperience.value &&
        x.relocate === '1' &&
        x.education_level === 'Doctorate',
    );
  const searchMastersExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.work_experience === isExperience.value &&
        x.relocate === '1' &&
        x.education_level === 'Masters',
    );

  const searchMastersDoctorateExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.work_experience === isExperience.value &&
          x.relocate === '1' &&
          x.education_level === 'Masters') ||
        (x.work_experience === isExperience.value &&
          x.relocate === '1' &&
          x.education_level === 'Doctorate'),
    );
  const searchBachelorDoctorateExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.work_experience === isExperience.value &&
          x.relocate === '1' &&
          x.education_level === 'Bachelors') ||
        (x.work_experience === isExperience.value &&
          x.relocate === '1' &&
          x.education_level === 'Doctorate'),
    );
  const searchBachelorsMasterExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.work_experience === isExperience.value &&
          x.relocate === '1' &&
          x.education_level === 'Masters') ||
        (x.work_experience === isExperience.value &&
          x.relocate === '1' &&
          x.education_level === 'Bachelors'),
    );

  const searchBachelorsMasterDoctorateExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.work_experience === isExperience.value &&
          x.relocate === '1' &&
          x.education_level === 'Masters') ||
        (x.work_experience === isExperience.value &&
          x.relocate === '1' &&
          x.education_level === 'Bachelors') ||
        (x.work_experience === isExperience.value &&
          x.relocate === '1' &&
          x.education_level === 'Doctorate'),
    );

  const searchUnselectCheckbox =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.work_experience === isExperience.value && x.relocate === '1',
    );

  const searchUnCheckExperience =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) => x.work_experience === isExperience.value,
    );

  //other condition

  const searchOther =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level !== 'Doctorate' &&
        x.education_level !== 'Bachelors' &&
        x.education_level !== 'Masters' &&
        x.education_level !== 'not_set',
    );

  const searchOtherRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level !== 'Doctorate' &&
        x.education_level !== 'Bachelors' &&
        x.education_level !== 'Masters' &&
        x.education_level !== 'not_set' &&
        x.relocate === '1',
    );

  const searchOtherExperience =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level !== 'Doctorate' &&
        x.education_level !== 'Bachelors' &&
        x.education_level !== 'Masters' &&
        x.education_level !== 'not_set' &&
        x.work_experience === isExperience.value,
    );

  const searchOtherExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level !== 'Doctorate' &&
        x.education_level !== 'Bachelors' &&
        x.education_level !== 'Masters' &&
        x.education_level !== 'not_set' &&
        x.work_experience === isExperience.value &&
        x.relocate === '1',
    );

  const searchOtherBachelor =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level === 'Bachelors' ||
        (x.education_level !== 'Doctorate' &&
          x.education_level !== 'Masters' &&
          x.education_level !== 'not_set'),
    );

  const searchOtherBachelorRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Bachelors' && x.relocate === '1') ||
        (x.education_level !== 'Doctorate' &&
          x.education_level !== 'Masters' &&
          x.education_level !== 'not_set' &&
          x.relocate === '1'),
    );

  const searchOtherBachelorExperience =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Bachelors' &&
          x.work_experience === isExperience.value) ||
        (x.education_level !== 'Doctorate' &&
          x.education_level !== 'Masters' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value),
    );

  const searchOtherBachelorExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Bachelors' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level !== 'Doctorate' &&
          x.education_level !== 'Masters' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1'),
    );

  const searchOtherMasters =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level === 'Masters' ||
        (x.education_level !== 'Bachelors' &&
          x.education_level !== 'Doctorate' &&
          x.education_level !== 'not_set'),
    );

  const searchOtherMastersRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Masters' && x.relocate === '1') ||
        (x.education_level !== 'Bachelors' &&
          x.education_level !== 'Doctorate' &&
          x.education_level !== 'not_set' &&
          x.relocate === '1'),
    );

  const searchOtherMastersExperience =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Masters' &&
          x.work_experience === isExperience.value) ||
        (x.education_level !== 'Bachelors' &&
          x.education_level !== 'Doctorate' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value),
    );

  const searchOtherMastersExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Masters' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level !== 'Bachelors' &&
          x.education_level !== 'Doctorate' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1'),
    );

  const searchOtherDoctorate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level === 'Doctorate' ||
        (x.education_level !== 'Bachelors' &&
          x.education_level !== 'Masters' &&
          x.education_level !== 'not_set'),
    );

  const searchOtherDoctorateRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Doctorate' && x.relocate === '1') ||
        (x.education_level !== 'Bachelors' &&
          x.relocate === '1' &&
          x.education_level !== 'Masters' &&
          x.education_level !== 'not_set'),
    );

  const searchOtherDoctorateExperience =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Doctorate' &&
          x.work_experience === isExperience.value) ||
        (x.education_level !== 'Bachelors' &&
          x.education_level !== 'Masters' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value),
    );

  const searchOtherDoctorateExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Doctorate' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level !== 'Bachelors' &&
          x.education_level !== 'Masters' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1'),
    );

  const searchOtherBachelorsMasters =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level === 'Bachelors' ||
        x.education_level === 'Masters' ||
        (x.education_level !== 'Doctorate' && x.education_level !== 'not_set'),
    );

  const searchOtherBachelorsMastersRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Bachelors' && x.relocate === '1') ||
        (x.education_level === 'Masters' && x.relocate === '1') ||
        (x.education_level !== 'Doctorate' &&
          x.education_level !== 'not_set' &&
          x.relocate === '1'),
    );

  const searchOtherBachelorsMastersExperience =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Bachelors' &&
          x.work_experience === isExperience.value) ||
        (x.education_level === 'Masters' &&
          x.work_experience === isExperience.value) ||
        (x.education_level !== 'Doctorate' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value),
    );

  const searchOtherBachelorsMastersExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Bachelors' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level === 'Masters' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level !== 'Doctorate' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1'),
    );

  const searchOtherBachelorsDoctorate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level === 'Bachelors' ||
        x.education_level === 'Doctorate' ||
        (x.education_level !== 'Masters' && x.education_level !== 'not_set'),
    );

  const searchOtherBachelorsDoctorateRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Bachelors' && x.relocate === '1') ||
        (x.education_level === 'Doctorate' && x.relocate === '1') ||
        (x.education_level !== 'Masters' &&
          x.education_level !== 'not_set' &&
          x.relocate === '1'),
    );

  const searchOtherBachelorsDoctorateExperience =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Bachelors' &&
          x.work_experience === isExperience.value) ||
        (x.education_level === 'Doctorate' &&
          x.work_experience === isExperience.value) ||
        (x.education_level !== 'Masters' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value),
    );

  const searchOtherBachelorsDoctorateExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Bachelors' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level === 'Doctorate' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level !== 'Masters' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1'),
    );

  const searchOtherMastersDoctorate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level === 'Masters' ||
        x.education_level === 'Doctorate' ||
        (x.education_level !== 'Bachelors' && x.education_level !== 'not_set'),
    );

  const searchOtherMastersDoctorateReloacate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Masters' && x.relocate === '1') ||
        (x.education_level === 'Doctorate' && x.relocate === '1') ||
        (x.education_level !== 'Bachelors' &&
          x.education_level !== 'not_set' &&
          x.relocate === '1'),
    );

  const searchOtherMastersDoctorateExperience =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Masters' &&
          x.work_experience === isExperience.value) ||
        (x.education_level === 'Doctorate' &&
          x.work_experience === isExperience.value) ||
        (x.education_level !== 'Bachelors' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value),
    );

  const searchOtherMastersDoctorateExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Masters' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level === 'Doctorate' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level !== 'Bachelors' &&
          x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1'),
    );

  const searchOtherBachelorsMastersDoctorate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        x.education_level === 'Masters' ||
        x.education_level === 'Doctorate' ||
        x.education_level === 'Bachelors' ||
        x.education_level !== 'not_set',
    );

  const searchOtherBachelorsMastersDoctorateRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Masters' && x.relocate === '1') ||
        (x.education_level === 'Doctorate' && x.relocate === '1') ||
        (x.education_level === 'Bachelors' && x.relocate === '1') ||
        (x.education_level !== 'not_set' && x.relocate === '1'),
    );

  const searchOtherBachelorsMastersDoctorateExperience =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Masters' &&
          x.work_experience === isExperience.value) ||
        (x.education_level === 'Doctorate' &&
          x.work_experience === isExperience.value) ||
        (x.education_level === 'Bachelors' &&
          x.work_experience === isExperience.value) ||
        (x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value),
    );

  const searchOtherBachelorsMastersDoctorateExperienceRelocate =
    getStoreSearchData &&
    getStoreSearchData.filter(
      (x: DataEntity) =>
        (x.education_level === 'Masters' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level === 'Doctorate' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level === 'Bachelors' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1') ||
        (x.education_level !== 'not_set' &&
          x.work_experience === isExperience.value &&
          x.relocate === '1'),
    );

  return {
    searchBachelorsFilter,
    searchDoctorateFilter,
    searchMastersFilter,
    searchBachelorsMastersFilter,
    searchBachelorsDoctorateFilter,
    searchDoctorateMastersFilter,
    searchThreeFilter,
    searchRelocate,
    searchBachelorRelocate,
    searchMasterRelocate,
    searchDoctorateRelocate,
    searchBachelorMasterRelocate,
    searchBachelorDoctorateRelocate,
    searchMasterDoctorateRelocate,
    searchBachelorsMasterDoctorateRelocate,
    searchExperience,
    searchExperienceBachelor,
    searchExperienceDoctorateMaster,
    searchExperienceMaster,
    searchExperienceDoctorate,
    searchExperienceBachelorMaster,
    searchExperienceBachelorDoctorate,
    searchExperienceBachelorMasterDoctorate,
    searchExperienceRelocate,
    searchBachelorExperienceRelocate,
    searchDoctorateExperienceRelocate,
    searchMastersExperienceRelocate,
    searchMastersDoctorateExperienceRelocate,
    searchBachelorDoctorateExperienceRelocate,
    searchBachelorsMasterExperienceRelocate,
    searchBachelorsMasterDoctorateExperienceRelocate,
    searchUnselectCheckbox,
    searchUnCheckExperience,
    searchOther,
    searchOtherBachelor,
    searchOtherMasters,
    searchOtherDoctorate,
    searchOtherBachelorsMasters,
    searchOtherBachelorsDoctorate,
    searchOtherMastersDoctorate,
    searchOtherBachelorsMastersDoctorate,
    searchOtherExperience,
    searchOtherBachelorExperience,
    searchOtherMastersExperience,
    searchOtherDoctorateExperience,
    searchOtherBachelorsMastersExperience,
    searchOtherBachelorsDoctorateExperience,
    searchOtherMastersDoctorateExperience,
    searchOtherBachelorsMastersDoctorateExperience,
    searchOtherRelocate,
    searchOtherExperienceRelocate,
    searchOtherBachelorRelocate,
    searchOtherBachelorExperienceRelocate,
    searchOtherMastersRelocate,
    searchOtherMastersExperienceRelocate,
    searchOtherDoctorateRelocate,
    searchOtherDoctorateExperienceRelocate,
    searchOtherBachelorsMastersRelocate,
    searchOtherBachelorsMastersExperienceRelocate,
    searchOtherBachelorsDoctorateRelocate,
    searchOtherBachelorsDoctorateExperienceRelocate,
    searchOtherMastersDoctorateReloacate,
    searchOtherMastersDoctorateExperienceRelocate,
    searchOtherBachelorsMastersDoctorateRelocate,
    searchOtherBachelorsMastersDoctorateExperienceRelocate,
  };
};

export const filterCondition = (
  setSearchData: (arg: DataEntity[]) => void,
  isAny: boolean,
  isRelocate: boolean,
  isExperience: experienceOptionsType,
  isMasters: boolean,
  isDoctorate: boolean,
  isBachelors: boolean,
  getStoreSearchData: DataEntity[],
  searchExperienceRelocate: DataEntity[],
  searchRelocate: DataEntity[],
  searchExperienceBachelorMasterDoctorate: DataEntity[],
  searchBachelorsMasterDoctorateRelocate: DataEntity[],
  searchExperienceBachelorMaster: DataEntity[],
  searchExperienceBachelorDoctorate: DataEntity[],
  searchExperienceDoctorateMaster: DataEntity[],
  searchThreeFilter: DataEntity[],
  searchBachelorDoctorateRelocate: DataEntity[],
  searchMasterDoctorateRelocate: DataEntity[],
  searchBachelorMasterRelocate: DataEntity[],
  searchExperienceBachelor: DataEntity[],
  searchExperienceMaster: DataEntity[],
  searchExperienceDoctorate: DataEntity[],
  searchBachelorsMastersFilter: DataEntity[],
  searchBachelorsDoctorateFilter: DataEntity[],
  searchDoctorateMastersFilter: DataEntity[],
  searchBachelorRelocate: DataEntity[],
  searchMasterRelocate: DataEntity[],
  searchDoctorateRelocate: DataEntity[],
  searchBachelorsFilter: DataEntity[],
  searchDoctorateFilter: DataEntity[],
  searchMastersFilter: DataEntity[],
  searchExperience: DataEntity[],
  searchBachelorExperienceRelocate: DataEntity[],
  searchDoctorateExperienceRelocate: DataEntity[],
  searchMastersExperienceRelocate: DataEntity[],
  searchBachelorsMasterExperienceRelocate: DataEntity[],
  searchBachelorDoctorateExperienceRelocate: DataEntity[],
  searchMastersDoctorateExperienceRelocate: DataEntity[],
  searchBachelorsMasterDoctorateExperienceRelocate: DataEntity[],
  searchUnselectCheckbox: DataEntity[],
  searchUnCheckExperience: DataEntity[],
  isOther: boolean,
  searchOther: DataEntity[],
  searchOtherBachelor: DataEntity[],
  searchOtherMasters: DataEntity[],
  searchOtherDoctorate: DataEntity[],
  searchOtherBachelorsMasters: DataEntity[],
  searchOtherBachelorsDoctorate: DataEntity[],
  searchOtherMastersDoctorate: DataEntity[],
  searchOtherBachelorsMastersDoctorate: DataEntity[],
  searchOtherExperience: DataEntity[],
  searchOtherBachelorExperience: DataEntity[],
  searchOtherMastersExperience: DataEntity[],
  searchOtherDoctorateExperience: DataEntity[],
  searchOtherBachelorsMastersExperience: DataEntity[],
  searchOtherBachelorsDoctorateExperience: DataEntity[],
  searchOtherMastersDoctorateExperience: DataEntity[],
  searchOtherBachelorsMastersDoctorateExperience: DataEntity[],
  searchOtherRelocate: DataEntity[],
  searchOtherExperienceRelocate: DataEntity[],
  searchOtherBachelorRelocate: DataEntity[],
  searchOtherBachelorExperienceRelocate: DataEntity[],
  searchOtherMastersRelocate: DataEntity[],
  searchOtherMastersExperienceRelocate: DataEntity[],
  searchOtherDoctorateRelocate: DataEntity[],
  searchOtherDoctorateExperienceRelocate: DataEntity[],
  searchOtherBachelorsMastersRelocate: DataEntity[],
  searchOtherBachelorsMastersExperienceRelocate: DataEntity[],
  searchOtherBachelorsDoctorateRelocate: DataEntity[],
  searchOtherBachelorsDoctorateExperienceRelocate: DataEntity[],
  searchOtherMastersDoctorateReloacate: DataEntity[],
  searchOtherMastersDoctorateExperienceRelocate: DataEntity[],
  searchOtherBachelorsMastersDoctorateRelocate: DataEntity[],
  searchOtherBachelorsMastersDoctorateExperienceRelocate: DataEntity[],
) => {
  if (isAny && !isRelocate && isExperience.value === 'all') {
    setSearchData(getStoreSearchData);
  } else if (isExperience.value !== 'all' && isRelocate && isAny) {
    setSearchData(searchExperienceRelocate);
  } else if (isRelocate && isAny) {
    setSearchData(searchRelocate);
  } else if (
    isExperience.value !== 'all' &&
    isMasters &&
    isDoctorate &&
    isBachelors
  ) {
    setSearchData(searchExperienceBachelorMasterDoctorate);
  } else if (isRelocate && isMasters && isBachelors && isDoctorate) {
    setSearchData(searchBachelorsMasterDoctorateRelocate);
  } else if (isExperience.value !== 'all' && isBachelors && isMasters) {
    setSearchData(searchExperienceBachelorMaster);
  } else if (isExperience.value !== 'all' && isBachelors && isDoctorate) {
    setSearchData(searchExperienceBachelorDoctorate);
  } else if (isExperience.value !== 'all' && isMasters && isDoctorate) {
    setSearchData(searchExperienceDoctorateMaster);
  } else if (isMasters && isDoctorate && isBachelors) {
    setSearchData(searchThreeFilter);
  } else if (isRelocate && isDoctorate && isBachelors) {
    setSearchData(searchBachelorDoctorateRelocate);
  } else if (isRelocate && isDoctorate && isMasters) {
    setSearchData(searchMasterDoctorateRelocate);
  } else if (isRelocate && isBachelors && isMasters) {
    setSearchData(searchBachelorMasterRelocate);
  } else if (isExperience.value !== 'all' && isBachelors) {
    setSearchData(searchExperienceBachelor);
  } else if (isExperience.value !== 'all' && isMasters) {
    setSearchData(searchExperienceMaster);
  } else if (isExperience.value !== 'all' && isDoctorate) {
    setSearchData(searchExperienceDoctorate);
  } else if (isBachelors && isMasters) {
    setSearchData(searchBachelorsMastersFilter);
  } else if (isBachelors && isDoctorate) {
    setSearchData(searchBachelorsDoctorateFilter);
  } else if (isDoctorate && isMasters) {
    setSearchData(searchDoctorateMastersFilter);
  } else if (isRelocate && isBachelors) {
    setSearchData(searchBachelorRelocate);
  } else if (isRelocate && isMasters) {
    setSearchData(searchMasterRelocate);
  } else if (isRelocate && isDoctorate) {
    setSearchData(searchDoctorateRelocate);
  } else if (isBachelors && !isAny) {
    setSearchData(searchBachelorsFilter);
  } else if (isDoctorate && !isAny) {
    setSearchData(searchDoctorateFilter);
  } else if (isMasters && !isAny) {
    setSearchData(searchMastersFilter);
  } else if (isAny && isExperience.value !== 'all' && !isRelocate) {
    setSearchData(searchExperience);
  } else {
    setSearchData(getStoreSearchData);
  }

  if (isRelocate && isExperience.value !== 'all' && isBachelors) {
    setSearchData(searchBachelorExperienceRelocate);
  }
  if (isRelocate && isExperience.value !== 'all' && isDoctorate) {
    setSearchData(searchDoctorateExperienceRelocate);
  }
  if (isRelocate && isExperience.value !== 'all' && isMasters) {
    setSearchData(searchMastersExperienceRelocate);
  }
  if (isRelocate && isExperience.value !== 'all' && isBachelors && isMasters) {
    setSearchData(searchBachelorsMasterExperienceRelocate);
  }
  if (
    isRelocate &&
    isExperience.value !== 'all' &&
    isBachelors &&
    isDoctorate
  ) {
    setSearchData(searchBachelorDoctorateExperienceRelocate);
  }
  if (isRelocate && isExperience.value !== 'all' && isDoctorate && isMasters) {
    setSearchData(searchMastersDoctorateExperienceRelocate);
  }
  if (
    isRelocate &&
    isExperience.value !== 'all' &&
    isDoctorate &&
    isMasters &&
    isBachelors
  ) {
    setSearchData(searchBachelorsMasterDoctorateExperienceRelocate);
  }
  if (!isAny && !isMasters && !isDoctorate && !isBachelors && isRelocate) {
    setSearchData(searchRelocate);
  }
  if (
    !isAny &&
    !isMasters &&
    !isDoctorate &&
    !isBachelors &&
    isRelocate &&
    isExperience.value !== 'all'
  ) {
    setSearchData(searchUnselectCheckbox);
  }
  if (
    !isAny &&
    !isMasters &&
    !isDoctorate &&
    !isBachelors &&
    !isRelocate &&
    isExperience.value !== 'all'
  ) {
    setSearchData(searchUnCheckExperience);
  }

  if (isOther) {
    setSearchData(searchOther);
  }
  if (isOther && isRelocate) {
    setSearchData(searchOtherRelocate);
  }
  if (isOther && isExperience.value !== 'all') {
    setSearchData(searchOtherExperience);
  }
  if (isOther && isRelocate && isExperience.value !== 'all') {
    setSearchData(searchOtherExperienceRelocate);
  }
  if (isOther && isBachelors) {
    setSearchData(searchOtherBachelor);
  }
  if (isOther && isBachelors && isRelocate) {
    setSearchData(searchOtherBachelorRelocate);
  }
  if (isOther && isBachelors && isExperience.value !== 'all') {
    setSearchData(searchOtherBachelorExperience);
  }
  if (isOther && isBachelors && isRelocate && isExperience.value !== 'all') {
    setSearchData(searchOtherBachelorExperienceRelocate);
  }
  if (isOther && isMasters) {
    setSearchData(searchOtherMasters);
  }
  if (isOther && isMasters && isRelocate) {
    setSearchData(searchOtherMastersRelocate);
  }

  if (isOther && isMasters && isExperience.value !== 'all') {
    setSearchData(searchOtherMastersExperience);
  }
  if (isOther && isMasters && isRelocate && isExperience.value !== 'all') {
    setSearchData(searchOtherMastersExperienceRelocate);
  }
  if (isOther && isDoctorate) {
    setSearchData(searchOtherDoctorate);
  }
  if (isOther && isDoctorate && isRelocate) {
    setSearchData(searchOtherDoctorateRelocate);
  }

  if (isOther && isDoctorate && isExperience.value !== 'all') {
    setSearchData(searchOtherDoctorateExperience);
  }
  if (isOther && isDoctorate && isRelocate && isExperience.value !== 'all') {
    setSearchData(searchOtherDoctorateExperienceRelocate);
  }
  if (isOther && isBachelors && isMasters) {
    setSearchData(searchOtherBachelorsMasters);
  }
  if (isOther && isBachelors && isMasters && isRelocate) {
    setSearchData(searchOtherBachelorsMastersRelocate);
  }

  if (isOther && isBachelors && isMasters && isExperience.value !== 'all') {
    setSearchData(searchOtherBachelorsMastersExperience);
  }
  if (
    isOther &&
    isBachelors &&
    isMasters &&
    isRelocate &&
    isExperience.value !== 'all'
  ) {
    setSearchData(searchOtherBachelorsMastersExperienceRelocate);
  }
  if (isOther && isBachelors && isDoctorate) {
    setSearchData(searchOtherBachelorsDoctorate);
  }
  if (isOther && isBachelors && isDoctorate && isRelocate) {
    setSearchData(searchOtherBachelorsDoctorateRelocate);
  }

  if (isOther && isBachelors && isDoctorate && isExperience.value !== 'all') {
    setSearchData(searchOtherBachelorsDoctorateExperience);
  }
  if (
    isOther &&
    isBachelors &&
    isDoctorate &&
    isRelocate &&
    isExperience.value !== 'all'
  ) {
    setSearchData(searchOtherBachelorsDoctorateExperienceRelocate);
  }
  if (isOther && isDoctorate && isMasters) {
    setSearchData(searchOtherMastersDoctorate);
  }
  if (isOther && isDoctorate && isMasters && isRelocate) {
    setSearchData(searchOtherMastersDoctorateReloacate);
  }

  if (isOther && isMasters && isDoctorate && isExperience.value !== 'all') {
    setSearchData(searchOtherMastersDoctorateExperience);
  }
  if (
    isOther &&
    isDoctorate &&
    isMasters &&
    isRelocate &&
    isExperience.value !== 'all'
  ) {
    setSearchData(searchOtherMastersDoctorateExperienceRelocate);
  }
  if (isOther && isDoctorate && isMasters && isBachelors) {
    setSearchData(searchOtherBachelorsMastersDoctorate);
  }
  if (isOther && isDoctorate && isMasters && isBachelors && isRelocate) {
    setSearchData(searchOtherBachelorsMastersDoctorateRelocate);
  }

  if (
    isOther &&
    isDoctorate &&
    isMasters &&
    isBachelors &&
    isExperience.value !== 'all'
  ) {
    setSearchData(searchOtherBachelorsMastersDoctorateExperience);
  }
  if (
    isOther &&
    isDoctorate &&
    isMasters &&
    isBachelors &&
    isRelocate &&
    isExperience.value !== 'all'
  ) {
    setSearchData(searchOtherBachelorsMastersDoctorateExperienceRelocate);
  }
};
