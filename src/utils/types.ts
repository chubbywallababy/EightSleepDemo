/**
 * Numbered in case we want to sort
 */
export enum KpiStatus {
  Great = 0,
  Good = 1,
  OK = 2,
  Bad = 3,
}

export interface SleepDurationObject {
  hours: number;
  minutes: number;
}

export interface SleepKpiData {
  averageDeepSleepDuration: number;
  averageDeepSleepDurationStr: string;
  deepSleepDurationStatus: KpiStatus;
  averageScore: number;
  scoreStatus: KpiStatus;
  hasBadScore: boolean;
}

export interface SleepDetailData extends SleepKpiData {}
