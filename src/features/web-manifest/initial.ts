import { Deploy } from './constants';
import { WebManifest } from './types';

export const defaultWebManifest: WebManifest = {
  title: 'Service Desk',
  theme: 'default',
  deploy: Deploy.UNKNOWN_DEPLOY,
  debug: false,
};
