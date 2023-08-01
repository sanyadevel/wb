import React, { PropsWithChildren, memo, useEffect, useState } from 'react';
import { Dialog, DialogTitle, Typography, useTheme } from '@mui/material';
import { DialogContent } from 'src/shared/components';

export const IsOffline = memo(({ children }: PropsWithChildren<{}>) => {
  const [offline, setOffline] = useState(!window.navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => setOffline(false));
    window.addEventListener('offline', () => setOffline(true));
  }, []);

  const theme = useTheme();
  const { titleBackground } = theme.palette.modal;

  return (
    <>
      <Dialog onClose={() => {}} open={offline}>
        <DialogTitle sx={{ background: titleBackground, padding: '8px 16px' }}>
          <Typography component="span" variant="h4">
            Внимание
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ width: '420px' }}>
          <Typography>Похоже что у вас пропало интернет соединение.</Typography>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
});
