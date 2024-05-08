import {SleepStage} from './SleepStage';

export interface SleepSession {
  startTime: Date;
  endTime: Date;
  stages: SleepStage[];
  totalDuration: number;
}
