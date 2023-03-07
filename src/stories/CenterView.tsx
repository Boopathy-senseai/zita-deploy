import { ReactNode } from 'react';
import Flex from '../uikit/Flex/Flex';
type Props = {
  children: ReactNode;
};
const CenterView = ({ children }: Props) => {
  return (
    <Flex center middle>
      {children}
    </Flex>
  );
};

export default CenterView;
