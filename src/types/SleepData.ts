import {SleepSession} from './SleepSession';

export interface SleepData {
  sessions: SleepSession[];
  averageSleep: number;
}
