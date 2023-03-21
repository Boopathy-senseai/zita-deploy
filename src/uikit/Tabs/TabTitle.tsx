import { CSSProperties, useCallback } from 'react';
import Text from '../Text/Text';
import { GARY_2 } from '../Colors/colors';
import styles from './tabtitle.module.css';

type Props = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  selectedTab: number;
  activeColor?: string;
  borderColor?: string;
};

const TabTitle = ({
  title,
  setSelectedTab,
  index,
  selectedTab,
  activeColor,
  borderColor,
}: Props) => {
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  const isActive = index === selectedTab;

  let textStyles;

  if (!isActive) {
    textStyles = { color: GARY_2 };
  }
  if (isActive) {
    textStyles = { color: activeColor };
  }

  const borderThemeStyle: CSSProperties = {
    padding: '8px 12px',
    borderBottomWidth: 3,
    borderBottomColor: borderColor,
    borderBottomStyle: 'solid',
  };

  return (
    <div onClick={onClick} tabIndex={-1} role={'button'} onKeyPress={() => {}}>
      <div
        className={styles.flexStylesActive}
        style={isActive ? borderThemeStyle : {}}
      >
        <Text bold={isActive} style={textStyles}>
          {title}
        </Text>
      </div>
    </div>
  );
};

export default TabTitle;
