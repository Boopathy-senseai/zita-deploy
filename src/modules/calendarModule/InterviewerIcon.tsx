import Tooltip from '@mui/material/Tooltip/Tooltip';

const InterviewerIcon = ({ name, index, title }: { name: string; index?: number, title?: string }) => {
  const colors = [
    '#58BE4C',
    '#468FD0',
    '#F38961',
    '#CF6FEE',
    '#6FE2EE',
    '#5EF255',
    '#419697',
    '#E166F0',
    '#3F74D1',
    '#E5E35A',
  ];

  return (
    <Tooltip title={title || name}>
      <p
        data-letters={
          name[0].toUpperCase() + name.split(' ')[1][0].toUpperCase()
        }
        style={{
          backgroundColor: colors[index !== undefined ? index + 1 : 0],
          borderRadius: '50%',
          height: '1%',
          marginRight: '1%',
          marginLeft:"5px"
        }}
      />
    </Tooltip>
  );
};

export default InterviewerIcon;
