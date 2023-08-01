import { defaultWebManifest } from './initial';
import { webManifestSchema } from './schema';

export const getWebManifest = () => {
  const webManifest = window.WEB_MANIFEST;
  try {
    webManifestSchema.parse(webManifest);
    return { ...webManifest };
  } catch (e: unknown) {
    console.warn('WEB_MANIFEST не соответствует схеме', e);
  }
  return { ...defaultWebManifest };
};
