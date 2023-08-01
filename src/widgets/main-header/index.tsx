import React, { memo } from 'react';
import { Box } from '@mui/material';
import { LogoSd2Icon } from 'src/shared/components';
import { RouterTypographyLink } from 'src/features/router5';
import MenuIcon from '@mui/icons-material/Menu';
import { Version, getBuildVersion } from 'src/features/version';
import { useDevice } from 'src/shared/hooks';
import { HeadUserMenu } from '../head-user-menu';
import styles from './index.module.scss';

export const MainHeader = memo(() => {
  const { isMobile, isTablet } = useDevice();

  return (
    <Box className={isTablet || isMobile ? styles.rootMobile : styles.root}>
      <div className={styles.firstRow}>
        <div className={styles.logo}>
          <RouterTypographyLink path="root" routeParams={{}}>
            <LogoSd2Icon />
          </RouterTypographyLink>
          <Version className={styles.version} version={getBuildVersion()} />
        </div>
        <div className={styles.rightColumn}>
          {isMobile ? (
            // TO DO: Сделать burger menu
            <MenuIcon />
          ) : (
            <>
              <RouterTypographyLink path="root" routeParams={{}}>
                Центр поддержки
              </RouterTypographyLink>
              <div className={styles.profile}>
                <HeadUserMenu />
              </div>
            </>
          )}
        </div>
      </div>
    </Box>
  );
});
