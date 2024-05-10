import {SleepInterval} from '../types';

/**
 * Numbered in case we want to sort
 */
export enum KpiStatus {
  Great = 0,
  Good = 1,
  OK = 2,
  Bad = 3,
}

export type SleepKpiData =
  | {
      averageDeepSleepDuration: number;
      deepSleepDurationStatus: KpiStatus;
      averageScore: number;
      scoreStatus: KpiStatus;
    }
  | undefined;

/**
 * Gets the most important data to summaraize a nights sleep
 *
 * @param data
 * @returns
 */
export const getSleepKpiData = (
  data: SleepInterval[] | undefined,
): SleepKpiData => {
  if (!data) {
    return undefined;
  }

  const deepSleepDurations = data.map(d =>
    d.stages
      .filter(s => s.stage === 'deep')
      .reduce((sum, stage) => sum + stage.duration, 0),
  );
  const sleepScores = data.map(d => d.score);

  // Convert seconds into hours
  const averageDeepSleepDuration = round(
    getAverage(deepSleepDurations) / 60 / 60,
    2,
  );
  const deepSleepDurationStatus = getDeepSleepDurationStatus(
    averageDeepSleepDuration,
  );

  const averageScore = round(getAverage(sleepScores), 2);
  const scoreStatus = getSleepScoreStatus(averageScore);

  return {
    averageDeepSleepDuration,
    deepSleepDurationStatus,
    averageScore,
    scoreStatus,
  };
};

/**
 * Get the sleep score status based on arbitrary breakpoints
 *
 * @param average
 * @returns
 */
const getSleepScoreStatus = (average: number): KpiStatus => {
  if (average > 87) {
    return KpiStatus.Great;
  } else if (average > 75) {
    return KpiStatus.Good;
  } else if (average > 65) {
    return KpiStatus.OK;
  } else {
    return KpiStatus.Bad;
  }
};

/**
 * Get the deep sleep duration status based on arbitrary breakpoints
 *
 * @param average
 * @returns
 */
const getDeepSleepDurationStatus = (average: number): KpiStatus => {
  if (average > 1.8) {
    return KpiStatus.Great;
  } else if (average > 1.5) {
    return KpiStatus.Good;
  } else if (average > 1.2) {
    return KpiStatus.OK;
  } else {
    return KpiStatus.Bad;
  }
};

const getAverage = (nums: number[]): number =>
  nums.reduce((a, b) => a + b, 0) / nums.length;
// Only meant to be used for a few decimal places, not tested completely
const round = (n: number, places = 1) =>
  Math.round(n * 10 ** places) / 10 ** places;
