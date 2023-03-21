import { ReactNode } from 'react';
import { Tab as TabContent } from 'react-bootstrap';

type Props = {
  eventKey: string;
  title: string;
  onClick?: (args: any) => void;
  children: ReactNode;
};
const Tab = ({ eventKey, title, children,  onClick, }: Props) => {
  return (
    <TabContent eventKey={eventKey} title={title}  onClick={onClick}>
      {children}
    </TabContent>
  );
};

export default Tab;
