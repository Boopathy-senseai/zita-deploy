export const qualificationFilterHelper = (
  // qualificationFilter: string,
  isAny: boolean,
  isBachelors: boolean,
  isDoctorate: boolean,
  isdiploma: boolean,
  isMasters: boolean,
  isOther: boolean,
) => {
  let qualificationFilter: string = '';
  if (isBachelors) {
    qualificationFilter += 'Bachelor,';
  }
  if (isDoctorate) {
    qualificationFilter += 'Doctorate,';
  }
  if (isMasters) {
    qualificationFilter += 'Master,';
  }
  if (isdiploma) {
    qualificationFilter += 'Diploma,';
  }
  if (isOther) {
    qualificationFilter += 'Other,';
  }
  // Remove the trailing comma, if any
  qualificationFilter = qualificationFilter.replace(/,$/, '');

  // Check if qualificationFilter is empty
  if (!qualificationFilter) {
    qualificationFilter = '';
  }
  return qualificationFilter;
};
