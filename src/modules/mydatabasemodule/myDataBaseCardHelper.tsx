import { notSpecified } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { workYear } from '../common/commonHelper';
import { DataEntity } from './myDataBaseTypes';

type Props = {
  dataList: DataEntity;
};

export const LocationText = ({ dataList }: Props) => {
  return (
    <>
      {dataList.work_exp === 'Not Specified' ? (
        <Text
          textStyle="ellipsis"
          size={12}
          color="gray"
          style={{ marginTop: 2 }}
        >
          {notSpecified(dataList.location)} | {'Not Specified'}
        </Text>
      ) : (
        <Text
          textStyle="ellipsis"
          size={12}
          color="gray"
          style={{ marginTop: 2 }}
        >
          {notSpecified(dataList.location)} |{' '}
          {notSpecified(workYear(dataList.work_exp))}
        </Text>
      )}
    </>
  );
};
