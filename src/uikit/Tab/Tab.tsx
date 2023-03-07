import { ReactNode } from 'react';
import { Tab as TabContent } from 'react-bootstrap';

type Props = {
  eventKey: string;
  title: string;
  children: ReactNode;
};
const Tab = ({ eventKey, title, children }: Props) => {
  return (
    <TabContent eventKey={eventKey} title={title}>
      {children}
    </TabContent>
  );
};

export default Tab;
