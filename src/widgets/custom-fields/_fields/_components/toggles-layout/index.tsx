import React, { memo, PropsWithChildren } from 'react';
import styles from './index.module.scss';

export const TogglesLayout = memo(({ children }: PropsWithChildren<{}>) => {
  return <div className={styles.root}>{children}</div>;
});
