import {SleepStage} from './SleepStage';

export interface SleepCycle {
  startTime: string;
  endTime: string;
  stages: SleepStage[];
  totalDuration: number;
}
