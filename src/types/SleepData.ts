import {SleepCycle} from './SleepCycle';

export interface SleepData {
  sessions: SleepCycle[];
  averageSleep: number;
  id: string;
  date: string; // Jan 12, '24
  shortDate: string; // Jan 12
}
