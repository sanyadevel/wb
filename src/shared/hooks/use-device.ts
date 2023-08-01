import { Theme, useMediaQuery } from '@mui/material';

type Device = 'mobile' | 'tablet' | 'desktop' | 'unknown';

export const useDevice = () => {
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('mobile'));

  const isTablet = useMediaQuery<Theme>(theme => theme.breakpoints.between('mobile', 'tablet'));

  const isDesktop = useMediaQuery<Theme>(theme => theme.breakpoints.up('tablet'));

  const isUnknown = !(isMobile || isTablet || isDesktop);

  let device: Device = 'unknown';

  if (isMobile) device = 'mobile';
  if (isTablet) device = 'tablet';
  if (isDesktop) device = 'desktop';

  return { isMobile, isTablet, isDesktop, isUnknown, device };
};
