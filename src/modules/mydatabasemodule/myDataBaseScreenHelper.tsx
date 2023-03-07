export const qualificationFilterHelper = (
  // qualificationFilter: string,
  isAny: boolean,
  isBachelors: boolean,
  isDoctorate: boolean,
  isMasters: boolean,
  isOther: boolean,
) => {
  let qualificationFilter: string = '';
  if (isAny) {
    qualificationFilter = '';
  } else if (isBachelors && isDoctorate && isMasters && isOther) {
    qualificationFilter = 'Bachelor,Doctorate,Master,Other';
  } else if (isBachelors && isDoctorate && isMasters) {
    qualificationFilter = 'Bachelor,Doctorate,Master';
  } else if (isMasters && isDoctorate && isOther) {
    qualificationFilter = 'Master,Doctorate,Other';
  } else if (isBachelors && isDoctorate && isOther) {
    qualificationFilter = 'Bachelor,Doctorate,Other';
  } else if (isBachelors && isMasters && isOther) {
    qualificationFilter = 'Bachelor,Master,Other';
  } else if (isBachelors && isDoctorate) {
    qualificationFilter = 'Bachelor,Doctorate';
  } else if (isBachelors && isMasters) {
    qualificationFilter = 'Bachelor,Master';
  } else if (isBachelors && isOther) {
    qualificationFilter = 'Bachelor,Other';
  } else if (isDoctorate && isMasters) {
    qualificationFilter = 'Doctorate,Master';
  } else if (isOther && isMasters) {
    qualificationFilter = 'Other,Master';
  } else if (isOther && isDoctorate) {
    qualificationFilter = 'Doctorate,Master';
  } else if (isBachelors) {
    qualificationFilter = 'Bachelor';
  } else if (isDoctorate) {
    qualificationFilter = 'Doctorate';
  } else if (isMasters) {
    qualificationFilter = 'Master';
  } else if (isOther) {
    qualificationFilter = 'Other';
  }
  return qualificationFilter;
};
