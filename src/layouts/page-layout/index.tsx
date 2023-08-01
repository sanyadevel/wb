import React, { PropsWithChildren } from 'react';
import styles from 'src/layouts/page-layout/index.module.scss';
import { LayoutWithStyledScroll } from '../layout-with-styled-scroll';

export const PageLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <LayoutWithStyledScroll>
      <div className={styles.root}>{children}</div>
    </LayoutWithStyledScroll>
  );
};
