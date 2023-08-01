import { PropsWithChildren } from 'react';
import styles from './index.module.scss';

export const CommonFormLayout = ({ children }: PropsWithChildren<{}>) => {
  return <div className={styles.root}>{children}</div>;
};
