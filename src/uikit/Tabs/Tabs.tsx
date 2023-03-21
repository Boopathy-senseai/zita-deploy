import React, { ReactElement, useState } from 'react';
import { PRIMARY } from '../Colors/colors';
import TabTitle from './TabTitle';
import styles from './tab.module.css';

type Props = {
  children: ReactElement[] | any[];
  active?: number;
  activeColor?: string;
  borderColor?: string;
  tabsWithBorder?: boolean;
};

const Tabs: React.FC<Props> = ({
  children,
  active,
  activeColor,
  borderColor,
  tabsWithBorder,
}: Props) => {
  const [selectedTab, setSelectedTab] = useState(
    active && active < children.length ? active : 0,
  );

  return (
    <div>
      <div className={styles.flexStyle}>
        {children.map((item, index) => (
          <TabTitle
            key={item.props.title}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
            activeColor={activeColor}
            borderColor={borderColor}
          />
        ))}
      </div>
      {tabsWithBorder ? (
        <div className={styles.childBorderStyle}>
          {children && children[selectedTab] ? children[selectedTab] : ''}
        </div>
      ) : children && children[selectedTab] ? (
        children[selectedTab]
      ) : (
        ''
      )}
    </div>
  );
};

Tabs.defaultProps = {
  active: 0,
  activeColor: PRIMARY,
  borderColor: PRIMARY,
};

export default Tabs;
