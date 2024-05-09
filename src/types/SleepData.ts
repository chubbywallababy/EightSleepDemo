import {SleepCycle} from './SleepCycle';

// TODO - REMOVE
export interface OldSleepData {
  sessions: SleepCycle[];
  averageSleep: number;
  id: string;
  date: string; // Jan 12, '24
  shortDate: string; // Jan 12
}

export interface Stage {
  stage: string;
  duration: number;
}

export interface TimeseriesData {
  tnt: [string, number][];
  tempRoomC: [string, number][];
  tempBedC: [string, number][];
  respiratoryRate: [string, number][];
  heartRate: [string, number][];
  heating: [string, number][];
}

export interface SleepInterval {
  id: string;
  ts: string;
  stages: Stage[];
  score: number;
  timeseries: TimeseriesData;
}

export interface SleepData {
  intervals: SleepInterval[];
}
