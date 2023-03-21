import { textColors } from '../Text/Text';
type buttonTypes = 'primary' | 'secondary' | 'link' | 'tertiary' | 'success';
export const buttonHelper = (types?: buttonTypes, disabled?: boolean) => {
  let textColor: textColors = 'black';
  if (types === 'primary') {
    textColor = 'white';
  }

  if (types === 'secondary') {
    textColor = 'theme';
  }

  if (disabled && types === 'secondary') {
    textColor = 'theme';
  } else if (disabled && types !== 'secondary') {
    textColor = 'white';
  }
  if (types === 'link') {
    textColor = 'link';
  }
  if (types === 'tertiary') {
    textColor = 'black_1';
  }
  return { textColor };
};
