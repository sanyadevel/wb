import React, { memo, PropsWithChildren } from 'react';
import styles from './index.module.scss';

export const SettingsLayout = memo(({ children }: PropsWithChildren<{}>) => {
  return <div className={styles.root}>{children}</div>;
});
