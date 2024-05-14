/**
 * This is data represented in S3
 *
 * https://gist.github.com/maghis/8c35fe1bb5c7810bdcc6ca389c6cd702
 */

/** each stage can be any of "awake" (in bed, awake), "out" (out of bed), "light" (in light sleep), "deep" (in deep sleep) */
export type SleepStageValue = 'awake' | 'out' | 'light' | 'deep';

export interface Stage {
  stage: SleepStageValue;
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
  heating: Timeseries;
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
