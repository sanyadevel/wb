import { atom } from 'recoil';
import { Upload } from '../../types';

type State = {
  upload?: Upload;
};

export const state = atom<State>({
  key: 'uploadField',
  default: {},
});
