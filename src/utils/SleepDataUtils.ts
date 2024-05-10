import {strings} from '../i18n';
import {SleepInterval} from '../types';
import {
  KpiStatus,
  SleepDetailData,
  SleepDurationObject,
  SleepKpiData,
} from './types';

/**
 * Gets the most important data to summaraize a nights sleep
 *
 * @param data
 * @returns
 */
export const getSleepKpiData = (
  data: SleepInterval[] | undefined,
): SleepKpiData | undefined => {
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

  const averageScore = Math.ceil(round(getAverage(sleepScores), 1));
  const scoreStatus = getSleepScoreStatus(averageScore);

  const deepSleepObject = hoursToSleepObject(averageDeepSleepDuration);

  return {
    averageDeepSleepDuration,
    averageDeepSleepDurationStr: strings.units.getHoursAndMinutes(
      deepSleepObject.hours,
      deepSleepObject.minutes,
    ),
    deepSleepDurationStatus,
    averageScore,
    scoreStatus,
    hasBadScore:
      scoreStatus === KpiStatus.Bad ||
      deepSleepDurationStatus === KpiStatus.Bad,
  };
};

export const getSleepDetailData = (
  data: SleepInterval[] | undefined,
): SleepDetailData | undefined => {
  const kpiData = getSleepKpiData(data);
  if (!data || !kpiData) {
    return undefined;
  }

  return {
    ...kpiData,
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

const hoursToSleepObject = (sleepHours: number): SleepDurationObject => {
  // Extract whole hours using Math.floor
  const hours = Math.floor(sleepHours);

  // Calculate remaining minutes using modulo operator (%)
  const minutes = Math.round((sleepHours - hours) * 60);

  return {hours, minutes};
};

const getAverage = (nums: number[]): number =>
  nums.reduce((a, b) => a + b, 0) / nums.length;
// Only meant to be used for a few decimal places, not tested completely
const round = (n: number, places = 1) =>
  Math.round(n * 10 ** places) / 10 ** places;
