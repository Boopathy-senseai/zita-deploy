import React, { memo } from 'react';
import Text from '../Text/Text';
import styles from './rowtext.module.css';

type Props = {
  columnData?: React.ReactNode;
};

const RowText = ({ columnData }: Props) => {
  if (!columnData) {
    return <></>;
  }
  return (
    <Text size={12} className={styles.textStyle}>
      {columnData}
    </Text>
  );
};

export default memo(RowText);
