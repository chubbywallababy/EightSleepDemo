/**
 * This file is pretty large. I'd like to split it up if I have time.
 */

import dayjs from 'dayjs';
import {strings} from '../i18n';
import {SleepInterval} from '../types';
import {
  DataPoint,
  KpiStatus,
  LineGraphData,
  SleepDetailData,
  SleepDurationObject,
  SleepKpiData,
  TimeseriesDataPoints,
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

/**
 * Get the data shown on the details view.
 *
 * This will include all KPI data from `getSleepKpiData` and more.
 *
 * @param data
 * @returns
 */
export const getSleepDetailData = (
  data: SleepInterval[] | undefined,
): SleepDetailData | undefined => {
  const kpiData = getSleepKpiData(data);
  if (!data || !kpiData) {
    return undefined;
  }

  return {
    ...kpiData,
    timeSleptDataPoint: getTimeSleptDataPoint(data),
    timeToFallAsleepDataPoint: getTimeToFallAsleepDataPoint(data),
    tntData: getTntTimeseriesData(data),
    sleepHeartRateData: getSleepHeartRateData(data),
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

/**
 * A utility function to get the hours and minutes for an object
 *
 * @param sleepHours
 * @returns {SleepDurationObject} SleepDurationObject
 */
export const hoursToSleepObject = (sleepHours: number): SleepDurationObject => {
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
const getMostRecentInterval = (intervals: SleepInterval[]) =>
  // copy the array in strict mode
  intervals
    .slice()
    .sort((a, b) => dayjs(b.ts).unix() - dayjs(a.ts).unix())
    .at(0);

/**
 * Returns data in a clean format for the UI to display the time slept
 *
 * @param intervals
 * @returns
 */
const getTimeSleptDataPoint = (intervals: SleepInterval[]): DataPoint => {
  const totalDurations = intervals.map(i =>
    i.stages.reduce((prev, stage) => prev + stage.duration, 0),
  );
  const average =
    totalDurations.reduce((prev, total) => prev + total, 0) /
    totalDurations.length;
  const averageSleepObj = hoursToSleepObject(average);
  const mostRecentInterval = getMostRecentInterval(intervals);

  if (!mostRecentInterval) {
    // TODO - include logging details
    throw new Error('Failed to fetch interval');
  }

  // in hours
  const timeSleptHours =
    mostRecentInterval.stages.reduce(
      (prev, stage) => prev + stage.duration,
      0,
    ) /
    60 /
    60;

  const markers = [
    {value: 4, label: '4h'},
    {value: 5, label: '5h'},
    {value: 6, label: '6h'},
    {value: 7, label: '7h'},
    {value: 8, label: '8h'},
    {value: 9, label: '9h'},
    {value: 10, label: '10h'},
    {value: 11, label: '11h'},
  ];

  return {
    currentDataPoint: timeSleptHours,
    average: `${averageSleepObj.hours}h ${averageSleepObj.minutes}m`,
    // Arbitrary goal for demo purposes.
    // Ideally this would be returned by the BE
    // or at least have predetermined business logic.
    goal: {min: 7, max: 9},
    markers,
    lineRange: {min: markers[0].value, max: markers[markers.length - 1].value},
  };
};

/**
 * This function makes the assumption that the first
 * stage in an interval always represents the amount of time
 * it takes for someone to fall asleep.
 *
 * @param intervals
 * @returns
 */
const getTimeToFallAsleepDataPoint = (
  intervals: SleepInterval[],
): DataPoint => {
  const allFallAsleepStages = intervals.map(i => i.stages[0].duration);

  // in minutes
  const average = Math.floor(
    allFallAsleepStages.reduce((prev, curr) => prev + curr, 0) /
      allFallAsleepStages.length /
      60,
  );

  const mostRecentInterval = getMostRecentInterval(intervals);

  if (!mostRecentInterval) {
    // TODO - include logging details
    throw new Error('Failed to fetch interval');
  }

  const currentDataPoint = mostRecentInterval.stages[0].duration / 60;

  const markers = [
    {value: 0, label: 'In bed'},
    {value: 10, label: '+10m'},
    {value: 20, label: '+20m'},
    {value: 30, label: '+30m'},
    {value: 40, label: '+40m'},
  ];

  return {
    average: `${average}m`,
    currentDataPoint,
    // Arbitrary goal for demo purposes.
    // Ideally this would be returned by the BE
    // or at least have predetermined business logic.
    goal: {min: 0, max: 15},
    markers,
    lineRange: {min: markers[0].value, max: markers[markers.length - 1].value},
  };
};

const getTntTimeseriesData = (
  intervals: SleepInterval[],
): TimeseriesDataPoints<number>[] => {
  return intervals.map(i => ({
    ts: i.ts,
    data: i.timeseries.tnt.reduce((prev, tnt) => prev + tnt[1], 0),
  }));
};

const getSleepHeartRateData = (
  intervals: SleepInterval[],
): TimeseriesDataPoints<LineGraphData[]>[] => {
  return intervals.map(i => ({
    ts: i.ts,
    data: intervals.map(getLineGraphDataFromInterval),
  }));
};

const getLineGraphDataFromInterval = (
  interval: SleepInterval,
): LineGraphData => {
  const maxTs =
    interval.timeseries.heartRate[interval.timeseries.heartRate.length - 1][0];
  const minTs = interval.timeseries.heartRate[0][0];

  let minPoint = Infinity;
  let maxPoint = 0;

  const points = interval.timeseries.heartRate.map(([_, v]) => {
    if (v > maxPoint) {
      maxPoint = v;
    }
    if (v < minPoint) {
      minPoint = v;
    }
    return {value: v};
  });

  return {
    points,
    xAxisLabels: [dayjs(minTs).format('HH:MMa'), dayjs(maxTs).format('HH:MMa')],
    yAxisLables: getLineGraphYAxisForHeartRateInterval(minPoint, maxPoint).map(
      n => n.toString(),
    ),
  };
};

/**
 * Returns 6 numbers representing the heart rate
 * values for the Y axis on the sleep heart rate line graph
 *
 * @param min lowest heart rate
 * @param max highest heart rate
 * @returns 6 numbers in an array
 */
const getLineGraphYAxisForHeartRateInterval = (
  min: number,
  max: number,
): [number, number, number, number, number, number] => {
  if (min > max) {
    throw new Error(`'min' needs to be less than 'max': min=${min} max=${max}`);
  }

  const top = max + 5;
  const bottom = min - 15;

  const diff = top - bottom;
  const interval = diff / 4;

  return [
    bottom,
    bottom + interval,
    bottom + interval * 2,
    bottom + interval * 3,
    bottom + interval * 4,
    top,
  ];
};
