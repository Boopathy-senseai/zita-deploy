import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
type Props = {
  title: string;
};
const Empty = ({ title }: Props) => {
  return (
    <Flex center middle flex={1}>
      <Text color="placeholder">{title}</Text>
    </Flex>
  );
};

export default Empty;
