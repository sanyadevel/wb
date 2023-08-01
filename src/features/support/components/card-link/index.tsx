import { Box, Typography, useTheme } from '@mui/material';
import React, { ReactNode } from 'react';
import { useRouter } from 'react-router5';
import { useLinkOnClick } from 'src/shared/hooks';
import { GetOptionalParamsByRouteName, RouteNodeList } from 'src/libs/router';
import styles from './index.module.scss';

type PropsType<T extends RouteNodeList> = {
  path: T;
  routeParams: GetOptionalParamsByRouteName<T>;
  name: string;
  description: string;
  icon?: ReactNode;
};
// не заворачивать в memo иначе не пробрасываются типы
export const CardLink = <T extends RouteNodeList>({ path, routeParams, name, description, icon }: PropsType<T>) => {
  const theme = useTheme();
  const router = useRouter();

  const handleClick = useLinkOnClick(() => {
    router.validNavigate(path, routeParams);
  }, [path, routeParams, router]);

  return (
    <Box
      className={styles.root}
      onClick={handleClick}
      sx={{
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: '16px',
        '&:hover': {
          border: `1px solid ${theme.palette.primary.main}`,
          '& > div .MuiTypography-h3': {
            color: theme.palette.primary.main,
          },
        },
      }}
    >
      <div className={styles.firstColumn}>
        <Typography
          sx={{
            color: theme.palette.text.primary,
          }}
          variant="h3"
        >
          {name}
        </Typography>

        <Typography sx={{ color: theme.palette.secondary.main }} variant="text">
          {description}
        </Typography>
      </div>
      <div className={styles.secondColumn}>{icon}</div>
    </Box>
  );
};
