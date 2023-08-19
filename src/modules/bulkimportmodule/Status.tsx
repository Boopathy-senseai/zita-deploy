import SvgImportTick from '../../icons/SvgImportTick';
import SvgRoundClose from '../../icons/SvgRoundClose';
import SvgTick from '../../icons/SvgTick';
import { ERROR, SUCCESS } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { EmpPoolEntity } from './bulkImportTypes';

type Props = {
  value: EmpPoolEntity;
  jdId?: any;
};

const Status = ({ value,jdId }: Props) => {
  const checkStatus =
    value &&
    value.first_name !== null &&
    value &&
    value.first_name &&
    value &&
    value.email !== null &&
    value &&
    value.email !== ''
      ? true
      : false;

  return (
    <Flex middle>
      {checkStatus ? (
        <div title={jdId=== undefined ? "Candidate profile sent for matching" : "Applicant profile sent for matching"}>
          <SvgImportTick fill={SUCCESS} />
        </div>
      ) : (
        <div
          title={jdId=== undefined ?'Candidate profile is incomplete and not sent for matching': 'Applicant profile is incomplete and not sent for matching'}
        >
          <SvgRoundClose fill={ERROR} height={18} width={18} />
        </div>
      )}
    </Flex>
  );
};

export default Status;
