import { ReactNode } from 'react';
import styles from './index.module.scss';

type Props = {
  Tabs: ReactNode;
  Content: ReactNode;
};

export const ContentWithTabsLayout = ({ Content, Tabs }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.tabs}>{Tabs}</div>
      <div>{Content}</div>
    </div>
  );
};
