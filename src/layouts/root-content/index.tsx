import React, { memo } from 'react';
import styles from './index.module.scss';

type PageProps = {
  children?: React.ReactNode;
};

export const RootContent = memo(({ children }: PageProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.content}>{children || null}</div>
      </div>
    </div>
  );
});
