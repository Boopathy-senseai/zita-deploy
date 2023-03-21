import { ReactNode } from 'react';
import { Tabs as TabConatiner } from 'react-bootstrap';

type Props = {
  activeKey: string;
  onSelect?: any;
  children: ReactNode;
  id?:string
};
const Tabs = ({ activeKey, onSelect, children,id }: Props) => {
  return (
    <TabConatiner id={id}activeKey={activeKey} onSelect={onSelect}>
      {children}
    </TabConatiner>
  );
};

export default Tabs;
