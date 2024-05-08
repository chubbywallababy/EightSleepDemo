import {SleepStage, Stage} from './SleepStage';

export type SortedSleepStages = {
  [key in Stage]: SleepStage[];
};
