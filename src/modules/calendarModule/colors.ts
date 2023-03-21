import { Colors } from './types';

let colorIndex = 0;

const colors: Colors[] = [
  {
    borderColor: '#d5dc00',
    backgroundColor: '#fdffb3',
  },
  {
    borderColor: '#00a604',
    backgroundColor: '#cdfece',
  },
  {
    borderColor: '#c85d00',
    backgroundColor: '#ffe9d5',
  },
  {
    borderColor: '#006e5f',
    backgroundColor: '#81e3d6',
  },
  {
    borderColor: '#591e00',
    backgroundColor: '#fedac8',
  },
  {
    borderColor: '#5b125b',
    backgroundColor: '#dec7de',
  },
];

const userColors = {};
const colorsLength = colors.length;

export const setColor = (userId: number) => {
  if (userColors[userId] === undefined) {
    userColors[userId] = colorIndex;
    colorIndex++;
  }
};

export const getColor = (userId: number) => {
  if (userColors[userId] === undefined) {
    setColor(userId);
    return colors[userColors[userId]];
  }
  return colors[userColors[userId]];
};
