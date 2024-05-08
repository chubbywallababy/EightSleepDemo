import {Stage} from './SleepStage';

export type SleepDataPointByStage = {
  [key in Stage]: number[];
};
