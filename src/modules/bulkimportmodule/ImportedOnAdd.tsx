import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';

type Props = {
  value: string;
};

const ImportedOnAdd = ({ value }: Props) => {
  return (
    <Flex middle>
      <Text size={13}>{getDateString(value, 'll')}</Text>
    </Flex>
  );
};
export default ImportedOnAdd;
