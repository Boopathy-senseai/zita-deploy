import { ReactNode } from 'react';
import { Tabs as TabConatiner } from 'react-bootstrap';

type Props = {
  activeKey: string;
  onSelect?: any;
  children: ReactNode;
};
const Tabs = ({ activeKey, onSelect, children }: Props) => {
  return (
    <TabConatiner activeKey={activeKey} onSelect={onSelect}>
      {children}
    </TabConatiner>
  );
};

export default Tabs;
