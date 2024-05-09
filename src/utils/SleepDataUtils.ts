import {SleepInterval} from '../types';

export type SleepKpiData =
  | {
      averageSleepDuration: number;
      averageScore: number;
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

  const sleepDurations = data.map(d =>
    d.stages.reduce((sum, stage) => sum + stage.duration, 0),
  );
  const sleepScores = data.map(d => d.score);

  // Convert seconds into hours
  const averageSleepDuration = round(getAverage(sleepDurations) / 60 / 60, 2);
  const averageScore = round(getAverage(sleepScores), 2);

  return {averageSleepDuration, averageScore};
};

const getAverage = (nums: number[]): number =>
  nums.reduce((a, b) => a + b, 0) / nums.length;
// Only meant to be used for a few decimal places, not tested completely
const round = (n: number, places = 1) =>
  Math.round(n * 10 ** places) / 10 ** places;
