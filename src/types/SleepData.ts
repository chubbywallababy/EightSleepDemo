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
  /** each stage can be any of "awake" (in bed, awake), "out" (out of bed), "light" (in light sleep), "deep" (in deep sleep) */
  stage: string;
  /** In seconds */
  duration: number;
}

export type Timeseries = [string, number][];

export interface TimeseriesData {
  tnt: Timeseries;
  tempRoomC: Timeseries;
  tempBedC: Timeseries;
  respiratoryRate: Timeseries;
  heartRate: Timeseries;
  // gist said to ignore, but keeping in takehome for reference
  // heating: Timeseries;
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
