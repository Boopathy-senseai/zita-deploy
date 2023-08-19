import { Flex } from '../../../uikit';

interface TableWrapperProps {
  title: string;
  children: React.ReactNode;
}
const TableWrapper: React.FC<TableWrapperProps> = (props) => {
  return (
    <Flex
      column
      flex={1}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Flex
        row
        center
        style={{
          padding: 10,
          backgroundColor: '#eee8ec',
          marginBottom: 10,
          color: '#581845',
        }}
      >
        {props.title}
      </Flex>
      <Flex
        column
        style={{
          height: 'calc(100% - 50px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          padding: '0 10px',
        }}
      >
        {props.children}
      </Flex>
    </Flex>
  );
};

export default TableWrapper;
