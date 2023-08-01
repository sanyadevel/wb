import React, { memo, PropsWithChildren } from 'react';
import styles from './index.module.scss';

type Props = {};

export const Layout = memo(({ children }: PropsWithChildren<Props>) => {
  return <div className={styles.root}>{children}</div>;
});
