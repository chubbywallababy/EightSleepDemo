import {SleepStageValue} from '../types';

export const colors = {
  primary: '#246AFF',
  secondary: '#202020',
  background: '#000',
  text: 'white',
  white: 'white',
  great: '#0073DD',
  bad: 'orange',
};

export const STAGE_COLOR_MAP: {[key in SleepStageValue]: string} = {
  awake: '#5796bcCC',
  out: '#FFA500AA',
  light: '#008200AA',
  deep: '#47047cAA',
};
